import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { I18nProvider } from "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider
      titleKey="Serai Tanjung Langkawi — Rainforest & Sea Resort, Malaysia"
      descKey="A five-star hillside sanctuary on Langkawi's northwest coast. Ocean-view villas, Malay fine dining and a rainforest spa. Book on WhatsApp +60 11-5119 8497."
    >
      <App />
      <WhatsAppButton />
    </I18nProvider>
  </StrictMode>,
);
