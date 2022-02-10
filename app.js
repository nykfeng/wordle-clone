import { keyboard } from "./js/utilities.js";
import { word } from "./js/utilities.js";

const msgEl = document.querySelector("#message-container");
const gameEL = document.querySelector("#game-container");
const keyboardEl = document.querySelector("#keyboard-container");
let keyboardRow1El;
let keyboardRow2El;
let keyboardRow3El;

// starting position of the word table
let currentRow = 0;
let currentCell = 0;

// game state
let isGameOver = false;
let isCurrentRowOver = false;

// handler for key being pressed
const keyboardHandler = function (key) {
  if (key === "<<") {
    if (!isCurrentRowOver) {
      removeLetter();
    }
    return;
  }
  if (key === "ENTER") {
    validateRow();
    return;
  }
  addLetter(key);
};

// Listen for keyboard typing event
window.addEventListener("keydown", function (e) {
  // if there was problem getting the word, keyboard event should not execute
  if (word != null) {
    // console.log("word " + word);
    let keyPressed = e.key.toUpperCase();

    if (keyPressed === "BACKSPACE") keyPressed = "<<";
    if (keyboard.includes(keyPressed)) {
      keyboardHandler(keyPressed);
    }
  }
});

// creating key elements
keyboard.forEach((key, index) => {
  const keyEl = document.createElement("button");
  keyEl.addEventListener("click", () => keyboardHandler(key));
  keyEl.setAttribute("id", `${key}-key`);
  keyEl.className = "key";
  keyEl.textContent = key;

  if (index < 10) {
    if (!keyboardRow1El) {
      keyboardRow1El = document.createElement("div");
      keyboardRow1El.className = 'keyboard-row';
      keyboardEl.append(keyboardRow1El);
    }
    keyboardRow1El.append(keyEl);
  } else if (index >= 10 && index < 20) {
    if (!keyboardRow2El) {
      keyboardRow2El = document.createElement("div");
      keyboardRow2El.className = 'keyboard-row';
      keyboardEl.append(keyboardRow2El);
    }
    keyboardRow2El.append(keyEl);
  } else {
    if (!keyboardRow3El) {
      keyboardRow3El = document.createElement("div");
      keyboardRow3El.className = 'keyboard-row';
      keyboardEl.append(keyboardRow3El);
    }
    keyboardRow3El.append(keyEl);
  }
});

// the guess word table grid
const gameRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// creating the guess word table for the game
gameRows.forEach((row, index) => {
  const rowEl = document.createElement("div");
  rowEl.setAttribute("id", "row-" + index);
  row.forEach((col, i) => {
    const cellEl = document.createElement("div");
    cellEl.setAttribute("id", "row-" + index + "-cell-" + i);
    cellEl.className = "cell";
    cellEl.textContent = col;
    rowEl.append(cellEl);
  });
  gameEL.append(rowEl);
});

// adding letters to a row after clicked
const addLetter = function (key) {
  if (currentCell < 5) {
    const cellEl = document.querySelector(
      `#row-${currentRow}-cell-${currentCell}`
    );
    cellEl.classList.add("enlarge");
    cellEl.textContent = key;
    gameRows[currentRow][currentCell] = key;
    currentCell++;
  }
};

// removing letters to a row after << clicked
const removeLetter = function () {
  if (currentCell > 0) {
    currentCell--;
    const cellEl = document.querySelector(
      `#row-${currentRow}-cell-${currentCell}`
    );
    cellEl.textContent = "";
    cellEl.classList.remove("enlarge");
  }
};

// validating guess word to actual word
const validateRow = function () {
  const guessRow = gameRows[currentRow].join("");
  if (currentCell === 5) {
    isCurrentRowOver = true;

    applyColor();

    if (guessRow === word) {
      displayMessage("Impressive");
      return;
    } else {
      // handle when all the rows have guessed
      if (currentRow >= 5) {
        displayWordle();
        displayMessage("Game Over!");
        return;
      }

      if (currentRow < 5) {
        currentRow++;
        currentCell = 0;
        isCurrentRowOver = false;
      }
    }
  }
};

// displaying message in the message container
const displayMessage = function (msg) {
  const h1el = document.createElement("h1");
  h1el.className = "flash";
  h1el.textContent = msg;

  // Give it some time to run the animation before displaying the message
  setTimeout(() => {
    msgEl.append(h1el);
  }, 2000);

  // Take into account the time out above, need more time before removing it
  setTimeout(() => {
    h1el.remove();
  }, 4000);
};

// Display the word after all attempts were used
const displayWordle = function () {
  const h1el = document.createElement("h1");
  h1el.textContent = word;
  h1el.className = "flash wordle";

  setTimeout(() => {
    msgEl.append(h1el);
  }, 2000);
};

// Applying color to the cell when it meets the criteria
const applyColor = function () {
  const guessWord = document.querySelector(`#row-${currentRow}`).textContent;
  const row = currentRow;
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (!word.includes(guessWord[i])) {
        addColor(row, i, guessWord[i], "gray");
      } else if (word[i] === guessWord[i]) {
        addColor(row, i, guessWord[i], "green");
      } else {
        addColor(row, i, guessWord[i], "yellow");
      }
    }, 500 * i);
  }
};

// Apply color in a nonrepeat way
const addColor = function (row, cell, key, color) {
  // apply color to the cell on the table
  const cellEl = document.querySelector(`#row-${row}-cell-${cell}`);
  cellEl.classList.add(`${color}-out`);
  // apply animation flipping to cells on the table
  cellEl.classList.add(`flipping`);
  // apply color to the key on the keyboard
  const keyEl = document.querySelector(`#${key}-key`);
  keyEl.classList.add(`${color}-out`);
};
