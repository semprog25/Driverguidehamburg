import React from 'react';
import { Shield, FileText, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { AdminPanel, AdminDashboardProps } from './AdminPanel';
import { LoginScreen } from './LoginScreen';
import { useLanguage } from '@/app/context/LanguageContext';

interface MoreSectionProps extends AdminDashboardProps {
  isAuthenticated: boolean;
  onLogin: () => void;
}

export function MoreSection(props: MoreSectionProps) {
  const { language } = useLanguage();
  
  // German Content (Default)
  const contentDE = {
    privacy: {
      title: "Datenschutz",
      desc: "Informationen zum Datenschutz",
      text: `Diese Website verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang. Bei Kontakt per WhatsApp oder E-Mail werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert. Es erfolgt keine Weitergabe an Dritte.
      
      Verantwortlich:
      Angela Scheefeld, J.-D.-Möller-Str. 46, 22880 Wedel`
    },
    imprint: {
      title: "Impressum",
      desc: "Rechtliche Angaben",
      text: `Angaben gemäß § 5 TMG
      Angela Scheefeld
      J.-D.-Möller-Str. 46
      22880 Wedel
      Deutschland

      Telefon: +4915786802520
      E-Mail: los@driverguide-hamburg.de

      Umsatzsteuer-ID gemäß §27 a Umsatzsteuergesetz:
      282309399`
    },
    admin: {
      title: "Admin",
      desc: "Dashboard für Angela"
    }
  };

  // English Content
  const contentEN = {
    privacy: {
      title: "Privacy Policy",
      desc: "Data protection information",
      text: `This website only processes personal data that is technically necessary. If you contact us via WhatsApp or email, your data will be stored to handle your request. No data is shared with third parties.

      Responsible:
      Angela Scheefeld, J.-D.-Möller-Str. 46, 22880 Wedel`
    },
    imprint: {
      title: "Imprint",
      desc: "Legal Information",
      text: `Information according to §5 TMG
      Angela Scheefeld
      J.-D.-Möller-Str. 46
      22880 Wedel
      Germany

      Phone: +49 157 86802520
      E-Mail: los@driverguide-hamburg.de

      VAT ID: 282309399`
    },
    admin: {
      title: "Admin",
      desc: "Dashboard for Angela"
    }
  };

  const activeContent = language === 'en' ? contentEN : contentDE;

  if (!activeContent) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">{language === 'en' ? 'More Information' : 'Mehr Informationen'}</h1>
      
      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 p-1 rounded-xl h-14">
          <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <Shield className="w-4 h-4 mr-2 md:mr-2" /> 
            <span className="hidden md:inline">{activeContent.privacy.title}</span>
            <span className="md:hidden">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="imprint" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <FileText className="w-4 h-4 mr-2 md:mr-2" /> 
            <span className="hidden md:inline">{activeContent.imprint.title}</span>
            <span className="md:hidden">Imprint</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <Lock className="w-4 h-4 mr-2 md:mr-2" /> 
            <span className="hidden md:inline">{activeContent.admin.title}</span>
            <span className="md:hidden">Admin</span>
          </TabsTrigger>
        </TabsList>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{activeContent.privacy.title}</CardTitle>
              <CardDescription>{activeContent.privacy.desc}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                {activeContent.privacy.text}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Imprint Tab */}
        <TabsContent value="imprint">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{activeContent.imprint.title}</CardTitle>
              <CardDescription>{activeContent.imprint.desc}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="whitespace-pre-line text-slate-700 leading-relaxed font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-100">
                {activeContent.imprint.text}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Tab - Nested existing Dashboard with Auth Check */}
        <TabsContent value="admin">
           {!props.isAuthenticated ? (
              <div className="max-w-md mx-auto py-12">
                <LoginScreen onLogin={props.onLogin} />
              </div>
           ) : (
              <AdminPanel {...props} />
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
