import { Request, Response, NextFunction } from "express";
import { ProgramFileModel } from "../../../models/ProgramFile";

interface REQ extends Request {
  programId?: string;
}

const programFile = new ProgramFileModel();

const index = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const programId = req.programId;
  // Get programFiles
  let programFiles;
  try {
    programFiles = await programFile.indexProgramFiles(programId as string);
  } catch (error) {
    return next(error);
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "programFiles fetched successfully.",
    data: {
      programFiles,
      count: programFiles?.length,
    },
  });
};

export default index;
