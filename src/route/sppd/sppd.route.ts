import { Router } from "express";
import { SppdController } from "../../controller/sppd.controller";
import { SppdServices } from "../../services/sppd.services";
import { requireAuth, requireRole } from "../../middleware/auth.middleware";

const sppdRoute = Router();

const sppdController = new SppdController(new SppdServices());

// @GET /sppd — Ambil semua data SPPD
sppdRoute.get("/", requireAuth, sppdController.getAllSppd);

// @GET /sppd/:id — Ambil satu SPPD berdasarkan ID
sppdRoute.get("/:id", requireAuth, requireRole, sppdController.getSppdById);

// @POST /sppd — Buat data SPPD baru
sppdRoute.post("/", requireAuth, sppdController.createSppd);

// @PUT /sppd/:id — Perbarui data SPPD berdasarkan ID
sppdRoute.put("/:id", requireAuth, requireRole, sppdController.updateSppd);

// @DELETE /sppd/:id — Hapus data SPPD berdasarkan ID
sppdRoute.delete("/:id", requireAuth, requireRole, sppdController.deleteSppd);

export default sppdRoute;
