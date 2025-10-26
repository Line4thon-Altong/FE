import type { IconProps } from "@/types/icon";

export default function SendIcon({
  width = 21,
  height = 22,
  color = "#B7B7B7",
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.701172"
        y="0.589844"
        width="20.3"
        height="20.8205"
        rx="10.15"
        fill={color}
      />
      <path
        d="M10.8481 6.53674V16.0547M10.8481 6.53674L14.6181 9.93601M10.8481 6.53674L7.07812 9.93601"
        stroke="white"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
