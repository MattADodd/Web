const STORAGE = window.localStorage;
const NOTESDIV = document.getElementById("notes");
const TIMESTAMPDIV = document.getElementsByClassName("time")[0];

document.getElementById("backLink").innerHTML = BACK;
document.getElementById("addButton").innerHTML = ADD;

window.onload = () => {
    if (typeof (STORAGE) == "undefined") {
        document.write(NOTSUPPORTED);
        window.stop();
        }
    const savedNotes = STORAGE.getItem("notes");
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
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
        this.btn.innerText = REMOVE;
        this.btn.onclick = () => this.remove();
        this.break = document.createElement("br")
        NOTESDIV.appendChild(this.text);
        NOTESDIV.appendChild(this.btn);
        NOTESDIV.appendChild(this.break);
        this.btn.style.verticalAlign = "middle";
        this.text.style.verticalAlign = "middle";
        this.btn.style.margin = "10px";
        this.text.style.margin = "10px";
    }

    remove() {
        const index = notes.indexOf(this.text.value);
        this.text.remove();
        this.btn.remove();
        this.break.remove();
        saveNotes();
    }
}

function add(content = "") {
    const note = new Note(content);
};

function saveNotes() {
    notes = Array.from(document.querySelectorAll("textarea")).map(textarea => textarea.value);
    STORAGE.setItem("notes", JSON.stringify(notes));
    updateTimestamp();
};

function updateTimestamp() {
    const now = new Date();
    TIMESTAMPDIV.innerText = SAVE + now.toLocaleTimeString();
};
