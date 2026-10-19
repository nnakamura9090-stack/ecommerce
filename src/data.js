export const WA_NUMBER = '919887377685';
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Namaste!%20Mujhe%20order%20karna%20hai`;

export const DEFAULT_PRODUCTS = [
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

export const CATS = ['All', 'Radium', 'Number Plates', 'Name Plates', 'Flex & Vinyl', 'Thermocol Decor'];

export const CAT_EMOJI = {
  'Radium': '⚡',
  'Number Plates': '🔢',
  'Name Plates': '🏠',
  'Flex & Vinyl': '🖨️',
  'Thermocol Decor': '🎉',
};

export const MQ = [
  {t: '🚚 HOME DELIVERY IN DANTA AREA', act: 'ship'},
  {t: '↩ EASY REPRINT & FIXING', act: 'returns'},
  {t: '🎨 RADIUM • FLEX • VINYL • THERMOCOL', act: 'artists'},
  {t: '✨ WEDDING • BIRTHDAY • ANNIVERSARY DECOR', act: 'new'},
  {t: '🔥 SALE — NUMBER PLATES & STICKERS', act: 'sale'},
  {t: '📞 ORDER ON WHATSAPP +91 98873 77685', act: 'frame'},
];

export const SEARCH_TAGS = ['radium stickers', 'number plate', 'name plate', 'flex banner', 'wedding decor', 'birthday'];

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN');

export function badgeCls(b) {
  if (!b) return '';
  const s = b.toLowerCase();
  if (s.includes('sale') || s.includes('%')) return 'sale';
  if (s.includes('new')) return 'new';
  return '';
}

export function badgeStyle(b) {
  const c = badgeCls(b);
  if (c === 'sale') return 'bg-[#b3261e]';
  if (c === 'new') return 'bg-[#1a7f4b]';
  return 'bg-black/45 backdrop-blur-md border border-white/40';
}

export function buyNowWhatsApp(p) {
  const msg = encodeURIComponent(
    `🛒 *Buy Now Request*\n\n` +
    `Mujhe ye product chahiye:\n` +
    `📦 *${p.title}*\n` +
    `💰 Price: ₹${Number(p.price).toLocaleString('en-IN')}\n` +
    `🏷️ Category: ${p.cat}\n` +
    `🖼️ Image: ${p.img}\n\n` +
    `Please confirm availability and delivery details.`
  );
  window.open(`https://wa.me/919887377685?text=${msg}`, '_blank');
}
