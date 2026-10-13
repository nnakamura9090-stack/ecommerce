const DEFAULT_PRODUCTS = [
  {id:'s1', title:'Bike Radium Number Plate', artist:'Sanju Art Danta', price:299, oldPrice:399, cat:'Number Plates', img:'https://picsum.photos/seed/sanju-plate1/600/600', rating:4.9, reviews:412, badge:'Sale', stock:20, date:'2026-09-28', desc:'Radium reflective bike number plate, IND font, waterproof. Same-day making.'},
  {id:'s2', title:'Car Number Plate (Pair)', artist:'Sanju Art Danta', price:799, oldPrice:null, cat:'Number Plates', img:'https://picsum.photos/seed/sanju-plate2/600/600', rating:4.8, reviews:188, badge:'New', stock:15, date:'2026-09-20', desc:'Acrylic + radium car number plate pair, front & back, with frame.'},
  {id:'s3', title:'House Name Plate — Acrylic', artist:'Sanju Art Danta', price:649, oldPrice:null, cat:'Name Plates', img:'https://picsum.photos/seed/sanju-name1/600/600', rating:4.9, reviews:256, badge:null, stock:12, date:'2026-08-15', desc:'Custom house name plate, acrylic with golden letters. Hindi/English both.'},
  {id:'s4', title:'Shop Board Name Plate', artist:'Sanju Art Danta', price:1499, oldPrice:1899, cat:'Name Plates', img:'https://picsum.photos/seed/sanju-shop1/600/600', rating:4.7, reviews:98, badge:'-20%', stock:6, date:'2026-07-10', desc:'Dukaan/office ACP + acrylic shop board, 3×2 ft, fitting included in Danta.'},
  {id:'s5', title:'Flex Banner 4×6 ft', artist:'Sanju Art Danta', price:499, oldPrice:null, cat:'Flex & Vinyl', img:'https://picsum.photos/seed/sanju-flex1/600/600', rating:4.8, reviews:340, badge:null, stock:30, date:'2026-09-25', desc:'High-quality flex banner printing, wedding/d Election/dukhan opening. Design free.'},
  {id:'s6', title:'Vinyl Sticker Pack (20 pcs)', artist:'Sanju Art Danta', price:199, oldPrice:249, cat:'Radium', img:'https://picsum.photos/seed/sanju-radium1/600/600', rating:4.9, reviews:520, badge:'Sale', stock:100, date:'2026-06-05', desc:'Radium night-glow stickers — bike, scooty, mobile, laptop. Waterproof.'},
  {id:'s7', title:'Custom Radium Name Sticker', artist:'Sanju Art Danta', price:99, oldPrice:null, cat:'Radium', img:'https://picsum.photos/seed/sanju-radium2/600/600', rating:4.8, reviews:610, badge:null, stock:200, date:'2026-10-01', desc:'Apne naam ka radium sticker — bike/car/helmet ke liye. 2 min me ready.'},
  {id:'s8', title:'Wedding Thermocol Decoration', artist:'Sanju Art Danta', price:2999, oldPrice:3999, cat:'Thermocol Decor', img:'https://picsum.photos/seed/sanju-wed1/600/600', rating:5.0, reviews:64, badge:'Booking', stock:4, date:'2026-09-29', desc:'Shaadi stage + gate thermocol decoration, full setup in Danta area. Advance booking.'},
  {id:'s9', title:'Birthday Backdrop Setup', artist:'Sanju Art Danta', price:1499, oldPrice:null, cat:'Thermocol Decor', img:'https://picsum.photos/seed/sanju-bday1/600/600', rating:4.9, reviews:112, badge:'New', stock:8, date:'2026-09-18', desc:'Birthday balloon + thermocol name backdrop, cartoon theme available.'},
  {id:'s10', title:'Anniversary Stage Decor', artist:'Sanju Art Danta', price:1999, oldPrice:null, cat:'Thermocol Decor', img:'https://picsum.photos/seed/sanju-anni1/600/600', rating:4.8, reviews:47, badge:null, stock:5, date:'2026-08-22', desc:'Anniversary couple stage with couple name in thermocol + lights.'},
  {id:'s11', title:'Vinyl Sunboard Poster', artist:'Sanju Art Danta', price:349, oldPrice:null, cat:'Flex & Vinyl', img:'https://picsum.photos/seed/sanju-vinyl1/600/600', rating:4.7, reviews:143, badge:null, stock:25, date:'2026-09-05', desc:'Vinyl + sunboard poster for shop offers, menu, rate list. A3–3×2 ft.'},
  {id:'s12', title:'Tractor radium strip set', artist:'Sanju Art Danta', price:449, oldPrice:549, cat:'Radium', img:'https://picsum.photos/seed/sanju-tractor1/600/600', rating:4.8, reviews:230, badge:'Sale', stock:0, date:'2026-04-01', desc:'Tractor-trolley reflective radium patti set, night safety + stylish look.'},
];

