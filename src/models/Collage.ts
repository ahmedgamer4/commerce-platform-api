import client from "../db/postgresDB";
import HttpError from "./httpError";

export class CollageModel {
  // Create collage
  async createCollage(name: string, universityName: string) {
    // connect to database
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const mes = `Could not connect to database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    // query database
    let result;
    try {
      const sql =
        "INSERT INTO collage (name, university_name) VALUES ($1, $2) RETURNING *";
      result = await connection.query(sql, [name, universityName]);
    } catch (error) {
      const mes = `Could not create collage. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not create collage.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }

  // index collages
  async indexCollages(page: number = NaN, limit: number = NaN) {
    // connect to database
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const mes = `Could not connect to the database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    let result;

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql = "SELECT * FROM collage LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset]);
      } catch (error) {
        const mes = `Could not index collages. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(mes, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      // If page and limit are not provided, retrieve all collages
      try {
        const sql = "SELECT * FROM collage";
        result = await connection.query(sql);
      } catch (error) {
        const mes = `Could not retrieve all collages. ${
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
      const mes = `No collages found.`;
      const statusCode = 404;
      throw new HttpError(mes, statusCode);
    }

    // Calculate collages count
    let count;
    try {
      const sql = "SELECT COUNT(*) FROM collage";
      count = await connection.query(sql);
    } catch (error) {
      const mes = `Could not calculate collages count. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return { collages: result.rows, count: count.rows[0].count };
  }

  // Show collage
  async showCollage(id: string) {
    // connect to database
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const mes = `Could not connect to database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    // query database
    let result;
    try {
      const sql = "SELECT * FROM collage WHERE id = $1";
      result = await connection.query(sql, [id]);
    } catch (error) {
      const mes = `Could not show collage. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not show collage.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }

  // Update collage
  async updateCollage(name: string, universityName: string, id: string) {
    // connect to database
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const mes = `Could not connect to database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    // query database
    let result;
    try {
      if (name && !universityName) {
        const sql = "UPDATE collage SET name = $1 WHERE id = $2 RETURNING *";
        result = await connection.query(sql, [name, id]);
      } else if (universityName && !name) {
        const sql =
          "UPDATE collage SET university_name = $1 WHERE id = $2 RETURNING *";
        result = await connection.query(sql, [universityName, id]);
      } else {
        const sql =
          "UPDATE collage SET name = $1, university_name = $2 WHERE id = $3 RETURNING *";
        result = await connection.query(sql, [name, universityName, id]);
      }
    } catch (error) {
      const mes = `Could not update collage. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not update collage.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }

  // Remove collage
  async removeCollage(id: string) {
    // connect to database
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const mes = `Could not connect to database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    // query database
    let result;
    try {
      const sql = "DELETE FROM collage WHERE id = $1 RETURNING *";
      result = await connection.query(sql, [id]);
    } catch (error) {
      const mes = `Could not delete collage. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not delete collage.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }
}
