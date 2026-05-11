import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  next();
}

export async function requireRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  if (session.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  next();
}
