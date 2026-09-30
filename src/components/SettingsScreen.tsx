import React from 'react';
import { Language, Farm } from '../types';
import { TRANSLATIONS } from '../data/i18n';
import { Globe, Check, ShieldAlert, BookOpen, Users, Cpu, FileCheck } from 'lucide-react';

interface SettingsScreenProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  farms: Farm[];
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentLang,
  onSelectLang,
  farms,
}) => {
  const t = TRANSLATIONS[currentLang];

  const languages: Array<{ code: Language; name: string; nativeName: string; flag: string; region: string }> = [
    { code: 'en', name: 'English', nativeName: 'English (International)', flag: '🌐', region: 'Global & BRICS Agronomy Standard' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'भारत (ICAR एवं राष्ट्रीय कृषि नेटवर्क)' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Brasil (EMBRAPA e Rede ILPF)' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* LANGUAGE SELECTION CARD */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold">
            <Globe className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-stone-900 leading-tight">
              {t.selectLang}
            </h2>
            <p className="text-xs text-stone-500">
              Multilingual regenerative agriculture terminology
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#DCFCE7] border-[#16A34A] ring-1 ring-[#16A34A] shadow-xs'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900">
                      {lang.nativeName}
                    </h3>
                    <span className="text-xs text-stone-500">{lang.region}</span>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border border-stone-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* EXTENSION OFFICERS DIRECTORY */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#16A34A]" />
          <h3 className="text-base font-extrabold text-stone-900">
            Certified Regional Extension Directory
          </h3>
        </div>
        <p className="text-xs text-stone-500">
          Designated focal extension specialists across the three BRICS demonstration nodes:
        </p>

        <div className="space-y-2.5">
          {farms.map((f) => (
            <div
              key={f.id}
              className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-lg">{f.flag}</span>
                  <span className="text-xs font-black text-stone-900">
                    {f.extensionOfficer.name}
                  </span>
                  <span className="text-[10px] text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-bold">
                    {f.nation}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 font-medium">
                  {f.extensionOfficer.organization}
                </p>
                <span className="text-[10px] text-stone-400">
                  {f.extensionOfficer.district} • {f.extensionOfficer.email}
                </span>
              </div>

              <a
                href={`tel:${f.extensionOfficer.phone}`}
                className="py-1.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 text-center shrink-0"
              >
                Call {f.extensionOfficer.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* INSTITUTIONAL DISCLAIMER CARD */}
      <div className="bg-[#f0fdf4] rounded-3xl p-5 border border-[#86efac] space-y-3">
        <div className="flex items-center gap-2 text-[#166534]">
          <ShieldAlert className="w-5 h-5 text-[#16A34A] shrink-0" />
          <h3 className="text-base font-extrabold">
            Mandatory Institutional Disclaimer
          </h3>
        </div>

        <p className="text-xs text-stone-700 leading-relaxed font-medium">
          <strong>KrishiNet-BRICS</strong> is developed in accordance with the BRICS AgriN Track 4 Framework on Regenerative Agriculture and Biosecurity.
        </p>

        <ul className="space-y-1.5 text-xs text-stone-700">
          <li className="flex items-start gap-2">
            <span className="text-[#16A34A] font-bold">•</span>
            <span>
              <strong>Decision Support Tool:</strong> All model predictions, leaf pathology diagnoses, and weather risk scores are automated decision aids. They do NOT supersede advice from certified local university agronomists or government extension officers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#16A34A] font-bold">•</span>
            <span>
              <strong>Synthetic Outbreak Notice:</strong> Continental pest migration vectors and outbreak heatmaps in this interface are generated from synthetic Sentinel-simulated datasets for protocol illustration.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#16A34A] font-bold">•</span>
            <span>
              <strong>Biosecurity First:</strong> When disease detection confidence is below 75% or severity is rated Severe, physical in-field sampling by certified personnel is strictly recommended.
            </span>
          </li>
        </ul>
      </div>

      {/* PLATFORM SPECIFICATIONS */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-2 text-xs text-stone-600">
        <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
          <Cpu className="w-4 h-4 text-[#16A34A]" />
          <span>Platform Specifications</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-stone-400 block">Theme Scheme</span>
            <span className="font-semibold text-stone-800">
              #16A34A Primary, #166534 Dark, #DCFCE7 Light
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">AI Engine</span>
            <span className="font-semibold text-stone-800">
              Gemini 3.8 Flash Multimodal & Regional Rule Fallback
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Data Privacy</span>
            <span className="font-semibold text-stone-800">
              Local Sovereign Edge + Differential Privacy
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Satellite Calibration</span>
            <span className="font-semibold text-stone-800">
              Sentinel-2 / Landsat-9 10m NDVI Calibrated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
