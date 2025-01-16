let notes = [];
const storage = window.localStorage;
const notesDiv = document.getElementById("notes");
const timestampDiv = document.getElementById("time");

window.onload = () => {
    const savedNotes = storage.getItem("notes");
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        notes.forEach(noteContent => add(noteContent));
    }
    updateTimestamp();
    setInterval(saveNotes, 2000);
};

class Note {
    constructor(content = "") {
        this.text = document.createElement("textarea");
        this.text.value = content;
        this.btn = document.createElement("button");
        this.btn.innerText = "Remove";
        this.btn.onclick = () => this.remove();

        notesDiv.appendChild(this.text);
        notesDiv.appendChild(this.btn);
        notesDiv.appendChild(document.createElement("br"));
    }

    remove() {
        const index = notes.indexOf(this.text.value);
        if (index > -1) {
            notes.splice(index, 1);
        }
        this.text.remove();
        this.btn.remove();
        saveNotes();
    }
}

function add(content = "") {
    const note = new Note(content);
    notes.push(note.text.value);
};

function saveNotes() {
    notes = Array.from(document.querySelectorAll("textarea")).map(textarea => textarea.value);
    storage.setItem("notes", JSON.stringify(notes));
    updateTimestamp();
};

function updateTimestamp() {
    const now = new Date();
    timestampDiv.innerText = `Last saved at: ${now.toLocaleTimeString()}`;
};
