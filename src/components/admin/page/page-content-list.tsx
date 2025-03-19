import React from "react";
import { twMerge } from "tailwind-merge";
import { Pagination } from "../pagination/pagination";

type PageContentListProps<T> = Omit<
  React.ComponentProps<"section">,
  "children"
> & {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  totalPages?: number;
};

const PageContentListInner = <T,>(
  {
    items,
    renderItem,
    totalPages,
    className,
    ...props
  }: PageContentListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <React.Fragment>
      <section
        {...props}
        ref={ref}
        className={twMerge(
          "flex-grow overflow-auto flex flex-col gap-4 w-full",
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

const PageContentList = React.forwardRef(PageContentListInner) as <T>(
  props: PageContentListProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(PageContentList as React.FC).displayName = "PageContentList";

export { PageContentList };
