import React, { useState } from 'react';
import { NdviDataPoint } from '../types';
import { Info, TrendingUp, CloudRain } from 'lucide-react';

interface NdviChartProps {
  data: NdviDataPoint[];
  currentNdvi: number;
}

export const NdviChart: React.FC<NdviChartProps> = ({ data, currentNdvi }) => {
  const [selectedPoint, setSelectedPoint] = useState<NdviDataPoint>(
    data[data.length - 2] || data[0]
  );

  // SVG dimensions
  const width = 360;
  const height = 180;
  const paddingLeft = 36;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Max rainfall for scaling rainfall bars (bottom)
  const maxRain = Math.max(...data.map((d) => d.rainfallMm), 100);

  // Helper coordinate getters
  const getX = (index: number) => {
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    // NDVI range 0.0 to 1.0
    return paddingTop + (1 - val) * chartHeight;
  };

  // Generate SVG path for NDVI line
  const ndviPath = data.reduce((acc, point, index) => {
    const x = getX(index);
    const y = getY(point.ndvi);
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Generate SVG path for Baseline line (dashed)
  const baselinePath = data.reduce((acc, point, index) => {
    const x = getX(index);
    const y = getY(point.baselineAvg);
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Fill area under NDVI path
  const areaPath = `${ndviPath} L ${getX(data.length - 1)} ${paddingTop + chartHeight} L ${getX(0)} ${paddingTop + chartHeight} Z`;

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-stone-900">
              NDVI 90-Day Vegetation Trajectory
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Sentinel-2 10m Calibrated Multispectral Index
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-stone-500">Current NDVI</span>
          <p className="text-lg font-extrabold text-[#166534] leading-tight">
            {currentNdvi.toFixed(2)}
          </p>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Background grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#94a3b8"
                  fontWeight="500"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Rainfall bars in background */}
          {data.map((point, index) => {
            const x = getX(index);
            const barHeight = (point.rainfallMm / maxRain) * (chartHeight * 0.45);
            const y = paddingTop + chartHeight - barHeight;
            return (
              <rect
                key={`rain-${index}`}
                x={x - 4}
                y={y}
                width={8}
                height={barHeight}
                fill="#bfdbfe"
                rx={1.5}
                opacity={0.65}
              />
            );
          })}

          {/* Gradient Fill under NDVI */}
          <defs>
            <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#ndviGradient)" />

          {/* Baseline historical average path */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Farm actual NDVI path */}
          <path
            d={ndviPath}
            fill="none"
            stroke="#16A34A"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive touch targets / nodes */}
          {data.map((point, index) => {
            const x = getX(index);
            const y = getY(point.ndvi);
            const isSelected = selectedPoint.day === point.day;
            return (
              <g
                key={`point-${index}`}
                className="cursor-pointer"
                onClick={() => setSelectedPoint(point)}
              >
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={7}
                    fill="#DCFCE7"
                    stroke="#16A34A"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 4.5 : 3.5}
                  fill={isSelected ? '#166534' : '#16A34A'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                {/* X-axis labels */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill={isSelected ? '#166534' : '#64748b'}
                  fontWeight={isSelected ? '700' : '500'}
                >
                  {point.day.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Data Inspection Card */}
      <div className="mt-3 bg-stone-50 rounded-xl p-2.5 border border-stone-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
          <div>
            <span className="font-bold text-stone-800">{selectedPoint.day}</span>
            {selectedPoint.stageName && (
              <span className="ml-1.5 text-[11px] text-[#166534] bg-[#DCFCE7] px-1.5 py-0.5 rounded font-medium">
                {selectedPoint.stageName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-stone-500 block">NDVI</span>
            <span className="font-extrabold text-[#166534]">
              {selectedPoint.ndvi.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
              <CloudRain className="w-2.5 h-2.5 text-blue-500" /> Rain
            </span>
            <span className="font-bold text-blue-700">
              {selectedPoint.rainfallMm}mm
            </span>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-[#16A34A] rounded-full inline-block"></span>
            This Field
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-stone-400 inline-block"></span>
            5-Year Regional Avg
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-200 rounded-xs inline-block"></span>
            Rainfall
          </span>
        </div>
        <span className="text-stone-400 flex items-center gap-1">
          <Info className="w-3 h-3" /> Tap node to view
        </span>
      </div>
    </div>
  );
};
