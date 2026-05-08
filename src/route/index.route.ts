import { Router } from "express";
import sppdRoute from "./sppd/sppd.route";
import sppdFollowerRoute from "./sppdFollower/sppdFollower.route";

const router = Router();

router.use("/sppd", sppdRoute);
router.use("/sppd-follower", sppdFollowerRoute);
export default router;

