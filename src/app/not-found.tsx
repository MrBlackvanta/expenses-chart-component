import { SITE_NAME } from "@/data";
import type { Metadata } from "next";
import Link from "next/link";

const description =
  "There's nothing at this address. Your balance and the last seven days of spending are on the home page.";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Page not found`,
  description,
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-6">
      <div className="grid w-full max-w-135 justify-items-start rounded-card-sm bg-surface px-5 py-6 sm:rounded-card sm:px-10 sm:pt-8 sm:pb-10">
        <h1 className="text-heading-sm text-balance sm:text-heading">
          Page not found
        </h1>
        <p className="mt-4 text-body-sm text-muted sm:mt-6 sm:text-body">
          {description}
        </p>
        <hr className="my-6 h-0.5 w-full rounded-full border-0 bg-canvas sm:my-8" />
        <Link
          href="/"
          className="rounded-card-sm bg-primary px-6 py-3.5 text-body-sm font-bold ease-out hover:bg-primary-hover focus-visible:bg-primary-hover motion-safe:transition-[background-color] sm:py-3 sm:text-body"
        >
          Back to your spending
        </Link>
      </div>
    </main>
  );
}
