'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between bg-cream py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="flex flex-col items-center mt-[15vh] w-full max-w-md mx-auto"
      >
        <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-orange to-yellow flex items-center justify-center mb-10 shadow-lg shadow-orange/40 relative animate-float border-4 border-white/50">
           <span className="text-[42px] font-bold text-white drop-shadow-md tracking-tighter">DS</span>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-brown leading-tight tracking-tight">
            Get More Orders,<br/>Less Stress!
          </h1>
          <p className="text-lg text-dark-gray/70 font-medium max-w-[280px] mx-auto leading-relaxed">
            Your AI marketing assistant that handles the thinking, you decide.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-sm mx-auto flex flex-col gap-6 mb-4"
      >
        <button 
          className="w-full h-14 bg-gradient-to-r from-orange to-yellow text-white rounded-btn font-bold text-lg shadow-lg shadow-orange/30 active:scale-95 transition-all"
          onClick={handleStart}
        >
          Let's Get Started 🚀
        </button>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-dark-gray/50 tracking-wide">Already have an account?</p>
          <button className="text-orange font-bold hover:opacity-80 transition-opacity">Sign In</button>
        </div>
      </motion.div>
    </main>
  );
}
