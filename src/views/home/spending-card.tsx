import { MONTH_CHANGE, MONTH_TOTAL } from "@/data";
import { formatChange, formatUsd } from "@/lib";

export default function SpendingCard() {
  return (
    <section className="rounded-card-sm bg-surface px-5 py-6 sm:rounded-card sm:px-10 sm:pt-8 sm:pb-10">
      <h1 className="text-heading-sm text-balance sm:text-heading">
        Spending - Last 7 days
      </h1>
      <hr className="my-6 h-0.5 rounded-full border-0 bg-canvas sm:my-8" />
      <div className="flex flex-wrap items-baseline-last gap-x-4 gap-y-2">
        <dl className="grid gap-1 sm:gap-0">
          <dt className="text-body-sm text-muted sm:text-body">
            Total this month
          </dt>
          <dd className="text-display-sm sm:text-display">
            {formatUsd(MONTH_TOTAL)}
          </dd>
        </dl>
        <p className="ml-auto grid text-right text-body-sm sm:text-body">
          <strong>{formatChange(MONTH_CHANGE)}</strong>{" "}
          <span className="text-muted">from last month</span>
        </p>
      </div>
    </section>
  );
}
