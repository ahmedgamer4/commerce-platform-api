import express from "express";
import index from "../../../../../controllers/applicant/program-files/index";

const programFilesRoutes = express.Router();

programFilesRoutes.get("/", index);

export default programFilesRoutes;
