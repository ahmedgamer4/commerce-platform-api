import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../models/Employee";

interface REQ extends Request {
  userId?: string;
  collageId?: string;
}

const employee = new EmployeeModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const collageId = req.collageId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get employee data
  let employeeData;
  try {
    employeeData = await employee.showEmployee(
      authenticatedUserId,
      collageId as string
    );
  } catch (error) {
    return next(error);
  }
  // Check if employee exists
  if (!employeeData) {
    const mes = "Employee not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "Employee found successfully.",
    data: {
      employee: employeeData,
    },
  });
};

export default show;
