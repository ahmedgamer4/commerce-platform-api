-- Create the 'program' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE program (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    applying_fees INT,
    program_fees INT,
    open_at DATE,
    close_at DATE,
    credit_hour_fees INT,
    collage_id UUID,
    FOREIGN KEY (collage_id) REFERENCES collage(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);