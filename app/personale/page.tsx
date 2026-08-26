'use client';

import { FormEvent, useState } from 'react';

const API = 'https://lbkdoxpanxvsrgqimzzj.supabase.co/rest/v1';
const KEY = 'sb_publishable_6uNgrPI-Mj84tlHcFuICTQ_aG2zfoSU';
const roles = ['OSS','Infermiere/a','Educatore professionale','Animatore/trice','Coordinatore/trice di struttura','ASA','Assistente familiare','Fisioterapista','Medico','Cuoco/a','Addetto/a pulizie','Amministrazione / segreteria','Altro'];

export default function Personale() {
  const [tab,setTab] = useState<'candidato'|'ricerca'>('ricerca');
  const [sent,setSent] = useState('');
  const [error,setError] = useState('');

  async function submit(e:FormEvent<HTMLFormElement>, type:'candidate'|'request') {
    e.preventDefault();
    setSent('');
    setError('');
    const f = new FormData(e.currentTarget);
    const body = type === 'candidate' ? {
      first_name:f.get('first_name'), last_name:f.get('last_name'), email:f.get('email'), phone:f.get('phone'), role:f.get('role'), experience_years:Number(f.get('experience_years')||0), region:f.get('region'), province:f.get('province'), municipality:f.get('municipality'), availability:f.get('availability'), qualifications:f.get('qualifications'), bio:f.get('bio'), source:'self', status:'pending', visible:false
    } : {
      company_name:f.get('company_name'), contact_name:f.get('contact_name'), email:f.get('email'), phone:f.get('phone'), role_needed:f.get('role_needed'), region:f.get('region'), province:f.get('province'), municipality:f.get('municipality'), quantity:Number(f.get('quantity')||1), notes:f.get('notes'), status:'new'
    };
    try {
      const r = await fetch(`${API}/${type === 'candidate' ? 'candidates' : 'staff_requests'}`, { method:'POST', headers:{'Content-Type':'application/json',apikey:KEY,Prefer:'return=minimal'}, body:JSON.stringify(body) });
      if (!r.ok) throw new Error();
      setSent(type === 'candidate' ? 'Profilo ricevuto. Lo verificheremo prima della pubblicazione.' : 'Richiesta ricevuta. Ti contatteremo per la ricerca e selezione del personale.');
      e.currentTarget.reset();
    } catch {
      setError('Invio non riuscito. Riprova tra poco.');
    }
  }

  return (
    <main className="market-page">
      <header className="config-nav">
        <a className="brand" href="/"><span>PROGETTO</span> ABITARE INSIEME</a>
        <a className="ghost" href="/">Torna alla home</a>
      </header>

      <section className="market-hero">
        <span className="kicker">PERSONALE PER STRUTTURE ANZIANI</span>
        <h1>Le persone giuste fanno funzionare la struttura.</h1>
        <p>Creiamo una banca dati qualificata di professionisti del settore. Chi cerca personale non contatta direttamente i candidati: la selezione viene gestita da Abitare Insieme.</p>
        <div className="market-actions">
          <button className={tab==='ricerca'?'button':'ghost-button'} onClick={()=>setTab('ricerca')}>Cerco personale</button>
          <button className={tab==='candidato'?'button':'ghost-button'} onClick={()=>setTab('candidato')}>Voglio lavorare</button>
        </div>
      </section>

      <section className="market-layout">
        <div className="market-info">
          <span className="kicker">COME FUNZIONA</span>
          {tab === 'ricerca' ? (
            <>
              <h2>Dicci chi stai cercando.</h2>
              <p>Riceviamo la richiesta, selezioniamo i profili compatibili dalla nostra banca dati e gestiamo il contatto. In questo modo il servizio di recruiting resta centralizzato.</p>
              <div className="feature-list">
                <div><b>01</b><span>Definisci ruolo e territorio</span></div>
                <div><b>02</b><span>Selezioniamo i candidati compatibili</span></div>
                <div><b>03</b><span>Ti presentiamo i profili più adatti</span></div>
                <div><b>04</b><span>Gestiamo il servizio di ricerca</span></div>
              </div>
            </>
          ) : (
            <>
              <h2>Crea il tuo profilo professionale.</h2>
              <p>Il profilo entra nella banca dati Abitare Insieme. Prima di renderlo visibile viene verificato; dati personali e contatti non vengono pubblicati liberamente.</p>
            </>
          )}
        </div>

        <div className="market-form-card">
          {tab === 'ricerca' ? (
            <form onSubmit={e=>submit(e,'request')}>
              <h3>Richiedi personale</h3>
              <div className="lead-fields">
                <input name="company_name" placeholder="Struttura / azienda" />
                <input name="contact_name" placeholder="Nome referente" required />
                <input type="email" name="email" placeholder="Email" required />
                <input name="phone" placeholder="Telefono" />
                <select name="role_needed" required><option value="">Figura ricercata</option>{roles.map(r=><option key={r}>{r}</option>)}</select>
                <input name="quantity" type="number" min="1" defaultValue="1" placeholder="Numero persone" />
                <select name="region" required><option value="">Regione</option><option>Piemonte</option><option>Lombardia</option><option>Liguria</option></select>
                <input name="province" placeholder="Provincia" />
                <input name="municipality" placeholder="Comune" />
                <textarea name="notes" placeholder="Turni, esperienza richiesta, data di inserimento, altre informazioni" />
              </div>
              <button className="button">Invia richiesta di ricerca</button>
            </form>
          ) : (
            <form onSubmit={e=>submit(e,'candidate')}>
              <h3>Profilo candidato</h3>
              <div className="lead-fields">
                <input name="first_name" placeholder="Nome" required />
                <input name="last_name" placeholder="Cognome" required />
                <input type="email" name="email" placeholder="Email" required />
                <input name="phone" placeholder="Telefono" />
                <select name="role" required><option value="">Professione / ruolo</option>{roles.map(r=><option key={r}>{r}</option>)}</select>
                <input name="experience_years" type="number" min="0" placeholder="Anni di esperienza" />
                <select name="region"><option value="">Regione</option><option>Piemonte</option><option>Lombardia</option><option>Liguria</option></select>
                <input name="province" placeholder="Provincia" />
                <input name="municipality" placeholder="Comune" />
                <input name="availability" placeholder="Disponibilità: immediata, 30 giorni..." />
                <textarea name="qualifications" placeholder="Titoli, qualifiche, iscrizioni professionali" />
                <textarea name="bio" placeholder="Presentazione ed esperienza" />
              </div>
              <button className="button">Invia il mio profilo</button>
            </form>
          )}
          {sent && <div className="success-box"><strong>{sent}</strong></div>}
          {error && <p className="form-error">{error}</p>}
        </div>
      </section>

      <section className="market-bottom">
        <span className="kicker">PER LE STRUTTURE</span>
        <h2>Non un semplice elenco di CV.</h2>
        <p>La banca dati sarà organizzata per ruolo, territorio, esperienza e disponibilità. Abitare Insieme gestirà la ricerca e potrà offrire un vero servizio di recruiting alle strutture.</p>
      </section>
    </main>
  );
}
