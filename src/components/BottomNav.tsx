import React from 'react';
import { LayoutDashboard, Sparkles, ScanLine, Network, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';
import { Language } from '../types';

export type TabType = 'dashboard' | 'advisory' | 'scan' | 'brics' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  currentLang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];

  const navItems = [
    { id: 'dashboard' as TabType, label: t.tabDashboard, icon: LayoutDashboard },
    { id: 'advisory' as TabType, label: t.tabAdvisory, icon: Sparkles },
    { id: 'scan' as TabType, label: t.tabScan, icon: ScanLine },
    { id: 'brics' as TabType, label: t.tabBrics, icon: Network },
    { id: 'settings' as TabType, label: t.tabSettings, icon: Globe },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-lg safe-area-bottom">
      <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] min-h-[50px] ${
                isActive
                  ? 'text-[#166534] bg-[#DCFCE7] font-bold'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 text-[#16A34A]' : ''
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                )}
              </div>
              <span className="text-[10px] mt-1 truncate max-w-[68px] leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
