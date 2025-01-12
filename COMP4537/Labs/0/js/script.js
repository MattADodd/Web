const colors = ["blue", "red", "green", "purple", "orange", "cyan", "yellow"];
const textColor = "black";
const button = "button";
const startButtonID = "startGame";
const h1 = "h1";
const pixels = "px";
const abs = "absolute";
const textInput = "buttonInput";
const oneSecond = 1000;
const twoSeconds = 2000;
const baseTen = 10;
const additionalOffset = 30;

class Button {
    constructor(color, number, buttonManager) {
        this.number = number;
        this.buttonManager = buttonManager;
        this.btn = document.createElement(button);
        this.btn.style.backgroundColor = color;
        this.btn.textContent = number;
        this.btn.disabled = true;
        this.btn.onclick = () => {
            this.buttonManager.buttonClick(this.number);
            this.btn.style.color = textColor;
        }
        document.body.appendChild(this.btn);
    }

    //ChatGPT used for this function
    moveToRandomLocation() {
        this.btn.style.position = abs;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxLeft = windowWidth - this.btn.offsetWidth - additionalOffset;
        const maxTop = windowHeight - this.btn.offsetHeight - additionalOffset;

        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;

        this.btn.style.left = randomLeft + pixels;
        this.btn.style.top = randomTop + pixels;
    }
}

class ButtonManager {
    constructor(game) {
        this.game = game;
        this.buttons = [];
        this.clickedButtons = [];
        this.usedColors = [];
    }

    createButtons(numButtons) {
        this.reset();
        const gameStart = document.getElementById(startButtonID);
        gameStart.disabled = true;

        for (let i = 0; i < numButtons; i++) {
            const color = this.getColor();
            const button = new Button(color, i + 1, this);
            this.buttons.push(button);
        }

        setTimeout(() => this.scrambleButtons(numButtons), numButtons * oneSecond - twoSeconds);
    }

    //ChatGPT used for this function
    getColor() {
        const availableColors = colors.filter(color => !this.usedColors.includes(color));
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const selectedColor = availableColors[randomIndex];
        this.usedColors.push(selectedColor);
        return selectedColor;
    }

    scrambleButtons(numTimes) {
        let count = 0;

        const scrambleInterval = setInterval(() => {
            this.buttons.forEach(button => button.moveToRandomLocation());
            count++;

            if (count >= numTimes) {
                clearInterval(scrambleInterval);
                this.buttons.forEach(button => {
                    button.btn.style.color = button.btn.style.backgroundColor;
                    button.btn.disabled = false;
                });
            }
        }, twoSeconds);
    }

    buttonClick(number) {
        if (this.clickedButtons.length === 0) {
            if (number !== 1) {
                this.game.lose();
                this.buttons.forEach(button => {
                    button.btn.disabled = true;
                    button.btn.style.color = textColor;
                });
                return;
            }
        } else {
            if (number !== this.clickedButtons[this.clickedButtons.length - 1] + 1) {
                this.game.lose();
                this.buttons.forEach(button => {
                    button.btn.disabled = true;
                    button.btn.style.color = textColor;
                });
                return;
            }
        }
        this.clickedButtons.push(number);
        if (this.clickedButtons.length === this.buttons.length) {
            this.game.win();
            this.buttons.forEach(button => button.btn.disabled = true);
        }
    }

    reset() {
        const buttons = document.querySelectorAll(button);
        buttons.forEach(button => button.remove());
        const messages = document.querySelectorAll(h1);
        messages.forEach(message => message.remove());
        this.buttons = [];
        this.clickedButtons = [];
        this.usedColors = [];
    }
}

class Game {
    constructor() {
        this.buttonManager = new ButtonManager(this);
    }

    win() {
        const message = document.createElement(h1);
        message.textContent = winMessage;
        document.body.appendChild(message);
        const gameStart = document.getElementById(startButtonID);
        gameStart.disabled = false;
    }

    lose() {
        const message = document.createElement(h1);
        message.textContent = loseMessage;
        document.body.appendChild(message);
        const gameStart = document.getElementById(startButtonID);
        gameStart.disabled = false;
    }

    start(numButtons) {
        this.buttonManager.createButtons(numButtons);
    }
}

const game = new Game();

function startButton() {
    const numButtons = parseInt(document.getElementById(textInput).value, baseTen);
    game.start(numButtons);
};
