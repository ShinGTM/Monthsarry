const canvas = document.getElementById("flowers-bg");
const ctx = canvas.getContext("2d");
let w, h, flowers = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Flower {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = h + Math.random() * h;
    this.size = 6 + Math.random() * 12;
    this.speed = 0.5 + Math.random() * 1.2;
    this.petals = Math.floor(4 + Math.random() * 3);
    this.color = `rgba(255, ${150 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.8)`;
    this.angle = Math.random() * Math.PI * 2;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    for (let i = 0; i < this.petals; i++) {
      ctx.rotate((Math.PI * 2) / this.petals);
      ctx.beginPath();
      ctx.ellipse(0, this.size / 3, this.size / 2.5, this.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.restore();
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    this.angle += 0.01;
    if (this.y < -this.size) this.reset();
  }
}

for (let i = 0; i < 40; i++) flowers.push(new Flower());

function animate() {
  ctx.clearRect(0, 0, w, h);
  flowers.forEach(flower => {
    flower.update();
    flower.draw();
  });
  requestAnimationFrame(animate);
}
animate();