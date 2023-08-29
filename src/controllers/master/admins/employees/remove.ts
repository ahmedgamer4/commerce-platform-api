import EmployeeModel from "../../../../models/Employee";
import HttpError from "../../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageREQ } from "../../../../utils/signCollageIdToReq";

const employee = new EmployeeModel();

const removeEmployee = async (req: CollageREQ, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = req.collageId;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Remove employee
  let removedEmployee;
  try {
    removedEmployee = await employee.delete(id, collageId!);
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
