"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES, WEEKDAYS, calendarDays, monthLabel, parseDate, shiftDay, shiftMonth, todayValue } from "@/lib/padelCalendar.mjs";
import styles from "./CalendarPicker.module.css";

export default function CalendarPicker({ mode = "date", value, onChange, name, label, monthCounts = {} }) {
  const isMonthPicker = mode === "month";
  const id = useId();
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [page, setPage] = useState(isMonthPicker ? "months" : "days");
  const [cursor, setCursor] = useState(value === "all" ? todayValue() : value);
  const [focused, setFocused] = useState(cursor);
  const focusGrid = useRef(false);
  const currentDate = todayValue();
  const year = parseDate(cursor).getFullYear();
  const month = cursor.slice(0, 7);
  const days = calendarDays(month);
  const triggerText = isMonthPicker ? value === "all" ? "Alle potjes" : monthLabel(value)
    : new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" }).format(parseDate(value));

  useLayoutEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const anchor = triggerRef.current.getBoundingClientRect();
      const panel = popoverRef.current;
      const margin = 12;
      const gap = 8;
      const width = Math.min(304, window.innerWidth - margin * 2);
      const below = window.innerHeight - anchor.bottom - gap - margin;
      const above = anchor.top - gap - margin;
      const openAbove = below < panel.scrollHeight && above > below;
      const maxHeight = Math.max(0, openAbove ? above : below);
      const height = Math.min(panel.scrollHeight + 2, maxHeight);
      setPosition({
        width,
        left: Math.max(margin, Math.min(isMonthPicker ? anchor.right - width : anchor.left, window.innerWidth - width - margin)),
        top: openAbove ? Math.max(margin, anchor.top - gap - height) : anchor.bottom + gap,
        maxHeight,
      });
    };
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(popoverRef.current);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, page, cursor, isMonthPicker]);

  useEffect(() => {
    if (!open || !focusGrid.current) return;
    popoverRef.current.querySelector(`[data-value="${focused}"]`)?.focus({ preventScroll: true });
    focusGrid.current = false;
  }, [open, focused, page, cursor]);

  function close() {
    popoverRef.current.hidePopover();
    triggerRef.current.focus({ preventScroll: true });
  }

  function select(nextValue) {
    onChange(nextValue);
    close();
  }

  function moveFocus(nextValue) {
    focusGrid.current = true;
    setFocused(nextValue);
    setCursor(nextValue);
  }

  function navigate(amount) {
    const next = shiftMonth(cursor, page === "months" ? amount * 12 : amount);
    setCursor(next);
    setFocused(page === "months" ? next.slice(0, 7) : next);
  }

  function handleGridKey(event, itemValue) {
    const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: page === "days" ? -7 : -3, ArrowDown: page === "days" ? 7 : 3 };
    let next;
    if (event.key in offsets) {
      next = page === "days" ? shiftDay(itemValue, offsets[event.key]) : shiftMonth(itemValue, offsets[event.key]).slice(0, 7);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      const amount = (event.key === "PageUp" ? -1 : 1) * (event.shiftKey || page === "months" ? 12 : 1);
      next = shiftMonth(itemValue, amount);
      if (page === "months") next = next.slice(0, 7);
    } else if (event.key === "Home" || event.key === "End") {
      const date = parseDate(itemValue);
      if (page === "days") {
        const weekday = (date.getDay() + 6) % 7;
        next = shiftDay(itemValue, event.key === "Home" ? -weekday : 6 - weekday);
      } else {
        next = `${date.getFullYear()}-${event.key === "Home" ? "01" : "12"}`;
      }
    }
    if (next) {
      event.preventDefault();
      moveFocus(next);
    }
  }

  return <div className={isMonthPicker ? styles.monthPicker : styles.datePicker}>
    {name && <input type="hidden" name={name} value={value} />}
    <button ref={triggerRef} type="button" popoverTarget={id} aria-haspopup="dialog" aria-expanded={open} aria-label={`${label}: ${triggerText}`} className={`${styles.trigger} ${isMonthPicker ? styles.monthTrigger : styles.dateTrigger}`}
      onClick={() => {
        if (open) return;
        const initial = value === "all" ? Object.keys(monthCounts).sort().at(-1) ?? currentDate : value;
        setCursor(isMonthPicker ? initial.slice(0, 7) : initial);
        setFocused(isMonthPicker ? initial.slice(0, 7) : initial);
        setPage(isMonthPicker ? "months" : "days");
        focusGrid.current = true;
      }}>
      <CalendarDays size={16} aria-hidden="true" /><span>{triggerText}</span><ChevronDown size={14} aria-hidden="true" className={open ? styles.chevronOpen : ""} />
    </button>
    <div ref={popoverRef} id={id} popover="auto" role="dialog" aria-label={isMonthPicker ? "Periode kiezen" : "Datum kiezen"} className={styles.calendar}
      style={{ ...position, visibility: position ? "visible" : "hidden" }}
      onToggle={(event) => { const nextOpen = event.currentTarget.matches(":popover-open"); setOpen(nextOpen); if (!nextOpen) setPosition(null); }}
      onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); } }}>
      <div className={styles.calendarHeader}>
        {page === "days" ? <button type="button" className={styles.headingButton} onClick={() => { setPage("months"); moveFocus(month); }} aria-label="Maand en jaar kiezen">{monthLabel(cursor)}<ChevronDown size={14} aria-hidden="true" /></button>
          : <span className={styles.yearLabel} aria-live="polite">{year}</span>}
        <div className={styles.navigation}><button type="button" onClick={() => navigate(-1)} aria-label={page === "days" ? "Vorige maand" : "Vorig jaar"}><ChevronLeft size={17} /></button><button type="button" onClick={() => navigate(1)} aria-label={page === "days" ? "Volgende maand" : "Volgend jaar"}><ChevronRight size={17} /></button></div>
      </div>
      {page === "days" ? <div>
        <div className={styles.weekdays} aria-hidden="true">{WEEKDAYS.map((day) => <span key={day}>{day}</span>)}</div>
        <div className={styles.days} role="group" aria-label={monthLabel(cursor)}>{days.map((day) => <button type="button" key={day} data-value={day} data-outside={day.slice(0, 7) !== month} data-today={day === currentDate} aria-current={day === currentDate ? "date" : undefined} aria-pressed={day === value} aria-label={new Intl.DateTimeFormat("nl-NL", { dateStyle: "full" }).format(parseDate(day))} tabIndex={day === focused ? 0 : -1}
          onFocus={() => setFocused(day)} onKeyDown={(event) => handleGridKey(event, day)} onClick={() => select(day)}>{parseDate(day).getDate()}</button>)}</div>
      </div> : <div className={styles.months} role="group" aria-label={`Maanden in ${year}`}>{MONTH_NAMES.map((monthName, index) => {
        const key = `${year}-${String(index + 1).padStart(2, "0")}`;
        const count = monthCounts[key] ?? 0;
        return <button type="button" key={key} data-value={key} aria-pressed={key === value.slice(0, 7)} data-current={key === currentDate.slice(0, 7)} tabIndex={key === focused.slice(0, 7) ? 0 : -1} aria-label={`${monthName} ${year}${isMonthPicker ? `, ${count} potjes` : ""}`}
          onFocus={() => setFocused(key)} onKeyDown={(event) => handleGridKey(event, key)} onClick={() => { if (isMonthPicker) select(key); else { setPage("days"); moveFocus(`${key}-01`); } }}>
          <span>{monthName.slice(0, 3)}</span>{isMonthPicker && <small>{count ? `${count} potjes` : "–"}</small>}
        </button>;
      })}</div>}
      <div className={styles.calendarFooter}>{isMonthPicker ? <><button type="button" onClick={() => select("all")}>{value === "all" && <Check size={13} aria-hidden="true" />}Alle potjes</button><button type="button" onClick={() => select(currentDate.slice(0, 7))}>Deze maand</button></>
        : <><span>{page === "days" ? monthLabel(cursor) : "Kies een maand"}</span><button type="button" onClick={() => select(currentDate)}>Vandaag</button></>}</div>
    </div>
  </div>;
}