const CATS = ['All','Radium','Number Plates','Name Plates','Flex & Vinyl','Thermocol Decor'];
let state = { q:'', cat:'All', max:5000, sort:'featured', stock:false, sale:false };
let products = load('sanju_products', DEFAULT_PRODUCTS);
let cart = load('sanju_cart', {}); // {id: qty}
let wishlist = new Set(load('sanju_wish', []));
let checkoutStep = 1, orderInfo = {};

function load(k, fb){ try{ const v = JSON.parse(localStorage.getItem(k)); return v ?? fb }catch{ return fb } }
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)) }
const $ = id => document.getElementById(id);
const money = n => '₹' + Number(n).toLocaleString('en-IN');

/* ---------- INTERACTIVE HERO ---------- */
let heroIdx = 0, heroTimer = null, heroProg = null, heroPaused = false, heroList = [];
function heroFeatured(){ return [...products].sort((a,b)=>b.rating-a.rating).slice(0,5) }
function renderHeroThumbs(){
  heroList = heroFeatured();
  if(heroIdx >= heroList.length) heroIdx = 0;
  $('heroThumbs').innerHTML = heroList.map((p,i)=>`<img src="${p.img}" data-h="${i}" class="${i===heroIdx?'active':''}" alt="${p.title}" />`).join('');
  document.querySelectorAll('[data-h]').forEach(t=>t.onclick=e=>{e.stopPropagation();goHero(+t.dataset.h)});
}
function goHero(i){
  heroList = heroFeatured();
  heroIdx = (i + heroList.length) % heroList.length;
  const p = heroList[heroIdx]; if(!p) return;
  const img = $('heroImg');
  img.classList.add('fade');
  setTimeout(()=>{ img.src = p.img; img.onload = ()=>img.classList.remove('fade'); setTimeout(()=>img.classList.remove('fade'),350); img.classList.add('zoom'); setTimeout(()=>img.classList.remove('zoom'),3000) },180);
  $('heroBadge').textContent = p.badge || p.cat; $('heroBadge').style.display = p.badge||p.cat?'':'none';
  $('heroCat').textContent = p.cat + ' • ★ ' + p.rating;
  $('heroTitle').textContent = p.title;
  $('heroArtist').textContent = 'by ' + p.artist;
  $('heroPrice').textContent = money(p.price);
  document.querySelectorAll('#heroThumbs img').forEach((t,j)=>t.classList.toggle('active', j===heroIdx));
  restartHeroBar();
}
function restartHeroBar(){
  clearInterval(heroProg); const bar = $('heroBar'); let w = 0; bar.style.width = '0';
  heroProg = setInterval(()=>{ if(heroPaused) return; w += 2; bar.style.width = w+'%'; if(w>=100){ nextHero() } }, 80);
}
function nextHero(){ goHero(heroIdx+1) } function prevHero(){ goHero(heroIdx-1) }
function startHero(){
  renderHeroThumbs(); goHero(0);
  clearInterval(heroTimer); heroTimer = setInterval(()=>{ if(!heroPaused) nextHero() }, 4000);
  $('heroNext').onclick = e=>{e.stopPropagation();nextHero()};
  $('heroPrev').onclick = e=>{e.stopPropagation();prevHero()};
  const main = $('heroMain');
  main.addEventListener('mouseenter', ()=>heroPaused = true);
  main.addEventListener('mouseleave', ()=>{heroPaused = false; main.style.transform=''});
  // 3D tilt
  $('heroVisual').addEventListener('mousemove', e=>{
    if(window.innerWidth < 900) return;
    const r = main.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
    main.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
  });
  // swipe
  let sx = null;
  main.addEventListener('pointerdown', e=>sx = e.clientX);
  main.addEventListener('pointerup', e=>{ if(sx===null) return; const dx = e.clientX - sx; if(dx < -30) nextHero(); if(dx > 30) prevHero(); sx = null });
  document.addEventListener('keydown', e=>{ if(e.key==='ArrowRight') nextHero(); if(e.key==='ArrowLeft') prevHero() });
  $('heroAdd').onclick = e=>{e.stopPropagation(); addToCart(heroList[heroIdx].id, 1)};
  $('heroView').onclick = e=>{e.stopPropagation(); openProduct(heroList[heroIdx].id)};
  // rotating word
  const words = ['plates','banners','stickers','decor','gifts']; let wi = 0;
  setInterval(()=>{ const el = $('rotWord'); el.classList.add('swap'); setTimeout(()=>{ wi=(wi+1)%words.length; el.textContent = words[wi]; el.classList.remove('swap') },350) }, 2400);
  // count-up stats
  const artists = CATS.length - 1;
  countUp('statCount', products.length); countUp('statArtists', artists);
  // fake live viewers
  setInterval(()=>{ $('liveViewers').textContent = 110 + Math.floor(Math.random()*60) }, 3000);
  // quick pills
  $('heroPills').innerHTML = CATS.slice(1).map(c=>`<button data-hcat="${c}">${c}</button>`).join('');
  document.querySelectorAll('[data-hcat]').forEach(b=>b.onclick=()=>{ state.cat = b.dataset.hcat; renderCats(); renderGrid(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}) });
  $('shuffleBtn').onclick = ()=>{ const p = products[Math.floor(Math.random()*products.length)]; openProduct(p.id); toast('🎲 Sanju Art pick: '+p.title) };
}
function countUp(id, target){ let v = 0; const el = $(id); const t = setInterval(()=>{ v += Math.max(1, Math.ceil(target/30)); if(v>=target){v=target;clearInterval(t)} el.textContent = v }, 40) }
/* ---------- PRO SECTIONS: showcase, reveal, top btn ---------- */
const CAT_EMOJI = {'Radium':'⚡','Number Plates':'🔢','Name Plates':'🏠','Flex & Vinyl':'🖨️','Thermocol Decor':'🎉'};
function renderShowcase(){
  const el = $('catShow'); if(!el) return;
  el.innerHTML = CATS.slice(1).map(c=>{
    const n = products.filter(p=>p.cat===c).length;
    return `<div class="show-card" data-show="${c}"><div class="em">${CAT_EMOJI[c]||'🎨'}</div><b>${c}</b><span>${n} items • tap to view</span></div>`;
  }).join('');
  document.querySelectorAll('[data-show]').forEach(card=>card.onclick=()=>{
    state.cat = card.dataset.show; renderCats(); renderGrid();
    document.getElementById('shop').scrollIntoView({behavior:'smooth'});
  });
  const fc = $('footCats'); if(fc) fc.innerHTML = CATS.slice(1).map(c=>`<a href="#shop" data-foot="${c}">${c}</a>`).join('<br/>');
  document.querySelectorAll('[data-foot]').forEach(a=>a.onclick=()=>{ state.cat = a.dataset.foot; renderCats(); renderGrid() });
}
function startReveal(){
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(s=>io.observe(s));
  const top = $('topBtn');
  window.addEventListener('scroll', ()=>top.classList.toggle('hidden', window.scrollY < 600));
  top.onclick = ()=>window.scrollTo({top:0, behavior:'smooth'});
}
function waOrder(p){
  const msg = encodeURIComponent(`Namaste Sanju Art Danta! Mujhe ye item order karna hai:\n• ${p.title} (${p.cat}) — ₹${p.price}\nNaam: \nAddress: `);
  window.open('https://wa.me/919887377685?text='+msg, '_blank');
}
/* ---------- INTERACTIVE MARQUEE STRIP ---------- */
const MQ = [
  {t:'🚚 HOME DELIVERY IN DANTA AREA', act:'ship'},
  {t:'↩ EASY REPRINT & FIXING', act:'returns'},
  {t:'🎨 RADIUM • FLEX • VINYL • THERMOCOL', act:'artists'},
  {t:'✨ WEDDING • BIRTHDAY • ANNIVERSARY DECOR', act:'new'},
  {t:'🔥 SALE — NUMBER PLATES & STICKERS', act:'sale'},
  {t:'📞 ORDER ON WHATSAPP +91 98873 77685', act:'frame'},
];
let mqX = 0, mqPlay = true, mqHover = false, mqDrag = null;
function renderMarquee(){
  const items = [...MQ, ...MQ, ...MQ]; // 3x for seamless loop
  $('marqueeTrack').innerHTML = items.map(m=>`<button class="mq-item" data-mq="${m.act}">${m.t} &nbsp;✦</button>`).join('');
  document.querySelectorAll('[data-mq]').forEach(b=>b.onclick=e=>{
    if(Math.abs(mqMoved) > 8) return; // was dragging, ignore click
    mqAction(b.dataset.mq);
  });
}
let mqMoved = 0;
function mqAction(act){
  if(act==='ship') toast('🚚 Danta + nearby villages me home delivery! ₹999 se upar free.');
  if(act==='returns') toast('↩ Print me mistake? Easy reprint & fixing available.');
  if(act==='artists') toast('🎨 Radium, number plates, flex, vinyl, thermocol — sab kuch ek dukaan me!');
  if(act==='frame') window.open('https://wa.me/919887377685?text=Namaste!%20Mujhe%20order%20karna%20hai','_blank');
  if(act==='new'){ state.sort='new'; $('sortSelect').value='new'; renderGrid(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}); toast('✨ Showing newest items first') }
  if(act==='sale'){ state.sale=true; $('onSaleOnly').checked=true; renderGrid(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}); toast('🔥 Showing sale items') }
}
function startMarquee(){
  renderMarquee();
  const view = $('mqView'), track = $('marqueeTrack');
  const speed = 0.8;
  (function tick(){
    const half = track.scrollWidth / 3;
    if(mqPlay && !mqHover && mqDrag===null){
      mqX -= speed;
      if(-mqX >= half) mqX += half;
      track.style.transform = `translateX(${mqX}px)`;
    }
    requestAnimationFrame(tick);
  })();
  view.addEventListener('mouseenter', ()=>mqHover = true);
  view.addEventListener('mouseleave', ()=>{mqHover = false; mqDrag = null});
  view.addEventListener('pointerdown', e=>{ mqDrag = {x:e.clientX, base:mqX}; mqMoved = 0; view.setPointerCapture(e.pointerId) });
  view.addEventListener('pointermove', e=>{
    if(mqDrag===null) return;
    const dx = e.clientX - mqDrag.x; mqMoved = dx;
    mqX = mqDrag.base + dx;
    const half = track.scrollWidth / 3;
    if(mqX > 0) mqX -= half; if(-mqX >= half) mqX += half;
    track.style.transform = `translateX(${mqX}px)`;
  });
  view.addEventListener('pointerup', ()=>{ setTimeout(()=>mqDrag=null, 50) });
  $('mqToggle').onclick = ()=>{ mqPlay = !mqPlay; $('mqToggle').textContent = mqPlay ? '⏸' : '▶'; toast(mqPlay?'▶ Strip playing':'⏸ Strip paused') };
}

