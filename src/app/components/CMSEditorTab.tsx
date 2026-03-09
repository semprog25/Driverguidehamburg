import React, { useState, useCallback, useRef } from 'react';
import { useCMS, DEFAULT_CMS, CMSServiceCard, CMSData } from '@/app/context/CMSContext';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Home, User, Map, Trees, Phone, AlignLeft, RotateCcw, Save,
  ChevronRight, Image as ImageIcon, CircleCheck, AlertCircle,
  Eye, EyeOff, Globe, Star, Car,
  Download, Upload, Copy, ClipboardCheck
} from 'lucide-react';

// ---------- Small helpers ----------

function SavedBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full animate-in fade-in duration-200">
      <CircleCheck size={11} /> Saved
    </span>
  );
}

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}

function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  const [imgOk, setImgOk] = useState(true);
  const [preview, setPreview] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <div className="flex items-center gap-2">
          {value && (
            <button
              type="button"
              className={`text-xs flex items-center gap-1 transition-colors ${copied ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={handleCopy}
              title="Copy URL to clipboard"
            >
              {copied ? <ClipboardCheck size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          )}
          <button
            type="button"
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            onClick={() => setPreview(p => !p)}
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />} {preview ? 'Hide' : 'Show'} preview
          </button>
        </div>
      </div>
      <div className="flex items-start gap-3">
        {preview && value && (
          <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
            {imgOk ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={() => setImgOk(false)}
                onLoad={() => setImgOk(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-1">
                <AlertCircle size={16} className="text-red-400" />
                <span className="text-[10px] text-red-400 text-center px-1">Bad URL</span>
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-1">
          <input
            type="url"
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            placeholder="https://..."
            value={value}
            onChange={e => { setImgOk(true); onChange(e.target.value); }}
            onKeyDown={e => e.stopPropagation()}
          />
          {hint && <p className="text-xs text-slate-400">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

function TextField({ label, value, onChange, multiline, placeholder, hint, rows = 3 }: TextFieldProps) {
  const baseClass = "w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white resize-y";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {multiline && (
          <span className={`text-xs tabular-nums ${value.length > 400 ? 'text-amber-500' : 'text-slate-400'}`}>
            {value.length} chars
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          className={baseClass}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />
      ) : (
        <input
          type="text"
          className={baseClass}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />
      )}
      {hint && <p className="text-xs text-slate-400 italic">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  );
}

// ---------- Section Editors ----------

function HomeEditor() {
  const { cms, updateSection } = useCMS();
  const h = cms.home;
  const upd = (k: keyof typeof h, v: string) => updateSection('home', { [k]: v });
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };
  const set = (k: keyof typeof h) => (v: string) => { upd(k, v); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">🏠 Home Page</h2>
        <SavedBadge show={saved} />
      </div>

      <SectionCard title="Angela's Photo (Main Mascot)">
        <ImageField label="Angela Image URL" value={h.angelaImageUrl} onChange={set('angelaImageUrl')} hint="The main Angela character on the homepage" />
      </SectionCard>

      <SectionCard title="Services Page Header Image">
        <ImageField label="Header Background Image" value={h.headerBgImageUrl} onChange={set('headerBgImageUrl')} hint="Angela with the van on the Services page" />
      </SectionCard>

      <SectionCard title="Speech Bubble">
        <TextField label="Title (e.g. Moin! 👋)" value={h.speechBubbleTitle} onChange={set('speechBubbleTitle')} placeholder="Moin! 👋" />
        <TextField label="Subtitle" value={h.speechBubbleSubtitle} onChange={set('speechBubbleSubtitle')} placeholder="Ready to explore Hamburg?" />
      </SectionCard>

      <SectionCard title="Stats Bar">
        <div className="grid grid-cols-3 gap-3">
          <TextField label="Years Value" value={h.statsYearsValue} onChange={set('statsYearsValue')} placeholder="20+" />
          <TextField label="Guests Value" value={h.statsGuestsValue} onChange={set('statsGuestsValue')} placeholder="10k+" />
          <TextField label="Rating Value" value={h.statsRatingValue} onChange={set('statsRatingValue')} placeholder="5.0" />
        </div>
      </SectionCard>

      <SectionCard title="Heading Text (leave blank to use translations)">
        <TextField label="Greeting" value={h.greeting} onChange={set('greeting')} placeholder="Moin & Welcome!" hint="Leave empty to use translated version" />
        <TextField label="Role / Tagline" value={h.role} onChange={set('role')} placeholder="Your host & Driver-Guide for 20+ years." hint="Leave empty to use translated version" />
        <TextField label="Introduction Paragraph" value={h.intro} onChange={set('intro')} multiline rows={3} placeholder="Whether Hamburg highlights, hidden gems..." hint="Leave empty to use translated version" />
        <TextField label="Vehicle Paragraph" value={h.vehicle} onChange={set('vehicle')} multiline rows={2} placeholder="Travelling in Hyundai Staria Prime..." hint="Leave empty to use translated version" />
        <TextField label="Philosophy Quote" value={h.philosophy} onChange={set('philosophy')} placeholder="As a photographer & architecture fan..." hint="Leave empty to use translated version" />
        <TextField label="Closing Line" value={h.closing} onChange={set('closing')} placeholder="Be my guest – I'll make your time here an experience." hint="Leave empty to use translated version" />
      </SectionCard>

      <SectionCard title="CTA Button Labels (leave blank to use translations)">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Primary Button" value={h.ctaDriveText} onChange={set('ctaDriveText')} placeholder="Let's go!" />
          <TextField label="Secondary Button" value={h.ctaMemoriesText} onChange={set('ctaMemoriesText')} placeholder="Guest Book" />
        </div>
      </SectionCard>
    </div>
  );
}

function AboutEditor() {
  const { cms, updateSection, resetSection } = useCMS();
  const a = cms.about;
  const upd = (k: keyof typeof a, v: string) => updateSection('about', { [k]: v });
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };
  const set = (k: keyof typeof a) => (v: string) => { upd(k, v); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">👤 About Me</h2>
        <div className="flex items-center gap-2">
          <SavedBadge show={saved} />
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => resetSection('about')}>
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
      </div>

      <SectionCard title="Profile Photo">
        <ImageField label="Profile Image URL" value={a.profileImageUrl} onChange={set('profileImageUrl')} />
      </SectionCard>

      <SectionCard title="Text Content (leave blank to use translations)">
        <TextField label="Section Title" value={a.title} onChange={set('title')} placeholder="Meet Your Driver Guide 👋" />
        <TextField label="Subtitle" value={a.subtitle} onChange={set('subtitle')} placeholder="Licensed Hamburg Guide & Personal Chauffeur" />
        <TextField label="Bio Text" value={a.bio} onChange={set('bio')} multiline rows={4} placeholder="I am Angela Scheefeld, your personal guide..." />
        <TextField label="Badge Text" value={a.badgeText} onChange={set('badgeText')} placeholder="✨ Your personal guide ✨" />
        <TextField label="Gallery Section Title" value={a.galleryTitle} onChange={set('galleryTitle')} placeholder="🏰 Discover Hamburg's Beauty! 🌊" />
      </SectionCard>

      <SectionCard title="Gallery Images (3 photos below bio)">
        <ImageField label="Gallery Photo 1" value={a.galleryImage1} onChange={set('galleryImage1')} />
        <ImageField label="Gallery Photo 2" value={a.galleryImage2} onChange={set('galleryImage2')} />
        <ImageField label="Gallery Photo 3" value={a.galleryImage3} onChange={set('galleryImage3')} />
      </SectionCard>
    </div>
  );
}

const SERVICE_LABELS: Record<string, string> = {
  city: '🏙️ Classic City Tour',
  harbor: '⚓ Harbor & Speicherstadt',
  business: '💼 Business & VIP',
  lights: '🌙 Lights Tour',
  countryside: '🌿 Altes Land Countryside',
  christmas: '☕ Christmas Markets',
};

function ToursEditor() {
  const { cms, updateService, resetSection } = useCMS();
  const [activeId, setActiveId] = useState('city');
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };

  const active = cms.services.find(s => s.id === activeId)!;
  const set = (k: keyof CMSServiceCard) => (v: string) => { updateService(activeId, { [k]: v }); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">🗺️ Hamburg Tours</h2>
        <div className="flex items-center gap-2">
          <SavedBadge show={saved} />
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => resetSection('services')}>
            <RotateCcw size={11} /> Reset all
          </Button>
        </div>
      </div>

      {/* Tour selector pills */}
      <div className="flex flex-wrap gap-2">
        {cms.services.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              activeId === s.id
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300'
            }`}
          >
            {SERVICE_LABELS[s.id] || s.id}
          </button>
        ))}
      </div>

      <SectionCard title={`Editing: ${SERVICE_LABELS[activeId] || activeId}`}>
        <ImageField
          label="Main Tour Photo"
          value={active.mainImage}
          onChange={set('mainImage')}
          hint="The card cover photo for this tour"
        />
        <TextField
          label="Title Override"
          value={active.titleOverride}
          onChange={set('titleOverride')}
          placeholder="Leave blank to use translation"
          hint="Leave empty to use the translated tour name"
        />
        <TextField
          label="Description Override"
          value={active.descOverride}
          onChange={set('descOverride')}
          multiline rows={3}
          placeholder="Leave blank to use translation"
          hint="Leave empty to use the translated description"
        />
        <TextField
          label="Duration Override"
          value={active.durationOverride}
          onChange={set('durationOverride')}
          placeholder="e.g. 3-4 Hours"
          hint="Leave empty to use the default duration"
        />
      </SectionCard>
    </div>
  );
}

