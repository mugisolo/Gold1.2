import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketReality } from './components/MarketReality';
import { SupplyChainPipeline } from './components/SupplyChainPipeline';
import { Itinerary } from './components/Itinerary';
import { ScamImmunityTool } from './components/ScamImmunityTool';
import { PricingPackages } from './components/PricingPackages';
import { LegalCharter } from './components/LegalCharter';
import { VettingModal } from './components/VettingModal';
import { BriefingModal } from './components/BriefingModal';
import { CardPaymentModal } from './components/CardPaymentModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [isVettingOpen, setIsVettingOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isCardPaymentOpen, setIsCardPaymentOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'academic' | 'trader' | 'sovereign'>('trader');
  const [preloadedScamNotes, setPreloadedScamNotes] = useState<string>('');

  const handleOpenVettingForTier = (tier: 'academic' | 'trader' | 'sovereign') => {
    setSelectedTier(tier);
    setIsVettingOpen(true);
  };

  const handleOpenCardPayment = (tier?: 'academic' | 'trader' | 'sovereign') => {
    if (tier) setSelectedTier(tier);
    setIsCardPaymentOpen(true);
  };

  const handleApplyWithScamData = (score: number, flaggedIds: string[]) => {
    const notes = `Diagnosed Risk Score: ${score.toFixed(0)}%. Flagged Red Flags: ${flaggedIds.join(', ')}. Requested for confidential forensic audit.`;
    setPreloadedScamNotes(notes);
    setIsVettingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-300 font-sans-ui selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenVetting={() => setIsVettingOpen(true)}
        onOpenCardPayment={() => handleOpenCardPayment()}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenBriefing={() => setIsBriefingOpen(true)}
          onViewPackages={() => scrollToSection('packages')}
          onOpenCardPayment={() => handleOpenCardPayment()}
        />

        {/* Market Reality & Discrepancies - Neat & Brief */}
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
          onApplyForTier={handleOpenVettingForTier}
        />

        {/* Scam Immunity Matrix & Diagnostic Tool */}
        <ScamImmunityTool
          currentLang={currentLang}
          onApplyForVettingWithData={handleApplyWithScamData}
        />

        {/* Three-Tier Pricing Packages with Visa / Mastercard Integration */}
        <PricingPackages
          currentLang={currentLang}
          onSelectTier={handleOpenVettingForTier}
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
        onOpenVetting={() => setIsVettingOpen(true)}
      />

      {/* Interactive Modals */}
      <CardPaymentModal
        isOpen={isCardPaymentOpen}
        onClose={() => setIsCardPaymentOpen(false)}
        selectedTier={selectedTier}
      />

      <VettingModal
        isOpen={isVettingOpen}
        onClose={() => setIsVettingOpen(false)}
        preselectedTier={selectedTier}
        preloadedOfferNotes={preloadedScamNotes}
      />

      <BriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />
    </div>
  );
}
