/* ============================ ENGINE (no need to edit) ============================ */
const $ = s => document.querySelector(s), app = $('#app');
const P = typeof PT !== 'undefined' ? PT : {ui:{},site:{},games:{}};
const EN = {home:'Home',games:'Games',about:'About',contact:'Contact',welcome:'Welcome to',aboutMe:'About me',soloDev:'Hi, I\'m a solo developer',getInTouch:'Get in touch',trailer:'Trailer',aboutGame:'About the game',shots:'Screenshots',shotsSub:'Click to enlarge.',videos:'Videos',videosSub:'Gameplay, dev logs and more.',allGames:'← All games',steam:'Steam Page',made:'Made with ❤️',studio:'Games',videoWord:'Video',watchTrailer:'Click to watch the trailer',press:'Press Kit',privacy:'Privacy Policy',play:'Google Play',getPlay:'Get it on Google Play',devlog:'Dev Log',subTitle:'Stay in the loop',subText:'Sign up to hear about news and release dates. No spam.',subPh:'Your email',subBtn:'Sign up',subOk:"Thanks! You're on the list. 🎉",subErr:'Something went wrong, please try again.',wish:'Wishlist on Steam',nf:'Page not found',home404:'Back home'};
let lang='en'; try{lang=localStorage.getItem('lang')==='pt'?'pt':'en'}catch(e){}
const T = k => (lang==='pt' && P.ui[k]) || EN[k];
const siteT = k => (lang==='pt' && P.site[k]) || SITE[k];
const gameT = (g,k) => (lang==='pt' && P.games[g.id] && P.games[g.id][k]) || g[k];

const gurl=g=>'games/'+(g.slug||g.id)+'.html';
const tagH=g=>gameT(g,'status')?`${tagH(g)}`:'';
const store=g=>g.store==='play'?{n:T('play'),w:T('getPlay')}:{n:T('steam'),w:T('wish')};
const hues = [18,260,200,340,140,45];
function ph(label,i=0,w=1280,h=720){
  const hu=hues[i%hues.length];
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hu},45%,22%)'/><stop offset='1' stop-color='hsl(${hu+40},40%,8%)'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g stroke='#ffffff18' stroke-width='2'><path d='M0 ${h*.7}H${w}M0 ${h*.85}H${w}'/></g><text x='50%' y='47%' fill='#ffffffcc' font-family='sans-serif' font-size='${h/10}' font-weight='700' text-anchor='middle'>${label}</text><text x='50%' y='58%' fill='#ffffff77' font-family='sans-serif' font-size='${h/22}' text-anchor='middle'>placeholder ${w}×${h}</text></svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}
const img=(src,label,i,w,h)=>src||ph(label,i,w,h);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function gameCard(g,i){return `<a class="card" href="${gurl(g)}"><img src="${img(g.cover,g.title,i)}" alt="${esc(g.title)}"><div>${tagH(g)}<h3>${esc(g.title)}</h3><p>${esc(gameT(g,'tagline'))}</p></div></a>`}

function home(){
  document.title=SITE.name+' – '+T('studio');
  app.innerHTML=`
  <div class="hero" id="home"><div class="w"><h1>${T('welcome')} <span>${esc(SITE.name)}</span></h1><p>${esc(siteT('tagline'))}</p>
  <a class="btn" href="#about">${T('aboutMe')}</a></div></div>
  <section id="games"><div class="w"><h2 style="margin-bottom:28px">${T('games')}</h2><br><div class="grid">${GAMES.map(gameCard).join('')}</div></div></section>
  ${newsSec()}<section id="about" class="alt"><div class="w two"><div><h2>${T('soloDev')}</h2><p>${esc(siteT('about'))}</p></div><img src="${img(SITE.aboutImg,'Developer photo',1,800,600)}" alt="Developer"></div></section>
  ${subSec()}<section id="contact"><div class="w" style="text-align:center"><h2 style="margin-bottom:28px">${T('getInTouch')}</h2><br>
  <a class="btn" href="mailto:${SITE.email}">${esc(SITE.email)}</a></div></section>`;
}

function vidBlock(v,title){
  if(v.youtube) return `<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${v.youtube}" allowfullscreen loading="lazy" title="${esc(title||T('videoWord'))}"></iframe></div>`;
  if(v.file) return `<div class="vid"><video src="${v.file}" controls preload="metadata"></video></div>`;
  return `<div class="vid"><img src="${ph(T('videoWord')+': '+(title||'...'),3)}" alt=""><div class="play">▶</div></div>`;
}

