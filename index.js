const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
let buttonText = "Start";

//CREATE GRID
function createGrid() {
  let isLightColor = true;
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

//DISPLAY SNAKE
currentSnake.forEach((index, idx) => squares[index].classList.add("snake"));

//GENERATE APPLE
function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApple();

//START GAME
function startGame() {
  if ((buttonText = "Start")) {
    buttonText = "Restart";
  }
  startButton.textContent = buttonText;
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    
    return clearInterval(timerId);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);

    generateApple();

    score++;
    scoreDisplay.textContent = score;

    //SPEED UP SNAKE
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    console.log(intervalTime);
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}


function control(e) {
  if (e.key === "ArrowRight") {
    console.log("right pressed");
    direction = 1;
  } else if (e.key === "ArrowUp") {
    console.log("up pressed");
    direction = -width;
  } else if (e.key === "ArrowLeft") {
    console.log("left pressed");
    direction = -1;
  } else if (e.key === "ArrowDown") {
    console.log("down pressed");
    direction = +width;
  }
}

startButton.textContent = buttonText;
document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
