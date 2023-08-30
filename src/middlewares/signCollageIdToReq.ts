import { Request, Response, NextFunction } from 'express';

export interface CollageREQ extends Request {
  collageId?: string;
}

export const signCollageIdToReq = (req: CollageREQ, res: Response, next: NextFunction) => {
  req.collageId = req.params.collageId;
  next();
}
