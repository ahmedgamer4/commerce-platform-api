import express from "express";
import indexEmployee from "../../../../../../controllers/master/admins/employees";
import createEmployee from "../../../../../../controllers/master/admins/employees/create";
import removeEmployee from "../../../../../../controllers/master/admins/employees/remove";
import showEmployee from "../../../../../../controllers/master/admins/employees/show";
import updateEmployee from "../../../../../../controllers/master/admins/employees/update";

const employeeRouter = express.Router();

employeeRouter.get('/', indexEmployee);
employeeRouter.post('/', createEmployee);
employeeRouter.get('/:id', showEmployee);
employeeRouter.patch('/:id', updateEmployee);
employeeRouter.delete('/:id', removeEmployee);

export default employeeRouter;
