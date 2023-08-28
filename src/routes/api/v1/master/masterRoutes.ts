import express from "express";
import show from "../../../../controllers/master/me/show";
import collageRoutes from "./collage/collageRoutes";

const masterRoutes = express.Router();

// Me Routes
masterRoutes.get("/me", show);

// Collage Routes
masterRoutes.use("/collages", collageRoutes);

export default masterRoutes;
