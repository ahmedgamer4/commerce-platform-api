import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";
import { Admin } from "./Admin"

export type Employee = Admin

type EmployeeResp = Omit<Employee, "password">

export default class EmployeeModel {
  private tableName = "employee";

  async createEmployee(name: string, email: string, passwordInput: string, collageId: string): Promise<EmployeeResp> {
    // Connect to database
    let connection;

    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = await hashingPassword(passwordInput);

    // Check if user already exists with the same email
    const userWithSameEmail = await connection.query(`SELECT * FROM ${this.tableName} WHERE email = $1`, [email]);
    if (!!userWithSameEmail.rows[0]) {
      throw new HttpError("Employee already exists", 400);
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
      const msg = `New employee could not be created: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);

    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New employee could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = res.rows[0] as Employee;
    return rest;
  }


  async authenticateEmployee(email: string, password: string): Promise<Employee> {
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
      const msg = `Employee could not be authenticated: ${(err as HttpError).message
        }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = "Employee could not be authenticated";
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    const hashedPassword = (res.rows[0] as Admin).password;
    const isMatched = compareHashedPassword(password, hashedPassword);

    if (!isMatched) {
      const msg = "Employee could not be authenticated";
      const statusCode = 401;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async showEmployee(id: string, collageId: string): Promise<EmployeeResp> {
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
      const msg = `Employee could not be retrieved: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Employee could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as Admin

    return rest;
  }


  async updateEmployee(
    id: string,
    name: string,
    passwordInput: string,
    email: string,
    collageId: string,
  ): Promise<EmployeeResp> {
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
      const query = `UPDATE ${this.tableName} SET name = COALESCE($1, name), password = COALESCE($2, password), email = COALESCE($3, email) WHERE id=$4 AND collage_id=$5 RETURNING *`;
      const hashedPassword = await hashingPassword(passwordInput);
      res = await connection.query(query, [name, hashedPassword, email, id, collageId]);
    } catch (err) {
      const msg = `Could not update employee: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Could not update employee`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as Employee;
    return rest;
  }


  // Support paging
  async indexEmployee(
    page: number,
    limit: number
  ): Promise<{ employees: EmployeeResp[]; count: number }> {
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
        const msg = `Could not index employees: ${(err as HttpError).message}`;
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
        const msg = `Could not get all employees: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = "No employees found";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM ${this.tableName}`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count employees. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const resp = []
    for (let employee of res.rows) {
      const { password, ...rest } = employee as Employee;
      resp.push(rest);
    }

    return {
      employees: resp,
      count: count.rows[0].count,
    };
  }

  async deleteEmployee(id: string, collageId: string): Promise<EmployeeResp> {
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
      const msg = `Employee could not be deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Employee could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = (res.rows[0]) as Employee

    return rest;
  }

}
