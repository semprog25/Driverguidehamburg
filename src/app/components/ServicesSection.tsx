import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { MapPin, Anchor, Music, Waves, Building2, Route } from 'lucide-react';

const tours = [
  {
    title: 'City Tour (Stadtrundfahrt)',
    description: 'Explore Hamburg’s most iconic landmarks including the Town Hall, Michel, and Alster.',
    icon: <MapPin className="h-6 w-6 text-amber-500" />,
    duration: '3h',
    price: 'From €240'
  },
  {
    title: 'Harbor Tour (Hafentour)',
    description: 'Experience Europe’s second-largest port from the landside with spectacular views.',
    icon: <Anchor className="h-6 w-6 text-amber-500" />,
    duration: '2.5h',
    price: 'From €200'
  },
  {
    title: 'Reeperbahn Tour',
    description: 'Discover the "Sinful Mile" – history, legends, and the Beatles in St. Pauli.',
    icon: <Music className="h-6 w-6 text-amber-500" />,
    duration: '2h',
    price: 'From €160'
  },
  {
    title: 'Elbe & Elbchaussee',
    description: 'A scenic drive along the river Elbe past magnificent villas and beaches.',
    icon: <Waves className="h-6 w-6 text-amber-500" />,
    duration: '3.5h',
    price: 'From €280'
  },
  {
    title: 'Speicherstadt',
    description: 'Visit the world’s largest warehouse district, a UNESCO World Heritage site.',
    icon: <Building2 className="h-6 w-6 text-amber-500" />,
    duration: '2h',
    price: 'From €160'
  },
  {
    title: 'Custom Tour',
    description: 'Fully customizable itinerary tailored to your specific interests and schedule.',
    icon: <Route className="h-6 w-6 text-amber-500" />,
    duration: 'Flexible',
    price: 'Hourly Rate'
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Tours & Services</h2>
          <p className="mt-4 text-lg text-slate-600">Discover Hamburg with a local expert.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <Card key={index} className="border-t-4 border-t-amber-500 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  {tour.icon}
                </div>
                <CardTitle className="text-xl">{tour.title}</CardTitle>
                <div className="flex gap-4 text-sm text-slate-500 mt-2">
                  <span className="font-semibold text-amber-600">{tour.duration}</span>
                  <span>•</span>
                  <span>{tour.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{tour.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
