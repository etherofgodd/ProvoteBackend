import express from "express";
import {
  getNinDetails,
  getState,
  inputNin,
  inputState,
} from "../controllers/nin.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(inputNin).get(getNinDetails);
router.route("/state").post(inputState).get(getState);

export default router;
