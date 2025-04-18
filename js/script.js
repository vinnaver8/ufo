const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Generate more stars with wider 3D spread
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * 2 - 1, // -1 to 1
        y: Math.random() * 2 - 1,
        z: Math.random(),
      });
    }

    function drawStars() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.z -= 0.002;
        if (star.z <= 0) star.z = 1;

        const sx = star.x / star.z;
        const sy = star.y / star.z;

        const px = (sx * canvas.width) / 2 + canvas.width / 2;
        const py = (sy * canvas.height) / 2 + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z) * 2;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      requestAnimationFrame(drawStars);
    }

    drawStars();
