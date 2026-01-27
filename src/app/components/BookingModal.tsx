import { useState, useEffect } from "react";
import { Language } from "../App";
import { translations } from "../translations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  selectedTour?: string;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function BookingModal({ language, isOpen, onClose, selectedTour }: BookingModalProps) {
  const t = translations[language];
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    tourType: selectedTour || "",
    message: "",
  });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update tour type when selectedTour prop changes
  useEffect(() => {
    if (selectedTour) {
      setFormData(prev => ({ ...prev, tourType: selectedTour }));
    }
  }, [selectedTour]);

  // Reset step when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

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
    setCurrentStep(1);
    onClose();
  };

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.email.trim().length > 0 && formData.email.includes("@");
      case 3:
        return formData.phone.trim().length > 0;
      case 4:
        return formData.tourType !== "";
      case 5:
        return date !== undefined && selectedTime !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceedFromStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    } else {
      toast.error(
        language === "de"
          ? "Bitte füllen Sie dieses Feld aus"
          : "Please fill in this field"
      );
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getGreeting = () => {
    if (!formData.name) return "";
    
    const firstName = formData.name.split(" ")[0];
    const greetings = language === "de" 
      ? [
          `Schön Sie kennenzulernen, ${firstName}! 👋`,
          `Wunderbar, ${firstName}!`,
          `Hallo ${firstName}! Freut mich sehr!`,
        ]
      : [
          `Nice to meet you, ${firstName}! 👋`,
          `Wonderful, ${firstName}!`,
          `Hello ${firstName}! Great to have you!`,
        ];
    
    return greetings[0];
  };

  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Mobile multi-step form
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {language === "de" ? "Tour buchen" : "Book a Tour"}
            </DialogTitle>
            <DialogDescription>
              {language === "de" 
                ? `Schritt ${currentStep} von ${totalSteps}` 
                : `Step ${currentStep} of ${totalSteps}`}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-semibold text-black">
                    {language === "de" ? "Wie dürfen wir Sie nennen?" : "What's your name?"}
                  </h3>
                </div>
                <div>
                  <Label htmlFor="name" className="text-lg">
                    {language === "de" ? "Ihr Name" : "Your Name"} *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === "de" ? "Max Mustermann" : "John Doe"}
                    className="mt-2 text-lg p-6"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Step 2: Email with Greeting */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="text-2xl font-semibold text-black mb-2">
                    {getGreeting()}
                  </h3>
                  <p className="text-gray-600">
                    {language === "de" 
                      ? "Wie können wir Sie erreichen?" 
                      : "How can we reach you?"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg">{t.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="max@beispiel.de"
                    className="mt-2 text-lg p-6"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Step 3: Phone */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="text-xl font-semibold text-black">
                    {language === "de" 
                      ? "Ihre Telefonnummer" 
                      : "Your phone number"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === "de"
                      ? "Für Rückfragen und Bestätigung"
                      : "For inquiries and confirmation"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-lg">{t.phone} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 123 456 789"
                    className="mt-2 text-lg p-6"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Step 4: Tour Selection */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">🚗</div>
                  <h3 className="text-xl font-semibold text-black">
                    {language === "de" 
                      ? "Welche Tour interessiert Sie?" 
                      : "Which tour interests you?"}
                  </h3>
                </div>
                <div>
                  <Label htmlFor="tourType" className="text-lg">{t.tourType} *</Label>
                  <Select
                    value={formData.tourType}
                    onValueChange={(value) => setFormData({ ...formData, tourType: value })}
                  >
                    <SelectTrigger className="mt-2 text-lg p-6">
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
                  <Label htmlFor="guests" className="text-lg">{t.guests}</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData({ ...formData, guests: value })}
                  >
                    <SelectTrigger className="mt-2 text-lg p-6">
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
              </div>
            )}

            {/* Step 5: Date & Time */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="text-xl font-semibold text-black">
                    {language === "de" 
                      ? "Wann möchten Sie die Tour machen?" 
                      : "When would you like to take the tour?"}
                  </h3>
                </div>
                <div>
                  <Label className="text-lg">{t.selectDate}</Label>
                  <div className="flex justify-center bg-slate-50 rounded-lg p-4 mt-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-lg">{t.selectTime}</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`${
                          selectedTime === time
                            ? "bg-black hover:bg-gray-800 text-white"
                            : "hover:border-black"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Final Details */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-slide-in-bottom">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="text-xl font-semibold text-black">
                    {language === "de" 
                      ? "Noch etwas, das wir wissen sollten?" 
                      : "Anything else we should know?"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === "de"
                      ? "(Optional)"
                      : "(Optional)"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="message" className="text-lg">{t.specialRequests}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "de" ? "Besondere Wünsche?" : "Any special requests?"}
                    className="mt-2 min-h-[120px] text-lg p-4"
                    autoFocus
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-black mb-2">
                    {language === "de" ? "Ihre Buchung:" : "Your booking:"}
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>👤 {formData.name}</p>
                    <p>📧 {formData.email}</p>
                    <p>📱 {formData.phone}</p>
                    <p>📅 {date?.toLocaleDateString()} {language === "de" ? "um" : "at"} {selectedTime}</p>
                    <p>👥 {formData.guests} {formData.guests === "1" ? (language === "de" ? "Person" : "Guest") : (language === "de" ? "Personen" : "Guests")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 py-6 text-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {language === "de" ? "Zurück" : "Back"}
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-black hover:bg-gray-800 py-6 text-lg"
                  disabled={!canProceedFromStep(currentStep)}
                >
                  {language === "de" ? "Weiter" : "Next"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-lg"
                >
                  {language === "de" ? "Anfrage senden" : "Send Inquiry"} ✨
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop version - original full form
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            {language === "de" ? "Tour buchen" : "Book a Tour"}
          </DialogTitle>
          <DialogDescription>
            {language === "de" 
              ? "Wählen Sie Ihr Wunschdatum, Uhrzeit und füllen Sie Ihre Kontaktdaten aus." 
              : "Select your preferred date, time and fill in your contact details."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {/* Calendar Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {t.selectDate}
              </h3>
              <div className="flex justify-center bg-slate-50 rounded-lg p-4">
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
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {t.selectTime}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${
                        selectedTime === time
                          ? "bg-black hover:bg-gray-800 text-white"
                          : "hover:border-black"
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
                  placeholder={language === "de" ? "Besondere Wünsche?" : "Any special requests?"}
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.send}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}