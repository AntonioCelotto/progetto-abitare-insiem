import Link from "next/link";
import "./abbonamenti.css";

const plans = [
  {name:"Portale PRO", price:"39 € / mese", annual:"oppure 390 € / anno", text:"Per chi vuole gestire il proprio progetto in autonomia con tutti gli strumenti digitali.", features:["Il mio progetto e percorso guidato","La mia scrivania documentale","Preferiti immobili e personale","Simulatore economico","Checklist e stato delle fasi","Archivio richieste"], cta:"Attiva PRO", featured:false},
  {name:"Portale Assistito", price:"99 € / mese", annual:"supporto continuativo", text:"La piattaforma completa con un livello di assistenza dedicato durante il percorso.", features:["Tutto il piano PRO","Supporto operativo da remoto","Revisione periodica del progetto","Orientamento sui prossimi passi","Priorita nelle richieste"], cta:"Scegli Assistito", featured:true},
];

const services = [
  ["Sessione strategica", "250 €", "60 minuti di analisi del progetto. Se prosegui con una consulenza completa, l'importo viene scalato."],
  ["Consulenza LIGHT", "2.900 €", "Percorso da remoto con videocall operative, impostazione del progetto e accompagnamento sui passaggi principali."],
  ["Consulenza FULL", "4.500 €", "Affiancamento operativo con fino a 3 sopralluoghi e 12 mesi di Portale PRO inclusi."],
  ["Abitare Insieme 360", "da 7.900 €", "Percorso completo: progetto, immobile, verifiche, piano economico, personale, fornitori e accompagnamento verso l'apertura."],
];

export default function AbbonamentiPage(){
 return <main className="subscriptions-page">
  <section className="subscriptions-hero">
   <div className="subscriptions-wrap">
    <Link className="subscriptions-back" href="/">← Torna alla home</Link>
    <p className="eyebrow">PIANI E SERVIZI</p>
    <h1>Il supporto giusto,<br/><em>nel momento giusto.</em></h1>
    <p className="lead">Puoi usare Abitare Insieme come la tua scrivania digitale oppure farti accompagnare da un professionista fino all'apertura della struttura.</p>
   </div>
  </section>

  <section className="subscriptions-wrap section-space">
   <div className="section-heading"><p className="eyebrow">ABBONAMENTI DIGITALI</p><h2>La tua scrivania sempre con te.</h2></div>
   <div className="plans-grid">{plans.map(p=><article key={p.name} className={`plan-card ${p.featured?"featured":""}`}>
    {p.featured&&<span className="plan-badge">PIÙ COMPLETO</span>}<h3>{p.name}</h3><div className="plan-price">{p.price}</div><div className="plan-annual">{p.annual}</div><p>{p.text}</p>
    <ul>{p.features.map(f=><li key={f}>✓ {f}</li>)}</ul><a className="primary-btn" href="#contratto">{p.cta}</a>
   </article>)}</div>
  </section>

  <section className="services-band"><div className="subscriptions-wrap section-space">
   <div className="section-heading"><p className="eyebrow">CONSULENZA E AFFIANCAMENTO</p><h2>Se vuoi, non sei solo.</h2><p>Dalla prima valutazione all'apertura: scegli quanto vuoi essere accompagnato.</p></div>
   <div className="services-grid">{services.map(([name,price,text])=><article className="service-card" key={name}><h3>{name}</h3><strong>{price}</strong><p>{text}</p><a href="#contratto">Richiedi il servizio →</a></article>)}</div>
  </div></section>

  <section id="contratto" className="subscriptions-wrap contract-section">
   <div className="contract-copy"><p className="eyebrow">CONTRATTO DIGITALE</p><h2>Tutto chiaro prima di iniziare.</h2><p>Prima dell'attivazione visualizzi condizioni, durata, prezzo e servizi compresi. Il contratto viene accettato digitalmente e resta disponibile nella tua area personale.</p>
    <div className="contract-steps"><span><b>01</b> Scegli il servizio</span><span><b>02</b> Leggi e accetta il contratto</span><span><b>03</b> Completa il pagamento</span><span><b>04</b> Trovi tutto nel tuo profilo</span></div>
   </div>
   <div className="contract-box"><p className="eyebrow">ATTIVAZIONE</p><h3>Richiedi l'attivazione</h3><p>La struttura è pronta per essere collegata al checkout Stripe. Fino all'attivazione dei pagamenti puoi inviare la richiesta al team.</p><a className="primary-btn" href="mailto:a.celotto@newdigitalapp.com?subject=Attivazione%20Abitare%20Insieme">Richiedi attivazione</a><small>I prezzi indicati sono da intendersi + IVA ove applicabile. Eventuali professionisti, pratiche, lavori, trasferte straordinarie e costi di terzi sono esclusi salvo diversa indicazione contrattuale.</small></div>
  </section>
 </main>
}
