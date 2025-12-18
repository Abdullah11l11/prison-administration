import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Link, type LinkProps } from "react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  React.ComponentProps<"button"> & {
    to?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  LinkProps & {
    to: LinkProps["to"];
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button({
  className,
  variant,
  size,
  asChild = false,
  to,
  ...props
}: ButtonProps) {
  let Comp: any;

  if (to) {
    Comp = Link;
  } else if (asChild) {
    Comp = Slot;
  } else {
    Comp = "button";
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      {...(to ? { to } : {})}
    />
  );
}

export { Button };
