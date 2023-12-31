import { Router } from "express";
import { proxyFacilityEMRInstance } from "../controllers";

const router = Router();

router.use("/:mflCode/*", proxyFacilityEMRInstance);
export default router;
