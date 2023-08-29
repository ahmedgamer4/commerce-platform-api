import HttpError from "../../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../../models/Employee";
import { CollageREQ } from "../../../../utils/signCollageIdToReq";

const employee = new EmployeeModel();

const createEmployee = async (req: CollageREQ, res: Response, next: NextFunction) => {
  // Get data from body
  const collageId = req.collageId;
  const { name, email, password } = req.body;

  // Validate data
  if (!name || !email || !password) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create employee
  let newEmployee;
  try {
    newEmployee = await employee.createEmployee(name, email, password, collageId!);
  } catch (error) {
    return next(error);
  }

  // Check if employee was created
  if (!newEmployee) {
    return next(new HttpError("Could not create employee", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Employee created successfully",
    data: {
      employee: newEmployee,
    },
  });
};

export default createEmployee;
