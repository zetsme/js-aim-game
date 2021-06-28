const startSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start-btn');
const timeEl = document.querySelector('.time');
const board = document.querySelector('.board');

const timeArr = [10, 20, 30, 40];
const colorsArr = ['Chartreuse', 'Blue', 'BurlyWood', 'DarkRed', 'DodgerBlue', 'Gold', 'Indigo'];
let time;
let intervalTimer;
let score = 0;

const start = () => {
  startBtn.remove();
  createTimeList(timeArr);
};
const createTimeList = (arr) => {
  const timeList = document.createElement('ul');
  timeList.classList.add('time-list');
  for (item of arr) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <button class='time-btn' data-time='${item}'>${item}s</button>
    `;
    timeList.appendChild(listItem);
  }
  startSection.appendChild(timeList);
};

const chooseYourTime = (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = Number(e.target.dataset.time);
    removeContent(document.querySelector('.time-list'));
    startSection.removeEventListener('click', chooseYourTime);
    startGame();
  }
};

const createSquare = () => {
  const square = document.createElement('div');
  square.classList.add('square');
  const size = getRandomNumber(20, 70);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  square.style.backgroundColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  square.style.top = `${y}px`;
  square.style.left = `${x}px`;
  board.appendChild(square);
};

const boardClick = (e) => {
  if (e.target.classList.contains('square')) {
    score++;
    e.target.remove();
    createSquare();
  }
};

const startGame = () => {
  intervalTimer = setInterval(decreaseTime, 1000);
  createSquare();
};

const finishGame = () => {
  timeEl.parentElement.style.opacity = 0;
  board.innerHTML = `<h1 class='score'>Score: <span class="score-number">${score}</span></h1>`;
  board.removeEventListener('click', boardClick);
  createReloadButton();
};

const createReloadButton = () => {
  const btn = document.createElement('button');
  btn.textContent = 'Try Again';
  btn.addEventListener('click', reload);
  startSection.appendChild(btn);
};

startBtn.addEventListener('click', start);
startSection.addEventListener('click', chooseYourTime);
board.addEventListener('click', boardClick);

const removeContent = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  parentElement.remove();
};

const setTime = (value) => `00:${value.toString().padStart(2, 0)}`;
const decreaseTime = () => {
  if (time === 0) {
    clearInterval(intervalTimer);
    finishGame();
  } else {
    let current = --time;
    timeEl.textContent = setTime(current);
  }
};
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
const reload = (e) => {
  e.target.remove();
  window.location.reload();
};
