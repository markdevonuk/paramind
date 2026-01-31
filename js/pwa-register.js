/* ============================================
   PARAMIND - PWA Registration Script
   ============================================
   Add this script to all your HTML pages to enable PWA features
   Place just before </body>
*/

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ ParaMind PWA: Service Worker registered successfully');
        console.log('   Scope:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check every hour
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 ParaMind PWA: New version available');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update prompt
              showUpdatePrompt();
            }
          });
        });
      })
      .catch((error) => {
        console.log('❌ ParaMind PWA: Service Worker registration failed:', error);
      });
  });
}

// Show update prompt when new version is available
function showUpdatePrompt() {
  // Create a simple update banner
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.innerHTML = `
    <style>
      #pwa-update-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        max-width: 400px;
        margin: 0 auto;
        background: #1a2634;
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        z-index: 10000;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      #pwa-update-banner p {
        margin: 0;
        font-size: 14px;
      }
      #pwa-update-banner button {
        background: #2B8A9C;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }
      #pwa-update-banner button:hover {
        background: #247a8a;
      }
    </style>
    <p>🎉 A new version of ParaMind is available!</p>
    <button onclick="updateApp()">Update</button>
  `;
  document.body.appendChild(banner);
}

// Update the app
function updateApp() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    });
  }
  window.location.reload();
}

// Handle app installed event
window.addEventListener('appinstalled', () => {
  console.log('🎉 ParaMind PWA: App was installed successfully!');
  // You could track this event in analytics
});

// Detect if running as installed PWA
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

// Log PWA status
if (isPWA()) {
  console.log('📱 ParaMind: Running as installed PWA');
} else {
  console.log('🌐 ParaMind: Running in browser');
}
