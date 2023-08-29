import express from "express";
import create from "../../../../../controllers/admin/programs/create";
import index from "../../../../../controllers/admin/programs/index";
import show from "../../../../../controllers/admin/programs/show";
import update from "../../../../../controllers/admin/programs/update";
import remove from "../../../../../controllers/admin/programs/remove";

const programRoutes = express.Router();

programRoutes.post("/", create);
programRoutes.get("/", index);
programRoutes.get("/:id", show);
programRoutes.patch("/:id", update);
programRoutes.delete("/:id", remove);

export default programRoutes;
