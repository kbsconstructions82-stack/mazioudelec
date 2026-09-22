import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickActionHub } from './components/QuickActionHub';
import { InteractiveDiagnostic } from './components/InteractiveDiagnostic';
import { EmergencyPage } from './components/EmergencyPage';
import { AppointmentPage } from './components/AppointmentPage';
import { RenovationElectriquePage } from './components/RenovationElectriquePage';
import { VmcPage } from './components/VmcPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Realisations } from './components/Realisations';
import { Reviews } from './components/Reviews';
import { ServiceArea } from './components/ServiceArea';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { EmergencyModal } from './components/EmergencyModal';
import { AppointmentModal } from './components/AppointmentModal';
import { CallbackModal } from './components/CallbackModal';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { AboutModal } from './components/AboutModal';
import { ProjectItem, ServiceItem } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('urgence-electrique') || hash.includes('urgence-electrique')) {
        return '/services/urgence-electrique';
      }
      if (path.includes('renovation-electrique') || hash.includes('renovation-electrique')) {
        return '/services/renovation-electrique';
      }
      if (path.includes('vmc') || hash.includes('vmc')) {
        return '/services/vmc';
      }
      if (path.includes('rendez-vous') || hash.includes('rendez-vous')) {
        return '/rendez-vous';
      }
    }
    return '/';
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('urgence-electrique') || hash.includes('urgence-electrique')) {
        setCurrentPath('/services/urgence-electrique');
      } else if (path.includes('renovation-electrique') || hash.includes('renovation-electrique')) {
        setCurrentPath('/services/renovation-electrique');
      } else if (path.includes('vmc') || hash.includes('vmc')) {
        setCurrentPath('/services/vmc');
      } else if (path.includes('rendez-vous') || hash.includes('rendez-vous')) {
        setCurrentPath('/rendez-vous');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEmergency = () => navigateTo('/services/urgence-electrique');
  const navigateToRenovation = () => navigateTo('/services/renovation-electrique');
  const navigateToVmc = () => navigateTo('/services/vmc');
  const navigateToAppointment = () => navigateTo('/rendez-vous');
  const navigateToHome = () => navigateTo('/');

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName);
    setIsQuoteModalOpen(true);
  };

  if (currentPath === '/services/urgence-electrique' || currentPath === '/urgence-electrique') {
    return (
      <>
        <EmergencyPage onNavigateHome={navigateToHome} />
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          defaultService={selectedServiceForQuote}
        />
        <FloatingWhatsApp />
      </>
    );
  }

  if (currentPath === '/services/renovation-electrique') {
    return (
      <>
        <RenovationElectriquePage
          onNavigateHome={navigateToHome}
          onOpenQuote={handleOpenQuote}
          onNavigateAppointment={navigateToAppointment}
        />
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          defaultService={selectedServiceForQuote}
        />
        <FloatingWhatsApp />
      </>
    );
  }

  if (currentPath === '/services/vmc') {
    return (
      <>
        <VmcPage
          onNavigateHome={navigateToHome}
          onOpenQuote={handleOpenQuote}
          onNavigateAppointment={navigateToAppointment}
        />
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          defaultService={selectedServiceForQuote}
        />
        <FloatingWhatsApp />
      </>
    );
  }

  if (currentPath === '/rendez-vous') {
    return (
      <>
        <AppointmentPage onNavigateHome={navigateToHome} />
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          defaultService={selectedServiceForQuote}
        />
        <FloatingWhatsApp />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Top Navigation Bar */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onNavigateEmergency={navigateToEmergency}
        onNavigateAppointment={navigateToAppointment}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Spectacular Full-Width Cinematic Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onNavigateAppointment={navigateToAppointment}
        />

        {/* PARCOURS RAPIDE: "QUEL EST VOTRE BESOIN ?" - Just below Hero */}
        <QuickActionHub
          onOpenEmergency={navigateToEmergency}
          onOpenAppointment={navigateToAppointment}
          onOpenQuote={() => handleOpenQuote()}
          onOpenCallback={() => setIsCallbackModalOpen(true)}
        />

        {/* DIAGNOSTIC RAPIDE: "Quel est votre problème ?" Mini Assistant */}
        <InteractiveDiagnostic />

        {/* 6 Premium Service Cards */}
        <Services
          onSelectService={(service) => setSelectedService(service)}
          onOpenQuoteWithService={(serviceName) => handleOpenQuote(serviceName)}
          onNavigateToRoute={navigateTo}
        />

        {/* Horizontal Futuristic Statistics Bar */}
        <WhyChooseUs />

        {/* Realisations Gallery (6 Projects) */}
        <Realisations
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Authentic Customer Reviews with Google 4.9/5 Rating */}
        <Reviews />

        {/* Zone d'Intervention: Nègrepelisse & Rayon 40 km + Futuristic Map + Urgent Card */}
        <ServiceArea />

        {/* Large Powerful Final CTA Banner */}
        <FinalCTA onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* Dark Black/Navy Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onNavigateEmergency={navigateToEmergency}
        onNavigateAppointment={navigateToAppointment}
        onNavigateToRoute={navigateTo}
      />

      {/* Interactive Modals */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={selectedServiceForQuote}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuote={(serviceTitle) => handleOpenQuote(serviceTitle)}
        onNavigateToRoute={navigateTo}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Floating Luminous WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
