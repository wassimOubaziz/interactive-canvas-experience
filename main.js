const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
canvas.style.background = "rgb(20, 10, 0)";

// eventListener
// resize
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
});
// Creat object for mousePosition
let mousePosition = {
  x: undefined,
  y: undefined,
};
// mousemove
window.addEventListener("mousemove", function (event) {
  mousePosition.x = event.x;
  mousePosition.y = event.y;
});

// Array for colors
const arrColor = ["#38A69B", "#618C70", "#91D9A3", "#F2EEB6", "#F2F2F2"];
const maxRadius = 40;
// Creating Object Circle
function Circle(x, y, color, radius, speedX, speedY) {
  // construct
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.speedX = speedX;
  this.speedY = speedY;
  this.minRadius = radius;
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  };
  this.update = () => {
    if (
      this.x + this.radius >= window.innerWidth - 5 ||
      this.x - this.radius <= 0
    ) {
      this.speedX = -this.speedX;
    }
    if (
      this.y + this.radius >= window.innerHeight - 5 ||
      this.y - this.radius <= 0
    ) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    if (
      mousePosition.x - this.x <= 50 &&
      mousePosition.x - this.x >= -50 &&
      mousePosition.y - this.y <= 50 &&
      mousePosition.y - this.y >= -50
    ) {
      if (this.radius <= maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius >= this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

let arr = [];
for (let i = 0; i < 800; i++) {
  const radius = Math.floor(Math.random() * 4 + 1);
  const random = () => Math.round(Math.random());
  let random00 = random();
  if (random00 - 1 === -1) {
    random00 = -1;
  }
  let speedX = 3 * random00;
  let speedY = 3 * random00;
  let x = Math.floor(
    Math.random() * (window.innerWidth - 5 - radius * 2) + radius
  );
  let y = Math.floor(
    Math.random() * (window.innerHeight - 5 - radius * 2) + radius
  );
  arr.push(
    new Circle(
      x,
      y,
      arrColor[Math.floor(Math.random() * arrColor.length)],
      radius,
      speedX * Math.random(),
      speedY * Math.random()
    )
  );
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth - 5, window.innerHeight - 5);
  arr.forEach((element) => {
    element.update();
  });
}

animate();
