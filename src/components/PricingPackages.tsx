import React, { useState } from 'react';
import { Check, Crown, Calendar, Sparkles, CreditCard, Hotel, Car, Plane, AlertCircle } from 'lucide-react';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';
import { EXPEDITION_PACKAGES, CURRENCY_RATES, UPCOMING_COHORTS } from '../data/expeditionData';

interface PricingPackagesProps {
  currentLang: Language;
  onSelectTier: (tierId: 'academic' | 'trader' | 'sovereign') => void;
  onPayByCard: (tierId: 'academic' | 'trader' | 'sovereign') => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  currentLang,
  onSelectTier,
  onPayByCard
}) => {
  const t = translations[currentLang];
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [selectedCohort, setSelectedCohort] = useState<string>(UPCOMING_COHORTS[0].id);

  const formatPrice = (priceUsd: number) => {
    const { symbol, rate } = CURRENCY_RATES[selectedCurrency];
    const converted = Math.round(priceUsd * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="packages" className="py-16 md:py-20 bg-[#0B0F17] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1">
              <span>EXPEDITION TIERS & ADMISSION</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.packagesTitle}
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              All-inclusive of security, executive transit, permits, and laboratory assays.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#111722] border border-slate-800 rounded-lg self-start md:self-auto">
            {(['USD', 'EUR', 'AED', 'GBP', 'CNY'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-2.5 py-1 text-xs font-mono-data font-semibold rounded transition-colors ${
                  selectedCurrency === curr
                    ? 'bg-[#D4AF37] text-[#0B0F17]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* NON-REFUNDABLE USD 1000 KYC NOTICE BANNER */}
        <div className="mb-8 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200 shadow-md">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white">Statutory KYC Disclosure: </strong>
              USD $1,000 of the registration deposit goes directly towards sovereign KYC background screening and Ministry of Energy protocol clearances, and is <strong className="text-white font-bold underline">strictly non-refundable</strong>.
            </span>
          </div>
          <span className="text-[10px] font-mono-data text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/80 shrink-0">
            Mandatory Statutory Vetting
          </span>
        </div>

        {/* Cohort Selector Banner */}
        <div className="mb-10 p-3.5 rounded-xl bg-[#111722] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-semibold text-white">2026 Cohorts (Max 12 Delegates):</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {UPCOMING_COHORTS.map((cohort) => (
              <button
                key={cohort.id}
                onClick={() => setSelectedCohort(cohort.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono-data transition-all border ${
                  selectedCohort === cohort.id
                    ? 'bg-[#182232] border-[#D4AF37] text-white font-semibold'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{cohort.dates}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {EXPEDITION_PACKAGES.map((pkg) => {
            const isSovereign = pkg.id === 'sovereign';
            const isTrader = pkg.id === 'trader';

            return (
              <div
                key={pkg.id}
                className={`rounded-xl flex flex-col justify-between transition-all relative p-6 ${
                  isSovereign
                    ? 'bg-gradient-to-b from-[#182232] via-[#111722] to-[#0E141F] border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                    : isTrader
                    ? 'bg-[#111722] border border-[#D4AF37]/50 shadow-lg'
                    : 'bg-[#111722] border border-slate-800'
                }`}
              >
                {isSovereign && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0B0F17] text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>MOST EXCLUSIVE · SOVEREIGN TIER</span>
                  </div>
                )}

                {isTrader && (
                  <div className="absolute -top-3 left-6 bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    RECOMMENDED FOR TRADERS
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-data font-bold text-[#D4AF37]">{pkg.tierNumber}</span>
                    <span className="text-[11px] text-slate-400">7 Days Immersion</span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{pkg.tagline}</p>

                  {/* Price */}
                  <div className="my-5 pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white font-mono-data">
                        {formatPrice(pkg.priceUsd)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono-data">/ delegate</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex flex-col gap-0.5">
                      <span className="text-amber-300 font-mono-data">
                        Deposit: $1,000 USD (Non-refundable KYC)
                      </span>
                      <span className="text-emerald-400 text-[10px]">
                        Visa & Mastercard Accepted (No mobile money)
                      </span>
                    </div>
                  </div>

                  {/* Logistics Summary */}
                  <div className="space-y-1.5 mb-5 p-2.5 rounded-lg bg-[#0B0F17] text-xs text-slate-300">
                    <div className="flex items-center gap-2 truncate">
                      <Hotel className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{pkg.accommodation.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      {isSovereign ? <Plane className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> : <Car className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                      <span className="truncate">{isSovereign ? 'Chartered Helicopter + Armored Convoy' : pkg.transport.split('with')[0]}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {pkg.features.slice(0, 5).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {pkg.exclusiveBonus && (
                    <div className="mb-4 p-2.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#FEF3C7] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[11px]">{pkg.exclusiveBonus}</span>
                    </div>
                  )}
                </div>

                {/* Actions: Card Pay + Register */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => onPayByCard(pkg.id)}
                    className="w-full py-2.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay with Visa / Mastercard</span>
                  </button>

                  <button
                    onClick={() => onSelectTier(pkg.id)}
                    className="w-full py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 rounded transition-colors text-center"
                  >
                    Register for Expedition
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Payment Guarantee Footer */}
        <div className="mt-8 p-3 rounded-lg bg-[#111722] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            <span>Card payments securely processed via <strong>Relworx Payments API</strong> (Visa & Mastercard only).</span>
          </div>
          <span className="text-amber-400 font-mono-data font-medium">
            USD $1,000 KYC Fee is Non-Refundable · No Mobile Money
          </span>
        </div>

      </div>
    </section>
  );
};