function OutskirtsEditor() {
  const { cms, updateSection, resetSection } = useCMS();
  const o = cms.outskirts;
  const upd = (k: keyof typeof o, v: string) => updateSection('outskirts', { [k]: v });
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };
  const set = (k: keyof typeof o) => (v: string) => { upd(k, v); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">🌿 Outskirts Tours Page</h2>
        <div className="flex items-center gap-2">
          <SavedBadge show={saved} />
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => resetSection('outskirts')}>
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
      </div>

      <SectionCard title="Top Gallery (4 photos across the top)">
        <div className="grid grid-cols-2 gap-4">
          <ImageField label="Top Photo 1 (Stade)" value={o.topImage1} onChange={set('topImage1')} />
          <ImageField label="Top Photo 2 (Lübeck)" value={o.topImage2} onChange={set('topImage2')} />
          <ImageField label="Top Photo 3 (Lüneburg)" value={o.topImage3} onChange={set('topImage3')} />
          <ImageField label="Top Photo 4 (Altes Land)" value={o.topImage4} onChange={set('topImage4')} />
        </div>
      </SectionCard>

      <SectionCard title="Bottom Gallery (4 photos)">
        <div className="grid grid-cols-2 gap-4">
          <ImageField label="Bottom Photo 1" value={o.bottomImage1} onChange={set('bottomImage1')} />
          <ImageField label="Bottom Photo 2" value={o.bottomImage2} onChange={set('bottomImage2')} />
          <ImageField label="Bottom Photo 3" value={o.bottomImage3} onChange={set('bottomImage3')} />
          <ImageField label="Bottom Photo 4" value={o.bottomImage4} onChange={set('bottomImage4')} />
        </div>
      </SectionCard>

      <SectionCard title="Page Text (leave blank to use translations)">
        <TextField label="Lübeck Section Title" value={o.luebeckTitle} onChange={set('luebeckTitle')} placeholder="Lübeck – The City of Seven Spires" />
        <TextField label="Lübeck Text" value={o.luebeckText} onChange={set('luebeckText')} multiline rows={4} placeholder="Description of Lübeck tour..." />
        <TextField label="Altes Land Section Title" value={o.altesLandTitle} onChange={set('altesLandTitle')} placeholder="Altes Land" />
        <TextField label="Altes Land Text" value={o.altesLandText} onChange={set('altesLandText')} multiline rows={4} placeholder="Description of Altes Land..." />
        <TextField label="Coast Section Title" value={o.coastTitle} onChange={set('coastTitle')} placeholder="Baltic Sea & Coast" />
        <TextField label="Coast Text" value={o.coastText} onChange={set('coastText')} multiline rows={4} placeholder="Description of coastal tours..." />
        <TextField label="Outskirts Tours Section Title" value={o.outskirtsTitle} onChange={set('outskirtsTitle')} placeholder="Day Trips & Outskirts Tours" />
        <TextField label="Outskirts Tours Subtitle" value={o.outskirtsSubtitle} onChange={set('outskirtsSubtitle')} placeholder="Explore beyond Hamburg's city limits" />
      </SectionCard>
    </div>
  );
}

