import { Language } from "../App";
import { translations } from "../translations";
import { Button } from "./ui/button";
import { MapPin, Star, Car, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  language: Language;
  onBookNow: () => void;
}

export function Hero({ language, onBookNow }: HeroProps) {
  const t = translations[language];

  return (
    <div className="relative min-h-[500px] md:h-[600px] overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-yellow-500 rounded-full animate-float blur-xl" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eXNjYXBlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzgyMTgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hamburg cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/60 to-blue-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-0">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-2 mb-4 md:mb-6 animate-fade-in">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-pink-400 animate-bounce-subtle" />
              <span className="text-gray-200 text-sm md:text-lg font-semibold">Hamburg, Deutschland ✨</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 animate-slide-in-bottom leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-100 mb-6 md:mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              {t.heroSubtitle} 🚐
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-sm md:text-base border-2 border-yellow-400/30 hover:scale-105 transition-transform">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                <span className="font-semibold">{language === "de" ? "Premium Service" : "Premium Service"}</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-sm md:text-base border-2 border-blue-400/30 hover:scale-105 transition-transform">
                <Car className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />
                <span className="font-semibold">{language === "de" ? "Komfortable Fahrzeuge" : "Comfortable Vehicles"}</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-pink-400/20 to-purple-500/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-sm md:text-base border-2 border-pink-400/30 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-300 animate-pulse" />
                <span className="font-semibold">{language === "de" ? "Unvergesslich" : "Unforgettable"}</span>
              </div>
            </div>
            
            <Button
              size="lg"
              onClick={onBookNow}
              className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-2xl shadow-2xl border-4 border-white hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 w-full md:w-auto animate-pop-in overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 animate-shimmer"></span>
              <span className="relative font-bold">🎉 {t.bookNow} 🎉</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}