function game(id){
  const g=GAMES.find(x=>x.id===id); if(!g){location.replace('index.html');return}
  const vt=gameT(g,'videos')||[], feats=gameT(g,'features'); curTrailer=g.trailer||'';
  document.title=g.title+' – '+SITE.name;
  app.innerHTML=`
  <div class="gh"><div class="w">${tagH(g)}<h1 style="font-size:clamp(2rem,5vw,3.4rem);margin:4px 0">${esc(g.title)}</h1>
  <p style="color:var(--mut);font-size:1.15rem;margin:0">${esc(gameT(g,'tagline'))}</p>
  <div class="meta"><span>🖥️ ${esc(g.platforms)}</span>${gameT(g,'players')?`<span>👥 ${esc(gameT(g,'players'))}</span>`:''}</div>
  <a class="btn" href="${g.storeUrl||'#'}" ${g.storeUrl?'target="_blank" rel="noopener"':''}>${store(g).n}</a></div></div>
  <section><div class="w trow">
    <div><div class="vid tthumb" ${g.trailer?'onclick="openTrailer()"':'style="cursor:default"'}><img src="${g.trailer?'https://i.ytimg.com/vi/'+g.trailer+'/hqdefault.jpg':ph(T('trailer'),3)}" alt="${T('trailer')}" onerror="this.src=ph(T('trailer'),3)">${g.trailer?'<div class="play">▶</div>':''}</div>${g.trailer?`<p class="hint">${T('watchTrailer')}</p>`:''}</div>
    <div><h2>${T('aboutGame')}</h2><p style="margin:10px 0 18px;color:#c4cde8">${esc(gameT(g,'description'))}</p>${feats&&feats.length?`<div class="feat mini">${feats.map(f=>`<div><b>${f[0]}</b><br>${esc(f[1])}</div>`).join('')}</div>`:''}</div>
  </div></section>
  <section class="alt"><div class="w"><h2>${T('shots')}</h2><p class="sub">${T('shotsSub')}</p><div class="shots">${g.screenshots.map((s,i)=>`<img src="${img(s,'Screenshot '+(i+1),i)}" alt="Screenshot ${i+1}" onclick="zoom(this.src)">`).join('')}</div></div></section>
  ${g.videos&&g.videos.length?`<section><div class="w"><h2>${T('videos')}</h2><p class="sub">${T('videosSub')}</p><div class="grid">${g.videos.map((v,i)=>{const t=vt[i]||v.title||'';return `<div>${vidBlock(v,t)}<p style="margin:6px 0 0">${esc(t)}</p></div>`}).join('')}</div></div></section>`:''}
  <section class="alt"><div class="w" style="text-align:center"><h2>${store(g).w}</h2><br><a class="btn" href="${g.storeUrl||'#'}" ${g.storeUrl?'target="_blank" rel="noopener"':''}>${store(g).n}</a></div></section>
  <section><div class="w" style="text-align:center"><a class="btn o" href="index.html#games">${T('allGames')}</a></div></section>`;
}
let curTrailer='';
document.body.insertAdjacentHTML('beforeend','<div id="vm" onclick="closeTrailer()"><button id="vx" aria-label="Close">✕</button><div class="box" onclick="event.stopPropagation()"></div></div>');
window.openTrailer=()=>{$('#vm .box').innerHTML=curTrailer?`<iframe src="https://www.youtube-nocookie.com/embed/${curTrailer}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`:`<img src="${ph(T('trailer'),3)}" alt="">`;$('#vm').style.display='grid'};
window.closeTrailer=()=>{$('#vm').style.display='none';$('#vm .box').innerHTML=''};
addEventListener('keydown',e=>{if(e.key==='Escape')closeTrailer()});
window.zoom=s=>{$('#lbi').src=s;$('#lb').style.display='grid'};

