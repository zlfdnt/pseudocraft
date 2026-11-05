// Ilustrasi, demo interaktif, dan efek visual PseudoCraft
(function(){'use strict';
const W=window,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wait=ms=>new Promise(r=>setTimeout(r,ms)),alive=el=>document.body.contains(el);
W.hl=l=>esc(l).replace(/^(\s*)(Jika tidak, jika|Jika tidak|Jika|Selama|Mulai|Selesai|MULAI|SELESAI|Set|Tampilkan|Masukkan|Input|Tanyakan|Kurangi|Tambah)(?=\s|:|$)/,'$1<span class="kw">$2</span>');
W.codeBox=(t,l,id)=>`<div class="codeD" data-code><div class="cdh"><span class="dots3"><i></i><i></i><i></i></span><b>${esc(t)}</b><span class="cda"><button class="mini" data-play title="Telusuri baris demi baris">▶ Telusuri</button><button class="mini" data-copy title="Salin">⧉ Salin</button></span></div><pre>${l.map((x,i)=>`<div class="ln" data-l="${i}"><i>${i+1}</i><span>${W.hl(x)||'&nbsp;'}</span></div>`).join('')}</pre></div>`;
W.mountCode=root=>$$('[data-code]',root).forEach(b=>{const L=$$('.ln',b),txt=L.map(x=>x.querySelector('span').textContent.replace(/\u00a0/g,'')).join('\n');
 $('[data-copy]',b).onclick=e=>{navigator.clipboard&&navigator.clipboard.writeText(txt).then(()=>{e.target.textContent='✓ Tersalin';setTimeout(()=>e.target.textContent='⧉ Salin',1400)})};
 $('[data-play]',b).onclick=async e=>{const btn=e.target;if(btn._run)return;btn._run=1;for(const x of L){x.classList.add('hot');await wait(380);x.classList.remove('hot');if(!alive(b))break}btn._run=0}});
// ---------- konfeti ----------
W.confetti=function(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const c=document.createElement('canvas');c.className='confetti';c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext('2d'),cols=['#2EC4B6','#F2617A','#8E7DFF','#FFD166','#3CC08E'],P=Array.from({length:90},()=>({x:innerWidth/2+(Math.random()-.5)*200,y:innerHeight*.55,vx:(Math.random()-.5)*12,vy:-Math.random()*13-4,s:Math.random()*7+4,c:cols[Math.random()*5|0],r:Math.random()*6,vr:(Math.random()-.5)*.4}));let t=0;(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});if(++t<110)requestAnimationFrame(f);else c.remove()})()};
// ---------- ilustrasi penulis algoritma pertama (stilisasi imajinatif, bukan potret) ----------
W.adaArt=()=>{const st=[[22,30],[60,18],[96,52],[170,22],[210,44],[250,16],[300,38],[338,20],[18,100],[345,96],[200,100],[150,60],[320,70],[40,60]].map((s,i)=>`<circle cx="${s[0]}" cy="${s[1]}" r="${i%3?1.4:2.2}" fill="#fff" class="tw" style="animation-delay:${(i*.3).toFixed(1)}s"/>`).join('');
 const gear=(x,y,r,cls,c)=>`<g class="${cls}" style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="${r*.28}" stroke-dasharray="${r*.42} ${r*.3}"/><circle cx="${x}" cy="${y}" r="${r*.78}" fill="rgba(255,255,255,.06)" stroke="${c}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r*.2}" fill="${c}"/></g>`;
 const card=(x,y,rot,d)=>`<g class="fl" style="animation-delay:${d}s"><g transform="translate(${x} ${y}) rotate(${rot})"><rect width="46" height="30" rx="4" fill="#fff8dc" stroke="#e3c565"/>${[0,1,2,3,4].map(i=>[0,1,2].map(j=>(i+j)%2?`<circle cx="${9+i*7}" cy="${8+j*7}" r="2" fill="#7c4dff"/>`:'').join('')).join('')}</g></g>`;
 return`<svg viewBox="0 0 360 300" class="ada" role="img" aria-label="Ilustrasi imajinatif penulis algoritma pertama di antara roda gigi mesin hitung dan kartu berlubang"><defs><linearGradient id="adsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f0c3d"/><stop offset=".55" stop-color="#3b2a96"/><stop offset="1" stop-color="#c2478a"/></linearGradient><radialGradient id="adaura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd166" stop-opacity=".55"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient><linearGradient id="address" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9b7bff"/><stop offset="1" stop-color="#5a33d6"/></linearGradient><filter id="adglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
 <rect width="360" height="300" fill="url(#adsky)"/>${st}
 <circle cx="300" cy="46" r="20" fill="#fff6c9" opacity=".95"/><circle cx="308" cy="42" r="18" fill="#2a2080"/>
 <rect x="222" y="118" width="128" height="156" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.28)" stroke-dasharray="4 4"/>
 ${gear(262,198,34,'spin','#ffd166')}${gear(322,232,24,'spinr','#2ec4b6')}${gear(306,152,20,'spin','#f2617a')}
 ${card(190,76,-12,0)}${card(262,70,10,1.2)}${card(30,118,8,.6)}
 <text x="22" y="62" class="yr" filter="url(#adglow)">1843</text>
 <text x="214" y="112" class="tk" fill="#70f8e8">Jika</text><text x="296" y="112" class="tk" fill="#ffd166">Selama</text><text x="150" y="120" class="tk" fill="#ff9fb0">= …</text>
 <circle cx="124" cy="150" r="112" fill="url(#adaura)"/>
 <path d="M0 270 Q90 250 180 264 T360 258 V300 H0Z" fill="#120a3a"/>
 <path d="M70 274 Q90 212 112 178 L148 178 Q170 212 190 274 Z" fill="url(#address)"/><path d="M84 262 Q130 250 176 262" stroke="#c8bfff" stroke-width="2" fill="none" opacity=".7"/><path d="M92 240 Q130 228 168 240" stroke="#c8bfff" stroke-width="2" fill="none" opacity=".5"/>
 <path d="M112 178 L118 142 Q130 136 142 142 L148 178 Z" fill="#6a3de8"/><ellipse cx="130" cy="142" rx="12" ry="6" fill="#f2c9a0"/>
 <path d="M118 148 Q96 168 108 190" stroke="#6a3de8" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M142 148 Q168 162 158 188" stroke="#6a3de8" stroke-width="9" stroke-linecap="round" fill="none"/>
 <g class="fl" style="animation-delay:.3s"><rect x="106" y="184" width="58" height="26" rx="4" fill="#fff8dc" transform="rotate(-6 135 197)" filter="url(#adglow)"/><g transform="rotate(-6 135 197)" stroke="#2ec4b6" stroke-width="2" stroke-linecap="round"><path d="M114 192h26M114 198h38M114 204h20"/></g></g>
 <circle cx="108" cy="192" r="5" fill="#f2c9a0"/><circle cx="159" cy="190" r="5" fill="#f2c9a0"/>
 <circle cx="130" cy="119" r="22" fill="#f2c9a0"/><path d="M107 120 Q104 90 130 89 Q156 90 153 120 Q147 104 130 104 Q113 104 107 120Z" fill="#3b2417"/><circle cx="130" cy="86" r="10" fill="#3b2417"/><circle cx="106" cy="126" r="5.5" fill="#3b2417"/><circle cx="154" cy="126" r="5.5" fill="#3b2417"/>
 <circle cx="122" cy="121" r="2.2" fill="#1e2a4a"/><circle cx="138" cy="121" r="2.2" fill="#1e2a4a"/><circle cx="116" cy="128" r="3.5" fill="#f2617a" opacity=".35"/><circle cx="144" cy="128" r="3.5" fill="#f2617a" opacity=".35"/><path d="M123 129 Q130 135 137 129" stroke="#b3584a" stroke-width="2" fill="none" stroke-linecap="round"/>
 <path d="M186 134l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ffd166" class="tw"/>
</svg>`};
// ---------- demo interaktif ----------
const ST=[['🔥','Panaskan air'],['🥄','Tuang susu bubuk ke dalam gelas'],['🫗','Tuang air panas ke dalam gelas'],['🌀','Aduk hingga merata']];
W.DEMOS={
urut(el){let swap=false,n=0,busy=false;const draw=msg=>{const L=swap?[ST[3],ST[0],ST[1],ST[2]]:ST;el.innerHTML=`<div class="dm-h">🎮 Coba sendiri — urutan langkah</div><ol class="dm-steps">${L.map((s,i)=>`<li class="${i<n?'on':''} ${i===n-1?'now':''}"><span>${s[0]}</span>${s[1]}</li>`).join('')}</ol><div class="dm-out ${msg&&msg[0]}">${msg?msg[1]:'Tekan ▶ untuk menjalankan algoritma.'}</div><div class="row"><button class="mini pri" data-r>▶ Jalankan</button><button class="mini" data-s>${swap?'↩ Kembalikan urutan':'🔀 Pindahkan "Aduk" ke awal'}</button></div>`;
  $('[data-r]',el).onclick=async()=>{if(busy)return;busy=true;for(n=1;n<=4;n++){draw();W.sfx('step');await wait(650);if(!alive(el))return}n=4;draw(swap?['bad','❌ Gelas masih kosong saat diaduk — susu tidak tercampur. Urutan menentukan hasil!']:['ok','✅ Susu hangat siap diminum! 🥛']);busy=false;if(swap)W.sfx('wrong');else{W.sfx('success');W.confetti()}};
  $('[data-s]',el).onclick=()=>{if(busy)return;swap=!swap;n=0;draw()}};draw()},
cabang(el){el.innerHTML=`<div class="dm-h">🎮 Coba sendiri — percabangan</div><label class="dm-l">nilai_ujian = <b id="cv">80</b></label><input type="range" min="0" max="100" value="80" id="cr" style="margin:6px 0"><div class="dm-cond" id="cc"></div><pre class="dm-code"><div id="l1">Jika nilai_ujian ≥ 75</div><div id="l2">    Tampilkan "Selamat, kamu lulus!"</div><div id="l3">Jika tidak</div><div id="l4">    Tampilkan "Kamu belum lulus. Tetap semangat belajar!"</div></pre><div class="dm-out" id="co"></div>`;
 let last=null;const up=()=>{const v=+$('#cr',el).value,ok=v>=75;if(last!==ok){W.sfx(ok?'correct':'wrong');last=ok}else W.sfx('tick');$('#cv',el).textContent=v;$('#cc',el).innerHTML=`${v} ≥ 75 → <b class="${ok?'t':'f'}">${ok?'BENAR':'SALAH'}</b>`;['l1','l2'].forEach(i=>$('#'+i,el).classList.toggle('hot',ok));['l3','l4'].forEach(i=>$('#'+i,el).classList.toggle('hot',!ok));const o=$('#co',el);o.className='dm-out '+(ok?'ok':'bad');o.textContent=ok?'🎉 Selamat, kamu lulus!':'💪 Kamu belum lulus. Tetap semangat belajar!'};$('#cr',el).oninput=up;up()},
loop(el){let busy=false;el.innerHTML=`<div class="dm-h">🎮 Coba sendiri — pengulangan</div><label class="dm-l">Set angka = <b id="lv">5</b></label><input type="range" min="1" max="9" value="5" id="lr" style="margin:6px 0"><pre class="dm-code"><div>Selama angka ≥ 1</div><div>    Tampilkan angka</div><div>    Kurangi angka sebanyak 1</div></pre><div class="dm-chips" id="lc"></div><div class="dm-out" id="lo">Tekan ▶ untuk menjalankan pengulangan.</div><button class="mini pri" id="lg">▶ Jalankan</button>`;
 $('#lr',el).oninput=e=>{$('#lv',el).textContent=e.target.value};
 $('#lg',el).onclick=async()=>{if(busy)return;busy=true;const c=$('#lc',el),o=$('#lo',el);c.innerHTML='';let a=+$('#lr',el).value;while(true){o.className='dm-out';o.innerHTML=`angka = ${a} → angka ≥ 1 ? <b class="${a>=1?'t':'f'}">${a>=1?'BENAR':'SALAH'}</b>`;await wait(650);if(!alive(el))return;if(a<1)break;c.insertAdjacentHTML('beforeend',`<span class="pop">${a}</span>`);a--;}o.className='dm-out ok';o.textContent='✅ Kondisi SALAH, pengulangan berhenti.';busy=false;W.confetti()}},
var(el){el.innerHTML=`<div class="dm-h">🎮 Coba sendiri — variabel</div><div class="dm-in"><label>nilai1 <input type="number" id="v1" value="85" min="0" max="100"></label><label>nilai2 <input type="number" id="v2" value="90" min="0" max="100"></label></div><div class="dm-boxes"><div class="bx"><small>nilai1</small><b id="b1"></b></div><div class="bx"><small>nilai2</small><b id="b2"></b></div><div class="bx r"><small>jumlah</small><b id="b3"></b></div><div class="bx g"><small>rata_rata</small><b id="b4"></b></div></div><pre class="dm-code"><div>jumlah = nilai1 + nilai2</div><div>rata_rata = jumlah / 2</div></pre>`;
 const set=(id,v)=>{const e=$('#'+id,el);if(e.textContent!==String(v)){e.textContent=v;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}};
 const up=()=>{W.sfx('tick');const a=+$('#v1',el).value||0,b=+$('#v2',el).value||0;set('b1',a);set('b2',b);set('b3',a+b);set('b4',(a+b)/2)};$('#v1',el).oninput=up;$('#v2',el).oninput=up;up()}
};
// ---------- tiga struktur kontrol, masing-masing langsung dengan contoh ----------
const TIGA=[
 {k:'Urutan',e:'➡️',c:'#2EC4B6',d:'Langkah dikerjakan <b>satu per satu</b>, dari atas ke bawah — tanpa syarat dan tanpa pengulangan.',ex:'Contoh: menyiapkan susu hangat',code:['Mulai','    Panaskan air','    Tuang susu bubuk ke dalam gelas','    Tuang air panas ke dalam gelas','    Aduk hingga merata','Selesai'],run:'Jalankan langkah-langkah ▶'},
 {k:'Percabangan',e:'🔀',c:'#8E7DFF',d:'Memilih <b>jalur berbeda</b> berdasarkan kondisi: Jika benar → jalur A, Jika tidak → jalur B.',ex:'Contoh: membawa payung atau topi',code:['Mulai','    Jika sedang_hujan = benar','        Tampilkan "Bawa payung ☂️"','    Jika tidak','        Tampilkan "Pakai topi 🧢"','Selesai'],tog:1},
 {k:'Pengulangan',e:'🔁',c:'#FFB300',d:'Langkah <b>diulang selama</b> kondisi tertentu masih terpenuhi.',ex:'Contoh: menghitung mundur 3 ke 1',code:['Mulai','    Set angka = 3','    Selama angka ≥ 1','        Tampilkan angka','        Kurangi angka sebanyak 1','Selesai'],run:'Jalankan pengulangan ▶'}];
