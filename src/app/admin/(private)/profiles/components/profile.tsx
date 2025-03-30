import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Profile as ProfileType } from "../types/profile";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { ListPlusIcon, PencilLineIcon } from "lucide-react";
import { formatDate } from "@/utils/date";
import { DeleteProfileButton } from "./delete-profile-button";

const Profile = React.forwardRef<HTMLDivElement, ProfileType>(
  ({ profileId, name, roles, createdAt, updatedAt }, ref) => {
    return (
      <div className="relative">
        <Link href={`/admin/profiles/${profileId}`}>
          <Card
            ref={ref}
            className="flex flex-col items-start p-4 gap-2 hover:bg-primary-foreground cursor-pointer transition-all"
          >
            <div>
              <TextSubheading>{name}</TextSubheading>
              <TextNormal className="text-xs">
                Total de permissões: {roles.length}
              </TextNormal>
            </div>
            <div className="flex flex-col gap-0.5">
              <TextNormal className="text-xs">
                <ListPlusIcon size={14} />
                Cadastrado em {formatDate(createdAt)}
              </TextNormal>
              <TextNormal className="text-xs">
                <PencilLineIcon size={14} />
                Atualizado em {formatDate(updatedAt)}
              </TextNormal>
            </div>
          </Card>
        </Link>
        <DeleteProfileButton profileId={profileId} />
      </div>
    );
  }
);

Profile.displayName = "Profile";

export { Profile };
