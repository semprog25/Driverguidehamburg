import { Language } from "../App";
import { translations } from "../translations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeGameSectionProps {
  language: Language;
}

export function HomeGameSection({ language }: HomeGameSectionProps) {
  const t = translations[language];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t.homeGameTitle}
          </h2>
          <h3 className="text-xl text-slate-600 mb-6">
            {t.homeGameSubtitle}
          </h3>
        </div>

        {/* Top Image Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1691732616359-47d8aaa40dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwRWxicGhpbGhhcm1vbmllfGVufDF8fHx8MTc2NzgyMjgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Elbphilharmonie"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599827552599-eadf5fb3c75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHRsaWZlJTIwc3RyZWV0fGVufDF8fHx8MTc2NzgyMjgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Hamburg Streets"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eXNjYXBlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzgyMTgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Hamburg Canal"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1671190364908-b5f937f78835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwcG9ydHxlbnwxfHx8fDE3Njc4MjI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Harbor"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-slate-700 leading-relaxed text-center">
            {t.homeGameText}
          </p>
        </div>

        {/* Bottom Image Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eXNjYXBlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzgyMTgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Historic Hamburg"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1691732616359-47d8aaa40dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwRWxicGhpbGhhcm1vbmllfGVufDF8fHx8MTc2NzgyMjgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern Hamburg"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599827552599-eadf5fb3c75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHRsaWZlJTIwc3RyZWV0fGVufDF8fHx8MTc2NzgyMjgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Hamburg Architecture"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1671190364908-b5f937f78835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwcG9ydHxlbnwxfHx8fDE3Njc4MjI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Hamburg Harbor View"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
