import type { UIProps } from "@/types";
import logo from "@/assets/base/kawarem-logo.png";
import CustomImage from "./custom-image.component";

const KawaremLogo = ({ className = "" }: UIProps) => {
  return (
    <CustomImage
      src={logo}
      alt="logo"
      className={`object-contain ${className}`}
      width={290}
      height={64}
    />
  );
};

export default KawaremLogo;
