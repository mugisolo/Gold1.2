import { ContentPost, PhotoItem, StaffMember, FieldLog, PaymentRecord, ExpeditionRegistration, DocumentVerification } from '../types';

export const INITIAL_POSTS: ContentPost[] = [
  {
    id: 'post-1',
    title: 'DGSM Releases Updated 2026 Mineral Cadastre Registry Standards',
    category: 'Regulatory Alert',
    summary: 'The Ministry of Energy & Mineral Development in Entebbe has synchronized biometric dealer licenses with the national online cadastre portal.',
    body: 'Under the Mining and Minerals Act 2022, all physical gold dealers must maintain real-time digital registries tied to the ICGLR Regional Certification Mechanism. Our field teams confirmed full API integration at Amber House this quarter.',
    author: 'Adv. David Kigozi (Legal Counsel)',
    date: '2026-05-02',
    published: true
  },
  {
    id: 'post-2',
    title: 'Field Audit: Kassanda Pithead Artisanal Sluicing Margins',
    category: 'Field Dispatch',
    summary: 'Boots-on-the-ground survey reveals current pithead pricing holding at only 1.5% below international LBMA spot cash.',
    body: 'Contrary to claims by fraudulent syndicates offering 20% discounts, licensed artisanal associations in Mubende and Kassanda are operating with direct aggregator cash settlements at near-spot parity. Any pitch proposing double-digit discounts remains an advance-fee decoy.',
    author: 'Eng. Sarah Nakato (Field Operations)',
    date: '2026-04-28',
    published: true
  },
  {
    id: 'post-3',
    title: 'Metallurgical Alert: Synthetic Tungsten-Core Dore Bars Detected in Regional Market',
    category: 'Intelligence Briefing',
    summary: 'Our Entebbe forensic laboratory deconstructed 3 counterfeit bars featuring gold cladding over sintered tungsten powder.',
    body: 'Handheld surface XRF analyzers read 99.8% pure gold on the surface cladding, but density immersion testing and ultrasonic speed measurements immediately exposed the composite core. Standard Fire Assay cupellation remains non-negotiable for all physical transfers.',
    author: 'Dr. Michael Ssemwogerere (Chief Metallurgist)',
    date: '2026-04-21',
    published: true
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Sovereign Metallurgical Inspection Vault',
    caption: 'Granite inspection bench with precision XRF analyzer and pure gold Dore bar under forensic lighting.',
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-05-01'
  },
  {
    id: 'photo-2',
    title: 'Scam Academy Forensics Desk',
    caption: 'Fire assay crucibles, digital micro-balance displaying troy ounces, and seized counterfeit title deeds.',
    imageUrl: '/src/assets/images/scam_academy_forensics_1793632189342.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-04-29'
  },
  {
    id: 'photo-3',
    title: 'Chartered VIP Helicopter Field Transfer',
    caption: 'Bell 412 executive helicopter air-bridge connecting Entebbe tarmac directly with Busia industrial concession.',
    imageUrl: '/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg',
    category: 'VIP Transport',
    dateAdded: '2026-04-25'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    email: 'mwesigye@ugandagold.org',
    role: 'Senior Due Diligence Officer',
    phone: '+256 772 400 119',
    activeCasesCount: 6
  },
  {
    id: 'staff-2',
    name: 'Dr. Michael Ssemwogerere',
    email: 'ssemwogerere@ugandagold.org',
    role: 'Metallurgical Forensic Lead',
    phone: '+256 701 332 890',
    activeCasesCount: 4
  },
  {
    id: 'staff-3',
    name: 'Adv. David Kigozi',
    email: 'kigozi@ugandagold.org',
    role: 'Legal Compliance Counsel',
    phone: '+256 782 551 240',
    activeCasesCount: 6
  },
  {
    id: 'staff-4',
    name: 'Eng. Sarah Nakato',
    email: 'nakato@ugandagold.org',
    role: 'Field Logistics Lead',
    phone: '+256 754 118 702',
    activeCasesCount: 3
  }
];

