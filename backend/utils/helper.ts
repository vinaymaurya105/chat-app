import { Request } from "express";

export function getUserFromHeader(req: Request) {
  const userId = req.headers["x-user-id"];
  return userId as string;
}
