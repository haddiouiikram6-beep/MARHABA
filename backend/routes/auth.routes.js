import { Router} from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";
import authenticate from "../middlewares/authenticate.js";
const router = Router();
router.post("/register", validateRegister, register);
router.post("/login",validateLogin, login);
router.get("/me", authenticate, me);
export default router;