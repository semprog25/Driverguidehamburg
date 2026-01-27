import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster, toast } from 'sonner';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { Button } from '@/app/components/ui/button';
import { Home as HomeIcon } from 'lucide-react';

// Images
import imgHamburg from "figma:asset/5ee1d05ee194db85b25623d0d254b6611f4c8283.png";
import imgLuebeck from "figma:asset/c9812e7e9d0c4996674cdd9f5b57c5991cb0fa5e.png";
import imgLueneburg from "figma:asset/0d5fd9b56abba71d61dc17442d3f7c5d910e6eee.png";
import imgAltesLand from "figma:asset/dc89bca148dfb404ba35d32ccc5fc979c5a99971.png";
import imgRuegen from "figma:asset/93b4c87f52fa0de8c3ab554d481d36b5b1a6f98c.png";
import imgPloen from "figma:asset/12160c15844553d5a80e95287e3e95e3c2c693b3.png";

// Components
import { Header } from '@/app/components/Header';
import { Home } from '@/app/components/Home';
import { Services } from '@/app/components/Services';
import { Memories } from '@/app/components/Memories';
import { BottomNav } from '@/app/components/mobile/BottomNav';

// Existing Components (reused)
import { MoreSection } from '@/app/components/MoreSection';
import { BookingForm, BookingData } from '@/app/components/BookingForm';
import { Booking, BookingStatus, GalleryItem } from '@/app/components/AdminPanel';
import { BlogPost } from '@/app/components/BlogSection';
// import { LoginScreen } from '@/app/components/LoginScreen';

