const API_BASE = "http://127.0.0.1:5000";

export function getWords() {
    return fetch(`${API_BASE}/words`)
    .then(res => res.json());
}

export function addWord(wordData) {
    return fetch(`${API_BASE}/words`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wordData),
    }).then(res => res.json());
}

export async function deleteWord(id) {
    const res = await fetch(`${API_BASE}/words/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error ("Failed to delete word");
    }
    
    return res.json();
}