import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Lock, Building, Globe2, User, Mail, Phone, Calendar, ArrowRight, Download } from 'lucide-react';
import { PackageTier, VettingApplication } from '../types';
import { EXPEDITION_PACKAGES, UPCOMING_COHORTS } from '../data/expeditionData';

interface VettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: 'academic' | 'trader' | 'sovereign';
  preloadedOfferNotes?: string;
}

export const VettingModal: React.FC<VettingModalProps> = ({
  isOpen,
  onClose,
  preselectedTier = 'trader',
  preloadedOfferNotes = ''
}) => {
  const [formData, setFormData] = useState<VettingApplication>({
    fullName: '',
    companyName: '',
    executiveTitle: '',
    country: 'United Arab Emirates',
    email: '',
    phone: '',
    requestedTier: preselectedTier,
    delegatesCount: 1,
    cohortDate: UPCOMING_COHORTS[0].dates,
    primaryObjective: 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: preloadedOfferNotes,
    nonTransactionAgreed: false,
    passportVettingConsent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedTier) {
      setFormData(prev => ({ ...prev, requestedTier: preselectedTier }));
    }
  }, [preselectedTier]);

  useEffect(() => {
    if (preloadedOfferNotes) {
      setFormData(prev => ({ ...prev, activeProposalDetails: preloadedOfferNotes }));
    }
  }, [preloadedOfferNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.companyName) {
      setErrorMsg('Please complete all required identity and corporate fields.');
      return;
    }
    if (!formData.nonTransactionAgreed || !formData.passportVettingConsent) {
      setErrorMsg('You must agree to the Non-Transaction Guarantee and Passport Vetting consent.');
      return;
    }

    // Generate formal application reference code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refCode = `UGE-VET-2026-${randomCode}`;
    setApplicationRef(refCode);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleDownloadDossier = () => {
    const textContent = `UGANDA GOLD EXPEDITION — OFFICIAL VETTING DOSSIER
=====================================================
Application Reference: ${applicationRef}
Date of Submission: ${new Date().toISOString()}
Security Clearance Status: PENDING INSTITUTIONAL KYC REVIEW

APPLICANT PROFILE:
- Full Legal Name: ${formData.fullName}
- Corporate Entity: ${formData.companyName}
- Executive Title: ${formData.executiveTitle}
- Jurisdiction: ${formData.country}
- Direct Email: ${formData.email}
- Contact Phone: ${formData.phone}

EXPEDITION PARAMETERS:
- Requested Tier: ${formData.requestedTier.toUpperCase()}
- Number of Delegates: ${formData.delegatesCount}
- Requested Cohort: ${formData.cohortDate}
- Primary Objective: ${formData.primaryObjective}

LEGAL DECLARATIONS:
- Non-Transaction Guarantee Confirmed: YES
- Passport Vetting & Government Clearance Consent: YES

ACTIVE PROPOSAL NOTES:
${formData.activeProposalDetails || 'None submitted.'}

INSPECTION PROTOCOL:
Amber House / Directorate of Geological Survey and Mines (DGSM)
Entebbe, Republic of Uganda.
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vetting-Application-${applicationRef}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Gated Private Vetting Application
              </h3>
              <p className="text-[11px] text-slate-400 font-mono-data">
                CONFIDENTIAL · RESTRICTED ADMISSION DOSSIER
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Security Notice */}
            <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-[#D4AF37]/30 text-xs text-slate-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#D4AF37]">Admission Protocol: </span>
                Every applicant is pre-screened to ensure compliance with the Uganda Mining Act 2022 and international AML regulations. Unauthorized brokers and unverified syndicates are systematically denied.
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-xs text-rose-300 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Section 1: Executive Profile */}
            <div className="space-y-4">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                1. Executive & Corporate Profile
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Entity / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Precious Metals DMCC"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Executive Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Risk Officer / Managing Director"
                    value={formData.executiveTitle}
                    onChange={e => setFormData({ ...formData, executiveTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country / Primary Jurisdiction *
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <select
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
                      <option value="Switzerland">Switzerland (Geneva / Zurich)</option>
                      <option value="United Kingdom">United Kingdom (London)</option>
                      <option value="United States">United States</option>
                      <option value="China">China / Hong Kong</option>
                      <option value="Singapore">Singapore</option>
                      <option value="India">India (Mumbai)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other Sovereign Jurisdiction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="alexander@apexpm.ae"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Expedition Parameters */}
            <div className="space-y-4">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                2. Expedition Parameters & Package Tier
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EXPEDITION_PACKAGES.map((pkg) => {
                  const isSelected = formData.requestedTier === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setFormData({ ...formData, requestedTier: pkg.id })}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#182232] border-[#D4AF37] shadow'
                          : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono-data font-bold text-[#D4AF37]">
                        {pkg.tierNumber}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-mono-data text-slate-300 font-semibold mt-1">
                        ${pkg.priceUsd.toLocaleString()} USD
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Requested Cohort Date
                  </label>
                  <select
                    value={formData.cohortDate}
                    onChange={e => setFormData({ ...formData, cohortDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {UPCOMING_COHORTS.map((c) => (
                      <option key={c.id} value={c.dates}>{c.dates} ({c.status})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Number of Accompanying Delegates
                  </label>
                  <select
                    value={formData.delegatesCount}
                    onChange={e => setFormData({ ...formData, delegatesCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1}>1 Principal Delegate</option>
                    <option value={2}>2 Delegates (Principal + Legal Counsel)</option>
                    <option value={3}>3 Delegates (Executive Delegation)</option>
                    <option value={4}>4 Delegates (Full Corporate Board Delegation)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Objectives & Proposal Notes */}
            <div className="space-y-4">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                3. Due Diligence Objectives & Active Offers
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Mandate
                </label>
                <select
                  value={formData.primaryObjective}
                  onChange={e => setFormData({ ...formData, primaryObjective: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Anti-Fraud & Scam Immunity">Anti-Fraud & Scam Immunity (Deconstructing Counterfeit Offers)</option>
                  <option value="Physical Gold Sourcing & Refinery Setup">Physical Gold Sourcing & Direct Refinery Verification</option>
                  <option value="Mining Concession & Title Audit">Mining Concession Acquisition & Cadastre Title Audit</option>
                  <option value="ESG & Supply Chain Compliance">ESG, ICGLR & Responsible Mineral Supply Chain Compliance</option>
                  <option value="Academic & Policy Research">Academic, Legal & Institutional Policy Research</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Active Offer or Seller Details (Optional for Day 2 / Day 7 Forensic Audit)
                </label>
                <textarea
                  rows={2}
                  placeholder="If you have received an FCO or contract, paste key terms here (claimed quantity, price discount %, seller name, transit claims) for pre-vetting."
                  value={formData.activeProposalDetails}
                  onChange={e => setFormData({ ...formData, activeProposalDetails: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Section 4: Mandatory Legal Declarations */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                4. Statutory Declarations
              </div>

              <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.nonTransactionAgreed}
                  onChange={e => setFormData({ ...formData, nonTransactionAgreed: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>
                  <strong>Strict Non-Transaction Agreement:</strong> I acknowledge that the Uganda Gold Expedition does NOT sell physical bullion, broker commercial mineral sales, or receive transaction finder fees. The mission is strictly forensic, educational, and due-diligence oriented.
                </span>
              </label>

              <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.passportVettingConsent}
                  onChange={e => setFormData({ ...formData, passportVettingConsent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>
                  <strong>Government Protocol & Passport Vetting Consent:</strong> I agree to submit certified passport copies and corporate registration certificates upon provisional acceptance for Ministry of Energy & Mineral Development security clearance.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400">
                Response SLA: 24 Hours via Encrypted Channel
              </span>
              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] rounded transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Submit Private Vetting Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono-data text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                APPLICATION RECORDED IN REGISTRY
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Vetting Dossier Received
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Your application has been registered into the secure admissions database. Our compliance directorate will review your entity credentials against the Uganda DGSM and AML compliance standards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs font-mono-data">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Dossier Reference:</span>
                <span className="text-[#D4AF37] font-bold">{applicationRef}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Principal:</span>
                <span className="text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Corporate Entity:</span>
                <span className="text-white">{formData.companyName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Selected Tier:</span>
                <span className="text-[#D4AF37] uppercase">{formData.requestedTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cohort Target:</span>
                <span className="text-emerald-400">{formData.cohortDate}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadDossier}
                className="px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>Download Vetting Receipt (.txt)</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
              >
                Return to Expedition Overview
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              A formal confirmation notice has been queued for {formData.email}.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
