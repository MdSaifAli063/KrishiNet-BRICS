/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DEMO_FARMS } from './data/farmsData';
import { Farm, Language } from './types';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { FarmerDashboard } from './components/FarmerDashboard';
import { RegenerativeAdvisory } from './components/RegenerativeAdvisory';
import { CropDiseaseScan } from './components/CropDiseaseScan';
import { BricsCooperation } from './components/BricsCooperation';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [selectedFarm, setSelectedFarm] = useState<Farm>(DEMO_FARMS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        selectedFarm={selectedFarm}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-5 py-4">
        {activeTab === 'dashboard' && (
          <FarmerDashboard
            farms={DEMO_FARMS}
            selectedFarm={selectedFarm}
            onSelectFarm={setSelectedFarm}
            currentLang={currentLang}
            onNavigateToAdvisory={() => setActiveTab('advisory')}
          />
        )}

        {activeTab === 'advisory' && (
          <RegenerativeAdvisory farm={selectedFarm} currentLang={currentLang} />
        )}

        {activeTab === 'scan' && (
          <CropDiseaseScan farm={selectedFarm} currentLang={currentLang} />
        )}

        {activeTab === 'brics' && (
          <BricsCooperation currentLang={currentLang} />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            currentLang={currentLang}
            onSelectLang={setCurrentLang}
            farms={DEMO_FARMS}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentLang={currentLang}
      />
    </div>
  );
}
