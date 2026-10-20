import { NextResponse } from "next/server";

import { getDatabasePool } from "@/lib/db";

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

    const pool = getDatabasePool();

    await pool.query(
      `INSERT INTO public.contact_messages (name, email, message) VALUES ($1, $2, $3)`,
      [name.trim(), email.trim(), message.trim()],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit contact message", error.code ?? error.name);
    return NextResponse.json(
      { error: "Unable to submit message at this time." },
      { status: 500 },
    );
  }
}
