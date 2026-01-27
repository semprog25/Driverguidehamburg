import React from 'react';
import { Home, Map, Heart, Menu, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/app/context/LanguageContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'tours', label: t('nav.tours'), icon: Map },
    { id: 'booking', label: t('nav.bookNow'), icon: Calendar, highlight: true },
    { id: 'memories', label: t('nav.memories'), icon: Heart },
    { id: 'more', label: t('nav.more') || 'More', icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-2 z-50 pb-8 rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <nav className="flex justify-between items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          if (item.highlight) {
             return (
               <button
                 key={item.id}
                 onClick={() => onNavigate(item.id)}
                 className="relative -top-6 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
               >
                 <Icon size={24} />
               </button>
             );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon size={24} className={isActive ? 'fill-primary/20' : ''} />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
