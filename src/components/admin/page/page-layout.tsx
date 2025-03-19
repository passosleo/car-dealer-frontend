import React from "react";
import { twMerge } from "tailwind-merge";
import { BackButton } from "../back-button/back-button";

type PageLayoutProps = React.ComponentProps<"div"> & {
  withBackButton?: boolean;
};

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children, withBackButton, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge("flex flex-col h-full", className)}
      >
        {withBackButton && (
          <div>
            <BackButton />
          </div>
        )}
        {children}
      </div>
    );
  }
);

PageLayout.displayName = "PageLayout ";

export { PageLayout };
