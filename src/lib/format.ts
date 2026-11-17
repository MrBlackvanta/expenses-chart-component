const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const change = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
  maximumFractionDigits: 1,
});

export function formatUsd(amount: number) {
  return usd.format(amount);
}

export function formatChange(ratio: number) {
  return change.format(ratio);
}
