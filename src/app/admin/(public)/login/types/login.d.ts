export type CreateSessionRequest = {
  email: string;
  password: string;
};

export type Session = {
  type: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};
