import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

//actual dir will be "/auth/login"
router.post("/login", login);

export default router;