function ContactEditor() {
  const { cms, updateSection, resetSection } = useCMS();
  const c = cms.contact;
  const upd = (k: keyof typeof c, v: string) => updateSection('contact', { [k]: v });
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };
  const set = (k: keyof typeof c) => (v: string) => { upd(k, v); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">📞 Contact & Booking</h2>
        <div className="flex items-center gap-2">
          <SavedBadge show={saved} />
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => resetSection('contact')}>
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
      </div>

      <SectionCard title="Logo">
        <ImageField label="DriverGuide Logo URL" value={c.logoUrl} onChange={set('logoUrl')} hint="Shown above the booking form" />
      </SectionCard>

      <SectionCard title="Section Headings (leave blank to use translations)">
        <TextField label="Section Title" value={c.title} onChange={set('title')} placeholder="Book Your Hamburg Experience" />
        <TextField label="Section Subtitle" value={c.subtitle} onChange={set('subtitle')} placeholder="Choose a date and fill in your details" />
      </SectionCard>

      <SectionCard title="Contact Details">
        <TextField label="Email Address" value={c.email} onChange={set('email')} placeholder="los@driverguide-hamburg.de" />
        <TextField label="Phone Number" value={c.phone} onChange={set('phone')} placeholder="+4915786802520" />
      </SectionCard>
    </div>
  );
}

