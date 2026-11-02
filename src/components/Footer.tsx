import React from 'react';
import { Shield, Globe, Lock, FileText, ExternalLink, MapPin } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCharter: () => void;
  onOpenVetting: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onOpenCharter,
  onOpenVetting
}) => {
  return (
    <footer className="bg-[#080B11] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mandate */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-cinzel font-bold text-base tracking-wider">
              <div className="w-7 h-7 rounded border border-[#D4AF37]/60 bg-[#111722] flex items-center justify-center text-[#D4AF37]">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span>UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              East Africa&apos;s authoritative physical supply chain due diligence, metallurgical assay audit, and anti-fraud immersion mission.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-mono-data">
              <Lock className="w-3.5 h-3.5" />
              <span>Strict Non-Transaction Advisory</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              Expedition Architecture
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#expedition" className="hover:text-[#D4AF37] transition-colors">
                  7-Day Immersion Itinerary
                </a>
              </li>
              <li>
                <a href="#market-reality" className="hover:text-[#D4AF37] transition-colors">
                  Supply Discrepancy & Transit Hub
                </a>
              </li>
              <li>
                <a href="#food-chain" className="hover:text-[#D4AF37] transition-colors">
                  The East African Gold Food Chain
                </a>
              </li>
              <li>
                <a href="#scam-immunity" className="hover:text-[#D4AF37] transition-colors">
                  The Scam Immunity Diagnostic
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#D4AF37] transition-colors">
                  Executive Pricing Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Statutory Framework */}
          <div className="space-y-2">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              Statutory Alignment
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-1 text-slate-400">
                <span>Uganda Mining & Minerals Act 2022</span>
              </li>
              <li className="flex items-center gap-1 text-slate-400">
                <span>ICGLR Regional Certification (RCM)</span>
              </li>
              <li className="flex items-center gap-1 text-slate-400">
                <span>DGSM Sovereign Mineral Cadastre</span>
              </li>
              <li className="flex items-center gap-1 text-slate-400">
                <span>URA ASYCUDA 5% Export Levy Protocol</span>
              </li>
              <li className="flex items-center gap-1 text-slate-400">
                <span>OECD Due Diligence Guidance (Annex II)</span>
              </li>
            </ul>
          </div>

          {/* Operational Facilities & Secretariat */}
          <div className="space-y-3">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              Inspection Secretariats
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Amber House, Kampala & DGSM Mineral Headquarters, Entebbe, Republic of Uganda
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Airside Bonded Logistics Hub, Entebbe International Airport (EBB)
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenVetting}
                className="w-full py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
              >
                Apply for Private Vetting
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer Notice */}
        <div className="p-4 rounded-lg bg-[#0B0F17] border border-slate-800/80 mb-8 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <p>
            <strong className="text-slate-300">Statutory Notice & Independence Disclaimer:</strong> The Uganda Gold Expedition is an independent executive diligence and forensic research symposium. We do not act as gold dealers, brokers, intermediaries, or commercial representatives of any mining entity, refinery, or banking institution. We strictly do NOT buy, sell, or take custody of precious minerals.
          </p>
          <p>
            No information provided on this platform constitutes an offer to buy or sell securities, commodities, or financial products. All visits to state-controlled mineral facilities and private bonded refineries are subject to prior vetting and clearance by relevant sovereign authorities.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Language Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/60 text-[11px]">
          <div>
            © 2026 Uganda Gold Expedition. All rights reserved. Sovereign Intelligence & Anti-Fraud Due Diligence.
          </div>

          {/* Multi-language Switcher in Footer */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Language:</span>
            </span>
            <div className="flex items-center gap-2 font-mono-data">
              {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currentLang === lang
                      ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
