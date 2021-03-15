import express from "express";
import { updatePollCount, vote } from "../controllers/vote.js";

const router = express.Router();

router.route("/:poll_id").post(vote).put(updatePollCount);

export default router;