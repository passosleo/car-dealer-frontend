import { Profile } from "../../profiles/types/profile";

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordChangedAt: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  profileId: string;
};

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  profileId: string;
};
