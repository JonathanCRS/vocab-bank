import { useState } from "react";

function WordForm({ onAddWord}) {
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [translation, setTranslation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
    

        onAddWord({
            word,
            definition,
            translation,
        });

        setWord("");
        setDefinition("");
        setTranslation("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Word" value={word} 
                    onChange={(e) => setWord(e.target.value)}/>
            <input placeholder="Definition" value={definition} 
                    onChange={(e) => setDefinition(e.target.value)}/>
            <input placeholder="Translation" value={translation} 
                    onChange={(e) => setTranslation(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    );
}

export default WordForm;