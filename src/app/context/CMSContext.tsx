import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// @refresh reset

export interface CMSServiceCard {
  id: string;
  titleOverride: string;
  descOverride: string;
  durationOverride: string;
  mainImage: string;
}

export interface CMSData {
  home: {
    angelaImageUrl: string;
    headerBgImageUrl: string;
    speechBubbleTitle: string;
    speechBubbleSubtitle: string;
    statsYearsValue: string;
    statsGuestsValue: string;
    statsRatingValue: string;
    greeting: string;
    role: string;
    intro: string;
    vehicle: string;
    philosophy: string;
    closing: string;
    ctaDriveText: string;
    ctaMemoriesText: string;
  };
  about: {
    profileImageUrl: string;
    title: string;
    subtitle: string;
    bio: string;
    badgeText: string;
    galleryImage1: string;
    galleryImage2: string;
    galleryImage3: string;
    galleryTitle: string;
  };
  services: CMSServiceCard[];
  outskirts: {
    topImage1: string;
    topImage2: string;
    topImage3: string;
    topImage4: string;
    bottomImage1: string;
    bottomImage2: string;
    bottomImage3: string;
    bottomImage4: string;
    mainTitle: string;
    luebeckTitle: string;
    luebeckText: string;
    altesLandTitle: string;
    altesLandText: string;
    coastTitle: string;
    coastText: string;
    outskirtsTitle: string;
    outskirtsSubtitle: string;
  };
  contact: {
    logoUrl: string;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
  };
  footer: {
    companyName: string;
    description: string;
    contactName: string;
    address: string;
    email: string;
    phone: string;
  };
}