W.tigaHTML=()=>`<div class="tiga"><div class="tg-tabs">${TIGA.map((t,i)=>`<button class="tg-tab ${i?'':'on'}" data-t="${i}" style="--c:${t.c}"><span>${t.e}</span>${t.k}</button>`).join('')}</div><div class="tg-pan" id="tgp"></div></div>`;
W.mountTiga=root=>$$('.tiga',root).forEach(box=>{const pan=$('#tgp',box);let cur=-1;const show=i=>{cur=i;const t=TIGA[i];$$('.tg-tab',box).forEach((b,j)=>b.classList.toggle('on',j===i));
 pan.style.setProperty('--c',t.c);pan.innerHTML=`<div class="tg-d"><span class="tg-e">${t.e}</span><div><h4>${t.k}</h4><p>${t.d}</p></div></div><div class="tg-ex">📌 ${t.ex}</div>${W.codeBox(t.k.toLowerCase()+'.pseudo',t.code)}<div class="tg-act" id="ta">${t.tog?`<label class="sw"><input type="checkbox" id="sw1" checked><i></i> ☔ Sedang hujan?</label>`:`<button class="mini pri" id="tr">${t.run}</button>`}<div class="dm-out" id="to">Coba tekan tombol di atas.</div></div>`;W.mountCode(pan);
 const L=$$('.ln',pan),o=$('#to',pan);
 if(i===0)$('#tr',pan).onclick=async()=>{for(let k=0;k<L.length;k++){L.forEach(x=>x.classList.remove('hot'));L[k].classList.add('hot');W.sfx('step');o.textContent=k===0?'Mulai…':k===L.length-1?'✅ Selesai: susu hangat siap!':'Langkah '+k+': '+L[k].textContent.replace(/^\d+/,'').trim();await wait(600);if(!alive(pan)||cur!==0)return}L.forEach(x=>x.classList.remove('hot'));W.sfx('success');W.confetti()};
 if(i===1){const u=()=>{const h=$('#sw1',pan).checked;W.sfx(h?'correct':'select');L.forEach((x,k)=>x.classList.toggle('hot',h?(k===1||k===2):(k===3||k===4)));o.className='dm-out '+(h?'ok':'bad');o.textContent=h?'Kondisi BENAR → jalur Jika: Bawa payung ☂️':'Kondisi SALAH → jalur Jika tidak: Pakai topi 🧢'};$('#sw1',pan).onchange=u;u()}
 if(i===2)$('#tr',pan).onclick=async()=>{let a=3;while(a>=0){L.forEach(x=>x.classList.remove('hot'));L[2].classList.add('hot');o.innerHTML=`angka = ${a} → angka ≥ 1 ? <b>${a>=1?'BENAR':'SALAH'}</b>`;await wait(700);if(!alive(pan)||cur!==2)return;if(a<1)break;L[3].classList.add('hot');L[4].classList.add('hot');o.textContent='Tampilkan '+a+' ✔';W.sfx('pop',3-a);await wait(700);if(!alive(pan)||cur!==2)return;a--}L.forEach(x=>x.classList.remove('hot'));o.className='dm-out ok';o.textContent='✅ Berhenti: angka = 0 tidak memenuhi angka ≥ 1.';W.sfx('success');W.confetti()}};
 $$('.tg-tab',box).forEach((b,j)=>b.onclick=()=>show(j));show(0)});
