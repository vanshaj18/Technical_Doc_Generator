import React from "react";

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Golden wave horizon */}
      {/* Green grass horizon */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grassGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bbf7d0" />
        <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grassGradient)"
          d="M0,240 Q120,220 240,250 Q360,280 480,240 Q600,200 720,260 Q840,320 960,260 Q1080,200 1200,
          240 Q1320,280 1440,240 L1440,320 L0,320Z"
        />
      </svg>

      {/* Wind Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const top = `${5 + (90 / 19) * i}%`;
          const width = `${24 + (32 * i) / 19}rem`;
          const opacity = (5 + ((55 - 5) / 19) * i) / 100;
          const delay = `${i * 100}ms`;
          const animClass =
        i % 3 === 0
          ? "animate-wind-line1"
          : i % 3 === 1
          ? "animate-wind-line2"
          : "animate-wind-line3";

          // Split each line into segments
          const segmentCount = 8;
          const gap = 8; // px gap between segments
          const segmentWidth = `calc((${width} - ${(segmentCount - 1) * gap}px) / ${segmentCount})`;

          return (
        <div
          key={i}
          className="absolute left-0 h-0.5 z-1"
          style={{ top, width, opacity, pointerEvents: "none" }}
        >
          {Array.from({ length: segmentCount }).map((_, j) => (
            <div
          key={j}
          className={`absolute h-full rounded-full ${animClass}`}
          style={{
            left: `calc(${j} * (${segmentWidth} + ${gap}px))`,
            width: segmentWidth,
            background:
              "linear-gradient(to right,rgb(179, 180, 180),rgba(255, 255, 255, 0.79))",
            animationDelay: delay,
          }}
            />
          ))}
        </div>
          );
        })}
      </div>

      {/* Letter + Pigeon Animations */}

      {/* Phase 1: Letter Outline */}
      <div className="absolute bottom-40 left-10 w-14 animate-pigeonFly1">
        <img src="/assets/letter-outline.png" alt="Letter Outline 1" />
      </div>
      <div className="absolute bottom-40 left-10 w-8 animate-pigeonFly1">
        <img src="/assets/letter-outline.png" alt="Letter Outline 2" />
      </div>
      <div className="absolute bottom-40 left-10 w-6 animate-letterFly1">
        <img src="/assets/letter-outline.png" alt="Letter Outline 3" />
      </div>

      {/* Phase 2: Filled Letter */}
      <div className="absolute bottom-52 left-1/3 w-14 animate-pigeonFly2">
        <img src="/assets/letter-filled.png" alt="Filled Letter 1" />
      </div>
      <div className="absolute bottom-52 left-1/3 w-8 animate-pigeonFly2">
        <img src="/assets/letter-filled.png" alt="Filled Letter 2" />
      </div>
      <div className="absolute bottom-52 left-1/3 w-6 animate-letterFly2">
        <img src="/assets/letter-filled.png" alt="Filled Letter 3" />
      </div>

      {/* Final Phase: Letter Arriving with Hover Tooltip */}
      <div className="absolute bottom-60 right-10 flex flex-col gap-2">
        {["w-14", "w-12", "w-10"].map((size, i) => (
          <div key={i} className={`relative ${size} animate-arrival group`}>
            <img
              src="/assets/letter-final.png"
              alt="Final Letter"
              className="cursor-pointer"
            />
            <div className="absolute bottom-full mb-2 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Auto-generated Technical Doc
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-pigeonFly1 {
          animation: pigeonFly1 6s ease-in-out infinite;
        }

        .animate-letterFly1 {
          animation: letterFly1 6s ease-in-out infinite;
        }

        .animate-pigeonFly2 {
          animation: pigeonFly2 6s ease-in-out infinite;
        }

        .animate-letterFly2 {
          animation: letterFly2 6s ease-in-out infinite;
        }

        .animate-arrival {
          animation: letterArrive 6s ease-in-out infinite;
        }

        .animate-wind-line1 {
          animation: windLine1 6s linear infinite;
        }

        .animate-wind-line2 {
          animation: windLine2 7s linear infinite;
        }

        .animate-wind-line3 {
          animation: windLine3 8s linear infinite;
        }

        @keyframes pigeonFly1 {
          0% { transform: translate(0, 0) rotate(0); opacity: 1; }
          50% { transform: translate(40vw, -10vh) rotate(15deg); opacity: 0.9; }
          100% { transform: translate(80vw, -20vh) rotate(25deg); opacity: 0; }
        }

        @keyframes letterFly1 {
          0% { transform: translate(0, 0) rotate(0); opacity: 1; }
          50% { transform: translate(40vw, -10vh) rotate(90deg); opacity: 0.7; }
          100% { transform: translate(80vw, -20vh) rotate(180deg); opacity: 0; }
        }

        @keyframes pigeonFly2 {
          0% { transform: translate(0, 0) rotate(0); opacity: 0; }
          40% { transform: translate(10vw, -5vh) rotate(10deg); opacity: 0.3; }
          70% { transform: translate(20vw, -8vh) rotate(15deg); opacity: 0.7; }
          100% { transform: translate(40vw, -20vh) rotate(25deg); opacity: 1; }
        }

        @keyframes letterFly2 {
          0% { transform: translate(0, 0); opacity: 0; }
          40% { transform: translate(10vw, -5vh); opacity: 0.3; }
          70% { transform: translate(20vw, -8vh); opacity: 0.7; }
          100% { transform: translate(40vw, -20vh); opacity: 1; }
        }

        @keyframes letterArrive {
          0%, 40% { transform: translate(-5vw, 0) rotate(2deg);}
          80% { opacity: 0; transform: translate(0, 0); }
          100% { opacity: 1; transform: translate(-5vw, 0); }
        }

        @keyframes windLine1 {
          0% { transform: translateX(-20vw); opacity: 0; }
          30% { opacity: 0.4; }
          70% { opacity: 0.3; }
          100% { transform: translateX(100vw); opacity: 0; }
        }

        @keyframes windLine2 {
          0% { transform: translateX(-10vw); opacity: 0; }
          30% { opacity: 0.5; }
          100% { transform: translateX(100vw); opacity: 0; }
        }

        @keyframes windLine3 {
          0% { transform: translateX(-15vw); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default WaveBackground;
