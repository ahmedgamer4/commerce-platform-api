import express from "express";
import show from "../../../../controllers/master/me/show";
import collageRoutes from "./collage/collageRoutes";
import adminRoutes from "./admin/adminRoutes";

const masterRoutes = express.Router();

// Me Routes
masterRoutes.get("/me", show);

// Admin Routes
masterRoutes.use(
  "/collages/:collageId/admins",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  adminRoutes
);

// Collage Routes
masterRoutes.use("/collages", collageRoutes);

export default masterRoutes;