W.mountDemos=root=>$$('[data-demo]',root).forEach(el=>{if(el._m)return;el._m=1;const f=W.DEMOS[el.dataset.demo];if(f)f(el)});

// ===================== EFEK SUARA (Web Audio, tanpa berkas) =====================
// Prinsip: fungsi yang sama = bunyi yang sama. Tombol biasa=click, tombol utama=press, pilih opsi=select, tab/chip=blip,
// nomor soal/langkah=tick, buka/tutup=open/close, benar=correct, salah=wrong, selesai=success/fanfare, peringatan=warn, item muncul=pop.
(function(){
const AC=W.AudioContext||W.webkitAudioContext;let ctx=null,master=null;
const on=()=>localStorage.getItem('pc_snd')!=='0';
function ac(){if(!AC)return null;if(!ctx){ctx=new AC();master=ctx.createGain();master.gain.value=.55;master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume();return ctx}
function tone(f,d,type,v,t0,f2){const c=ac();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+(t0||0);o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.2,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.03)}
const seq=(fs,d,type,v,gap)=>fs.forEach((f,i)=>tone(f,d,type,v,i*gap));
const SFX={
 click:()=>tone(520,.07,'triangle',.16),
 press:()=>{tone(392,.08,'triangle',.18);tone(588,.1,'triangle',.15,.05)},
 select:()=>tone(620,.09,'sine',.2,0,860),
 blip:()=>tone(760,.06,'square',.07),
 tick:()=>tone(900,.04,'square',.06),
 open:()=>tone(420,.15,'sine',.15,0,780),
 close:()=>tone(780,.15,'sine',.15,0,420),
 correct:()=>seq([523,659,784],.16,'triangle',.2,.09),
 wrong:()=>tone(230,.26,'sawtooth',.11,0,140),
 success:()=>seq([523,659,784,1047],.2,'triangle',.22,.1),
 fanfare:()=>{seq([523,523,659,784,1047],.22,'triangle',.22,.12);tone(262,.7,'sine',.14,.05);tone(392,.7,'sine',.12,.05)},
 warn:()=>{tone(300,.12,'square',.14);tone(300,.12,'square',.14,.18)},
 step:()=>tone(600,.08,'sine',.15),
 pop:(i)=>tone(300*Math.pow(1.07,Math.min(i||0,14)),.11,'sine',.22,0,700*Math.pow(1.07,Math.min(i||0,14))),
 flip:()=>tone(500,.13,'sine',.13,0,1000),
 unlock:()=>seq([392,523,659,880],.14,'triangle',.18,.08)
};
let _ln='',_lt=0;
W.sfx=(n,a)=>{if(!on())return;const t=Date.now();if(n===_ln&&t-_lt<90&&n!=='pop')return;_ln=n;_lt=t;try{(SFX[n]||SFX.click)(a)}catch(e){}};
W.sfxOn=on;W.sfxToggle=()=>{localStorage.setItem('pc_snd',on()?'0':'1');if(on())W.sfx('success');return on()};
})();
// ===================== LOOP LAB (pengulangan interaktif) =====================
W.DEMOS.loop=function(el){
 let a=5,it=0,phase='cond',timer=null,busy=false,speed=550,bug=false;
 el.innerHTML=`<div class="dm-h">🎮 Loop Lab — lihat pengulangan bekerja</div>
 <div class="lp-ctl"><label class="dm-l">Set angka = <b id="lv">5</b></label><input type="range" min="1" max="9" value="5" id="lr" aria-label="nilai awal angka">
 <div class="row" id="sp"><button class="ch" data-s="900">🐢 Pelan</button><button class="ch on" data-s="550">🚶 Normal</button><button class="ch" data-s="250">🚀 Cepat</button></div>
 <label class="sw"><input type="checkbox" id="lb"><i></i> 🐞 Hapus baris "Kurangi angka" (uji loop tak berhenti)</label></div>
 <div class="lp-stage"><svg class="lp-fc" viewBox="0 0 300 250" role="img" aria-label="Diagram alir pengulangan"><defs><marker id="arl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1E2A4A"/></marker></defs>
  <g class="lpn" data-n="dec"><polygon points="110,26 180,60 110,94 40,60"/><text x="110" y="64">angka ≥ 1 ?</text></g>
  <g class="lpn" data-n="show"><rect x="50" y="118" width="120" height="34" rx="4"/><text x="110" y="139">Tampilkan angka</text></g>
  <g class="lpn" data-n="dec2"><rect x="50" y="176" width="120" height="34" rx="4"/><text x="110" y="197">angka = angka − 1</text></g>
  <g class="lpn" data-n="end"><rect x="205" y="44" width="86" height="32" rx="16"/><text x="248" y="64">Selesai</text></g>
  <path class="fl" d="M110 94V118" marker-end="url(#arl)"/><path class="fl" d="M110 152V176" marker-end="url(#arl)"/><path class="fl" d="M50 193H18V60H38" marker-end="url(#arl)"/><path class="fl" d="M180 60H203" marker-end="url(#arl)"/>
  <text class="fb" x="116" y="110">Ya</text><text class="fb" x="182" y="52">Tidak</text></svg>
  <div class="lp-side"><div class="lp-var"><small>variabel</small><b>angka</b><span id="lval">5</span></div><div class="lp-iter">Putaran ke-<b id="lit">0</b></div>
  <pre class="dm-code lp-code"><div>Selama angka ≥ 1</div><div>    Tampilkan angka</div><div>    Kurangi angka sebanyak 1</div></pre></div></div>
 <div class="dm-chips" id="lc"></div><div class="dm-out" id="lm"></div>
 <div class="row"><button class="mini pri" id="lg">▶ Jalankan</button><button class="mini" id="ls">⏭ Langkah</button><button class="mini" id="lx">↺ Ulangi</button></div>`;
 const hi=(n,l)=>{$$('.lpn',el).forEach(x=>x.classList.toggle('on',x.dataset.n===n));$$('.lp-code div',el).forEach((x,i)=>x.classList.toggle('hot',i===l))};
 const setVar=v=>{const e=$('#lval',el);e.textContent=v;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')};
 const msg=(t,c)=>{const m=$('#lm',el);m.className='dm-out '+(c||'');m.innerHTML=t};
 const stop=()=>{clearTimeout(timer);busy=false};
 const reset=()=>{stop();a=+$('#lr',el).value;it=0;phase='cond';$('#lc',el).innerHTML='';$('#lit',el).textContent=0;setVar(a);hi('',-1);msg('Tekan ▶ Jalankan, atau ⏭ Langkah untuk berjalan satu langkah.')};
 const step=()=>{
  if(phase==='cond'){const t=a>=1;hi('dec',0);msg(`angka = <b>${a}</b> → angka ≥ 1 ? <b class="${t?'t':'f'}">${t?'BENAR':'SALAH'}</b>`);W.sfx('tick');phase=t?'show':'end';return true}
  if(phase==='show'){if(it>=10&&bug){hi('',-1);msg('⚠️ <b>Loop tak pernah berhenti!</b> Nilai angka tidak berubah, sehingga kondisi selalu BENAR. (Dihentikan otomatis setelah 10 putaran.)','bad');W.sfx('warn');phase='stop';return false}
   it++;$('#lit',el).textContent=it;hi('show',1);$('#lc',el).insertAdjacentHTML('beforeend',`<span class="pop">${a}</span>`);msg(`Tampilkan <b>${a}</b>`);W.sfx('pop',it);phase='dec';return true}
  if(phase==='dec'){hi('dec2',2);if(!bug){a--;setVar(a);msg(`Kurangi angka sebanyak 1 → angka = <b>${a}</b>`)}else msg(`Baris "Kurangi angka" dihapus → angka tetap <b>${a}</b>`);W.sfx('step');phase='cond';return true}
  if(phase==='end'){hi('end',-1);msg(`✅ Kondisi SALAH → pengulangan <b>berhenti</b>. Total ${it} putaran.`,'ok');W.sfx('success');W.confetti();phase='stop';return false}
  return false};
 const run=()=>{if(busy)return;if(phase==='stop')reset();busy=true;(function tick(){if(!alive(el)){busy=false;return}if(!step()){busy=false;return}timer=setTimeout(tick,speed)})()};
 $('#lr',el).oninput=e=>{$('#lv',el).textContent=e.target.value;reset();W.sfx('tick')};
 $$('#sp .ch',el).forEach(b=>b.onclick=()=>{speed=+b.dataset.s;$$('#sp .ch',el).forEach(x=>x.classList.toggle('on',x===b))});
 $('#lb',el).onchange=e=>{bug=e.target.checked;el.querySelector('.lp-fc').classList.toggle('bug',bug);$('.lp-code div:nth-child(3)',el).classList.toggle('del',bug);reset();W.sfx(bug?'warn':'select')};
 $('#lg',el).onclick=run;$('#ls',el).onclick=()=>{stop();if(phase==='stop')reset();step()};$('#lx',el).onclick=reset;reset()};
// ===================== NOTIFIKASI 7 HARI (kalender interaktif) =====================
W.DEMOS.notif=function(el){
 let d=1,it=0,phase='cond',timer=null,busy=false,bug=false;
 el.innerHTML=`<div class="dm-h">🎮 Coba sendiri — notifikasi belajar 7 hari</div><div class="cal">${[1,2,3,4,5,6,7].map(i=>`<div class="day" data-d="${i}"><small>Hari ${i}</small><i>🔔</i></div>`).join('')}</div>
 <pre class="dm-code"><div>Set hari = 1</div><div>Selama hari ≤ 7</div><div>    Tampilkan "Hari ke-" + hari + ": Saatnya belajar!"</div><div>    Tambah hari dengan 1</div></pre><div class="dm-out" id="nm"></div>
 <label class="sw"><input type="checkbox" id="nb"><i></i> 🐞 Hapus baris "Tambah hari dengan 1"</label><div class="row" style="margin-top:8px"><button class="mini pri" id="ng">▶ Jalankan</button><button class="mini" id="nx">↺ Ulangi</button></div>`;
 const L=$$('.dm-code div',el),msg=(t,c)=>{const m=$('#nm',el);m.className='dm-out '+(c||'');m.innerHTML=t},hot=i=>L.forEach((x,k)=>x.classList.toggle('hot',k===i));
 const stop=()=>{clearTimeout(timer);busy=false};
 const reset=()=>{stop();d=1;it=0;phase='cond';$$('.day',el).forEach(x=>{x.classList.remove('on','now');x.querySelector('i').textContent='🔔'});hot(-1);msg('Tekan ▶ Jalankan untuk mengirim notifikasi harian.')};
 const step=()=>{
  if(phase==='cond'){hot(1);const t=d<=7;msg(`hari = <b>${d}</b> → hari ≤ 7 ? <b class="${t?'t':'f'}">${t?'BENAR':'SALAH'}</b>`);W.sfx('tick');phase=t?'show':'end';return true}
  if(phase==='show'){if(bug&&it>=8){hot(-1);msg('⚠️ <b>Notifikasi hari ke-1 terkirim terus-menerus!</b> hari tidak pernah bertambah. (Dihentikan otomatis.)','bad');W.sfx('warn');phase='stop';return false}
   it++;hot(2);const c=$(`.day[data-d="${Math.min(d,7)}"]`,el);c.classList.add('on');c.querySelector('i').textContent='✅';msg(`Hari ke-${d}: Saatnya belajar! 🔔`);W.sfx('pop',d);phase='inc';return true}
  if(phase==='inc'){hot(3);if(!bug)d++;msg(bug?`hari tetap <b>${d}</b>`:`Tambah hari dengan 1 → hari = <b>${d}</b>`);W.sfx('step');phase='cond';return true}
  if(phase==='end'){hot(-1);msg('✅ hari = 8 → kondisi SALAH, pengulangan <b>berhenti</b>. 7 notifikasi terkirim!','ok');W.sfx('success');W.confetti();phase='stop';return false}
  return false};
 $('#ng',el).onclick=()=>{if(busy)return;if(phase==='stop')reset();busy=true;(function tick(){if(!alive(el)){busy=false;return}if(!step()){busy=false;return}timer=setTimeout(tick,520)})()};
 $('#nx',el).onclick=reset;$('#nb',el).onchange=e=>{bug=e.target.checked;L[3].classList.toggle('del',bug);reset();W.sfx(bug?'warn':'select')};reset()};
})();
