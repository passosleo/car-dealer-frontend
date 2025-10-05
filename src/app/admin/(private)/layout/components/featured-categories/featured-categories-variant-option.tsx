import { Category } from "@/app/(public)/home/components/category";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { Card, CardContent } from "@/components/ui/card";
import { Category as CategoryType } from "@/types/category";
import { CheckIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type FeaturedCategoriesVariantOptionProps = React.ComponentProps<
  typeof Card
> & {
  variant: React.ComponentProps<typeof Category>["variant"];
  name: string;
  category: CategoryType;
  className?: string;
  isSelected?: boolean;
};

const FeaturedCategoriesVariantOption = React.forwardRef<
  HTMLDivElement,
  FeaturedCategoriesVariantOptionProps
>(({ variant, name, className, category, isSelected, ...props }, ref) => {
  return (
    <Card
      className={twMerge(
        "bg-muted/40 p-4 w-fit flex items-center justify-center cursor-pointer",
        isSelected
          ? "scale-[1.00] shadow-md shadow-primary/20 bg-primary/10"
          : "hover:scale-[1.00] hover:shadow",
        className
      )}
      ref={ref}
      {...props}
    >
      <CardContent className="flex flex-col items-center justify-between h-full gap-2 py-0 px-0">
        <Category {...category} variant={variant} />
        <TextSubheading className="text-center text-sm text-muted-foreground pt-0 pb-0 p-0">
          {name}
        </TextSubheading>
      </CardContent>
      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
        <CheckIcon size={14} />
      </div>
    </Card>
  );
});

FeaturedCategoriesVariantOption.displayName = "FeaturedCategoriesVariantOption";

export { FeaturedCategoriesVariantOption };
