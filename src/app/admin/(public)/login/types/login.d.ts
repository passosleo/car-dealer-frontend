export type CreateSessionRequest = {
  email: string;
  password: string;
};

export type SessionResponse = {
  type: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};
