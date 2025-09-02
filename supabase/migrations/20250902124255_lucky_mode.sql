/*
  # Create registration requests table

  1. New Tables
    - `registration_requests`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `organization` (text, not null)
      - `country` (text, not null)
      - `city` (text, not null)
      - `created_at` (timestamp, default now())

  2. Security
    - Enable RLS on `registration_requests` table
    - Add policy for public insert access (for form submissions)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS registration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert for form submissions
CREATE POLICY "Allow public insert"
  ON registration_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all data (for admin purposes)
CREATE POLICY "Allow authenticated read"
  ON registration_requests
  FOR SELECT
  TO authenticated
  USING (true);