function FooterEditor() {
  const { cms, updateSection, resetSection } = useCMS();
  const f = cms.footer;
  const upd = (k: keyof typeof f, v: string) => updateSection('footer', { [k]: v });
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = () => {
    setSaved(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2000);
  };
  const set = (k: keyof typeof f) => (v: string) => { upd(k, v); touch(); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">🦶 Footer</h2>
        <div className="flex items-center gap-2">
          <SavedBadge show={saved} />
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => resetSection('footer')}>
            <RotateCcw size={11} /> Reset
          </Button>
        </div>
      </div>

      <SectionCard title="Brand">
        <TextField label="Company Name" value={f.companyName} onChange={set('companyName')} placeholder="Hamburg DriverGuide" />
        <TextField label="Description" value={f.description} onChange={set('description')} multiline rows={3} placeholder="Professional chauffeur and guide services..." />
      </SectionCard>

      <SectionCard title="Contact Column">
        <TextField label="Name" value={f.contactName} onChange={set('contactName')} placeholder="Angela Scheefeld" />
        <TextField label="Address" value={f.address} onChange={set('address')} placeholder="J.-D.-Möller-Str. 46, 22880 Wedel" />
        <TextField label="Email" value={f.email} onChange={set('email')} placeholder="los@driverguide-hamburg.de" />
        <TextField label="Phone" value={f.phone} onChange={set('phone')} placeholder="+4915786802520" />
      </SectionCard>
    </div>
  );
}

// ---------- Main Component ----------

type Section = 'home' | 'about' | 'tours' | 'outskirts' | 'contact' | 'footer';

