import expres from "express";
import masterRoutes from "./api/v1/master/masterRoutes";
import authRoutes from "./api/v1/authRoutes";
import auth from "../middlewares/auth";
import validateMaster from "../middlewares/validate/validateMaster";
import validateAdmin from "../middlewares/validate/validateAdmin";
import adminWrapperRoutes from "./api/v1/master/admin/adminRoutesWrapper";

const routes = expres.Router();

// General Authentication Routes [No authentication required]
routes.use("/v1/auth", authRoutes);

// Master Routes [Authentication required]
routes.use("/v1/master", auth, validateMaster, masterRoutes);

// Admin Routes [Authentication required]
routes.use("/v1/admin", auth, validateAdmin, adminWrapperRoutes);

export default routes;
