(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const root=document.documentElement;
$$('.w').forEach((w,i)=>w.style.setProperty('--i',i));
$$('.rv').forEach(e=>{const g=e.parentElement;e.style.setProperty('--d',Math.min([...g.children].indexOf(e),5)*.08+'s')});
requestAnimationFrame(()=>document.body.classList.add('ready'));
setTimeout(()=>document.body.classList.add('ready'),1500);

/* Bootcamp pipeline data */
const L=[['Python','Data types, loops, functions, lambda, comprehensions, OOP, file and JSON handling.'],['NumPy & Pandas','Arrays, broadcasting, vectorized ops; Series and DataFrames, cleaning, filtering, aggregation, CSV/Excel/JSON.'],['SQL','Database design, ERDs, DDL/DML/DQL, WHERE, GROUP BY, HAVING, aggregates and subqueries.'],['Advanced SQL','JOINs, indexes, views, CTEs, ranking functions, stored procedures, triggers, UDFs, transactions (ACID).'],['Python with SQL Server & APIs','pyodbc, CRUD from code, consuming REST APIs with requests and parsing JSON.'],['Flask & Web Scraping','REST APIs with Flask, exposing an ML model as an API, scraping dynamic sites with Selenium.'],['Data Warehousing & ETL','OLTP vs OLAP, star and snowflake schemas, fact and dimension tables, ETL with Python and SSIS.'],['Docker & Linux','Containers vs VMs, Linux commands and file system, Bash scripting.'],['NoSQL & MongoDB','NoSQL types, SQL vs NoSQL, MongoDB collections and documents, CRUD and queries.'],['Big Data Tools','Hadoop (HDFS, YARN, MapReduce), PySpark DataFrames, Airflow DAGs, Kafka streaming.'],['Microsoft Azure','Data Lake Storage, Data Factory, Synapse, Databricks, Fabric, Event Hubs, Stream Analytics.'],['AI, Vector Databases & RAG','Embeddings, similarity search, ChromaDB, and a RAG pipeline connecting a vector database to an LLM.']];
$('#learn').innerHTML=L.map(([t,d])=>`<div class="card rv tilt" tabindex="0"><h3>${t}</h3><p>${d}</p></div>`).join('');
$$('#learn .rv').forEach((e,i)=>e.style.setProperty('--d',(i%4)*.07+'s'));

/* Typing */
const T=['Data Engineering','Machine Learning','Software Development','Data Analysis'],ty=$('#typed');
if(rm)ty.textContent=T[0];else{let i=0,c=T[0].length,del=true,tm;const step=()=>{const w=T[i];if(del){c--;if(c<=0){del=false;i=(i+1)%T.length}}else{c++;if(c>=T[i].length){del=true;ty.textContent=T[i];tm=setTimeout(step,1800);return}}
ty.textContent=T[i].slice(0,c);tm=setTimeout(step,del?35:70)};tm=setTimeout(step,3200);document.addEventListener('visibilitychange',()=>{document.hidden?clearTimeout(tm):(clearTimeout(tm),tm=setTimeout(step,300))})}

/* Reveal, counters, section tone, nav state */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);setTimeout(()=>e.target.classList.add('done'),1300);$$('[data-n]',e.target).forEach(count)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.tl li').forEach(e=>io.observe(e));
function count(b){const n=+b.dataset.n,d=+b.dataset.d||0;if(rm){b.textContent=n.toFixed(d);return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1100,1);b.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(f)})(t0)}
const tone={a:'88,196,255',b:'120,170,255',c:'88,210,200',d:'150,150,255',e:'230,207,159',f:'88,196,255',g:'110,220,170'},L2=[];
const secs=$$('section[id]'),links=$$('#menu a');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));if(root.dataset.theme!=='light'&&tone[e.target.dataset.sec])root.style.setProperty('--gl',tone[e.target.dataset.sec])}}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so.observe(s));

/* Scroll: header, back-to-top, timeline progress */
const hd=$('#nav'),tb=$('#top-btn'),tl=$('.tl');let tk=false;
const onS=()=>{tk=false;const y=scrollY;hd.classList.toggle('sc',y>30);tb.classList.toggle('show',y>innerHeight*.8);const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight*.65-r.top)/r.height)))};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
tb.onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});

/* Mobile menu */
const bg=$('#burger'),mn=$('#menu'),tgl=o=>{mn.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu')};
bg.onclick=()=>tgl(!mn.classList.contains('open'));links.forEach(a=>a.onclick=()=>tgl(false));
addEventListener('keydown',e=>{if(e.key==='Escape'&&mn.classList.contains('open')){tgl(false);bg.focus()}});

/* Theme */
$('#theme').onclick=()=>{const l=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=l;try{localStorage.setItem('theme',l)}catch(e){}root.style.removeProperty('--gl');if(l==='dark'&&tone)so.takeRecords();draw&&draw(true)};

/* Projects accordion */
$$('.proj button').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);b.closest('.card').classList.toggle('open',o)});

