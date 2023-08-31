import { ApplicantModel } from "../../models/Applicant";
import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import generateAuthTokens from "../../utils/generateAuthTokens";
import validator from "validator";

const applicant = new ApplicantModel();

const signupApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get data from request body
  const { name, email, password, gender, national_id } = req.body;

  // validate data
  if (!name || !email || !password || !gender || !national_id) {
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

  // create applicant
  let applicantData;
  try {
    applicantData = await applicant.createApplicant(
      email,
      password,
      name,
      national_id,
      gender
    );

    // check if applicantData is empty
    if (!applicantData) {
      const mes = "Could not create master.";
      const statusCode = 500;
      return next(new HttpError(mes, statusCode));
    }
  } catch (error) {
    return next(error);
  }

  // generate auth tokens
  let tokens;
  try {
    const applicantId = applicantData.id;
    const role = "applicant";
    tokens = generateAuthTokens(applicantId, role);
  } catch (error) {
    return next(error);
  }

  // send response
  res.status(201).json({
    status: "success",
    message: "Applicant created successfully.",
    data: {
      master: {
        id: applicantData.id,
        name: applicantData.name,
        email: applicantData.email,
      },
      tokens,
    },
  });
};

export default signupApplicant;
