import jwt from "jsonwebtoken";

export default function isTokenExpired(token: string): jwt.JwtPayload {
  try {
    const data: jwt.JwtPayload = jwt.verify(token, "secret", {
      complete: true,
    });
    return data;
  } catch (err) {
    throw new Error("Token is expired");
  }
}
