import { Language } from "../App";
import { translations } from "../translations";
import { Card, CardContent } from "./ui/card";
import { Award, Shield, Lightbulb, Clock } from "lucide-react";
import angelaImage from "figma:asset/c6a05b5b2c6f6525140f7b84255b18935114b4b4.png";
import harborImage from "figma:asset/9b5114d9d6feb03eae467855cf02565f57d5196a.png";
import castleImage from "figma:asset/29c0bdc2cfde11ad29ad06910462a58813755513.png";
import luebeckImage from "figma:asset/998012ba93f9c1e4bcce24ecf3df4b6996dd0c0b.png";

interface AboutDriverProps {
  language: Language;
}

export function AboutDriver({ language }: AboutDriverProps) {
  const t = translations[language];

  const features = [
    {
      icon: Award,
      title: t.experience,
      description: t.years,
      color: "bg-blue-500",
    },
    {
      icon: Shield,
      title: t.licensed,
      description: t.professional,
      color: "bg-green-500",
    },
    {
      icon: Lightbulb,
      title: t.localKnowledge,
      description: t.insider,
      color: "bg-amber-500",
    },
    {
      icon: Clock,
      title: language === "de" ? "Flexibel" : "Flexible",
      description: language === "de" ? "24/7 verfügbar" : "24/7 available",
      color: "bg-purple-500",
    },
  ];

  const galleryImages = [
    {
      src: harborImage,
      alt: language === "de" ? "Hamburg Hafen" : "Hamburg Harbor",
    },
    {
      src: castleImage,
      alt: language === "de" ? "Historisches Schloss" : "Historic Castle",
    },
    {
      src: luebeckImage,
      alt: language === "de" ? "Lübeck Altstadt" : "Lübeck Old Town",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20 blur-2xl animate-float"></div>
      <div className="absolute bottom-40 left-10 w-56 h-56 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1 animate-pop-in">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-black transform hover:scale-105 transition-transform duration-500 hover:rotate-2">
              <img
                src={angelaImage}
                alt="Angela Scheefeld - Your Hamburg Driver Guide"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl border-4 border-white animate-bounce-subtle">
              <p className="text-sm font-semibold">✨ {language === "de" ? "Ihre persönliche Guide" : "Your personal guide"} ✨</p>
            </div>
            {/* Floating emoji decorations */}
            <div className="absolute -top-4 -left-4 text-4xl animate-float">🚐</div>
            <div className="absolute top-10 -right-6 text-3xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 md:mb-4 animate-slide-in-bottom">
              {t.driverTitle} 👋
            </h2>
            <h3 className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 font-semibold animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              {t.driverSubtitle}
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              {t.driverText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-3 hover:border-black transition-all duration-300 hover:shadow-xl bg-white hover:-translate-y-1 animate-pop-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-black mb-1 relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm relative z-10">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl font-bold text-black animate-pop-in">
            <span className="inline-block animate-wiggle">🏰</span> Discover Hamburg's Beauty! <span className="inline-block animate-wiggle" style={{ animationDelay: '0.3s' }}>🌊</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-xl border-4 border-black group animate-pop-in hover:scale-105 transition-transform duration-500" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <p className="text-white font-bold text-lg">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}