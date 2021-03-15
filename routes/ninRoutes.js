import express from "express";
import {
  getNinDetails,
  getState,
  inputNin,
  inputState,
} from "../controllers/nin.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, inputNin).get(getNinDetails);
router.route("/state").post(protect, admin, inputState).get(getState);

export default router;
