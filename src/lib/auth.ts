import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dzawani-secret-key-2024";

export function signToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
