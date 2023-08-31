import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ProgramFileModel } from "../../../models/ProgramFile";

interface REQ extends Request {
  programId?: string;
}

const programFile = new ProgramFileModel();

const create = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const programId = req.programId;
  // Get programFile data from request
  const { name, type } = req.body;
  if (!name) {
    const mes = "Invalid body parameters.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Create programFile
  let programFileData;
  try {
    programFileData = await programFile.createProgramFile(
      name,
      type,
      programId!
    );
  } catch (error) {
    return next(error);
  }
  // Send response
  res.status(201).json({
    status: "success",
    message: "programFile created successfully.",
    data: {
      programFile: {
        id: programFileData.id,
        name: programFileData.name,
        type: programFileData.type,
      },
    },
  });
};

export default create;
