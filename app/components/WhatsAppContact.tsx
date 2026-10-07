'use client';
import { FormEvent, useState } from 'react';

export default function WhatsAppContact(){
  const [name,setName]=useState(''); const [city,setCity]=useState(''); const [project,setProject]=useState('Casa famiglia'); const [message,setMessage]=useState('');
  function send(e:FormEvent){e.preventDefault(); const text=`Buongiorno, sono ${name}. Vorrei informazioni su Abitare Insieme.\nCitta/Regione: ${city}\nProgetto: ${project}\nMessaggio: ${message}`; window.open('https://wa.me/393457980259?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');}
  return <form className="wa-contact-form" onSubmit={send}>
    <div className="wa-fields"><input required placeholder="Nome e cognome" value={name} onChange={e=>setName(e.target.value)}/><input required placeholder="Citta / Regione" value={city} onChange={e=>setCity(e.target.value)}/><select value={project} onChange={e=>setProject(e.target.value)}><option>Casa famiglia</option><option>Comunita alloggio</option><option>Residenza protetta</option><option>RSA</option><option>Senior living</option><option>Non lo so ancora</option></select><textarea placeholder="Raccontaci brevemente il tuo progetto" value={message} onChange={e=>setMessage(e.target.value)}/></div>
    <button className="button wa-button" type="submit">Scrivici su WhatsApp →</button><small>Si aprira WhatsApp con il messaggio gia compilato. Potrai controllarlo prima dell'invio.</small>
  </form>;
}