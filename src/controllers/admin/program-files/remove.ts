import { Request, Response, NextFunction } from "express";
import { ProgramFileModel } from "../../../models/ProgramFile";

interface REQ extends Request {
  programId?: string;
}

const programFile = new ProgramFileModel();

const remove = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const programId = req.programId;
  const programFileId = req.params.id;

  console.log(programId, programFileId);

  // Remove programFile
  try {
    await programFile.deleteProgramFile(programFileId, programId as string);
  } catch (error) {
    return next(error);
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "programFile removed successfully.",
    data: null,
  });
};

export default remove;
