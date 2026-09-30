import React from 'react';
import { Globe, ShieldCheck, Sprout, AlertCircle } from 'lucide-react';
import { Language, Farm } from '../types';
import { TRANSLATIONS } from '../data/i18n';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  selectedFarm: Farm;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  selectedFarm,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro banner */}
      <div className="bg-[#166534] text-[#DCFCE7] px-3 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
          <span className="truncate">{t.agrinTrack}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#14532d] text-[10px] font-bold text-emerald-300 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {t.demoBadge}
          </span>
        </div>
      </div>

      {/* Main branding row */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shadow-sm shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-stone-900 tracking-tight leading-tight truncate">
                {t.appTitle}
              </h1>
              <span className="text-xs bg-[#DCFCE7] text-[#166534] font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block">
                BRICS AgriN
              </span>
            </div>
            <p className="text-xs text-stone-600 truncate font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Language selector & Node badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden xs:flex items-center gap-1 text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200">
            <span>{selectedFarm.flag}</span>
            <span className="font-semibold text-stone-800">{selectedFarm.nationCode}</span>
          </div>

          <div className="relative">
            <label htmlFor="language-select" className="sr-only">{t.language}</label>
            <div className="flex items-center gap-1 bg-[#DCFCE7] text-[#166534] border border-[#86efac] rounded-lg px-2 py-1">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <select
                id="language-select"
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                aria-label={t.selectLang}
                className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer pr-1"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="pt">Português (PT)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Floating disclaimer line */}
      <div className="bg-[#f0fdf4] border-t border-[#bbf7d0] px-4 py-1 text-[11px] text-[#166534] flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <AlertCircle className="w-3 h-3 text-[#16A34A] shrink-0" />
          <span className="truncate">{t.aiGuidanceDisclaimer}</span>
        </div>
      </div>
    </header>
  );
};
