import EmployeeModel from "../../../../models/Employee";
import HttpError from "../../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageREQ } from "../../../../routes/api/v1/master/collage/collageRoutes";

const employee = new EmployeeModel();

const removeEmployee = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as CollageREQ).collageId;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Remove employee
  let removedEmployee;
  try {
    removedEmployee = await employee.deleteEmployee(id, collageId);
  } catch (err) {
    return next(err);
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Employee removed successfully",
    data: {
      employee: removedEmployee,
    },
  });
};

export default removeEmployee;