function renderCats(){
  $('catList').innerHTML = CATS.map(c=>`<button class="chip ${state.cat===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
  document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{state.cat=b.dataset.cat;renderCats();renderGrid()});
}

/* ---------- grid ---------- */
function filtered(){
  let list = [...products];
  if(state.cat!=='All') list=list.filter(p=>p.cat===state.cat);
  if(state.q) { const q=state.q.toLowerCase(); list=list.filter(p=>(p.title+' '+p.artist+' '+p.cat).toLowerCase().includes(q)) }
  list=list.filter(p=>p.price<=state.max);
  if(state.stock) list=list.filter(p=>p.stock>0);
  if(state.sale) list=list.filter(p=>p.oldPrice||String(p.badge||'').toLowerCase().includes('sale')||String(p.badge||'').includes('%'));
  if(state.sort==='low') list.sort((a,b)=>a.price-b.price);
  if(state.sort==='high') list.sort((a,b)=>b.price-a.price);
  if(state.sort==='rating') list.sort((a,b)=>b.rating-a.rating);
  if(state.sort==='new') list.sort((a,b)=>new Date(b.date)-new Date(a.date));
  return list;
}
function badgeCls(b){ if(!b) return ''; const s=b.toLowerCase(); if(s.includes('sale')||s.includes('%')) return 'sale'; if(s.includes('new')) return 'new'; return '' }

function renderGrid(){
  const list = filtered();
  $('resultCount').textContent = `${list.length} item${list.length!==1?'s':''} ${state.cat!=='All'?'in '+state.cat:''}`;
  $('statCount').textContent = products.length;
  $('empty').classList.toggle('hidden', list.length>0);
  $('grid').innerHTML = list.map(p=>`
    <article class="card" data-view="${p.id}">
      <div class="img-wrap">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.id}/600/600'" />
        ${p.badge?`<span class="badge ${badgeCls(p.badge)}">${p.badge}</span>`:''}
        <button class="wish" data-wish="${p.id}">${wishlist.has(p.id)?'♥':'♡'}</button>
      </div>
      <div class="card-body">
        <span class="cat">${p.cat}</span><h3>${p.title}</h3>
        <span class="artist">by ${p.artist} • ★ ${p.rating} (${p.reviews})</span>
        <div class="price-row"><span class="price">${money(p.price)}${p.oldPrice?`<span class="old">${money(p.oldPrice)}</span>`:''}</span>
        <span class="rating">${p.stock>0?`● ${p.stock} left`:'○ Sold out'}</span></div>
        <button class="add" data-add="${p.id}" ${p.stock===0?'disabled':''}>${p.stock===0?'Sold out':'Add to cart'}</button>
      </div>
    </article>`).join('');
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=e=>{e.stopPropagation();addToCart(b.dataset.add,1)});
  document.querySelectorAll('[data-wish]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleWish(b.dataset.wish)});
  document.querySelectorAll('[data-view]').forEach(c=>c.onclick=()=>openProduct(c.dataset.view));
}

/* ---------- wishlist / cart ---------- */
function toggleWish(id){ wishlist.has(id)?wishlist.delete(id):wishlist.add(id); save('sanju_wish',[...wishlist]); renderGrid(); toast(wishlist.has(id)?'Saved ♥':'Removed') }
function addToCart(id, qty=1){
  const p = products.find(x=>x.id===id); if(!p||p.stock===0) return;
  cart[id]=(cart[id]||0)+qty;
  if(cart[id]>p.stock) cart[id]=p.stock;
  save('sanju_cart',cart); renderCart(); toast(`Added “${p.title}” to cart`);
  openDrawer();
}
function setQty(id,q){ if(q<=0) delete cart[id]; else cart[id]=q; save('sanju_cart',cart); renderCart() }
function cartTotals(){
  let sub=0,n=0; for(const [id,q] of Object.entries(cart)){ const p=products.find(x=>x.id===id); if(p){sub+=p.price*q;n+=q} }
  const ship = sub===0?0:(sub>=999?0:49);
  return {sub, ship, total:sub+ship, n};
}
function renderCart(){
  const t = cartTotals();
  $('cartCount').textContent = t.n;
  if($('mCartCount')) $('mCartCount').textContent = t.n;
  $('subtotal').textContent = money(t.sub);
  $('shipping').textContent = t.ship===0?(t.sub>0?'Free':money(0)):money(t.ship);
  $('grandTotal').textContent = money(t.total);
  $('shipNote').textContent = t.sub>=999&&t.sub>0?'🎉 FREE delivery unlocked!':(t.sub>0?`Add ${money(999-t.sub)} more for FREE delivery`:'');
  $('checkoutBtn').disabled = t.n===0; $('checkoutBtn').style.opacity = t.n===0?.5:1;
  const ids = Object.keys(cart);
  $('cartItems').innerHTML = ids.length===0?`<div class="empty"><h3>Your cart is empty</h3><p>Dukaan ka har item yahin milega.</p></div>`:
    ids.map(id=>{ const p=products.find(x=>x.id===id); if(!p) return ''; return `
      <div class="cart-row"><img src="${p.img}" alt="" />
      <div><h4>${p.title}</h4><small>${p.artist} • ${money(p.price)}</small>
        <div class="qty"><button data-dec="${id}">−</button><b>${cart[id]}</b><button data-inc="${id}">+</button>
        <button class="link" data-rem="${id}">remove</button></div></div>
      <b>${money(p.price*cart[id])}</b></div>`}).join('');
  document.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>setQty(b.dataset.dec, cart[b.dataset.dec]-1));
  document.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{ const p=products.find(x=>x.id===b.dataset.inc); if(cart[b.dataset.inc]<p.stock) setQty(b.dataset.inc, cart[b.dataset.inc]+1); else toast('Only '+p.stock+' available') });
  document.querySelectorAll('[data-rem]').forEach(b=>b.onclick=()=>setQty(b.dataset.rem,0));
}

/* ---------- drawer / modal helpers ---------- */
function show(id){ $(id).classList.remove('hidden'); if(id!=='toast') $('overlay').classList.remove('hidden'); if(id==='cartDrawer') $('cartDrawer').classList.add('open') }
function hideAll(){ ['cartDrawer','productModal','checkoutModal','adminModal'].forEach(i=>$(i).classList.add('hidden')); $('overlay').classList.add('hidden'); $('cartDrawer').classList.remove('open') }
function openDrawer(){ renderCart(); $('cartDrawer').classList.remove('hidden'); $('overlay').classList.remove('hidden'); $('cartDrawer').classList.add('open') }
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=hideAll);
$('overlay').onclick=hideAll; $('cartBtn').onclick=openDrawer;
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideAll()});
let toastT; function toast(m){ const t=$('toast'); t.textContent=m; t.classList.remove('hidden'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.add('hidden'),2200) }

/* ---------- product detail ---------- */
function openProduct(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  $('productDetail').innerHTML = `<div class="detail-grid">
    <img src="${p.img}" alt="${p.title}" />
    <div><span class="cat" style="color:#c96f2e;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">${p.cat}</span>
    <h2 style="margin:6px 0">${p.title}</h2><p class="muted">by <b>${p.artist}</b> • ★ ${p.rating} (${p.reviews} reviews)</p>
    <p>${p.desc||''}</p>
    <h2>${money(p.price)} ${p.oldPrice?`<span class="old">${money(p.oldPrice)}</span>`:''}</h2>
    <p>${p.stock>0?`✓ Ready (${p.stock}) — 1–2 din me taiyaar, shop se pickup ya delivery`:'✕ Out of stock'}</p>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn dark" id="dAdd" ${p.stock===0?'disabled':''}>Add to cart</button>
    <button class="btn ghost" id="dWa">💬 WhatsApp order</button>
    <button class="btn ghost" id="dWish">${wishlist.has(p.id)?'♥ Saved':'♡ Save'}</button></div>
    <div class="pay-note">✓ Same-day making possible &nbsp; • &nbsp; ↩ Easy reprint &nbsp; • &nbsp; 📞 Call/WhatsApp: +91 98873 77685</div>
    </div></div>`;
  show('productModal');
  $('dAdd').onclick=()=>{addToCart(p.id,1);hideAll();openDrawer()};
  $('dWa').onclick=()=>waOrder(p);
  $('dWish').onclick=()=>{toggleWish(p.id);hideAll()};
}

/* ---------- checkout ---------- */
$('checkoutBtn').onclick=()=>{ if(cartTotals().n===0) return; checkoutStep=1; renderCheckout(); show('checkoutModal') };
function renderCheckout(){
  document.querySelectorAll('.step').forEach(s=>s.classList.toggle('active',+s.dataset.s<=checkoutStep));
  const t = cartTotals(), b = $('checkoutBody');
  if(checkoutStep===1) b.innerHTML = `<div class="admin-form">
    <div class="two"><div><label>Naam</label><input id="cName" value="${orderInfo.name||''}" placeholder="Ramesh Kumar"/></div>
    <div><label>Mobile</label><input id="cEmail" value="${orderInfo.email||''}" placeholder="98873XXXXX"/></div></div>
    <label>Address / Gaon</label><input id="cAddr" value="${orderInfo.addr||''}" placeholder="VPO-Danta, Sikar"/>
    <div class="two"><div><label>City</label><input id="cCity" value="${orderInfo.city||''}" placeholder="Danta"/></div>
    <div><label>PIN</label><input id="cZip" value="${orderInfo.zip||''}" placeholder="332702"/></div></div>
    <button class="btn dark big" id="toPay">Continue • ${money(t.total)}</button></div>`;
  if(checkoutStep===2) b.innerHTML = `<div class="admin-form">
    <label>Payment (demo)</label><input id="cCard" inputmode="numeric" placeholder="UPI ID / Card — demo me kuch bhi likho" maxlength="19"/>
    <div class="two"><div><label>Note</label><input placeholder="Design details..."/></div><div><label>Need fast?</label><input placeholder="Urgent / Normal"/></div></div>
    <div class="pay-note">Demo mode — asli payment nahi hogi. Dukaan par cash/UPI: +91 98873 77685. WhatsApp par design bhej sakte ho.</div>
    <div class="two"><button class="btn ghost" id="back1">← Back</button><button class="btn dark" id="payNow">Order ${money(t.total)}</button></div></div>`;
  if(checkoutStep===3){
    const oid = 'SANJU-' + Math.floor(100000+Math.random()*900000);
    // decrement stock
    for(const [id,q] of Object.entries(cart)){ const p=products.find(x=>x.id===id); if(p) p.stock=Math.max(0,p.stock-q) }
    save('sanju_products',products); cart={}; save('sanju_cart',cart); renderCart(); renderGrid();
    b.innerHTML = `<div class="success"><div class="big-check">🎉</div><h3>Order ${oid} mil gaya!</h3>
    <p class="muted">Dhanyavaad ${orderInfo.name||'grahak'}! Dukaan se call aayega confirm karne ke liye.<br/>Pickup: Sanju Art Danta, Near Govt. School, Danta (Sikar) • 📞 +91 98873 77685</p>
    <button class="btn dark big" id="doneBtn">Aur items dekho</button></div>`;
    $('doneBtn').onclick=hideAll; return;
  }
  if($('toPay')) $('toPay').onclick=()=>{
    orderInfo={name:$('cName').value, email:$('cEmail').value, addr:$('cAddr').value, city:$('cCity').value, zip:$('cZip').value};
    if(!orderInfo.name||!orderInfo.email||!orderInfo.addr) return toast('Naam, mobile aur address bharo');
    checkoutStep=2; renderCheckout();
  };
  if($('back1')) $('back1').onclick=()=>{checkoutStep=1;renderCheckout()};
  if($('payNow')) $('payNow').onclick=()=>{
    const c=$('cCard').value.replace(/\s/g,'');
    if(c.length<4) return toast('UPI ID ya kuch bhi likho (demo)');
    $('payNow').textContent='Order ho raha hai…'; $('payNow').disabled=true;
    setTimeout(()=>{checkoutStep=3;renderCheckout()},1200);
  };
}

/* ---------- admin ---------- */
if($('footAdmin')) $('footAdmin').onclick=e=>{ e.preventDefault(); renderAdminList(); show('adminModal') };
$('adminForm').onsubmit=e=>{
  e.preventDefault();
  const id = $('fId').value || 'u'+Date.now();
  const obj = { id, title:$('fTitle').value.trim(), artist:$('fArtist').value.trim(),
    price:+$('fPrice').value, cat:$('fCategory').value,
    img:$('fImage').value.trim()||`https://picsum.photos/seed/${id}/600/600`,
    badge:$('fBadge').value.trim()||null, desc:$('fDesc').value.trim(),
    stock:+$('fStock').value||0, rating:+$('fRating').value||4.8, reviews:Math.floor(Math.random()*40)+1,
    oldPrice:null, date:new Date().toISOString().slice(0,10) };
  if(!obj.title||!obj.artist||!obj.price) return toast('Naam, dukaan aur price bharo');
  const i = products.findIndex(p=>p.id===id);
  if(i>=0) products[i]={...products[i],...obj}; else products.unshift(obj);
  save('sanju_products',products); renderGrid(); renderAdminList(); renderCats(); renderHeroThumbs(); renderShowcase();
  e.target.reset(); $('fId').value=''; $('fArtist').value='Sanju Art Danta'; $('saveBtn').textContent='Add item';
  toast('Item live ho gaya ✓');
};
function renderAdminList(){
  $('adminList').innerHTML = products.map(p=>`<div class="admin-row"><span><b>${p.title}</b> <small style="color:#777">• ${p.cat} • ${money(p.price)} • stock ${p.stock}</small></span>
    <div><button class="mini" data-edit="${p.id}">Edit</button><button class="mini" data-del="${p.id}">Delete</button></div></div>`).join('');
  document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{
    const p=products.find(x=>x.id===b.dataset.edit);
    $('fId').value=p.id;$('fTitle').value=p.title;$('fArtist').value=p.artist;$('fPrice').value=p.price;
    $('fCategory').value=p.cat;$('fImage').value=p.img.startsWith('https://picsum')?'':p.img;
    $('fBadge').value=p.badge||'';$('fDesc').value=p.desc||'';$('fStock').value=p.stock;$('fRating').value=p.rating;
    $('saveBtn').textContent='Save changes'; window.scrollTo(0,0); toast('Editing “'+p.title+'”');
  });
  document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
    products=products.filter(x=>x.id!==b.dataset.del); delete cart[b.dataset.del];
    save('sanju_products',products); save('sanju_cart',cart); renderGrid(); renderCart(); renderAdminList(); renderShowcase(); toast('Deleted');
  });
}
$('resetBtn').onclick=()=>{ products=[...DEFAULT_PRODUCTS]; save('sanju_products',products); renderGrid(); renderAdminList(); renderShowcase(); toast('Catalog reset') };

