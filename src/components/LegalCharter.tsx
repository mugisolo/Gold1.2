import React from 'react';
import { Scale, ShieldCheck, FileCheck, Users, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { LEGAL_CHARTER_PILLARS } from '../data/expeditionData';

interface LegalCharterProps {
  currentLang: Language;
}

export const LegalCharter: React.FC<LegalCharterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const icons = [Scale, ShieldCheck, FileCheck, Users];

  return (
    <section id="charter" className="py-20 bg-[#0E141F] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            <span>STATUTORY INDEPENDENCE & ETHICS</span>
            <span className="text-slate-600">·</span>
            <span>MANDATORY GOVERNANCE FRAMEWORK</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.charterTitle}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {t.charterSubtitle} The institutional pillars that protect our independence and safeguard foreign capital.
          </p>
        </div>

        {/* 4-Point Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {LEGAL_CHARTER_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx];

            return (
              <div
                key={pillar.number}
                className="rounded-xl bg-[#111722] border border-slate-800 hover:border-[#D4AF37]/40 p-6 sm:p-8 transition-colors shadow-lg relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-3xl font-extrabold text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors font-mono-data">
                    {pillar.number}
                  </span>
                  <div className="p-2.5 rounded bg-[#0B0F17] text-[#D4AF37] border border-slate-800">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-xs font-mono-data text-slate-400 uppercase tracking-wider mb-1">
                  {pillar.subtitle}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed space-y-1">
            <span className="font-bold text-slate-200">Regulatory Advisory & Statutory Standing: </span>
            <span>
              The Uganda Gold Expedition is administered under strict observance of Section 240 of the Uganda Mining and Minerals Act 2022. It does not provide financial investment solicitation or banking deposit facilities. All delegates operate as independent participants responsible for their own subsequent commercial decisions.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
