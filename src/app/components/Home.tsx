import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, Trophy, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLanguage } from '@/app/context/LanguageContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/app/components/ui/dropdown-menu";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];
  const currentFlag = languages.find(l => l.code === language)?.flag || '🇩🇪';

  return (
    <div className="flex flex-col w-full min-h-screen md:h-[calc(100vh-5rem)] bg-[#FFFDF7] overflow-x-hidden md:overflow-hidden relative">
      
      {/* Mobile Language Switcher (Floating Top Right) */}
      <div className="absolute top-6 right-6 z-50 md:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm border border-slate-100 text-xl">
                    {currentFlag}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`cursor-pointer ${language === lang.code ? 'bg-slate-100 font-bold' : ''}`}
                >
                    <span className="mr-2 text-lg">{lang.flag}</span>
                    {lang.label}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content Container - Centered on Desktop */}
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-12 md:py-0">
          
          {/* Text Content (Left Side) */}
          <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left relative z-10 flex flex-col justify-center md:-mt-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6"
            >
              <span className="block mb-2">{t('home.greeting')}</span>
              <span className="block">
                {t('home.iam')} <span className="text-primary relative inline-block">
                Angela
                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-10 max-w-lg mx-auto md:mx-0 text-slate-600 font-medium"
            >
              <p className="text-lg md:text-2xl font-bold text-slate-800 leading-snug">
                {t('home.role')}
              </p>
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                {t('home.intro')}
              </p>
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                {t('home.vehicle')}
              </p>
              <p className="text-base md:text-lg opacity-90 leading-relaxed italic">
                 "{t('home.philosophy')}"
              </p>
              <p className="text-lg font-bold text-primary pt-2">
                 {t('home.closing')}
              </p>
            </motion.div>
            
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('tours')}
                className="flex-1 bg-primary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
              >
                {t('home.ctaDrive')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                 whileHover={{ scale: 1.03 }}
                 whileTap={{ scale: 0.97 }}
                 onClick={() => onNavigate('memories')}
                 className="flex-1 bg-white text-slate-700 font-bold text-lg py-4 px-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                {t('home.ctaMemories')}
                <Heart size={18} className="text-destructive fill-destructive/20" />
              </motion.button>
            </div>
          </div>

          {/* Image & Stats Content (Right Side) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 relative flex flex-col items-center justify-center h-auto md:h-full">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-[90%] md:w-full max-w-[400px] md:max-w-none md:scale-[1.1] md:origin-center md:-mt-20"
            >
              <div className="relative w-full">
                 <ImageWithFallback 
                   src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Meet%20Angela,%20your%20friendly%20businesswoman!.png" 
                   alt="Angela saying hi"
                   className="w-full h-auto object-contain drop-shadow-2xl"
                   loading="eager"
                   // @ts-ignore
                   fetchPriority="high"
                 />
                 
                 {/* Speech Bubble Overlay */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.6, type: "spring" }}
                   className="absolute bottom-4 left-0 md:left-[5%] md:bottom-[5%] z-20"
                 >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ 
                            scale: 1.1, 
                            rotate: [0, -3, 3, -3, 0],
                            transition: { duration: 0.3 } 
                        }}
                        className="bg-white/95 backdrop-blur-sm p-3 md:p-5 rounded-2xl rounded-tr-xl rounded-bl-none shadow-lg border border-primary/10 max-w-[140px] md:max-w-[200px] cursor-pointer"
                    >
                        <p className="text-sm md:text-lg font-bold text-slate-800">"{t('home.speechBubble.title')}"</p>
                        <p className="text-xs md:text-sm text-slate-600 mt-1 leading-tight">{t('home.speechBubble.subtitle')}</p>
                    </motion.div>
                 </motion.div>
              </div>
            </motion.div>
            
            {/* Stats / Social Proof - Desktop Alignment (Below Mascot) */}
            <motion.div 
                className="hidden md:grid grid-cols-3 gap-6 mt-8 w-full max-w-lg bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex flex-col items-center text-center">
                   <div className="bg-orange-100 p-2 rounded-full mb-2">
                     <Calendar size={20} className="text-orange-600" />
                   </div>
                   <div className="text-2xl font-black text-slate-900">20+</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('home.stats.years')}</div>
                </div>
                
                <div className="flex flex-col items-center text-center relative">
                   {/* Divider */}
                   <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200/60 -ml-3"></div>
                   
                   <div className="bg-blue-100 p-2 rounded-full mb-2">
                     <Users size={20} className="text-blue-600" />
                   </div>
                   <div className="text-2xl font-black text-slate-900 whitespace-nowrap">10k+</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('home.stats.guests')}</div>
                   
                   <div className="absolute right-0 top-2 bottom-2 w-px bg-slate-200/60 -mr-3"></div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                   <div className="bg-yellow-100 p-2 rounded-full mb-2">
                     <Trophy size={20} className="text-yellow-600" />
                   </div>
                   <div className="text-2xl font-black text-slate-900 flex items-center gap-1">5.0 <Star size={18} className="text-yellow-500 fill-yellow-500" /></div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('home.stats.rating')}</div>
                </div>
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none">
              <div className="absolute top-10 right-10 w-64 md:w-[500px] h-64 md:h-[500px] bg-yellow-200/30 rounded-full blur-[100px] animate-pulse-slow" />
              <div className="absolute bottom-10 left-10 w-48 md:w-[400px] h-48 md:h-[400px] bg-teal-200/30 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Stats / Social Proof - Mobile Only */}
          <div className="mt-8 w-full md:hidden">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex justify-between items-center">
              <div className="text-center">
                 <div className="text-2xl font-black text-slate-900">20+</div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('home.stats.years')}</div>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-center">
                 <div className="text-2xl font-black text-slate-900">10k+</div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('home.stats.guests')}</div>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-center">
                 <div className="text-2xl font-black text-slate-900 flex items-center gap-1">5.0 <Star size={16} className="text-yellow-400 fill-yellow-400" /></div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</div>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
