import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/i18n';
import {
  BRICS_NODES,
  DATA_SOVEREIGNTY_RULES,
  SHARED_MODELS,
  CLIMATE_ANALOGUES,
  SYNTHETIC_OUTBREAK_ZONES,
} from '../data/bricsData';
import {
  Network,
  Lock,
  Share2,
  Cpu,
  Layers,
  Flame,
  AlertTriangle,
  Info,
  CheckCircle2,
  Download,
  ArrowRight,
  Shield,
  Activity,
  MapPin,
} from 'lucide-react';

interface BricsCooperationProps {
  currentLang: Language;
}

export const BricsCooperation: React.FC<BricsCooperationProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedPestFilter, setSelectedPestFilter] = useState<string>('all');
  const [downloadingModelId, setDownloadingModelId] = useState<string | null>(null);

  const filteredOutbreaks =
    selectedPestFilter === 'all'
      ? SYNTHETIC_OUTBREAK_ZONES
      : SYNTHETIC_OUTBREAK_ZONES.filter((z) =>
          z.crop.toLowerCase().includes(selectedPestFilter.toLowerCase())
        );

  const handleSimulateModelDownload = (id: string) => {
    setDownloadingModelId(id);
    setTimeout(() => {
      setDownloadingModelId(null);
    }, 1800);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-[#166534] via-[#15803d] to-[#16A34A] text-white rounded-3xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-emerald-200 px-2.5 py-0.5 rounded-full">
            Inter-Governmental AgriN Architecture
          </span>
          <span className="text-xs text-emerald-200 font-bold">
            🇮🇳 India • 🇧🇷 Brazil • 🇿🇦 South Africa
          </span>
        </div>
        <h2 className="text-xl font-black text-white leading-tight">
          {t.bricsTitle}
        </h2>
        <p className="text-xs text-emerald-100 mt-1 max-w-xl">
          {t.bricsSubtitle}
        </p>

        {/* Global Network Heartbeat */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">Federated Mesh Status: 3 of 3 Sovereign Nodes Active</span>
          </div>
          <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded-md font-mono">
            Protocol: AgriN-gRPC-v4.1
          </span>
        </div>
      </div>

      {/* 3 NATIONAL NODES CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {BRICS_NODES.map((node) => (
          <div
            key={node.countryCode}
            className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{node.flag}</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 leading-tight">
                      {node.country} Node
                    </h3>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {node.location.split('(')[0]}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  {node.status}
                </span>
              </div>

              <p className="text-xs font-semibold text-stone-700 leading-snug mb-2">
                {node.institute}
              </p>

              <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 space-y-1 text-[11px] mb-3">
                <div className="flex justify-between text-stone-600">
                  <span>Sovereign Storage:</span>
                  <span className="font-bold text-stone-800">{node.localDatasetSize}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Inter-node Ping:</span>
                  <span className="font-bold text-[#166534]">{node.latencyMs} ms</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                Specialized Focus
              </span>
              <p className="text-xs text-stone-700 font-medium leading-snug">
                {node.focusArea}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DATA SOVEREIGNTY: WHAT STAYS LOCAL VS WHAT IS SHARED */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#16A34A]" />
            <h3 className="text-base font-extrabold text-stone-900">
              {t.dataSovereignty}
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Strict sovereign data boundaries enforced by decentralized federated edge runtime
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Column 1: Stays Strictly Local */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3">
            <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
              <div className="w-6 h-6 rounded-lg bg-stone-200 flex items-center justify-center text-stone-700">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="text-stone-900">{t.staysLocal}</span>
            </div>

            <div className="space-y-2.5">
              {DATA_SOVEREIGNTY_RULES.staysLocal.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-stone-900">{rule.title}</h5>
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                      {rule.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Shared Across BRICS */}
          <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-[#86efac] space-y-3">
            <div className="flex items-center gap-2 text-[#166534] font-bold text-xs uppercase tracking-wider">
              <div className="w-6 h-6 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
                <Share2 className="w-3.5 h-3.5 text-[#16A34A]" />
              </div>
              <span>{t.sharedBrics}</span>
            </div>

            <div className="space-y-2.5">
              {DATA_SOVEREIGNTY_RULES.sharedAcrossBrics.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-[#bbf7d0] shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-stone-900">{rule.title}</h5>
                    <span className="text-[9px] font-bold text-[#166534] bg-[#DCFCE7] px-1.5 py-0.5 rounded">
                      {rule.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CLIMATE-ANALOGUE CARD ("VIDARBHA RESEMBLES MATO GROSSO") */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#16A34A]" />
            <h3 className="text-base font-extrabold text-stone-900">
              {t.climateAnalogue}
            </h3>
          </div>
          <span className="text-xs font-black text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full border border-[#86efac]">
            Agro-Ecological Twins
          </span>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Climate analogues link geographically distant farming zones facing identical thermal, soil-mechanical, and rainfall stress curves for instant technology and seed exchange.
        </p>

        <div className="space-y-3">
          {CLIMATE_ANALOGUES.map((pair, idx) => (
            <div
              key={idx}
              className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-2.5">
                <div className="flex items-center gap-2 text-sm font-extrabold text-stone-900">
                  <span>{pair.sourceRegion}</span>
                  <ArrowRight className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{pair.analogueRegion}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#166534]">
                  <span>Bioclimatic Match:</span>
                  <span className="bg-[#DCFCE7] px-2 py-0.5 rounded-lg border border-[#86efac]">
                    {pair.similarityScore}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Shared Agro-Ecological Traits:
                </span>
                <ul className="space-y-1 text-xs text-stone-700">
                  {pair.sharedCharacteristics.map((trait, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f0fdf4] p-3 rounded-xl border border-[#bbf7d0] text-xs space-y-1">
                <span className="font-bold text-[#166534] block">
                  Mutual Intelligence Exchange:
                </span>
                <p className="text-stone-800 leading-relaxed">
                  {pair.mutualLearningOpportunity}
                </p>
                <div className="pt-1 text-[11px] font-semibold text-[#16A34A]">
                  Verified Outcome: {pair.provenPracticeExchanged}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHARED MODEL HUB */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#16A34A]" />
            <h3 className="text-base font-extrabold text-stone-900">
              {t.sharedModelHub}
            </h3>
          </div>
          <span className="text-[11px] text-stone-500 font-semibold">
            Open-Weights Federated Models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHARED_MODELS.map((model) => (
            <div
              key={model.id}
              className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                      {model.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono">
                      v{model.version} • {model.downloadSize}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full shrink-0">
                    {model.accuracy}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed my-2">
                  {model.description}
                </p>

                <div className="text-[10px] text-stone-500 mb-3">
                  <span className="font-semibold text-stone-700">Nodes: </span>
                  {model.participatingNodes.join(', ')}
                </div>
              </div>

              <button
                onClick={() => handleSimulateModelDownload(model.id)}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {downloadingModelId === model.id ? (
                  <>
                    <Activity className="w-3.5 h-3.5 text-[#16A34A] animate-spin" />
                    <span>Syncing Federated Weights...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Deploy INT8 Weights</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* OUTBREAK HEATMAP (SYNTHETIC DATA LABELLED AS SUCH) */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-extrabold text-stone-900">
              {t.outbreakHeatmap}
            </h3>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSelectedPestFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                selectedPestFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              All Pests
            </button>
            <button
              onClick={() => setSelectedPestFilter('cotton')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                selectedPestFilter === 'cotton'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Cotton
            </button>
            <button
              onClick={() => setSelectedPestFilter('soybean')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                selectedPestFilter === 'soybean'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Soybean
            </button>
            <button
              onClick={() => setSelectedPestFilter('maize')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                selectedPestFilter === 'maize'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Maize
            </button>
          </div>
        </div>

        {/* Prominent Synthetic Data Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">{t.syntheticNotice}</p>
        </div>

        {/* Heatmap List / Matrix */}
        <div className="space-y-2.5">
          {filteredOutbreaks.map((zone) => {
            const riskBadgeColor =
              zone.riskLevel === 'High'
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : zone.riskLevel === 'Moderate'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-[#DCFCE7] text-[#166534] border-[#86efac]';

            return (
              <div
                key={zone.id}
                className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-stone-900 text-sm">
                      {zone.pestName}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold bg-stone-200/80 px-2 py-0.5 rounded-md">
                      {zone.country} ({zone.crop})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {zone.latitude.toFixed(2)}°, {zone.longitude.toFixed(2)}°
                    </span>
                    <span>• Trend: <strong className="text-stone-700">{zone.trend}</strong></span>
                    <span>• Tracked Cluster: <strong className="text-stone-700">{zone.reportedCasesCount} reports</strong></span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <span
                    className={`text-xs font-black uppercase px-2.5 py-1 rounded-xl border ${riskBadgeColor}`}
                  >
                    Risk: {zone.riskLevel}
                  </span>
                  <span className="text-[9px] text-amber-700 font-bold bg-amber-100/60 px-2 py-0.5 rounded">
                    SYNTHETIC DEMO DATA
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
