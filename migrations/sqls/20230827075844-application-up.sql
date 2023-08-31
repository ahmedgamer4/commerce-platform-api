-- Create the 'application' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE application (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status VARCHAR(255) CHECK (status IN ('pending', 'first acceptance', 'reviewed', 'final acceptance')) DEFAULT 'pending',
    feedback TEXT,
    applying_fees_status BOOLEAN DEFAULT FALSE,
    program_fees_status BOOLEAN DEFAULT FALSE,
    program_id UUID,
    applicant_id UUID,
    FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);