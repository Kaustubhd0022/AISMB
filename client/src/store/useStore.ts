import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  type?: 'text' | 'suggestion';
  cardData?: any;
}

export interface BusinessContext {
  product?: string;
  location?: string;
  orderValue?: string;
}

interface AppState {
  businessContext: BusinessContext | null;
  messages: Message[];
  setBusinessContext: (context: BusinessContext) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearChat: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      businessContext: null,
      messages: [
        {
          id: '1',
          sender: 'user',
          text: "Good morning! ☀️\nHow's business today?",
          timestamp: '9:15 AM'
        },
        {
          id: '2',
          sender: 'ai',
          text: "Good morning! 🌞\n\nToday's suggestion:\nPost your mango cake with this...",
          timestamp: '9:16 AM'
        },
        {
          id: '3',
          sender: 'ai',
          text: "Here is your suggestion:",
          timestamp: '9:16 AM',
          type: 'suggestion',
          cardData: {
            image: "Fresh Mango Cake 🥭",
            caption: "Just out of the oven! Limited portions available...",
            hashtags: "#mangocake #homemade #freshbaking",
            imageUrl: "https://loremflickr.com/400/300/cake,dessert?lock=3"
          }
        }
      ],
      setBusinessContext: (context) => set({ businessContext: context }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (messages) => set({ messages }),
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'aismb-storage',
    }
  )
);
