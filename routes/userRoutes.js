import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserDetailsbyNin,
  getUserProfile,
  getUsers,
  registerUser,
} from "../controllers/user.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/details").post(getUserDetailsbyNin);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);
export default router;
