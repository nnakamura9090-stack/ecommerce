import { useState } from 'react';
import { money, buyNowWhatsApp } from '../data.js';

function ModalShell({ open, onClose, wide, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 grid place-items-center p-4 bg-black/50 transition-opacity ${
        open ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#fffdf9] rounded-[20px] p-6 w-[min(560px,94vw)] max-h-[90vh] overflow-auto relative transition-all ${
          wide ? 'md:w-[min(760px,96vw)]' : ''
        } ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[2] border-0 bg-[#eee] rounded-full w-8 h-8 cursor-pointer text-[15px]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function CartDrawer({ open, items, totals, onClose, onInc, onDec, onRemove, onCheckout }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/45 z-30 transition-opacity ${
          open ? '' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[min(420px,94vw)] bg-[#fffdf9] z-[31] flex flex-col border-l border-[#eee] transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-[18px] border-b border-[#eee]">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button
            onClick={onClose}
            className="border-0 bg-[#eee] rounded-full w-8 h-8 cursor-pointer text-[15px]"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-auto p-3.5 flex flex-col gap-3 overscroll-contain">
          {items.length === 0 ? (
            <div className="text-center py-[60px] text-[#777]">
              <h3 className="font-display">Your cart is empty</h3>
              <p>Dukaan ka har item yahin milega.</p>
            </div>
          ) : (
            items.map(({ p, qty }) => (
              <div
                key={p.id}
                className="grid grid-cols-[70px_1fr_auto] gap-2.5 bg-white border border-[#eee] rounded-xl p-2.5 items-center"
              >
                <img
                  src={p.img}
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-[10px]"
                />
                <div>
                  <h4 className="m-0 text-sm">{p.title}</h4>
                  <small className="text-[#777]">
                    {p.artist} • {money(p.price)}
                  </small>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onDec(p.id)}
                      className="w-[26px] h-[26px] rounded-full border border-[#ddd] bg-white cursor-pointer"
                    >
                      −
                    </button>
                    <b>{qty}</b>
                    <button
                      onClick={() => onInc(p.id)}
                      className="w-[26px] h-[26px] rounded-full border border-[#ddd] bg-white cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(p.id)}
                      className="bg-none border-0 text-[#666] underline cursor-pointer text-[13px]"
                    >
                      remove
                    </button>
                  </div>
                </div>
                <b>{money(p.price * qty)}</b>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-[#eee] p-4">
          <div className="flex justify-between text-sm my-1">
            <span>Subtotal</span>
            <b>{money(totals.sub)}</b>
          </div>
          <div className="flex justify-between text-sm my-1 text-[#777]">
            <span>Delivery</span>
            <span>{totals.ship === 0 ? (totals.sub > 0 ? 'Free' : money(0)) : money(totals.ship)}</span>
          </div>
          <div className="flex justify-between text-[17px] my-1">
            <span>Total</span>
            <b>{money(totals.total)}</b>
          </div>
          <p className="text-xs text-[#1a7f4b]">
            {totals.sub >= 999 && totals.sub > 0
              ? '🎉 FREE delivery unlocked!'
              : totals.sub > 0
                ? `Add ${money(999 - totals.sub)} more for FREE delivery`
                : ''}
          </p>
          <button
            onClick={onCheckout}
            disabled={totals.n === 0}
            style={{ opacity: totals.n === 0 ? 0.5 : 1 }}
            className="border border-ink/35 rounded-full font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white w-full mt-2 p-[13px] transition-all hover:-translate-y-px"
          >
            Checkout →
          </button>
          <button
            onClick={onClose}
            className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full font-semibold text-sm cursor-pointer text-ink w-full mt-2 p-[13px]"
          >
            Continue browsing
          </button>
        </div>
      </aside>
    </>
  );
}

export function ProductModal({ product: p, wished, onClose, onAdd, onWish, onWa }) {
  return (
    <ModalShell open={!!p} onClose={onClose} wide>
      {p && (
        <div className="grid md:grid-cols-2 gap-5">
          <img
            src={p.img}
            alt={p.title}
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${p.id}/600/600`;
            }}
            className="w-full rounded-[14px] aspect-square object-cover"
          />
          <div>
            <span className="text-accent text-xs font-bold tracking-[1px] uppercase">
              {p.cat}
            </span>
            <h2 className="font-display my-1.5 text-2xl">{p.title}</h2>
            <p className="text-[#777] text-sm">
              by <b>{p.artist}</b> • ★ {p.rating} ({p.reviews} reviews)
            </p>
            <p className="text-sm">{p.desc || ''}</p>
            <h2 className="text-2xl font-bold">
              {money(p.price)}{' '}
              {p.oldPrice ? (
                <span className="text-[#999] line-through text-[13px] ml-1.5 font-normal">
                  {money(p.oldPrice)}
                </span>
              ) : null}
            </h2>
            <p className="text-[#777] text-sm">
              {p.stock > 0
                ? `✓ Ready (${p.stock}) — 1–2 din me taiyaar, shop se pickup ya delivery`
                : '✕ Out of stock'}
            </p>
            <div className="flex gap-2 mt-2.5 flex-wrap">
              <button
                onClick={() => buyNowWhatsApp(p)}
                disabled={p.stock === 0}
                className="border-0 bg-[#e63946] text-white rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer transition-all disabled:opacity-50 hover:brightness-110 shadow-[0_4px_14px_rgba(230,57,70,.4)]"
              >
                🛒 Buy Now
              </button>
              <button
                onClick={() => onAdd(p.id, 1)}
                disabled={p.stock === 0}
                className="border border-ink/35 rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white transition-all disabled:opacity-50"
              >
                Add to cart
              </button>
              <button
                onClick={() => onWa(p)}
                className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer text-ink"
              >
                💬 WhatsApp order
              </button>
              <button
                onClick={() => onWish(p.id)}
                className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer text-ink"
              >
                {wished ? '♥ Saved' : '♡ Save'}
              </button>
            </div>
            <div className="bg-[#f6f1e6] rounded-[10px] p-2.5 text-xs text-[#6b6252] mt-2.5">
              ✓ Same-day making possible &nbsp; • &nbsp; ↩ Easy reprint &nbsp;
              • &nbsp; 📞 Call/WhatsApp: +91 98873 77685
            </div>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

export function CheckoutModal({ open, totals, onClose, onDone }) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: '', mobile: '', addr: '', city: '', pin: '' });
  const [card, setCard] = useState('');
  const [paying, setPaying] = useState(false);
  const [oid, setOid] = useState('');
  const [err, setErr] = useState('');

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPaying(false);
      setErr('');
    }, 300);
  };

  const toPay = () => {
    if (!info.name || !info.mobile || !info.addr) {
      setErr('Naam, mobile aur address bharo');
      return;
    }
    setErr('');
    setStep(2);
  };

  const pay = () => {
    if (card.replace(/\s/g, '').length < 4) {
      setErr('UPI ID ya kuch bhi likho (demo)');
      return;
    }
    setErr('');
    setPaying(true);
    setTimeout(() => {
      setOid('SANJU-' + Math.floor(100000 + Math.random() * 900000));
      setStep(3);
      setPaying(false);
    }, 1200);
  };

  const inputCls =
    'border border-[#ddd] rounded-[10px] p-2.5 text-sm w-full max-md:text-base';

  return (
    <ModalShell open={open} onClose={close}>
      <h2 className="font-display text-2xl">Checkout</h2>
      <div className="flex gap-2 my-3">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`rounded-full px-3 py-1.5 text-xs ${
              step >= s ? 'bg-ink text-white' : 'bg-[#eee]'
            }`}
          >
            {s} {s === 1 ? 'Info' : s === 2 ? 'Payment' : 'Done'}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="grid gap-3 my-3.5">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">Naam</label>
              <input
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                placeholder="Ramesh Kumar"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Mobile</label>
              <input
                value={info.mobile}
                onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                placeholder="98873XXXXX"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold">Address / Gaon</label>
            <input
              value={info.addr}
              onChange={(e) => setInfo({ ...info, addr: e.target.value })}
              placeholder="VPO-Danta, Sikar"
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">City</label>
              <input
                value={info.city}
                onChange={(e) => setInfo({ ...info, city: e.target.value })}
                placeholder="Danta"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">PIN</label>
              <input
                value={info.pin}
                onChange={(e) => setInfo({ ...info, pin: e.target.value })}
                placeholder="332702"
                className={inputCls}
              />
            </div>
          </div>
          {err && <p className="text-sm text-[#b3261e]">{err}</p>}
          <button
            onClick={toPay}
            className="border border-ink/35 rounded-full font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white w-full mt-2 p-[13px]"
          >
            Continue • {money(totals.total)}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-3 my-3.5">
          <div>
            <label className="text-sm font-semibold">Payment (demo)</label>
            <input
              value={card}
              onChange={(e) => setCard(e.target.value)}
              inputMode="numeric"
              placeholder="UPI ID / Card — demo me kuch bhi likho"
              maxLength={19}
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold">Note</label>
              <input placeholder="Design details..." className={inputCls} />
            </div>
            <div>
              <label className="text-sm font-semibold">Need fast?</label>
              <input placeholder="Urgent / Normal" className={inputCls} />
            </div>
          </div>
          <div className="bg-[#f6f1e6] rounded-[10px] p-2.5 text-xs text-[#6b6252]">
            Demo mode — asli payment nahi hogi. Dukaan par cash/UPI: +91 98873
            77685. WhatsApp par design bhej sakte ho.
          </div>
          {err && <p className="text-sm text-[#b3261e]">{err}</p>}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStep(1)}
              className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer text-ink"
            >
              ← Back
            </button>
            <button
              onClick={pay}
              disabled={paying}
              className="border border-ink/35 rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white disabled:opacity-60"
            >
              {paying ? 'Order ho raha hai…' : `Order ${money(totals.total)}`}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center p-2.5">
          <div className="text-[52px]">🎉</div>
          <h3 className="font-display text-xl">Order {oid} mil gaya!</h3>
          <p className="text-[#777] text-sm">
            Dhanyavaad {info.name || 'grahak'}! Dukaan se call aayega confirm
            karne ke liye.
            <br />
            Pickup: Sanju Art Danta, Near Govt. School, Danta (Sikar) • 📞 +91
            98873 77685
          </p>
          <button
            onClick={() => {
              onDone();
              close();
            }}
            className="border border-ink/35 rounded-full font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white w-full mt-2 p-[13px]"
          >
            Aur items dekho
          </button>
        </div>
      )}
    </ModalShell>
  );
}

const CATS_ADMIN = ['Radium', 'Number Plates', 'Name Plates', 'Flex & Vinyl', 'Thermocol Decor'];
const BLANK = { title: '', artist: 'Sanju Art Danta', price: '', cat: 'Radium', img: '', badge: '', desc: '', stock: 5, rating: 4.8 };

export function AdminModal({ open, products, onSave, onDelete, onReset, notify, onClose }) {
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState(null);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const inputCls = 'border border-[#ddd] rounded-[10px] p-2.5 text-sm w-full max-md:text-base';

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.artist.trim() || !form.price) {
      notify('Naam, dukaan aur price bharo');
      return;
    }
    onSave(
      {
        id: editingId || 'u' + Date.now(),
        title: form.title.trim(),
        artist: form.artist.trim(),
        price: +form.price,
        cat: form.cat,
        img: form.img.trim() || `https://picsum.photos/seed/${editingId || Date.now()}/600/600`,
        badge: form.badge.trim() || null,
        desc: form.desc.trim(),
        stock: +form.stock || 0,
        rating: +form.rating || 4.8,
      },
      !!editingId
    );
    setForm({ ...BLANK });
    setEditingId(null);
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      artist: p.artist,
      price: p.price,
      cat: p.cat,
      img: p.img.startsWith('https://picsum') ? '' : p.img,
      badge: p.badge || '',
      desc: p.desc || '',
      stock: p.stock,
      rating: p.rating,
    });
    notify('Editing “' + p.title + '”');
  };

  return (
    <ModalShell open={open} onClose={onClose} wide>
      <h2 className="font-display text-2xl">Add / Manage items</h2>
      <p className="text-[#777] text-sm">
        Apna item add karo. Is browser me save rahega (localStorage). Image
        URL optional — khaali chhodo to auto photo lagegi.
      </p>
      <form onSubmit={submit} className="grid gap-3 my-3.5">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Item name*</label>
            <input
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              required
              placeholder="Bike radium number plate"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Shop / Brand*</label>
            <input
              value={form.artist}
              onChange={(e) => set({ artist: e.target.value })}
              required
              className={inputCls}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Price (₹)*</label>
            <input
              value={form.price}
              onChange={(e) => set({ price: e.target.value })}
              type="number"
              min="1"
              required
              placeholder="299"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Category</label>
            <select
              value={form.cat}
              onChange={(e) => set({ cat: e.target.value })}
              className={inputCls}
            >
              {CATS_ADMIN.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Image URL</label>
            <input
              value={form.img}
              onChange={(e) => set({ img: e.target.value })}
              placeholder="https://..."
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Badge (e.g. New, Sale, -20%)</label>
            <input
              value={form.badge}
              onChange={(e) => set({ badge: e.target.value })}
              placeholder="New"
              className={inputCls}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => set({ desc: e.target.value })}
            rows={2}
            placeholder="Size, material, delivery time..."
            className={inputCls}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Stock</label>
            <input
              value={form.stock}
              onChange={(e) => set({ stock: e.target.value })}
              type="number"
              min="0"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Rating (1-5)</label>
            <input
              value={form.rating}
              onChange={(e) => set({ rating: e.target.value })}
              type="number"
              min="1"
              max="5"
              step="0.1"
              className={inputCls}
            />
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            type="submit"
            className="border border-ink/35 rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer backdrop-blur-md bg-ink/80 text-white"
          >
            {editingId ? 'Save changes' : 'Add item'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer text-ink"
          >
            Cancel
          </button>
        </div>
      </form>
      <h3 className="font-display text-lg">Your listings</h3>
      <div className="grid gap-2 my-2.5">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border border-[#eee] rounded-[10px] px-3 py-2 text-sm bg-white gap-2"
          >
            <span className="min-w-0 truncate">
              <b>{p.title}</b>{' '}
              <small className="text-[#777]">
                • {p.cat} • {money(p.price)} • stock {p.stock}
              </small>
            </span>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => edit(p)}
                className="border border-[#ddd] bg-white rounded-lg px-2.5 py-1.5 cursor-pointer text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="border border-[#ddd] bg-white rounded-lg px-2.5 py-1.5 cursor-pointer text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className="bg-none border-0 text-[#b3261e] underline cursor-pointer text-[13px]"
      >
        Reset demo catalog
      </button>
    </ModalShell>
  );
}

export function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-[22px] left-1/2 -translate-x-1/2 bg-ink text-white px-5 py-3 rounded-full z-[60] text-sm shadow-[0_10px_30px_rgba(0,0,0,.3)] max-w-[92vw] text-center">
      {msg}
    </div>
  );
}
