import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../models/Employee";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";

const employee = new EmployeeModel();

const showEmployee = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as CollageREQ).collageId;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve employee
  let retrievedEmployee;
  try {
    retrievedEmployee = await employee.showEmployee(id, collageId!);
  } catch (err) {
    return next(err);
  }

  // Check if employee was found
  if (!retrievedEmployee) {
    return next(new HttpError("Could not retrieve employee", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Employee retrieved successfully",
    data: {
      employee: retrievedEmployee,
    },
  });
};

export default showEmployee;