/* ---------- filters events ---------- */
function bindSearch(el){ $(el).addEventListener('input',e=>{ state.q=e.target.value; renderGrid() }) }
bindSearch('searchInput'); bindSearch('searchInputMobile');
$('priceRange').oninput=e=>{ state.max=+e.target.value; $('priceLabel').textContent='₹'+Number(e.target.value).toLocaleString('en-IN'); renderGrid() };
$('sortSelect').onchange=e=>{ state.sort=e.target.value; renderGrid() };
$('inStockOnly').onchange=e=>{ state.stock=e.target.checked; renderGrid() };
$('onSaleOnly').onchange=e=>{ state.sale=e.target.checked; renderGrid() };
$('clearFilters').onclick=()=>{ state={q:'',cat:'All',max:5000,sort:'featured',stock:false,sale:false};
  $('searchInput').value='';$('searchInputMobile').value='';$('priceRange').value=5000;$('priceLabel').textContent='₹5000';
  $('sortSelect').value='featured';$('inStockOnly').checked=false;$('onSaleOnly').checked=false; renderCats(); renderGrid() };

/* init */
renderCats(); renderGrid(); renderCart(); startHero(); startMarquee(); renderShowcase(); startReveal();
// mobile: filters collapsed by default, toggle button
if(window.innerWidth <= 900) $('filterPanel').classList.add('collapsed');
$('filterToggle').onclick = ()=>{
  const p = $('filterPanel'); p.classList.toggle('collapsed');
  $('filterToggle').textContent = p.classList.contains('collapsed') ? '☰ Filters' : '✕ Close';
  if(!p.classList.contains('collapsed')) p.scrollIntoView({behavior:'smooth', block:'nearest'});
};
if($('mCart')) $('mCart').onclick = openDrawer;
