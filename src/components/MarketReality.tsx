import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, FileSpreadsheet, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MARKET_REALITIES } from '../data/expeditionData';

interface MarketRealityProps {
  currentLang: Language;
  onOpenScamDiagnostic: () => void;
}

export const MarketReality: React.FC<MarketRealityProps> = ({
  currentLang,
  onOpenScamDiagnostic
}) => {
  const t = translations[currentLang];
  const [activeComparison, setActiveComparison] = useState<'whatsapp' | 'legitimate'>('whatsapp');
  const [showPitchModal, setShowPitchModal] = useState(false);

  return (
    <section id="market-reality" className="py-20 bg-[#0B0F17] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            <span>REGIONAL TRADE DYNAMICS</span>
            <span className="text-slate-600">·</span>
            <span>EAST AFRICA FINANCIAL INTELLIGENCE</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.marketRealityTitle}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {t.marketRealitySubtitle} Understanding the divergence between official statutory trade and synthetic intermediary illusions.
          </p>
        </div>

        {/* 3 Core Analytical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {MARKET_REALITIES.map((card, idx) => {
            const icons = [TrendingUp, AlertTriangle, FileSpreadsheet];
            const Icon = icons[idx];
            
            return (
              <div 
                key={card.id}
                className="rounded-xl bg-[#111722] border border-slate-800 hover:border-[#D4AF37]/50 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <div className="p-2 rounded bg-slate-800/80 text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Quantitative Metric */}
                  <div className="mb-4">
                    <div className="font-cinzel text-3xl font-bold text-white font-mono-data">
                      {card.metric}
                    </div>
                    <div className="text-xs text-[#FEF3C7]/80 font-medium">
                      {card.metricSub}
                    </div>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Implication Footnote */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="text-[#D4AF37] font-medium leading-snug">
                    <span className="font-semibold text-white">Danger: </span>
                    {card.implication}
                  </div>
                  <div className="text-[11px] text-slate-400 bg-[#0B0F17] p-2.5 rounded border border-slate-800 font-mono-data">
                    {card.keyStat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Comparative Matrix Box */}
        <div className="rounded-xl bg-[#111722] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                DECONSTRUCTION COMPARISON
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                The Anatomy of a WhatsApp Offer vs Sovereign Legal Architecture
              </h3>
            </div>
            
            {/* Toggle Switch */}
            <div className="flex items-center gap-1 p-1 bg-[#0B0F17] border border-slate-800 rounded-lg shrink-0">
              <button
                onClick={() => setActiveComparison('whatsapp')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                  activeComparison === 'whatsapp' 
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                The Fake WhatsApp Trap
              </button>
              <button
                onClick={() => setActiveComparison('legitimate')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                  activeComparison === 'legitimate' 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                The Sovereign Standard
              </button>
            </div>
          </div>

          {activeComparison === 'whatsapp' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>The 20% - 25% Discount Illusion</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Intermediary sends a Full Corporate Offer (FCO) guaranteeing 100kg-500kg of gold bars at 25% below LBMA spot. LBMA gold is currency—giving a 25% discount is equivalent to selling $100 bills for $75. It is mathematically fraudulent.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>The Advance Tax & Bond Decoy</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Buyer is told gold is impounded or waiting in a private bonded warehouse in Entebbe. Buyer must wire $45,000 for &quot;URA 5% export taxes&quot; or &quot;UN Security Clearance&quot; to an individual attorney&apos;s escrow before physical viewing.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Synthetic Documents & Brass Bars</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Buyer receives stamped PDFs with cloned DGSM logos and fake QR codes. If physical viewing occurs, bars are gold-plated brass or tungsten powder cores that fail true drill cupellation fire assay.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Empirical Spot Pricing (0-2% Margin)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Legitimate gold trades strictly at international market spot or slight refiner margin (+0.5% to -2% for unrefined Dore bar discount based on fire assay purity). No authentic operator discounts high-purity physical bullion.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Direct URA Portal & Bank MT103/72</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tax is paid strictly through the Uganda Revenue Authority e-tax system against an electronic assessment number tied to an official bonded refinery assay, never to private personal accounts.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Bonded Vault Cupellation Assay</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gold is melted, core-drilled, and tested via ISO-certified Fire Assay (cupellation) inside an accredited bonded refinery in the presence of customs officers and independent vault forwarders (Brinks / Malca-Amit).
                </p>
              </div>
            </div>
          )}

          {/* Action Prompt */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Holding a live offer document right now? Test its vulnerability with our interactive tool.
            </span>
            <button
              onClick={onOpenScamDiagnostic}
              className="text-[#D4AF37] hover:text-[#FEF3C7] font-semibold flex items-center gap-1 group whitespace-nowrap"
            >
              <span>Launch Scam Immunity Scanner</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
