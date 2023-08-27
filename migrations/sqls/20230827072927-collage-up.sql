-- Create the 'collage' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE collage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);