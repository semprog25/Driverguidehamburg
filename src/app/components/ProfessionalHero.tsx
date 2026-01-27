import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ProfessionalHeroProps {
  onBookNow: () => void;
}

export function ProfessionalHero({ onBookNow }: ProfessionalHeroProps) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1533141443191-db057972d88b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwY2l0eSUyMGxhbmRtYXJrJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTMzMjg4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hamburg City"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-white sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Experience Hamburg with <span className="text-amber-400">Angela Scheefeld</span>
          </h1>
          <p className="mb-8 text-lg text-slate-200 sm:text-xl">
            Premium DriverGuide service for business and leisure. Discover the city in comfort and style.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              onClick={onBookNow}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg h-12 px-8"
            >
              Book Your Tour
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-slate-900 hover:bg-white/10 hover:text-white h-12 px-8"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
