const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let apple = { x: 0, y: 0 };
let score = 0;

function randomPosition() {
  return Math.floor(Math.random() * (canvas.width / grid)) * grid;
}

function placeApple() {
  apple.x = randomPosition();
  apple.y = randomPosition();
}

placeApple();

function draw() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    placeApple();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(part => part.x === head.x && part.y === head.y)
  ) {
    alert("¡Juego terminado! Puntuación: " + score);
    score = 0;  
    snake = [{ x: 160, y: 160 }];

    document.location.reload();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, grid, grid);
}

setInterval(draw, 200);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -grid;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = grid;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -grid; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = grid; dy = 0;
  }
});
