'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'development') {
        // Active clean-up in dev mode to prevent cached HTML issues
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for (let registration of registrations) {
            registration.unregister().then(() => {
              console.log('Dev: Service Worker unregistered successfully.');
            });
          }
        });
        if ('caches' in window) {
          caches.keys().then(function(names) {
            for (let name of names) {
              caches.delete(name);
            }
            console.log('Dev: Caches cleared successfully.');
          });
        }
      } else {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(
            function(registration) {
              console.log('Service Worker registration successful with scope: ', registration.scope);
            },
            function(err) {
              console.log('Service Worker registration failed: ', err);
            }
          );
        });
      }
    }
  }, []);

  return null;
}
