import { MasterModel } from "../../models/Master";
import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import generateAuthTokens from "../../utils/generateAuthTokens";
import validator from "validator";

const master = new MasterModel();

const signup = async (req: Request, res: Response, next: NextFunction) => {
  // get data from request body
  const { name, email, password, masterKey } = req.body;

  // validate master key
  if (masterKey !== process.env.MASTER_KEY) {
    const mes = "Invalid master key.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // validate data
  if (!name || !email || !password) {
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

  // create master
  let masterData;
  try {
    masterData = await master.createMaster(name, email, password);

    // check if masterData is empty
    if (!masterData) {
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
    const masterId = masterData.id;
    const role = "master";
    tokens = generateAuthTokens(masterId, role);
  } catch (error) {
    return next(error);
  }

  // send response
  res.status(201).json({
    status: "success",
    message: "Master created successfully.",
    data: {
      master: {
        id: masterData.id,
        name: masterData.name,
        email: masterData.email,
      },
      tokens,
    },
  });
};

export default signup;