/* header nav + language button, footer socials */
const ICONS={
 YouTube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.500 3.500 12 3.500 12 3.500s-7.500 0-9.400.6A3 3 0 0 0 .5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 0 0 2.100 2.100c1.900.6 9.400.6 9.400.6s7.500 0 9.400-.6a3 3 0 0 0 2.100-2.100C24 15.900 24 12 24 12s0-3.900-.5-5.800zM9.600 15.600V8.400l6.200 3.600-6.200 3.600z"/></svg>',
 Steam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="15.200" cy="9.200" r="3.200"/><circle cx="8.300" cy="15.800" r="2" fill="currentColor"/><path d="M10 14.700l3-2.800"/></svg>',
 Instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.200"/><circle cx="17.300" cy="6.700" r="1" fill="currentColor" stroke="none"/></svg>'};
function chrome(){
  $('header nav').innerHTML=`<a href="index.html#home">${T('home')}</a><a href="index.html#games">${T('games')}</a><a href="index.html#about">${T('about')}</a><a href="index.html#contact">${T('contact')}</a><button class="lang" id="lang" title="English / Português">🌐 ${lang==='en'?'PT':'EN'}</button>`;
  $('#lang').onclick=()=>{lang=lang==='en'?'pt':'en';try{localStorage.setItem('lang',lang)}catch(e){}render()};
  document.documentElement.lang=lang==='pt'?'pt-PT':'en';
  const soc=SITE.socials.map(s=>`<a href="${s.url||'#'}" ${s.url?'target="_blank" rel="noopener"':''} aria-label="${s.label}" title="${s.label}">${ICONS[s.label]||s.label}</a>`).join('');
  $('footer .w').innerHTML=`<div class="soc">${soc}</div>© ${new Date().getFullYear()} JunigameDev · ${T('made')}<div class="fl"><a href="press.html">${T('press')}</a> · <a href="privacy.html">${T('privacy')}</a></div>`;
}

/* extra sections & pages */
const newsT=(n,i)=>(lang==='pt'&&P.news&&P.news[i])||n;
function newsSec(){
  if(typeof NEWS==='undefined'||!NEWS.length)return '';
  return `<section><div class="w"><h2 style="margin-bottom:28px">${T('devlog')}</h2><br><div class="news">${NEWS.map((n,i)=>{const x=newsT(n,i);return `<article class="card nw"><small>${esc(n.date)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`}).join('')}</div></div></section>`}
function subSec(){
  return `<section class="alt"><div class="w" style="text-align:center"><h2>${T('subTitle')}</h2><p class="sub">${T('subText')}</p>
  <form class="subf" name="newsletter" method="POST" onsubmit="sub(event)"><input type="hidden" name="form-name" value="newsletter"><p hidden><input name="bot-field"></p>
  <input type="email" name="email" required placeholder="${T('subPh')}" aria-label="Email"><button class="btn" type="submit">${T('subBtn')}</button></form><p class="msg"></p></div></section>`}
window.sub=async e=>{e.preventDefault();const f=e.target,msg=f.nextElementSibling;
  try{const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()});
    msg.textContent=r.ok?T('subOk'):T('subErr');if(r.ok)f.reset()}catch(x){msg.textContent=T('subErr')}};
function press(){
  document.title=T('press')+' – '+SITE.name;
  app.innerHTML=`<section><div class="w"><h2 style="margin-bottom:28px">${T('press')}</h2><br>
  <div class="card nw"><h3>${esc(SITE.name)}</h3><p>${esc(siteT('tagline'))}</p><p>✉️ <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p></div>
  ${GAMES.map(g=>`<div class="card nw" style="margin-top:20px">${tagH(g)}<h3>${esc(g.title)}</h3><p>${esc(gameT(g,'tagline'))}</p><p>🖥️ ${[g.platforms,gameT(g,'players')].filter(Boolean).join(' · ')}</p><p>${esc(gameT(g,'description'))}</p><ul>${gameT(g,'features').map(f=>`<li><b>${f[0]}</b> – ${esc(f[1])}</li>`).join('')}</ul><p><a href="${gurl(g)}">${esc(g.title)}</a>${g.storeUrl?` · <a href="${g.storeUrl}" target="_blank" rel="noopener">${store(g).n}</a>`:''}</p>
  <div class="shots">${g.screenshots.map((s,i)=>s?`<a href="${s}" download><img src="${s}" alt=""></a>`:`<img src="${ph('Screenshot '+(i+1),i)}" alt="">`).join('')}</div></div>`).join('')}</div></section>`;
}
/* scroll-reveal animation */
function reveal(){
  const els=document.querySelectorAll('section h2,section .sub,.card,.feat div,.shots img,.vid,.two>*,.trow>*');
  if(!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
}
function render(){
  chrome();
  const pg=document.body.dataset.page;
  if(pg==='game')game(document.body.dataset.game);else if(pg==='press')press();else if(pg==='privacy'){}
  else if(pg==='404'){document.title=T('nf');app.innerHTML=`<section><div class="w" style="text-align:center"><h2>404</h2><br><p>${T('nf')}</p><a class="btn" href="index.html">${T('home404')}</a></div></section>`}
  else home();
  reveal();
}
render();
if(location.hash&&document.body.dataset.page!=='game')setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView(),0);
