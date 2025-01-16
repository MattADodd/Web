let notes = [];
const storage = window.localStorage;
const notesDiv = document.getElementById("notes");
const timestampDiv = document.getElementById("time");

window.onload = () => {
    loadNotes();
    setInterval(loadNotes, 2000);
    setInterval(updateTimestamp, 2000);
};

class Note {
    constructor(content = "") {
        this.text = document.createElement("p");
        this.break = document.createElement("br");
        this.text.innerText = content;
        notesDiv.appendChild(this.text);
        notesDiv.appendChild(this.break);
    }

    remove() {
        notesDiv.removeChild(this.text);
        notesDiv.removeChild(this.break);
    }
}

function loadNotes() {
    const savedNotes = storage.getItem("notes");
    if (savedNotes) {
        const savedNotesArray = JSON.parse(savedNotes);

        // Remove notes not in savedNotesArray
        notes.forEach(note => {
            if (!savedNotesArray.includes(note.text.value)) {
                note.remove();
            }
        });

        // Add new notes from savedNotesArray if they are not in notes
        savedNotesArray.forEach(savedNote => {
            const exists = notes.some(note => note.text.value === savedNote);
            if (!exists) {
                add(savedNote);
            }
        });
    }
}


function add(content = "") {
    const note = new Note(content);
    notes.push(note);
}

function updateTimestamp() {
    const now = new Date();
    timestampDiv.innerText = `Last saved at: ${now.toLocaleTimeString()}`;
};
