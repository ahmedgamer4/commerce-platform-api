-- Create the 'application' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE application (
    applicant_id UUID,
    status VARCHAR(255) CHECK (status IN ('pending', 'first acceptance', 'reviewed', 'final acceptance')),
    program_id UUID,
    feedback TEXT,
    applying_fees_status BOOLEAN,
    program_fees_status BOOLEAN,
    FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);