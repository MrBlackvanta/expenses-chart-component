import { Logo } from "@/components/icons";
import { BALANCE } from "@/data";
import { formatUsd } from "@/lib";

export default function BalanceCard() {
  return (
    <div className="flex items-center justify-between rounded-card-sm bg-primary py-5 pr-6 pl-5 sm:rounded-card sm:py-6.5 sm:pr-10 sm:pl-8">
      <dl className="grid gap-1 sm:gap-2">
        <dt className="text-body-sm sm:text-body">My balance</dt>
        <dd className="text-heading-sm sm:text-heading">
          {formatUsd(BALANCE)}
        </dd>
      </dl>
      <Logo className="h-10 w-auto shrink-0 sm:h-12" />
    </div>
  );
}
