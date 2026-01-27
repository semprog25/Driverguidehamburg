import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "../App";
import { useState, useEffect } from "react";

interface FloatingBookingButtonProps {
  onClick: () => void;
  language: Language;
}

export function FloatingBookingButton({ onClick, language }: FloatingBookingButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white px-4 md:px-6 py-4 md:py-6 rounded-full shadow-2xl border-4 border-white hover:shadow-pink-500/80 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      } hover:scale-125 animate-bounce-subtle group relative overflow-hidden`}
      size="lg"
    >
      <span className="absolute inset-0 bg-white/30 animate-shimmer"></span>
      <Calendar className="w-5 h-5 md:w-6 md:h-6 md:mr-2 relative z-10 group-hover:animate-wiggle" />
      <span className="font-bold hidden md:inline relative z-10">
        🎉 {language === "de" ? "Jetzt buchen" : "Book Now"} 🎉
      </span>
    </Button>
  );
}