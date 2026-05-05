'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PreviewScreen() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('recommended');

  const handleSchedule = () => {
    // Show confirmation and go back to chat
    alert('Post scheduled for ' + selectedTime + '!');
    router.push('/chat');
  };

  const handleClose = () => {
    router.push('/chat');
  };

  return (
    <main className={styles.previewMain}>
      <header className={styles.header}>
        <div className={styles.backButton} onClick={handleClose}>&larr; Preview Post</div>
        <div className={styles.closeButton} onClick={handleClose}>&#10005;</div>
      </header>

      <div className={styles.content}>
        <p className={styles.sectionTitle}>This is how it will look:</p>
        
        <div className={styles.previewCard}>
          <div className={styles.imagePlaceholder}>
            [Your Photo Here]
          </div>
          <div className={styles.captionArea}>
            <p className={styles.captionText}>Fresh Mango Cake 🥭<br/>Just out of the oven! Made with love.</p>
            <p className={styles.hashtags}>#mangocake #homemade #freshbaking</p>
          </div>
        </div>

        <div className={styles.scheduleSection}>
          <p className={styles.sectionTitle}>Schedule for:</p>

          <div 
            className={`${styles.timeOption} ${selectedTime === 'recommended' ? styles.selected : ''}`}
            onClick={() => setSelectedTime('recommended')}
          >
            <span>Today, 6:00 PM</span>
            <span className={styles.recommendedBadge}>⭐ Recommended</span>
          </div>

          <div 
            className={`${styles.timeOption} ${selectedTime === 'tomorrow' ? styles.selected : ''}`}
            onClick={() => setSelectedTime('tomorrow')}
          >
            <span>Tomorrow, 8:00 AM</span>
          </div>

          <div 
            className={`${styles.timeOption} ${selectedTime === 'custom' ? styles.selected : ''}`}
            onClick={() => setSelectedTime('custom')}
          >
            <span>Pick another time...</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.scheduleBtn} onClick={handleSchedule}>
          Schedule Post ✅
        </button>
      </div>
    </main>
  );
}
