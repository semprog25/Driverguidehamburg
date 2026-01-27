import { useState } from "react";
import { Language } from "../App";
import { translations } from "../translations";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar as CalendarIcon, Clock, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ContactSectionProps {
  language: Language;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function ContactSection({ language }: ContactSectionProps) {
  const t = translations[language];
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    tourType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime || !formData.tourType) {
      toast.error(
        language === "de" 
          ? "Bitte füllen Sie alle erforderlichen Felder aus" 
          : "Please fill in all required fields"
      );
      return;
    }

    toast.success(
      language === "de"
        ? "Anfrage gesendet! Wir werden uns bald bei Ihnen melden."
        : "Inquiry sent! We'll contact you soon.",
      {
        description: `${language === "de" ? "Ihre Tour am" : "Your tour on"} ${date.toLocaleDateString()} ${language === "de" ? "um" : "at"} ${selectedTime}`,
      }
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "1",
      tourType: "",
      message: "",
    });
    setSelectedTime("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
             <ImageWithFallback 
                src="https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/driverguidelogo.png" 
                alt="DriverGuide Logo" 
                className="h-24 w-auto md:h-32 object-contain"
             />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t.contactTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t.contactSubtitle}
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
                      <h3 className="text-xl font-semibold text-slate-900">{t.selectDate}</h3>
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
                        <h3 className="text-xl font-semibold text-slate-900">{t.selectTime}</h3>
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
                      <h3 className="text-xl font-semibold text-slate-900">{t.yourDetails}</h3>
                    </div>

                    <div>
                      <Label htmlFor="name">{t.name} *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === "de" ? "Max Mustermann" : "John Doe"}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">{t.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="max@beispiel.de"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">{t.phone} *</Label>
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
                      <Label htmlFor="tourType">{t.tourType} *</Label>
                      <Select
                        value={formData.tourType}
                        onValueChange={(value) => setFormData({ ...formData, tourType: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={language === "de" ? "Tour auswählen" : "Choose a tour"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="city-tour">{language === "de" ? "Stadtrundfahrt" : "City Tour"}</SelectItem>
                          <SelectItem value="harbor">{language === "de" ? "Hafentour" : "Harbor Tour"}</SelectItem>
                          <SelectItem value="reeperbahn">Reeperbahn Tour</SelectItem>
                          <SelectItem value="elbe">{language === "de" ? "Elbe & Elbchaussee" : "Elbe & Elbchaussee"}</SelectItem>
                          <SelectItem value="speicherstadt">Speicherstadt</SelectItem>
                          <SelectItem value="luebeck">Lübeck</SelectItem>
                          <SelectItem value="altes-land">Altes Land</SelectItem>
                          <SelectItem value="custom">{language === "de" ? "Individuelle Tour" : "Custom Tour"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="guests">{t.guests}</Label>
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
                              {num} {num === 1 ? (language === "de" ? "Person" : "Guest") : (language === "de" ? "Personen" : "Guests")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">{t.specialRequests}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={language === "de" ? "Besondere Wünsche oder Anforderungen?" : "Any special requirements or preferences?"}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {t.send}
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
