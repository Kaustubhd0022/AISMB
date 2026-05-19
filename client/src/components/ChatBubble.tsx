'use client';

import { motion } from 'framer-motion';
import { Message } from '@/store/useStore';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}
    >
      <div className={`max-w-[85%] px-4 py-3 shadow-md ${
        isUser 
          ? 'bg-orange text-white rounded-t-2xl rounded-bl-2xl' 
          : 'bg-white text-dark-gray rounded-t-2xl rounded-br-2xl'
      }`}>
        {message.text.split('\n').map((line, i) => (
          <p key={i} className="text-sm md:text-base">{line}</p>
        ))}
      </div>
      <span className="text-[10px] text-dark-gray/40 mt-1 px-1">
        {message.timestamp}
      </span>
    </motion.div>
  );
}
