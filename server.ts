import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Portal in-memory storage (backed by initial data)
let posts = [
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

let photos = [
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

let registrations = [
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
    assignedStaff: 'Lt. Col. (Rtd) Arthur Mwesigye',
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

let fieldLogs = [
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

let payments = [
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
  }
];

// PORTAL API: Get all portal data
app.get('/api/portal/data', (_req: Request, res: Response) => {
  res.json({
    posts,
    photos,
    registrations,
    fieldLogs,
    payments
  });
});

// ADMIN: Add/Edit Content Post
app.post('/api/portal/post', (req: Request, res: Response) => {
  const { title, category, summary, body, author, published = true } = req.body;
  if (!title || !body) {
    return res.status(400).json({ success: false, message: 'Title and body required.' });
  }
  const newPost = {
    id: `post-${Date.now()}`,
    title,
    category: category || 'Intelligence Briefing',
    summary: summary || title,
    body,
    author: author || 'Admin Editorial',
    date: new Date().toISOString().split('T')[0],
    published
  };
  posts.unshift(newPost);
  res.json({ success: true, post: newPost });
});

// ADMIN: Delete Content Post
app.delete('/api/portal/post/:id', (req: Request, res: Response) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// ADMIN: Upload / Post New Photo
app.post('/api/portal/photo', (req: Request, res: Response) => {
  const { title, caption, imageUrl, category } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Title and Image URL required.' });
  }
  const newPhoto = {
    id: `photo-${Date.now()}`,
    title,
    caption: caption || title,
    imageUrl,
    category: category || 'Field Operations',
    dateAdded: new Date().toISOString().split('T')[0]
  };
  photos.unshift(newPhoto);
  res.json({ success: true, photo: newPhoto });
});

// ADMIN: Delete Photo
app.delete('/api/portal/photo/:id', (req: Request, res: Response) => {
  photos = photos.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// REGISTRATION / KYC: Create new expedition registration
app.post('/api/portal/registration', (req: Request, res: Response) => {
  const {
    fullName,
    companyName,
    executiveTitle,
    country,
    email,
    phone,
    requestedTier,
    delegatesCount,
    cohortDate,
    primaryObjective,
    activeProposalDetails,
    nonTransactionAgreed,
    kycAcknowledged
  } = req.body;

  if (!fullName || !email || !companyName) {
    return res.status(400).json({ success: false, message: 'Name, email, and corporate entity required.' });
  }

  const newReg = {
    id: `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    companyName,
    executiveTitle: executiveTitle || 'Executive',
    country: country || 'United Arab Emirates',
    email,
    phone: phone || '',
    requestedTier: requestedTier || 'trader',
    delegatesCount: delegatesCount || 1,
    cohortDate: cohortDate || 'May 17 – May 23, 2026',
    primaryObjective: primaryObjective || 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: activeProposalDetails || '',
    nonTransactionAgreed: Boolean(nonTransactionAgreed),
    kycAcknowledged: Boolean(kycAcknowledged),
    kycPaymentStatus: 'pending',
    status: 'pending_kyc',
    assignedStaff: 'Lt. Col. (Rtd) Arthur Mwesigye',
    internalNotes: 'Applicant notified: USD 1,000 KYC fee is non-refundable.',
    registeredAt: new Date().toISOString().split('T')[0],
    passportVerified: false,
    interpolClear: false,
    dgsmClearance: false
  };

  registrations.unshift(newReg);
  res.json({ success: true, registration: newReg });
});

// STAFF / ADMIN: Update Registration status & KYC audit items
app.patch('/api/portal/registration/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = registrations.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Registration record not found.' });
  }

  registrations[index] = {
    ...registrations[index],
    ...req.body
  };

  res.json({ success: true, registration: registrations[index] });
});

// STAFF: Post Field Inspection Log
app.post('/api/portal/field-log', (req: Request, res: Response) => {
  const { staffName, location, title, observations, riskAssessment, testResults } = req.body;
  if (!location || !observations) {
    return res.status(400).json({ success: false, message: 'Location and observations required.' });
  }

  const newLog = {
    id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    staffName: staffName || 'Field Officer',
    location,
    logDate: new Date().toISOString().split('T')[0],
    title: title || 'Field Observation Report',
    observations,
    riskAssessment: riskAssessment || 'Low',
    testResults: testResults || 'N/A'
  };

  fieldLogs.unshift(newLog);
  res.json({ success: true, log: newLog });
});

// API: Relworx Visa & Mastercard Payment Session Initiation
// Documentation: https://payments.relworx.com/docs/ (API v2)
// Endpoint: https://payments.relworx.com/api/visa/request-session
app.post('/api/payments/relworx-session', async (req: Request, res: Response) => {
  try {
    const { reference, amount, currency = 'USD', description, customer_email, customer_name, package_tier, payment_type } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment amount specified.'
      });
    }

    const relworxApiKey = process.env.RELWORX_API_KEY;
    const relworxAccountNo = process.env.RELWORX_ACCOUNT_NO;

    // Unique reference (8 to 36 chars)
    const txReference = reference || `UGE-CARD-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase();

    // Record the payment intent in payments list
    payments.unshift({
      id: `PAY-${Date.now().toString().slice(-4)}`,
      reference: txReference,
      customerName: customer_name || 'Expedition Delegate',
      email: customer_email || 'client@goldexpedition.org',
      amount: Number(amount),
      currency: currency || 'USD',
      type: payment_type === 'full' ? 'full_payment' : 'deposit_kyc',
      status: 'Completed',
      cardBrand: 'Visa',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tier: package_tier || 'Professional Trader'
    });

    // Check if live API keys are provided
    if (relworxApiKey && relworxAccountNo) {
      try {
        const response = await fetch('https://payments.relworx.com/api/visa/request-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.relworx.v2',
            'Authorization': `Bearer ${relworxApiKey}`
          },
          body: JSON.stringify({
            account_no: relworxAccountNo,
            reference: txReference,
            currency: currency,
            amount: Number(amount),
            description: description || `Uganda Gold Expedition: Non-refundable USD 1000 KYC / ${package_tier || 'Seat'}`
          })
        });

        const data = await response.json();
        return res.json({
          ...data,
          reference: txReference,
          gateway: 'relworx_live'
        });
      } catch (upstreamErr: any) {
        console.error('Relworx upstream error:', upstreamErr);
        return res.status(502).json({
          success: false,
          message: 'Error communicating with Relworx Visa/Mastercard gateway.',
          error: upstreamErr.message
        });
      }
    }

    // Pre-key sandbox / preparation mode:
    const mockPaymentUrl = `https://payments.relworx.com/merchant-payment/mock-session-${Date.now()}/visa-mastercard?ref=${txReference}&amount=${amount}&currency=${currency}`;

    return res.json({
      success: true,
      isDemo: true,
      message: 'Relworx Visa & Mastercard session initialized (Waiting for live RELWORX_API_KEY & RELWORX_ACCOUNT_NO).',
      payment_url: mockPaymentUrl,
      reference: txReference,
      amount: Number(amount),
      currency,
      supportedCards: ['Visa', 'Mastercard'],
      kycNotice: 'USD 1,000 is allocated directly towards sovereign KYC background verification and is non-refundable.'
    });
  } catch (err: any) {
    console.error('Payment session error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while initializing payment session.',
      error: err.message
    });
  }
});

// API: Gateway Configuration Status
app.get('/api/payments/status', (_req: Request, res: Response) => {
  res.json({
    gateway: 'Relworx Payments',
    apiEndpoint: 'https://payments.relworx.com/api/visa/request-session',
    apiVersion: 'vnd.relworx.v2',
    isLiveConfigured: Boolean(process.env.RELWORX_API_KEY && process.env.RELWORX_ACCOUNT_NO),
    supportedMethods: ['Visa', 'Mastercard'],
    mobileMoneyAllowed: false
  });
});

// Mount Vite or static dist
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

setupServer();
