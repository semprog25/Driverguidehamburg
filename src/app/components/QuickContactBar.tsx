import { Phone, MessageCircle, Mail } from "lucide-react";
import { Language } from "../App";
import { useState, useEffect } from "react";

interface QuickContactBarProps {
  language: Language;
}

export function QuickContactBar({ language }: QuickContactBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const phoneNumber = "+49 123 456 789"; // Replace with actual
  const whatsappNumber = "49123456789"; // Replace with actual
  const email = "angela@driverguide-hamburg.de"; // Replace with actual

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
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
    <div className={`fixed bottom-6 left-6 z-40 flex flex-col gap-3 transition-all duration-300 ${
      isVisible ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
    }`}>
      {/* Phone */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-green-600 hover:bg-green-700 text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group border-2 border-white"
        title={language === "de" ? "Anrufen" : "Call"}
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-green-400/50 transition-all duration-300 hover:scale-110 group border-2 border-white"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>

      {/* Email */}
      <a
        href={`mailto:${email}`}
        className="bg-gray-800 hover:bg-black text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-110 group border-2 border-white"
        title={language === "de" ? "E-Mail senden" : "Send Email"}
      >
        <Mail className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </div>
  );
}