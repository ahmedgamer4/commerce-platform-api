import { MasterModel } from "../../models/Master";
import { AdminModel } from "../../models/Admin";
import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import generateAuthTokens from "../../utils/generateAuthTokens";
import validator from "validator";
import EmployeeModel from "../../models/Employee";
import { ApplicantModel } from "../../models/Applicant";

const master = new MasterModel();
const admin = new AdminModel();
const employee = new EmployeeModel();
const applicant = new ApplicantModel();

const login = async (req: Request, res: Response, next: NextFunction) => {
  // get data from request body
  const { email, password, role } = req.body;

  // validate data
  if (!email || !password || !role) {
    const mes = "Invalid input.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // validate email
  if (!validator.isEmail(email)) {
    const mes = "Invalid email.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Authenticate user
  let authenticatedUserId;
  if (role === "master") {
    // authenticate master
    try {
      const masterData = await master.authenticateMaster(email, password);
      authenticatedUserId = masterData.id;
    } catch (error) {
      return next(error);
    }
  } else if (role === "admin") {
    // authenticate admin
    try {
      const adminData = await admin.authenticateAdmin(email, password);
      authenticatedUserId = adminData.id;
    } catch (error) {
      return next(error);
    }
  } else if (role === "applicant") {
    // authenticate applicant
    try {
      const applicantData = await applicant.authenticateApplicant(
        email,
        password
      );
      authenticatedUserId = applicantData.id;
    } catch (error) {
      return next(error);
    }
  } else if (role === "employee") {
    // authenticate employee
    try {
      const employeeData = await employee.authenticateEmployee(email, password);
      authenticatedUserId = employeeData.id;
    } catch (error) {
      return next(error);
    }
  } else {
    const mes = "Invalid role.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Check if user is authenticated
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // generate auth tokens
  let tokens;
  try {
    tokens = generateAuthTokens(authenticatedUserId, role);
  } catch (error) {
    return next(error);
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "User authenticated successfully.",
    data: {
      master: {
        id: authenticatedUserId,
        role,
      },
      tokens,
    },
  });
};

export default login;
