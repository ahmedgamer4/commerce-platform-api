import express from "express";
import { signCollageIdToReq } from "../../../../../utils/signCollageIdToReq";
import adminRoutes from "./adminRoutes";

const adminWrapperRoutes = express.Router();

adminWrapperRoutes.use(
  '/collages/:collageId',
  signCollageIdToReq,
  adminRoutes
);

export default adminWrapperRoutes;
