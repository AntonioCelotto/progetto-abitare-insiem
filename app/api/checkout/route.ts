import {NextResponse} from 'next/server';
const products:any={pro_monthly:{name:'Portale PRO mensile',planName:'Portale PRO',amount:3900,interval:'month',priceEnv:'STRIPE_PRICE_PRO_MONTHLY',mode:'subscription'},pro_yearly:{name:'Portale PRO annuale',planName:'Portale PRO',amount:39000,interval:'year',priceEnv:'STRIPE_PRICE_PRO_YEARLY',mode:'subscription'},assisted_monthly:{name:'Portale Assistito',planName:'Portale Assistito',amount:9900,interval:'month',priceEnv:'STRIPE_PRICE_ASSISTED_MONTHLY',mode:'subscription'},strategy:{name:'Sessione strategica',priceEnv:'STRIPE_PRICE_STRATEGY',mode:'payment'},light:{name:'Consulenza LIGHT',priceEnv:'STRIPE_PRICE_LIGHT',mode:'payment'},full:{name:'Consulenza FULL',priceEnv:'STRIPE_PRICE_FULL',mode:'payment'},'360':{name:'Abitare Insieme 360',quote:true}};
const API='https://lbkdoxpanxvsrgqimzzj.supabase.co';
const KEY='sb_publishable_6uNgrPI-Mj84tlHcFuICTQ_aG2zfoSU';
export async function POST(req:Request){
 try{
  const body=await req.json(),p=products[body.product];
  if(!p||!body.accepted||!body.contractId)return NextResponse.json({error:'Richiesta non valida.'},{status:400});
  const token=(req.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');
  if(!token)return NextResponse.json({error:'Accedi al portale prima di continuare.'},{status:401});
  const ur=await fetch(`${API}/auth/v1/user`,{headers:{apikey:KEY,Authorization:`Bearer ${token}`}});
  if(!ur.ok)return NextResponse.json({error:'Sessione non valida o scaduta.'},{status:401});
  const user=await ur.json();
  if(p.quote)return NextResponse.json({message:'Richiesta registrata. Riceverai la proposta personalizzata.'});
  const secret=process.env.STRIPE_SECRET_KEY,price=process.env[p.priceEnv];
  if(!secret||!price)return NextResponse.json({error:'Il contratto è stato registrato. Per attivare il pagamento dobbiamo ora collegare le credenziali Stripe.'},{status:503});
  const params=new URLSearchParams();
  params.set('mode',p.mode);params.set('line_items[0][price]',price);params.set('line_items[0][quantity]','1');
  params.set('success_url','https://portaleabitareinsieme.it/progetto/abbonamento?checkout=success&session_id={CHECKOUT_SESSION_ID}');
  params.set('cancel_url',`https://portaleabitareinsieme.it/contratto?product=${encodeURIComponent(body.product)}&checkout=cancelled`);
  params.set('client_reference_id',body.contractId);params.set('customer_email',user.email||'');
  params.set('metadata[user_id]',user.id);params.set('metadata[contract_id]',body.contractId);params.set('metadata[product]',body.product);params.set('metadata[contract_version]',body.contractVersion||'1.0');
  if(p.mode==='subscription'){params.set('subscription_data[metadata][user_id]',user.id);params.set('subscription_data[metadata][contract_id]',body.contractId);params.set('subscription_data[metadata][product]',body.product)}
  const r=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/x-www-form-urlencoded'},body:params});
  const d=await r.json();if(!r.ok)return NextResponse.json({error:d?.error?.message||'Errore Stripe.'},{status:502});
  return NextResponse.json({url:d.url});
 }catch{return NextResponse.json({error:'Impossibile preparare il checkout.'},{status:500})}
}
