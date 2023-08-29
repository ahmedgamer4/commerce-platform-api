import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";

type UserKind = "isAdmin" | "isEmployee";

type User = {
  id: string;
  password: string;
  email: string;
  collage_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type UserResp = Omit<User, "password">

export class BaseUserModel {
  private tableName: string;
  private msg: string;

  constructor(isWhat: UserKind) {
    if (isWhat === "isAdmin") {
      this.tableName = "admin";
      this.msg = "Admin could not be";
    } else {
      this.tableName = "employee";
      this.msg = "Employee could not be";
    }
  }

  async create(
    name: string,
    email: string,
    passwordInput: string,
    collageId: string
  ): Promise<UserResp> {
    let connection;

    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = await hashingPassword(passwordInput);

    const userWithSameEmail = await connection.query(`SELECT * FROM ${this.tableName} WHERE email = $1`, [email]);
    if (!!userWithSameEmail.rows[0]) {
      throw new HttpError(`${this.tableName.toUpperCase()} already exists`, 400);
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
      const msg = `New ${this.msg} created: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New ${this.msg} created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as User

    return rest;
  }

  async authenticate(email: string, password: string): Promise<User> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to database. ${(error as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE email = $1`;
      res = await connection.query(query, [email]);
    } catch (err) {
      const msg = `${this.msg} authenticated: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `${this.msg} authenticated`;
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = (res.rows[0] as User).password;
    const isMatched = compareHashedPassword(password, hashedPassword);

    if (!isMatched) {
      const msg = `${this.msg} authenticated`;
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  // Support paging
  async index(
    page: number,
    limit: number
  ): Promise<{ users: UserResp[]; count: number }> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to the database. ${(error as HttpError).message
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
        const msg = `Could not index ${this.tableName}s: ${(err as HttpError).message}`;
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
        const msg = `Could not get all ${this.tableName}s: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = `No ${this.tableName}s found`;
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM ${this.tableName}`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count ${this.tableName}s. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const resp = []
    for (let admin of res.rows) {
      const { password, ...rest } = admin as User;
      resp.push(rest);
    }

    return {
      users: resp,
      count: count.rows[0].count,
    };
  }

  async show(id: string, collageId: string): Promise<UserResp> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1 AND collage_id = $2`;
      res = await connection.query(query, [id, collageId]);
    } catch (err) {
      const msg = `${this.msg} retrieved: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `${this.msg} retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as User

    return rest;
  }

  async update(
    id: string,
    name: string,
    passwordInput: string,
    email: string,
    collageId: string,
  ): Promise<UserResp> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      if (name && passwordInput && email) {

        const query = `UPDATE ${this.tableName} SET name=$1, password=$2, email=$3 WHERE id=$4 AND collage_id=$5 RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [name, hashedPassword, email, id, collageId]);
      } else if (name && passwordInput) {

        const query = `UPDATE ${this.tableName} SET name=$1, password=$2 WHERE id=$3 AND collage_id=$4  RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [name, hashedPassword, id, collageId]);
      } else if (name && email) {

        const query = `UPDATE ${this.tableName} SET name=$1, email=$2 WHERE id=$3 AND collage_id=$4 RETURNING *`;
        res = await connection.query(query, [name, email, id, collageId]);
      } else if (passwordInput && email) {

        const query = `UPDATE ${this.tableName} SET email=$1, password=$2 WHERE id=$3 AND collage_id=$4 RETURNING *`;
        const hashedPassword = await hashingPassword(passwordInput);
        res = await connection.query(query, [email, hashedPassword, id, collageId]);
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
        return this.show(id, collageId);
      }
    } catch (err) {
      const msg = `Could not update ${this.tableName}: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Could not update ${this.tableName}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as User

    return rest;
  }

  async delete(id: string, collageId: string): Promise<UserResp> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = $1 AND collage_id=$2 RETURNING *`;
      res = await connection.query(query, [id, collageId]);
    } catch (err) {
      const msg = `${this.msg} deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `${this.msg} deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as User

    return rest;
  }
}