/* Pointer effects: card spotlight, tilt, magnetic, photo tilt, glow, cursor */
if(fine&&!rm){
 $$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--px',x+'px');c.style.setProperty('--py',y+'px');if(c.classList.contains('tilt')&&!c.classList.contains('open')){c.style.transform=`perspective(800px) rotateX(${(.5-y/r.height)*5}deg) rotateY(${(x/r.width-.5)*6}deg) translateY(-3px)`}}));
 $$('.card.tilt').forEach(c=>c.addEventListener('pointerleave',()=>c.style.transform=''));
 $$('[data-mag]').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
 const ph=$('#photo .frame'),pc=$('#photo');pc.addEventListener('pointermove',e=>{const r=pc.getBoundingClientRect();ph.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*12+'deg');ph.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*10+'deg')});pc.addEventListener('pointerleave',()=>{ph.style.setProperty('--ry','0deg');ph.style.setProperty('--rx','0deg')});
 const cu=$('.cursor');let cx=0,cy=0,tx=0,ty2=0,run=false;
 const mv=()=>{cx+=(tx-cx)*.2;cy+=(ty2-cy)*.2;cu.style.transform=`translate(${cx}px,${cy}px)`;if(Math.abs(tx-cx)+Math.abs(ty2-cy)>.3)requestAnimationFrame(mv);else run=false};
 addEventListener('pointermove',e=>{tx=e.clientX;ty2=e.clientY;cu.classList.add('on');if(!run){run=true;requestAnimationFrame(mv)}root.style.setProperty('--mx',e.clientX/innerWidth*100+'%');root.style.setProperty('--my',e.clientY/innerHeight*100+'%');cu.classList.toggle('big',!!e.target.closest('a,button,.card,input'))},{passive:true});
 document.addEventListener('pointerleave',()=>cu.classList.remove('on'));
}

/* Network canvas */
const cv=$('#net'),cx2=cv.getContext('2d');let W,H,P=[],mx=-999,my=-999,raf=0,vis=true,dpr=1;
const col=()=>getComputedStyle(root).getPropertyValue('--acc').trim()||'#58c4ff';let ac=col();
function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx2.setTransform(dpr,0,0,dpr,0,0);const n=Math.round(Math.min(70,W*H/20000));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}))}
function draw(single){if(single===true)ac=col();cx2.clearRect(0,0,W,H);cx2.fillStyle=cx2.strokeStyle=ac;const par=scrollY*.04;
 for(const p of P){if(!rm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
  const dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<22000&&d>1){p.x+=dx/d*6;p.y+=dy/d*6}}
 for(let i=0;i<P.length;i++){const a=P[i];cx2.globalAlpha=.55;cx2.beginPath();cx2.arc(a.x,(a.y-par+H)%H,1.6,0,6.3);cx2.fill();
  for(let j=i+1;j<P.length;j++){const b=P[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;if(d<17000){cx2.globalAlpha=(1-d/17000)*.28;cx2.beginPath();cx2.moveTo(a.x,(a.y-par+H)%H);cx2.lineTo(b.x,(b.y-par+H)%H);cx2.stroke()}}}
 if(single!==true&&!rm&&vis)raf=requestAnimationFrame(draw)}
size();draw(true);if(!rm){raf=requestAnimationFrame(draw)}
addEventListener('resize',()=>{size();if(rm)draw(true)});addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
document.addEventListener('visibilitychange',()=>{vis=!document.hidden;cancelAnimationFrame(raf);if(vis&&!rm)raf=requestAnimationFrame(draw)});

/* Terminal */
const out=$('#out'),ti=$('#ti'),hist=[];let hi=0;
const C={help:()=>'Commands: about, skills, projects, education, learning, contact, theme, clear',
about:()=>'Mohamed Hasan Elsayed. Data Science & Computing student, Alexandria University. CGPA 3.98/4.00 after year one. Interests: software development, data engineering, machine learning.',
skills:()=>'Core: Python, Java, C, C++, R, OOP, Data Structures, Algorithms, Data Analysis, Data Visualization, Decision Trees, Association Rules.\nBootcamp stack: SQL, Pandas, Flask, ETL, Docker, MongoDB, Spark, Airflow, Kafka, Azure, RAG.',
projects:()=>$$('.proj h3').map((h,i)=>`${i+1}. ${h.textContent} [${$$('.tags li',h.parentElement).map(t=>t.textContent).join(', ')}]`).join('\n'),
education:()=>'B.Sc. Data Science and Computing, Alexandria University (expected 2029)\nDEPI Data Engineering (Microsoft), ongoing\nNTI Machine Learning, ongoing\nCertificates: MIT, Harvard CS50, Google',
learning:()=>L.map(l=>'- '+l[0]).join('\n'),
contact:()=>'Email: mh7267910@gmail.com\nLocation: Sidi Gaber, Alexandria, Egypt',
theme:()=>{$('#theme').click();return 'Theme set to '+root.dataset.theme}};
const print=(t,c)=>{const d=document.createElement('div');if(c)d.className=c;d.textContent=t;out.append(d);out.scrollTop=out.scrollHeight};
function run(cmd){cmd=cmd.trim().toLowerCase();if(!cmd)return;print('$ '+cmd,'c');if(cmd==='clear'){out.textContent='';return}const f=C[cmd];print(f?f():`Command not found: ${cmd}. Type help.`,f?'':'h')}
$('#tf').onsubmit=e=>{e.preventDefault();hist.push(ti.value);hi=hist.length;run(ti.value);ti.value=''};
ti.onkeydown=e=>{if(e.key==='ArrowUp'&&hi>0){ti.value=hist[--hi];e.preventDefault()}else if(e.key==='ArrowDown'){ti.value=hist[++hi]||'';hi=Math.min(hi,hist.length)}};
$('#quick').innerHTML=['help','about','skills','projects','contact'].map(c=>`<button type="button">${c}</button>`).join('');
$('#quick').onclick=e=>{if(e.target.tagName==='BUTTON')run(e.target.textContent)};
print('Welcome. Type help to see commands.','h');
})();
