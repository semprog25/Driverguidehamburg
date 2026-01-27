import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded simple password for now as requested
    if (password === 'hamburg2026') {
      onLogin();
      toast.success('Welcome back, Angela!');
    } else {
      setError(true);
      toast.error('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md relative z-10">
        {/* Mascot Image - "No Entry" Police Officer */}
        <div className="flex justify-center -mb-12 relative z-20">
            <div className="w-48 h-48 md:w-56 md:h-56 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
                <ImageWithFallback 
                    src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Confident%20police%20officer%20with%20text.png"
                    alt="Angela Police Officer saying Stop"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>

        <Card className="w-full shadow-2xl border-4 border-orange-100 bg-white/95 backdrop-blur overflow-hidden pt-12">
            {/* Orange Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-amber-500" />
            
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Lock className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-black text-slate-800">Admin Area</CardTitle>
            <CardDescription className="font-medium text-orange-600/80">Authorized Personnel Only</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter secret password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`h-12 text-lg text-center tracking-widest border-2 focus-visible:ring-orange-400 ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-orange-400'}`}
                />
                {error && <p className="text-sm text-red-500 font-bold text-center animate-pulse">Access Denied!</p>}
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200 border-none transition-all active:scale-95"
              >
                Verify Access
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
