import React from 'react';
import { SoilHealth } from '../types';
import { Award, Droplets, Activity, Layers, Compass } from 'lucide-react';

interface SoilHealthCardProps {
  soilHealth: SoilHealth;
  soilType: string;
}

export const SoilHealthCard: React.FC<SoilHealthCardProps> = ({
  soilHealth,
  soilType,
}) => {
  const { totalScore, soc, socTarget, microbialRespiration, whc, npkBalance, ph, bulkDensity } =
    soilHealth;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#16A34A]';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-[#16A34A]';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const socPercentage = Math.min(Math.round((soc / socTarget) * 100), 100);

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-stone-900">
              Soil Health & Bio-Regenerative Index
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">{soilType}</p>
        </div>
        <div className="flex items-baseline gap-1 bg-[#DCFCE7] text-[#166534] px-2.5 py-1 rounded-xl">
          <span className={`text-xl font-black ${getScoreColor(totalScore)}`}>
            {totalScore}
          </span>
          <span className="text-xs font-semibold text-stone-500">/ 100</span>
        </div>
      </div>

      {/* Component progress bars */}
      <div className="space-y-3.5">
        {/* Soil Organic Carbon */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
              Soil Organic Carbon (SOC)
            </span>
            <span className="font-bold text-stone-900">
              {soc}% <span className="font-normal text-stone-400">/ target {socTarget}%</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#16A34A] rounded-full transition-all duration-500"
              style={{ width: `${socPercentage}%` }}
            />
          </div>
        </div>

        {/* Microbial Respiration */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Microbial Respiration & Biomass
            </span>
            <span className="font-bold text-stone-900">{microbialRespiration} / 100</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(microbialRespiration)} rounded-full transition-all duration-500`}
              style={{ width: `${microbialRespiration}%` }}
            />
          </div>
        </div>

        {/* Water Holding Capacity */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Water Holding Capacity (WHC)
            </span>
            <span className="font-bold text-stone-900">{whc}%</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${whc}%` }}
            />
          </div>
        </div>

        {/* NPK & pH balance */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-purple-600" />
              Nutrient Equilibrium (NPK) & pH ({ph})
            </span>
            <span className="font-bold text-stone-900">{npkBalance} / 100</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(npkBalance)} rounded-full transition-all duration-500`}
              style={{ width: `${npkBalance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Micro badges row */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
        <div>
          <span className="text-stone-400 block">Bulk Density</span>
          <span className="font-semibold text-stone-800">{bulkDensity}</span>
        </div>
        <div className="text-right">
          <span className="text-stone-400 block">Carbon Sequestration Phase</span>
          <span className="font-bold text-[#166534]">Accreting (+0.12%/yr)</span>
        </div>
      </div>
    </div>
  );
};
