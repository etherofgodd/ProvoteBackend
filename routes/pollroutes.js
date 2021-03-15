import express from "express";

import {
  createPoll,
  getAllPolls,
  getPollOptionsForPoll,
  getPolls,
  getPollsForCategory,
} from "../controllers/poll.js";

const router = express.Router();

router.route("/").post(createPoll).get(getAllPolls);

router.route("/poll/:poll_id").get(getPolls);
router.route("/category/:category_id").get(getPollsForCategory);
router.route("/options/:poll_id").get(getPollOptionsForPoll);

export default router;
