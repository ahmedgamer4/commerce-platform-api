import express from "express";
import createAdmin from "../../../../../controllers/master/admins/create";
import showAdmin from "../../../../../controllers/master/admins/show";
import removeAdmin from "../../../../../controllers/master/admins/remove";
import indexAdmin from "../../../../../controllers/master/admins";
import updateAdmin from "../../../../../controllers/master/admins/update";

const adminRoutes = express.Router();

adminRoutes.get("/", indexAdmin);
adminRoutes.post("/", createAdmin);
adminRoutes.get("/:id", showAdmin);
adminRoutes.patch("/:id", updateAdmin);
adminRoutes.delete("/:id", removeAdmin);

export default adminRoutes;
