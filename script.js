const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let mouse = { x: 0, y: 0 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 300; i++) {
  stars.push({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random(),
  });
}

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  for (let star of stars) {
    star.z -= 0.002;
    if (star.z <= 0) star.z = 1;

    const sx = star.x / star.z;
    const sy = star.y / star.z;
    const px = (sx * canvas.width) / 2 + canvas.width / 2;
    const py = (sy * canvas.height) / 2 + canvas.height / 2;

    const dx = px - mouse.x;
    const dy = py - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      const size = (1 - star.z) * 2;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  requestAnimationFrame(drawStars);
}
drawStars();
