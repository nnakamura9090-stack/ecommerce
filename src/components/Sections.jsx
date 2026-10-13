import { CATS, CAT_EMOJI, WA_LINK } from '../data.js';
import { Reveal, SectionHead } from './ui.jsx';

export function Showcase({ products, onSelect }) {
  return (
    <section className="max-w-[1200px] mx-auto mt-[34px] px-5 text-center">
      <Reveal>
        <SectionHead eyebrow="Our services" title="Shop by category" />
        <div className="grid gap-3 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {CATS.slice(1).map((c, i) => {
            const n = products.filter((p) => p.cat === c).length;
            return (
              <div
                key={c}
                onClick={() => onSelect(c)}
                style={{ '--d': `${i * 70}ms` }}
                className="anim-pop bg-white/60 backdrop-blur-md border border-white/65 rounded-[18px] px-2.5 py-5 md:py-5 max-md:py-3.5 cursor-pointer transition-all shadow-[0_8px_24px_rgba(0,0,0,.07)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,.14)] hover:bg-ink hover:text-white active:scale-95"
              >
                <div className="text-[34px]">{CAT_EMOJI[c] || '🎨'}</div>
                <b className="block my-2 text-[15px]">{c}</b>
                <span className="text-xs opacity-70">
                  {n} items • tap to view
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

const HOW = [
  {
    n: '1',
    b: '🛒 Choose item',
    p: 'Website par item select karo ya seedha WhatsApp par photo bhejo.',
  },
  {
    n: '2',
    b: '💬 Design confirm',
    p: 'Naam, size aur design chat par final.',
    link: true,
  },
  {
    n: '3',
    b: '💰 Pay & pickup',
    p: 'Cash/UPI on pickup, ya Danta area me home delivery (₹999+ free).',
  },
];

export function How() {
  return (
    <section className="max-w-[1200px] mx-auto mt-[34px] px-5 text-center">
      <Reveal>
        <SectionHead eyebrow="Easy ordering" title="Order in 3 simple steps" />
        <div className="grid md:grid-cols-3 gap-3 text-left">
          {HOW.map((s) => (
            <div
              key={s.n}
              className="bg-white border border-[#e8e1d6] rounded-[18px] p-5 relative transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,.1)]"
            >
              <span className="absolute top-3 right-4 font-display text-[44px] text-[#f0e6d2] font-bold">
                {s.n}
              </span>
              <b className="text-base">{s.b}</b>
              <p className="text-[#666] text-[13.5px]">
                {s.p}{' '}
                {s.link && (
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent font-semibold"
                  >
                    +91 98873 77685
                  </a>
                )}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const REVIEWS = [
  {
    t: '"Bike ki number plate 1 ghante me taiyaar! Radium quality ekdam best."',
    b: '— Ramesh Gurjar, Danta',
  },
  {
    t: '"Beti ke birthday ka backdrop itna sundar banaya, sabne photo khinchwayi."',
    b: '— Sunita Devi, Dantaramgarh',
  },
  {
    t: '"Dukaan ka flex board aur visiting rate dono sahi. Kaam pakka aur time par."',
    b: '— Vikram Singh, Sikar',
  },
];

export function Reviews() {
  return (
    <section className="max-w-[1200px] mx-auto mt-[34px] px-5 text-center">
      <Reveal>
        <SectionHead eyebrow="Customer love" title="Log kya kehte hain" />
        <div className="grid md:grid-cols-3 gap-3 text-left">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#fffdf9] to-[#f7efe0] border border-[#e8e1d6] rounded-[18px] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,.12)]"
            >
              <div className="text-accent tracking-[2px]">★★★★★</div>
              <p className="text-sm text-[#444]">{r.t}</p>
              <b className="text-[13px]">{r.b}</b>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="max-w-[1200px] mx-auto mt-[34px] px-5 text-center">
      <Reveal>
        <SectionHead eyebrow="Visit us" title="Dukaan par aao" />
        <div className="grid md:grid-cols-2 gap-3.5 text-left">
          <div className="bg-white border border-[#e8e1d6] rounded-[20px] p-6">
            <h3 className="font-display text-xl">🎨 Sanju Art Danta</h3>
            <p className="text-sm text-[#444]">
              Prop. <b>Sanjay Kumar</b>
              <br />
              Near Govt. Sen. Sec. School, VPO-Danta,
              <br />
              Teh. Dantaramgarh, Dist. Sikar (Raj.)
            </p>
            <p className="text-sm">
              ⏰ <b>Open daily:</b> 9:00 AM – 8:00 PM
            </p>
            <p className="text-sm">📧 sanjuartdanta@gmail.com</p>
            <div className="flex gap-2.5 mt-3 flex-wrap">
              <a
                href="tel:+919887377685"
                className="no-underline border border-ink/35 rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white shadow transition-all hover:-translate-y-px"
              >
                📞 Call now
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="no-underline border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer text-ink shadow transition-all hover:bg-white/80"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
          <div className="bg-white border border-[#e8e1d6] rounded-[20px] p-6">
            <div className="bg-gradient-to-br from-[#2a251f] to-[#4a3b28] text-[#f5eedd] rounded-[14px] text-center px-2.5 py-[34px] text-3xl mb-3">
              📍
              <br />
              <b className="text-lg">Danta, Sikar</b>
              <p className="text-[13px] m-1">Govt. School ke paas</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sanju+Art+Danta+Dantaramgarh+Sikar"
              target="_blank"
              rel="noreferrer"
              className="no-underline block text-center border border-ink/35 rounded-full px-[18px] py-3 font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white shadow"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Perks() {
  const items = [
    ['⚡ Same-day making', 'Radium, plates & banners — urgent order available'],
    ['🚚 Home delivery', 'Danta + nearby villages, free over ₹999'],
    ['💬 WhatsApp order', '+91 98873 77685 — design on chat, pay on pickup'],
  ];
  return (
    <section className="max-w-[1200px] mx-auto mt-2.5 grid md:grid-cols-3 gap-3 px-5">
      {items.map(([b, s]) => (
        <div
          key={b}
          className="bg-white border border-[#e8e1d6] rounded-[14px] p-4 grid gap-1 text-sm"
        >
          <b>{b}</b>
          <span className="text-[#777] text-[13px]">{s}</span>
        </div>
      ))}
    </section>
  );
}

export function Footer({ onSelectCat, onAdmin }) {
  return (
    <footer className="bg-[#141311] text-[#cfc9bd] mt-10">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-5 px-5 pt-[34px] pb-2.5 text-[13.5px]">
        <div>
          <h4 className="text-white m-0 mb-2 text-[15px] font-display">
            🎨 Sanju Art Danta
          </h4>
          <p>
            A Complete Art Gallery.
            <br />
            Radium • Plates • Flex • Thermocol decor in Danta, Sikar since
            years of trust.
          </p>
        </div>
        <div>
          <h4 className="text-white m-0 mb-2 text-[15px] font-display">
            Quick links
          </h4>
          <p>
            <a href="#shop" className="text-gold">
              Browse items
            </a>
            <br />
            <a href="#contact" className="text-gold">
              Visit shop
            </a>
            <br />
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="text-gold">
              WhatsApp order
            </a>
          </p>
        </div>
        <div>
          <h4 className="text-white m-0 mb-2 text-[15px] font-display">
            Categories
          </h4>
          <p>
            {CATS.slice(1).map((c, i) => (
              <span key={c}>
                {i > 0 && <br />}
                <button
                  onClick={() => onSelectCat(c)}
                  className="text-gold bg-none border-0 p-0 cursor-pointer text-[13.5px]"
                >
                  {c}
                </button>
              </span>
            ))}
          </p>
        </div>
        <div>
          <h4 className="text-white m-0 mb-2 text-[15px] font-display">
            Contact
          </h4>
          <p>
            📞 <a href="tel:+919887377685" className="text-gold">+91 98873 77685</a>
            <br />
            📧 sanjuartdanta@gmail.com
            <br />
            ⏰ Daily 9 AM – 8 PM
          </p>
        </div>
      </div>
      <div className="text-center border-t border-[#2c2925] p-3 text-xs text-[#8d8779]">
        © 2026 Sanju Art Danta • Prop. Sanjay Kumar • Demo checkout •{' '}
        <button
          onClick={onAdmin}
          className="text-gold bg-none border-0 cursor-pointer text-xs underline"
        >
          Admin
        </button>
      </div>
    </footer>
  );
}