export const INITIAL_DOCUMENT_VERIFICATIONS: DocumentVerification[] = [
  {
    id: 'DOC-VER-2026-4401',
    clientName: 'Henrik Lindqvist',
    companyName: 'Nordic Bullion Treasury AB',
    email: 'h.lindqvist@nordicbullion.se',
    phone: '+46 8 501 2290',
    documentType: 'Full Corporate Offer (FCO)',
    claimedSeller: 'Victoria Nile Gold Syndicate Ltd',
    claimedQuantityKg: '150 kg',
    claimedDiscountPercent: '22% below LBMA',
    documentTextOrNotes: 'FCO claims 150kg Au Dore bars stored at Entebbe customs warehouse. Requests $65,000 USD wire to private legal counsel escrow for URA 5% export clearance before buyer can view bars.',
    fileName: 'FCO_VictoriaNile_150KG_Stamped.pdf',
    feeUsd: 2500,
    paymentStatus: 'paid',
    paymentRef: 'UGE-CARD-DOC-4401',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'assigned_to_staff_1',
    submittedAt: '2026-05-01 11:20 UTC',
    slaDeadline: '2026-05-02 11:20 UTC (Within 24 Hours)',
    aiAnalysis: {
      riskScore: 98,
      verdict: 'CRITICAL COUNTERFEIT RISK',
      executiveSummary: 'AI Forensic Deconstruction confirms textbook Advance-Fee Gold Fraud. A 22% discount on liquid bullion is economically impossible, and URA never collects export tax via private attorney escrow accounts.',
      redFlags: [
        '22% below LBMA spot discount is a mathematical impossibility in physical bullion markets.',
        'Upfront $65,000 fee routed to a private lawyer account instead of official URA ASYCUDA tax portal.',
        'Seller entity "Victoria Nile Gold Syndicate Ltd" does not hold an active Mineral Dealer License (MDL) in the 2026 DGSM Cadastre.'
      ],
      statutoryCrossCheck: 'Violates Section 142 of the Uganda Mining and Minerals Act 2022 & URA Single Customs Territory statutory payment rules.',
      staffActionPlan: [
        'Staff Officer 1 to pull official DGSM negative registry certificate for client dossier.',
        'Cross-reference attorney escrow bank coordinates with FIA financial intelligence alert list.',
        'Compile final signed PDF audit report and dispatch to Henrik Lindqvist within 24-hour SLA.'
      ]
    },
    staffFollowUpNotes: 'DGSM search confirmed entity is unlicensed. Preparing final stamped verification report for client dispatch.'
  },
  {
    id: 'DOC-VER-2026-3910',
    clientName: 'Alexander Vance',
    companyName: 'Apex Precious Metals DMCC',
    email: 'a.vance@apexmetals.ae',
    phone: '+971 50 882 1902',
    documentType: 'DGSM Mineral License',
    claimedSeller: 'Kassanda Consolidated Gold Mines Ltd',
    claimedQuantityKg: '200 kg',
    claimedDiscountPercent: '18% below LBMA',
    documentTextOrNotes: 'Submitted alleged DGSM License #MDL-2026-0094 and URA customs bond forms for 200kg Dore bars from Kassanda.',
    fileName: 'DGSM_License_Kassanda_0094.pdf',
    feeUsd: 2500,
    paymentStatus: 'paid',
    paymentRef: 'UGE-CARD-DOC-3910',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'dispatched_to_client',
    submittedAt: '2026-04-28 08:40 UTC',
    slaDeadline: '2026-04-29 08:40 UTC (Completed in 14h)',
    aiAnalysis: {
      riskScore: 94,
      verdict: 'CRITICAL COUNTERFEIT RISK',
      executiveSummary: 'Forged DGSM Mineral Dealer License detected. Serial number #MDL-2026-0094 belongs to an expired industrial limestone quarry permit, and the QR holographic seal is digitally superimposed.',
      redFlags: [
        'License serial #MDL-2026-0094 is registered to a non-precious minerals quarry in Tororo, not Kassanda.',
        '18% discount offer coupled with advance security logistics fee prior to Entebbe refinery fire assay.',
        'Counterfeit Commissioner signature stamp from 2019 regulatory template.'
      ],
      statutoryCrossCheck: 'Confirmed fraudulent instrument under Uganda Mining and Minerals Act 2022.',
      staffActionPlan: [
        'Verified physical DGSM registry ledger in Entebbe.',
        'Issued certified negative verification certificate to client.'
      ]
    },
    staffFollowUpNotes: 'APPROVED & RELEASED BY STAFF OFFICER 1: Physical check at Entebbe DGSM Cadastre confirmed license #MDL-2026-0094 is a forgery. Full report unlocked for client download.'
  }
];