function MainLayout() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  // Data States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Mock initial data
  useEffect(() => {
    // Mock Bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        created_at: new Date().toISOString(),
        name: 'Hans Müller',
        email: 'hans@example.com',
        phone: '+49 123 456789',
        date: '2023-11-15',
        guests: 4,
        tourType: 'city-tour',
        bookingType: 'business',
        message: 'City tour for business partners. Focus on architecture.',
        status: 'pending',
        paymentStatus: 'pending',
        amount: 600
      },
      {
        id: '2',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        phone: '+1 555 0123',
        date: '2023-12-01',
        guests: 2,
        tourType: 'harbor-tour',
        bookingType: 'leisure',
        message: 'Anniversary trip. Can we add a champagne stop?',
        status: 'accepted',
        paymentStatus: 'paid',
        amount: 350
      }
    ];
    setBookings(mockBookings);

    // Mock Posts
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        author: 'The Anderson Family',
        location: 'Speicherstadt',
        date: '2023-10-15',
        title: 'Unforgettable Sunset',
        content: 'We had such an amazing time exploring the warehouse district. Angela knew all the best spots for photos! The lighting was perfect and the history was so fascinating.',
        imageUrl: 'https://images.unsplash.com/photo-1533141443191-db057972d88b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRvdXJpc3RzJTIwaGFtYnVyZ3xlbnwxfHx8fDE3NjkzNDY1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
           'https://images.unsplash.com/photo-1533141443191-db057972d88b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRvdXJpc3RzJTIwaGFtYnVyZ3xlbnwxfHx8fDE3NjkzNDY1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
           'https://images.unsplash.com/photo-1596791657688-66236b28b788?q=80&w=1080&auto=format&fit=crop'
        ],
        likes: 24,
        status: 'approved',
        likedMost: 'The historical buildings at sunset',
        feedback: 'Angela was super knowledgeable and friendly!'
      },
      {
        id: '2',
        author: 'Sarah & Mike',
        location: 'Elbphilharmonie',
        date: '2023-12-05',
        title: 'Windy but Wonderful',
        content: 'Even though it was a bit breezy, the views from the plaza were incredible. Angela organized everything perfectly so we didn\'t have to wait in line. Highly recommended!',
        imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1080',
        images: [
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1080'
        ],
        likes: 18,
        status: 'approved',
        likedMost: 'The view from the top',
        feedback: 'Very organized and professional.'
      },
      {
        id: '3',
        author: 'Jonas K.',
        location: 'Reeperbahn Night Tour',
        date: '2024-01-10',
        title: 'Hamburg at Night!',
        content: 'The city looks completely different at night. The lights were amazing and driving through the city in the luxury van was a great experience.',
        imageUrl: 'https://images.unsplash.com/photo-1705311116604-cd70315044cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHQlMjByZWVwZXJiYWhuJTIwc3BlaWNoZXJzdGFkdCUyMGlsbHVtaW5hdGlvbnxlbnwxfHx8fDE3NjkzODk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        images: [
            'https://images.unsplash.com/photo-1705311116604-cd70315044cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwbmlnaHQlMjByZWVwZXJiYWhuJTIwc3BlaWNoZXJzdGFkdCUyMGlsbHVtaW5hdGlvbnxlbnwxfHx8fDE3NjkzODk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1624819250038-34acee64c0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYW1idXJnJTIwc3BlaWNoZXJzdGFkdCUyMG5pZ2h0JTIwd2F0ZXIlMjByZWZsZWN0aW9ufGVufDF8fHx8MTc2OTM5MDAwMnww&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1553556708-9993309a4a75?q=80&w=1080&auto=format&fit=crop'
        ],
        likes: 42,
        status: 'approved',
        likedMost: 'The Christmas lights (still up!)',
        feedback: 'The best driver we could ask for.'
      }
    ];
    setPosts(mockPosts);

    // Mock Gallery
    const mockGallery: GalleryItem[] = [
        {
           id: 'a1',
           imageUrl: imgHamburg,
           title: "Hamburg Highlights",
           description: "Speicherstadt, HafenCity, Elbphilharmonie und Reeperbahn – unsere meistgebuchte City Tour.",
           date: new Date().toISOString()
        },
        {
           id: 'a2',
           imageUrl: imgLuebeck,
           title: "Lübeck Tagesausflug",
           description: "UNESCO Altstadt, Holstentor & Marzipan – perfekt für einen entspannten Tag ab Hamburg.",
           date: new Date(Date.now() - 86400000).toISOString()
        },
        {
           id: 'a3',
           imageUrl: imgLueneburg,
           title: "Lüneburg und das Salz",
           description: "Mittelalterliche Altstadt, Salzgeschichte und Natur pur.",
           date: new Date(Date.now() - 172800000).toISOString()
        },
        {
           id: 'a4',
           imageUrl: imgAltesLand,
           title: "Altes Land",
           description: "Obstblüte, Fachwerkhäuser und Elbdeiche – besonders beliebt im Frühling.",
           date: new Date(Date.now() - 259200000).toISOString()
        },
        {
           id: 'a5',
           imageUrl: imgRuegen,
           title: "Rügen Ostsee Tour",
           description: "Kreidefelsen, Seebrücken und Ostseestrände – ein unvergesslicher Tagesausflug.",
           date: new Date(Date.now() - 345600000).toISOString()
        },
        {
           id: 'a6',
           imageUrl: imgPloen,
           title: "Plön & Seenplatte",
           description: "Schlösser, Seen und Natur – entspannte Landpartie ab Hamburg.",
           date: new Date(Date.now() - 432000000).toISOString()
        }
    ];
    setGalleryItems(mockGallery);
  }, []);

  // Booking Handlers
  const handleSaveBooking = (booking: Booking) => {
    setBookings(prev => {
      const exists = prev.find(b => b.id === booking.id);
      if (exists) {
        return prev.map(b => b.id === booking.id ? booking : b);
      } else {
        return [booking, ...prev];
      }
    });
    toast.success("Booking saved successfully");
  };

  const handleBookingSubmit = async (data: BookingData) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      ...data,
      status: 'pending',
      paymentStatus: 'pending',
      amount: data.guests * 150 // Mock calculation
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBookings(prev => [newBooking, ...prev]);
    toast.success("Booking request sent! Angela will contact you soon.");
    setCurrentPage('home');
  };

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };
  
  const handleUpdatePaymentStatus = (id: string, status: 'paid' | 'unpaid' | 'pending') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paymentStatus: status } : b));
    toast.success(`Payment status updated to ${status}`);
  };

  const handleDelete = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleReply = (id: string, message: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, admin_reply: message } : b));
    alert(`Reply sent to customer: "${message}"`);
  };

  const handleLoadDummyData = () => {
    // Generate some dummy bookings for the current month
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const dummyBookings: Booking[] = [
        {
            id: 'demo-1',
            created_at: new Date().toISOString(),
            name: 'Demo: Family Schmidt',
            email: 'schmidt@demo.com',
            phone: '+49 123 456789',
            date: new Date(currentYear, currentMonth, 5, 10, 0).toISOString(),
            guests: 4,
            tourType: 'city-tour',
            bookingType: 'leisure',
            message: 'First time in Hamburg!',
            status: 'accepted',
            paymentStatus: 'paid',
            amount: 450
        },
        {
            id: 'demo-2',
            created_at: new Date().toISOString(),
            name: 'Demo: Tech Corp',
            email: 'contact@techcorp.com',
            phone: '+49 987 654321',
            date: new Date(currentYear, currentMonth, 12, 14, 0).toISOString(),
            guests: 6,
            tourType: 'business',
            bookingType: 'business',
            message: 'Shuttle from hotel to conference.',
            status: 'pending',
            paymentStatus: 'pending',
            amount: 800
        },
        {
            id: 'demo-3',
            created_at: new Date().toISOString(),
            name: 'Demo: John Doe',
            email: 'john@demo.com',
            phone: '+1 555 5555',
            date: new Date(currentYear, currentMonth, 20, 18, 0).toISOString(),
            guests: 2,
            tourType: 'lights',
            bookingType: 'leisure',
            message: 'Night tour please.',
            status: 'accepted',
            paymentStatus: 'unpaid',
            amount: 300
        },
        {
            id: 'demo-4',
            created_at: new Date().toISOString(),
            name: 'Demo: Alice Wonderland',
            email: 'alice@demo.com',
            phone: '+44 7700 900000',
            date: new Date(currentYear, currentMonth, 25, 9, 0).toISOString(),
            guests: 3,
            tourType: 'countryside',
            bookingType: 'leisure',
            message: 'Altes Land trip.',
            status: 'cancelled',
            paymentStatus: 'unpaid',
            amount: 0
        }
    ];

    setBookings(prev => [...prev, ...dummyBookings]);
    toast.success("Dummy data loaded!");
  };

  const handleClearDummyData = () => {
      setBookings(prev => prev.filter(b => !b.id.startsWith('demo-')));
      toast.success("Dummy data removed!");
  };

  // Blog Handlers
  const handleSavePost = (post: BlogPost) => {
    setPosts(prev => {
        const exists = prev.find(p => p.id === post.id);
        if (exists) {
            return prev.map(p => p.id === post.id ? post : p);
        } else {
            return [post, ...prev];
        }
    });
    toast.success("Memory saved successfully");
  };

  const handleAddPost = (post: BlogPost) => {
    setPosts(prev => [post, ...prev]);
    toast.success("Memory shared! Waiting for approval.");
  };

  const handleLikePost = (id: string) => {
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const handleApprovePost = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    toast.success("Memory approved and live!");
  };

  const handleRejectPost = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
    toast.success("Memory rejected.");
  };

  const handleDeletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success("Memory deleted.");
  };

  // Gallery Handlers
  const handleSaveGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => {
        const exists = prev.find(i => i.id === item.id);
        if (exists) {
            return prev.map(i => i.id === item.id ? item : i);
        } else {
            return [item, ...prev];
        }
    });
    toast.success("Gallery item saved!");
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(i => i.id !== id));
    toast.success("Gallery item deleted.");
  };

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage('booking');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 w-full overflow-x-hidden">
      
      {/* Desktop Header */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <main className="w-full min-h-screen pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >
              <Home onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {currentPage === 'tours' && (
            <motion.div 
              key="tours"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-full"
            >
              <Services onBook={handleBookService} />
            </motion.div>
          )}

          {currentPage === 'memories' && (
            <motion.div 
              key="memories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >
              <Memories 
                posts={posts} 
                onAddPost={handleAddPost} 
                onLikePost={handleLikePost}
                galleryItems={galleryItems}
              />
            </motion.div>
          )}

          {currentPage === 'booking' && (
            <motion.div 
              key="booking"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="min-h-full pt-8 pb-32 px-4 bg-white max-w-7xl mx-auto md:my-10"
            >
               {/* Wrapper to center form comfortably */}
              <div className="flex flex-col items-center justify-center pb-12">
                 <BookingForm onSubmitBooking={handleBookingSubmit} />
                 
                 <Button 
                  onClick={() => setCurrentPage('home')}
                  variant="outline"
                  size="lg"
                  className="mt-6 border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 w-full max-w-xs h-14 text-base font-bold shadow-sm rounded-xl gap-2"
                >
                  <HomeIcon size={18} />
                  Cancel and return home
                </Button>
              </div>
            </motion.div>
          )}

          {currentPage === 'more' && (
            <motion.div 
              key="more"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full pt-4 pb-32 px-2 bg-slate-50 max-w-7xl mx-auto"
            >
              <MoreSection 
                bookings={bookings} 
                posts={posts}
                galleryItems={galleryItems}
                onUpdateStatus={handleUpdateStatus} 
                onUpdatePaymentStatus={handleUpdatePaymentStatus}
                onDelete={handleDelete}
                onSaveBooking={handleSaveBooking}
                onReply={handleReply}
                onApprovePost={handleApprovePost}
                onRejectPost={handleRejectPost}
                onDeletePost={handleDeletePost}
                onSavePost={handleSavePost}
                onSaveGalleryItem={handleSaveGalleryItem}
                onDeleteGalleryItem={handleDeleteGalleryItem}
                onLoadDummyData={handleLoadDummyData}
                onClearDummyData={handleClearDummyData}
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
                onLogin={() => setIsAuthenticated(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      {currentPage !== 'booking' && (
        <div className="md:hidden">
          <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
      )}
      
      <Toaster position="top-center" />
    </div>
  );
}

const App = () => {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
};

export default App;