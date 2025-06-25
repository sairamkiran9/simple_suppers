import { Request, Response, NextFunction } from "express";
import admin from "./firebaseadmin";

export const authenticateFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
