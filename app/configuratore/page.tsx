'use client';

import { useMemo, useState } from 'react';

type Answers = {
  region: string;
  property: string;
  guests: string;
  users: string;
  services: string;
};

const steps = [
  { key: 'region', title: 'Dove vuoi aprire?', options: ['Piemonte', 'Lombardia', 'Liguria'] },
  { key: 'property', title: 'Hai gia un immobile?', options: ['Si', 'No', 'Sto cercando'] },
  { key: 'guests', title: 'Quanti ospiti immagini?', options: ['1-4', '5-12', '13-20', '21-40', 'Oltre 40'] },
  { key: 'users', title: 'Che tipo di ospiti vuoi accogliere?', options: ['Autosufficienti', 'Fragili / parzialmente autosufficienti', 'Non autosufficienti', 'Non lo so ancora'] },
  { key: 'services', title: 'Che livello di assistenza immagini?', options: ['Abitazione e servizi di base', 'Assistenza quotidiana', 'OSS e assistenza continuativa', 'Infermieristica / sanitaria', 'Non lo so ancora'] },
] as const;

function getResult(a: Answers) {
  if (a.users === 'Non autosufficienti' || a.services === 'Infermieristica / sanitaria') {
    return {
      level: 'Percorso sociosanitario da approfondire',
      title: 'Il progetto richiede una verifica professionale prima di individuare la tipologia corretta.',
      text: 'La presenza di non autosufficienza o servizi sanitari puo portare verso strutture con requisiti autorizzativi, organizzativi e dimensionali piu complessi, come RSA o modelli equivalenti previsti dalla Regione.',
    };
  }
  if (a.region === 'Lombardia' && a.guests === '5-12') {
    return {
      level: 'Compatibilita preliminare interessante',
      title: 'In Lombardia vale la pena approfondire il percorso C.A.S.A. e le altre unita di offerta per anziani fragili.',
      text: 'Il numero di ospiti indicato rientra nel range tipico della C.A.S.A. lombarda. La compatibilita reale dipende da utenza, immobile, servizi e requisiti organizzativi.',
    };
  }
  if (a.guests === '1-4') {
    return {
      level: 'Micro progetto residenziale',
      title: 'La dimensione indicata richiede una verifica locale molto precisa.',
      text: 'Per nuclei molto piccoli la classificazione puo cambiare sensibilmente tra Regioni e Comuni. Il passo corretto e verificare natura dell attivita, immobile e regolamenti locali prima di definire il modello.',
    };
  }
  return {
    level: 'Primo orientamento completato',
    title: 'Ci sono piu percorsi possibili da confrontare.',
    text: 'Con i dati inseriti possiamo gia restringere il campo, ma per indicare una tipologia precisa servono informazioni sull immobile, sul Comune e sui servizi che vuoi effettivamente erogare.',
  };
}

export default function ConfiguratorePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ region: '', property: '', guests: '', users: '', services: '' });
  const done = step >= steps.length;
  const result = useMemo(() => getResult(answers), [answers]);

  const choose = (value: string) => {
    const current = steps[step];
    setAnswers(prev => ({ ...prev, [current.key]: value }));
    setStep(prev => prev + 1);
  };

  const restart = () => {
    setAnswers({ region: '', property: '', guests: '', users: '', services: '' });
    setStep(0);
  };

  return (
    <main className="config-page">
      <header className="config-nav">
        <a className="brand" href="/"><span>PROGETTO</span> ABITARE INSIEME</a>
        <a href="/" className="ghost">Torna alla home</a>
      </header>

      <section className="config-shell">
        <div className="config-side">
          <span className="kicker">CHECK PRELIMINARE</span>
          <h1>Scopri quale percorso puoi approfondire.</h1>
          <p>Non e ancora uno studio di fattibilita: serve per capire da dove partire e quali verifiche diventano prioritarie.</p>
          <div className="progress"><span style={{width: `${Math.min(step, steps.length) / steps.length * 100}%`}} /></div>
          <small>{done ? 'Check completato' : `Domanda ${step + 1} di ${steps.length}`}</small>
        </div>

        <div className="config-card">
          {!done ? (
            <>
              <span className="question-number">0{step + 1}</span>
              <h2>{steps[step].title}</h2>
              <div className="answer-grid">
                {steps[step].options.map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}
              </div>
              {step > 0 && <button className="back-button" onClick={() => setStep(s => s - 1)}>← Indietro</button>}
            </>
          ) : (
            <div className="result-box">
              <span className="result-label">{result.level}</span>
              <h2>{result.title}</h2>
              <p>{result.text}</p>
              <div className="result-summary">
                <div><span>Regione</span><strong>{answers.region}</strong></div>
                <div><span>Immobile</span><strong>{answers.property}</strong></div>
                <div><span>Ospiti</span><strong>{answers.guests}</strong></div>
                <div><span>Utenza</span><strong>{answers.users}</strong></div>
              </div>
              <div className="result-actions">
                <a className="button" href="mailto:info@progettoabitareinsieme.it?subject=Richiesta%20studio%20di%20fattibilita">Richiedi uno studio di fattibilita</a>
                <button className="ghost-button" onClick={restart}>Rifai il check</button>
              </div>
              <small className="legal-note">Il risultato e orientativo e non costituisce autorizzazione, parere tecnico o verifica normativa definitiva.</small>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
