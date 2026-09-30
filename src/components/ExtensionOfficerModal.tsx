import React, { useState } from 'react';
import { ExtensionOfficer, Farm } from '../types';
import { Phone, Mail, MapPin, CheckCircle, Copy, X, UserCheck, MessageSquare } from 'lucide-react';

interface ExtensionOfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  officer: ExtensionOfficer;
  farm: Farm;
  escalationContext?: {
    diseaseName?: string;
    confidence?: number;
    severity?: string;
    photoAttached?: boolean;
  };
}

export const ExtensionOfficerModal: React.FC<ExtensionOfficerModalProps> = ({
  isOpen,
  onClose,
  officer,
  farm,
  escalationContext,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultMessage = `Hello Dr./Eng. ${officer.name},
I am reporting from ${farm.name} (${farm.region}, ${farm.nation}).
Crop: ${farm.crop} (${farm.cropStage}).
Soil Type: ${farm.soilType}.

${
  escalationContext?.diseaseName
    ? `URGENT CONSULTATION NEEDED:
Our KrishiNet-BRICS AI leaf scan detected:
- Suspected: ${escalationContext.diseaseName}
- Confidence: ${escalationContext.confidence}% (Requires physical university/extension officer verification)
- Severity: ${escalationContext.severity}
Please advise on emergency biological or IPM containment protocol.`
    : `I would like your guidance on our regenerative agriculture practices and mid-season soil health testing.`
}

Best regards,
Farmer / Manager at ${farm.name}
Coordinates: ${farm.coordinates}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    // Open whatsapp with encoded message
    const cleanPhone = officer.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="bg-[#166534] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-black text-xl shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-emerald-300 uppercase block">
                Certified Institutional Escalation
              </span>
              <h3 className="text-lg font-bold leading-tight">{officer.name}</h3>
              <p className="text-xs text-emerald-100">{officer.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#14532d] text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Institutional Affiliation */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <span className="font-bold text-stone-900">Organization:</span>
              <span>{officer.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>{officer.district}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <span className="font-bold text-stone-900">Spoken Languages:</span>
              <span>{officer.languages.join(', ')}</span>
            </div>
          </div>

          {/* Drafted Escalation Dossier */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
              <span>Automated Agronomic Escalation Dossier</span>
              <button
                onClick={handleCopy}
                className="text-[#166534] hover:text-[#16A34A] flex items-center gap-1 font-semibold text-[11px]"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-[#16A34A]" /> Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Dossier
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              rows={6}
              value={defaultMessage}
              className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-700 focus:outline-none select-all"
            />
          </div>

          {/* Quick Contact Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Send via WhatsApp
            </button>
            <a
              href={`tel:${officer.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#DCFCE7] hover:bg-[#bbf7d0] text-[#166534] font-bold text-xs transition-colors border border-[#86efac]"
            >
              <Phone className="w-4 h-4" />
              Direct Call ({officer.phone})
            </a>
          </div>

          {/* Email button */}
          <a
            href={`mailto:${officer.email}?subject=${encodeURIComponent(
              `KrishiNet Escalation: ${farm.name} - ${escalationContext?.diseaseName || 'Regenerative Inquiry'}`
            )}&body=${encodeURIComponent(defaultMessage)}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
          >
            <Mail className="w-4 h-4 text-stone-500" />
            Send Official Email to {officer.email}
          </a>

          {/* Safety Disclaimer */}
          <p className="text-[11px] text-stone-500 text-center leading-relaxed">
            BRICS AgriN Protocol 4.2: Direct in-field sampling by certified extension personnel ensures biosecurity integrity before any quarantine measures are applied.
          </p>
        </div>
      </div>
    </div>
  );
};
