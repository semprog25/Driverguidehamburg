import { Language } from "../App";
import { translations } from "../translations";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCMS } from "@/app/context/CMSContext";

interface OutskirtsToursProps {
  language: Language;
  onBookNow: () => void;
}

export function OutskirtsTours({ language, onBookNow }: OutskirtsToursProps) {
  const t = translations[language];
  const { cms } = useCMS();
  const o = cms.outskirts;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { src: o.topImage1, alt: 'Stade' },
            { src: o.topImage2, alt: 'Lübeck Holstentor' },
            { src: o.topImage3, alt: 'Lüneburg' },
            { src: o.topImage4, alt: 'Altes Land' },
          ].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback src={img.src} alt={img.alt} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{o.mainTitle || t.landpartie}</h2>
          
          <h3 className="text-2xl font-semibold text-slate-700 mb-6">
            {o.luebeckTitle || t.luebeckTitle}
          </h3>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {o.luebeckText || t.luebeckText}
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-4">{o.altesLandTitle || t.altesLandTitle}</h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {o.altesLandText || t.altesLandText}
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-4">{o.coastTitle || t.coastTitle}</h3>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            {o.coastText || t.coastText}
          </p>

          {/* Bottom Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { src: o.bottomImage1, alt: 'Lübeck' },
              { src: o.bottomImage2, alt: 'Wismar' },
              { src: o.bottomImage3, alt: 'Schwerin' },
              { src: o.bottomImage4, alt: 'Nord-Ostsee-Kanal' },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <ImageWithFallback src={img.src} alt={img.alt} className="w-full h-80 object-cover" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{o.outskirtsTitle || t.outskirtsToursTitle}</h2>
            <h3 className="text-xl text-slate-600 mb-6">{o.outskirtsSubtitle || t.outskirtsToursSubtitle}</h3>
            
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