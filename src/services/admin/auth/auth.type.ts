import { CallbackFns } from "@/services/types";

export type CreateSessionDTO = {
  email: string;
  password: string;
};

export type SessionDTO = {
  type: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};

export type RecoverPasswordDTO = {
  password: string;
  token: string;
};

export type UserInfoDTO = {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  profile: {
    name: string;
    roles: string[];
  };
};

export interface IAuthService {
  createSession(
    data: CreateSessionDTO,
    callbackFns?: CallbackFns<SessionDTO>
  ): Promise<SessionDTO>;
  refreshSession(
    refreshToken: string,
    callbackFns?: CallbackFns<SessionDTO>
  ): Promise<SessionDTO>;
  sendRecoverPasswordEmail(
    email: string,
    callbackFns?: CallbackFns<void>
  ): Promise<void>;
  recoverPassword(
    data: RecoverPasswordDTO,
    callbackFns?: CallbackFns<void>
  ): Promise<void>;
  validateRecoverPasswordToken(
    token: string,
    callbackFns?: CallbackFns<void>
  ): Promise<void>;
  getUserInfo(callbackFns?: CallbackFns<UserInfoDTO>): Promise<UserInfoDTO>;
}
