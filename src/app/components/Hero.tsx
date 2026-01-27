import { Button } from "./ui/button";
import { Car, MapPin, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eXNjYXBlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzgyMTgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hamburg cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-slate-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <MapPin className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 text-lg">Hamburg, Germany</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-bottom">
              Discover Hamburg in Style
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              Professional driver-guide services for unforgettable tours around Hamburg and beyond
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span>Premium Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Car className="w-5 h-5 text-blue-300" />
                <span>Luxury Vehicles</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-bottom"
              style={{ animationDelay: '0.3s' }}
              onClick={scrollToBooking}
            >
              Book Your Tour Now
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements for fun */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
