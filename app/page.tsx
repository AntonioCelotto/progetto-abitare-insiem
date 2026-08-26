const services = [
  ['Scopri cosa puoi aprire', 'Parti da Regione, immobile, budget e obiettivi. Il configuratore ti guiderà verso la soluzione più adatta.'],
  ['Normativa e requisiti', 'Requisiti organizzativi, strutturali e autorizzativi raccolti per Regione e tipologia di struttura.'],
  ['Trova il tuo immobile', 'Immobili potenzialmente adatti a case famiglia, comunità alloggio, RSA e nuovi modelli di senior living.'],
  ['Professionisti e fornitori', 'Una rete specializzata per progettazione, autorizzazioni, sicurezza, arredi, tecnologia e servizi.'],
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="brand"><span>PROGETTO</span> ABITARE INSIEME</div>
        <nav><a href="#come-funziona">Come funziona</a><a href="#servizi">Servizi</a><a href="#territori">Territori</a></nav>
        <a className="button small" href="#configuratore">Inizia il progetto</a>
      </header>

      <section className="hero">
        <div className="eyebrow">IL PORTALE PER L'ABITARE DELLA TERZA ETÀ</div>
        <h1>Dall'idea all'apertura<br/>della tua <em>struttura.</em></h1>
        <p>Un unico punto di riferimento per capire cosa aprire, verificare requisiti e normativa, trovare immobili e professionisti e costruire il tuo progetto.</p>
        <div className="actions"><a className="button" href="#configuratore">Scopri cosa puoi aprire</a><a className="ghost" href="#come-funziona">Come funziona →</a></div>
        <div className="regions" id="territori"><span>PARTIAMO DA</span><strong>Piemonte</strong><strong>Lombardia</strong><strong>Liguria</strong></div>
      </section>

      <section className="intro" id="come-funziona">
        <div><span className="kicker">UN PROGETTO, TUTTO IL PERCORSO</span><h2>Aprire una struttura non deve essere un percorso al buio.</h2></div>
        <p>Abitare Insieme nasce per trasformare un processo complesso in un percorso guidato: dall'analisi iniziale fino all'apertura e, successivamente, alla gestione.</p>
      </section>

      <section className="cards" id="servizi">
        {services.map(([title, text], i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <section className="cta" id="configuratore"><span className="kicker">IL PRIMO PASSO</span><h2>Hai un'idea o un immobile?<br/>Partiamo da lì.</h2><p>Il configuratore di Abitare Insieme ti aiuterà a capire quali possibilità puoi approfondire.</p><button className="button">Avvia il configuratore</button></section>
    </main>
  );
}
