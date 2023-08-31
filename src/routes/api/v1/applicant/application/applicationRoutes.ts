import express from "express";
import create from "../../../../../controllers/applicant/applications/create";
import index from "../../../../../controllers/applicant/applications/index";
import show from "../../../../../controllers/applicant/applications/show";

const applicationRoutes = express.Router();

applicationRoutes.post("/", create);
applicationRoutes.get("/", index);
applicationRoutes.get("/:id", show);

export default applicationRoutes;
