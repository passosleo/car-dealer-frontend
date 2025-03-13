import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/services/api";

type UserProfileProps = Omit<
  React.ComponentProps<typeof Link>,
  "children" | "href"
> & {
  href?: string;
};

const UserProfile = React.forwardRef<HTMLAnchorElement, UserProfileProps>(
  async ({ href = "/admin/profile", className, ...props }, ref) => {
    const user = await api.admin.auth.getUserInfo();
    return (
      <Link
        ref={ref}
        {...props}
        href={href}
        className={twMerge("flex items-center gap-2 px-2", className)}
      >
        <Avatar className="w-10 h-10 flex items-center justify-center">
          <AvatarFallback className="text-lg">US</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-semibold">{user.firstName}</h4>
          <p className="text-xs text-muted-foreground">{user.profile.name}</p>
        </div>
      </Link>
    );
  }
);

UserProfile.displayName = "UserProfile";

export { UserProfile };