export const INITIAL_REGISTRATIONS: ExpeditionRegistration[] = [
  {
    id: 'REG-2026-8812',
    fullName: 'Alexander Vance',
    companyName: 'Apex Precious Metals DMCC',
    executiveTitle: 'Chief Investment Officer',
    country: 'United Arab Emirates',
    email: 'a.vance@apexmetals.ae',
    phone: '+971 50 882 1902',
    requestedTier: 'sovereign',
    delegatesCount: 2,
    cohortDate: 'May 17 – May 23, 2026',
    primaryObjective: 'Physical Gold Sourcing & Direct Refinery Verification',
    activeProposalDetails: 'Received an offer for 200kg Dore bars at 18% discount from an alleged Kassanda concession. Need forensic validation.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'approved',
    assignedStaff: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    internalNotes: 'Interpol clear. Corporate trade license validated in Dubai DMCC registry. USD 1,000 KYC payment confirmed via Visa.',
    registeredAt: '2026-04-20',
    passportVerified: true,
    interpolClear: true,
    dgsmClearance: true
  },
  {
    id: 'REG-2026-9041',
    fullName: 'Elena Rostova',
    companyName: 'Helvetic Bullion Partners SA',
    executiveTitle: 'Managing Partner',
    country: 'Switzerland',
    email: 'elena@helveticbullion.ch',
    phone: '+41 22 819 0422',
    requestedTier: 'trader',
    delegatesCount: 1,
    cohortDate: 'May 17 – May 23, 2026',
    primaryObjective: 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: 'Auditing 2 WhatsApp contracts with alleged UN transit stamps.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'under_review',
    assignedStaff: 'Adv. David Kigozi',
    internalNotes: 'USD 1,000 KYC fee paid via Mastercard. Passport uploaded; awaiting DGSM security registry cross-match.',
    registeredAt: '2026-04-27',
    passportVerified: true,
    interpolClear: true,
    dgsmClearance: false
  },
  {
    id: 'REG-2026-9218',
    fullName: 'Zhang Wei',
    companyName: 'Sino-East Resource Fund',
    executiveTitle: 'Director of African Commodities',
    country: 'China',
    email: 'zhang.wei@sinoeast-res.com',
    phone: '+86 139 1022 8411',
    requestedTier: 'sovereign',
    delegatesCount: 3,
    cohortDate: 'July 12 – July 18, 2026',
    primaryObjective: 'Mining Concession Acquisition & Cadastre Title Audit',
    activeProposalDetails: 'Evaluating exploration permits in Karamoja gold belt.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'pending',
    status: 'pending_kyc',
    assignedStaff: 'Eng. Sarah Nakato',
    internalNotes: 'Registration received. Pending non-refundable USD 1,000 KYC payment before security dispatch.',
    registeredAt: '2026-05-01',
    passportVerified: false,
    interpolClear: false,
    dgsmClearance: false
  }
];

export const INITIAL_FIELD_LOGS: FieldLog[] = [
  {
    id: 'LOG-701',
    staffName: 'Eng. Sarah Nakato',
    location: 'Mubende Artisanal Belt (Pit 4B)',
    logDate: '2026-04-30',
    title: 'Gravity Concentrator Inspection & Safety Perimeter',
    observations: 'Inspected 3 operational licensed pits. Panning yield consistent with 2.8g/ton rock vein. Local miners reported 2 unauthorized brokers soliciting fake export paperwork.',
    riskAssessment: 'Medium',
    testResults: 'Raw sponge gold density test: 17.8 g/cm³ (approx. 88% Au content).'
  },
  {
    id: 'LOG-702',
    staffName: 'Dr. Michael Ssemwogerere',
    location: 'Kampala Bonded Refinery No. 2',
    logDate: '2026-04-26',
    title: 'Fire Assay Calibration & URA Customs Electronic Seal',
    observations: 'Calibrated laboratory cupellation muffle furnace at 1050°C. Witnessed URA electronic seal application on 25kg export lot destined for Emirates flight.',
    riskAssessment: 'Low',
    testResults: 'Cupellation assay verified 999.6 fine purity. ASYCUDA customs declaration matching.'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-8800',
    reference: 'UGE-CARD-DOC-4401',
    customerName: 'Henrik Lindqvist',
    email: 'h.lindqvist@nordicbullion.se',
    amount: 2500,
    currency: 'USD',
    type: 'doc_verification',
    status: 'Completed',
    cardBrand: 'Visa',
    date: '2026-05-01 11:18',
    tier: 'One-Off Document Verification ($2,500)'
  },
  {
    id: 'PAY-8801',
    reference: 'UGE-CARD-REL-8812',
    customerName: 'Alexander Vance',
    email: 'a.vance@apexmetals.ae',
    amount: 1000,
    currency: 'USD',
    type: 'deposit_kyc',
    status: 'Completed',
    cardBrand: 'Visa',
    date: '2026-04-20 14:22',
    tier: 'Sovereign Executive'
  },
  {
    id: 'PAY-8802',
    reference: 'UGE-CARD-REL-9041',
    customerName: 'Elena Rostova',
    email: 'elena@helveticbullion.ch',
    amount: 1000,
    currency: 'USD',
    type: 'deposit_kyc',
    status: 'Completed',
    cardBrand: 'Mastercard',
    date: '2026-04-27 09:14',
    tier: 'Professional Trader'
  },
  {
    id: 'PAY-8803',
    reference: 'UGE-CARD-REL-7119',
    customerName: 'Tariq Al-Mansoor',
    email: 'tariq@almansoor-gold.ae',
    amount: 10000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Visa',
    date: '2026-04-18 16:45',
    tier: 'Professional Trader'
  }
];
