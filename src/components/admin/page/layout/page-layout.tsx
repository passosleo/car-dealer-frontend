import React from "react";
import { twMerge } from "tailwind-merge";
import { BackButton } from "../../back-button";

type PageLayoutProps = Omit<
  React.ComponentProps<"div">,
  "children" | "content"
> & {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  withBackButton?: boolean;
};

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ header, content, footer, withBackButton, className, ...props }, ref) => {
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
        {header}
        {content}
        {footer && footer}
      </div>
    );
  }
);

PageLayout.displayName = "Page.Layout ";

export { PageLayout };