export const DEFAULT_CMS: CMSData = {
  home: {
    angelaImageUrl: 'https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Meet%20Angela,%20your%20friendly%20businesswoman!.png',
    headerBgImageUrl: 'https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/Cheerful%20woman%20with%20Hyundai%20minivan%20mascot.png',
    speechBubbleTitle: 'Moin! 👋',
    speechBubbleSubtitle: 'Ready to explore Hamburg?',
    statsYearsValue: '20+',
    statsGuestsValue: '10k+',
    statsRatingValue: '5.0',
    greeting: '',
    role: '',
    intro: '',
    vehicle: '',
    philosophy: '',
    closing: '',
    ctaDriveText: '',
    ctaMemoriesText: '',
  },
  about: {
    profileImageUrl: 'https://images.unsplash.com/photo-1738776755796-8f02061f76c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: '',
    subtitle: '',
    bio: '',
    badgeText: '✨ Your personal guide ✨',
    galleryImage1: 'https://images.unsplash.com/photo-1764725237655-2553f9cceccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    galleryImage2: 'https://images.unsplash.com/photo-1766231593852-fce6cdcb8cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    galleryImage3: 'https://images.unsplash.com/photo-1581183948201-ddbae95a56a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    galleryTitle: "🏰 Discover Hamburg's Beauty! 🌊",
  },
  services: [
    { id: 'city', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1690835960993-270ae9df2028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    { id: 'harbor', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1650908282348-3f1178d4e031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    { id: 'business', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1716370287223-0a162e265ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    { id: 'lights', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1705311116604-cd70315044cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    { id: 'countryside', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1763465447001-583e01ff00a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    { id: 'christmas', titleOverride: '', descOverride: '', durationOverride: '', mainImage: 'https://images.unsplash.com/photo-1612194929184-54f8a99e237a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  ],
  outskirts: {
    topImage1: 'https://images.unsplash.com/photo-1569686446978-833db931219b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topImage2: 'https://images.unsplash.com/photo-1577053344129-413bc044ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topImage3: 'https://images.unsplash.com/photo-1674321517218-51c29d2f3bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    topImage4: 'https://images.unsplash.com/photo-1673594278297-c26aaf8d603c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    bottomImage1: 'https://images.unsplash.com/photo-1577053344129-413bc044ad35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    bottomImage2: 'https://images.unsplash.com/photo-1653853611414-19faebe23cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    bottomImage3: 'https://images.unsplash.com/photo-1728594120312-a2e7b714f76c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    bottomImage4: 'https://images.unsplash.com/photo-1671190364908-b5f937f78835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    mainTitle: '',
    luebeckTitle: '',
    luebeckText: '',
    altesLandTitle: '',
    altesLandText: '',
    coastTitle: '',
    coastText: '',
    outskirtsTitle: '',
    outskirtsSubtitle: '',
  },
  contact: {
    logoUrl: 'https://qoqbdiixztolvtcjdnle.supabase.co/storage/v1/object/public/Angela/driverguidelogo.png',
    title: '',
    subtitle: '',
    email: 'los@driverguide-hamburg.de',
    phone: '+4915786802520',
  },
  footer: {
    companyName: 'Hamburg DriverGuide',
    description: 'Professional chauffeur and guide services in Hamburg. Experience the city with a local expert.',
    contactName: 'Angela Scheefeld',
    address: 'J.-D.-Möller-Str. 46, 22880 Wedel',
    email: 'los@driverguide-hamburg.de',
    phone: '+4915786802520',
  },
};

interface CMSContextValue {
  cms: CMSData;
  updateCMS: (updater: (prev: CMSData) => CMSData) => void;
  updateSection: <K extends keyof CMSData>(section: K, values: Partial<CMSData[K]>) => void;
  updateService: (id: string, values: Partial<CMSServiceCard>) => void;
  resetSection: (section: keyof CMSData) => void;
  resetAll: () => void;
  importCMS: (data: CMSData) => void;
}

const CMSContext = createContext<CMSContextValue | null>(null);

const CMS_STORAGE_KEY = 'driverguide_cms_v1';

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const val = source[key];
    if (val !== undefined) {
      (result as any)[key] = val;
    }
  }
  return result;
}

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCMS] = useState<CMSData>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CMSData;
        // Deep merge with defaults to handle new fields added after initial save
        return {
          home: deepMerge(DEFAULT_CMS.home, parsed.home || {}),
          about: deepMerge(DEFAULT_CMS.about, parsed.about || {}),
          services: DEFAULT_CMS.services.map(def => {
            const saved = (parsed.services || []).find((s: CMSServiceCard) => s.id === def.id);
            return saved ? { ...def, ...saved } : def;
          }),
          outskirts: deepMerge(DEFAULT_CMS.outskirts, parsed.outskirts || {}),
          contact: deepMerge(DEFAULT_CMS.contact, parsed.contact || {}),
          footer: deepMerge(DEFAULT_CMS.footer, parsed.footer || {}),
        };
      }
    } catch {}
    return DEFAULT_CMS;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cms));
    } catch {}
  }, [cms]);

  const updateCMS = useCallback((updater: (prev: CMSData) => CMSData) => {
    setCMS(updater);
  }, []);

  const updateSection = useCallback(<K extends keyof CMSData>(section: K, values: Partial<CMSData[K]>) => {
    setCMS(prev => ({
      ...prev,
      [section]: { ...(prev[section] as object), ...(values as object) },
    }));
  }, []);

  const updateService = useCallback((id: string, values: Partial<CMSServiceCard>) => {
    setCMS(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...values } : s),
    }));
  }, []);

  const resetSection = useCallback((section: keyof CMSData) => {
    setCMS(prev => ({ ...prev, [section]: DEFAULT_CMS[section] }));
  }, []);

  const resetAll = useCallback(() => {
    setCMS(DEFAULT_CMS);
  }, []);

  const importCMS = useCallback((data: CMSData) => {
    try {
      const merged: CMSData = {
        home: deepMerge(DEFAULT_CMS.home, data.home || {}),
        about: deepMerge(DEFAULT_CMS.about, data.about || {}),
        services: DEFAULT_CMS.services.map(def => {
          const saved = (data.services || []).find((s: CMSServiceCard) => s.id === def.id);
          return saved ? { ...def, ...saved } : def;
        }),
        outskirts: deepMerge(DEFAULT_CMS.outskirts, data.outskirts || {}),
        contact: deepMerge(DEFAULT_CMS.contact, data.contact || {}),
        footer: deepMerge(DEFAULT_CMS.footer, data.footer || {}),
      };
      setCMS(merged);
    } catch {
      console.error('Failed to import CMS data');
    }
  }, []);

  return (
    <CMSContext.Provider value={{ cms, updateCMS, updateSection, updateService, resetSection, resetAll, importCMS }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS(): CMSContextValue {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used inside CMSProvider');
  return ctx;
}