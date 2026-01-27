import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Check, X, MessageSquare, Trash2, Mail, Image as ImageIcon, ExternalLink, 
  Calendar as CalendarIcon, TrendingUp, Users, Clock, ChevronLeft, ChevronRight,
  LayoutDashboard, List, Map, LogOut, CreditCard, DollarSign, AlertCircle,
  Plus, Edit, Save, RefreshCw, Search, Camera, Download, FileText, Award
} from 'lucide-react';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, 
  isToday, parseISO, getDay 
} from 'date-fns';
import { BlogPost } from './BlogSection';
import { motion, AnimatePresence } from 'motion/react';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  date: string; // ISO date string
  guests: number;
  message: string;
  tourType?: string;
  bookingType?: string;
  status: BookingStatus;
  admin_reply?: string;
  paymentStatus?: 'paid' | 'unpaid' | 'pending';
  amount?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface AdminDashboardProps {
  bookings: Booking[];
  posts: BlogPost[];
  galleryItems: GalleryItem[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onUpdatePaymentStatus: (id: string, status: 'paid' | 'unpaid' | 'pending') => void;
  onDelete: (id: string) => void;
  onReply: (id: string, message: string) => void;
  onApprovePost: (id: string) => void;
  onRejectPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  onLogout: () => void;
  onSaveBooking: (booking: Booking) => void;
  onSavePost: (post: BlogPost) => void;
  onSaveGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onLoadDummyData: () => void;
  onClearDummyData: () => void;
}

// Stats Component
function DashboardStats({ bookings }: { bookings: Booking[] }) {
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'accepted').length;
  const totalGuests = bookings.reduce((acc, curr) => acc + (curr.status === 'accepted' ? Number(curr.guests) : 0), 0);

  const stats = [
    { title: "Total Bookings", value: totalBookings, desc: "+12% from last month", icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending Requests", value: pendingBookings, desc: "Requires attention", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Confirmed Tours", value: confirmedBookings, desc: "Upcoming trips", icon: Check, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Guests", value: totalGuests, desc: "Happy travelers", icon: Users, color: "text-purple-600", bg: "bg-purple-100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.bg}`}><stat.icon className={`w-6 h-6 ${stat.color}`} /></div>
              <div><p className="text-sm font-medium text-slate-500">{stat.title}</p><h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3></div>
            </div>
            <div className="mt-4"><p className="text-xs text-slate-400">{stat.desc}</p></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Calendar View Component
function BookingCalendar({ bookings, onSelectBooking }: { bookings: Booking[], onSelectBooking: (b: Booking) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const bookedDaysCount = eachDayOfInterval({ start: monthStart, end: monthEnd }).filter(day => 
    bookings.some(b => isSameDay(parseISO(b.date), day) && b.status === 'accepted')
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Calendar Overview</h3>
           <p className="text-slate-500 text-sm">{bookedDaysCount} days booked in {format(currentMonth, 'MMMM')}</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
          <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="font-semibold w-32 text-center select-none">{format(currentMonth, 'MMMM yyyy')}</span>
          <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-slate-50">
          {weekDays.map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr bg-slate-100 gap-[1px]">
          {calendarDays.map((day) => {
            const dayBookings = bookings.filter(b => isSameDay(parseISO(b.date), day));
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isTodayDate = isToday(day);

            return (
              <div key={day.toString()} className={`min-h-[120px] bg-white p-2 relative group hover:bg-slate-50 transition-colors ${!isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : ''}`}>
                <div className="flex justify-between items-start">
                   <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${isTodayDate ? 'bg-primary text-white' : ''}`}>{format(day, 'd')}</span>
                   {dayBookings.length > 0 && (
                     <Badge variant="outline" className="text-[10px] h-5 px-1 bg-slate-100 border-slate-200 text-slate-500">{dayBookings.length}</Badge>
                   )}
                </div>
                <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                  {dayBookings.map(booking => (
                    <div 
                      key={booking.id}
                      onClick={() => onSelectBooking(booking)}
                      className={`text-[10px] p-1.5 rounded border truncate cursor-pointer transition-all hover:scale-[1.02] ${
                        booking.status === 'accepted' ? 'bg-green-50 border-green-200 text-green-700' :
                        booking.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        booking.status === 'cancelled' ? 'bg-slate-100 border-slate-200 text-slate-400 line-through' : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                      title={`${booking.name} - ${booking.tourType}`}
                    >
                      <span className="font-bold mr-1">{format(parseISO(booking.date), 'HH:mm')}</span>
                      {booking.name.split(' ')[0]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export function AdminPanel(props: AdminDashboardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'accepted': return <Badge className="bg-green-500">Accepted</Badge>;
      case 'rejected': return <Badge className="bg-red-500">Rejected</Badge>;
      case 'cancelled': return <Badge className="bg-orange-500">Cancelled</Badge>;
      default: return <Badge className="bg-slate-500">Pending</Badge>;
    }
  };

  const getPostStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-500">Live</Badge>;
      case 'rejected': return <Badge className="bg-red-500">Rejected</Badge>;
      default: return <Badge className="bg-amber-500">Needs Review</Badge>;
    }
  };

  const getPaymentBadge = (status?: string) => {
    switch (status) {
      case 'paid': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check size={10} className="mr-1" /> Paid</Badge>;
      case 'unpaid': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><AlertCircle size={10} className="mr-1" /> Unpaid</Badge>;
      default: return <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Admin Dashboard</h2>
          <p className="text-slate-500 font-medium">Welcome back, Angela! Here's what's happening.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={props.onLoadDummyData}>
                <Plus size={16} /> Demo Data
            </Button>
            <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={props.onClearDummyData}>
                <Trash2 size={16} /> Clear Demo
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.location.reload()}><RefreshCw size={16} /></Button>
            <Button variant="destructive" className="gap-2" onClick={props.onLogout}><LogOut size={16} /> Logout</Button>
        </div>
      </div>

      <DashboardStats bookings={props.bookings} />

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-slate-200/50 p-1 rounded-xl h-12">
          <TabsTrigger value="calendar" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><LayoutDashboard className="w-4 h-4 mr-2" /> Calendar</TabsTrigger>
          <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><List className="w-4 h-4 mr-2" /> Bookings</TabsTrigger>
          <TabsTrigger value="memories" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><MessageSquare className="w-4 h-4 mr-2" /> Guest Memories</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><Camera className="w-4 h-4 mr-2" /> My Gallery</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><CreditCard className="w-4 h-4 mr-2" /> Payments</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"><FileText className="w-4 h-4 mr-2" /> Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => { setEditingBooking(null); setIsBookingModalOpen(true); }} className="gap-2 shadow-md">
                    <Plus size={16} /> Add Booking
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <BookingCalendar bookings={props.bookings} onSelectBooking={(b) => { setEditingBooking(b); setIsBookingModalOpen(true); }} />
            </div>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>All Bookings</CardTitle><CardDescription>Manage and respond to requests.</CardDescription></div>
              <Button onClick={() => { setEditingBooking(null); setIsBookingModalOpen(true); }} className="gap-2"><Plus size={16} /> Add Booking</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Date</TableHead><TableHead>Customer</TableHead><TableHead>Details</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {props.bookings.map((booking) => (
                        <TableRow key={booking.id} className="hover:bg-slate-50/50">
                          <TableCell className="align-top font-medium">
                            <div className="font-bold text-slate-700">{format(new Date(booking.created_at), 'MMM d')}</div>
                            <div className="text-xs text-slate-400">{format(new Date(booking.created_at), 'HH:mm')}</div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="font-bold text-slate-800">{booking.name}</div>
                            <div className="text-sm text-slate-500">{booking.email}</div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex items-center gap-1 text-primary font-medium"><CalendarIcon size={12}/> {format(new Date(booking.date), 'MMM d, yyyy')}</div>
                            <div className="text-xs text-slate-500 mt-1 capitalize">{booking.tourType} • {booking.guests} Guests</div>
                          </TableCell>
                          <TableCell className="align-top">{getStatusBadge(booking.status)}</TableCell>
                          <TableCell className="text-right align-top">
                            <div className="flex justify-end gap-1">
                                <Button size="sm" variant="ghost" onClick={() => { setEditingBooking(booking); setIsBookingModalOpen(true); }}><Edit className="h-4 w-4 text-slate-500" /></Button>
                                <Button size="sm" variant="ghost" onClick={() => { if(confirm('Delete?')) props.onDelete(booking.id); }}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
            <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>Payments</CardTitle><CardDescription>Track booking payments.</CardDescription></div>
              <Button onClick={() => { setEditingBooking(null); setIsBookingModalOpen(true); }} variant="outline" className="gap-2"><Plus size={16} /> New Transaction</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50"><TableRow><TableHead>Customer</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {props.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell><div className="font-bold">{booking.name}</div><div className="text-xs text-slate-500">{format(new Date(booking.date), 'MMM d')}</div></TableCell>
                        <TableCell><div className="font-bold">€{booking.amount || 0}</div></TableCell>
                        <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="ghost" onClick={() => { setEditingBooking(booking); setIsBookingModalOpen(true); }}>Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memories">
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>Guest Memories</CardTitle><CardDescription>Manage guest stories.</CardDescription></div>
              <Button onClick={() => { setEditingPost(null); setIsPostModalOpen(true); }} className="gap-2"><Plus size={16} /> Add Memory</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50"><TableRow><TableHead>Author</TableHead><TableHead>Content</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {props.posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                              <div className="font-bold">{post.author}</div>
                              <div className="text-xs text-slate-500">{post.date}</div>
                          </TableCell>
                          <TableCell><div className="text-sm italic line-clamp-1">"{post.content}"</div></TableCell>
                          <TableCell>{getPostStatusBadge(post.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                                <Button size="sm" variant="ghost" onClick={() => { setEditingPost(post); setIsPostModalOpen(true); }}><Edit className="h-4 w-4 text-slate-500" /></Button>
                                <Button size="sm" variant="ghost" onClick={() => { if(confirm('Delete?')) props.onDeletePost(post.id); }}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>My View of Hamburg & Beyond</CardTitle><CardDescription>Manage your personal gallery and stories.</CardDescription></div>
              <Button onClick={() => { setEditingGalleryItem(null); setIsGalleryModalOpen(true); }} className="gap-2"><Plus size={16} /> Add Photo</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {props.galleryItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button size="sm" variant="secondary" onClick={() => { setEditingGalleryItem(item); setIsGalleryModalOpen(true); }}><Edit size={16} /> Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => { if(confirm('Delete this photo?')) props.onDeleteGalleryItem(item.id); }}><Trash2 size={16} /> Delete</Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                            <p className="text-xs text-slate-300 mt-2">{format(new Date(item.date), 'MMM d, yyyy')}</p>
                        </div>
                    </div>
                ))}
                {props.galleryItems.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400 flex flex-col items-center">
                        <ImageIcon size={48} className="mb-4 opacity-20" />
                        <p>No photos in your gallery yet.</p>
                        <Button variant="outline" className="mt-4" onClick={() => { setEditingGalleryItem(null); setIsGalleryModalOpen(true); }}>Add your first photo</Button>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <YearlyReports bookings={props.bookings} posts={props.posts} />
        </TabsContent>
      </Tabs>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        booking={editingBooking} 
        onSave={props.onSaveBooking} 
      />
      <PostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
        post={editingPost} 
        onSave={props.onSavePost} 
      />
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        item={editingGalleryItem}
        onSave={props.onSaveGalleryItem}
      />
    </div>
  );
}

// Yearly Reports Component
function YearlyReports({ bookings, posts }: { bookings: Booking[], posts: BlogPost[] }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Filter bookings by year
  const yearBookings = bookings.filter(b => new Date(b.date).getFullYear() === selectedYear);
  
  // Calculate yearly statistics
  const totalRevenue = yearBookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? (b.amount || 0) : 0), 0);
  const totalBookings = yearBookings.length;
  const confirmedBookings = yearBookings.filter(b => b.status === 'accepted').length;
  const totalGuests = yearBookings.reduce((sum, b) => sum + (b.status === 'accepted' ? b.guests : 0), 0);
  const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  
  // Popular tour types
  const tourCounts: Record<string, number> = {};
  yearBookings.forEach(b => {
    const tour = b.tourType || 'unknown';
    tourCounts[tour] = (tourCounts[tour] || 0) + 1;
  });
  const popularTours = Object.entries(tourCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  
  // Monthly breakdown
  const monthlyData: Record<number, { bookings: number; revenue: number; guests: number }> = {};
  for (let i = 0; i < 12; i++) {
    monthlyData[i] = { bookings: 0, revenue: 0, guests: 0 };
  }
  yearBookings.forEach(b => {
    const month = new Date(b.date).getMonth();
    monthlyData[month].bookings++;
    monthlyData[month].revenue += b.paymentStatus === 'paid' ? (b.amount || 0) : 0;
    monthlyData[month].guests += b.status === 'accepted' ? b.guests : 0;
  });
  
  // Guest memories stats
  const yearPosts = posts.filter(p => new Date(p.date).getFullYear() === selectedYear);
  const approvedPosts = yearPosts.filter(p => p.status === 'approved').length;
  
  // CSV Download function
  const downloadCSV = () => {
    const csvHeaders = [
      'Booking ID', 'Customer Name', 'Email', 'Phone', 'Tour Date', 'Tour Type', 
      'Guests', 'Status', 'Payment Status', 'Amount (€)', 'Created At', 'Message'
    ];
    
    const csvRows = yearBookings.map(b => [
      b.id,
      b.name,
      b.email,
      b.phone,
      format(new Date(b.date), 'yyyy-MM-dd HH:mm'),
      b.tourType || '',
      b.guests,
      b.status,
      b.paymentStatus || 'pending',
      b.amount || 0,
      format(new Date(b.created_at), 'yyyy-MM-dd HH:mm'),
      `"${(b.message || '').replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hamburg-driverguide-${selectedYear}-bookings.csv`;
    link.click();
  };
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="space-y-6">
      {/* Header with Year Selector and Download */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Yearly Reports & Highlights</h3>
          <p className="text-slate-500">Comprehensive overview of your business performance</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border rounded-lg bg-white font-medium"
          >
            {[2026, 2025, 2024, 2023].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <Button onClick={downloadCSV} className="gap-2">
            <Download size={16} /> Download CSV
          </Button>
        </div>
      </div>
      
      {/* Yearly Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Revenue</p>
                <h3 className="text-3xl font-black mt-1">€{totalRevenue.toLocaleString()}</h3>
                <p className="text-orange-100 text-xs mt-2">Year {selectedYear}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Bookings</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{totalBookings}</h3>
                <p className="text-green-600 text-xs mt-2">{confirmedBookings} confirmed</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Guests</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{totalGuests}</h3>
                <p className="text-slate-400 text-xs mt-2">Happy travelers</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avg Booking Value</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">€{Math.round(avgBookingValue)}</h3>
                <p className="text-slate-400 text-xs mt-2">Per booking</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Popular Tours */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-600" />
            <CardTitle>Most Popular Tours</CardTitle>
          </div>
          <CardDescription>Top performing tour types in {selectedYear}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularTours.length > 0 ? popularTours.map(([tour, count], index) => (
              <div key={tour} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 capitalize">{tour.replace('-', ' ')}</p>
                    <p className="text-sm text-slate-500">{count} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                    {Math.round((count / totalBookings) * 100)}%
                  </Badge>
                </div>
              </div>
            )) : (
              <p className="text-slate-400 text-center py-8">No bookings for {selectedYear}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly Breakdown */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Bookings, revenue, and guests by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Guests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(monthlyData).map(([month, data]) => (
                  <TableRow key={month}>
                    <TableCell className="font-medium">{monthNames[Number(month)]}</TableCell>
                    <TableCell className="text-right">{data.bookings}</TableCell>
                    <TableCell className="text-right font-bold">€{data.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{data.guests}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-slate-100 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">{totalBookings}</TableCell>
                  <TableCell className="text-right">€{totalRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{totalGuests}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Guest Memories</CardTitle>
            <CardDescription>Stories shared by guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-black text-slate-900">{approvedPosts}</p>
                <p className="text-slate-500 mt-1">Approved memories</p>
              </div>
              <MessageSquare className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Financial overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Paid:</span>
                <span className="font-bold text-green-600">{yearBookings.filter(b => b.paymentStatus === 'paid').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Pending:</span>
                <span className="font-bold text-amber-600">{yearBookings.filter(b => b.paymentStatus === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Unpaid:</span>
                <span className="font-bold text-red-600">{yearBookings.filter(b => b.paymentStatus === 'unpaid').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
function BookingModal({ isOpen, onClose, booking, onSave }: { isOpen: boolean, onClose: () => void, booking: Booking | null, onSave: (b: Booking) => void }) {
    const [formData, setFormData] = useState<Partial<Booking>>({});

    useEffect(() => {
        if (booking) {
            setFormData(booking);
        } else {
            setFormData({
                name: '', email: '', phone: '', guests: 2, 
                status: 'pending', paymentStatus: 'pending', amount: 0, 
                date: new Date().toISOString(), tourType: 'city-tour', bookingType: 'leisure'
            });
        }
    }, [booking, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            id: booking?.id || Math.random().toString(36).substr(2, 9), 
            created_at: booking?.created_at || new Date().toISOString(),
            ...formData 
        } as Booking);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{booking ? 'Edit Booking' : 'New Booking'}</h2>
                        <button onClick={onClose}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full p-2 border rounded-lg" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                            <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full p-2 border rounded-lg" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium mb-1">Phone</label><input className="w-full p-2 border rounded-lg" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                            <div><label className="block text-sm font-medium mb-1">Guests</label><input type="number" className="w-full p-2 border rounded-lg" value={formData.guests || 1} onChange={e => setFormData({...formData, guests: Number(e.target.value)})} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    className="w-full p-2 border rounded-lg" 
                                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''} 
                                    onChange={e => setFormData({...formData, date: new Date(e.target.value).toISOString()})} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tour Type</label>
                                <select className="w-full p-2 border rounded-lg" value={formData.tourType || 'city-tour'} onChange={e => setFormData({...formData, tourType: e.target.value})}>
                                    <option value="city-tour">City Tour</option><option value="harbor-tour">Harbor Tour</option><option value="business">Business</option><option value="lights">Lights Tour</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl">
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select className="w-full p-2 border rounded-lg text-sm" value={formData.status || 'pending'} onChange={e => setFormData({...formData, status: e.target.value as BookingStatus})}>
                                    <option value="pending">Pending</option><option value="accepted">Accepted</option><option value="rejected">Rejected</option><option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment</label>
                                <select className="w-full p-2 border rounded-lg text-sm" value={formData.paymentStatus || 'pending'} onChange={e => setFormData({...formData, paymentStatus: e.target.value as any})}>
                                    <option value="pending">Pending</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option>
                                </select>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Amount (€)</label><input type="number" className="w-full p-2 border rounded-lg" value={formData.amount || 0} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} /></div>
                        </div>
                        <div><label className="block text-sm font-medium mb-1">Message</label><textarea className="w-full p-2 border rounded-lg" rows={3} value={formData.message || ''} onChange={e => setFormData({...formData, message: e.target.value})} /></div>
                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Booking</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function PostModal({ isOpen, onClose, post, onSave }: { isOpen: boolean, onClose: () => void, post: BlogPost | null, onSave: (p: BlogPost) => void }) {
    const [formData, setFormData] = useState<Partial<BlogPost>>({});

    useEffect(() => {
        if (post) {
            setFormData(post);
        } else {
            setFormData({ author: '', content: '', title: '', location: '', status: 'pending', likes: 0, date: new Date().toISOString().split('T')[0], imageUrl: 'https://images.unsplash.com/photo-1596791657688-66236b28b788?auto=format&fit=crop&q=80' });
        }
    }, [post, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: post?.id || Math.random().toString(36).substr(2, 9), ...formData } as BlogPost);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                     <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{post ? 'Edit Memory' : 'New Memory'}</h2>
                        <button onClick={onClose}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full p-2 border rounded-lg" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                        <div className="grid grid-cols-2 gap-4">
                             <div><label className="block text-sm font-medium mb-1">Author</label><input required className="w-full p-2 border rounded-lg" value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} /></div>
                             <div><label className="block text-sm font-medium mb-1">Location</label><input className="w-full p-2 border rounded-lg" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                        </div>
                        <div><label className="block text-sm font-medium mb-1">Image URL</label><input className="w-full p-2 border rounded-lg" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} /></div>
                        <div><label className="block text-sm font-medium mb-1">Status</label>
                            <select className="w-full p-2 border rounded-lg" value={formData.status || 'pending'} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                                <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium mb-1">Content</label><textarea required className="w-full p-2 border rounded-lg" rows={3} value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} /></div>
                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Memory</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function GalleryModal({ isOpen, onClose, item, onSave }: { isOpen: boolean, onClose: () => void, item: GalleryItem | null, onSave: (i: GalleryItem) => void }) {
    const [formData, setFormData] = useState<Partial<GalleryItem>>({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({ title: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1543832923-4466d5806e10?auto=format&fit=crop&q=80', date: new Date().toISOString() });
        }
    }, [item, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: item?.id || Math.random().toString(36).substr(2, 9), ...formData } as GalleryItem);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{item ? 'Edit Photo' : 'New Photo'}</h2>
                        <button onClick={onClose}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full p-2 border rounded-lg" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                        <div><label className="block text-sm font-medium mb-1">Photo URL</label><input required className="w-full p-2 border rounded-lg" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} /></div>
                        <div><label className="block text-sm font-medium mb-1">Description (Story)</label><textarea required className="w-full p-2 border rounded-lg" rows={5} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Tell the story behind this photo..." /></div>
                        <div><label className="block text-sm font-medium mb-1">Date</label><input type="date" className="w-full p-2 border rounded-lg" value={formData.date ? formData.date.slice(0, 10) : ''} onChange={e => setFormData({...formData, date: new Date(e.target.value).toISOString()})} /></div>
                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save to Gallery</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}