'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DashboardScreen() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/analytics');
        const resData = await res.json();
        if (resData.success && resData.data) {
          setData(resData.data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    router.push('/chat');
  };

  return (
    <main className={styles.dashboardMain}>
      <header className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>&larr; Dashboard</div>
        <div className={styles.settingsIcon}>⚙️</div>
      </header>

      <div className={styles.content}>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading analytics...</p>
        ) : data ? (
          <>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>This Week 📊</h3>
              <div className={styles.summaryCard}>
                <div className={styles.statGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{data.posts_suggested}</span>
                    <span className={styles.statLabel}>Posts Suggested</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{data.posts_approved}</span>
                    <span className={styles.statLabel}>Approved & Posted</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{data.orders_count}</span>
                    <span className={styles.statLabel}>Orders Received 🎉</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>₹{data.revenue.toLocaleString()}</span>
                    <span className={styles.statLabel}>Revenue 💰</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>What's Working 💡</h3>
              <div className={styles.insightsCard}>
                <ul>
                  {data.insights.map((insight: string, idx: number) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Next Best Action 🚀</h3>
              <div className={styles.actionCard}>
                <p className={styles.actionText}>{data.next_action.text}</p>
                <div className={styles.actionPrompt}>
                  <span>{data.next_action.action}</span>
                  <div className={styles.buttonGroup}>
                    <button className={styles.btnYes} onClick={() => alert('Action Started')}>Yes</button>
                    <button className={styles.btnNo} onClick={() => alert('Skipped')}>No</button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Failed to load data.</p>
        )}
      </div>
    </main>
  );
}
