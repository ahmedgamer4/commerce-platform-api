import express from "express";
import show from "../../../../controllers/applicant/me/show";
import programRoutes from "./program/programRoutes";
import programFilesRoutes from "./program-files/programFileRoutes";
import applicationRoutes from "./application/applicationRoutes";

const applicantRoutes = express.Router();

// Application Routes
applicantRoutes.use(
  "/collages/:collageId/programs/:programId/applications",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  applicationRoutes
);

// Program Files Routes
applicantRoutes.use(
  "/collages/:collageId/programs/:programId/program-files",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  programFilesRoutes
);

// Program Routes
applicantRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

// Me Routes
applicantRoutes.get("/me", show);

export default applicantRoutes;
