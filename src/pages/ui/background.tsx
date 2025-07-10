// app/components/WaveBackground.tsx

import React from "react";

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Golden wave horizon */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          fill="#fef3c7"
          d="M0,160L80,165.3C160,171,320,181,480,181.3C640,181,800,171,960,176C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>

      {/* Pigeons and letter animation */}

      {/* Pigeon 1 delivering a letter */}
      <div className="absolute bottom-40 left-10 w-14 animate-pigeonFly1">
        <img src="/assets/letter-outline.png" alt="Pigeon" />
      </div>
      <div className="absolute bottom-40 left-10 w-8 animate-pigeonFly1">
        <img src="/assets/letter-outline.png" alt="Pigeon" />
      </div>
      <div className="absolute bottom-40 left-10 w-6 animate-letterFly1">
        <img src="/assets/letter-outline.png" alt="Plain Letter" />
      </div>

      {/* Pigeon 2 with transformed letter */}
      <div className="absolute bottom-52 left-1/3 w-14 animate-pigeonFly2">
        <img src="/assets/letter-filled.png" alt="Pigeon 2" />
      </div>
       <div className="absolute bottom-52 left-1/3 w-8 animate-pigeonFly2">
        <img src="/assets/letter-filled.png" alt="Pigeon 2" />
      </div>
      <div className="absolute bottom-52 left-1/3 w-6 animate-letterFly2">
        <img src="/assets/letter-filled.png" alt="Upgraded Letter" />
      </div>

      {/* Final recipient side - letter arriving */}
      <div className="absolute bottom-60 right-10 w-14 animate-arrival">
        <img src="/assets/letter-final.png" alt="Final Letter" />
      </div>
      <div className="absolute bottom-60 right-10 w-12 animate-arrival">
        <img src="/assets/letter-final.png" alt="Final Letter" />
      </div>
      <div className="absolute bottom-60 right-10 w-10 animate-arrival">
        <img src="/assets/letter-final.png" alt="Final Letter" />
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
      `}</style>
    </div>
  );
};

export default WaveBackground;
