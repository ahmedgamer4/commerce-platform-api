import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";

export class MasterModel {
  // Create Master
  async createMaster(name: string, email: string, password: string) {
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

    // hash password
    const hashedPassword = await hashingPassword(password);

    // query database
    let result;
    try {
      const sql =
        "INSERT INTO master (name, email, password) VALUES ($1, $2, $3) RETURNING *";
      result = await connection.query(sql, [name, email, hashedPassword]);
    } catch (error) {
      const mes = `Could not create master. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not create master.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }

  // Authenticate Master
  async authenticateMaster(email: string, password: string) {
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
      const sql = "SELECT * FROM master WHERE email = $1";
      result = await connection.query(sql, [email]);
    } catch (error) {
      const mes = `Could not authenticate master. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not authenticate master.`;
      const statusCode = 401;
      throw new HttpError(mes, statusCode);
    }

    // compare password
    const hashedPassword = result.rows[0].password;
    const isPasswordMatch = await compareHashedPassword(
      password,
      hashedPassword
    );

    if (!isPasswordMatch) {
      const mes = `Could not authenticate master.`;
      const statusCode = 401;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }

  // Show Master
  async showMaster(id: string) {
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
      const sql = "SELECT * FROM master WHERE id = $1";
      result = await connection.query(sql, [id]);
    } catch (error) {
      const mes = `Could not show master. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    if (result.rows.length === 0) {
      const mes = `Could not show master.`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return result.rows[0];
  }
}
