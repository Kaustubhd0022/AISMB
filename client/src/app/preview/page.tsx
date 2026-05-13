'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

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

  const handleSchedule = () => {
    if (!previewData) {
      alert('Post scheduled for ' + selectedTime + '!');
      router.push('/chat');
      return;
    }

    // Generate WhatsApp deep link
    const message = `${previewData.image}\n\n${previewData.caption}\n\n${previewData.hashtags}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Go back to dashboard or chat
    router.push('/dashboard');
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
          {previewData?.imageUrl ? (
            <div 
              className={styles.imagePlaceholder} 
              style={{ backgroundImage: `url(${previewData.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' }}
            >
              Image
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              [Your Photo Here]
            </div>
          )}
          
          <div className={styles.captionArea}>
            <p className={styles.captionText}>
              {previewData ? previewData.image : 'Fresh Mango Cake 🥭'}<br/>
              {previewData ? previewData.caption : 'Just out of the oven! Made with love.'}
            </p>
            <p className={styles.hashtags}>
              {previewData ? previewData.hashtags : '#mangocake #homemade #freshbaking'}
            </p>
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
        <button className={styles.scheduleBtn} onClick={handleSchedule} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '20px', height: '20px' }} />
          Post to WhatsApp
        </button>
      </div>
    </main>
  );
}
