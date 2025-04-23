import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { UserInfo } from "@/services/types";
import { TextSubheading } from "../text/text-subheading";
import { TextNormal } from "../text/text-normal";
import { Avatar } from "../avatar/avatar";

type UserProfileProps = Omit<
  React.ComponentProps<typeof Link>,
  "children" | "href"
> & {
  href?: string;
  userInfo: UserInfo | null;
};

const UserProfile = React.forwardRef<HTMLAnchorElement, UserProfileProps>(
  ({ href = "/admin/user-profile", userInfo, className, ...props }, ref) => {
    if (!userInfo) return <></>;
    const fullName = userInfo.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`
      : userInfo.firstName;
    return (
      <Link
        ref={ref}
        {...props}
        href={href}
        className={twMerge("flex items-center gap-2 px-2", className)}
      >
        <Avatar name={fullName} className="w-10 h-10 text-md" />
        <div>
          <TextSubheading className="text-sm">{fullName}</TextSubheading>
          <TextNormal className="text-xs">{userInfo.profile.name}</TextNormal>
        </div>
      </Link>
    );
  }
);

UserProfile.displayName = "UserProfile";

export { UserProfile };
