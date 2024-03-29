DROP TABLE IF EXISTS log;


CREATE TABLE log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  eventType TEXT,
  description TEXT,
  timeVisited DATE DEFAULT CURRENT_TIMESTAMP
);
