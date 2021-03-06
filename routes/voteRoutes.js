import express from "express";
import { vote } from "../controllers/vote.js";

const router = express.Router();

router.route("/:poll_id").post(vote);

export default router;
