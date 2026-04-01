-- Zlata JPEG Bookings Schema
-- This runs automatically on first `docker compose up`

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS bookings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  type        TEXT,
  package_id  TEXT,
  extras      TEXT[],
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
);

-- Index for admin dashboard queries (sort by date)
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);

-- Seed a couple of example rows so the admin dashboard is not empty on first run
INSERT INTO bookings (name, email, type, package_id, extras, message, status) VALUES
  ('Elena Romanova', 'elena@example.com', 'wedding', 'platinum', ARRAY['photo-rush', 'vid-teaser'], 'Looking for a golden-hour outdoor ceremony shoot.', 'confirmed'),
  ('Marcus Sterling', 'marcus@example.com', 'portrait', 'premium', ARRAY['photo-custom'], 'Corporate headshots with a luxury editorial feel.', 'pending')
ON CONFLICT DO NOTHING;
