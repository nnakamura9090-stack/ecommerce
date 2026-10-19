import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_PRODUCTS, WA_LINK, buyNowWhatsApp } from './data.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Strip from './components/Strip.jsx';
import {
  Showcase,
  How,
  Reviews,
  Contact,
  Perks,
  Footer,
} from './components/Sections.jsx';
import Shop from './components/Shop.jsx';
import {
  CartDrawer,
  ProductModal,
  CheckoutModal,
  AdminModal,
  Toast,
} from './components/Overlays.jsx';

function load(k, fb) {
  try {
    const v = JSON.parse(localStorage.getItem(k));
    return v ?? fb;
  } catch {
    return fb;
  }
}
const save = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
};
const scrollToShop = () =>
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const [products, setProducts] = useState(() =>
    load('sanju_products', DEFAULT_PRODUCTS)
  );
  const [cart, setCart] = useState(() => load('sanju_cart', {}));
  const [wishlist, setWishlist] = useState(
    () => new Set(load('sanju_wish', []))
  );
  const [filters, setFilters] = useState({
    q: '',
    cat: 'All',
    max: 5000,
    sort: 'featured',
    stock: false,
    sale: false,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const toastT = useRef(null);

  const notify = (msg) => {
    setToastMsg(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToastMsg(''), 2200);
  };

  useEffect(() => {
    save('sanju_products', products);
  }, [products]);
  useEffect(() => {
    save('sanju_cart', cart);
  }, [cart]);
  useEffect(() => {
    save('sanju_wish', [...wishlist]);
  }, [wishlist]);

  const overlayOpen = drawerOpen || !!viewId || checkoutOpen || adminOpen;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayOpen]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setViewId(null);
        setCheckoutOpen(false);
        setAdminOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const list = useMemo(() => {
    let l = [...products];
    const f = filters;
    if (f.cat !== 'All') l = l.filter((p) => p.cat === f.cat);
    if (f.q) {
      const q = f.q.toLowerCase();
      l = l.filter((p) =>
        (p.title + ' ' + p.artist + ' ' + p.cat).toLowerCase().includes(q)
      );
    }
    l = l.filter((p) => p.price <= f.max);
    if (f.stock) l = l.filter((p) => p.stock > 0);
    if (f.sale)
      l = l.filter(
        (p) =>
          p.oldPrice ||
          String(p.badge || '').toLowerCase().includes('sale') ||
          String(p.badge || '').includes('%')
      );
    if (f.sort === 'low') l.sort((a, b) => a.price - b.price);
    if (f.sort === 'high') l.sort((a, b) => b.price - a.price);
    if (f.sort === 'rating') l.sort((a, b) => b.rating - a.rating);
    if (f.sort === 'new') l.sort((a, b) => new Date(b.date) - new Date(a.date));
    return l;
  }, [products, filters]);

  const totals = useMemo(() => {
    let sub = 0,
      n = 0;
    for (const [id, q] of Object.entries(cart)) {
      const p = products.find((x) => x.id === id);
      if (p) {
        sub += p.price * q;
        n += q;
      }
    }
    const ship = sub === 0 ? 0 : sub >= 999 ? 0 : 49;
    return { sub, ship, total: sub + ship, n };
  }, [cart, products]);

  const addToCart = (id, qty = 1) => {
    const p = products.find((x) => x.id === id);
    if (!p || p.stock === 0) return;
    setCart((c) => ({ ...c, [id]: Math.min((c[id] || 0) + qty, p.stock) }));
    notify(`Added “${p.title}” to cart`);
    setDrawerOpen(true);
  };
  const setQty = (id, q) =>
    setCart((c) => {
      if (q <= 0) {
        const n = { ...c };
        delete n[id];
        return n;
      }
      return { ...c, [id]: q };
    });
  const toggleWish = (id) =>
    setWishlist((w) => {
      const n = new Set(w);
      if (n.has(id)) {
        n.delete(id);
        notify('Removed');
      } else {
        n.add(id);
        notify('Saved ♥');
      }
      return n;
    });

  const waOrder = (p) => {
    const msg = encodeURIComponent(
      `Namaste Sanju Art Danta! Mujhe ye item order karna hai:\n• ${p.title} (${p.cat}) — ₹${p.price}\nNaam: \nAddress: `
    );
    window.open(`https://wa.me/919887377685?text=${msg}`, '_blank');
  };

  const selectCat = (c) => {
    setFilters((f) => ({ ...f, cat: c }));
    scrollToShop();
  };

  const mqAction = (act) => {
    if (act === 'ship')
      notify('🚚 Danta + nearby villages me home delivery! ₹999 se upar free.');
    else if (act === 'returns')
      notify('↩ Print me mistake? Easy reprint & fixing available.');
    else if (act === 'artists')
      notify('🎨 Radium, number plates, flex, vinyl, thermocol — sab kuch ek dukaan me!');
    else if (act === 'frame') window.open(WA_LINK, '_blank');
    else if (act === 'new') {
      setFilters((f) => ({ ...f, sort: 'new' }));
      scrollToShop();
      notify('✨ Showing newest items first');
    } else if (act === 'sale') {
      setFilters((f) => ({ ...f, sale: true }));
      scrollToShop();
      notify('🔥 Showing sale items');
    }
  };

  const handleOrderDone = () => {
    setProducts((ps) =>
      ps.map((p) =>
        cart[p.id] ? { ...p, stock: Math.max(0, p.stock - cart[p.id]) } : p
      )
    );
    setCart({});
  };

  const saveProduct = (obj, isEdit) => {
    setProducts((ps) => {
      const i = ps.findIndex((p) => p.id === obj.id);
      if (i >= 0) {
        const n = [...ps];
        n[i] = { ...n[i], ...obj };
        return n;
      }
      return [obj, ...ps];
    });
    notify('Item live ho gaya ✓');
  };
  const deleteProduct = (id) => {
    setProducts((ps) => ps.filter((x) => x.id !== id));
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });
    notify('Deleted');
  };
  const resetCatalog = () => {
    setProducts([...DEFAULT_PRODUCTS]);
    notify('Catalog reset');
  };

  const viewProduct = viewId ? products.find((x) => x.id === viewId) : null;
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty }))
    .filter((r) => r.p);

  const incQty = (id) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    if ((cart[id] || 0) < p.stock) setQty(id, (cart[id] || 0) + 1);
    else notify('Only ' + p.stock + ' available');
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans pb-[66px] md:pb-0">
      <div
        className="fixed top-0 left-0 h-[3px] z-[100] bg-gradient-to-r from-[#e63946] via-[#f4a259] to-accent shadow-[0_0_8px_rgba(201,111,46,.7)]"
        style={{ width: progress + '%' }}
      />

      <Header query={filters.q} onQuery={(q) => setFilters((f) => ({ ...f, q }))} />

      <Hero
        products={products}
        onAdd={addToCart}
        onView={setViewId}
        notify={notify}
        onSelectCat={selectCat}
        onBuyNow={buyNowWhatsApp}
      />

      <Strip onAction={mqAction} notify={notify} />

      <Showcase products={products} onSelect={selectCat} />

      <Shop
        list={list}
        filters={filters}
        setFilters={setFilters}
        wishlist={wishlist}
        onAdd={addToCart}
        onView={setViewId}
        onWish={toggleWish}
      />

      <How />
      <Reviews />
      <Contact />
      <Perks />
      <Footer onSelectCat={selectCat} onAdmin={() => setAdminOpen(true)} />

      <CartDrawer
        open={drawerOpen}
        items={cartItems}
        totals={totals}
        onClose={() => setDrawerOpen(false)}
        onInc={incQty}
        onDec={(id) => setQty(id, (cart[id] || 0) - 1)}
        onRemove={(id) => setQty(id, 0)}
        onCheckout={() => {
          if (totals.n === 0) return;
          setCheckoutOpen(true);
        }}
      />

      <ProductModal
        product={viewProduct}
        wished={viewProduct ? wishlist.has(viewProduct.id) : false}
        onClose={() => setViewId(null)}
        onAdd={(id, q) => {
          addToCart(id, q);
          setViewId(null);
        }}
        onWish={(id) => {
          toggleWish(id);
          setViewId(null);
        }}
        onWa={waOrder}
      />

      <CheckoutModal
        open={checkoutOpen}
        totals={totals}
        onClose={() => setCheckoutOpen(false)}
        onDone={() => {
          handleOrderDone();
          setDrawerOpen(false);
        }}
      />

      <AdminModal
        open={adminOpen}
        products={products}
        onSave={saveProduct}
        onDelete={deleteProduct}
        onReset={resetCatalog}
        notify={notify}
        onClose={() => setAdminOpen(false)}
      />

      {!showTop ? null : (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          className="fixed right-5 bottom-[86px] md:bottom-[78px] w-11 h-11 rounded-full border border-white/40 bg-ink/75 backdrop-blur-md text-white text-xl cursor-pointer z-50 shadow-[0_10px_26px_rgba(0,0,0,.3)] hover:bg-accent"
        >
          ↑
        </button>
      )}

      <button
        onClick={() => setDrawerOpen(true)}
        title="Open cart"
        className="hidden md:flex fixed right-5 bottom-5 z-[46] items-center gap-2 border border-white/35 bg-ink/80 backdrop-blur-lg text-white rounded-full px-5 py-[13px] text-[15px] font-bold cursor-pointer shadow-[0_14px_34px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.3)] transition-all hover:-translate-y-0.5 active:scale-95"
      >
        🛒{' '}
        <span className="bg-accent rounded-full min-w-6 h-6 grid place-items-center text-[13px] px-1.5">
          {totals.n}
        </span>
      </button>

      <nav className="md:hidden fixed left-2.5 right-2.5 bottom-2.5 z-[45] flex gap-2 bg-gradient-to-br from-white/25 via-white/[.07] to-ink/55 backdrop-blur-[26px] backdrop-saturate-[1.9] border border-white/45 rounded-[22px] p-2 shadow-[0_12px_32px_rgba(0,0,0,.35),inset_0_1px_1px_rgba(255,255,255,.55),inset_0_-1px_1px_rgba(255,255,255,.12)] overflow-hidden">
        <a
          href="tel:+919887377685"
          className="flex-1 border border-white/35 bg-white/15 backdrop-blur-md text-white rounded-[14px] py-[11px] px-1 text-[13.5px] font-bold text-center cursor-pointer no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.4)] active:scale-95"
        >
          📞 Call
        </a>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex-1 border border-white/35 bg-white/15 backdrop-blur-md text-white rounded-[14px] py-[11px] px-1 text-[13.5px] font-bold text-center cursor-pointer no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.4)] active:scale-95"
        >
          💬 WhatsApp
        </a>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex-1 border border-white/35 bg-white/15 backdrop-blur-md text-white rounded-[14px] py-[11px] px-1 text-[13.5px] font-bold text-center cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,.4)] active:scale-95"
        >
          🛒 Cart ({totals.n})
        </button>
      </nav>

      <Toast msg={toastMsg} />
    </div>
  );
}
