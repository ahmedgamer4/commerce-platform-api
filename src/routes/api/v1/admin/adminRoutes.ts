import express from "express";
import show from "../../../../controllers/admin/me/show";
import programRoutes from "./program/programRoutes";

const adminRoutes = express.Router();

// Me Routes
adminRoutes.get("/me", show);

// Program Routes
adminRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

export default adminRoutes;
