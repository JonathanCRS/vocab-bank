import sqlite3

conn = sqlite3.connect("vocab.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    definition TEXT NOT NULL,
    translation TEXT
)
""")

conn.commit()
conn.close()

print("Database initialized.")