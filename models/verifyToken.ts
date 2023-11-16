import jwt from "jsonwebtoken";

export default function isTokenExpired(token: string): jwt.JwtPayload {
  const data: jwt.JwtPayload = jwt.verify(token, "secret", { complete: true });
  if (data.payload.exp && data.payload.exp < Math.floor(Date.now() / 1000)) {
    data.payload.email = "";
  }
  return data;
}
