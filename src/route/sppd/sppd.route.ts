import express, { Router } from "express";
import { SppdController } from "../../controller/sppd.controller";
import { SppdServices } from "../../services/sppd.services";
import { requireAuth } from "../../middleware/auth.middleware";

const sppdRoute = Router();

const sppdController = new SppdController(new SppdServices());

sppdRoute.get("/", requireAuth, sppdController.getAllSppd);

export default sppdRoute;
