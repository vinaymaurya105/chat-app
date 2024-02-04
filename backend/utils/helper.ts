import { Request } from "express";
import { isValidObjectId } from "mongoose";

export function getUserFromHeader(req: Request) {
  const userId = req.headers["x-user-id"];
  return userId as string;
}

export function isValidId(id: string, type: string) {
  if (!isValidObjectId(id)) throw new Error(`Invalid ${type}`);
}
