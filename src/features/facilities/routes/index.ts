import { Router } from "express";
import {
  createFacility,
  createFacilityLevel,
  getFacilities,
  getFacilityLevels,
} from "../domain";
import { fileUploader } from "../../../middlewares";
import { FACILITY_MEDIA_URL } from "../../../utils";

const router = Router();

router.get("/levels", getFacilityLevels);
router.post(
  "/levels",
  fileUploader({ dest: FACILITY_MEDIA_URL }).array("images", 3),
  createFacilityLevel
);

router.get("/", getFacilities);
router.post(
  "/",
  fileUploader({ dest: FACILITY_MEDIA_URL }).array("images", 3),
  createFacility
);

export default router;
