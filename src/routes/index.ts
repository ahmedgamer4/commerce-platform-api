import expres from "express";
import masterRoutes from "./api/v1/master/masterRoutes";
import authRoutes from "./api/v1/authRoutes";
import auth from "../middlewares/auth";
import validateMaster from "../middlewares/validate/validateMaster";

const routes = expres.Router();

// General Authentication Routes [No authentication required]
routes.use("/v1/auth", authRoutes);

// Master Routes [Authentication required]
routes.use("/v1/master", auth, validateMaster, masterRoutes);

export default routes;
