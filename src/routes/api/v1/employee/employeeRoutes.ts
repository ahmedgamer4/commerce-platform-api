import express from "express";
import show from "../../../../controllers/employee/me/show";
import programRoutes from "./program/programRoutes";
import applicationRoutes from "./application/applicationRoutes";

const employeeRoutes = express.Router();

// Application Routes
employeeRoutes.use(
  "/collages/:collageId/programs/:programId/applications",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    (req as any).programId = req.params.programId;
    next();
  },
  applicationRoutes
);

// Program Routes
employeeRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

// Me Routes
employeeRoutes.get("/me", show);

export default employeeRoutes;
