import express from "express";
import auth from "../../../middlewares/auth";
import signupMaster from "../../../controllers/auth/signupMaster";
import login from "../../../controllers/auth/login";

const authRoutes = express.Router();

authRoutes.post("/signup-master", signupMaster);
authRoutes.post("/login", login);

export default authRoutes;
