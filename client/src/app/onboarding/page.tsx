'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: '',
    location: '',
    orderValue: '500-1000'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/chat');
    }
  };

  const handleSkip = () => {
    router.push('/chat');
  };

  return (
    <main className={styles.onboardingMain}>
      <header className={styles.header}>
        <div className={styles.backButton}>&larr;</div>
        <div className={styles.stepIndicator}>Step {step} of 3</div>
        <div className={styles.skipButton} onClick={handleSkip}>Skip</div>
      </header>

      <div className={styles.content}>
        <h2>Tell me about your business 🏠</h2>

        {step === 1 && (
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <label>What do you sell?</label>
              <input 
                className="input-field" 
                placeholder="e.g. Homemade chocolates" 
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label>Where are you located?</label>
              <input 
                className="input-field" 
                placeholder="e.g. Pune, Maharashtra" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label>What's your average order value?</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="aov" value="under500" 
                    checked={formData.orderValue === 'under500'}
                    onChange={() => setFormData({...formData, orderValue: 'under500'})}
                  />
                  <span>Under ₹500</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="aov" value="500-1000"
                    checked={formData.orderValue === '500-1000'}
                    onChange={() => setFormData({...formData, orderValue: '500-1000'})}
                  />
                  <span>₹500 - ₹1,000</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="aov" value="1000-2000"
                    checked={formData.orderValue === '1000-2000'}
                    onChange={() => setFormData({...formData, orderValue: '1000-2000'})}
                  />
                  <span>₹1,000 - ₹2,000</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="aov" value="above2000"
                    checked={formData.orderValue === 'above2000'}
                    onChange={() => setFormData({...formData, orderValue: 'above2000'})}
                  />
                  <span>Above ₹2,000</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formGroup}>
            <p className="body-large">Let's connect your WhatsApp so I can help you send campaigns directly.</p>
            {/* Mocking step 2 */}
            <div className={styles.mockBox}>WhatsApp Connection Integration Placeholder</div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.formGroup}>
            <p className="body-large">Setting up your AI profile. This takes just a moment...</p>
             <div className={styles.mockBox}>AI Initialization Placeholder</div>
          </div>
        )}

      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={handleNext}>
          Next &rarr;
        </button>
      </div>
    </main>
  );
}
