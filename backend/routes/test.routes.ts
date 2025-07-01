import express from "express";
import { authenticateFirebase } from "../auth/auth";
import { testController } from "../controllers/test.controller";

const router = express.Router();

router.get("/testapi", authenticateFirebase, testController.testapi);

export default router;
