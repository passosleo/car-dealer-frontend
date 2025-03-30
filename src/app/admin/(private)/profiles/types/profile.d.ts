export type Role = {
  roleId: string;
  name: string;
  label: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Profile = {
  profileId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
};
