'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding');
  };

  return (
    <main className={styles.welcomeMain}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoPlaceholder}>
          <div className={styles.logoGradient}></div>
          <span className={styles.logoText}>DS</span>
        </div>
        
        <div className={styles.textContainer}>
          <h1>Get More Orders,<br/>Less Stress!</h1>
          <p className="body-large">
            Your AI marketing assistant that handles the thinking, you decide.
          </p>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <button className="btn-primary" onClick={handleStart}>
          Let's Get Started 🚀
        </button>
        <div className={styles.signInWrapper}>
          <p className="body-regular">Already have an account?</p>
          <button className="btn-secondary">Sign In</button>
        </div>
      </div>
    </main>
  );
}
