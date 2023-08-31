import express from "express";
import signupMaster from "../../../controllers/auth/signupMaster";
import login from "../../../controllers/auth/login";
import signupApplicant from "../../../controllers/auth/signupApplicant";

const authRoutes = express.Router();

authRoutes.post("/signup-master", signupMaster);
authRoutes.post("/signup-applicant", signupApplicant);
authRoutes.post("/login", login);

export default authRoutes;
