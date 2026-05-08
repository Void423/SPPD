import { Router } from "express";
import { SppdFollowerController } from "../../controller/sppdFollower.controller";
import { SppdFollowerServices } from "../../services/sppdFollower.services";
import { requireAuth } from "../../middleware/auth.middleware";

const sppdFollowerRoute = Router();

const sppdFollowerController = new SppdFollowerController(
  new SppdFollowerServices(),
);

// @GET /sppd-follower — Ambil semua data SPPD Follower
sppdFollowerRoute.get("/", requireAuth, sppdFollowerController.getAllSppdFollower);

// @GET /sppd-follower/sppd/:sppdId — Ambil semua follower berdasarkan sppdId
sppdFollowerRoute.get(
  "/sppd/:sppdId",
  requireAuth,
  sppdFollowerController.getSppdFollowerBySppdId,
);

// @GET /sppd-follower/:id — Ambil satu SPPD Follower berdasarkan ID
sppdFollowerRoute.get("/:id", requireAuth, sppdFollowerController.getSppdFollowerById);

// @POST /sppd-follower — Buat data SPPD Follower baru
sppdFollowerRoute.post("/", requireAuth, sppdFollowerController.createSppdFollower);

// @PUT /sppd-follower/:id — Perbarui data SPPD Follower berdasarkan ID
sppdFollowerRoute.put("/:id", requireAuth, sppdFollowerController.updateSppdFollower);

// @DELETE /sppd-follower/:id — Hapus data SPPD Follower berdasarkan ID
sppdFollowerRoute.delete("/:id", requireAuth, sppdFollowerController.deleteSppdFollower);

export default sppdFollowerRoute;
