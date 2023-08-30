import express from "express";
import indexEmployee from "../../../../../controllers/admin/employee";
import createEmployee from "../../../../../controllers/admin/employee/create";
import removeEmployee from "../../../../../controllers/admin/employee/remove";
import showEmployee from "../../../../../controllers/admin/employee/show";
import updateEmployee from "../../../../../controllers/admin/employee/update";

const employeeRouter = express.Router();

employeeRouter.get('/', indexEmployee);
employeeRouter.post('/', createEmployee);
employeeRouter.get('/:id', showEmployee);
employeeRouter.patch('/:id', updateEmployee);
employeeRouter.delete('/:id', removeEmployee);

export default employeeRouter;

