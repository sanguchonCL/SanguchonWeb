import React, { useRef } from 'react';
import { motion, useAnimation, useAnimationFrame, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const layers = [
  { id: 'bun-top', title: 'PAN BRIOCHE', description: 'Dorado, suave y firme para sostener todo el ritual.', image: '/images/anatomy/pan-brioche-top.webp', spread: -116, float: 7, duration: 3, delay: 0 },
  { id: 'cheese', title: 'DOBLE CHEDDAR', description: 'Se funde sobre la carne con el brillo justo de la plancha.', image: '/images/anatomy/doble-cheddar.webp', spread: -34, float: 5, duration: 4, delay: .35 },
  { id: 'patty', title: 'ANGUS SMASH', description: 'Costra intensa, centro jugoso y ese golpe de sabor sagrado.', image: '/images/anatomy/carne-angus.webp', spread: 42, float: 6, duration: 3.5, delay: .7 },
  { id: 'bun-bottom', title: 'BASE SAGRADA', description: 'La última capa: salsa de la casa y estructura hasta el final.', image: '/images/anatomy/pan-brioche-base.webp', spread: 112, float: 4, duration: 4.4, delay: .95 },
];

function useIdleOffset(amplitude, duration, delay, progress) {
  const idle = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  useAnimationFrame((time) => {
    if (reducedMotion || progress.get() > .08) return idle.set(0);
    const seconds = Math.max(0, time / 1000 - delay);
    idle.set(Math.sin((seconds / duration) * Math.PI * 2) * amplitude);
  });
  return idle;
}

function AnatomyLayer({ layer, index, progress }) {
  const idle = useIdleOffset(layer.float, layer.duration, layer.delay, progress);
  const assembledY = useTransform(progress, [0, .78, .92], [layer.spread, layer.spread * .08, 0]);
  const y = useTransform([assembledY, idle, progress], ([assembled, breathing, amount]) => assembled + breathing * (1 - amount * 7));
  const scale = useSpring(useTransform(progress, [.7, .9, 1], [.985, 1.015, 1]), { stiffness: 180, damping: 18 });
  const opacity = useTransform(progress, [0, .1], [.78, 1]);
  return <motion.div className="absolute inset-x-0 flex h-28 items-center justify-center drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] sm:h-36" style={{ y, scale, opacity, zIndex: layers.length - index }}><motion.img src={layer.image} alt={layer.title} loading={index === 0 ? 'eager' : 'lazy'} className="h-full w-[min(88vw,25rem)] object-contain" whileHover={{ scale: 1.025 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} /></motion.div>;
}

function LayerCopy({ layer, index, progress }) {
  const start = index * .25;
  const opacity = useTransform(progress, [Math.max(0, start - .12), start, start + .18, Math.min(1, start + .38)], [.25, 1, 1, .35]);
  const x = useTransform(progress, [Math.max(0, start - .12), start], [-16, 0]);
  return <motion.article style={{ opacity, x }} className="group border-l border-white/15 py-5 pl-5 transition-colors hover:border-[#ff5a1f]"><p className="mb-2 flex items-center gap-2 text-[.6rem] font-bold uppercase tracking-[.2em] text-[#ff5a1f]"><span className="h-px w-5 bg-[#ff5a1f] transition-all group-hover:w-9" />0{index + 1}</p><h3 className="font-display text-3xl leading-none tracking-wide text-[#fff8ed] sm:text-4xl">{layer.title}</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{layer.description}</p></motion.article>;
}

export default function BurgerAnatomy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 80%', 'end 45%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: .35 });
  const impactControls = useAnimation();
  const hasImpacted = useRef(false);
  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= .9 && !hasImpacted.current) {
      hasImpacted.current = true;
      impactControls.start({ opacity: [0, .22, 0], scale: [.8, 1.15, 1], transition: { duration: .8, ease: 'easeOut' } });
    }
    if (value < .72) hasImpacted.current = false;
  });
  return <div ref={containerRef} className="relative grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
    <div className="order-2 flex flex-col gap-3 pt-[20rem] lg:order-1 lg:gap-5 lg:py-[20vh] lg:pt-0">{layers.map((layer, index) => <LayerCopy key={layer.id} layer={layer} index={index} progress={progress} />)}</div>
    <div className="sticky top-20 z-20 order-1 -mb-[19rem] flex h-[19rem] items-center justify-center pointer-events-none lg:static lg:order-2 lg:mb-0 lg:h-auto"><div className="relative flex h-[19rem] w-full items-center justify-center lg:sticky lg:top-[22vh] lg:h-[54vh] lg:min-h-96">
      <motion.div animate={impactControls} initial={{ opacity: 0, scale: .8 }} className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,.55),rgba(229,9,20,.18)_42%,transparent_72%)] blur-2xl" />
      <div className="relative h-56 w-full max-w-[25rem] sm:h-72">{layers.map((layer, index) => <AnatomyLayer key={layer.id} layer={layer} index={index} progress={progress} />)}</div>
      <p className="absolute bottom-0 text-[.6rem] font-bold uppercase tracking-[.22em] text-white/50 animate-pulse">Scroll para ensamblar <span aria-hidden="true">↓</span></p>
    </div></div>
  </div>;
}
