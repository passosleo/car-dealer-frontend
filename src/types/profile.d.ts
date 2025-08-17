import { Role } from "../../roles/types/roles";

export type Profile = {
  profileId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
};

export type CreateProfileRequest = {
  name: string;
  roles: Pick<Role, "roleId">[];
};

export type UpdateProfileRequest = {
  name: string;
  roles: Pick<Role, "roleId">[];
};
