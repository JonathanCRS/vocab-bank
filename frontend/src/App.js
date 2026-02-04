import { useEffect, useState} from "react";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";
import { getWords, addWord, deleteWord } from "./services/api";

function App() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        getWords().then(data => setWords(data));
    }, []);

    function handleAddWord(wordData) {
        addWord(wordData).then(newWord => {
            setWords(prev => [...prev, newWord]);
        });
    }

    async function handleDelete(id) {
        try {
            await deleteWord(id);
            setWords(words.filter(word => word.id !== id))
        } catch (err) {
            console.error(err);
        }
    }

    return (
       <div className="app">
            <h1>📘 Vocab Bank</h1>

            <div className="content">
                <WordForm onAddWord={handleAddWord} />
                <WordList words={words} deleteWord={handleDelete} />
            </div>
        </div>
    )
}

export default App;