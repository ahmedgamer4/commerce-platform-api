import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";

export type Admin = {
  id: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class AdminModel {
  private tableName = "admin";

  async createAdmin(name: string, email: string, password: string, collegeId: string): Promise<Admin> {
    let connection;

    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = hashingPassword(password);

    let res;
    try {
      const query = `INSERT INTO ${this.tableName} (name, email, password) VALUES ($1, $2, $3) RETURNING *`;

      res = await connection.query(query, [name, email, hashedPassword]);
    } catch (err) {
      const msg = `New admin could not be created: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New admin could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async authenticateAdmin(email: string, password: string) {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to database. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE email = $1`;
      res = await connection.query(query, [email]);
    } catch (err) {

      const msg = `Admin could not be authenticated: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = "Admin could not be authenticated";
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = (res.rows[0] as Admin).password;
    const isMatched = compareHashedPassword(password, hashedPassword);

    if (!isMatched) {
      const msg = "Admin could not be authenticated";
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0]
  }

  // Support paging
  async indexAdmin(page: number, limit: number): Promise<{ admins: Admin[], count: number }> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to the database. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;

    if (page && limit) {
      const offset = (page - 1) * limit;

      try {
        // Query with pagination
        const query = `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`;
        res = await connection.query(query, [limit, offset]);
      } catch (err) {
        const msg = `Could not index admins: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {

      try {
        // Query with pagination
        const query = `SELECT * FROM ${this.tableName}`;
        res = await connection.query(query);
      } catch (err) {
        const msg = `Could not get all admins: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = "No admins found"
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM ${this.tableName}`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count admins. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return {
      admins: res.rows[0],
      count: count.rows[0].count,
    }
  }

  async showAdmin(id: string): Promise<Admin> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {

      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
      res = await connection.query(query, [id]);
    } catch (err) {

      const msg = `Admin could not be deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);

    } finally {
      connection.release();
    }


    if (res.rows.length === 0) {
      const msg = `Admin could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async updateAdmin(id: string, name: string, password: string): Promise<Admin> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {

      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      if (name && password) {
        const query = `UPDATE ${this.tableName} SET name=$1, password=$2 WHERE id=$3 RETURNING *`;
        const hashedPassword = hashingPassword(password);
        res = await connection.query(query, [name, hashedPassword, id]);

      } else if (name && !password) {
        const query = `UPDATE ${this.tableName} SET name=$1 WHERE id=$2 RETURNING *`;
        res = await connection.query(query, [name, id]);

      } else if (!name && password) {
        const query = `UPDATE ${this.tableName} SET  password=$2 WHERE id=$2 RETURNING *`;
        const hashedPassword = hashingPassword(password);
        res = await connection.query(query, [hashedPassword, id]);

      } else {
        return this.showAdmin(id);
      }
    } catch (err) {
      const msg = `Could not update admin: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }


    if (res.rows.length === 0) {
      const msg = `Could not update admin`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async deleteAdmin(id: string): Promise<Admin> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {

      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
      res = await connection.query(query, [id]);
    } catch (err) {

      const msg = `Admin could not be deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);

    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Admin could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];

  }
}
