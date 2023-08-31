-- Create the 'program_file' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE program_file (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    program_id UUID,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
