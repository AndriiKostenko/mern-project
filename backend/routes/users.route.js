import express from "express";
import { registerUser } from "../controllers/user.controllers.js";
export const router = express.Router();

router.post('/auth', registerUser);

export default router;