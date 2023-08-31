import client from "../db/postgresDB";
import HttpError from "./httpError";

export class ProgramFileModel {
  // Create a program file
  async createProgramFile(name: string, type: string, program_id: string) {
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
      const query = `INSERT INTO program_file (name, type, program_id) VALUES ($1, $2, $3) RETURNING *`;

      result = await connection.query(query, [name, type, program_id]);
    } catch (err) {
      const msg = `Could not create program file: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not create program file`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }
  // Index all program files
  async indexProgramFiles(program_id: string) {
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
      const query = `SELECT * FROM program_file WHERE program_id = $1`;
      result = await connection.query(query, [program_id]);
    } catch (err) {
      const msg = `Could not index program files: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not index program files`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows;
  }

  // Delete a program file
  async deleteProgramFile(id: string, program_id: string) {
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
      const query = `DELETE FROM program_file WHERE id = $1 AND program_id = $2 RETURNING *`;
      result = await connection.query(query, [id, program_id]);
    } catch (err) {
      const msg = `Could not delete program file: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not delete program file`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }
}