const SECTIONS: { id: Section; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'home', label: 'Home Page', icon: <Home size={16} />, description: 'Angela image, speech bubble, stats, text' },
  { id: 'about', label: 'About Me', icon: <User size={16} />, description: 'Profile photo, bio, gallery' },
  { id: 'tours', label: 'Hamburg Tours', icon: <Map size={16} />, description: '6 tour cards: photos, text, duration' },
  { id: 'outskirts', label: 'Outskirts Tours', icon: <Trees size={16} />, description: 'Images, Lübeck, Altes Land, Coast' },
  { id: 'contact', label: 'Contact & Booking', icon: <Phone size={16} />, description: 'Logo, headings, email, phone' },
  { id: 'footer', label: 'Footer', icon: <AlignLeft size={16} />, description: 'Brand, address, links' },
];

export function CMSEditorTab() {
  const { resetAll, cms, importCMS } = useCMS();
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = JSON.stringify(cms, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `driverguide-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as CMSData;
        if (!data.home || !data.about || !data.services) {
          setImportError('Invalid backup file — missing required sections.');
          setTimeout(() => setImportError(''), 4000);
          return;
        }
        importCMS(data);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch {
        setImportError('Could not read file. Make sure it\'s a valid JSON backup.');
        setTimeout(() => setImportError(''), 4000);
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be re-imported if needed
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight">✏️ Edit Website</h2>
            <p className="text-orange-100 mt-1 text-sm">All changes save instantly and update the live site in real time.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-white/20 text-white border-white/30 gap-1">
              <Globe size={12} /> Live Sync
            </Badge>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 gap-1.5"
              onClick={handleExport}
              title="Download all CMS content as a JSON backup file"
            >
              <Download size={13} /> Backup
            </Button>

            {/* Import */}
            <Button
              variant="outline"
              size="sm"
              className={`border-white/30 text-white hover:bg-white/30 gap-1.5 ${importSuccess ? 'bg-green-500/40' : 'bg-white/20'}`}
              onClick={() => importFileRef.current?.click()}
              title="Restore CMS content from a JSON backup file"
            >
              {importSuccess ? <CircleCheck size={13} /> : <Upload size={13} />}
              {importSuccess ? 'Restored!' : 'Restore'}
            </Button>
            <input
              ref={importFileRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImportFile}
            />

            {showResetConfirm ? (
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                <span className="text-xs font-bold">Reset EVERYTHING?</span>
                <Button size="sm" variant="destructive" className="h-6 text-xs" onClick={() => { resetAll(); setShowResetConfirm(false); }}>Yes, reset all</Button>
                <Button size="sm" variant="outline" className="h-6 text-xs bg-white/20 border-white/30 text-white hover:bg-white/30" onClick={() => setShowResetConfirm(false)}>Cancel</Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30 gap-1" onClick={() => setShowResetConfirm(true)}>
                <RotateCcw size={13} /> Reset All
              </Button>
            )}
          </div>
        </div>

        {/* Import error / success banners */}
        {importError && (
          <div className="mt-3 flex items-center gap-2 bg-red-500/30 border border-red-300/40 rounded-lg px-3 py-2 text-sm">
            <AlertCircle size={14} /> {importError}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="lg:w-60 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden sticky top-4">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Page Sections</p>
            </div>
            <nav className="divide-y divide-slate-50">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeSection === s.id
                      ? 'bg-orange-50 border-l-4 border-orange-500 text-orange-700'
                      : 'hover:bg-slate-50 text-slate-700 border-l-4 border-transparent'
                  }`}
                >
                  <span className={activeSection === s.id ? 'text-orange-500' : 'text-slate-400'}>{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{s.label}</p>
                    <p className="text-xs text-slate-400 truncate">{s.description}</p>
                  </div>
                  {activeSection === s.id && <ChevronRight size={14} className="ml-auto text-orange-400 flex-shrink-0" />}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 min-h-[600px]">
            {activeSection === 'home' && <HomeEditor />}
            {activeSection === 'about' && <AboutEditor />}
            {activeSection === 'tours' && <ToursEditor />}
            {activeSection === 'outskirts' && <OutskirtsEditor />}
            {activeSection === 'contact' && <ContactEditor />}
            {activeSection === 'footer' && <FooterEditor />}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <CircleCheck size={12} className="text-green-500" />
            Changes are auto-saved to your browser's local storage and apply instantly to the live page.
          </div>
        </div>
      </div>
    </div>
  );
}