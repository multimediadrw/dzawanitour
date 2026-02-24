-- Insert admin user
-- Email: multimediadrw@gmail.com
-- Password: Rahasiakita.88!
INSERT INTO "User" (
  "id",
  "username",
  "email",
  "password",
  "name",
  "role",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin-' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'multimediadrw',
  'multimediadrw@gmail.com',
  '$2b$10$lVPMu9Byg8zfaZWKBGCzXOV86U4144LMacsWvqpQT3NoMyA5Ax8Ea',
  'Multimedia DRW',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;
