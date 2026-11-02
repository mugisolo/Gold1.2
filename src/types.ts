export type Language = 'EN' | 'AR' | 'ZH' | 'FR';

export type Currency = 'USD' | 'EUR' | 'AED' | 'GBP' | 'CNY';

export interface ItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  location: string;
  timeSlot: string;
  focus: string;
  description: string;
  keyActivities: string[];
  riskDeconstructed: string;
  executiveDeliverable: string;
  image?: string;
}

export interface PackageTier {
  id: 'academic' | 'trader' | 'sovereign';
  name: string;
  tierNumber: string;
  tagline: string;
  priceUsd: number;
  highlighted?: boolean;
  idealFor: string;
  accommodation: string;
  transport: string;
  features: string[];
  deliverables: string[];
  exclusiveBonus?: string;
}

export interface ScamRule {
  id: string;
  label: string;
  description: string;
  riskScore: number;
  category: 'pricing' | 'banking' | 'customs' | 'documentation';
  explanation: string;
}

export interface ExpeditionRegistration {
  id: string;
  fullName: string;
  companyName: string;
  executiveTitle: string;
  country: string;
  email: string;
  phone: string;
  requestedTier: 'academic' | 'trader' | 'sovereign';
  delegatesCount: number;
  cohortDate: string;
  primaryObjective: string;
  activeProposalDetails: string;
  nonTransactionAgreed: boolean;
  kycAcknowledged: boolean; // Confirms non-refundable USD 1000 KYC
  kycPaymentStatus: 'paid' | 'pending' | 'waived';
  status: 'pending_kyc' | 'under_review' | 'approved' | 'flagged' | 'rejected';
  assignedStaff?: string;
  internalNotes?: string;
  registeredAt: string;
  passportVerified?: boolean;
  interpolClear?: boolean;
  dgsmClearance?: boolean;
}

export interface ContentPost {
  id: string;
  title: string;
  category: 'Field Dispatch' | 'Regulatory Alert' | 'Intelligence Briefing' | 'Market Update';
  summary: string;
  body: string;
  author: string;
  date: string;
  published: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Field Operations' | 'Assay Lab' | 'VIP Transport' | 'Refinery' | 'Concessions';
  dateAdded: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Senior Due Diligence Officer' | 'Metallurgical Forensic Lead' | 'Legal Compliance Counsel' | 'Field Logistics Lead';
  phone: string;
  activeCasesCount: number;
}

export interface FieldLog {
  id: string;
  staffName: string;
  location: string;
  logDate: string;
  title: string;
  observations: string;
  riskAssessment: 'Low' | 'Medium' | 'High' | 'Severe';
  testResults?: string;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  amount: number;
  currency: string;
  type: 'deposit_kyc' | 'full_payment';
  status: 'Completed' | 'Pending' | 'Failed';
  cardBrand: 'Visa' | 'Mastercard';
  date: string;
  tier: string;
}
