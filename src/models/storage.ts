import client from "../db/postgresDB";
import HttpError from "./httpError";
import {
  generateAwsS3SignedUrlUpload,
  generateAwsS3SignedUrlAccess,
  deleteAwsS3File,
} from "../utils/awsS3Bucket";

export class StorageModel {
  // Create storage
  async createStorage(path: string, name: string, type: string, owner: string) {
    let connection;

    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let resutl;
    try {
      const sql =
        "INSERT INTO storage (path, name, type, owner) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [path, name, type, owner];
      resutl = await connection.query(sql, values);
    } catch (err) {
      const msg = `Could not create storage: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if storage was created
    if (resutl.rows.length === 0) {
      const msg = `Could not create storage`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Create aws s3 presigned url to upload file
    const storage = resutl.rows[0];
    const typeExtension = type.split("/")[1];
    const uploadUrl = generateAwsS3SignedUrlUpload(
      `${path}/${name}.${typeExtension}`,
      type
    );

    return uploadUrl;
  }
  // Access storage
  // Delete storage
}
