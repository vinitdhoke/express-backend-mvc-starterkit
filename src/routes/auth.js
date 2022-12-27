import express from "express";
const router = express.Router();

import {
  signup,
  getUserByUsername,
  signin,
  signout,
  requireSignin,
  testAuthenticate,
} from "../controllers/auth.js";
import { userSignupValidator, validateError } from "../validator/index.js";

router.post(
  "/signup",
  userSignupValidator,
  validateError,
  getUserByUsername,
  signup
);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/testAuthenticate", requireSignin, testAuthenticate);

export default router;
