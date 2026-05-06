import { Router } from "express";
import sppdRoute from "./sppd/sppd.route";

const router = Router();

router.use("/sppd", sppdRoute);
export default router;
