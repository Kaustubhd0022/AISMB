'use client';

import { motion } from 'framer-motion';
import { Message } from '@/store/useStore';
import { Share2, Edit3, Calendar, Check } from 'lucide-react';

interface SuggestionCardProps {
  message: Message;
  onAction: (action: string) => void;
}

export default function SuggestionCard({ message, onAction }: SuggestionCardProps) {
  if (!message.cardData) return null;

  const getDisplayImage = () => {
    const imgUrl = message.cardData?.imageUrl || '';
    if (!imgUrl || imgUrl.startsWith('http')) {
      const text = ((message.cardData?.image || '') + ' ' + (message.cardData?.caption || '')).toLowerCase();
      if (text.includes('chocolate') || text.includes('cocoa') || text.includes('sweet') || text.includes('fudge') || text.includes('truffle') || text.includes('gift')) {
        return '/chocolates.png';
      }
      return '/mango-cake.png';
    }
    return imgUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[92%] mx-auto bg-white rounded-card shadow-md overflow-hidden mb-6 border border-light-gray"
    >
      <div 
        className="w-full aspect-video bg-cover bg-center"
        style={{ backgroundImage: `url(${getDisplayImage()})` }}
      />
      
      <div className="p-4">
        <h4 className="text-lg font-bold text-dark-gray mb-1">{message.cardData.image}</h4>
        <p className="text-sm text-dark-gray/80 mb-2 leading-snug">{message.cardData.caption}</p>
        <p className="text-xs font-semibold text-orange">{message.cardData.hashtags}</p>
      </div>

      <div className="grid grid-cols-3 border-t border-light-gray">
        <button 
          onClick={() => onAction('approve')}
          className="flex flex-col items-center py-3 gap-1 hover:bg-light-gray transition-colors border-r border-light-gray"
        >
          <Check size={18} className="text-whatsapp" />
          <span className="text-[10px] font-bold text-dark-gray uppercase tracking-wider">Approve</span>
        </button>
        <button 
          onClick={() => onAction('edit')}
          className="flex flex-col items-center py-3 gap-1 hover:bg-light-gray transition-colors border-r border-light-gray"
        >
          <Edit3 size={18} className="text-orange" />
          <span className="text-[10px] font-bold text-dark-gray uppercase tracking-wider">Edit</span>
        </button>
        <button 
          onClick={() => onAction('schedule')}
          className="flex flex-col items-center py-3 gap-1 hover:bg-light-gray transition-colors"
        >
          <Calendar size={18} className="text-info" />
          <span className="text-[10px] font-bold text-dark-gray uppercase tracking-wider">Schedule</span>
        </button>
      </div>
    </motion.div>
  );
}
