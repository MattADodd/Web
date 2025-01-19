// Initialize an empty array to store notes
let notes = [];

// Reference to the browser's local storage
const STORAGE = window.localStorage;

// Reference to the div element where notes will be displayed
const NOTESDIV = document.getElementById("notes");

// Reference to the first element with the class "time" where the timestamp will be displayed
const TIMESTAMPDIV = document.getElementsByClassName("time")[0];

// Set the inner HTML of the element with the ID "backLink" to the value of the BACK variable
document.getElementById("backLink").innerHTML = BACK;

// Function to run when the window finishes loading
window.onload = () => {
    // Check if local storage is supported by the browser
    if (typeof (Storage) == "undefined") {
        document.write(NOTSUPPORTED); // Display a message if not supported
        window.stop(); // Stop further execution
    }
    loadNotes(); // Load the notes from local storage
    updateTimestamp(); // Update the timestamp on page load
    setInterval(loadNotes, 2000); // Reload the notes every 2 seconds
    setInterval(updateTimestamp, 2000); // Update the timestamp every 2 seconds
};

// Define a Note class
class Note {
    constructor(content = "") {
        this.content = content; // Set the content of the note
        this.text = document.createElement("p"); // Create a paragraph element for the note content
        this.break = document.createElement("br"); // Create a line break element
        this.text.innerText = content; // Set the paragraph text to the note content
        NOTESDIV.appendChild(this.text); // Append the paragraph to the notes div
        NOTESDIV.appendChild(this.break); // Append the line break to the notes div
    }

    // Method to remove the note from the DOM and the notes array
    remove() {
        this.text.remove(); // Remove the paragraph element
        this.break.remove(); // Remove the line break element

        // Find the index of the note in the notes array
        const index = notes.findIndex(note => note.content === this.content);
        if (index !== -1) {
            notes.splice(index, 1); // Remove the note from the array
        }
    }
}

// Function to load notes from local storage
function loadNotes() {
    const savedNotes = STORAGE.getItem("notes"); // Get the saved notes from local storage
    if (savedNotes) {
        const savedNotesArray = JSON.parse(savedNotes); // Parse the JSON string into an array
        let i = 0;
        // Check for differences between the notes in the DOM and the saved notes
        while (i < notes.length) {
            if (notes && notes[i].text.innerText != savedNotesArray[i]) {
                notes[i].remove(); // Remove the note if it doesn't match
            } else {
                i++;
            }
        }
        // Add new notes from the saved notes array
        for (let i = notes.length; i < savedNotesArray.length; i++) {
            add(savedNotesArray[i]);
        }
    } else {
        notes.forEach(note => note.remove()); // Remove all notes if no saved notes are found
    }
}

// Function to add a new note
function add(content = "") {
    const note = new Note(content); // Create a new Note object
    notes.push(note); // Add the note to the notes array
}

// Function to update the timestamp display
// ChatGPT made this function
function updateTimestamp() {
    const now = new Date(); // Get the current date and time
    TIMESTAMPDIV.innerText = SAVE + now.toLocaleTimeString(); // Update the timestamp display
}
