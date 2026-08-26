'use client';

import { FormEvent, useState } from 'react';

const API = 'https://lbkdoxpanxvsrgqimzzj.supabase.co/rest/v1/properties';
const KEY = 'sb_publishable_6uNgrPI-Mj84tlHcFuICTQ_aG2zfoSU';

export default function Immobili() {
  const [sent,setSent] = useState(false);
  const [error,setError] = useState('');

  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const f = new FormData(e.currentTarget);
    const body = {
      title:f.get('title'), description:f.get('description'), region:f.get('region'), province:f.get('province'), municipality:f.get('municipality'), address:f.get('address'), property_type:f.get('property_type'), offer_type:f.get('offer_type'), price:Number(f.get('price')||0), surface_sqm:Number(f.get('surface_sqm')||0), seller_type:f.get('seller_type'), contact_name:f.get('contact_name'), contact_email:f.get('contact_email'), contact_phone:f.get('contact_phone'), bedrooms:Number(f.get('bedrooms')||0), bathrooms:Number(f.get('bathrooms')||0), outdoor_space:f.get('outdoor_space')==='on', elevator:f.get('elevator')==='on', accessibility_notes:f.get('accessibility_notes'), status:'draft', featured:false
    };
    try {
      const r = await fetch(API,{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY,Prefer:'return=minimal'},body:JSON.stringify(body)});
      if(!r.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Non siamo riusciti a ricevere l annuncio. Riprova tra poco.');
    }
  }

  return (
    <main className="market-page">
      <header className="config-nav">
        <a className="brand" href="/"><span>PROGETTO</span> ABITARE INSIEME</a>
        <a className="ghost" href="/">Torna alla home</a>
      </header>

      <section className="market-hero property">
        <span className="kicker">IMMOBILI PER STRUTTURE ANZIANI</span>
        <h1>Trova lo spazio giusto per il tuo progetto.</h1>
        <p>Immobili in vendita o affitto potenzialmente adatti a progetti residenziali per anziani. Collaboriamo con agenzie immobiliari, proprietari e operatori del territorio.</p>
        <div className="market-actions"><a className="button" href="#pubblica">Pubblica un immobile</a><a className="ghost" href="#come-funziona">Come funziona</a></div>
      </section>

      <section id="come-funziona" className="property-model">
        <article><span>01</span><h3>Agenzie immobiliari</h3><p>Possono proporre immobili e strutture disponibili con accordi commerciali dedicati.</p></article>
        <article><span>02</span><h3>Proprietari privati</h3><p>Possono segnalarci direttamente immobili in vendita o locazione.</p></article>
        <article><span>03</span><h3>Progetti verificati</h3><p>Possiamo incrociare immobile, configuratore e requisiti del progetto prima di procedere.</p></article>
        <article><span>04</span><h3>Contatto gestito</h3><p>Le richieste commerciali possono essere gestite da Abitare Insieme, tutelando il modello di intermediazione.</p></article>
      </section>

      <section id="pubblica" className="market-layout">
        <div className="market-info">
          <span className="kicker">PROPONI UN IMMOBILE</span>
          <h2>Hai una struttura da vendere o affittare?</h2>
          <p>L&apos;annuncio viene ricevuto come bozza. Prima della pubblicazione verifichiamo le informazioni e definiamo, quando previsto, l&apos;accordo commerciale con agenzia o proprietario.</p>
          <div className="feature-list">
            <div><b>✓</b><span>Vendita o locazione</span></div><div><b>✓</b><span>Agenzie e privati</span></div><div><b>✓</b><span>Piemonte, Lombardia e Liguria</span></div><div><b>✓</b><span>Pubblicazione dopo verifica</span></div>
          </div>
        </div>
        <div className="market-form-card">
          {!sent ? (
            <form onSubmit={submit}>
              <h3>Inserisci la proposta</h3>
              <div className="lead-fields">
                <select name="seller_type" required><option value="">Chi pubblica?</option><option value="agency">Agenzia immobiliare</option><option value="private">Proprietario privato</option><option value="operator">Operatore / società</option></select>
                <select name="offer_type" required><option value="">Tipo offerta</option><option value="sale">Vendita</option><option value="rent">Affitto</option></select>
                <input name="contact_name" placeholder="Nome referente" required /><input name="contact_email" type="email" placeholder="Email" required /><input name="contact_phone" placeholder="Telefono" /><input name="title" placeholder="Titolo annuncio" required />
                <select name="region" required><option value="">Regione</option><option>Piemonte</option><option>Lombardia</option><option>Liguria</option></select>
                <input name="province" placeholder="Provincia" /><input name="municipality" placeholder="Comune" required /><input name="address" placeholder="Indirizzo" />
                <select name="property_type"><option value="">Tipologia immobile</option><option value="villa">Villa / edificio indipendente</option><option value="building">Intero stabile</option><option value="hotel">Hotel / struttura ricettiva</option><option value="care">Ex struttura assistenziale</option><option value="commercial">Immobile da riconvertire</option><option value="other">Altro</option></select>
                <input name="surface_sqm" type="number" min="0" placeholder="Superficie mq" /><input name="price" type="number" min="0" placeholder="Prezzo / canone €" /><input name="bedrooms" type="number" min="0" placeholder="Camere" /><input name="bathrooms" type="number" min="0" placeholder="Bagni" />
                <label className="check-field"><input type="checkbox" name="outdoor_space" /> Spazio esterno</label><label className="check-field"><input type="checkbox" name="elevator" /> Ascensore</label>
                <textarea name="accessibility_notes" placeholder="Accessibilità, assenza barriere, parcheggi, destinazione attuale..." /><textarea name="description" placeholder="Descrivi l'immobile" required />
              </div>
              <button className="button">Invia immobile per verifica</button>
              {error && <p className="form-error">{error}</p>}
            </form>
          ) : (
            <div className="success-box"><strong>Immobile ricevuto.</strong><p>La proposta è stata salvata come bozza. La verificheremo prima di renderla pubblica sul portale.</p></div>
          )}
        </div>
      </section>

      <section className="market-bottom">
        <span className="kicker">RETE IMMOBILIARE</span><h2>Costruiamo un catalogo specializzato, non un portale immobiliare generico.</h2><p>L&apos;obiettivo è raccogliere immobili realmente interessanti per case famiglia, comunità alloggio, residenze protette, senior living e strutture sociosanitarie.</p>
      </section>
    </main>
  );
}
