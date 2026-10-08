import React, { useState } from 'react';
import { Send, Camera, MapPin, CheckCircle2, X } from 'lucide-react';
import { BetulTehsil } from '../../types';

interface CitizenReporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const TEHSILS: BetulTehsil[] = [
  'Betul',
  'Multai',
  'Amla',
  'Bhainsdehi',
  'Shahpur',
  'Chicholi',
  'Athner',
  'Ghoradongri',
  'Sarni',
];

export const CitizenReporterModal: React.FC<CitizenReporterModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [headline, setHeadline] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState<BetulTehsil>('Betul');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onSubmitSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-[#686868]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#171717]">
              बैतूल सिटिज़न रिपोर्टर (Send News to Newsroom)
            </h3>
            <p className="text-xs text-[#686868]">
              अपने क्षेत्र की घटना, समस्या या उपलब्धि की जानकारी बैतूल टॉक्स तक पहुंचाएं
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center my-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-bold text-base text-emerald-900">समाचार प्राप्त हुआ!</h4>
            <p className="text-xs text-emerald-700 mt-1">
              बैतूल टॉक्स डेस्क द्वारा सत्यापन के पश्चात इसे प्रकाशित किया जाएगा। धन्यवाद!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-3">
            <div>
              <label className="block text-xs font-bold text-[#171717] mb-1">
                घटना / खबर का शीर्षक *
              </label>
              <input
                type="text"
                required
                placeholder="उदा. मुलताई में भारी बारिश से नदी उफान पर..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  स्थान / तहसील *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as BetulTehsil)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                >
                  {TEHSILS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  आपका मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 94250..."
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] mb-1">
                विस्तृत विवरण (Details) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="स्थान, समय और मुख्य घटनाक्रम की जानकारी..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>न्यूज़ रूम भेजें</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
