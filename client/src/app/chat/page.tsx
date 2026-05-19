'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Settings, Send, MessageSquare } from 'lucide-react';
import { useStore, Message } from '@/store/useStore';
import ChatBubble from '@/components/ChatBubble';
import SuggestionCard from '@/components/SuggestionCard';

export default function ChatScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const { businessContext, messages, addMessage, setBusinessContext, setMessages } = useStore();
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync localStorage context with store if available
    const ctx = localStorage.getItem('businessContext');
    if (ctx && !businessContext) {
      try {
        setBusinessContext(JSON.parse(ctx));
      } catch (e) {}
    }

    // Load initial chat data if coming directly from onboarding
    const initialDataStr = localStorage.getItem('initialChatData');
    if (initialDataStr) {
      try {
        const initialData = JSON.parse(initialDataStr);
        const aiMessageId = Date.now().toString();
        const aiMessage: Message = {
          id: aiMessageId,
          sender: 'ai',
          text: initialData.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: initialData.type,
          cardData: initialData.cardData
        };

        if (aiMessage.type === 'suggestion' && aiMessage.cardData) {
           const p = (businessContext?.product || '').toLowerCase();
           aiMessage.cardData.imageUrl = p.includes('chocolate') || p.includes('cocoa') || p.includes('sweet') || p.includes('fudge') || p.includes('truffle') || p.includes('gift')
             ? '/chocolates.png'
             : '/mango-cake.png';
        }

        setMessages([aiMessage]);
        localStorage.removeItem('initialChatData');
      } catch (e) {}
    }
  }, [businessContext, setBusinessContext, setMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAction = (action: string, msg: Message) => {
    if (action === 'edit' || action === 'schedule' || action === 'approve') {
      if (msg.cardData) {
        localStorage.setItem('previewData', JSON.stringify(msg.cardData));
      }
      router.push('/preview');
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addMessage(userMessage);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text,
          context: businessContext
        })
      });
      const resData = await response.json();

      if (resData.success && resData.data) {
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessage: Message = {
          id: aiMessageId,
          sender: 'ai',
          text: resData.data.text,
          timestamp: new Date(resData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: resData.data.type,
          cardData: resData.data.cardData
        };

        if (aiMessage.type === 'suggestion' && aiMessage.cardData) {
           const p = (businessContext?.product || '').toLowerCase();
           aiMessage.cardData.imageUrl = p.includes('chocolate') || p.includes('cocoa') || p.includes('sweet') || p.includes('fudge') || p.includes('truffle') || p.includes('gift')
             ? '/chocolates.png'
             : '/mango-cake.png';
        }

        addMessage(aiMessage);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      // Fallback mock response for demo purposes
      const mockAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm having trouble connecting to my brain right now! 🧠\nBut here's a quick idea: How about a 'Weekend Special' post for your cakes?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'suggestion',
        cardData: {
          image: "Weekend Special 🍰",
          caption: "Make your weekend sweeter with our special treat! Limited availability.",
          hashtags: "#weekendspecial #sweettooth #homemadegoodness",
          imageUrl: "/mango-cake.png"
        }
      };
      addMessage(mockAiMessage);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col overflow-hidden relative bg-cream">
      <header className="h-16 bg-white/90 backdrop-blur-sm shadow-sm z-10 w-full shrink-0 flex items-center justify-center border-b border-black/5">
        <div className="w-full max-w-3xl px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-black/5 rounded-full transition-colors -ml-2">
              <Menu size={24} className="text-dark-gray" />
            </button>
            <h1 className="text-lg font-bold text-brown">Orders-First AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <Bell size={20} className="text-dark-gray" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors -mr-2">
              <Settings size={20} className="text-dark-gray" />
            </button>
          </div>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 scroll-smooth bg-cream/30 w-full flex flex-col items-center"
      >
        <div className="w-full max-w-3xl px-4 md:px-6 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <div key={msg.id} className="w-full flex flex-col">
              <ChatBubble message={msg} />
              {msg.type === 'suggestion' && (
                <SuggestionCard message={msg} onAction={(action) => handleAction(action, msg)} />
              )}
            </div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-white rounded-t-2xl rounded-br-2xl shadow-sm w-fit mb-4"
          >
            <span className="flex gap-1">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-dark-gray/30 rounded-full"></motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-dark-gray/30 rounded-full"></motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-dark-gray/30 rounded-full"></motion.span>
            </span>
            <span className="text-xs font-medium text-dark-gray/50 italic">AI is thinking...</span>
          </motion.div>
        )}
        </div>
      </div>

      <div className="py-4 bg-white/90 backdrop-blur-sm border-t border-light-gray w-full shrink-0 z-10 flex items-center justify-center">
        <div className="w-full max-w-3xl px-4 md:px-6">
          <div className="flex items-center gap-2 bg-light-gray rounded-full px-4 py-1 border border-dark-gray/5 w-full">
            <MessageSquare size={20} className="text-dark-gray/40" />
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent py-3 text-sm focus:outline-none text-dark-gray font-medium"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className={`p-2 rounded-full transition-all ${
                inputText.trim() ? 'bg-orange text-white shadow-md shadow-orange/20' : 'bg-dark-gray/10 text-dark-gray/30'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
