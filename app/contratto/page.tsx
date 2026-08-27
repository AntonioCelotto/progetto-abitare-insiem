'use client';
import Link from 'next/link';
import {Suspense,useState} from 'react';
import {useSearchParams} from 'next/navigation';

const API='https://lbkdoxpanxvsrgqimzzj.supabase.co';
const KEY='sb_publishable_6uNgrPI-Mj84tlHcFuICTQ_aG2zfoSU';
const products:any={
  pro_monthly:{name:'Portale PRO',price:'39 € / mese',amount:3900,term:'Abbonamento mensile con rinnovo automatico.',kind:'subscription'},
  pro_yearly:{name:'Portale PRO annuale',price:'390 € / anno',amount:39000,term:'Abbonamento annuale con rinnovo automatico.',kind:'subscription'},
  assisted_monthly:{name:'Portale Assistito',price:'99 € / mese',amount:9900,term:'Abbonamento mensile con supporto continuativo.',kind:'subscription'},
  strategy:{name:'Sessione strategica',price:'250 €',amount:25000,term:'Prestazione una tantum di 60 minuti.',kind:'service'},
  light:{name:'Consulenza LIGHT',price:'2.900 €',amount:290000,term:'Percorso di consulenza da remoto.',kind:'service'},
  full:{name:'Consulenza FULL',price:'4.500 €',amount:450000,term:'Affiancamento operativo e 12 mesi di Portale PRO.',kind:'service'},
  '360':{name:'Abitare Insieme 360',price:'da 7.900 €',amount:null,term:'Proposta personalizzata dopo valutazione del progetto.',kind:'quote'}
};

export default function ContractPage(){return <Suspense fallback={<main style={{maxWidth:900,margin:'0 auto',padding:'48px 24px 80px',color:'#173d34'}}><p>Caricamento contratto...</p></main>}><ContractContent/></Suspense>}

function ContractContent(){
  const q=useSearchParams(),code=q.get('product')||'pro_monthly',p=products[code]||products.pro_monthly;
  const[terms,setTerms]=useState(false),[privacy,setPrivacy]=useState(false),[busy,setBusy]=useState(false),[msg,setMsg]=useState('');
  const ready=terms&&privacy;
  async function proceed(){
    if(!ready)return;setBusy(true);setMsg('');
    try{
      const token=localStorage.getItem('sb-access-token')||'';
      if(!token){window.location.href=`/auth?next=${encodeURIComponent(`/contratto?product=${code}`)}`;return}
      const authHeaders={apikey:KEY,Authorization:`Bearer ${token}`};
      const ur=await fetch(`${API}/auth/v1/user`,{headers:authHeaders});
      if(!ur.ok)throw new Error('La sessione è scaduta. Accedi di nuovo per sottoscrivere il contratto.');
      const user=await ur.json();
      const signerName=user?.user_metadata?.full_name||user?.email||'Utente Abitare Insieme';
      const cr=await fetch(`${API}/rest/v1/digital_contracts`,{method:'POST',headers:{...authHeaders,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify({user_id:user.id,product_code:code,product_name:p.name,amount_cents:p.amount,currency:'EUR',contract_version:'1.0',accepted_terms:true,accepted_privacy:true,accepted_at:new Date().toISOString(),signer_name:signerName,signer_email:user.email||'',user_agent:navigator.userAgent,status:p.kind==='quote'?'requested':'accepted',payment_status:p.kind==='quote'?'not_due':'unpaid'})});
      const contractData=await cr.json();
      if(!cr.ok)throw new Error(contractData?.message||'Non è stato possibile registrare il contratto.');
      const contract=Array.isArray(contractData)?contractData[0]:contractData;
      if(p.kind==='quote'){setMsg('Richiesta registrata. Il contratto è ora visibile nella tua area personale e il team preparerà la proposta definitiva.');return}
      const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({product:code,accepted:true,contractVersion:'1.0',contractId:contract?.id})});
      const d=await r.json();
      if(!r.ok)throw new Error(d.error||'Pagamento non ancora disponibile');
      if(d.url)location.href=d.url;else setMsg(d.message||'Contratto registrato.');
    }catch(e:any){setMsg(e.message)}finally{setBusy(false)}
  }
  return <main style={{maxWidth:900,margin:'0 auto',padding:'48px 24px 80px',color:'#173d34'}}><Link href="/abbonamenti">← Piani e servizi</Link><p style={{letterSpacing:3,fontWeight:700,marginTop:48}}>CONTRATTO DIGITALE</p><h1 style={{fontFamily:'Georgia,serif',fontSize:'clamp(42px,7vw,72px)',margin:'12px 0'}}>{p.name}</h1><div style={{fontSize:28,fontWeight:700}}>{p.price}</div><p>{p.term}</p><section style={{background:'#fff',border:'1px solid #ded8ca',borderRadius:20,padding:28,marginTop:32}}><h2>Condizioni essenziali</h2><p>Il servizio è fornito attraverso il portale Abitare Insieme. Le funzionalità e le attività comprese sono quelle indicate nella pagina del piano scelto e nella presente conferma d&apos;ordine.</p><p>Gli importi sono da intendersi + IVA ove applicabile. Costi di professionisti terzi, pratiche, lavori, forniture e trasferte straordinarie non sono inclusi salvo espressa indicazione.</p>{p.kind==='subscription'&&<p>L&apos;abbonamento si rinnova secondo la periodicità scelta. La gestione del pagamento e del rinnovo sarà disponibile nell&apos;area personale.</p>}<p>Il contratto accettato e lo stato del servizio resteranno consultabili nella sezione “Il mio abbonamento”.</p></section><div style={{display:'grid',gap:14,margin:'28px 0'}}><label style={{display:'flex',gap:12,alignItems:'flex-start',fontWeight:600}}><input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} style={{marginTop:4}}/> Ho letto e accetto le condizioni del servizio e confermo la scelta di {p.name}.</label><label style={{display:'flex',gap:12,alignItems:'flex-start',fontWeight:600}}><input type="checkbox" checked={privacy} onChange={e=>setPrivacy(e.target.checked)} style={{marginTop:4}}/> Confermo di aver preso visione dell&apos;informativa sul trattamento dei dati collegata al servizio.</label></div><button onClick={proceed} disabled={!ready||busy} style={{border:0,borderRadius:10,padding:'16px 24px',background:ready?'#285c4d':'#9badA7',color:'#fff',fontWeight:700,fontSize:16,cursor:ready?'pointer':'not-allowed'}}>{busy?'Registrazione…':p.kind==='quote'?'Accetta e invia richiesta':'Accetta e continua al pagamento'}</button>{msg&&<p style={{marginTop:18,fontWeight:600}}>{msg}</p>}<p style={{marginTop:28,fontSize:13,color:'#68736e'}}>Il testo contrattuale definitivo dovrà essere validato con le condizioni legali, fiscali, privacy e di recesso della società fornitrice prima dell&apos;apertura commerciale al pubblico.</p></main>
}
