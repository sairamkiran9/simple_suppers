// src/routes/producer.routes.ts
import { Router } from "express";
import { ProducerController } from "../controllers/producer.controller";
import { authenticateFirebase } from "../auth/auth";

const router = Router();

// GET all active menu items for a producer
router.get("/menu", authenticateFirebase, ProducerController.index);

// POST a new menu item
router.post("/menu", authenticateFirebase, ProducerController.Additem);

export default router;
