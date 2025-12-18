import type { SVGProps } from "react";

const SmallArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="5"
      height="6"
      viewBox="0 0 5 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.000250041 0.000152349H1.72825L4.48825 2.72415L1.72825 5.44815H0.000250041L2.77225 2.72415L0.000250041 0.000152349Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SmallArrowIcon;
