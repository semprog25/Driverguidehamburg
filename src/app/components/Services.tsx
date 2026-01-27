import React from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { MapPin, Briefcase, Camera, Clock, CheckCircle, Ship, Moon, TreePine, Coffee } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface ServicesProps {
  onBook: (serviceType: string) => void;
}

export function Services({ onBook }: ServicesProps) {
  const { t } = useLanguage();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    arrows: false,
    className: "center",
  };

  const services = [
    {
      id: 'city',
      title: t('services.tours.city.title'),
      image: 'https://images.unsplash.com/photo-1690835960993-270ae9df2028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwYXJjaGl0ZWN0dXJlJTIwY2l0eXxlbnwxfHx8fDE3NjkzODM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1690835960993-270ae9df2028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwYXJjaGl0ZWN0dXJlJTIwY2l0eXxlbnwxfHx8fDE3NjkzODM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1712945492258-9ffc8fad9e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eSUyMHJhdGhhdXMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5Mzg5OTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1596791657688-66236b28b788?q=80&w=1080&auto=format&fit=crop'
      ],
      icon: MapPin,
      description: t('services.tours.city.desc'),
      duration: '3-4 Hours'
    },
    {
      id: 'harbor',
      title: t('services.tours.harbor.title'),
      image: 'https://images.unsplash.com/photo-1650908282348-3f1178d4e031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwZWxiZSUyMHNoaXBzfGVufDF8fHx8MTc2OTM4NDAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1650908282348-3f1178d4e031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwZWxiZSUyMHNoaXBzfGVufDF8fHx8MTc2OTM4NDAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1684326584994-0851e4d2f696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwaGFyYm9yJTIwZWxiZSUyMHBoaWxoYXJtb25pZSUyMHNoaXAlMjBzdW5ueXxlbnwxfHx8fDE3NjkzODk5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1650908282348-3f1178d4e031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwcG9ydCUyMGNvbnRhaW5lciUyMHNoaXAlMjBlbGJlfGVufDF8fHx8MTc2OTM5MDAxMnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      icon: Ship,
      description: t('services.tours.harbor.desc'),
      duration: '3 Hours'
    },
    {
      id: 'business',
      title: t('services.tours.business.title'),
      image: 'https://images.unsplash.com/photo-1716370287223-0a162e265ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pdmFuJTIwaW50ZXJpb3IlMjBsZWF0aGVyJTIwc2VhdHN8ZW58MXx8fHwxNzY5Mzg0MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
          'https://images.unsplash.com/photo-1716370287223-0a162e265ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pdmFuJTIwaW50ZXJpb3IlMjBsZWF0aGVyJTIwc2VhdHN8ZW58MXx8fHwxNzY5Mzg0MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      icon: Briefcase,
      description: t('services.tours.business.desc'),
      duration: 'Flexible'
    },
    {
      id: 'lights',
      title: t('services.tours.lights.title'),
      image: 'https://images.unsplash.com/photo-1705311116604-cd70315044cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHQlMjByZWVwZXJiYWhuJTIwc3BlaWNoZXJzdGFkdCUyMGlsbHVtaW5hdGlvbnxlbnwxfHx8fDE3NjkzODk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
          'https://images.unsplash.com/photo-1705311116604-cd70315044cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHQlMjByZWVwZXJiYWhuJTIwc3BlaWNoZXJzdGFkdCUyMGlsbHVtaW5hdGlvbnxlbnwxfHx8fDE3NjkzODk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1624819250038-34acee64c0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwc3BlaWNoZXJzdGFkdCUyMG5pZ2h0JTIwd2F0ZXIlMjByZWZsZWN0aW9ufGVufDF8fHx8MTc2OTM5MDAwMnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      icon: Moon,
      description: t('services.tours.lights.desc'),
      duration: '2-3 Hours'
    },
    {
      id: 'countryside',
      title: t('services.tours.countryside.title'),
      image: 'https://images.unsplash.com/photo-1763465447001-583e01ff00a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQWx0ZXMlMjBMYW5kJTIwY291bnRyeXNpZGUlMjBvcmNoYXJkJTIwZmFybWhvdXNlfGVufDF8fHx8MTc2OTM4OTk4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1763465447001-583e01ff00a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQWx0ZXMlMjBMYW5kJTIwY291bnRyeXNpZGUlMjBvcmNoYXJkJTIwZmFybWhvdXNlfGVufDF8fHx8MTc2OTM4OTk4NXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1746955229884-49377ca40e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQWx0ZXMlMjBMYW5kJTIwY2hlcnJ5JTIwYmxvc3NvbXxlbnwxfHx8fDE3NjkzOTAwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      icon: TreePine,
      description: t('services.tours.countryside.desc'),
      duration: '5 Hours'
    },
    {
      id: 'christmas',
      title: t('services.tours.christmas.title'),
      image: 'https://images.unsplash.com/photo-1612194929184-54f8a99e237a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQ2hyaXN0bWFzJTIwbWFya2V0JTIwcmF0aGF1cyUyMGZlc3RpdmUlMjBsaWdodHN8ZW58MXx8fHwxNzY5Mzg5OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
          'https://images.unsplash.com/photo-1612194929184-54f8a99e237a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQ2hyaXN0bWFzJTIwbWFya2V0JTIwcmF0aGF1cyUyMGZlc3RpdmUlMjBsaWdodHN8ZW58MXx8fHwxNzY5Mzg5OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
          'https://images.unsplash.com/photo-1737069221901-2ae7442f62a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwQ2hyaXN0bWFzJTIwbWFya2V0JTIwZm9vZCUyMGdsdWh3ZWlufGVufDF8fHx8MTc2OTM5MDAwOHww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      icon: Coffee,
      description: t('services.tours.christmas.desc'),
      duration: '3 Hours'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7] pb-32 md:pb-12">
       {/* Header Image */}
       <div className="relative h-[22rem] md:h-[450px] w-full bg-teal-50 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden shadow-sm">
          <ImageWithFallback
            src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Cheerful%20woman%20with%20Hyundai%20minivan%20mascot.png"
            alt="Angela with her car"
            className="absolute bottom-12 -right-6 h-[65%] w-[70%] md:w-[45%] md:h-[85%] md:bottom-12 md:right-0 object-contain object-right-bottom md:mr-8 z-0"
          />
          {/* Enhanced Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-16 left-6 right-6 md:top-32 md:left-16 max-w-7xl mx-auto z-10">
             <div className="max-w-[60%] md:max-w-xl">
                <h1 className="text-3xl md:text-6xl font-bold text-slate-800 mb-2 md:mb-4 tracking-tight drop-shadow-sm">{t('services.title')}</h1>
                <p className="text-slate-700 text-sm md:text-2xl font-medium drop-shadow-sm leading-tight">
                    {t('services.subtitle')}
                </p>
             </div>
          </div>
       </div>

       {/* Content Area */}
       <div className="max-w-7xl mx-auto w-full px-4 md:px-6 relative z-10 -mt-8 md:-mt-16">
         
         {/* Why Ride With Me - Moved Above Tours */}
         <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-5xl mx-auto mb-12">
            <h4 className="font-bold text-xl md:text-3xl mb-8 text-center text-slate-900">{t('services.whyRide')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { text: t('services.features.certified'), highlight: true },
                    { text: t('services.features.vehicle'), highlight: true },
                    { text: t('services.features.refreshments'), highlight: false },
                    { text: t('services.features.flexible'), highlight: true },
                    { text: t('services.features.kids'), highlight: false },
                    { text: t('services.features.insurance'), highlight: true }
                ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${item.highlight ? 'bg-amber-50/50' : ''}`}>
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <CheckCircle size={24} />
                    </div>
                    <span className="text-slate-700 font-medium text-sm md:text-base">{item.text}</span>
                    </div>
                ))}
            </div>
         </div>

         {/* Section Title */}
         <div className="text-center mb-8 hidden md:block">
            <h2 className="text-3xl font-bold text-slate-900">{t('services.explore')}</h2>
            <p className="text-slate-500 mt-2">{t('services.exploreSub')}</p>
         </div>

         {/* Mobile Carousel - Now shows all items */}
         <div className="mb-8 md:hidden services-carousel">
           <Slider {...settings}>
              {services.map((service) => (
                <div key={service.id} className="px-2 py-4">
                   <ServiceCard service={service} onBook={onBook} bookText={t('services.bookBtn')} />
                </div>
              ))}
           </Slider>
         </div>

         {/* Desktop Grid - All items visible */}
         <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ServiceCard service={service} onBook={onBook} bookText={t('services.bookBtn')} />
              </motion.div>
            ))}
         </div>
       </div>
    </div>
  );
}

function ServiceCard({ service, onBook, bookText }: { service: any, onBook: any, bookText: string }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    dotsClass: "slick-dots !bottom-2"
  };

  const images = service.images && service.images.length > 0 ? service.images : [service.image];

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 group">
      <div className="h-48 md:h-60 overflow-hidden relative">
        {images.length > 1 ? (
             <Slider {...settings} className="h-full service-slider">
                {images.map((img: string, i: number) => (
                    <div key={i} className="h-48 md:h-60 outline-none">
                        <ImageWithFallback src={img} alt={`${service.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
             </Slider>
        ) : (
            <ImageWithFallback src={images[0]} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full p-2.5 shadow-sm text-primary z-10 pointer-events-none">
          <service.icon size={22} />
        </div>
        
        {/* Only show gradient overlay if NOT a slider, or if we want it on top of slider too. 
            On slider it might obscure controls or look weird if dragging. 
            Let's keep it but make it pointer-events-none so we can swipe through it. 
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-white">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-slate-500 text-sm md:text-base mb-6 flex-grow leading-relaxed">{service.description}</p>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider bg-slate-50 self-start px-3 py-1 rounded-full">
            <Clock size={14} /> {service.duration}
          </div>
          
          <button 
            onClick={() => onBook(service.id)}
            className="w-full py-4 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 hover:bg-teal-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {bookText}
          </button>
      </div>
    </div>
  );
}
