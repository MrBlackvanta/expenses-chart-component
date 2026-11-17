"use client";

import { type DailySpend, formatUsd, scaleToMax, weekdayName } from "@/lib";
import { type CSSProperties, useEffect, useState } from "react";
import { useToday } from "./use-today";

interface SpendingChartProps {
  days: readonly DailySpend[];
}

export default function SpendingChart({ days }: SpendingChartProps) {
  const today = useToday();
  const [tooltipsDismissed, setTooltipsDismissed] = useState(false);
  const heights = scaleToMax(days.map(({ amount }) => amount));

  useEffect(() => {
    if (tooltipsDismissed) return;

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setTooltipsDismissed(true);
    }

    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, [tooltipsDismissed]);

  return (
    <ol className="mt-13 grid grid-cols-7 gap-3 sm:mt-16.5 sm:gap-4.5">
      {days.map(({ day, amount }, index) => (
        <Bar
          key={day}
          day={day}
          amount={amount}
          height={heights[index]}
          order={index}
          isToday={day === today}
          showTooltip={!tooltipsDismissed}
          onReveal={() => setTooltipsDismissed(false)}
        />
      ))}
    </ol>
  );
}

interface BarProps extends DailySpend {
  height: number;
  order: number;
  isToday: boolean;
  showTooltip: boolean;
  onReveal: () => void;
}

function Bar({
  day,
  amount,
  height,
  order,
  isToday,
  showTooltip,
  onReveal,
}: BarProps) {
  const label = `${weekdayName(day)}, ${formatUsd(amount)}${isToday ? ", today" : ""}`;

  return (
    <li className="grid gap-3 sm:gap-2">
      <div className="flex h-37.5 items-end">
        <button
          type="button"
          style={
            {
              "--v-height": `${height * 100}%`,
              "--v-order": order,
            } as CSSProperties
          }
          onPointerEnter={onReveal}
          onFocus={onReveal}
          className={`group/bar relative h-(--v-height) w-full rounded-bar-sm before:absolute before:inset-0 before:origin-bottom before:rounded-[inherit] before:ease-out motion-safe:before:animate-bar-rise motion-safe:before:transition-[background-color] sm:rounded-bar ${
            isToday
              ? "before:bg-accent hover:before:bg-accent-hover focus-visible:before:bg-accent-hover"
              : "before:bg-primary hover:before:bg-primary-hover focus-visible:before:bg-primary-hover"
          }`}
        >
          <span className="sr-only">{label}</span>
          {showTooltip && (
            <span
              aria-hidden="true"
              className="invisible absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-bar bg-ink p-2 text-body-sm font-bold text-surface group-hover/bar:visible group-focus-visible/bar:visible after:absolute after:inset-x-0 after:top-full after:h-2 sm:text-body"
            >
              {formatUsd(amount)}
            </span>
          )}
        </button>
      </div>
      <span
        aria-hidden="true"
        className={`text-center text-caption-sm sm:text-caption ${
          isToday ? "font-bold text-ink" : "text-muted"
        }`}
      >
        {day}
      </span>
    </li>
  );
}
