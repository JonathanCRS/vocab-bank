import { useState } from "react";

function WordList({ words, deleteWord }) {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId(prev => (prev === id ? null : id));
  }

  return (
    <ul className="word-list">
      {words.map(word => (
        <li key={word.id} className="word-card">
          <div
            className="word-title"
            onClick={() => toggle(word.id)}
          >
            {word.word}
          </div>

          {openId === word.id && (
            <div className="word-details">
              <p><strong>Definition:</strong> {word.definition}</p>
              <p><strong>Translation:</strong> {word.translation}</p>

              <div className="actions">
                <button className="delete" onClick={() => deleteWord(word.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default WordList;
