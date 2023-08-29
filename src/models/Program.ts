import client from "../db/postgresDB";
import HttpError from "./httpError";

export class ProgramModel {
  // Create a new program
  async createProgram(
    name: string,
    description: string,
    applying_fees: number,
    program_fees: number,
    open_at: Date,
    close_at: Date,
    credit_hour_fees: number,
    collage_id: string
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

    let result;
    try {
      const query = `INSERT INTO program (name, description, applying_fees, program_fees, open_at, close_at, credit_hour_fees, collage_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

      result = await connection.query(query, [
        name,
        description,
        applying_fees,
        program_fees,
        open_at,
        close_at,
        credit_hour_fees,
        collage_id,
      ]);
    } catch (err) {
      const msg = `New program could not be created: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `New program could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  // Index all programs
  async indexPrograms(page: number, limit: number, collage_id: string) {
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

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql =
          "SELECT * FROM program WHERE collage_id = $3 LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset, collage_id]);
      } catch (error) {
        const mes = `Could not index program. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(mes, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      // If page and limit are not provided, retrieve all program
      try {
        const sql = "SELECT * FROM program WHERE collage_id = $1";
        result = await connection.query(sql, [collage_id]);
      } catch (error) {
        const mes = `Could not retrieve all programs. ${
          (error as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(mes, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    }

    if (result.rows.length === 0) {
      const mes = `No programs found.`;
      const statusCode = 404;
      throw new HttpError(mes, statusCode);
    }

    // Calculate programs count
    let count;
    try {
      const sql = "SELECT COUNT(*) FROM program";
      count = await connection.query(sql);
    } catch (error) {
      const mes = `Could not calculate programs count. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return { programs: result.rows, count: count.rows[0].count };
  }

  // Show a program
  async showProgram(id: string, collage_id: string) {
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
      const query = `SELECT * FROM program WHERE id = $1 AND collage_id = $2`;

      result = await connection.query(query, [id, collage_id]);
    } catch (err) {
      const msg = `Could not show program: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Program not found.`;
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  // Update a program
  async updateProgram(
    id: string,
    name: string,
    description: string,
    applying_fees: number,
    program_fees: number,
    open_at: Date,
    close_at: Date,
    credit_hour_fees: number,
    collage_id: string
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

    console.log(open_at);
    console.log(close_at);

    let result;
    try {
      // Update only the provided fields dynamically
      const query = `UPDATE program SET name = COALESCE($1, name), description = COALESCE($2, description), applying_fees = COALESCE($3, applying_fees), program_fees = COALESCE($4, program_fees), open_at = COALESCE($5, open_at), close_at = COALESCE($6, close_at), credit_hour_fees = COALESCE($7, credit_hour_fees) WHERE id = $8 AND collage_id = $9 RETURNING *`;

      result = await connection.query(query, [
        name,
        description,
        applying_fees,
        program_fees,
        new Date(open_at),
        new Date(close_at),
        credit_hour_fees,
        id,
        collage_id,
      ]);
    } catch (err) {
      const msg = `Could not update program: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Program not found.`;
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  // Delete a program
  async deleteProgram(id: string, collage_id: string) {
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
      const query = `DELETE FROM program WHERE id = $1 AND collage_id = $2 RETURNING *`;
      result = await connection.query(query, [id, collage_id]);
    } catch (err) {
      const msg = `Could not delete program: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Program not found.`;
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }
}

export default ProgramModel;
