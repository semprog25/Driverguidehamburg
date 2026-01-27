import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Car, Menu, Phone, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Book Now' },
    { id: 'blog', label: 'Memories' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
          <div className="rounded-full bg-slate-900 p-2 text-white">
            <Car className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Hamburg DriverGuide</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                currentPage === link.id ? 'text-amber-500' : 'text-slate-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+49123456789" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-500">
            <Phone className="h-4 w-4" />
            <span>+49 172 123 4567</span>
          </a>
          <Button onClick={() => handleNavigate('booking')} className="bg-slate-900 text-white hover:bg-slate-800">
            Book
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-full bg-slate-900 p-2 text-white">
                    <Car className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold">Menu</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavigate(link.id)}
                      className={`text-lg font-medium text-left transition-colors hover:text-amber-500 ${
                        currentPage === link.id ? 'text-amber-500' : 'text-slate-600'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                <div className="border-t pt-6 mt-2 space-y-4">
                  <a href="tel:+49123456789" className="flex items-center gap-2 text-lg font-medium text-slate-600 hover:text-amber-500">
                    <Phone className="h-5 w-5" />
                    <span>+49 172 123 4567</span>
                  </a>
                  <Button onClick={() => handleNavigate('booking')} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
