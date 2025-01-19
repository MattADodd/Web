let notes = [];
const STORAGE = window.localStorage;
const NOTESDIV = document.getElementById("notes");
const TIMESTAMPDIV = document.getElementsByClassName("time")[0];

document.getElementById("backLink").innerHTML = BACK;

window.onload = () => {
    if (typeof (Storage) == "undefined") {
        document.write(NOTSUPPORTED);
        window.stop();
    }
    loadNotes();
    updateTimestamp();
    setInterval(loadNotes, 2000);
    setInterval(updateTimestamp, 2000);
};

class Note {
    constructor(content = "") {
        this.content = content; 
        this.text = document.createElement("p");
        this.break = document.createElement("br");
        this.text.innerText = content;
        NOTESDIV.appendChild(this.text);
        NOTESDIV.appendChild(this.break);
    }

    remove() {
        this.text.remove();
        this.break.remove();

        const index = notes.findIndex(note => note.content === this.content);
        if (index !== -1) {
            notes.splice(index, 1); 
        }
    }
}

function loadNotes() {
    const savedNotes = STORAGE.getItem("notes");
    if (savedNotes) {
        const savedNotesArray = JSON.parse(savedNotes); 
        let i = 0;
        while ( i < notes.length) {
            if (notes && notes[i].text.innerText != savedNotesArray[i]) {
                notes[i].remove();
            } else {
                i++;
            }
        }

        for (let i = notes.length; i < savedNotesArray.length; i++) {
            add(savedNotesArray[i]);
        }
    } else {
        notes.forEach(note => note.remove());
    }
}

function add(content = "") {
    const note = new Note(content);
    notes.push(note); 
}

function updateTimestamp() {
    const now = new Date();
    TIMESTAMPDIV.innerText = SAVE + now.toLocaleTimeString();
}
