import React from 'react';
import { ShieldCheck, FileCheck2, Building2, CreditCard, Lock, AlertCircle, Award, FileSearch } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onOpenBriefing: () => void;
  onViewPackages: () => void;
  onOpenCardPayment: () => void;
  onOpenRegistration: () => void;
  onOpenDocVerification: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenBriefing,
  onViewPackages,
  onOpenCardPayment,
  onOpenRegistration,
  onOpenDocVerification
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none -z-10 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strict Non-Transaction Guarantee Top Warning Banner */}
        <div className="mb-6 px-4 py-2.5 rounded-lg bg-[#111722] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <p className="text-slate-300">
              <strong className="text-[#D4AF37] uppercase tracking-wider mr-1">Strict Non-Transaction Guarantee:</strong>
              We do NOT sell gold or broker trades. Our sole mandate is independent physical due diligence and anti-fraud verification.
            </p>
          </div>
          <span className="text-[10px] font-mono-data text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded whitespace-nowrap self-end sm:self-center">
            Zero Brokerage Bias
          </span>
        </div>

        {/* Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>EAST AFRICA&apos;S PREMIER DUE DILIGENCE EXPEDITION</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">UGANDA</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              DON&apos;T WIRE A SINGLE DOLLAR UNTIL YOU WALK THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FDE68A] to-[#D4AF37]">SUPPLY CHAIN.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              The world&apos;s only hands-on anti-fraud expedition across East Africa&apos;s physical gold architecture. Inspect sovereign mineral registries, deconstruct counterfeit documents in a metallurgical lab, and audit bonded refineries in person.
            </p>

            {/* MANDATORY USD 1,000 KYC NOTICE */}
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2 max-w-2xl">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Notice to Applicants: </strong>
                USD $1,000 of your registration deposit goes towards sovereign KYC verification, Interpol screening, and DGSM registration, and is <strong className="text-amber-300 underline font-bold">strictly non-refundable</strong>.
              </span>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Live DGSM Cadastre Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSearch className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>$2,500 AI + Officer 1 Document Audit (24h)</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Bonded Refineries & Fire Assay</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Visa & Mastercard Card Checkout</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenRegistration}
                className="px-5 py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] rounded shadow-md shadow-[#D4AF37]/20 transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Register for Expedition</span>
              </button>

              <button
                onClick={onOpenDocVerification}
                className="px-4 py-3 text-xs font-bold text-white bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/60 rounded transition-all flex items-center gap-2 shadow-sm"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verify Document ($2,500 · 24h Report)</span>
              </button>

              <button
                onClick={onOpenCardPayment}
                className="px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white bg-[#111722] hover:bg-[#182232] border border-slate-700 rounded transition-all flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Card Pay (Visa/MC)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#111722] shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg"
                  alt="Precious metals vault and assay inspection in Uganda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 bg-[#0B0F17]/90 border border-slate-700 rounded px-2.5 py-1 text-[10px] font-mono-data text-slate-200">
                  METALLURGICAL LAB · ENTEBBE
                </div>
                <div className="absolute top-3 right-3 bg-[#D4AF37]/20 border border-[#D4AF37]/60 rounded px-2 py-0.5 text-[10px] font-mono-data text-[#FEF3C7] font-semibold">
                  FIRE ASSAY 999.9
                </div>
              </div>

              <div className="p-3 bg-[#111722] border-t border-slate-800 flex items-center justify-between text-xs font-mono-data">
                <span className="text-slate-400">Mining & Minerals Act 2022</span>
                <span className="text-emerald-400">$700M+ Mo. Transit Audited</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Row */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-[#111722]/60 border border-slate-800">
            <div className="font-cinzel text-2xl font-bold text-[#D4AF37] font-mono-data">$700M+</div>
            <div className="text-xs font-semibold text-white">Monthly Gold Exports</div>
            <div className="text-[11px] text-slate-400">Regional transit hub volume</div>
          </div>
          <div className="p-3 rounded-lg bg-[#111722]/60 border border-slate-800">
            <div className="font-cinzel text-2xl font-bold text-white font-mono-data">$2,500</div>
            <div className="text-xs font-semibold text-white">24h Document Audit</div>
            <div className="text-[11px] text-slate-400">AI + Staff Officer 1 review</div>
          </div>
          <div className="p-3 rounded-lg bg-[#111722]/60 border border-slate-800">
            <div className="font-cinzel text-2xl font-bold text-emerald-400 font-mono-data">100%</div>
            <div className="text-xs font-semibold text-white">Independent</div>
            <div className="text-[11px] text-slate-400">Zero brokerage, zero sales</div>
          </div>
          <div className="p-3 rounded-lg bg-[#111722]/60 border border-slate-800">
            <div className="font-cinzel text-2xl font-bold text-amber-300 font-mono-data">$1,000 KYC</div>
            <div className="text-xs font-semibold text-white">Non-Refundable</div>
            <div className="text-[11px] text-slate-400">Sovereign background check</div>
          </div>
        </div>

      </div>
    </section>
  );
};
