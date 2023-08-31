import express from "express";
import create from "../../../../../controllers/admin/program-files/create";
import index from "../../../../../controllers/admin/program-files/index";
import remove from "../../../../../controllers/admin/program-files/remove";

const programFilesRoutes = express.Router();

programFilesRoutes.post("/", create);
programFilesRoutes.get("/", index);
programFilesRoutes.delete("/:id", remove);

export default programFilesRoutes;
