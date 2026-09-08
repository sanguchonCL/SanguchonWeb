import { useEffect, useMemo, useRef, useState } from 'react';
import { santoralData } from '../../data/santoral';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const keyFor = (m: number, d: number) =>
  `${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` as keyof typeof santoralData;

const fmt = (names: string[] = []) => {
  if (!names.length) return 'Santo por confirmar';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} y ${names.at(-1)}`;
};

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es-CL')
    .trim();

export default function SeccionSantoral() {
  const [cur, setCur] = useState<{ m: number; d: number } | null>(null);
  const [month, setMonth] = useState(7);
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Santiago', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const m = Number(p.find(x => x.type === 'month')?.value);
    const d = Number(p.find(x => x.type === 'day')?.value);
    setCur({ m, d });
    setMonth(m);
  }, []);

  const todayNames = useMemo(() => {
    if (!cur) return [];
    return santoralData[keyFor(cur.m, cur.d)]?.names ?? [];
  }, [cur]);

  const days = useMemo(() => {
    const normalizedQuery = normalize(query);

    return Object.entries(santoralData)
      .map(([key, value]) => ({
        month: Number(key.slice(0, 2)),
        day: Number(key.slice(3, 5)),
        names: value.names,
      }))
      .filter(item => {
        if (normalizedQuery) {
          return item.names.some(name => normalize(name).includes(normalizedQuery));
        }

        return item.month === month;
      })
      .sort((a, b) => a.month - b.month || a.day - b.day);
  }, [month, query]);

  useEffect(() => {
    if (!cur || query || month !== cur.m) return;

    const container = listRef.current;
    const activeRow = container?.querySelector('[data-today]') as HTMLElement | null;
    if (!container || !activeRow) return;

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const rowRect = activeRow.getBoundingClientRect();
      const targetTop =
        container.scrollTop +
        (rowRect.top - containerRect.top) -
        (container.clientHeight - rowRect.height) / 2;

      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    });
  }, [cur, month, query, days.length]);

  const todayLabel = cur ? `${cur.d} de ${MONTHS[cur.m - 1]}` : '';
  const todayDay = cur ? String(cur.d).padStart(2, '0') : '--';

  const prev = () => setMonth(m => m <= 1 ? 12 : m - 1);
  const next = () => setMonth(m => m >= 12 ? 1 : m + 1);

  return (
    <section id="santoral" className="relative overflow-hidden" style={{ scrollMarginTop: 96 }}>
      <img
        src="/images/seasonal/18-septiembre/cinta-chile.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="seasonal-only seasonal-ribbon pointer-events-none absolute -right-28 top-4 w-[min(82vw,760px)] opacity-[.07]"
      />
      <div className="container" style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>

        {/* ─── HEADER ─── */}
        <header className="santoral-reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 780 }}>
          <p className="text-fire" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>
            03 / Bendición del barrio
          </p>
          <h2 className="font-display text-ink" style={{ fontSize: 'clamp(3.1rem, 7vw, 6.5rem)', lineHeight: 0.82, letterSpacing: '-0.03em' }}>
            SI ESTÁS<br /><span className="text-fire">DE SANTO</span>
          </h2>
          <p className="text-ink-soft" style={{ marginTop: 20, maxWidth: 620, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', lineHeight: 1.6 }}>
            Una tradición de barrio que no perdona. Revisa si hoy es tu día de suerte, busca tu nombre y pasa a cobrar tu regalo.
          </p>
        </header>

        {/* ─── BENTO GRID ─── */}
        <div style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: '1fr',
        }}>

          {/* Fila 1: Imagen + Santo del Día (lado a lado en desktop) */}
          <div style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(1, 1fr)',
          }} className="santoral-top-grid">

            {/* ╔══ IMAGEN PROMO ══╗ */}
            <div className="santoral-media group bg-charcoal ring-1 ring-line santoral-reveal" style={{
              borderRadius: 22,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(180deg, #f97316 0%, #9a3412 40%, var(--sg-charcoal, #100d0b) 100%)',
            }}>
              <img
                src="/images/promos/si-estas-de-santo.webp"
                alt="Promo: completo y bebida gratis si estás de santo"
                style={{ width: '100%', height: 'auto', maxHeight: 520, objectFit: 'contain' }}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* ╔══ SANTO DEL DÍA ══╗ */}
            <article className="bg-surface-raised ring-1 ring-line santoral-reveal" style={{
              animationDelay: '120ms',
              borderRadius: 22,
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 20px 55px rgb(34 15 7 / .10)',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', right: -60, top: -60, width: 200, height: 200,
                borderRadius: '50%', background: 'rgb(232 59 22 / .08)', filter: 'blur(60px)',
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p className="text-fire" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    ✦ Santo del día · {todayLabel}
                  </p>
                  <h3 className="font-display text-ink" style={{
                    marginTop: 16,
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                    lineHeight: 0.92,
                    letterSpacing: '-0.025em',
                    textTransform: 'uppercase',
                  }}>
                    Hoy celebramos a:{' '}
                    <span className="font-sans font-black text-orange-500">
                      {todayNames.length ? fmt(todayNames) : '…'}
                    </span>
                  </h3>
                </div>
                <span className="border border-orange-500/30 text-orange-500" style={{
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                  width: 56, height: 56, borderRadius: 16,
                  background: 'rgb(232 59 22 / .1)',
                  fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900,
                  boxShadow: '0 0 24px rgb(232 59 22 / .15)',
                }}>
                  {todayDay}
                </span>
              </div>

              <p className="text-ink-soft" style={{ position: 'relative', marginTop: 20, maxWidth: 480, fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)', lineHeight: 1.6 }}>
                Ven por tu completo + bebida gratis mostrando tu carnet y con un partner.
              </p>

              <a
                href="#ubicacion"
                className="bg-fire text-white"
                style={{
                  marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
                  borderRadius: 9999, padding: '12px 24px',
                  fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                  transition: 'transform .2s, background .2s', alignSelf: 'flex-start',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Reclamar promo <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>

          {/* ╔══ CALENDARIO ══╗ */}
          <article className="bg-surface-raised ring-1 ring-line santoral-reveal" style={{
            animationDelay: '220ms',
            borderRadius: 22, overflow: 'hidden',
            boxShadow: '0 20px 55px rgb(34 15 7 / .10)',
          }}>
            {/* Toolbar */}
            <div className="border-b border-line" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 12, padding: '14px 20px',
            }}>
              <h3 className="text-ink" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', fontWeight: 700 }}>
                ¿Cuándo es tu turno?
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                <button
                  onClick={prev}
                  className="text-muted"
                  style={{
                    display: 'grid', placeItems: 'center', width: 36, height: 36,
                    borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--sg-line)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Mes anterior"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <label htmlFor="santoral-month" className="sr-only">Mes</label>
                <select
                  id="santoral-month"
                  value={month}
                  onChange={e => setMonth(Number(e.target.value))}
                  className="text-ink border-line"
                  style={{
                    appearance: 'none', borderRadius: 8, border: '1px solid',
                    background: '#171310', color: '#fff8ed', colorScheme: 'dark',
                    minWidth: 118, padding: '8px 32px 8px 12px',
                    fontSize: '0.875rem', fontWeight: 700,
                    outline: 'none', cursor: 'pointer',
                    backgroundImage: 'linear-gradient(45deg, transparent 50%, #e83b16 50%), linear-gradient(135deg, #e83b16 50%, transparent 50%)',
                    backgroundPosition: 'calc(100% - 15px) 50%, calc(100% - 10px) 50%',
                    backgroundSize: '5px 5px, 5px 5px',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {MONTHS.map((m, i) => (
                    <option
                      key={m}
                      value={i + 1}
                      style={{ backgroundColor: '#171310', color: '#fff8ed' }}
                    >
                      {m}
                    </option>
                  ))}
                </select>
                <button
                  onClick={next}
                  className="text-muted"
                  style={{
                    display: 'grid', placeItems: 'center', width: 36, height: 36,
                    borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--sg-line)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Mes siguiente"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>

            <div className="border-b border-line" style={{ padding: '14px 20px' }}>
              <label
                htmlFor="santoral-search"
                className="text-muted"
                style={{ display: 'block', marginBottom: 8, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Buscar por nombre
              </label>
              <div style={{ position: 'relative' }}>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted"
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.4-3.4" />
                </svg>
                <input
                  id="santoral-search"
                  type="text"
                  inputMode="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Ej: Teresa, Juan, María…"
                  autoComplete="off"
                  className="border-line bg-charcoal text-white placeholder:text-white/35"
                  style={{
                    width: '100%', minHeight: 46, border: '1px solid', borderRadius: 12,
                    padding: '11px 44px 11px 42px', fontSize: '0.875rem', outline: 'none',
                    transition: 'border-color .2s, box-shadow .2s',
                  }}
                  onFocus={event => {
                    event.currentTarget.style.borderColor = 'rgb(232 59 22 / .7)';
                    event.currentTarget.style.boxShadow = '0 0 0 3px rgb(232 59 22 / .12)';
                  }}
                  onBlur={event => {
                    event.currentTarget.style.borderColor = 'var(--sg-line)';
                    event.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Limpiar búsqueda"
                    className="text-muted hover:text-white"
                    style={{ position: 'absolute', right: 8, top: '50%', width: 34, height: 34, transform: 'translateY(-50%)', border: 0, borderRadius: 8, background: 'transparent', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                )}
              </div>
              <p className="text-muted" style={{ marginTop: 8, fontSize: '0.7rem', lineHeight: 1.45 }}>
                {query
                  ? `${days.length} coincidencia${days.length === 1 ? '' : 's'} en todo el año.`
                  : `Mostrando el santoral de ${MONTHS[month - 1]}.`}
              </p>
            </div>

            {/* Day grid — capped, scrollable */}
            <div
              ref={listRef}
              className="santoral-day-list"
              style={{
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-fire, #e83b16) transparent',
              }}
            >
              {days.map(({ month: itemMonth, day, names }) => {
                const isToday = cur?.m === itemMonth && cur.d === day;
                return (
                  <div
                    key={`${itemMonth}-${day}`}
                    {...(isToday ? { 'data-today': '' } : {})}
                    className={`${isToday ? 'santoral-today' : ''} border-b border-line transition-colors duration-200`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '12px 20px',
                      fontSize: '0.875rem',
                      transition: 'background .15s',
                      background: isToday ? 'rgb(232 59 22 / .08)' : undefined,
                    }}
                    onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = 'var(--sg-line)'; }}
                    onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{
                      display: 'grid', placeItems: 'center', flexShrink: 0,
                      width: 36, height: 36, borderRadius: '50%',
                      fontSize: '0.75rem', fontWeight: 700,
                      background: isToday ? 'var(--color-fire, #e83b16)' : 'var(--sg-line)',
                      color: isToday ? '#fff' : 'var(--sg-muted)',
                      boxShadow: isToday ? '0 0 12px rgb(232 59 22 / .3)' : undefined,
                    }}>
                      {day}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span className={isToday ? 'font-bold text-white' : 'text-ink-soft'} style={{ display: 'block', fontWeight: isToday ? 700 : 500 }}>
                        {fmt(names)}
                      </span>
                      {query && (
                        <span className="text-muted" style={{ display: 'block', marginTop: 2, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {day} de {MONTHS[itemMonth - 1]}
                        </span>
                      )}
                    </span>
                    {isToday && (
                      <span className="text-fire" style={{
                        marginLeft: 'auto', borderRadius: 9999,
                        background: 'rgb(232 59 22 / .12)', padding: '3px 10px',
                        fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                      }}>
                        Hoy
                      </span>
                    )}
                  </div>
                );
              })}
              {!days.length && (
                <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                  <p className="text-ink" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    No encontramos ese nombre.
                  </p>
                  <p className="text-muted" style={{ marginTop: 6, fontSize: '0.75rem' }}>
                    Prueba con otro nombre o revisa la escritura.
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Responsive grid via CSS — guaranteed to work */}
      <style>{`
        .santoral-day-list {
          max-height: 340px;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 639px) {
          .santoral-day-list {
            max-height: 280px;
          }
        }

        @media (min-width: 1024px) {
          .santoral-top-grid {
            grid-template-columns: 5fr 7fr !important;
          }
        }
      `}</style>
    </section>
  );
}
