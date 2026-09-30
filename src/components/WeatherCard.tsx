import React from 'react';
import { WeatherDay } from '../types';
import { Sun, CloudRain, Cloud, Wind, CloudSun, Calendar } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherDay[];
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const renderWeatherIcon = (icon: WeatherDay['icon']) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'cloud-rain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-stone-400" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-teal-600" />;
      case 'cloud-sun':
      default:
        return <CloudSun className="w-5 h-5 text-amber-500" />;
    }
  };

  const getRiskBadge = (type: 'heat' | 'frost' | 'drought', level: 'Low' | 'Medium' | 'High') => {
    let colorClass = 'bg-stone-100 text-stone-600';
    if (level === 'High') {
      colorClass = type === 'frost' ? 'bg-cyan-100 text-cyan-800' : 'bg-rose-100 text-rose-800';
    } else if (level === 'Medium') {
      colorClass = 'bg-amber-100 text-amber-800';
    } else {
      colorClass = 'bg-[#DCFCE7] text-[#166534]';
    }

    const labelMap = {
      heat: 'Heat',
      frost: 'Frost',
      drought: 'Drought',
    };

    return (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorClass}`}>
        {labelMap[type]}: {level}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#16A34A]" />
          <h3 className="text-sm font-bold text-stone-900">
            7-Day Agronomic Weather & Risk Matrix
          </h3>
        </div>
        <span className="text-[11px] text-stone-500 font-medium">
          Micro-Climate Station Feed
        </span>
      </div>

      {/* Horizontal scrollable forecast cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {weather.map((item, idx) => {
          const isToday = idx === 0;
          return (
            <div
              key={item.day + item.date}
              className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                isToday
                  ? 'bg-[#f0fdf4] border-[#86efac] shadow-xs'
                  : 'bg-stone-50/60 border-stone-200/70 hover:bg-stone-100/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isToday ? 'text-[#166534]' : 'text-stone-700'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[10px] text-stone-400">{item.date}</span>
                </div>

                <div className="my-2 flex items-center justify-center">
                  {renderWeatherIcon(item.icon)}
                </div>

                <div className="text-center">
                  <div className="text-xs font-extrabold text-stone-800">
                    {item.tempMax}° / <span className="text-stone-500 font-semibold">{item.tempMin}°</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                    {item.condition}
                  </div>
                  <div className="text-[10px] font-semibold text-blue-600 mt-0.5">
                    🌧 {item.rainProb}%
                  </div>
                </div>
              </div>

              {/* Agronomic Risk Badges */}
              <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex flex-col gap-1">
                {item.heatRisk !== 'Low' && getRiskBadge('heat', item.heatRisk)}
                {item.frostRisk !== 'Low' && getRiskBadge('frost', item.frostRisk)}
                {item.droughtRisk !== 'Low' && getRiskBadge('drought', item.droughtRisk)}
                {item.heatRisk === 'Low' && item.frostRisk === 'Low' && item.droughtRisk === 'Low' && (
                  <span className="text-[10px] text-center font-semibold text-[#166534] bg-[#DCFCE7] py-0.5 rounded">
                    Safe Window
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
