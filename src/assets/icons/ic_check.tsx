import type { IconProps } from "@/types/icon";

export default function CheckIcon({
  width = 16,
  height = 16,
  color = "#797979",
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
        d="M13.0332 2.54297C13.3557 2.27981 13.831 2.29895 14.1318 2.59961C14.4524 2.9202 14.4523 3.43814 14.1318 3.75879L6.48535 11.3994C6.16446 11.7199 5.64603 11.72 5.3252 11.3994L2.30469 8.38086C1.98393 8.06024 1.98404 7.54237 2.30469 7.22168C2.62557 6.90102 3.14396 6.90102 3.46484 7.22168L5.90137 9.65625L12.9707 2.59961L13.0332 2.54297Z"
        fill={color}
        stroke={color}
        strokeWidth="0.2"
      />
    </svg>
  );
}
