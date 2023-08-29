import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";

export type Admin = {
  id: string;
  password: string;
  email: string;
  collage_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type AdminResp = Omit<Admin, "password">;

export class AdminModel {
  private tableName = "admin";

  async createAdmin(
    name: string,
    email: string,
    passwordInput: string,
    collageId: string
  ): Promise<AdminResp> {
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

    const hashedPassword = await hashingPassword(passwordInput);

    const userWithSameEmail = await connection.query(
      `SELECT * FROM ${this.tableName} WHERE email = $1`,
      [email]
    );
    if (!!userWithSameEmail.rows[0]) {
      throw new HttpError("Admin already exists", 400);
    }

    let res;
    try {
      const query = `INSERT INTO ${this.tableName} (name, email, password, collage_id) VALUES ($1, $2, $3, $4) RETURNING *`;

      res = await connection.query(query, [
        name,
        email,
        hashedPassword,
        collageId,
      ]);
    } catch (err) {
      const msg = `New admin could not be created: ${
        (err as HttpError).message
      }`;
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

    const { password, ...rest } = res.rows[0] as Admin;

    return rest;
  }

  async authenticateAdmin(email: string, password: string): Promise<Admin> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE email = $1`;
      res = await connection.query(query, [email]);
    } catch (err) {
      const msg = `Admin could not be authenticated: ${
        (err as HttpError).message
      }`;
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

    return res.rows[0];
  }

  // Support paging
  async indexAdmin(
    page: number,
    limit: number
  ): Promise<{ admins: AdminResp[]; count: number }> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to the database. ${
        (error as HttpError).message
      }`;
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
      const msg = "No admins found";
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

    const resp = [];
    for (let admin of res.rows) {
      const { password, ...rest } = admin as Admin;
      resp.push(rest);
    }

    return {
      admins: resp,
      count: count.rows[0].count,
    };
  }

  async showAdmin(id: string, collageId: string): Promise<AdminResp> {
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

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Admin could not be retrieved: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Admin could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = res.rows[0] as Admin;

    return rest;
  }

  async updateAdmin(
    id: string,
    name: string,
    passwordInput: string,
    email: string,
    collageId: string
  ): Promise<AdminResp> {
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

    let res;
    try {
      if (name && passwordInput && email) {
        const query = `UPDATE ${this.tableName} SET name=$1, password=$2, email=$3 WHERE id=$4 AND collage_id=$5 RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [
          name,
          hashedPassword,
          email,
          id,
          collageId,
        ]);
      } else if (name && passwordInput) {
        const query = `UPDATE ${this.tableName} SET name=$1, password=$2 WHERE id=$3 AND collage_id=$4  RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [
          name,
          hashedPassword,
          id,
          collageId,
        ]);
      } else if (name && email) {
        const query = `UPDATE ${this.tableName} SET name=$1, email=$2 WHERE id=$3 AND collage_id=$4 RETURNING *`;
        res = await connection.query(query, [name, email, id, collageId]);
      } else if (passwordInput && email) {
        const query = `UPDATE ${this.tableName} SET email=$1, password=$2 WHERE id=$3 AND collage_id=$4 RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [
          email,
          hashedPassword,
          id,
          collageId,
        ]);
      } else if (name && !passwordInput && !email) {
        const query = `UPDATE ${this.tableName} SET name=$1 WHERE id=$2 AND collage_id=$3 RETURNING *`;
        res = await connection.query(query, [name, id, collageId]);
      } else if (email) {
        const query = `UPDATE ${this.tableName} SET email=$1 WHERE id=$2 AND collage_id=$3 RETURNING *`;
        res = await connection.query(query, [email, id, collageId]);
      } else if (passwordInput) {
        const query = `UPDATE ${this.tableName} SET  password=$1 WHERE id=$2 AND collage_id=$3 RETURNING *`;
        const hashedPassword = hashingPassword(passwordInput);
        res = await connection.query(query, [hashedPassword, id, collageId]);
      } else {
        return this.showAdmin(id, collageId);
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

    const { password, ...rest } = res.rows[0] as Admin;

    return rest;
  }

  async deleteAdmin(id: string, collageId: string): Promise<AdminResp> {
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

    let res;
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = $1 AND collage_id=$2 RETURNING *`;
      res = await connection.query(query, [id, collageId]);
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

    const { password, ...rest } = res.rows[0] as Admin;

    return rest;
  }
}
