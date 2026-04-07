import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();
import { register, login, getProfile } from "../controllers/authController.js";

/**
 * Auth Router
 *
 * Routes:
 * POST /register - create new user (expects JSON body with user fields)
 * POST /login - login (expects { email, password })
 * GET /me - get current user profile (requires Bearer token)
 */

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);

export default router;
