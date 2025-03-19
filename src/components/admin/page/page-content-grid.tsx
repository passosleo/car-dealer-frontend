import React from "react";
import { twMerge } from "tailwind-merge";
import { Pagination } from "../pagination/pagination";

type PageContentGridProps<T> = Omit<
  React.ComponentProps<"section">,
  "children"
> & {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  totalPages?: number;
};

const PageContentGridInner = <T,>(
  {
    items,
    renderItem,
    totalPages,
    className,
    ...props
  }: PageContentGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <React.Fragment>
      <section
        {...props}
        ref={ref}
        className={twMerge(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto",
          className
        )}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))}
      </section>
      {totalPages ? (
        <footer className="py-4 shrink-0 bottom-0 mt-auto">
          <Pagination totalPages={totalPages} />
        </footer>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

const PageContentGrid = React.forwardRef(PageContentGridInner) as <T>(
  props: PageContentGridProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement | null;

(PageContentGrid as React.FC).displayName = "PageContentGrid";

export { PageContentGrid };
