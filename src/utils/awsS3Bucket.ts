import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { AWSError } from "aws-sdk/lib/error";
import { PutObjectOutput, DeleteObjectOutput } from "aws-sdk/clients/s3";

dotenv.config();

// Configure environment variables
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.AWS_REGION!;
const bucketName = process.env.AWS_BUCKET_NAME!;
const expiresInMinutes = process.env.AWS_EXPIRES_IN_MINUTES!;

// Configure AWS Credentials
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

// Create Object
const generateAwsS3SignedUrlUpload = (
  fileName: string,
  fileType: string
): string => {
  // Configure AWS S3
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    region,
    params: { Bucket: bucketName },
  });

  // Generate signed URL for the file (to be uploaded to AWS S3 bucket)
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: parseInt(expiresInMinutes) * 60,
    ContentType: fileType,
  };

  // Generate signed URL (upload)
  let uploadSignedUrl: string;
  try {
    uploadSignedUrl = s3.getSignedUrl("putObject", s3Params);
  } catch (error) {
    throw new HttpError("Error generating signed URL (upload) for the file");
  }

  // Return signed URL (upload) and accessible URL
  return uploadSignedUrl;
};

// Access Object
const generateAwsS3SignedUrlAccess = async (
  fileName: string
): Promise<string> => {
  // Generate signed URL for the file (to be accessed from AWS S3 bucket)
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: parseInt(expiresInMinutes) * 60,
  };

  const s3 = new AWS.S3();
  // Generate accessible URL for the file
  let accessUrl: string;
  try {
    const url = await s3.getSignedUrlPromise("getObject", s3Params);
    accessUrl = url;
  } catch (error) {
    throw new HttpError("Error generating signed URL (access) for the file");
  }

  // Return accessible URL
  return accessUrl;
};

// Delete Object
const deleteAwsS3File = async (fileName: string): Promise<void> => {
  // Configure AWS S3
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    region,
    params: { Bucket: bucketName },
  });

  // Delete file from AWS S3 bucket
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    await s3.deleteObject(s3Params).promise();
  } catch (error) {
    throw new HttpError("Error deleting file from AWS S3 bucket");
  }
};

// Export
export {
  generateAwsS3SignedUrlUpload,
  generateAwsS3SignedUrlAccess,
  deleteAwsS3File,
};

// Define a custom HttpError class if not already defined
class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpError";
  }
}
