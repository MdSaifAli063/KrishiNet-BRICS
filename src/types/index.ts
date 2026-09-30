export type Language = 'en' | 'hi' | 'pt';

export type FarmId = 'india-maharashtra' | 'brazil-matogrosso' | 'sa-freestate';

export interface TodayAction {
  title: string;
  subtitle: string;
  urgency: 'urgent' | 'recommended' | 'routine';
  rationale: string;
  recommendedTime: string;
  waterSavedEstimate: string;
  carbonOffsetEstimate: string;
}

export interface FieldHealth {
  status: 'good' | 'moderate' | 'critical';
  score: number; // 0 - 100
  ndviValue: number; // e.g. 0.72
  moistureStatus: string;
  moisturePct: number;
  pestPressure: string;
  weedLevel: string;
  canopyCoveragePct: number;
}

export interface NdviDataPoint {
  day: string; // e.g. "Day 10", "Jul 15"
  ndvi: number; // 0.0 - 1.0
  baselineAvg: number;
  rainfallMm: number;
  stageName?: string;
}

export interface SoilHealth {
  totalScore: number; // 0 - 100
  soc: number; // % e.g. 0.85%
  socTarget: number; // % e.g. 1.5%
  microbialRespiration: number; // score 0-100
  whc: number; // Water Holding Capacity score 0-100
  npkBalance: number; // score 0-100
  ph: number; // e.g. 7.4
  bulkDensity: string; // e.g. "1.32 g/cm³"
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: 'sun' | 'cloud-rain' | 'cloud' | 'wind' | 'cloud-sun';
  rainProb: number;
  heatRisk: 'Low' | 'Medium' | 'High';
  frostRisk: 'Low' | 'Medium' | 'High';
  droughtRisk: 'Low' | 'Medium' | 'High';
}

export interface ExtensionOfficer {
  name: string;
  organization: string;
  role: string;
  phone: string;
  email: string;
  district: string;
  languages: string[];
}

export interface Farm {
  id: FarmId;
  name: string;
  nation: string;
  nationCode: 'IN' | 'BR' | 'ZA';
  flag: string;
  region: string;
  crop: string;
  cropVariety: string;
  cropStage: string;
  season: string;
  soilType: string;
  areaHectares: number;
  elevation: string;
  coordinates: string;
  todayAction: TodayAction;
  fieldHealth: FieldHealth;
  ndviHistory: NdviDataPoint[];
  soilHealth: SoilHealth;
  weather: WeatherDay[];
  extensionOfficer: ExtensionOfficer;
}

export interface CropSuitability {
  cropName: string;
  suitabilityScore: number; // 0 - 100
  season: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  soilCarbonPotential: 'High' | 'Very High' | 'Moderate';
  marketDemand: string;
  intercropPair: string;
  reason: string;
}

export interface RegenerativePractice {
  id: string;
  title: string;
  category: 'Soil Armor' | 'Microbiome' | 'Water' | 'Biodiversity';
  costLevel: 'Low' | 'Medium' | 'High';
  costCostEstimate: string;
  roiTimeline: string;
  description: string;
  benefits: string[];
  co2SequestrationKgPerHa: number;
  waterRetentionGainPct: number;
}

export interface ActionCalendarItem {
  id: string;
  week: string;
  title: string;
  description: string;
  practiceType: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface DiseasePrediction {
  diseaseName: string;
  pathogen: string;
  confidence: number; // 0 - 100
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
  organicTreatment: string[];
  chemicalWarning: string;
  chemicalActiveIngredient: string;
  escalationNeeded: boolean;
}

export interface BricsNode {
  country: string;
  countryCode: 'IN' | 'BR' | 'ZA';
  flag: string;
  institute: string;
  location: string;
  status: 'Operational' | 'Syncing' | 'Offline';
  latencyMs: number;
  localDatasetSize: string;
  federatedContribution: string;
  focusArea: string;
}

export interface SharedModel {
  id: string;
  name: string;
  version: string;
  domain: string;
  accuracy: string;
  participatingNodes: string[];
  description: string;
  lastUpdated: string;
  downloadSize: string;
}

export interface ClimateAnalogue {
  sourceRegion: string;
  analogueRegion: string;
  similarityScore: number; // 0-100
  sharedCharacteristics: string[];
  mutualLearningOpportunity: string;
  provenPracticeExchanged: string;
}

export interface OutbreakZone {
  id: string;
  country: string;
  crop: string;
  pestName: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  trend: 'Rising' | 'Stable' | 'Declining';
  reportedCasesCount: number;
  syntheticLabel: string;
  latitude: number;
  longitude: number;
}
