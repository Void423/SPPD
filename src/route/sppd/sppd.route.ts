import express, { Router } from "express";
import { SppdController } from "../../controller/sppd.controller";
import { SppdServices } from "../../services/sppd.services";

const sppdRoute = Router();

const sppdController = new SppdController(new SppdServices());

sppdRoute.get("/", sppdController.getAllSppd);

export default sppdRoute;
