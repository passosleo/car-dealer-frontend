import React from "react";
import { twMerge } from "tailwind-merge";

type PageContentGridProps<T> = Omit<
  React.ComponentProps<"section">,
  "children"
> & {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const PageContentGridInner = <T,>(
  { data, renderItem, className, ...props }: PageContentGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <section
      {...props}
      ref={ref}
      className={twMerge(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto",
        className
      )}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </section>
  );
};

const PageContentGrid = React.forwardRef(PageContentGridInner) as <T>(
  props: PageContentGridProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement | null;

(PageContentGrid as React.FC).displayName = "Page.Content.Grid";

export { PageContentGrid };
