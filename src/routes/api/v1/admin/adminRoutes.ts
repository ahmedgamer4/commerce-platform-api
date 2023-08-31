import express from "express";
import show from "../../../../controllers/admin/me/show";
import { signCollageIdToReq } from "../../../../middlewares/signCollageIdToReq";
import employeeRoutes from "./employee/employeeRoutes";
import programRoutes from "./program/programRoutes";
import programFilesRoutes from "./program-files/programFilesRoutes";

const adminRoutes = express.Router();

// Program Files Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/program-files",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  programFilesRoutes
);

// Program Routes
adminRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

adminRoutes.use(
  "/collages/:collageId/employees",
  signCollageIdToReq,
  employeeRoutes
);

// Me Routes
adminRoutes.get("/me", show);

export default adminRoutes;
