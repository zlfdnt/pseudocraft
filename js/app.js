(function(){'use strict';
const W=window,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const URL_=(W.APP_CONFIG||{}).GAS_URL||'',DEMO=/GANTI|XXXX/.test(URL_)&&typeof W.DemoAPI==='function';
const S={token:localStorage.getItem('pc_t')||'',me:null,boot:null};
try{S.me=JSON.parse(localStorage.getItem('pc_m')||'null')}catch(e){}
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2800)}
function modal(h){$('#mbody').innerHTML=h;$('#modal').classList.add('on')}
function closeModal(){$('#modal').classList.remove('on')}
$('#mx').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
async function api(action,data){
  let r;
  if(DEMO){await new Promise(x=>setTimeout(x,100));r=W.DemoAPI(action,data||{},S.me)}
  else{
    if(/GANTI/.test(URL_))return{success:false,message:'URL backend belum diisi di js/config.js.'};
    try{const x=await fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,token:S.token,data:data||{}})});r=await x.json()}
    catch(e){r={success:false,message:'Gagal terhubung ke server. Periksa koneksi internet.'}}}
  if(r&&r.code==='AUTH'&&S.me){logout(true)}
  return r}
if(!DEMO&&URL_&&!/GANTI/.test(URL_)){try{fetch(URL_+'?w=1',{mode:'no-cors'}).catch(()=>0)}catch(e){}}   // bangunkan server lebih dulu
const lcK=k=>'pc_c_'+(S.me?S.me.username:'x')+'_'+k;
const lc={get(k){try{return JSON.parse(localStorage.getItem(lcK(k)))}catch(e){return null}},set(k,v){try{localStorage.setItem(lcK(k),JSON.stringify({t:Date.now(),v:v}))}catch(e){}},del(k){localStorage.removeItem(lcK(k))}};
const fmt=v=>{if(!v)return'-';const d=new Date(v);return isNaN(d)?String(v):d.toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Jakarta'})+' WIB'};
const NAVS={siswa:[['beranda','🏠','Beranda'],['materi','📖','Materi'],['simulasi','🧩','Simulasi'],['asesmen','📝','Asesmen'],['hasil','📊','Hasil Saya']],
 guru:[['dash','📈','Dashboard'],['bank','🗂️','Bank Soal'],['kelas','⚙️','Kelas'],['pel','🛡️','Pelanggaran'],['materi','📖','Materi']],
 pengamat:[['rekap','📋','Rekap'],['materi','📖','Materi']],tamu:[['beranda','🏠','Beranda']]};
const HOME={siswa:'beranda',guru:'dash',pengamat:'rekap',tamu:'beranda'};
const role=()=>S.me?S.me.peran:'tamu';
function setNav(cur){const n=NAVS[role()];$('#dnav').innerHTML=n.map(x=>`<a data-go="${x[0]}" class="${x[0]===cur?'on':''}">${x[2]}</a>`).join('');$('#bnav').innerHTML=n.map(x=>`<a data-go="${x[0]}" class="${x[0]===cur?'on':''}"><span>${x[1]}</span>${x[2]}</a>`).join('');
 const b=$('#btnLogin');b.textContent=S.me?'👤 '+S.me.nama.split(' ')[0]:'Masuk';b.onclick=()=>S.me?accountModal():loginModal()}
const PC=W.PC={$,$$,esc,toast,modal,closeModal,api,S,DEMO,fmt,lc,pages:{},guard:null,role,setNav,hist:[],cur:null};
const TITLES={beranda:'Beranda',materi:'Daftar Materi',bab:'Materi',simulasi:'Daftar Simulasi',sim:'Simulasi',asesmen:'Asesmen',hasil:'Hasil Saya',dash:'Dashboard',bank:'Bank Soal',kelas:'Pengaturan Kelas',pel:'Log Pelanggaran',rekap:'Rekap Belajar'},PARENT={bab:'materi',sim:'simulasi'};
function crumb(p){const c=$('#crumb');if(!c)return;if(p===HOME[role()]){c.innerHTML='';return}c.innerHTML=`<button class="cb" data-back>← Kembali</button><button class="cb" data-go="${HOME[role()]}">🏠 Beranda</button><span class="ct">${TITLES[p]||''}</span>`}
PC.back=()=>{const p=PC.cur&&PC.cur.p;if(PARENT[p])return go(PARENT[p]);const h=PC.hist.pop();go(h?h.p:HOME[role()],h&&h.arg,true)};
async function go(p,arg,isBack){
  if(PC.guard&&!PC.guard(p))return;
  if(PC.cleanup){PC.cleanup();PC.cleanup=null}
  const r=role(),ok=NAVS[r].some(x=>x[0]===p)||(r==='siswa'&&['bab','sim'].includes(p))||(r!=='siswa'&&p==='bab');
  if(!ok)p=HOME[r];
  if(!isBack&&PC.cur&&PC.cur.p!==p)PC.hist.push(PC.cur);if(PC.hist.length>20)PC.hist.shift();PC.cur={p:p,arg:arg};
  const v=$('#view');setNav(p==='bab'?'materi':p==='sim'?'simulasi':p);crumb(p);v.innerHTML='<div class="sk" style="height:150px"></div><div class="sk"></div><div class="sk"></div>';
  try{await PC.pages[p](v,arg)}catch(e){console.error(e);v.innerHTML='<div class="card gate"><span class="em">😵</span><b>Terjadi kesalahan menampilkan halaman.</b><button class="btn mt" data-back>← Kembali</button></div>'}
  PC.autoSlides(v);PC.fx(v);if(!(p==='bab'&&arg&&String(arg).indexOf(':')>-1))scrollTo({top:0,behavior:'instant'})}
PC.go=go;
document.addEventListener('click',e=>{const t=e.target.closest('[data-go]');if(t){e.preventDefault();go(t.dataset.go,t.dataset.arg);return}if(e.target.closest('[data-back]'))PC.back()});
// efek: riak pada tombol, muncul saat digulir, miring 3D ringan
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b||b.disabled)return;const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rp';const d=Math.max(r.width,r.height);s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
let _io;PC.fx=root=>{if(!('IntersectionObserver' in W)){$$('.reveal',root).forEach(x=>x.classList.add('in'));return}if(!_io)_io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');_io.unobserve(e.target)}}),{threshold:.08});$$('.reveal:not(.in)',root).forEach(x=>_io.observe(x));
 if(matchMedia('(hover:hover) and (pointer:fine)').matches)$$('.tilt',root).forEach(el=>{el.onmousemove=ev=>{const r=el.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateX(${(-y*6).toFixed(1)}deg) rotateY(${(x*8).toFixed(1)}deg) translateY(-4px)`};el.onmouseleave=()=>{el.style.transform=''}})};
// ---------- login / akun ----------
function loginModal(){
  modal(`<h2>Masuk ke PseudoCraft</h2><form id="lf" autocomplete="on"><label>Username atau NIS</label><input id="lu" placeholder="mis. 10250142" autocomplete="username" required><label>Sandi</label><input id="lp" type="password" placeholder="Sandi" autocomplete="current-password" required><button class="btn" style="width:100%;margin-top:6px" id="lg">Masuk</button></form>${DEMO?'<p class="muted mt">Mode demo — sandi apa saja. Coba <b>contoh</b>, <b>guru</b>, atau <b>pengamat</b>.</p>':'<p class="muted mt">Lupa sandi? Minta guru mengatur ulang.</p>'}`);
  $('#lf').onsubmit=async e=>{e.preventDefault();const b=$('#lg');b.disabled=true;b.textContent='Memeriksa…';
   const r=await api('login',{username:$('#lu').value,password:$('#lp').value});b.disabled=false;b.textContent='Masuk';
   if(!r.success)return toast(r.message||'Gagal masuk.');
   S.token=r.data.token;S.me=r.data.me;S.boot=null;localStorage.setItem('pc_t',S.token);localStorage.setItem('pc_m',JSON.stringify(S.me));closeModal();toast('Halo, '+S.me.nama+'! 👋');go(HOME[role()])}}
function accountModal(){const m=S.me;
  modal(`<h2>👤 ${esc(m.nama)}</h2><p class="muted">${esc(m.peran)}${m.kelas?' • Kelas '+esc(m.kelas):''}${m.nis?' • NIS '+esc(m.nis):''}</p><h3 style="margin-top:12px">Ganti sandi</h3><form id="gf"><input id="g1" type="password" placeholder="Sandi lama" autocomplete="current-password" required><input id="g2" type="password" placeholder="Sandi baru (min. 8, huruf + angka)" autocomplete="new-password" required><button class="btn" style="width:100%">Simpan sandi</button></form><button class="btn coral mt" style="width:100%" id="lo">Keluar</button>`);
  $('#gf').onsubmit=async e=>{e.preventDefault();const r=await api('gantiSandi',{lama:$('#g1').value,baru:$('#g2').value});toast(r.message||'Selesai');if(r.success)closeModal()};
  $('#lo').onclick=()=>logout()}
function logout(expired){S.me=null;S.token='';S.boot=null;localStorage.removeItem('pc_t');localStorage.removeItem('pc_m');closeModal();toast(expired?'Sesi berakhir, silakan masuk lagi.':'Sampai jumpa!');go('beranda')}
PC.loginModal=loginModal;PC.logout=logout;
// ---------- slideshow ----------
PC.slides=(arr,fn)=>`<div class="slides">${arr.map((x,i)=>fn(x,i)).join('')}<div class="dots">${arr.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>`;
PC.autoSlides=root=>{$$('.slides',root).forEach((el,k)=>{const s=$$('.s',el),d=$$('.dots i',el);let i=0;if(el._t)clearInterval(el._t);
 el._t=setInterval(()=>{if(!document.body.contains(el))return clearInterval(el._t);s[i].classList.remove('on');d[i].classList.remove('on');i=(i+1)%s.length;s[i].classList.add('on');d[i].classList.add('on')},3200+k*400)})};
// ---------- kursor lup ----------
(function(){const l=$('#lens');if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 l.innerHTML=`<svg viewBox="0 0 100 100"><defs><radialGradient id="g" cx="35%" cy="30%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".4" stop-color="#bff3ee" stop-opacity=".35"/><stop offset="1" stop-color="#2EC4B6" stop-opacity=".18"/></radialGradient><linearGradient id="h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5a3c"/><stop offset="1" stop-color="#4b2e1c"/></linearGradient></defs><rect x="62" y="62" width="14" height="38" rx="7" transform="rotate(-45 69 81)" fill="url(#h)"/><circle cx="38" cy="38" r="28" fill="url(#g)" stroke="#9aa6b2" stroke-width="7"/><circle cx="38" cy="38" r="31.5" fill="none" stroke="#e9eef3" stroke-width="2" opacity=".8"/><ellipse cx="28" cy="25" rx="9" ry="5" fill="#fff" opacity=".8" transform="rotate(-35 28 25)"/><circle cx="30" cy="40" r="5" fill="#fff" stroke="#1E2A4A" stroke-width="1.5"/><circle cx="46" cy="40" r="5" fill="#fff" stroke="#1E2A4A" stroke-width="1.5"/><circle id="p1" cx="30" cy="40" r="2.2" fill="#1E2A4A"/><circle id="p2" cx="46" cy="40" r="2.2" fill="#1E2A4A"/><path d="M29 50q9 7 18 0" fill="none" stroke="#1E2A4A" stroke-width="2" stroke-linecap="round"/></svg>`;
 document.body.classList.add('lens-on');let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y,vx=0,bl=0;
 addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;l.classList.toggle('big',!!e.target.closest('button,a,.opt,.flip,.nav button,[data-go],.chip,.sl,tr.clk,.simc'))},{passive:true});
 const p1=$('#p1',l),p2=$('#p2',l);
 (function loop(){const nx=x+(tx-x)*.18;vx=nx-x;x=nx;y=y+(ty-y)*.18;l.style.transform=`translate(${x-30}px,${y-30}px) rotate(${Math.max(-18,Math.min(18,vx*1.2))}deg)`;
  const dx=Math.max(-2,Math.min(2,(tx-x)/40)),dy=Math.max(-2,Math.min(2,(ty-y)/40)),r=(++bl%260<6)?.4:2.2;
  [p1,p2].forEach((p,i)=>{p.setAttribute('cx',30+i*16+dx);p.setAttribute('cy',40+dy);p.setAttribute('r',r)});requestAnimationFrame(loop)})()})();
addEventListener('load',()=>{setNav('beranda');go(S.me?HOME[role()]:'beranda')});
})();
