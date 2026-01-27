import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar as CalendarIcon, Clock, Users, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function BookingSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime || !formData.service) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Booking request submitted! We'll contact you soon.", {
      description: `Your tour on ${date.toLocaleDateString()} at ${selectedTime}`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "1",
      service: "",
      message: "",
    });
    setSelectedTime("");
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Book Your Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose your date and let's plan the perfect Hamburg adventure
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-semibold text-slate-900">Select Date</h3>
                    </div>
                    <div className="flex justify-center bg-white rounded-lg p-4 border-2 border-blue-100">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </div>

                    {/* Time Slots */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <h3 className="text-xl font-semibold text-slate-900">Select Time</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`${
                              selectedTime === time
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "hover:border-blue-300"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-semibold text-slate-900">Your Details</h3>
                    </div>

                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+49 123 456 789"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">Service Type *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="city-tour">City Tour</SelectItem>
                          <SelectItem value="airport">Airport Transfer</SelectItem>
                          <SelectItem value="business">Business Travel</SelectItem>
                          <SelectItem value="group">Group Tour</SelectItem>
                          <SelectItem value="event">Special Event</SelectItem>
                          <SelectItem value="photo">Photo Tour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select
                        value={formData.guests}
                        onValueChange={(value) => setFormData({ ...formData, guests: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Special Requests</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any special requirements or preferences?"
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Request Booking
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
