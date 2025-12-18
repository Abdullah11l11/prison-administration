import { useEffect } from "react";

import { useLocation } from "react-router";

import { useHeaderStore } from "@/hooks/use-header-store.hook";
import { headerItems } from "@/lib/constant/header-items.constant";
import { findLabelByHref } from "@/utils/find-label-by-href.util";

const HeaderLabel = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const header = useHeaderStore((state) => state.label);
  const setHeaderLabel = useHeaderStore((state) => state.setLabel);

  useEffect(() => {
    const activeLabel = findLabelByHref(headerItems, pathname) ?? { label: "" };

    const hasLabelChanged =
      header.label !== activeLabel.label || header.desc !== activeLabel.desc;

    if (hasLabelChanged) {
      setHeaderLabel(activeLabel);
    }
  }, [header.label, header.desc, pathname, setHeaderLabel]);

  const EditButton = header.editButton;

  return (
    <div className="flex-between">
      <div>
        <h2 className="text-primary-500 text-heading-h2 font-bold">
          {header.label}
        </h2>
        <p className="text-caption-small text-card-border">{header.desc}</p>
      </div>
      {!!EditButton && <EditButton />}
    </div>
  );
};

export default HeaderLabel;
