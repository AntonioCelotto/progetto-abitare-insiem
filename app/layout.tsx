import type { Metadata } from 'next';
import './globals.css';
import './marketplace.css';
import './home-showcase.css';
import './pricing-home.css';
import './project.css';
import './auth.css';
import './responsive.css';

export const metadata: Metadata = {
  title: 'Progetto Abitare Insieme',
  description: "Dall'idea all'apertura della tua struttura per anziani.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        {children}
        <footer className="site-footer">
          <div className="site-footer-main">
            <div className="site-footer-brand">
              <span>PROGETTO</span>
              <strong>ABITARE INSIEME</strong>
              <p>Il portale per accompagnare il tuo progetto dall&apos;idea all&apos;apertura.</p>
            </div>
            <div className="site-footer-company">
              <span className="site-footer-label">UN PROGETTO DI</span>
              <strong>New Digital App</strong>
              <p>Partita IVA 12254210011</p>
            </div>
            <div className="site-footer-contact">
              <span className="site-footer-label">CONTATTO DIRETTO</span>
              <a href="mailto:a.celotto@newdigitalapp.com">a.celotto@newdigitalapp.com</a>
              <a href="https://wa.me/393457980259" target="_blank" rel="noreferrer">WhatsApp 345 798 0259</a>
            </div>
          </div>
          <div className="site-footer-bottom">
            <span>© 2026 New Digital App. Tutti i diritti riservati.</span>
            <span>Progetto Abitare Insieme · Informazioni a finalità orientativa.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
