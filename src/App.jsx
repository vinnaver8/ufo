import React, { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 2 + 1,
    }));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        star.y += star.z;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
        ctx.fillRect(star.x, star.y, 1, 1);
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-yellow-900/30 to-white blur-3xl opacity-80 z-0"></div>
      <h1 className="absolute text-[150px] font-bold text-white/10 tracking-wide z-10 top-[30%] w-full text-center select-none">
        UFO X
      </h1>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md z-20">
        <div className="flex items-center bg-black/80 text-white rounded-full px-6 py-3 shadow-lg">
          <input
            type="text"
            placeholder="Ask UFO X anything..."
            className="flex-grow bg-transparent outline-none placeholder-gray-400"
          />
          <button className="ml-4 bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;