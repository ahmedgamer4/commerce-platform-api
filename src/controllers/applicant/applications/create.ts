import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicationModel } from "../../../models/Application";
import { ProgramFileModel } from "../../../models/ProgramFile";
import { StorageModel } from "../../../models/storage";
import { v4 as uuidv4 } from "uuid";

interface REQ extends Request {
  collageId?: string;
  programId?: string;
  userId?: string;
}

const applicationModel = new ApplicationModel();
const programFileModel = new ProgramFileModel();
const storageModel = new StorageModel();

const create = async (req: REQ, res: Response, next: NextFunction) => {
  const { programId, userId } = req;

  let result: { application: { id: string } };
  try {
    result = await applicationModel.createApplication(
      userId as string,
      programId as string
    );
  } catch (err) {
    const error = err as HttpError;
    return next(error);
  }

  // Geg required program files
  let programFiles;
  try {
    programFiles = await programFileModel.indexProgramFiles(
      programId as string
    );
  } catch (err) {
    const error = err as HttpError;
    return next(error);
  }

  // Generate uploadable url for each program file
  const filesToUploadPromises: Promise<{
    name: string;
    type: string;
    uploadUrl: string;
  }>[] = programFiles.map(async (programFile: any) => {
    const programFileTyped: {
      name: string;
      type: string;
    } = programFile;

    // Init storage variables
    const { name, type } = programFileTyped;
    const path = `applications/${result!.application.id}`;
    const uniqueName = `${uuidv4()}`;
    const applicationId = result!.application.id;

    // Create storage
    try {
      const uploadUrl = await storageModel.createStorage(
        path,
        uniqueName,
        type,
        applicationId
      );

      return {
        name: name,
        type: type,
        uploadUrl: uploadUrl,
      };
    } catch (err) {
      const error = err as HttpError;
      throw error; // Throw the error to be caught by Promise.all
    }
  });

  try {
    const filesToUpload = await Promise.all(filesToUploadPromises);

    res.status(201).json({
      status: "success",
      message: "Application created successfully",
      data: {
        application: result.application,
        filesToUpload: filesToUpload,
      },
    });
  } catch (err) {
    const error = err as HttpError;
    return next(error);
  }
};

export default create;
