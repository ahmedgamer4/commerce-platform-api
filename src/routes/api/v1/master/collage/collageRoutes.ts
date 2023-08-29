import express from "express";
import create from "../../../../../controllers/master/collages/create";
import index from "../../../../../controllers/master/collages/index";
import show from "../../../../../controllers/master/collages/show";
import update from "../../../../../controllers/master/collages/update";
import remove from "../../../../../controllers/master/collages/remove";

const collageRoutes = express.Router();

collageRoutes.post("/", create);
collageRoutes.get("/", index);
collageRoutes.get("/:id", show);
collageRoutes.patch("/:id", update);
collageRoutes.delete("/:id", remove);

export default collageRoutes;
