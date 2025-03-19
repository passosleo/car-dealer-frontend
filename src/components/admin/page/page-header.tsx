import React from "react";
import { twMerge } from "tailwind-merge";

type PageHeaderProps = React.ComponentProps<"section"> & {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
  content?: React.ReactNode;
};

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <section
        {...props}
        ref={ref}
        className={twMerge("pb-4 shrink-0", className)}
      >
        <div className={twMerge("flex items-center gap-2", className)}>
          <span className="h-5 w-1 bg-primary rounded-md" />
          <h1 className="text-primary text-xl font-medium">{title}</h1>
        </div>
        <h2 className={twMerge("text-muted-foreground my-2", className)}>
          {description}
        </h2>
        {children ? (
          <div
            className={twMerge(
              "flex items-center justify-between flex-wrap gap-4 pt-4",
              className
            )}
          >
            {children}
          </div>
        ) : (
          <></>
        )}
      </section>
    );
  }
);

PageHeader.displayName = "PageHeader";

export { PageHeader };
