import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Globe, CreditCard, Award, Lock, FileSearch } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRegistration: () => void;
  onOpenCardPayment: () => void;
  onOpenDocVerification: () => void;
  onOpenClientPortal: () => void;
  onOpenPortalAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenRegistration,
  onOpenCardPayment,
  onOpenDocVerification,
  onOpenClientPortal,
  onOpenPortalAuth
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "The Expedition", href: "#expedition" },
    { name: "The Reality", href: "#market-reality" },
    { name: "Supply Chain", href: "#food-chain" },
    { name: "Scam Immunity", href: "#scam-immunity" },
    { name: "Packages", href: "#packages" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl py-3' 
        : 'bg-[#0B0F17]/85 backdrop-blur-sm border-b border-slate-800/80 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 text-white group whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded border border-[#D4AF37]/60 bg-[#182232] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors shadow-sm">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-cinzel text-base md:text-lg tracking-wider font-bold text-white group-hover:text-[#FEF3C7] transition-colors">
              UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Portal Access */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded border border-slate-800 bg-[#131A26] transition-colors"
                aria-label="Language selector"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono-data font-semibold">{currentLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-[#182232] border border-slate-700 rounded shadow-xl py-1 z-50">
                  {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        currentLang === lang ? 'text-[#D4AF37] bg-[#0B0F17] font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{lang === 'EN' ? 'English' : lang === 'AR' ? 'العربية' : lang === 'ZH' ? '中文' : 'Français'}</span>
                      <span className="text-[10px] font-mono-data text-slate-400">{lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Portal Button */}
            <button
              onClick={onOpenClientPortal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-600/50 rounded transition-colors whitespace-nowrap"
              title="Secure Client Portal: Track Document Verification & Expedition Status"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client Portal</span>
            </button>

            {/* Admin & Staff Portal Access Button */}
            <button
              onClick={onOpenPortalAuth}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-[#131A26] hover:bg-[#182232] border border-slate-800 hover:border-slate-700 rounded transition-colors whitespace-nowrap"
              title="Admin & Staff Portal Access"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono-data text-[11px]">Staff/Admin</span>
            </button>

            {/* One-Off $2,500 Document Verification Button */}
            <button
              onClick={onOpenDocVerification}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 rounded transition-colors whitespace-nowrap"
            >
              <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verify Document ($2,500)</span>
            </button>

            {/* Register for Expedition CTA */}
            <button
              onClick={onOpenRegistration}
              className="px-3.5 py-1.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm shadow-[#D4AF37]/20"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-400 hover:text-white rounded border border-slate-800 bg-[#131A26]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-800 bg-[#0B0F17] pb-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-[#D4AF37]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientPortal();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-600/60 rounded flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client Portal (Track Verifications & Expedition)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDocVerification();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-white bg-[#182232] border border-[#D4AF37]/60 rounded flex items-center justify-center gap-2"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verify Document ($2,500 · 24h AI + Officer 1 Report)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegistration();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] rounded"
              >
                Register for Expedition ($1,000 KYC)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCardPayment();
                }}
                className="w-full text-center px-3 py-2 text-xs font-semibold text-white bg-[#131A26] border border-slate-700 rounded flex items-center justify-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Pay via Visa & Mastercard</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortalAuth();
                }}
                className="w-full text-center px-3 py-2 text-xs text-slate-300 bg-[#0B0F17] border border-slate-800 rounded flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin & Staff Portal Access</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
