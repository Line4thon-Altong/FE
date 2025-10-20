import type { IconProps } from "@/types/icon";

export default function BackIcon({
  width = 11,
  height = 19,
  color = "#B7B7B7",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 17.5L1.5 9.5L9.5 1.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
