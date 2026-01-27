import { useEffect, useState } from "react";

export function AnimatedBus() {
  const [position, setPosition] = useState(-200);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const animateBus = () => {
      setPosition(-200);
      setIsVisible(true);
      
      const interval = setInterval(() => {
        setPosition((prev) => {
          if (prev > window.innerWidth + 200) {
            clearInterval(interval);
            setTimeout(() => {
              animateBus();
            }, 5000); // Wait 5 seconds before next pass
            return prev;
          }
          return prev + 3;
        });
      }, 20);

      return () => clearInterval(interval);
    };

    const cleanup = animateBus();
    return cleanup;
  }, []);

  return (
    <div className="fixed bottom-20 left-0 w-full pointer-events-none z-40 overflow-hidden">
      <div
        className="absolute transition-all duration-200"
        style={{
          left: `${position}px`,
          transform: 'translateY(0)',
        }}
      >
        <div className="relative animate-bounce-subtle">
          {/* Bus SVG */}
          <svg
            width="180"
            height="90"
            viewBox="0 0 180 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Exhaust smoke */}
            <g className="animate-smoke">
              <circle cx="20" cy="55" r="3" fill="#9CA3AF" opacity="0.4" />
              <circle cx="15" cy="50" r="2" fill="#9CA3AF" opacity="0.3" />
              <circle cx="18" cy="45" r="2.5" fill="#9CA3AF" opacity="0.2" />
            </g>
            
            {/* Bus body */}
            <rect x="30" y="25" width="130" height="45" rx="8" fill="#2563EB" />
            <rect x="35" y="30" width="120" height="35" rx="6" fill="#3B82F6" />
            
            {/* Windows */}
            <rect x="40" y="35" width="25" height="18" rx="2" fill="#DBEAFE" opacity="0.8" />
            <rect x="70" y="35" width="25" height="18" rx="2" fill="#DBEAFE" opacity="0.8" />
            <rect x="100" y="35" width="25" height="18" rx="2" fill="#DBEAFE" opacity="0.8" />
            <rect x="130" y="35" width="20" height="18" rx="2" fill="#DBEAFE" opacity="0.8" />
            
            {/* Windshield reflection */}
            <path d="M 38 33 L 48 33 L 46 38 L 40 38 Z" fill="#FFFFFF" opacity="0.4" />
            
            {/* Front lights */}
            <circle cx="158" cy="60" r="4" fill="#FCD34D" />
            <circle cx="158" cy="45" r="3" fill="#FBBF24" />
            
            {/* Side stripe */}
            <rect x="35" y="55" width="120" height="3" fill="#1E40AF" />
            
            {/* Door */}
            <rect x="140" y="40" width="15" height="25" rx="2" fill="#1E3A8A" />
            <circle cx="143" cy="52" r="1.5" fill="#9CA3AF" />
            
            {/* Wheels */}
            <g>
              <circle cx="50" cy="70" r="12" fill="#1F2937" />
              <circle cx="50" cy="70" r="8" fill="#374151" />
              <circle cx="50" cy="70" r="4" fill="#6B7280" className="animate-spin-slow" />
              
              <circle cx="140" cy="70" r="12" fill="#1F2937" />
              <circle cx="140" cy="70" r="8" fill="#374151" />
              <circle cx="140" cy="70" r="4" fill="#6B7280" className="animate-spin-slow" />
            </g>
            
            {/* Brand badge */}
            <rect x="145" y="28" width="12" height="8" rx="1" fill="#1E3A8A" />
            <text x="147" y="34" fontSize="4" fill="#FFFFFF" fontWeight="bold">H</text>
          </svg>
          
          {/* Speed lines */}
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 flex gap-2">
            <div className="h-0.5 w-8 bg-blue-400 opacity-60 animate-speed-line"></div>
            <div className="h-0.5 w-6 bg-blue-300 opacity-40 animate-speed-line-delayed"></div>
            <div className="h-0.5 w-4 bg-blue-200 opacity-30 animate-speed-line-delayed-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
