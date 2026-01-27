import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { Calendar, User, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  tourType: string;
  bookingType: string;
  message: string;
}

interface BookingFormProps {
  onSubmitBooking: (data: BookingData) => Promise<void>;
  initialTourType?: string;
}

export function BookingForm({ onSubmitBooking, initialTourType }: BookingFormProps) {
  const { t } = useLanguage();
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<BookingData>({
    defaultValues: {
      tourType: initialTourType || '',
      guests: 2
    }
  });

  const selectedTour = watch('tourType');
  const selectedBookingType = watch('bookingType');

  // Move options inside component to react to language change
  const TOUR_OPTIONS = [
    { value: 'city-tour', label: t('services.tours.city.title') },
    { value: 'harbor-tour', label: t('services.tours.harbor.title') },
    { value: 'lights-tour', label: t('services.tours.lights.title') },
    { value: 'christmas', label: t('services.tours.christmas.title') },
    { value: 'countryside', label: t('services.tours.countryside.title') },
    { value: 'custom', label: t('services.exploreSub') } // Using subtitle as custom label roughly
  ];

  const BOOKING_TYPES = [
    { value: 'leisure', label: t('booking.types.leisure') },
    { value: 'business', label: t('booking.types.business') },
    { value: 'transfer', label: t('booking.types.transfer') }
  ];

  const onSubmit = async (data: BookingData) => {
    try {
      await onSubmitBooking(data);
      reset();
    } catch (error) {
      toast.error("Failed to send booking request.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Card className="w-full shadow-xl border-none overflow-hidden rounded-[2rem] z-10">
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
             {/* Header Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             
             <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10">{t('booking.cardTitle')}</h3>
             <p className="text-slate-300 mt-2 relative z-10 max-w-md mx-auto">
                {t('booking.cardSub')}
             </p>
        </div>

        <CardContent className="p-6 md:p-10 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Form content remains the same */}
            {/* Section 1: Trip Details */}
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-primary" /> {t('booking.sections.details')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>{t('booking.labels.tour')}</Label>
                        <Select onValueChange={(val) => setValue('tourType', val)} defaultValue={selectedTour}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                            <SelectValue placeholder={t('booking.labels.tourPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            {TOUR_OPTIONS.map((tour) => (
                            <SelectItem key={tour.value} value={tour.value}>{tour.label}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>{t('booking.labels.purpose')}</Label>
                        <Select onValueChange={(val) => setValue('bookingType', val)} defaultValue={selectedBookingType}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                            <SelectValue placeholder={t('booking.labels.purposePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            {BOOKING_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2"><Calendar size={14} /> {t('booking.labels.date')}</Label>
                        <Input 
                            id="date" 
                            type="date" 
                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                            {...register('date', { required: 'Date is required' })} 
                        />
                        {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="guests" className="flex items-center gap-2"><User size={14} /> {t('booking.labels.guests')}</Label>
                        <Input 
                            id="guests" 
                            type="number" 
                            min="1"
                            max="7"
                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                            {...register('guests', { 
                            required: 'Number of guests is required', 
                            min: { value: 1, message: 'Minimum 1 guest' },
                            max: { value: 7, message: 'Max 7 guests (Minivan capacity)' }
                            })} 
                        />
                        <p className="text-xs text-slate-400">{t('booking.labels.maxGuests')}</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Personal Details */}
            <div className="space-y-4 pt-4">
                <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <User size={18} className="text-primary" /> {t('booking.sections.contact')}
                </h4>
                
                <div className="space-y-2">
                    <Label htmlFor="name">{t('booking.labels.name')}</Label>
                    <Input 
                        id="name" 
                        className="h-12 rounded-xl bg-slate-50 border-slate-200"
                        {...register('name', { required: 'Name is required' })} 
                        placeholder="e.g. Angela Scheefeld"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('booking.labels.email')}</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                            {...register('email', { required: 'Email is required' })} 
                            placeholder="hello@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">{t('booking.labels.phone')}</Label>
                        <Input 
                            id="phone" 
                            type="tel" 
                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                            {...register('phone', { required: 'Phone is required' })} 
                            placeholder="+49 ..."
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Message */}
            <div className="space-y-2">
                <Label htmlFor="message">{t('booking.sections.message')}</Label>
                <Textarea 
                    id="message" 
                    {...register('message')} 
                    placeholder="..."
                    className="min-h-[120px] rounded-xl bg-slate-50 border-slate-200 resize-y"
                />
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button 
                    type="submit" 
                    className="w-full h-14 bg-primary hover:bg-amber-600 text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/30 transition-all" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            {t('booking.sending')}
                        </span>
                    ) : (
                        t('booking.submit')
                    )}
                </Button>
            </motion.div>
            
            <p className="text-center text-xs text-slate-400">
                {t('booking.disclaimer')}
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Logo Section - Moved to bottom */}
      <div className="w-full flex justify-center pt-8 md:pt-12 pb-4">
         <img 
           src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/driverguidelogo.png" 
           alt="DriverGuide Logo" 
           className="h-72 md:h-[32rem] w-auto object-contain drop-shadow-sm"
         />
      </div>
    </div>
  );
}
