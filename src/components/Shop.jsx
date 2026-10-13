import { useState } from 'react';
import { CATS, money, badgeCls } from '../data.js';

function badgeTone(b) {
  const c = badgeCls(b);
  if (c === 'sale') return 'bg-[#b3261e]';
  if (c === 'new') return 'bg-[#1a7f4b]';
  return 'bg-ink';
}

export default function Shop({
  list,
  filters,
  setFilters,
  wishlist,
  onAdd,
  onView,
  onWish,
}) {
  const [open, setOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth > 900
  );
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const clear = () =>
    setFilters({
      q: '',
      cat: 'All',
      max: 5000,
      sort: 'featured',
      stock: false,
      sale: false,
    });

  return (
    <main
      id="shop"
      className="max-w-[1200px] mx-auto grid md:grid-cols-[250px_1fr] gap-6 px-5 py-7"
    >
      <aside
        className={`bg-white border border-[#e8e1d6] rounded-[18px] p-[18px] h-fit md:sticky md:top-[86px] ${
          open ? '' : 'hidden md:block'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-display m-0 text-lg">Filters</h3>
          <button
            onClick={clear}
            className="bg-none border-0 text-[#666] underline cursor-pointer text-[13px]"
          >
            Clear all
          </button>
        </div>
        <div className="my-4 grid gap-2 text-sm">
          <label className="font-semibold">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => set({ cat: c })}
                className={`border rounded-full px-3 py-[7px] text-[13px] cursor-pointer transition-all ${
                  filters.cat === c
                    ? 'bg-ink text-white border-ink'
                    : 'border-[#ddd] bg-[#fafafa] hover:border-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="my-4 grid gap-2 text-sm">
          <label className="font-semibold">
            Max price: <b>₹{Number(filters.max).toLocaleString('en-IN')}</b>
          </label>
          <input
            type="range"
            min="50"
            max="5000"
            step="50"
            value={filters.max}
            onChange={(e) => set({ max: +e.target.value })}
            className="w-full accent-[#c96f2e]"
          />
        </div>
        <div className="my-4 grid gap-2 text-sm">
          <label className="font-semibold">Sort by</label>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value })}
            className="border border-[#ddd] rounded-[10px] p-2.5 text-sm w-full max-md:text-base"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low → high</option>
            <option value="high">Price: high → low</option>
            <option value="rating">Top rated</option>
            <option value="new">Newest</option>
          </select>
        </div>
        <label className="my-4 flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.stock}
            onChange={(e) => set({ stock: e.target.checked })}
            className="w-auto"
          />
          <span className="font-semibold">In stock only</span>
        </label>
        <label className="my-4 flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.sale}
            onChange={(e) => set({ sale: e.target.checked })}
            className="w-auto"
          />
          <span className="font-semibold">On sale only</span>
        </label>
      </aside>

      <section>
        <div className="flex justify-between items-center mb-3.5 flex-wrap gap-2">
          <p className="m-0 text-sm text-[#555]">
            {list.length} item{list.length !== 1 ? 's' : ''}{' '}
            {filters.cat !== 'All' ? 'in ' + filters.cat : ''}
          </p>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden border border-ink/35 bg-white/55 backdrop-blur-md rounded-full px-4 py-2 font-semibold text-[13px] cursor-pointer"
          >
            {open ? '✕ Close' : '☰ Filters'}
          </button>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-[#efe9dc] rounded-full px-3 py-1.5 text-xs">
              ✓ Same-day making
            </span>
            <span className="bg-[#efe9dc] rounded-full px-3 py-1.5 text-xs">
              ↩ Easy reprint
            </span>
          </div>
        </div>

        <div className="grid gap-[18px] grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] max-sm:gap-2.5">
          {list.map((p, i) => (
            <article
              key={p.id}
              onClick={() => onView(p.id)}
              style={{ '--d': `${Math.min(i * 45, 450)}ms` }}
              className="anim-pop bg-white border border-[#e9e1d2] rounded-[18px] overflow-hidden flex flex-col cursor-pointer transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.1)] active:scale-[.97]"
            >
              <div className="relative aspect-[1/.95] overflow-hidden bg-[#eee]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${p.id}/600/600`;
                  }}
                  className="w-full h-full object-cover"
                />
                {p.badge && (
                  <span
                    className={`absolute top-2.5 left-2.5 text-white text-[11px] font-bold px-2.5 py-[5px] rounded-full tracking-wide ${badgeTone(p.badge)}`}
                  >
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWish(p.id);
                  }}
                  className="absolute top-2.5 right-2.5 bg-white/90 border-0 rounded-full w-8 h-8 cursor-pointer"
                >
                  {wishlist.has(p.id) ? '♥' : '♡'}
                </button>
              </div>
              <div className="p-3.5 max-sm:p-2.5 grid gap-1.5">
                <span className="text-[11px] uppercase tracking-[1px] text-accent font-bold">
                  {p.cat}
                </span>
                <h3 className="m-0 font-display text-[17px] max-sm:text-sm">
                  {p.title}
                </h3>
                <span className="text-[13px] max-sm:text-[11.5px] text-[#777]">
                  by {p.artist} • ★ {p.rating} ({p.reviews})
                </span>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-bold text-base max-sm:text-sm">
                    {money(p.price)}
                    {p.oldPrice ? (
                      <span className="text-[#999] line-through text-[13px] ml-1.5 font-normal">
                        {money(p.oldPrice)}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-xs text-[#666]">
                    {p.stock > 0 ? `● ${p.stock} left` : '○ Sold out'}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(p.id, 1);
                  }}
                  disabled={p.stock === 0}
                  className="border-0 bg-ink text-white rounded-[10px] p-2.5 max-sm:px-1.5 max-sm:text-[13px] cursor-pointer font-semibold mt-2 transition-colors hover:bg-accent disabled:bg-[#ccc] disabled:cursor-not-allowed active:scale-95"
                >
                  {p.stock === 0 ? 'Sold out' : 'Add to cart'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="text-center py-[60px] text-[#777]">
            <h3 className="font-display">No items found</h3>
            <p>Try a different search or clear filters.</p>
          </div>
        )}
      </section>
    </main>
  );
}
