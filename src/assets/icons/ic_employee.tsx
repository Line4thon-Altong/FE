import type { IconProps } from "@/types/icon";

export default function EmployeeIcon({
  width = 16,
  height = 16,
  color = "#FF8C00",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#a)">
        <path
          fill={color}
          d="M8 9.143c4.4 0 8 2.857 8 5.143A1.714 1.714 0 0 1 14.286 16H1.714A1.714 1.714 0 0 1 0 14.286C0 12 3.6 9.143 8 9.143ZM8 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
