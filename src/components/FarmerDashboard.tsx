import React, { useState } from 'react';
import { Farm } from '../types';
import { TRANSLATIONS } from '../data/i18n';
import { Language } from '../types';
import { NdviChart } from './NdviChart';
import { SoilHealthCard } from './SoilHealthCard';
import { WeatherCard } from './WeatherCard';
import { ExtensionOfficerModal } from './ExtensionOfficerModal';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Droplet,
  Leaf,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Send,
  MapPin,
} from 'lucide-react';

interface FarmerDashboardProps {
  farms: Farm[];
  selectedFarm: Farm;
  onSelectFarm: (farm: Farm) => void;
  currentLang: Language;
  onNavigateToAdvisory?: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  farms,
  selectedFarm,
  onSelectFarm,
  currentLang,
  onNavigateToAdvisory,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [taskDone, setTaskDone] = useState(false);
  const [officerModalOpen, setOfficerModalOpen] = useState(false);

  const { todayAction, fieldHealth, ndviHistory, soilHealth, weather, extensionOfficer } =
    selectedFarm;

  // Traffic light color mapping
  const getTrafficStatusBadge = (status: Farm['fieldHealth']['status']) => {
    switch (status) {
      case 'good':
        return {
          bg: 'bg-[#DCFCE7]',
          text: 'text-[#166534]',
          border: 'border-[#86efac]',
          dot: 'bg-[#16A34A]',
          label: t.healthGood,
        };
      case 'moderate':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-300',
          dot: 'bg-amber-500',
          label: t.healthModerate,
        };
      case 'critical':
      default:
        return {
          bg: 'bg-rose-100',
          text: 'text-rose-800',
          border: 'border-rose-300',
          dot: 'bg-rose-600',
          label: t.healthCritical,
        };
    }
  };

  const traffic = getTrafficStatusBadge(fieldHealth.status);

  return (
    <div className="space-y-4 pb-20">
      {/* Farm Selector Dropdown Header */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {t.selectFarm}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-[10px] font-extrabold border border-[#86efac]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                {t.demoBadge}
              </span>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <select
                value={selectedFarm.id}
                onChange={(e) => {
                  const found = farms.find((f) => f.id === e.target.value);
                  if (found) {
                    onSelectFarm(found);
                    setTaskDone(false); // reset task status for new farm
                  }
                }}
                className="w-full sm:w-auto appearance-none bg-stone-50 hover:bg-stone-100/80 text-stone-900 font-extrabold text-base py-2.5 pl-3.5 pr-10 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#16A34A] cursor-pointer transition-colors"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.flag} {f.name} — {f.crop}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-600">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Farm Metadata Pill */}
          <div className="flex items-center gap-3 text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
            <div>
              <span className="text-stone-400 block text-[10px]">Region & Elevation</span>
              <span className="font-semibold text-stone-700 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#16A34A]" /> {selectedFarm.region} ({selectedFarm.elevation})
              </span>
            </div>
            <div className="border-l border-stone-200 pl-3">
              <span className="text-stone-400 block text-[10px]">Area</span>
              <span className="font-semibold text-stone-800">{selectedFarm.areaHectares} ha</span>
            </div>
          </div>
        </div>
      </div>

      {/* BIG "WHAT SHOULD I DO TODAY?" CARD */}
      <div className="bg-gradient-to-br from-[#166534] via-[#15803d] to-[#16A34A] text-white rounded-3xl p-5 shadow-md relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#86efac] animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              {t.whatToDoToday}
            </h2>
          </div>
          <span
            className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
              todayAction.urgency === 'urgent'
                ? 'bg-rose-500/90 text-white'
                : 'bg-emerald-900/60 text-emerald-200 border border-emerald-400/40'
            }`}
          >
            {todayAction.urgency === 'urgent' ? t.urgencyHigh : t.urgencyRec}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight mb-2">
          {todayAction.title}
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mb-3">
          {todayAction.subtitle}
        </p>

        {/* Agronomic Rationale Box */}
        <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-3 border border-white/20 mb-4 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biochemical & Soil Dynamics Rationale</span>
          </div>
          <p className="text-white/95 leading-relaxed">{todayAction.rationale}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-emerald-200">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {todayAction.recommendedTime}
            </span>
            <span className="flex items-center gap-1">
              <Droplet className="w-3 h-3 text-cyan-300" /> {todayAction.waterSavedEstimate}
            </span>
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-300" /> {todayAction.carbonOffsetEstimate}
            </span>
          </div>
        </div>

        {/* Action Button: Mark as Done */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={() => setTaskDone(!taskDone)}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              taskDone
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50'
                : 'bg-white text-[#166534] hover:bg-emerald-50 shadow-sm'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${taskDone ? 'text-emerald-400' : 'text-[#16A34A]'}`}
            />
            {taskDone ? t.taskDone : t.markDone}
          </button>

          {onNavigateToAdvisory && (
            <button
              onClick={onNavigateToAdvisory}
              className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer border border-white/30 flex items-center gap-1.5"
            >
              <span>{t.tabAdvisory}</span>
              <Send className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* TRAFFIC-LIGHT FIELD HEALTH CARD */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-stone-900">
              {t.fieldHealthTitle}
            </h3>
          </div>
          {/* Traffic light pill badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${traffic.bg} ${traffic.text} ${traffic.border}`}
          >
            <span className={`w-2 h-2 rounded-full ${traffic.dot} animate-pulse`} />
            <span className="text-xs font-extrabold">{traffic.label}</span>
          </div>
        </div>

        {/* Health Metrics 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <span className="text-[11px] text-stone-500 block font-medium">Field Index</span>
            <span className="text-xl font-black text-[#166534]">
              {fieldHealth.score}
              <span className="text-xs font-semibold text-stone-400">/100</span>
            </span>
            <span className="text-[10px] text-emerald-700 block mt-0.5 font-bold">
              ✓ Multi-sensor fused
            </span>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <span className="text-[11px] text-stone-500 block font-medium">NDVI Status</span>
            <span className="text-xl font-black text-stone-800">
              {fieldHealth.ndviValue}
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5">
              Canopy Cover: {fieldHealth.canopyCoveragePct}%
            </span>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <span className="text-[11px] text-stone-500 block font-medium">Soil Moisture</span>
            <span className="text-base font-extrabold text-blue-700">
              {fieldHealth.moisturePct}%
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5 truncate">
              {fieldHealth.moistureStatus}
            </span>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <span className="text-[11px] text-stone-500 block font-medium">Pest Pressure</span>
            <span className="text-xs font-extrabold text-stone-800 block truncate">
              {fieldHealth.pestPressure.split('(')[0]}
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5 truncate">
              {fieldHealth.weedLevel}
            </span>
          </div>
        </div>

        {/* Current phenological stage banner */}
        <div className="mt-3 bg-[#f0fdf4] rounded-xl p-2.5 border border-[#bbf7d0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#166534] font-medium">
            <span className="font-bold">{t.currentStage}:</span>
            <span className="font-semibold text-stone-800">{selectedFarm.cropStage}</span>
          </div>
          <span className="text-[11px] font-bold text-[#16A34A]">{selectedFarm.season}</span>
        </div>
      </div>

      {/* NDVI 90-DAY TREND CHART */}
      <NdviChart data={ndviHistory} currentNdvi={fieldHealth.ndviValue} />

      {/* SOIL HEALTH CARD WITH COMPONENT BARS */}
      <SoilHealthCard soilHealth={soilHealth} soilType={selectedFarm.soilType} />

      {/* 7-DAY WEATHER WITH HEAT/FROST/DROUGHT RISKS */}
      <WeatherCard weather={weather} />

      {/* QUICK EXTENSION OFFICER BANNER */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold text-sm shrink-0">
            👨‍🌾
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block">
              Designated Extension Officer
            </span>
            <h4 className="text-sm font-bold text-stone-900">{extensionOfficer.name}</h4>
            <p className="text-xs text-stone-500">{extensionOfficer.organization}</p>
          </div>
        </div>
        <button
          onClick={() => setOfficerModalOpen(true)}
          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#DCFCE7] hover:bg-[#bbf7d0] text-[#166534] font-bold text-xs transition-colors border border-[#86efac] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.contactOfficer}</span>
        </button>
      </div>

      {/* Officer Modal */}
      <ExtensionOfficerModal
        isOpen={officerModalOpen}
        onClose={() => setOfficerModalOpen(false)}
        officer={extensionOfficer}
        farm={selectedFarm}
      />
    </div>
  );
};
