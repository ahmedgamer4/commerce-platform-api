import express from "express";
import index from "../../../../../controllers/employee/applications/index";
import show from "../../../../../controllers/employee/applications/show";
import update from "../../../../../controllers/employee/applications/update";

const applicationRoutes = express.Router();

applicationRoutes.get("/", index);
applicationRoutes.get("/:id", show);
applicationRoutes.patch("/:id", update);

export default applicationRoutes;
