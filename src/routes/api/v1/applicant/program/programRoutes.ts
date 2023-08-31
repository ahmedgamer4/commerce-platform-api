import express from "express";
import index from "../../../../../controllers/applicant/programs/index";
import show from "../../../../../controllers/applicant/programs/show";

const programRoutes = express.Router();

programRoutes.get("/", index);
programRoutes.get("/:id", show);

export default programRoutes;
