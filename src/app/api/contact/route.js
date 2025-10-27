import { NextResponse } from "next/server";

import {
  ensureContactRateLimitTable,
  ensureContactTable,
  getDatabasePool,
} from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const clientIp = getClientIp(request);
    if (!clientIp) {
      return NextResponse.json(
        { error: "Unable to determine request origin." },
        { status: 400 },
      );
    }

    await ensureContactRateLimitTable();
    await ensureContactTable();
    const pool = getDatabasePool();

    const rateLimitExceeded = await isRateLimitExceeded(pool, clientIp);
    if (rateLimitExceeded.exceeded) {
      return NextResponse.json(
        {
          error:
            rateLimitExceeded.retryAfterMinutes > 0
              ? `You can send a maximum of ${rateLimitExceeded.maxRequests} message(s) every ${rateLimitExceeded.windowMinutes} minutes. Please try again in about ${rateLimitExceeded.retryAfterMinutes} minute(s).`
              : "You have reached the maximum number of messages. Please try again later.",
        },
        { status: 429 },
      );
    }

    await pool.execute(
      `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
      [name.trim(), email.trim(), message.trim()],
    );

    await recordRateLimitUsage(pool, clientIp, rateLimitExceeded.recordState);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit contact message", error);
    return NextResponse.json(
      { error: "Unable to submit message at this time." },
      { status: 500 },
    );
  }
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const [firstIp] = forwarded.split(",");
    if (firstIp?.trim()) {
      return firstIp.trim();
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) {
    return realIp.trim();
  }

  if (request.ip?.trim()) {
    return request.ip.trim();
  }

  return null;
}

async function isRateLimitExceeded(pool, ip) {
  const windowMinutes = Number(
    process.env.CONTACT_RATE_LIMIT_WINDOW_MINUTES ?? 10,
  );
  const maxRequests = Number(
    process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS ?? 1,
  );
  const windowMs = windowMinutes * 60 * 1000;
  const now = new Date();

  const [rows] = await pool.execute(
    `SELECT window_start, request_count FROM contact_rate_limits WHERE ip = ?`,
    [ip],
  );

  if (!rows.length) {
    return {
      exceeded: false,
      recordState: { type: "insert", now, windowMinutes, maxRequests },
      windowMinutes,
      maxRequests,
      retryAfterMinutes: 0,
    };
  }

  const record = rows[0];
  const windowStart = new Date(record.window_start);
  const elapsedMs = now.getTime() - windowStart.getTime();

  if (elapsedMs >= windowMs) {
    return {
      exceeded: false,
      recordState: { type: "reset", now, windowMinutes, maxRequests },
      windowMinutes,
      maxRequests,
      retryAfterMinutes: 0,
    };
  }

  if (record.request_count >= maxRequests) {
    const retryAfterMs = windowMs - elapsedMs;
    return {
      exceeded: true,
      windowMinutes,
      maxRequests,
      retryAfterMinutes: Math.max(1, Math.ceil(retryAfterMs / 60000)),
    };
  }

  return {
    exceeded: false,
    recordState: {
      type: "increment",
      now,
      windowMinutes,
      maxRequests,
      currentCount: record.request_count,
    },
    windowMinutes,
    maxRequests,
    retryAfterMinutes: 0,
  };
}

async function recordRateLimitUsage(pool, ip, state) {
  if (!state) return;

  const formattedDateTime = formatDateTime(state.now ?? new Date());

  if (state.type === "insert") {
    await pool.execute(
      `INSERT INTO contact_rate_limits (ip, window_start, request_count) VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE window_start = VALUES(window_start), request_count = 1`,
      [ip, formattedDateTime],
    );
    return;
  }

  if (state.type === "reset") {
    await pool.execute(
      `UPDATE contact_rate_limits SET window_start = ?, request_count = 1 WHERE ip = ?`,
      [formattedDateTime, ip],
    );
    return;
  }

  if (state.type === "increment") {
    const newCount = (state.currentCount ?? 0) + 1;
    await pool.execute(
      `UPDATE contact_rate_limits SET request_count = ? WHERE ip = ?`,
      [newCount, ip],
    );
  }
}

function formatDateTime(date) {
  const iso = date.toISOString();
  return iso.slice(0, 19).replace("T", " ");
}
