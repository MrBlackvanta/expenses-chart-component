import type { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 72 48"
      width="72"
      height="48"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <circle fill="#382314" cx="48" cy="24" r="24" />
        <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
      </g>
    </svg>
  );
}
