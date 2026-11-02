import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { PackageTier } from '../types';
import { EXPEDITION_PACKAGES } from '../data/expeditionData';

interface CardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: 'academic' | 'trader' | 'sovereign';
  defaultPaymentType?: 'deposit' | 'full' | 'doc_verification';
}

export const CardPaymentModal: React.FC<CardPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedTier = 'trader',
  defaultPaymentType = 'deposit'
}) => {
  const [tier, setTier] = useState<'academic' | 'trader' | 'sovereign'>(selectedTier);
  const [paymentType, setPaymentType] = useState<'deposit' | 'full' | 'doc_verification'>(defaultPaymentType);
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentPkg = EXPEDITION_PACKAGES.find(p => p.id === tier) || EXPEDITION_PACKAGES[1];
  
  // Explicitly USD 1,000 KYC deposit or USD 2,500 Document Verification per user instructions
  const KYC_DEPOSIT_AMOUNT = 1000;
  const DOC_VERIFICATION_AMOUNT = 2500;
  const totalAmount =
    paymentType === 'deposit'
      ? KYC_DEPOSIT_AMOUNT
      : paymentType === 'doc_verification'
      ? DOC_VERIFICATION_AMOUNT
      : currentPkg.priceUsd;

  const handleInitiateCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardholderName || !email) {
      setErrorMsg('Please enter cardholder name and billing email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/payments/relworx-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'USD',
          payment_type: paymentType,
          description:
            paymentType === 'doc_verification'
              ? 'One-Off AI + Staff Officer 1 Document Verification Service (USD 2,500 · 24h Report)'
              : `Uganda Gold Expedition: ${currentPkg.name} (${paymentType === 'deposit' ? 'Non-Refundable USD 1000 KYC Deposit' : 'Full Payment'})`,
          customer_email: email,
          customer_name: cardholderName,
          package_tier: paymentType === 'doc_verification' ? 'One-Off Document Verification ($2,500)' : currentPkg.name
        })
      });

      const data = await res.json();
      if (data.success) {
        setPaymentResult(data);
      } else {
        setErrorMsg(data.message || 'Payment session generation failed.');
      }
    } catch (err: any) {
      setErrorMsg('Could not connect to payment gateway service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Visa & Mastercard Payment
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono-data">
                RELWORX GATEWAY · CARDS ONLY · NO MOBILE MONEY
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

        {!paymentResult ? (
          <form onSubmit={handleInitiateCardPayment} className="p-6 space-y-4">
            
            {/* MANDATORY USD 1,000 KYC / USD 2,500 VERIFICATION NOTICE */}
            <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-600/60 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white">Notice to Applicant: </strong>
                Expedition registrations include a <strong className="text-white font-bold underline">strictly non-refundable USD $1,000 KYC fee</strong>. Standalone AI + Staff Officer 1 document verification is a <strong className="text-emerald-300 font-bold">one-off USD $2,500 service</strong> (report delivered within 24 hours).
              </div>
            </div>

            {/* Accepted Cards Badge */}
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Accepted:</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[11px] font-bold tracking-wider">
                  VISA
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800 text-[11px] font-bold tracking-wider">
                  MASTERCARD
                </span>
              </div>
              <span className="text-[10px] font-mono-data text-rose-400">
                No Mobile Money
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Tier Selector */}
            {paymentType !== 'doc_verification' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Expedition Package Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setTier(pkg.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        tier === pkg.id
                          ? 'bg-[#182232] border-[#D4AF37] text-white'
                          : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono-data text-[#D4AF37]">{pkg.tierNumber}</div>
                      <div className="text-xs font-bold truncate">{pkg.name.split(' ')[0]}</div>
                      <div className="text-[11px] font-mono-data text-slate-300 mt-0.5">
                        ${pkg.priceUsd.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Type: USD 1,000 KYC vs USD 2,500 Doc Verification vs Full */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Payment Service / Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentType('deposit')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'deposit'
                      ? 'bg-[#182232] border-[#D4AF37]'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">KYC Deposit</span>
                    <span className="text-xs font-mono-data text-[#D4AF37] font-bold">$1,000</span>
                  </div>
                  <p className="text-[10px] text-amber-300/90 mt-1 font-mono-data">
                    Non-refundable KYC
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('doc_verification')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'doc_verification'
                      ? 'bg-emerald-950/50 border-emerald-400'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Doc Audit</span>
                    <span className="text-xs font-mono-data text-emerald-400 font-bold">$2,500</span>
                  </div>
                  <p className="text-[10px] text-emerald-300/90 mt-1 font-mono-data">
                    AI + Officer 1 (24h)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'full'
                      ? 'bg-[#182232] border-[#D4AF37]'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Full Package</span>
                    <span className="text-xs font-mono-data text-[#D4AF37] font-bold">
                      ${currentPkg.priceUsd.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Incl. $1,000 KYC
                  </p>
                </button>
              </div>
            </div>

            {/* Cardholder Information */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cardholder Name (Visa / Mastercard) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MARCUS CHEN"
                  value={cardholderName}
                  onChange={e => setCardholderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Receipt Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@chencapital.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Total Due Summary */}
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-data text-slate-400 uppercase">Total Billed to Card</span>
                <div className="text-xs text-slate-300 font-medium">
                  {paymentType === 'deposit'
                    ? 'KYC Verification Deposit'
                    : paymentType === 'doc_verification'
                    ? 'One-Off AI + Officer 1 Document Verification (24h SLA)'
                    : currentPkg.name}
                </div>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#D4AF37] font-mono-data">
                ${totalAmount.toLocaleString()} USD
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Relworx Visa/Mastercard Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Relworx Card Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Processed under Relworx API v2. Strictly Visa & Mastercard.</span>
            </div>

          </form>
        ) : (
          /* Payment Session Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono-data text-emerald-400 uppercase tracking-wider font-semibold">
                CARD SESSION GENERATED
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                Relworx Card Session Ready
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Your Visa/Mastercard checkout session has been initialized. Note: USD $1,000 KYC deposit is non-refundable.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 text-left space-y-2 text-xs font-mono-data max-w-sm mx-auto">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Card Reference:</span>
                <span className="text-[#D4AF37] font-bold">{paymentResult.reference}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Total Charged:</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">KYC Status:</span>
                <span className="text-amber-400 font-bold">$1,000 Non-Refundable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Network:</span>
                <span className="text-emerald-400 font-bold">Visa / Mastercard</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={paymentResult.payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Authorize Card on Relworx Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setPaymentResult(null);
                  onClose();
                }}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
