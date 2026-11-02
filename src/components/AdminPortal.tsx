import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  CreditCard, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ContentPost, PhotoItem, ExpeditionRegistration, StaffMember, PaymentRecord } from '../types';

interface AdminPortalProps {
  posts: ContentPost[];
  photos: PhotoItem[];
  registrations: ExpeditionRegistration[];
  staff: StaffMember[];
  payments: PaymentRecord[];
  onAddPost: (post: Omit<ContentPost, 'id' | 'date'>) => void;
  onDeletePost: (id: string) => void;
  onAddPhoto: (photo: Omit<PhotoItem, 'id' | 'dateAdded'>) => void;
  onDeletePhoto: (id: string) => void;
  onUpdateRegistration: (id: string, updates: Partial<ExpeditionRegistration>) => void;
  onClose: () => void;
  onSwitchToStaff: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  posts,
  photos,
  registrations,
  staff,
  payments,
  onAddPost,
  onDeletePost,
  onAddPhoto,
  onDeletePhoto,
  onUpdateRegistration,
  onClose,
  onSwitchToStaff
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'photos' | 'registrations' | 'payments' | 'staff' | 'gateway'>('registrations');
  
  // Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Field Dispatch' | 'Regulatory Alert' | 'Intelligence Briefing' | 'Market Update'>('Field Dispatch');
  const [newPostSummary, setNewPostSummary] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('Directorate Editorial');
  const [showPostModal, setShowPostModal] = useState(false);

