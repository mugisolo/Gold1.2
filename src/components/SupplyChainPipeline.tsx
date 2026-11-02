import React, { useState } from 'react';
import { Pickaxe, Factory, Flame, ShieldAlert, PlaneTakeoff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface SupplyChainPipelineProps {
  currentLang: Language;
}

interface StepDetail {
  id: string;
  stageNumber: string;
  name: string;
  location: string;
  realEntity: string;
  fraudRisk: string;
  dueDiligenceAction: string;
  icon: any;
}

export const SupplyChainPipeline: React.FC<SupplyChainPipelineProps> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: StepDetail[] = [
    {
      id: 'extraction',
      stageNumber: '01',
      name: 'Extraction & Pithead Origin',
      location: 'Mubende, Kassanda, Busia, Karamoja',
      realEntity: 'Licensed Artisanal Mining Associations & Large Scale Leases',
      fraudRisk: 'Fictitious mines, non-existent 500kg stockpiles, illegal mercury panning, zero environmental rehabilitation.',
      dueDiligenceAction: 'Physical GPS boundary audit against DGSM Cadastre portal; direct verification of extraction volumes.',
      icon: Pickaxe
    },
    {
      id: 'consolidation',
      stageNumber: '02',
      name: 'Regional Dealer Consolidation',
      location: 'Local Trading Hubs & Kampala Aggregators',
      realEntity: 'Mineral Dealer License (MDL) Holders',
      fraudRisk: 'Unlicensed intermediaries claiming sovereign mandate; illicit cross-border smuggling from DRC without ICGLR trace.',
      dueDiligenceAction: 'Audit of dealer tax identification, URA withholding tax compliance, and ICGLR chain-of-custody logbooks.',
      icon: Factory
    },
    {
      id: 'smelting-assay',
      stageNumber: '03',
      name: 'Smelting & Fire Assay (Cupellation)',
      location: 'Bonded Gold Refineries (Entebbe / Kampala)',
      realEntity: 'ISO-Accredited Metallurgical Smelters & Laboratories',
      fraudRisk: 'Surface-only XRF scans that miss hollow tungsten bars or copper-alloy cores; forged paper assay certificates.',
      dueDiligenceAction: 'Core-drilling molten sampling followed by classical lead cupellation Fire Assay in accredited laboratory.',
      icon: Flame
    },
    {
      id: 'customs-taxation',
      stageNumber: '04',
      name: 'URA Customs & Statutory Export Levy',
      location: 'Uganda Revenue Authority (URA) Customs Directorate',
      realEntity: 'URA Electronic Single Window (ASYCUDA World)',
      fraudRisk: 'Fake tax clearance stamps, requests for cash export fee payoffs, counterfeit Bank of Uganda declarations.',
      dueDiligenceAction: 'Direct verification of electronic assessment numbers through official government revenue portal.',
      icon: ShieldAlert
    },
    {
      id: 'armored-dispatch',
      stageNumber: '05',
      name: 'Armored Transit & Airside Export',
      location: 'Entebbe International Airport (EBB) Bonded Vault',
      realEntity: 'Accredited Secure Logistics (Brinks, Malca-Amit, G4S)',
      fraudRisk: 'Unescorted private vehicle transport, fake diplomat passenger couriers, non-manifest air cargo scams.',
      dueDiligenceAction: 'Armed security manifest directly to airline hold under bilateral customs clearance (CIF Zurich/Dubai).',
      icon: PlaneTakeoff
    }
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="food-chain" className="py-20 bg-[#0E141F] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
            <span>THE REAL SUPPLY CHAIN ARCHITECTURE</span>
            <span className="text-slate-600">·</span>
            <span>END-TO-END PHYSICAL CHAIN OF CUSTODY</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The East African Gold Food Chain
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Deconstruct every link from the red-earth pitheads of Mubende to the tarmac bonded vault at Entebbe. See exactly where illegal syndicates insert fraudulent choke points.
          </p>
        </div>

        {/* Step Buttons Pipeline Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 relative ${
                  isSelected 
                    ? 'bg-[#182232] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10' 
                    : 'bg-[#111722] border-slate-800 hover:border-slate-700 hover:bg-[#141C2B]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono-data font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                    STAGE {step.stageNumber}
                  </span>
                  <div className={`p-1.5 rounded ${isSelected ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-slate-800 text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className={`text-sm font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {step.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {step.location}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-data font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/20">
                  STAGE {currentStep.stageNumber} OF 05
                </span>
                <span className="text-xs text-slate-400">{currentStep.location}</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-2">
                {currentStep.name}
              </h3>
            </div>
            <div className="text-xs text-slate-400 bg-[#0B0F17] px-3.5 py-2 rounded-lg border border-slate-800 self-start md:self-center">
              <span className="text-slate-400">Institutional Counterparty: </span>
              <span className="text-white font-medium">{currentStep.realEntity}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* The Fraud Vulnerability */}
            <div className="p-5 rounded-lg bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>The Counterfeit Vulnerability & Trap</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.fraudRisk}
              </p>
              <div className="mt-4 pt-3 border-t border-rose-900/30 text-[11px] text-rose-300">
                Warning: Unaudited paper guarantees at this stage lead to irrevocable wire losses.
              </div>
            </div>

            {/* The Expedition Due Diligence Verification */}
            <div className="p-5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Uganda Gold Expedition Physical Verification</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.dueDiligenceAction}
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-900/30 text-[11px] text-emerald-300 font-mono-data">
                Delegates inspect physical registers, live tests, and official government seals in person.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
