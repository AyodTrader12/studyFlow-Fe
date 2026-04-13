import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import { registerSW } from 'virtual:pwa-register'
import { AuthProvider } from './context/AuthContext.jsx'

const updateSW = registerSW({
  onNeedRefresh() {
    // You could show a toast here: "New version available — tap to update"
    // For now we just log it. The service worker updates silently on next reload.
    console.log("📦 New version of StudyFlow available. Will update on next reload.");
  },
  onOfflineReady() {
    console.log("✅ StudyFlow is ready to work offline.");
  },
  onRegistered(registration) {
    console.log("🔧 Service worker registered:", registration);
  },
  onRegisterError(error) {
    console.error("❌ Service worker registration failed:", error);
  },
});
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OfflineBanner/>
     <App />
    </AuthProvider>
    
  </StrictMode>,
)
