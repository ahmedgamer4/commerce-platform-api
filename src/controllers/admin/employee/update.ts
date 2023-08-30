import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../models/Employee";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";

const employee = new EmployeeModel();

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as CollageREQ).collageId;
  const { name, password, email } = req.body;

  // Validate data
  if (!name && !password && !email) {
    return next(new HttpError("Please provide name or password", 400));
  }

  // Update employee
  let updatedEmployee;
  try {
    updatedEmployee = await employee.updateEmployee(id, name, password, email, collageId!);
  } catch (err) {
    return next(err);
  }

  // Check if employee was updated
  if (!updatedEmployee) {
    return next(new HttpError("Could not update employee", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Employee updated successfully",
    data: {
      employee: updatedEmployee,
    },
  });
};

export default updateAdmin;
