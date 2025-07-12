import { Logo, LogoProps } from "@/components/public/logo/logo";
import React from "react";
import { twMerge } from "tailwind-merge";

type ListingsHeaderProps = React.ComponentProps<"header"> & LogoProps & {};

const ListingsHeader = React.forwardRef<HTMLDivElement, ListingsHeaderProps>(
  ({ className, logoImageUrl, logoUrl, title, children, ...props }, ref) => {
    return (
      <header
        {...props}
        ref={ref}
        className={twMerge(
          "flex justify-center h-20 w-full bg-zinc-900 px-6 border-b border-zinc-800",
          className
        )}
      >
        <div className="flex justify-end md:justify-between items-center max-w-9xl w-full">
          <Logo logoImageUrl={logoImageUrl} logoUrl={logoUrl} title={title} />
          <div className="flex items-center gap-9 w-full">
            {children}
            <a href="/admin" className="text-white">
              admin
            </a>
          </div>
        </div>
      </header>
    );
  }
);

ListingsHeader.displayName = "ListingsHeader";

export { ListingsHeader };
