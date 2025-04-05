import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { User as UserType } from "../types/user";
import { Avatar } from "@/components/admin/avatar/avatar";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { formatDate } from "@/utils/date";
import { DeleteUserButton } from "./delete-user-button";

const User = React.forwardRef<HTMLDivElement, UserType>((user, ref) => {
  const fullName = user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.firstName;

  return (
    <div className="relative">
      <Link href={`/admin/users/${user.userId}`}>
        <Card
          ref={ref}
          className="flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all"
        >
          <Avatar name={fullName} />
          <div className="w-full flex justify-between">
            <div>
              <TextSubheading>{fullName}</TextSubheading>
              <TextNormal className="text-xs">{user.email}</TextNormal>
              <TextNormal className="text-xs font-medium">
                {user.profile.name}
              </TextNormal>
              <ActiveTag active={user.active} />
            </div>

            <div className="flex flex-col justify-end items-end">
              <div className="flex flex-col items-end gap-0.5">
                <TextNormal className="text-xs">
                  Cadastrado em {formatDate(user.createdAt)}
                </TextNormal>
                <TextNormal className="text-xs">
                  Atualizado em {formatDate(user.updatedAt)}
                </TextNormal>
              </div>
            </div>
          </div>
        </Card>
      </Link>
      <DeleteUserButton userId={user.userId} />
    </div>
  );
});

User.displayName = "User";

export { User };
