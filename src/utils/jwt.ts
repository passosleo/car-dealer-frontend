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
