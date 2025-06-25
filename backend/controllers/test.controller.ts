import { Request, Response } from "express";
import { authenticateFirebase } from "../auth/auth";
import { messaging } from "firebase-admin";

export const testController = {
  testapi: (req: Request, res: Response) => {
    res.json({
      message: "The test API is working ✅",
    });
  },
};
