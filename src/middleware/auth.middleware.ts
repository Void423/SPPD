import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function requireAuth(
  res: Response,
  req: Request,
  next: NextFunction,
) {
  const session = auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
}
