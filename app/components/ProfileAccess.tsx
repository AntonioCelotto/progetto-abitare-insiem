'use client';
import {useEffect,useState} from 'react';
export default function ProfileAccess(){const[logged,setLogged]=useState(false);useEffect(()=>{setLogged(!!localStorage.getItem('sb-access-token'))},[]);if(!logged)return null;return <a className="global-profile-access" href="/profilo" aria-label="Vai al mio profilo"><span className="global-profile-icon">👤</span><span>Il mio profilo</span></a>}
