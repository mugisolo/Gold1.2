import React, { useState, useEffect } from 'react';
import { Language, ContentPost, PhotoItem, ExpeditionRegistration, StaffMember, FieldLog, PaymentRecord, DocumentVerification } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketReality } from './components/MarketReality';
import { SupplyChainPipeline } from './components/SupplyChainPipeline';
import { Itinerary } from './components/Itinerary';
import { ScamImmunityTool } from './components/ScamImmunityTool';
import { PricingPackages } from './components/PricingPackages';
import { LegalCharter } from './components/LegalCharter';
import { RegistrationModal } from './components/RegistrationModal';
import { CardPaymentModal } from './components/CardPaymentModal';
import { DocumentVerificationModal } from './components/DocumentVerificationModal';
import { BriefingModal } from './components/BriefingModal';
import { PortalAuthModal } from './components/PortalAuthModal';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { StaffPortal } from './components/StaffPortal';
import { Footer } from './components/Footer';
import { 
  INITIAL_POSTS, 
  INITIAL_PHOTOS, 
  INITIAL_REGISTRATIONS, 
  INITIAL_STAFF, 
  INITIAL_FIELD_LOGS, 
  INITIAL_PAYMENTS,
  INITIAL_DOCUMENT_VERIFICATIONS
} from './data/portalData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  
  // Modal states
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isCardPaymentOpen, setIsCardPaymentOpen] = useState(false);
  const [isDocVerificationOpen, setIsDocVerificationOpen] = useState(false);
  const [isPortalAuthOpen, setIsPortalAuthOpen] = useState(false);
  
  // Portal Fullscreen Views
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [clientPortalEmailFilter, setClientPortalEmailFilter] = useState<string>('');
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);

  // Selected parameters
  const [selectedTier, setSelectedTier] = useState<'academic' | 'trader' | 'sovereign'>('trader');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full' | 'doc_verification'>('deposit');
  const [preloadedScamNotes, setPreloadedScamNotes] = useState<string>('');

  // Portal Data States
  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [registrations, setRegistrations] = useState<ExpeditionRegistration[]>(INITIAL_REGISTRATIONS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [fieldLogs, setFieldLogs] = useState<FieldLog[]>(INITIAL_FIELD_LOGS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [documentVerifications, setDocumentVerifications] = useState<DocumentVerification[]>(INITIAL_DOCUMENT_VERIFICATIONS);

  // Fetch initial portal data from backend if available
  useEffect(() => {
    fetch('/api/portal/data')
      .then(res => res.json())
      .then(data => {
        if (data.posts) setPosts(data.posts);
        if (data.photos) setPhotos(data.photos);
        if (data.registrations) setRegistrations(data.registrations);
        if (data.fieldLogs) setFieldLogs(data.fieldLogs);
        if (data.payments) setPayments(data.payments);
        if (data.documentVerifications) setDocumentVerifications(data.documentVerifications);
      })
      .catch(() => {
        // Fallback to local state if offline or initial load
      });
  }, []);

  const handleOpenRegistrationForTier = (tier: 'academic' | 'trader' | 'sovereign') => {
    setSelectedTier(tier);
    setIsRegistrationOpen(true);
  };

  const handleOpenCardPayment = (tier?: 'academic' | 'trader' | 'sovereign', type: 'deposit' | 'full' | 'doc_verification' = 'deposit') => {
    if (tier) setSelectedTier(tier);
    setPaymentType(type);
    setIsCardPaymentOpen(true);
  };

  const handleOpenClientPortal = (email: string = '') => {
    setClientPortalEmailFilter(email);
    setIsClientPortalOpen(true);
  };

  const handleApplyWithScamData = (score: number, flaggedIds: string[]) => {
    const notes = `Diagnosed Risk Score: ${score.toFixed(0)}%. Flagged Red Flags: ${flaggedIds.join(', ')}. Requested for confidential forensic audit. Note: USD 1,000 KYC fee accepted.`;
    setPreloadedScamNotes(notes);
    setIsRegistrationOpen(true);
  };

  // Admin & Staff Data Actions
  const handleAddPost = async (newPostData: Omit<ContentPost, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/portal/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostData)
      });
      const data = await res.json();
      if (data.success && data.post) {
        setPosts(prev => [data.post, ...prev]);
      }
    } catch {
      const localPost: ContentPost = {
        ...newPostData,
        id: `post-${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts(prev => [localPost, ...prev]);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await fetch(`/api/portal/post/${id}`, { method: 'DELETE' });
    } catch {}
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPhoto = async (newPhotoData: Omit<PhotoItem, 'id' | 'dateAdded'>) => {
    try {
      const res = await fetch('/api/portal/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhotoData)
      });
      const data = await res.json();
      if (data.success && data.photo) {
        setPhotos(prev => [data.photo, ...prev]);
      }
    } catch {
      const localPhoto: PhotoItem = {
        ...newPhotoData,
        id: `photo-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setPhotos(prev => [localPhoto, ...prev]);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      await fetch(`/api/portal/photo/${id}`, { method: 'DELETE' });
    } catch {}
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateRegistration = async (id: string, updates: Partial<ExpeditionRegistration>) => {
    try {
      await fetch(`/api/portal/registration/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const handleUpdateDocumentVerification = async (id: string, updates: Partial<DocumentVerification>) => {
    try {
      await fetch(`/api/verification/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setDocumentVerifications(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, ...updates } : doc))
    );
  };

  const handleAddFieldLog = async (logData: Omit<FieldLog, 'id' | 'logDate'>) => {
    try {
      const res = await fetch('/api/portal/field-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      const data = await res.json();
      if (data.success && data.log) {
        setFieldLogs(prev => [data.log, ...prev]);
      }
    } catch {
      const localLog: FieldLog = {
        ...logData,
        id: `LOG-${Date.now().toString().slice(-3)}`,
        logDate: new Date().toISOString().split('T')[0]
      };
      setFieldLogs(prev => [localLog, ...prev]);
    }
  };

  const handleSubmitRegistration = async (regData: any) => {
    try {
      await fetch('/api/portal/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
    } catch {}
    setRegistrations(prev => [regData, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-300 font-sans-ui selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Top Navigation with Registration, $2,500 Document Verification, Client Portal & Admin/Staff Access */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenCardPayment={() => handleOpenCardPayment()}
        onOpenDocVerification={() => setIsDocVerificationOpen(true)}
        onOpenClientPortal={() => handleOpenClientPortal('')}
        onOpenPortalAuth={() => setIsPortalAuthOpen(true)}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section with non-refundable USD 1,000 KYC & $2,500 24h AI Document Verification */}
        <Hero
          currentLang={currentLang}
          onOpenBriefing={() => setIsBriefingOpen(true)}
          onViewPackages={() => scrollToSection('packages')}
          onOpenCardPayment={() => handleOpenCardPayment()}
          onOpenRegistration={() => setIsRegistrationOpen(true)}
          onOpenDocVerification={() => setIsDocVerificationOpen(true)}
        />

        {/* Market Reality & Discrepancies */}
        <MarketReality
          currentLang={currentLang}
          onOpenScamDiagnostic={() => scrollToSection('scam-immunity')}
        />

        {/* The Food Chain: Supply Chain Architecture */}
        <SupplyChainPipeline
          currentLang={currentLang}
        />

        {/* 7-Day Immersion Itinerary */}
        <Itinerary
          currentLang={currentLang}
          onRegisterForTier={handleOpenRegistrationForTier}
        />

        {/* Scam Immunity Matrix & Diagnostic Tool */}
        <ScamImmunityTool
          currentLang={currentLang}
          onApplyForVettingWithData={handleApplyWithScamData}
          onOpenDocVerification={() => setIsDocVerificationOpen(true)}
        />

        {/* Three-Tier Pricing Packages with Visa / Mastercard & USD 1,000 KYC Notice */}
        <PricingPackages
          currentLang={currentLang}
          onSelectTier={handleOpenRegistrationForTier}
          onPayByCard={handleOpenCardPayment}
        />

        {/* Legal & Governance Charter */}
        <LegalCharter
          currentLang={currentLang}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCharter={() => scrollToSection('charter')}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenPortalAuth={() => setIsPortalAuthOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Registration Modal (replaces vetting, indicates non-refundable USD 1,000 KYC) */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        preselectedTier={selectedTier}
        preloadedOfferNotes={preloadedScamNotes}
        onProceedToCardPayment={(tier, type) => handleOpenCardPayment(tier, type)}
        onSubmitRegistration={handleSubmitRegistration}
      />

      {/* 2. Card Payment Modal (Relworx Visa & Mastercard, $1,000 KYC Deposit, $2,500 Doc Audit, or Full Fee) */}
      <CardPaymentModal
        isOpen={isCardPaymentOpen}
        onClose={() => setIsCardPaymentOpen(false)}
        selectedTier={selectedTier}
        defaultPaymentType={paymentType}
      />

      {/* 3. $2,500 One-Off Document Verification Modal (AI Analysis -> Staff Officer 1 -> Locked until Analyst Approval) */}
      <DocumentVerificationModal
        isOpen={isDocVerificationOpen}
        onClose={() => setIsDocVerificationOpen(false)}
        onVerificationCreated={(newVerification: DocumentVerification) => {
          setDocumentVerifications(prev => [newVerification, ...prev]);
        }}
        onOpenClientPortal={(clientEmail: string) => handleOpenClientPortal(clientEmail)}
      />

      {/* 4. Confidential B2B Briefing Modal */}
      <BriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />

      {/* 5. Portal Authentication / Role Switcher Modal */}
      <PortalAuthModal
        isOpen={isPortalAuthOpen}
        onClose={() => setIsPortalAuthOpen(false)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenStaff={() => setIsStaffPortalOpen(true)}
        onOpenClientPortal={() => handleOpenClientPortal('')}
      />

      {/* FULLSCREEN CLIENT, ADMIN & STAFF PORTALS */}
      {isClientPortalOpen && (
        <ClientPortal
          documentVerifications={documentVerifications}
          registrations={registrations}
          initialClientEmail={clientPortalEmailFilter}
          onClose={() => setIsClientPortalOpen(false)}
          onOpenDocVerification={() => {
            setIsClientPortalOpen(false);
            setIsDocVerificationOpen(true);
          }}
          onOpenRegistration={() => {
            setIsClientPortalOpen(false);
            setIsRegistrationOpen(true);
          }}
          onOpenCardPayment={(tier, type) => {
            setIsClientPortalOpen(false);
            handleOpenCardPayment(tier, type);
          }}
          onOpenStaffPortal={() => {
            setIsClientPortalOpen(false);
            setIsStaffPortalOpen(true);
          }}
        />
      )}

      {isAdminPortalOpen && (
        <AdminPortal
          posts={posts}
          photos={photos}
          registrations={registrations}
          documentVerifications={documentVerifications}
          staff={staff}
          payments={payments}
          onAddPost={handleAddPost}
          onDeletePost={handleDeletePost}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onClose={() => setIsAdminPortalOpen(false)}
          onSwitchToStaff={() => {
            setIsAdminPortalOpen(false);
            setIsStaffPortalOpen(true);
          }}
        />
      )}

      {isStaffPortalOpen && (
        <StaffPortal
          registrations={registrations}
          documentVerifications={documentVerifications}
          fieldLogs={fieldLogs}
          staff={staff}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onAddFieldLog={handleAddFieldLog}
          onClose={() => setIsStaffPortalOpen(false)}
          onSwitchToAdmin={() => {
            setIsStaffPortalOpen(false);
            setIsAdminPortalOpen(true);
          }}
        />
      )}
    </div>
  );
}
