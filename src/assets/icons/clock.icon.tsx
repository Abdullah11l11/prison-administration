import type { SVGProps } from "react";

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_31_391)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.7443 6.61758 17.3824 2.25568 12 2.25ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12C3.75 7.44365 7.44365 3.75 12 3.75C16.5563 3.75 20.25 7.44365 20.25 12C20.2448 16.5542 16.5542 20.2448 12 20.25ZM18 12C18 12.4142 17.6642 12.75 17.25 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12V6.75C11.25 6.33579 11.5858 6 12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_31_391">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ClockIcon;
