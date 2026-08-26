'use client';

import { FormEvent, useEffect, useState } from 'react';

const API = 'https://lbkdoxpanxvsrgqimzzj.supabase.co';
const KEY = 'sb_publishable_6uNgrPI-Mj84tlHcFuICTQ_aG2zfoSU';

function saveSession(data:any){
  if(data?.access_token) localStorage.setItem('sb-access-token', data.access_token);
  if(data?.refresh_token) localStorage.setItem('sb-refresh-token', data.refresh_token);
}

export default function AuthPage(){
  const [mode,setMode]=useState<'login'|'register'>('login');
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');

  useEffect(()=>{
    const hash = new URLSearchParams(window.location.hash.replace(/^#/,''));
    const access = hash.get('access_token');
    const refresh = hash.get('refresh_token');
    if(access){
      saveSession({access_token:access,refresh_token:refresh});
      window.history.replaceState({},'',window.location.pathname);
      window.location.href='/progetto';
    }
  },[]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setLoading(true);setMessage('');setError('');
    const f=new FormData(e.currentTarget);
    const email=String(f.get('email')||'').trim();
    const password=String(f.get('password')||'');
    try{
      if(mode==='register'){
        const name=String(f.get('name')||'').trim();
        const redirect=`${window.location.origin}/auth`;
        const r=await fetch(`${API}/auth/v1/signup?redirect_to=${encodeURIComponent(redirect)}`,{
          method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},
          body:JSON.stringify({email,password,data:{full_name:name}})
        });
        const data=await r.json();
        if(!r.ok) throw new Error(data?.msg||data?.message||'Registrazione non riuscita');
        if(data?.access_token){saveSession(data);window.location.href='/progetto';return}
        setMessage('Registrazione completata. Controlla la tua email e conferma l’account, poi potrai accedere alla tua area progetto.');
      }else{
        const r=await fetch(`${API}/auth/v1/token?grant_type=password`,{
          method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},
          body:JSON.stringify({email,password})
        });
        const data=await r.json();
        if(!r.ok) throw new Error(data?.error_description||data?.msg||data?.message||'Accesso non riuscito');
        saveSession(data);
        window.location.href='/progetto';
      }
    }catch(err:any){setError(err?.message||'Operazione non riuscita. Riprova.')}finally{setLoading(false)}
  }

  return <main className="auth-page">
    <header className="config-nav"><a className="brand" href="/"><span>PROGETTO</span> ABITARE INSIEME</a><a className="ghost" href="/">Torna alla home</a></header>
    <section className="auth-layout">
      <div className="auth-side"><span className="kicker">LA TUA AREA PERSONALE</span><h1>Il tuo progetto, sempre con te.</h1><p>Salva configurazione, simulazioni, immobili e profili di personale. Segui il percorso fino all’apertura della struttura.</p><div className="auth-benefits"><div><b>01</b><span>Salva il configuratore</span></div><div><b>02</b><span>Continua da dove avevi lasciato</span></div><div><b>03</b><span>Costruisci shortlist di immobili e candidati</span></div><div><b>04</b><span>Segui l’avanzamento del progetto</span></div></div></div>
      <div className="auth-card"><div className="auth-tabs"><button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setError('');setMessage('')}}>Accedi</button><button className={mode==='register'?'active':''} onClick={()=>{setMode('register');setError('');setMessage('')}}>Registrati</button></div><form onSubmit={submit}>{mode==='register'&&<label><span>Nome e cognome</span><input name="name" required placeholder="Mario Rossi"/></label>}<label><span>Email</span><input name="email" type="email" required placeholder="nome@email.it"/></label><label><span>Password</span><input name="password" type="password" minLength={6} required placeholder="Minimo 6 caratteri"/></label>{error&&<p className="auth-error">{error}</p>}{message&&<div className="auth-message">{message}</div>}<button className="button auth-submit" disabled={loading}>{loading?'Attendi...':mode==='login'?'Accedi al mio progetto':'Crea il mio account'}</button></form><p className="auth-note">Creando un account potrai salvare i dati del tuo progetto. Le informazioni restano associate al tuo profilo e non sono pubbliche.</p></div>
    </section>
  </main>
}
