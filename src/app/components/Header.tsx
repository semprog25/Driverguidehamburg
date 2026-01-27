import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Map, Home, Menu, Globe } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'tours', label: t('nav.tours'), icon: Map },
    { id: 'memories', label: t('nav.memories'), icon: Heart },
    { id: 'more', label: t('nav.more') || 'More', icon: Menu },
  ];

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  const currentFlag = languages.find(l => l.code === language)?.flag || '🇩🇪';

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 hidden md:block"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center p-1 group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl">🚕</span>
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            DriverGuide<span className="text-primary">Hamburg</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-2 font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-8 left-0 right-0 h-1 bg-primary rounded-t-full"
                  />
                )}
              </button>
            );
          })}
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700 font-medium">
                <Globe size={18} />
                <span>{currentFlag}</span>
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

          <button 
            onClick={() => onNavigate('booking')}
            className="ml-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            {t('nav.bookNow')}
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
