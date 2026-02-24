-- Insert admin user
-- Password: admin123 (hashed with bcrypt)
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
  'admin',
  'admin@dzawanitour.com',
  '$2a$10$YourHashWillBeHere',
  'Administrator',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;
