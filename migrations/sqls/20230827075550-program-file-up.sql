-- Create the 'program_file' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE program_file (
    name VARCHAR(255) NOT NULL,
    program_id UUID,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
