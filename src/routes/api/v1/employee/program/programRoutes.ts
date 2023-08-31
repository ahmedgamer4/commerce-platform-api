import express from "express";
import index from "../../../../../controllers/employee/programs/index";
import show from "../../../../../controllers/employee/programs/show";

const programRoutes = express.Router();

programRoutes.get("/", index);
programRoutes.get("/:id", show);

export default programRoutes;
