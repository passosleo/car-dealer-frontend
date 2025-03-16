import jwt from "jsonwebtoken";

export function isTokenValid(token: string): boolean {
  const decoded = jwt.decode(token);
  if (!decoded || typeof decoded === "string" || !decoded.exp) {
    return false;
  }

  const expirationDate = new Date(decoded.exp * 1000);
  const now = new Date();
  return now < expirationDate;
}

export function getTokenExpirationDate(...tokens: string[]): Date[] {
  return tokens.map((token) => {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string" || !decoded.exp) {
      return new Date(0);
    }

    return new Date(decoded.exp * 1000);
  });
}
