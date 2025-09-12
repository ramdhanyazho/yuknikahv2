-- invitations: satu undangan per slug
CREATE TABLE IF NOT EXISTS invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  location_name TEXT,
  location_address TEXT,
  maps_url TEXT,
  cover_image TEXT,
  music_url TEXT,
  theme TEXT DEFAULT 'classic',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- rsvps: respons tamu
CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invitation_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  attending INTEGER NOT NULL, -- 1 ya, 0 tidak
  guests_count INTEGER DEFAULT 1,
  message TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (invitation_id) REFERENCES invitations(id) ON DELETE CASCADE
);

-- wishes: ucapan/doa
CREATE TABLE IF NOT EXISTS wishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invitation_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (invitation_id) REFERENCES invitations(id) ON DELETE CASCADE
);
