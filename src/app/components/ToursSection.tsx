import { Language } from "../App";
import { translations } from "../translations";
import { Card, CardContent } from "./ui/card";
import { MapPin, Anchor, Music, Waves, Building2, Route } from "lucide-react";

interface ToursSectionProps {
  language: Language;
  onTourSelect: (tourType: string) => void;
}

export function ToursSection({ language, onTourSelect }: ToursSectionProps) {
  const t = translations[language];

  const tours = [
    {
      icon: MapPin,
      title: t.cityTour,
      description: t.cityTourDesc,
      color: "bg-blue-500",
      tourType: "city-tour",
      duration: "3h",
    },
    {
      icon: Anchor,
      title: t.harborTour,
      description: t.harborTourDesc,
      color: "bg-cyan-500",
      tourType: "harbor",
      duration: "2.5h",
    },
    {
      icon: Music,
      title: t.reeperbahnTour,
      description: t.reeperbahnTourDesc,
      color: "bg-red-500",
      tourType: "reeperbahn",
      duration: "2h",
    },
    {
      icon: Waves,
      title: t.elbeTour,
      description: t.elbeTourDesc,
      color: "bg-emerald-500",
      tourType: "elbe",
      duration: "3.5h",
    },
    {
      icon: Building2,
      title: t.speicherstadtTour,
      description: t.speicherstadtTourDesc,
      color: "bg-amber-500",
      tourType: "speicherstadt",
      duration: "2h",
    },
    {
      icon: Route,
      title: t.customTour,
      description: t.customTourDesc,
      color: "bg-purple-500",
      tourType: "custom",
      duration: language === "de" ? "Flexibel" : "Flexible",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 md:mb-4 animate-pop-in">
            <span className="inline-block animate-wiggle">🗺️</span> {t.toursTitle} <span className="inline-block animate-wiggle" style={{ animationDelay: '0.2s' }}>✨</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-semibold">
            {t.toursSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tours.map((tour, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-pointer border-4 hover:border-black bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 animate-pop-in hover:rotate-1"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onTourSelect(tour.tourType)}
            >
              <CardContent className="p-5 md:p-6 relative overflow-hidden">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>
                
                <div className={`w-14 h-14 md:w-16 md:h-16 ${tour.color} rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg relative z-10`}>
                  <tour.icon className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:animate-bounce-subtle" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-black mb-2 relative z-10">
                  {tour.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 relative z-10">
                  {tour.description}
                </p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs md:text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                    ⏱ {tour.duration}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-black group-hover:translate-x-2 transition-transform bg-yellow-300 px-3 py-1 rounded-full">
                    {language === "de" ? "Buchen! →" : "Book! →"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}