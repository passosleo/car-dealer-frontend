import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { twMerge } from "tailwind-merge";

type SellerAvatarProps = React.ComponentProps<typeof Avatar> & {
  name: string;
};

const SellerAvatar = React.forwardRef<HTMLDivElement, SellerAvatarProps>(
  ({ className, name, ...props }, ref) => {
    function getFallbackName() {
      return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("");
    }

    return (
      <Avatar className={twMerge("w-16 h-16", className)} {...props} ref={ref}>
        <AvatarImage
          src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${name}`}
          alt={name}
        />
        <AvatarFallback>{getFallbackName()}</AvatarFallback>
      </Avatar>
    );
  }
);

SellerAvatar.displayName = "Seller.Avatar";

export { SellerAvatar };
