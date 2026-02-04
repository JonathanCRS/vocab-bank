import { useState } from "react";

function WordItem({ word, onDelete, onUpdate }) {
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        word: word.word,
        definition: word.definition,
        translation: word.translation,
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSave() {
        await onUpdate(word.id, formData);
        setIsEditing(false);
    }

    return (
        <li>
            <strong onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
                {word.word}
            </strong>

            {expanded && !isEditing && (
                <div>
                    <p>{word.definition}</p>
                    <p><em>{word.translation}</em></p>

                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(word.id)}>Delete</button>
                </div>
            )}

            {expanded && isEditing && (
                <div>
                    <input
                        name="word"
                        value={formData.word}
                        onChange={handleChange}
                    />
                    <input
                        name="definition"
                        value={formData.definition}
                        onChange={handleChange}
                    />
                    <input
                        name="translation"
                        value={formData.translation}
                        onChange={handleChange}
                    />

                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </li>
    );
}

export default WordItem;
