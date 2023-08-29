import EmployeeModel from "../../../../models/Employee";
import HttpError from "../../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageREQ } from "../../../../utils/signCollageIdToReq";

const employee = new EmployeeModel();

const updateEmployee = async (req: CollageREQ, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = req.collageId;
  const { name, password, email } = req.body;

  // Validate data
  if (!name && !password && !email) {
    return next(new HttpError("Please provide name or password", 400));
  }

  // Update employee
  let updatedEmployee;
  try {
    updatedEmployee = await employee.update(id, name, password, email, collageId!);
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

export default updateEmployee;
