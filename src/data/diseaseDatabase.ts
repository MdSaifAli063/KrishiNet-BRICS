import { DiseasePrediction } from '../types';

export interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  category: 'cotton' | 'soybean' | 'maize' | 'healthy';
  description: string;
  svgIcon: string;
  expectedPrediction: DiseasePrediction;
  lowConfidenceTest?: boolean;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'cotton-blight',
    name: 'Cotton Leaf Blight & Spotting',
    crop: 'Cotton (Gossypium hirsutum)',
    category: 'cotton',
    description: 'Angular water-soaked lesions bounded by veinlets, turning reddish-brown.',
    svgIcon: 'cotton-blight',
    expectedPrediction: {
      diseaseName: 'Cotton Bacterial Blight (Angular Leaf Spot)',
      pathogen: 'Xanthomonas citri pv. malvacearum',
      confidence: 93,
      severity: 'Moderate',
      symptoms: [
        'Angular water-soaked leaf spots turning dark brown or black',
        'Vein blight with blackened leaf veins causing early leaf drop',
        'Water-soaked lesions on young developing bolls',
      ],
      organicTreatment: [
        'Foliar spray with Copper Hydroxide (approved organic rate) + Agrimycin bio-surfactant',
        'Bio-formulation drench using Pseudomonas fluorescens (20g / 10L water)',
        'Ensure inter-row airflow and avoid overhead flood irrigation',
        'Incorporate Trichoderma harzianum into soil around the root zone',
      ],
      chemicalWarning: 'RESTRICTED USE: Synthetic bactericides (e.g., Streptocycline) should strictly remain a reserve option. Always use nitrile gloves, respirator mask, and adhere to a 14-day pre-harvest withholding interval. Never spray during high bee pollination hours.',
      chemicalActiveIngredient: 'Copper Oxychloride 50% WP + Streptomycin Sulphate 9% w/w',
      escalationNeeded: false,
    },
  },
  {
    id: 'soybean-rust',
    name: 'Asian Soybean Rust (Puccinia)',
    crop: 'Soybean (Glycine max)',
    category: 'soybean',
    description: 'Minute tan-to-brown pustules on underside of lower leaves with powdery urediniospores.',
    svgIcon: 'soybean-rust',
    expectedPrediction: {
      diseaseName: 'Asian Soybean Rust (Ferrugem Asiática)',
      pathogen: 'Puccinia pachyrhizi',
      confidence: 91,
      severity: 'Severe',
      symptoms: [
        'Small, polygonal lesions visible on lower leaf surfaces',
        'Volcano-shaped pustules (uredinia) discharging light brown spores',
        'Premature yellowing and rapid defoliation reducing pod fill',
      ],
      organicTreatment: [
        'Immediate morning application of Bacillus subtilis (biological fungicide barrier)',
        'Foliar application of concentrated Horsetail (Equisetum) silica extract',
        'Deploy neem seed kernel extract (NSKE 5%) with cold-pressed emulsifier',
        'Prune heavily infested bottom senescent leaves and solarize in clear bags',
      ],
      chemicalWarning: 'HIGH DRIFT DANGER: Triazole/Strobilurin fungicides require strict PPE Level 3, specialized anti-drift nozzles, and an EPA/MAPA 21-day buffer distance from natural water reservoirs. Rapid pathogen resistance develops with repeated single-site chemicals.',
      chemicalActiveIngredient: 'Azoxystrobin 200 g/L + Cyproconazole 80 g/L',
      escalationNeeded: true, // Severe severity triggers escalation to extension officer
    },
  },
  {
    id: 'maize-armyworm',
    name: 'Maize Fall Armyworm Chewing',
    crop: 'Maize (Zea mays)',
    category: 'maize',
    description: 'Windowpaning of leaf tissue, ragged deep whorl holes with moist sawdust frass.',
    svgIcon: 'maize-armyworm',
    expectedPrediction: {
      diseaseName: 'Fall Armyworm (Spodoptera frugiperda) Infestation',
      pathogen: 'Spodoptera frugiperda (Lepidoptera)',
      confidence: 88,
      severity: 'Moderate',
      symptoms: [
        'Papery "windowpane" lesions eaten by early instar larvae',
        'Ragged holes in expanding whorl leaves giving shotgun appearance',
        'Prominent yellowish-brown sawdust-like frass inside the central leaf funnel',
      ],
      organicTreatment: [
        'Apply Bacillus thuringiensis (Bt subsp. kurstaki) directly into leaf whorls at dusk',
        'Place small pinches of fine sand or wood ash mixed with chili powder into whorls',
        'Deploy Spodoptera-specific nuclear polyhedrosis virus (SfNPV bio-pesticide)',
        'Release Trichogramma chilonis egg parasitoids (50,000 wasps / ha)',
      ],
      chemicalWarning: 'TOXICITY HAZARD: Synthetic pyrethroids and Emamectin Benzoate decimate beneficial non-target predators (spiders, earwigs). Use only when whorl damage exceeds 20% threshold. Wear full eye goggles and face respirator.',
      chemicalActiveIngredient: 'Chlorantraniliprole 18.5% SC or Spinetoram 11.7% SC',
      escalationNeeded: false,
    },
  },
  {
    id: 'unknown-leaf-spot',
    name: 'Atypical Leaf Lesion (Ambiguous)',
    crop: 'Mixed Field Leaf',
    category: 'healthy',
    description: 'Irregular marginal chlorosis with unknown mechanical or nutritional blotching.',
    svgIcon: 'unknown-leaf',
    lowConfidenceTest: true,
    expectedPrediction: {
      diseaseName: 'Suspected Potassium Deficiency or Early Cercospora Spot',
      pathogen: 'Ambiguous Etiology (Potential abiotic or fungal)',
      confidence: 62, // Low confidence (< 75%) -> Triggers escalation to Extension Officer!
      severity: 'Mild',
      symptoms: [
        'Yellowing along the outer leaf margins progressing inward',
        'Faint necrotic brown speckling without distinct fungal fruiting bodies',
        'Inconclusive symptomology under standard field lighting',
      ],
      organicTreatment: [
        'Conduct a rapid soil test for available potassium (K) and exchangeable cations',
        'Apply foliar wood ash extract or sulphate of potash derived from organic molasses vinasse',
        'Quarantine affected plants and monitor progression over 48 hours',
      ],
      chemicalWarning: 'DO NOT APPLY RESIDUAL CHEMICALS WITHOUT CONFIRMED DIAGNOSIS: Indiscriminate chemical spraying risks chemical phytotoxicity and beneficial soil microbe suppression.',
      chemicalActiveIngredient: 'Hold chemical intervention pending laboratory microscopic leaf swab',
      escalationNeeded: true, // Low confidence (< 75%) forces extension officer escalation
    },
  },
];

