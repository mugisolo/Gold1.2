import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, Check, RotateCcw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SCAM_RULES } from '../data/expeditionData';

interface ScamImmunityToolProps {
  currentLang: Language;
  onApplyForVettingWithData?: (score: number, flags: string[]) => void;
}

export const ScamImmunityTool: React.FC<ScamImmunityToolProps> = ({
  currentLang,
  onApplyForVettingWithData
}) => {
  const t = translations[currentLang];
  const [selectedFlags, setSelectedFlags] = useState<string[]>(['deep-discount', 'advance-export-tax']);

  const toggleFlag = (id: string) => {
    setSelectedFlags(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const resetFlags = () => {
    setSelectedFlags([]);
  };

  // Calculate cumulative risk score (capped at 99.9%)
  const totalScore = selectedFlags.reduce((acc, flagId) => {
    const rule = SCAM_RULES.find(r => r.id === flagId);
    return acc + (rule ? rule.riskScore : 0);
  }, 0);

  const displayRisk = Math.min(99.9, totalScore);

  const getRiskVerdict = (score: number) => {
    if (score >= 60) {
      return {
        level: "CRITICAL FRAUD CERTAINTY",
        color: "text-rose-500",
        badgeBg: "bg-rose-950/80 border-rose-800 text-rose-300",
        desc: "The offer exhibits textbook advance-fee confidence trick characteristics. Do not wire funds under any circumstances."
      };
    } else if (score >= 30) {
      return {
        level: "HIGH INSTITUTIONAL HAZARD",
        color: "text-amber-500",
        badgeBg: "bg-amber-950/80 border-amber-800 text-amber-300",
        desc: "Multiple high-risk indicators detected. Contractual terms violate statutory East African customs protocols."
      };
    } else if (score > 0) {
      return {
        level: "ELEVATED VULNERABILITY",
        color: "text-yellow-400",
        badgeBg: "bg-yellow-950/80 border-yellow-800 text-yellow-300",
        desc: "Non-standard transaction conditions identified. Independent physical verification required."
      };
    } else {
      return {
        level: "CLEAN BASELINE (NO FLAGS CHECKED)",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-950/80 border-emerald-800 text-emerald-300",
        desc: "Select the parameters from your current proposal to run a forensic risk diagnosis."
      };
    }
  };

  const verdict = getRiskVerdict(displayRisk);

  return (
    <section id="scam-immunity" className="py-20 bg-[#0E141F] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            <span>FORENSIC DIAGNOSTIC SUITE</span>
            <span className="text-slate-600">·</span>
            <span>INSTANT RED-FLAG AUDIT</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.scamToolTitle}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {t.scamToolSubtitle} Check the conditions stated in any active gold proposal you have received to instantly evaluate its forensic risk level.
          </p>
        </div>

        {/* Diagnostic Tool Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Checkbox Indicators (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono-data text-slate-400 uppercase tracking-wider">
                Select Observed Proposal Conditions ({selectedFlags.length} flagged)
              </span>
              <button
                onClick={resetFlags}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            <div className="space-y-3">
              {SCAM_RULES.map((rule) => {
                const isChecked = selectedFlags.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleFlag(rule.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#182232] border-[#D4AF37]/80 shadow-md'
                        : 'bg-[#111722] border-slate-800 hover:border-slate-700 hover:bg-[#141C2B]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                        isChecked 
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0F17]' 
                          : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {rule.label}
                          </h4>
                          <span className="text-[11px] font-mono-data text-rose-400 font-semibold shrink-0">
                            +{rule.riskScore}% Risk
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {rule.description}
                        </p>

                        {isChecked && (
                          <div className="mt-3 p-2.5 rounded bg-[#0B0F17] border border-rose-900/40 text-[11px] text-rose-300 leading-snug">
                            <span className="font-semibold text-rose-400">Forensic Analysis: </span>
                            {rule.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Risk Gauge & Scoreboard (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-xl bg-[#111722] border border-[#D4AF37]/40 p-6 sm:p-7 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono-data uppercase tracking-wider text-slate-400">
                  Forensic Vulnerability Score
                </span>
                <span className="text-[10px] font-mono-data text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  ALGORITHM V4.2
                </span>
              </div>

              {/* Dial / Metric */}
              <div className="text-center py-4 bg-[#0B0F17] rounded-xl border border-slate-800/80 p-6">
                <div className="inline-flex items-baseline gap-1">
                  <span className={`font-cinzel text-5xl sm:text-6xl font-bold font-mono-data ${verdict.color}`}>
                    {displayRisk.toFixed(0)}%
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-mono-data font-bold px-3 py-1 rounded border ${verdict.badgeBg}`}>
                    {verdict.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-3 max-w-sm mx-auto leading-relaxed">
                  {verdict.desc}
                </p>
              </div>

              {/* Recommended Action Checklist */}
              <div className="space-y-2.5 text-xs">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Mandatory Due Diligence Next Steps:
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Cross-check seller license number on the official Uganda DGSM online portal.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Never wire advance funds for taxes, export levies, or UN transit clearance.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Demand drill and fire assay inside an accredited Entebbe bonded refinery.</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onApplyForVettingWithData) {
                    onApplyForVettingWithData(displayRisk, selectedFlags);
                  }
                }}
                className="w-full py-3.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Register for Deal Audit & Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Includes 1-on-1 forensic deal review. USD 1,000 KYC fee is non-refundable.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
