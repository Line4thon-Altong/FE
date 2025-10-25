import type { IconProps } from "@/types/icon";

export default function ArrowRightIcon({
  width = 8,
  height = 13,
  color = "#FF8C00",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.5L7 6.5L1 1.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
