import type { Metadata } from 'next';
import './globals.css';
import './marketplace.css';
import './home-showcase.css';
import './project.css';
import './auth.css';

export const metadata: Metadata = {
  title: 'Progetto Abitare Insieme',
  description: "Dall'idea all'apertura della tua struttura per anziani.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
