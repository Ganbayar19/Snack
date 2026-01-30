const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, 400, 400);
  snake.forEach((s) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(s.x, s.y, box, box);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 400 ||
    head.y >= 400 ||
    snake.some((s) => s.x === head.x && s.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over 😭 Your score: " + score);
    location.reload();
  }

  snake.unshift(head);
}

let game = setInterval(draw, 120);
