import { Role } from "../../roles/types/roles";

export type Profile = {
  profileId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
};
