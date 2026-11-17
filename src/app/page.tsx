import { BalanceCard } from "@/views/home";

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-6">
      <div className="grid w-full max-w-135 gap-4 sm:gap-6">
        <BalanceCard />
      </div>
    </main>
  );
}
