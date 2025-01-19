// Reference to the browser's local storage
const STORAGE = window.localStorage;

// Reference to the div element where notes will be displayed
const NOTESDIV = document.getElementById("notes");

// Reference to the first element with the class "time" where the timestamp will be displayed
const TIMESTAMPDIV = document.getElementsByClassName("time")[0];

// Set the inner HTML of the element with the ID "backLink" to the value of the BACK variable
document.getElementById("backLink").innerHTML = BACK;

// Set the inner HTML of the element with the ID "addButton" to the value of the ADD variable
document.getElementById("addButton").innerHTML = ADD;

// Function to run when the window finishes loading
window.onload = () => {
    // Check if local storage is supported by the browser
    if (typeof (STORAGE) == "undefined") {
        document.write(NOTSUPPORTED); // Display a message if not supported
        window.stop(); // Stop further execution
    }
    // Retrieve the saved notes from local storage
    const savedNotes = STORAGE.getItem("notes");
    if (savedNotes) {
        const notes = JSON.parse(savedNotes); // Parse the JSON string into an array of note contents
        notes.forEach(noteContent => add(noteContent)); // Add each saved note to the page
    }
    updateTimestamp(); // Update the timestamp on page load
    setInterval(saveNotes, 2000); // Save notes to local storage every 2 seconds
};

// Define a Note class
class Note {
    constructor(content = "") {
        // Create a textarea element for the note content
        this.text = document.createElement("textarea");
        this.text.value = content; // Set the textarea value to the note content

        // Create a button to remove the note
        this.btn = document.createElement("button");
        this.btn.innerText = REMOVE; // Set the button text
        this.btn.onclick = () => this.remove(); // Set the button's click handler to call the remove method

        // Create a line break element
        this.break = document.createElement("br");

        // Append the textarea, button, and line break to the notes div
        NOTESDIV.appendChild(this.text);
        NOTESDIV.appendChild(this.btn);
        NOTESDIV.appendChild(this.break);

        // Style the button and textarea
        this.btn.style.verticalAlign = "middle";
        this.text.style.verticalAlign = "middle";
        this.btn.style.margin = "10px";
        this.text.style.margin = "10px";
    }

    // Method to remove the note from the DOM and update local storage
    remove() {
        this.text.remove(); // Remove the textarea element
        this.btn.remove(); // Remove the button element
        this.break.remove(); // Remove the line break element
        saveNotes(); // Save the updated notes to local storage
    }
}

// Function to add a new note
function add(content = "") {
    const note = new Note(content); // Create a new Note object with the provided content
}

// Function to save the notes to local storage
function saveNotes() {
    // Get the content of all textarea elements and store them in the notes array
    notes = Array.from(document.querySelectorAll("textarea")).map(textarea => textarea.value);
    STORAGE.setItem("notes", JSON.stringify(notes)); // Save the notes array as a JSON string in local storage
    updateTimestamp(); // Update the timestamp after saving the notes
}

// Function to update the timestamp display
// ChatGPT made this function
function updateTimestamp() {
    const now = new Date(); // Get the current date and time
    TIMESTAMPDIV.innerText = SAVE + now.toLocaleTimeString(); // Update the timestamp display
}
