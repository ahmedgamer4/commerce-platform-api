import express from "express";
import show from "../../../../controllers/master/me/show";
import collageRoutes from "./collage/collageRoutes";
import adminRoutes from "./admin/adminRoutes";
import { signCollageIdToReq } from "../../../../utils/signCollageIdToReq";

const masterRoutes = express.Router();

// Me Routes
masterRoutes.get("/me", show);

// Admin Routes
collageRoutes.use(
  "/:collageId/admins",
  signCollageIdToReq,
  adminRoutes
);

// Collage Routes
masterRoutes.use("/collages", collageRoutes);

export default masterRoutes;