  // Photo Form State
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Field Operations' | 'Assay Lab' | 'VIP Transport' | 'Refinery' | 'Concessions'>('Field Operations');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostBody) return;
    onAddPost({
      title: newPostTitle,
      category: newPostCategory,
      summary: newPostSummary || newPostTitle,
      body: newPostBody,
      author: newPostAuthor,
      published: true
    });
    setNewPostTitle('');
    setNewPostSummary('');
    setNewPostBody('');
    setShowPostModal(false);
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle || !newPhotoUrl) return;
    onAddPhoto({
      title: newPhotoTitle,
      caption: newPhotoCaption || newPhotoTitle,
      imageUrl: newPhotoUrl,
      category: newPhotoCategory
    });
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
    setShowPhotoModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#111722] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base font-bold text-white">
                UGANDA GOLD EXPEDITION
              </span>
              <span className="text-[10px] font-mono-data bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded font-bold uppercase">
                Administrator Panel
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sovereign Field Operations, Editorial CMS & KYC Ledger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToStaff}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Switch to Staff Portal</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-[#0B0F17] border-b border-slate-800/80 px-4 sm:px-8 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'registrations'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Registrations & KYC ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'content'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Content & Articles ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'photos'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Photo Gallery ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payments'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Relworx Card Logs ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'staff'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Directory ({staff.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gateway')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gateway'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Relworx Gateway Config</span>
        </button>
      </div>

      {/* Panel Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: REGISTRATIONS & KYC */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Delegate Registrations & KYC Clearances
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audited under Uganda Mining Act 2022. Note: <strong className="text-[#D4AF37]">USD 1,000 KYC Fee is non-refundable</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                  {registrations.filter(r => r.kycPaymentStatus === 'paid').length} KYC Paid
                </span>
                <span className="text-xs font-mono-data text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-1 rounded">
                  {registrations.filter(r => r.kycPaymentStatus === 'pending').length} KYC Pending
                </span>
              </div>
            </div>

            {/* Registrations List */}
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 hover:border-slate-700 p-5 space-y-4 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-xs font-bold text-[#D4AF37]">
                          {reg.id}
                        </span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-400 font-mono-data">
                          {reg.registeredAt}
                        </span>
                        <span className={`text-[10px] font-mono-data px-2 py-0.5 rounded font-bold uppercase ${
                          reg.status === 'approved' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : reg.status === 'under_review'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {reg.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {reg.fullName} <span className="text-xs text-slate-400 font-normal">({reg.executiveTitle})</span>
                      </h4>
                      <div className="text-xs text-slate-300">
                        {reg.companyName} · <span className="text-slate-400">{reg.country}</span>
                      </div>
                    </div>

                    {/* KYC Payment Status & Quick Tier */}
                    <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                      <div className="p-2.5 rounded bg-[#0B0F17] border border-slate-800 text-right">
                        <div className="text-[10px] font-mono-data text-slate-400 uppercase">
                          USD 1,000 KYC FEE
                        </div>
                        <div className={`text-xs font-mono-data font-bold ${
                          reg.kycPaymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {reg.kycPaymentStatus === 'paid' ? 'PAID (NON-REFUNDABLE)' : 'PENDING PAYMENT'}
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#0B0F17] border border-slate-800 text-right">
                        <div className="text-[10px] font-mono-data text-slate-400 uppercase">
                          EXPEDITION TIER
                        </div>
                        <div className="text-xs font-mono-data text-[#D4AF37] font-bold uppercase">
                          {reg.requestedTier} ({reg.delegatesCount} PAX)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Objectives */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-[#0B0F17] p-3 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Contact Info:</span>
                      <span className="text-slate-300">{reg.email}</span>
                      <span className="text-slate-400 block font-mono-data">{reg.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Target Cohort:</span>
                      <span className="text-white font-medium">{reg.cohortDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Assigned Staff Lead:</span>
                      <span className="text-[#D4AF37]">{reg.assignedStaff || 'Unassigned'}</span>
                    </div>
                  </div>

                  {/* Active Proposal Note if submitted */}
                  {reg.activeProposalDetails && (
                    <div className="p-2.5 rounded bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200">
                      <span className="font-bold text-amber-400">Target Offer Submitted for Audit: </span>
                      {reg.activeProposalDetails}
                    </div>
                  )}

                  {/* Admin Audit Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.passportVerified}
                          onChange={(e) => onUpdateRegistration(reg.id, { passportVerified: e.target.checked })}
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">Passport Verified</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.interpolClear}
                          onChange={(e) => onUpdateRegistration(reg.id, { interpolClear: e.target.checked })}
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">Interpol Clear</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.dgsmClearance}
                          onChange={(e) => onUpdateRegistration(reg.id, { dgsmClearance: e.target.checked })}
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">DGSM Security Seal</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { kycPaymentStatus: 'paid' })}
                        className="px-2.5 py-1 text-xs text-emerald-400 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800 rounded transition-colors"
                      >
                        Confirm $1k KYC Paid
                      </button>
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { status: 'approved' })}
                        className="px-3 py-1 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
                      >
                        Approve Clearance
                      </button>
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { status: 'flagged' })}
                        className="px-2.5 py-1 text-xs text-rose-400 hover:text-white bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800 rounded transition-colors"
                      >
                        Flag Case
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT & ARTICLES */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Field Dispatches & Regulatory Articles
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish authoritative updates directly visible across the public intelligence feed.
                </p>
              </div>

              <button
                onClick={() => setShowPostModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Article / Dispatch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 p-5 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-data text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 uppercase font-bold">
                        {post.category}
                      </span>
                      <span className="text-[11px] font-mono-data text-slate-500">
                        {post.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">By {post.author}</span>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950/40"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO GALLERY MANAGEMENT */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Photo Asset & Vault Media Manager
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage high-resolution physical imagery from field pitheads, refinery assays, and VIP air transfers.
                </p>
              </div>

              <button
                onClick={() => setShowPhotoModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl overflow-hidden bg-[#111722] border border-slate-800 flex flex-col justify-between group shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0F17]">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#0B0F17]/85 px-2 py-0.5 rounded text-[10px] font-mono-data text-[#D4AF37] border border-slate-700">
                      {photo.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{photo.caption}</p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono-data text-slate-500">
                      <span>Added: {photo.dateAdded}</span>
                      <button
                        onClick={() => onDeletePhoto(photo.id)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950/40"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RELWORX PAYMENT LOGS */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Relworx Card Gateway Transactions (Visa & Mastercard)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time API log of all card transactions. Strictly Cards only; zero mobile money transactions permitted.
              </p>
            </div>

            <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#182232] text-slate-400 font-mono-data border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Tx Reference</th>
                    <th className="py-3 px-4">Delegate</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Card Brand</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono-data text-slate-300">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-[#141C2B] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#D4AF37]">{p.reference}</td>
                      <td className="py-3 px-4 font-sans text-white">{p.customerName}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {p.type === 'deposit_kyc' ? 'USD 1k KYC Deposit' : 'Full Package'}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        ${p.amount.toLocaleString()} {p.currency}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#0B0F17] border border-slate-700 text-slate-200">
                          {p.cardBrand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px]">{p.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: STAFF DIRECTORY */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Due Diligence Staff Directory
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Accredited field logistics leads, forensic metallurgists, and legal counsel assigned to delegations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((s) => (
                <div key={s.id} className="p-5 rounded-xl bg-[#111722] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{s.name}</h4>
                    <span className="text-[10px] font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                      {s.activeCasesCount} Active Cases
                    </span>
                  </div>
                  <div className="text-xs text-[#D4AF37] font-medium">{s.role}</div>
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 space-y-1 font-mono-data">
                    <div>Email: <span className="text-slate-200">{s.email}</span></div>
                    <div>Phone: <span className="text-slate-200">{s.phone}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GATEWAY SETTINGS */}
        {activeTab === 'gateway' && (
          <div className="space-y-6 max-w-2xl">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Relworx Visa & Mastercard Gateway Configuration
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configured for Visa and Mastercard card payment requests. (No mobile money permitted).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#111722] border border-slate-800 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-mono-data block mb-1">API Endpoint URL:</span>
                <input
                  type="text"
                  readOnly
                  value="https://payments.relworx.com/api/visa/request-session"
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-slate-200 font-mono-data text-xs"
                />
              </div>

              <div>
                <span className="text-slate-400 font-mono-data block mb-1">Environment Variable Keys:</span>
                <div className="p-3 bg-[#0B0F17] rounded border border-slate-800 font-mono-data text-[11px] text-slate-300 space-y-1">
                  <div>RELWORX_API_KEY=&quot;YOUR_API_KEY&quot;</div>
                  <div>RELWORX_ACCOUNT_NO=&quot;YOUR_ACCOUNT_NUMBER&quot;</div>
                </div>
              </div>

              <div className="p-3 rounded bg-[#0B0F17] border border-emerald-800/50 text-emerald-300">
                <span className="font-bold">Settings Status: </span>
                Proxy router <code className="font-mono text-white">/api/payments/relworx-session</code> is active with automatic fallback simulation and seamless live activation once keys are set.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: New Content Post */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Create New Field Dispatch / Article</h4>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. Busia Gold Corridor Production Update"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={newPostCategory}
                    onChange={(e: any) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  >
                    <option value="Field Dispatch">Field Dispatch</option>
                    <option value="Regulatory Alert">Regulatory Alert</option>
                    <option value="Intelligence Briefing">Intelligence Briefing</option>
                    <option value="Market Update">Market Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={newPostAuthor}
                    onChange={(e) => setNewPostAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Executive Summary</label>
                <input
                  type="text"
                  value={newPostSummary}
                  onChange={(e) => setNewPostSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Brief 1-line headline teaser"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Article Body / Observations *</label>
                <textarea
                  rows={4}
                  required
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Detailed findings and forensic recommendations..."
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Photo */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Post New Field Inspection Photo</h4>
              <button onClick={() => setShowPhotoModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePhoto} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. Entebbe Bonded Vault Smelting Unit"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. /src/assets/images/... or https://..."
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e: any) => setNewPhotoCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                >
                  <option value="Field Operations">Field Operations</option>
                  <option value="Assay Lab">Assay Lab</option>
                  <option value="VIP Transport">VIP Transport</option>
                  <option value="Refinery">Refinery</option>
                  <option value="Concessions">Concessions</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Technical description of equipment or site coordinates"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
                >
                  Add Photo to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
