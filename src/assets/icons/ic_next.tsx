import type { IconProps } from "@/types/icon";

export default function NextIcon({
  width = 16,
  height = 16,
  color = "#B7B7B7",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.79883 14.3984L11.1988 7.99844L4.79883 1.59844"
        stroke={color}
        strokeWidth="1.76216"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
