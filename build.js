// Generates index/press/privacy/404, one page per game, sitemap.xml and robots.txt from config.js.
// Netlify runs this automatically on every deploy (see netlify.toml). Locally: node build.js
const fs=require('fs'),vm=require('vm');
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync('config.js','utf8')+'\n;this.SITE=SITE;this.GAMES=GAMES;',ctx);
const {SITE,GAMES}=ctx, ROOT=(SITE.url||'').replace(/\/$/,'');
const tpl=fs.readFileSync('template.html','utf8');
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=g=>g.slug||g.id, abs=p=>/^https?:/.test(p)?p:ROOT+'/'+p, DIMG=abs(SITE.ogImage||'og-image.png');
const ld=o=>JSON.stringify(o).replace(/</g,'\\u003c');
const today=new Date().toISOString().slice(0,10), urls=[];
function page(file,o){
  const v={TITLE:o.title,DESC:o.desc,CANON:ROOT+o.path,IMG:o.img||DIMG,PAGE:o.page,GAME:o.game||'',BASE:o.base?`<base href="${o.base}">\n`:'',
    ROBOTS:o.noindex?'<meta name="robots" content="noindex">\n':'',OGTYPE:o.page==='game'?'website':'website',SITENAME:SITE.name,JSONLD:ld(o.ld||{}),STATIC:o.html||''};
  let s=tpl; for(const k in v)s=s.split('{{'+k+'}}').join(k==='JSONLD'||k==='STATIC'||k==='BASE'||k==='ROBOTS'?v[k]:e(v[k]));
  fs.mkdirSync(require('path').dirname(file),{recursive:true}); fs.writeFileSync(file,s);
  if(!o.noindex)urls.push(ROOT+o.path);
}
const games=GAMES.map(g=>`<li><a href="games/${slug(g)}.html">${e(g.title)}</a>: ${e(g.tagline)}</li>`).join('');
page('index.html',{title:`${SITE.name} – ${GAMES[0].title}, ${GAMES[0].tagline.replace(/\.$/,'')}`,desc:`${SITE.tagline} Home of ${GAMES.map(g=>g.title).join(', ')}.`,path:'/',page:'home',
  html:`<h1>${e(SITE.name)}</h1><p>${e(SITE.tagline)}</p><ul>${games}</ul>`,
  ld:{'@context':'https://schema.org','@type':'Organization',name:SITE.name,url:ROOT,logo:abs('favicon.svg'),email:SITE.email,sameAs:(SITE.socials||[]).map(s=>s.url).filter(Boolean)}});
for(const g of GAMES){
  page(`games/${slug(g)}.html`,{base:'../',title:`${g.title} – ${g.platforms} game | ${SITE.name}`,desc:g.description.slice(0,155).replace(/\s\S*$/,'')+'…',path:`/games/${slug(g)}`,page:'game',game:g.id,img:g.cover?abs(g.cover):DIMG,
    html:`<h1>${e(g.title)}</h1><p>${e(g.tagline)}</p><p>${e(g.description)}</p><ul>${g.features.map(f=>`<li>${e(f[0])}: ${e(f[1])}</li>`).join('')}</ul>`,
    ld:{'@context':'https://schema.org','@type':'VideoGame',name:g.title,description:g.description,url:`${ROOT}/games/${slug(g)}`,image:g.cover?abs(g.cover):DIMG,genre:g.genre||[],gamePlatform:g.platforms,applicationCategory:'Game',author:{'@type':'Organization',name:SITE.name,url:ROOT},...(g.storeUrl?{sameAs:[g.storeUrl]}:{})}});
}
page('press.html',{title:`Press Kit | ${SITE.name}`,desc:`Press kit for ${SITE.name}: descriptions, facts, screenshots and contact.`,path:'/press',page:'press',html:`<h1>Press Kit</h1><p>${e(SITE.email)}</p>`});
page('privacy.html',{title:`Privacy Policy | ${SITE.name}`,desc:`Privacy Policy for ${SITE.name} games.`,path:'/privacy',page:'privacy',html:fs.readFileSync('policy.html','utf8')});
page('404.html',{base:'/',title:`Page not found | ${SITE.name}`,desc:'Page not found.',path:'/404',page:'404',noindex:true,html:'<h1>404</h1>'});
fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${ROOT}/sitemap.xml\n`);
console.log('Built',urls.length,'pages');
