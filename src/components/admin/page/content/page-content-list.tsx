import React from "react";
import { twMerge } from "tailwind-merge";

type PageContentListProps<T> = Omit<
  React.ComponentProps<"section">,
  "children"
> & {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const PageContentListInner = <T,>(
  { data, renderItem, className, ...props }: PageContentListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <section
      {...props}
      ref={ref}
      className={twMerge(
        "flex-grow overflow-auto flex flex-col gap-4 w-full",
        className
      )}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </section>
  );
};

const PageContentList = React.forwardRef(PageContentListInner) as <T>(
  props: PageContentListProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(PageContentList as React.FC).displayName = "Page.Content.List";

export { PageContentList };
