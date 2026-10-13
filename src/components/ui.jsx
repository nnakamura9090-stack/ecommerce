import { useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }),
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title }) {
  return (
    <>
      <p className="uppercase tracking-[2px] text-xs text-accent font-bold text-center">
        {eyebrow}
      </p>
      <h2 className="font-display text-center mt-1 mb-[18px] text-[clamp(26px,3.5vw,38px)]">
        {title}
      </h2>
    </>
  );
}
