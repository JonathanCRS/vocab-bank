import WordItem from "./WordItem";

function WordList({ words, deleteWord, updateWord }) {
    return (
        <ul>
            {words.map(word => (
                <WordItem
                    key={word.id}
                    word={word}
                    onDelete={deleteWord}
                    onUpdate={updateWord}
                />
            ))}
        </ul>
    );
}

export default WordList;
