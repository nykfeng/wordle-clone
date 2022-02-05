import { keyboard } from "./js/key.js";

const msgEl = document.querySelector("#message-container");
const gameEL = document.querySelector("#game-container");
const keyboardEl = document.querySelector("#keyboard-container");

const keyboardHandler = function (e) {
  console.log(`${e.target.textContent} was clicked`);
};

keyboard.forEach((key) => {
  const keyEl = document.createElement("button");
  keyEl.addEventListener("click", keyboardHandler);
  keyEl.setAttribute("id", `${key}-key`);
  keyEl.className = "key";
  keyEl.textContent = key;
  keyboardEl.append(keyEl);
});

const gameRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

gameRows.forEach((row, index) => {
  const rowEl = document.createElement("div");
  rowEl.setAttribute("id", "row-" + index);
  row.forEach((col, i) => {
    const cellEl = document.createElement("div");
    cellEl.setAttribute("id", "cell-" + i);
    cellEl.className = "cell";
    cellEl.textContent = col;
    rowEl.append(cellEl);
  });
  gameEL.append(rowEl);
});
