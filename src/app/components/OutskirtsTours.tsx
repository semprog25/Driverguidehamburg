import { Language } from "../App";
import { translations } from "../translations";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OutskirtsToursProps {
  language: Language;
  onBookNow: () => void;
}

export function OutskirtsTours({ language, onBookNow }: OutskirtsToursProps) {
  const t = translations[language];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1569686446978-833db931219b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdGFkZSUyMEdlcm1hbnklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY3ODIyODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Stade"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1577053344129-413bc044ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdWJlY2slMjBIb2xzdGVudG9yJTIwR2VybWFueXxlbnwxfHx8fDE3Njc4MjI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Lübeck Holstentor"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eXNjYXBlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzgyMTgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Lüneburg"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1673594278297-c26aaf8d603c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMG9yY2hhcmQlMjBHZXJtYW55fGVufDF8fHx8MTc2NzgyMjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Altes Land"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.landpartie}</h2>
          
          <h3 className="text-2xl font-semibold text-slate-700 mb-6">
            {t.luebeckTitle}
          </h3>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {t.luebeckText}
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t.altesLandTitle}</h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {t.altesLandText}
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t.coastTitle}</h3>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            {t.coastText}
          </p>

          {/* Bottom Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1577053344129-413bc044ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdWJlY2slMjBIb2xzdGVudG9yJTIwR2VybWFueXxlbnwxfHx8fDE3Njc4MjI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Lübeck"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1653853611414-19faebe23cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXaXNtYXIlMjBHZXJtYW55fGVufDF8fHx8MTc2NzgyMjgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wismar"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1728594120312-a2e7b714f76c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTY2h3ZXJpbiUyMGNhc3RsZSUyMEdlcm1hbnl8ZW58MXx8fHwxNzY3ODIyODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Schwerin"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671190364908-b5f937f78835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwcG9ydHxlbnwxfHx8fDE3Njc4MjI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Nord-Ostsee-Kanal"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.outskirtsToursTitle}</h2>
            <h3 className="text-xl text-slate-600 mb-6">{t.outskirtsToursSubtitle}</h3>
            
            <Button
              size="lg"
              onClick={onBookNow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {language === "de" ? "Landpartie buchen" : "Book Country Tour"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}