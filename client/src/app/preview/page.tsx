'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Check, Calendar, Clock } from 'lucide-react';

export default function PreviewScreen() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('recommended');
  const [previewData, setPreviewData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('previewData');
    if (data) {
      try {
        setPreviewData(JSON.parse(data));
      } catch (e) {}
    }
  }, []);

  const getDisplayImage = () => {
    const text = ((previewData?.image || '') + ' ' + (previewData?.caption || '')).toLowerCase();
    if (text.includes('chocolate') || text.includes('cocoa') || text.includes('sweet') || text.includes('fudge') || text.includes('truffle') || text.includes('gift')) {
      return '/chocolates.png';
    }
    return '/mango-cake.png';
  };

  const handleSchedule = () => {
    if (!previewData) {
      alert('Post scheduled for ' + selectedTime + '!');
      router.push('/chat');
      return;
    }

    const message = `${previewData.image}\n\n${previewData.caption}\n\n${previewData.hashtags}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    router.push('/dashboard');
  };

  const handleClose = () => {
    router.push('/chat');
  };

  return (
    <main className="min-h-screen w-full flex flex-col overflow-hidden relative bg-cream">
      <header className="h-16 bg-white/90 backdrop-blur-sm shadow-sm z-10 w-full shrink-0 flex items-center justify-center border-b border-black/5">
        <div className="w-full max-w-3xl px-4 md:px-6 h-full flex items-center justify-between">
          <button onClick={handleClose} className="flex items-center gap-2 p-2 hover:bg-black/5 rounded-full transition-colors -ml-2">
            <ArrowLeft size={20} className="text-dark-gray" />
            <span className="font-bold text-brown">Preview Post</span>
          </button>
          <button onClick={handleClose} className="p-2 hover:bg-black/5 rounded-full transition-colors -mr-2">
            <X size={20} className="text-dark-gray" />
          </button>
        </div>
      </header>

      <div className="flex-1 py-6 overflow-y-auto w-full flex flex-col items-center">
        <div className="w-full max-w-md px-4 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 w-full"
        >
          <p className="text-xs font-bold text-dark-gray/40 uppercase tracking-widest px-1">This is how it will look:</p>
          
          <div className="bg-white rounded-card shadow-high overflow-hidden border border-light-gray">
            <div 
              className="w-full aspect-square bg-cover bg-center bg-light-gray flex items-center justify-center text-dark-gray/20 font-bold italic"
              style={{ backgroundImage: `url(${getDisplayImage()})` }}
            >
            </div>
            
            <div className="p-5 space-y-3">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-dark-gray leading-tight">
                  {previewData ? previewData.image : 'Fresh Mango Cake 🥭'}
                </h4>
                <p className="text-sm text-dark-gray/80 leading-relaxed">
                  {previewData ? previewData.caption : 'Just out of the oven! Made with love.'}
                </p>
              </div>
              <p className="text-xs font-bold text-orange tracking-wide">
                {previewData ? previewData.hashtags : '#mangocake #homemade #freshbaking'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 w-full"
        >
          <p className="text-xs font-bold text-dark-gray/40 uppercase tracking-widest px-1">Schedule for:</p>

          <div className="space-y-3">
            {[
              { id: 'recommended', label: 'Today, 6:00 PM', badge: '⭐ Recommended' },
              { id: 'tomorrow', label: 'Tomorrow, 8:00 AM' },
              { id: 'custom', label: 'Pick another time...', icon: <Clock size={16} /> }
            ].map((opt) => (
              <button 
                key={opt.id}
                onClick={() => setSelectedTime(opt.id)}
                className={`w-full flex items-center justify-between p-5 rounded-card border-2 transition-all ${
                  selectedTime === opt.id 
                    ? 'bg-white border-orange shadow-md shadow-orange/5' 
                    : 'bg-white/50 border-transparent hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedTime === opt.id ? 'bg-orange/10 text-orange' : 'bg-dark-gray/5 text-dark-gray/40'
                  }`}>
                    {opt.id === 'custom' ? <Clock size={20} /> : <Calendar size={20} />}
                  </div>
                  <span className={`font-bold ${selectedTime === opt.id ? 'text-brown' : 'text-dark-gray/60'}`}>
                    {opt.label}
                  </span>
                </div>
                {opt.badge && (
                  <span className="text-[10px] font-bold bg-yellow/20 text-yellow px-3 py-1 rounded-full uppercase tracking-wider">
                    {opt.badge}
                  </span>
                )}
                {selectedTime === opt.id && !opt.badge && (
                  <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      <div className="py-4 bg-white/90 backdrop-blur-sm border-t border-light-gray w-full shrink-0 z-10 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <button 
            onClick={handleSchedule}
            className="w-full h-16 bg-whatsapp text-white rounded-btn font-bold text-lg shadow-lg shadow-whatsapp/30 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
            Post to WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}
