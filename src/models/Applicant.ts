import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";

export class ApplicantModel {
  async createApplicant(
    email: string,
    password: string,
    name: string,
    national_id: string,
    gender: string
  ) {
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

    let hashedPassword: string;
    try {
      hashedPassword = await hashingPassword(password);
    } catch (err) {
      const msg = `Could not hash password: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let result;
    try {
      const query = `INSERT INTO applicant (name, email, password, national_id, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      result = await connection.query(query, [
        name,
        email,
        hashedPassword,
        national_id,
        gender,
      ]);
    } catch (err) {
      const msg = `Could not create applicant: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not create applicant`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created applicant
    const applicant = result.rows[0];
    delete applicant.password;
    return applicant;
  }

  // Authenticate applicant
  async authenticateApplicant(email: string, password: string) {
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

    let result;
    try {
      const query = `SELECT * FROM applicant WHERE email = $1`;

      result = await connection.query(query, [email]);
    } catch (err) {
      const msg = `Could not authenticate applicant: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not authenticate applicant`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Check if the password is correct
    const applicant = result.rows[0];
    const isPasswordCorrect = await compareHashedPassword(
      password,
      applicant.password
    );

    if (!isPasswordCorrect) {
      const msg = `Could not authenticate applicant`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created applicant
    const applicantCopy = result.rows[0];
    delete applicantCopy.password;
    return applicantCopy;
  }

  // Show applicant profile
  async showApplicant(applicantId: string) {
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

    let result;
    try {
      const query = `SELECT * FROM applicant WHERE id = $1`;

      result = await connection.query(query, [applicantId]);
    } catch (err) {
      const msg = `Could not show applicant: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not show applicant`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created applicant
    const applicant = result.rows[0];
    delete applicant.password;
    return applicant;
  }
}
