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
        "relative bg-muted/40 pb-3 pt-4 flex items-center justify-center cursor-pointer w-full transition-all duration-200",
        isSelected
          ? "scale-[1.00] shadow-md shadow-primary/30 bg-primary/10"
          : "hover:scale-[1.00] hover:shadow-md hover:shadow-primary/20 hover:bg-primary/10",
        className
      )}
      ref={ref}
      {...props}
    >
      <CardContent className="flex flex-col items-center justify-between h-full gap-2 py-0 px-0">
        <Category {...category} variant={variant} previewMode />
        <TextSubheading className="text-center text-sm text-muted-foreground pt-0 pb-0 p-0">
          {name}
        </TextSubheading>
      </CardContent>

      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
          <CheckIcon size={14} />
        </div>
      )}
    </Card>
  );
});

FeaturedCategoriesVariantOption.displayName = "FeaturedCategoriesVariantOption";

export { FeaturedCategoriesVariantOption };
