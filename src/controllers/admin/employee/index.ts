import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../models/Employee";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";

const employee = new EmployeeModel();

const indexEmployee = async (req: Request, res: Response, next: NextFunction) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let employees;
  try {
    employees = await employee.indexEmployee(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if employees were found
  if (!employees || employees.count === 0) {
    return next(new HttpError("No employees found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Employees found successfully.",
    data: {
      ...employees,
    },
  });
};

export default indexEmployee;
