from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello from Flask!"

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/words")
def get_words():
    conn = sqlite3.connect("vocab.db")
    cursor = conn.cursor()

    cursor.execute("SELECT id, word, definition, translation FROM words")
    rows = cursor.fetchall()

    conn.close()

    words = []
    for row in rows:
        words.append({
            "id": row[0],
            "word": row[1],
            "definition": row[2],
            "translation": row[3]
        })
    return jsonify(words)
    
@app.route("/words", methods=["POST"])
def add_word():
    data = request.get_json()

    word = data.get("word")
    definition = data.get("definition")
    translation = data.get("translation")

    if not word or not definition:
        return jsonify({"error": "word and definition required"}), 400

    conn = sqlite3.connect("vocab.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO words (word, definition, translation) VALUES (?, ?, ?)",
        (word, definition, translation)
    )
    conn.commit()

    return jsonify({
        "id": cursor.lastrowid,
        "word": word,
        "definition": definition,
        "translation": translation
    }), 201

@app.route("/words/<int:word_id>", methods=["DELETE"])
def delete_word(word_id):
    conn = sqlite3.connect("vocab.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM words WHERE id = ?",
        (word_id,)
    )
    conn.commit()

    return jsonify({"message": "word deleted"}), 200

@app.route("/words/<int:word_id>", methods=["PUT"])
def update_word(word_id):
    data = request.get_json()

    conn = sqlite3.connect("vocab.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE words
        SET word = ?, definition = ?, translation = ?
        WHERE id = ?
        """,
        (data["word"], data["definition"], data["translation"], word_id)
    )

    conn.commit()

    return jsonify({
        "id": word_id,
        "word": data["word"],
        "definition": data["definition"],
        "translation": data["translation"],
    }), 200
    
if __name__ == "__main__":
    app.run(debug=True)