export const FALLBACK_PREDICTIONS: DiseasePrediction[] = [
  {
    diseaseName: 'Cotton Bacterial Blight (Angular Leaf Spot)',
    pathogen: 'Xanthomonas citri pv. malvacearum',
    confidence: 86,
    severity: 'Moderate',
    symptoms: ['Angular lesions bounded by veins', 'Leaf wilting and early drop'],
    organicTreatment: [
      'Spray Pseudomonas fluorescens bio-agent',
      'Copper Hydroxide at approved organic dosage',
      'Trichoderma harzianum root drench',
    ],
    chemicalWarning: 'Wear PPE. Keep 14-day pre-harvest interval. Avoid water drift.',
    chemicalActiveIngredient: 'Copper Oxychloride 50% WP',
    escalationNeeded: false,
  },
  {
    diseaseName: 'Alternaria Macrospora Leaf Spot',
    pathogen: 'Alternaria macrospora',
    confidence: 9,
    severity: 'Mild',
    symptoms: ['Target-like concentric rings on leaves'],
    organicTreatment: ['Neem seed kernel extract 5%', 'Bio-copper foliar'],
    chemicalWarning: 'Observe safety interval if using chemical fungicides.',
    chemicalActiveIngredient: 'Difenoconazole 25% EC',
    escalationNeeded: false,
  },
  {
    diseaseName: 'Nutritional Zinc / Potassium Chlorosis',
    pathogen: 'Abiotic Micro-Nutrient Imbalance',
    confidence: 5,
    severity: 'Mild',
    symptoms: ['Interveinal yellowing with green veins'],
    organicTreatment: ['Chelated zinc spray with vermiwash foliar feed'],
    chemicalWarning: 'No pesticide required; nutritional correction needed.',
    chemicalActiveIngredient: 'None',
    escalationNeeded: false,
  },
];
