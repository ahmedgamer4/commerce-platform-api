import client from "../db/postgresDB";
import HttpError from "./httpError";

export class ApplicationModel {
  // Create application
  async createApplication(applicant_id: string, program_id: string) {
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
      const sql =
        "INSERT INTO application (applicant_id, program_id) VALUES ($1, $2) RETURNING *";
      result = await connection.query(sql, [applicant_id, program_id]);
    } catch (err) {
      const msg = `Could not create application: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not create application`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the application
    const application = result.rows[0];
    return { application };
  }
  // Index applications by applicant id
  async indexApplicationsByApplicantId(
    applicant_id: string,
    page: number = NaN,
    limit: number = NaN
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
    if (page && limit) {
      const offset = (page - 1) * limit;

      try {
        const sql = `SELECT * FROM application WHERE applicant_id = $1 OFFSET $2 LIMIT $3`;
        result = await connection.query(sql, [applicant_id, offset, limit]);
      } catch (err) {
        const msg = `Could not index applications: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {
      try {
        const sql = `SELECT * FROM application WHERE applicant_id = $1`;
        result = await connection.query(sql, [applicant_id]);
      } catch (err) {
        const msg = `Could not index applications: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not index applications`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // calculate the total number of applications
    let totalApplications;
    try {
      const sql = `SELECT COUNT(*) FROM application WHERE applicant_id = $1`;
      totalApplications = await connection.query(sql, [applicant_id]);
    } catch (err) {
      const msg = `Could not calculate the total number of applications: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the applications
    const applications = result.rows;
    return { applications, totalApplications: totalApplications.rows[0] };
  }

  // Index applications by program id
  async indexApplicationsByProgramId(
    program_id: string,
    page: number = NaN,
    limit: number = NaN
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
    if (page && limit) {
      const offset = (page - 1) * limit;

      try {
        const sql = `SELECT * FROM application WHERE program_id = $1 OFFSET $2 LIMIT $3`;
        result = await connection.query(sql, [program_id, offset, limit]);
      } catch (err) {
        const msg = `Could not index applications: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {
      try {
        const sql = `SELECT * FROM application WHERE program_id = $1`;
        result = await connection.query(sql, [program_id]);
      } catch (err) {
        const msg = `Could not index applications: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not index applications`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // calculate the total number of applications
    let totalApplications;
    try {
      const sql = `SELECT COUNT(*) FROM application WHERE program_id = $1`;
      totalApplications = await connection.query(sql, [program_id]);
    } catch (err) {
      const msg = `Could not calculate the total number of applications: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the applications
    const applications = result.rows;
    return { applications, totalApplications: totalApplications.rows[0] };
  }
  // Show application by id
  async showApplicationById(id: string) {
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
      const sql = `SELECT * FROM application WHERE id = $1`;
      result = await connection.query(sql, [id]);
    } catch (err) {
      const msg = `Could not show application: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not show application`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the application
    const application = result.rows[0];
    return { application };
  }

  // Update application by id
  async updateApplicationById(
    id: string,
    status: string,
    feedback: string,
    applying_fees_status: boolean,
    program_fees_status: boolean
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
      // Update only the provided fields dynamically using COALESCE
      const sql = `UPDATE application SET status = COALESCE($1, status), feedback = COALESCE($2, feedback), applying_fees_status = COALESCE($3, applying_fees_status), program_fees_status = COALESCE($4, program_fees_status) WHERE id = $5 RETURNING *`;
      result = await connection.query(sql, [
        status,
        feedback,
        applying_fees_status,
        program_fees_status,
        id,
      ]);
    } catch (err) {
      const msg = `Could not update application: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not update application`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the application
    const application = result.rows[0];
    return { application };
  }

  // Delete application by id
  async deleteApplicationById(id: string) {
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
      const sql = `DELETE FROM application WHERE id = $1 RETURNING *`;
      result = await connection.query(sql, [id]);
    } catch (err) {
      const msg = `Could not delete application: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not delete application`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the application
    const application = result.rows[0];
    return application;
  }
}
