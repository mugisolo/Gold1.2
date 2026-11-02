import React, { useState } from 'react';
import {
  X,
  Shield,
  Lock,
  FileSearch,
  Compass,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  UserCheck,
  CreditCard,
  Search,
  Award,
  ArrowRight,
  FileLock2,
  ShieldCheck,
  Building2,
  Calendar,
  EyeOff
} from 'lucide-react';
import { DocumentVerification, ExpeditionRegistration } from '../types';

interface ClientPortalProps {
  documentVerifications: DocumentVerification[];
  registrations: ExpeditionRegistration[];
  initialClientEmail?: string;
  onClose: () => void;
  onOpenDocVerification: () => void;
  onOpenRegistration: () => void;
  onOpenCardPayment: (tier?: 'academic' | 'trader' | 'sovereign', type?: 'deposit' | 'full' | 'doc_verification') => void;
  onOpenStaffPortal?: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  documentVerifications,
  registrations,
  initialClientEmail = '',
  onClose,
  onOpenDocVerification,
  onOpenRegistration,
  onOpenCardPayment,
  onOpenStaffPortal
}) => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'expeditions'>('verifications');
  const [searchQuery, setSearchQuery] = useState<string>(initialClientEmail);

  // Build unique client list from verifications + registrations for quick switching
  const clientProfiles = Array.from(
    new Map(
      [
        ...documentVerifications.map((d) => ({
          name: d.clientName,
          email: d.email,
          company: d.companyName
        })),
        ...registrations.map((r) => ({
          name: r.fullName,
          email: r.email,
          company: r.companyName
        }))
      ].map((item) => [item.email.toLowerCase(), item])
    ).values()
  );

  // Filter records by search query (email, name, or ID)
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredVerifications = documentVerifications.filter((doc) => {
    if (!normalizedQuery) return true;
    return (
      doc.email.toLowerCase().includes(normalizedQuery) ||
      doc.clientName.toLowerCase().includes(normalizedQuery) ||
      doc.id.toLowerCase().includes(normalizedQuery) ||
      doc.companyName.toLowerCase().includes(normalizedQuery)
    );
  });

  const filteredRegistrations = registrations.filter((reg) => {
    if (!normalizedQuery) return true;
    return (
      reg.email.toLowerCase().includes(normalizedQuery) ||
      reg.fullName.toLowerCase().includes(normalizedQuery) ||
      reg.id.toLowerCase().includes(normalizedQuery) ||
      reg.companyName.toLowerCase().includes(normalizedQuery)
    );
  });

  // Download handler — strictly only callable when status === 'dispatched_to_client'
  const handleDownloadApprovedReport = (doc: DocumentVerification) => {
    if (doc.status !== 'dispatched_to_client') {
      return; // Strictly blocked until analyst approves
    }

    const ai = doc.aiAnalysis;
    const reportContent = `UGANDA GOLD EXPEDITION — CERTIFIED ANALYST-APPROVED FORENSIC REPORT
========================================================================
STATUS: APPROVED & RELEASED BY STAFF OFFICER 1
Dossier Reference: ${doc.id}
Payment Reference: ${doc.paymentRef} ($${doc.feeUsd.toLocaleString()} USD — Relworx Visa/Mastercard)
Submitted Timestamp: ${doc.submittedAt}
Certifying Analyst: ${doc.assignedOfficer}

1. CLIENT & TRANSACTION DOSSIER
------------------------------------------------------------------------
Client Principal: ${doc.clientName} (${doc.companyName})
Registered Email: ${doc.email}
Document Audited: ${doc.documentType} (${doc.fileName})
Claimed Counterparty / Seller: ${doc.claimedSeller}
Claimed Quantity & Terms: ${doc.claimedQuantityKg} @ ${doc.claimedDiscountPercent}

2. CERTIFIED FORENSIC VERDICT & RISK SCORE
------------------------------------------------------------------------
Official Risk Score: ${ai?.riskScore ?? 'N/A'}%
Forensic Verdict: ${ai?.verdict ?? 'COMPLETED'}
Executive Summary:
${ai?.executiveSummary ?? 'Physical registry verification completed by Staff Officer 1.'}

3. IDENTIFIED RED FLAGS & ANOMALIES
------------------------------------------------------------------------
${(ai?.redFlags || []).map((flag, i) => `  [${i + 1}] ${flag}`).join('\n')}

4. STATUTORY CADASTRE & CUSTOMS CROSS-CHECK (DGSM / URA / ICGLR)
------------------------------------------------------------------------
${ai?.statutoryCrossCheck ?? 'Verified against Uganda Mining and Minerals Act 2022.'}

5. STAFF OFFICER 1 FIELD VERIFICATION & SIGN-OFF NOTES
------------------------------------------------------------------------
${doc.staffFollowUpNotes || 'Approved and released for client download by Staff Officer 1.'}

========================================================================
Amber House, Kampala & DGSM Sovereign Registry Desk, Entebbe, Uganda`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Approved-Forensic-Report-${doc.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex flex-col">
      {/* Top Institutional Header */}
      <header className="bg-[#111722] border-b border-[#D4AF37]/30 px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-cinzel text-base sm:text-lg font-bold text-white">
                SECURE CLIENT PORTAL
              </span>
              <span className="text-[10px] font-mono-data bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded font-bold uppercase">
                ENCRYPTED DELEGATE & VERIFICATION DESK
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Track $2,500 Document Verification Status & Booked Expedition Clearances
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDocVerification}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 rounded transition-colors"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Submit New Document ($2,500)</span>
          </button>

          <button
            onClick={onOpenRegistration}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Book Expedition</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Exit Client Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Client Lookup & Embargo Notice Sub-Bar */}
      <div className="bg-[#0B0F17] border-b border-slate-800 px-4 sm:px-8 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search / Client Filter */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by client email, name, or reference (e.g. DOC-VER-2026-4401)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#111722] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Quick Client Account Switcher */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono-data text-slate-400 uppercase mr-1">
                Active Principal:
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className={`px-2.5 py-1 text-[11px] font-mono-data rounded border transition-colors ${
                  searchQuery === ''
                    ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37] font-bold'
                    : 'bg-[#111722] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                All Principals ({documentVerifications.length + registrations.length})
              </button>
              {clientProfiles.map((client) => (
                <button
                  key={client.email}
                  onClick={() => setSearchQuery(client.email)}
                  className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                    searchQuery.toLowerCase() === client.email.toLowerCase()
                      ? 'bg-[#182232] text-[#D4AF37] border-[#D4AF37] font-bold'
                      : 'bg-[#111722] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {client.name}
                </button>
              ))}
            </div>
          </div>

          {/* Strict Report Embargo Policy Badge */}
          <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-700/50 flex items-center gap-2 text-xs text-amber-200 shrink-0">
            <FileLock2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Strict Compliance Rule:</strong> No access to reports or AI findings for view/download until <strong>Staff Officer 1</strong> approves.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#0E141F] border-b border-slate-800 px-4 sm:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-3 py-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'verifications'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Submitted Document Verifications ({filteredVerifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'expeditions'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Booked Expedition Status ({filteredRegistrations.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
        {/* TAB 1: SUBMITTED DOCUMENT VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Document Verification Status ($2,500 Service)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track your submitted contracts and permits. AI-generated and physical audit reports remain strictly locked until approved by <strong className="text-white">Staff Officer 1</strong>.
                </p>
              </div>

              <button
                onClick={onOpenDocVerification}
                className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <FileSearch className="w-4 h-4" />
                <span>Submit New Document for Verification ($2,500)</span>
              </button>
            </div>

            {filteredVerifications.length === 0 ? (
              <div className="rounded-xl bg-[#111722] border border-slate-800 p-10 text-center space-y-3">
                <FileSearch className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Document Verifications Found
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No submitted document verifications match your current filter. Submit a gold FCO, SPA, DGSM license, or URA export permit for a 24-hour forensic audit.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredVerifications.map((doc) => {
                  const isApproved = doc.status === 'dispatched_to_client';

                  return (
                    <div
                      key={doc.id}
                      className={`rounded-2xl bg-[#111722] border p-5 sm:p-7 space-y-6 shadow-xl transition-all ${
                        isApproved ? 'border-emerald-500/50' : 'border-[#D4AF37]/40'
                      }`}
                    >
                      {/* Dossier Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-1 rounded border border-[#D4AF37]/40">
                              {doc.id}
                            </span>
                            <span className="text-xs font-semibold text-white bg-slate-800 px-2.5 py-1 rounded">
                              {doc.documentType}
                            </span>
                            <span className="text-[11px] font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                              Paid: ${doc.feeUsd.toLocaleString()} USD ({doc.paymentRef})
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                            {doc.fileName}{' '}
                            <span className="text-xs font-normal text-slate-400">
                              — Submitted by {doc.clientName} ({doc.companyName})
                            </span>
                          </h3>
                          <div className="text-xs text-slate-300">
                            Claimed Counterparty:{' '}
                            <strong className="text-[#D4AF37]">{doc.claimedSeller}</strong> · Claimed Terms:{' '}
                            <span className="text-white">
                              {doc.claimedQuantityKg} @ {doc.claimedDiscountPercent}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono-data font-bold uppercase">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>ANALYST APPROVED · REPORT UNLOCKED</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/90 border border-amber-600 text-amber-300 text-xs font-mono-data font-bold uppercase">
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                              <span>UNDER STAFF OFFICER 1 REVIEW · REPORT LOCKED</span>
                            </span>
                          )}
                          <span className="text-[11px] font-mono-data text-slate-400">
                            24h SLA Target: <strong className="text-slate-200">{doc.slaDeadline}</strong>
                          </span>
                        </div>
                      </div>

                      {/* 4-Stage Verification Pipeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Step 1 */}
                        <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-emerald-800/60 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-mono-data text-emerald-400 uppercase font-bold">
                              STAGE 1 · COMPLETE
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Dossier & $2,500 Fee
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Visa/Mastercard verified ({doc.submittedAt})
                            </div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-emerald-800/60 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-mono-data text-emerald-400 uppercase font-bold">
                              STAGE 2 · INTERNAL ONLY
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              AI Forensic Scan
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Transmitted exclusively to Staff Officer 1
                            </div>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            isApproved ? 'border-emerald-800/60' : 'border-[#D4AF37]/60'
                          }`}
                        >
                          {isApproved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 animate-pulse" />
                          )}
                          <div>
                            <div
                              className={`text-[10px] font-mono-data uppercase font-bold ${
                                isApproved ? 'text-emerald-400' : 'text-[#D4AF37]'
                              }`}
                            >
                              {isApproved ? 'STAGE 3 · COMPLETE' : 'STAGE 3 · IN PROGRESS'}
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Analyst Registry Audit
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {doc.assignedOfficer}
                            </div>
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            isApproved ? 'border-emerald-500/80' : 'border-slate-800 opacity-75'
                          }`}
                        >
                          {isApproved ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div
                              className={`text-[10px] font-mono-data uppercase font-bold ${
                                isApproved ? 'text-emerald-400' : 'text-slate-500'
                              }`}
                            >
                              {isApproved ? 'STAGE 4 · APPROVED' : 'STAGE 4 · LOCKED'}
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Report Release & Download
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {isApproved
                                ? 'Signed off by Staff Officer 1'
                                : 'Blocked until analyst approval'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* STRICT ACCESS GATING: LOCKED vs ANALYST APPROVED */}
                      {!isApproved ? (
                        <div className="rounded-xl bg-[#0B0F17] border border-amber-700/50 p-5 sm:p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                                <EyeOff className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[11px] font-mono-data text-amber-400 font-bold uppercase tracking-wider">
                                  EMBARGOED DOSSIER · NO PRE-RELEASE REPORT ACCESS
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                                  AI-Generated & Forensic Reports Are Locked Until Analyst Approval
                                </h4>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                                  Your document has been analyzed by our internal AI engine and routed to{' '}
                                  <strong className="text-white">{doc.assignedOfficer}</strong> for physical cross-verification with the Uganda Directorate of Geological Survey and Mines (DGSM) and URA Customs. Per sovereign compliance protocol,{' '}
                                  <strong className="text-amber-300">
                                    no reports—including preliminary AI-generated reports—are viewable or available for download
                                  </strong>{' '}
                                  until the analyst completes verification and approves release (within 24 hours).
                                </p>
                              </div>
                            </div>

                            {/* Strictly Disabled Download Button */}
                            <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                              <button
                                type="button"
                                disabled
                                className="px-4 py-2.5 text-xs font-mono-data font-bold text-slate-500 bg-slate-900 border border-slate-800 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 select-none"
                                title="Report download is disabled until Staff Officer 1 approves the dossier"
                              >
                                <Lock className="w-3.5 h-3.5 text-amber-500" />
                                <span>Download Locked (Awaiting Analyst)</span>
                              </button>
                              {onOpenStaffPortal && (
                                <button
                                  type="button"
                                  onClick={onOpenStaffPortal}
                                  className="text-[11px] text-[#D4AF37] hover:underline font-mono-data text-right"
                                >
                                  Staff Officer 1? Switch to Staff Portal to Approve →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ANALYST APPROVED & UNLOCKED REPORT */
                        <div className="rounded-xl bg-[#0B0F17] border border-emerald-600/50 p-5 sm:p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                              <div>
                                <div className="text-[10px] font-mono-data text-emerald-400 uppercase font-bold">
                                  CERTIFIED & RELEASED BY {doc.assignedOfficer.toUpperCase()}
                                </div>
                                <h4 className="text-sm font-bold text-white">
                                  Official Forensic Verification Report — Verdict:{' '}
                                  <span className="text-rose-400 font-mono-data">
                                    {doc.aiAnalysis?.verdict} (Risk Score: {doc.aiAnalysis?.riskScore}%)
                                  </span>
                                </h4>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadApprovedReport(doc)}
                              className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 shrink-0"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Analyst-Approved Report (.TXT)</span>
                            </button>
                          </div>

                          {doc.aiAnalysis && (
                            <div className="space-y-3 text-xs">
                              <p className="text-slate-200 leading-relaxed">
                                {doc.aiAnalysis.executiveSummary}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                <div className="p-3.5 rounded-lg bg-[#111722] border border-slate-800">
                                  <div className="text-[11px] font-mono-data text-rose-400 uppercase font-bold mb-1.5">
                                    Verified Forensic Red Flags:
                                  </div>
                                  <ul className="space-y-1.5">
                                    {doc.aiAnalysis.redFlags.map((flag, idx) => (
                                      <li key={idx} className="text-slate-300 flex items-start gap-2">
                                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                                        <span>{flag}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-3.5 rounded-lg bg-[#111722] border border-slate-800 space-y-2">
                                  <div>
                                    <div className="text-[11px] font-mono-data text-[#D4AF37] uppercase font-bold mb-1">
                                      Statutory Cross-Check (DGSM / URA):
                                    </div>
                                    <p className="text-slate-300">{doc.aiAnalysis.statutoryCrossCheck}</p>
                                  </div>
                                  {doc.staffFollowUpNotes && (
                                    <div className="pt-2 border-t border-slate-800">
                                      <div className="text-[11px] font-mono-data text-emerald-400 uppercase font-bold mb-1">
                                        Staff Officer 1 Final Endorsement:
                                      </div>
                                      <p className="text-emerald-200">{doc.staffFollowUpNotes}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKED EXPEDITION STATUS TRACKER */}
        {activeTab === 'expeditions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Booked Expedition & Sovereign KYC Status
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Monitor your delegation&apos;s Interpol clearance, DGSM ministry accreditation, and flight manifest status. Note: <strong className="text-[#D4AF37]">USD $1,000 KYC deposit is strictly non-refundable</strong>.
                </p>
              </div>

              <button
                onClick={onOpenRegistration}
                className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Award className="w-4 h-4" />
                <span>Register New Delegation</span>
              </button>
            </div>

            {filteredRegistrations.length === 0 ? (
              <div className="rounded-xl bg-[#111722] border border-slate-800 p-10 text-center space-y-3">
                <Compass className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Booked Expeditions Found
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No expedition registrations match your current filter. Register for our 7-Day Uganda Gold Supply Chain Expedition to begin statutory KYC clearance.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRegistrations.map((reg) => {
                  const tierLabel =
                    reg.requestedTier === 'sovereign'
                      ? 'Tier 3: Ultra-VIP Sovereign Executive ($20,000)'
                      : reg.requestedTier === 'trader'
                      ? 'Tier 2: Professional Trader ($10,000)'
                      : 'Tier 1: Academic & Research ($6,000)';

                  return (
                    <div
                      key={reg.id}
                      className="rounded-2xl bg-[#111722] border border-slate-800 p-5 sm:p-7 space-y-6 shadow-xl"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-1 rounded border border-[#D4AF37]/40">
                              {reg.id}
                            </span>
                            <span className="text-xs font-bold text-white bg-[#182232] border border-[#D4AF37]/30 px-2.5 py-1 rounded">
                              {tierLabel}
                            </span>
                            <span
                              className={`text-[11px] font-mono-data px-2.5 py-1 rounded font-bold uppercase ${
                                reg.kycPaymentStatus === 'paid'
                                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700'
                                  : 'bg-amber-950/70 text-amber-300 border border-amber-700'
                              }`}
                            >
                              {reg.kycPaymentStatus === 'paid'
                                ? '$1,000 Non-Refundable KYC Paid'
                                : '$1,000 Non-Refundable KYC Pending'}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                            {reg.fullName} — <span className="text-[#D4AF37]">{reg.companyName}</span>{' '}
                            <span className="text-xs text-slate-400 font-normal">
                              ({reg.executiveTitle} · {reg.country})
                            </span>
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Cohort: <strong>{reg.cohortDate}</strong></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Delegates: <strong>{reg.delegatesCount}</strong></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Assigned Liaison: <strong>{reg.assignedStaff}</strong></span>
                            </span>
                          </div>
                        </div>

                        {/* Overall Expedition Status Badge */}
                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                          <span
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-data font-bold uppercase border ${
                              reg.status === 'approved'
                                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500'
                                : reg.status === 'under_review'
                                ? 'bg-blue-950/90 text-blue-300 border-blue-500'
                                : reg.status === 'rejected'
                                ? 'bg-rose-950/90 text-rose-300 border-rose-500'
                                : 'bg-amber-950/90 text-amber-300 border-amber-500'
                            }`}
                          >
                            {reg.status === 'approved'
                              ? 'EXPEDITION CLEARED & CONFIRMED'
                              : reg.status === 'under_review'
                              ? 'SECURITY & DGSM VETTING IN PROGRESS'
                              : reg.status === 'rejected'
                              ? 'CLEARANCE DECLINED'
                              : 'AWAITING $1,000 KYC DEPOSIT'}
                          </span>

                          {reg.kycPaymentStatus !== 'paid' && (
                            <button
                              onClick={() => onOpenCardPayment(reg.requestedTier, 'deposit')}
                              className="px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded flex items-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Pay $1,000 KYC Deposit (Visa/MC)</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 4-Stage Expedition Clearance Pipeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.kycPaymentStatus === 'paid' ? 'border-emerald-800/60' : 'border-amber-700/60'
                          }`}
                        >
                          {reg.kycPaymentStatus === 'paid' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 1 · STATUTORY KYC FEE
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              $1,000 Non-Refundable KYC
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.kycPaymentStatus === 'paid' ? 'Confirmed via Relworx Card' : 'Payment required'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.passportVerified ? 'border-emerald-800/60' : 'border-slate-800'
                          }`}
                        >
                          {reg.passportVerified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 2 · IDENTITY DOSSIER
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Passport & Corporate Check
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.passportVerified ? 'Verified by Secretariat' : 'In queue'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.interpolClear ? 'border-emerald-800/60' : 'border-slate-800'
                          }`}
                        >
                          {reg.interpolClear ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 3 · COMPLIANCE SCREEN
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Interpol & Sanctions Audit
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.interpolClear ? 'Cleared — Zero Flags' : 'Under review'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.dgsmClearance && reg.status === 'approved'
                              ? 'border-emerald-500/80'
                              : 'border-slate-800'
                          }`}
                        >
                          {reg.dgsmClearance && reg.status === 'approved' ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 4 · MINISTRY PERMIT
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              DGSM & Refinery Entry Pass
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.dgsmClearance ? 'Authorized for Entebbe arrival' : 'Pending DGSM sign-off'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Liaison Notes */}
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-[10px] font-mono-data text-[#D4AF37] uppercase font-bold block">
                            Liaison Officer Dispatch Note ({reg.assignedStaff}):
                          </span>
                          <p className="text-slate-300 mt-0.5">{reg.internalNotes}</p>
                        </div>

                        {reg.status === 'approved' && (
                          <button
                            onClick={() => onOpenCardPayment(reg.requestedTier, 'full')}
                            className="px-3.5 py-2 text-xs font-semibold text-[#D4AF37] bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 rounded shrink-0 flex items-center gap-1.5"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Settle Full Delegation Balance</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
