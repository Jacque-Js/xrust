import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Header } from '../components/Header'
import { DishCard } from '../components/DishCard'
import { categories, dishes } from '../data/menu'
import { cafe } from '../data/cafe'
import { asset } from '../asset'

const HERO = asset('img/interior.webp')
const hits = dishes.filter((d) => d.hit)

export function Home() {
  const nextRef = useRef<HTMLElement>(null)

  return (
    <div className="pb-16">
      {/* Экран 1 — фото зала. Кадр сдвинут к неоновой вывеске, название — внизу, на тёмном полу, чтобы не спорить с вывеской */}
      <section className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-espresso text-cream">
        <img
          src={HERO}
          alt="Зал ХРУСТ: оливковые стены, неоновая вывеска, витрина с десертами и плетёные лампы"
          fetchPriority="high"
          className="absolute inset-0 size-full animate-hero-zoom object-cover object-[47%_50%]"
        />
        {/* Затемнение сверху — под шапку, снизу — под текст; середина с вывеской остаётся светлой */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,35,29,.7)_0%,rgba(28,35,29,0)_18%,rgba(28,35,29,0)_42%,rgba(28,35,29,.55)_62%,rgba(20,26,21,.94)_100%)]" />

        <Header tone="dark" logo={false} />

        <div className="relative z-10 mt-auto animate-fade-up px-6 pb-[max(24px,env(safe-area-inset-bottom))] [animation-delay:250ms]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-amber">{cafe.tagline}</p>
          <h1 className="mt-3 animate-glow font-serif text-[clamp(64px,19vw,88px)] font-medium leading-[0.9] tracking-[0.05em] text-[#fff4e2]">
            {cafe.name}
          </h1>
          <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-cream/85">
            Хороший кофе, свежая выпечка и тёплый свет — заходите надолго.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              to="/menu"
              className="press flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber text-[15px] font-semibold text-espresso shadow-[0_10px_30px_-10px_rgba(245,180,90,.7)]"
            >
              Открыть меню <ArrowRight className="size-[18px]" strokeWidth={2} />
            </Link>
            <Link
              to="/contacts"
              className="press flex h-14 items-center justify-center rounded-2xl border border-cream/30 bg-cream/10 px-5 text-[15px] font-medium backdrop-blur-md"
            >
              Как найти
            </Link>
          </div>

          <button
            onClick={() => nextRef.current?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Листать вниз"
            className="press mx-auto mt-5 flex flex-col items-center gap-1 text-[12px] text-cream/60"
          >
            Листай
            <ArrowDown className="size-4 animate-nudge" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Продолжение — быстрый вход в меню */}
      <section ref={nextRef} className="scroll-mt-0 px-5 pt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-[30px] leading-none">Меню</h2>
          <Link to="/menu" className="press flex items-center gap-1.5 text-[14px] font-medium underline underline-offset-4">
            Всё меню <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5">
          {categories.map((c) => (
            <Link key={c.id} to={`/menu?c=${c.id}`} className="press h-10 shrink-0 content-center rounded-full border border-line bg-card px-[18px] text-[13.5px] font-medium text-ink-2">
              {c.title}
            </Link>
          ))}
        </div>

        <h3 className="mt-10 font-serif text-[22px]">Выбор гостей</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {hits.slice(0, 4).map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
        <Link to="/menu" className="press mt-6 flex h-14 items-center justify-center rounded-2xl bg-olive text-[15px] font-medium text-cream">
          Открыть меню
        </Link>

        <nav className="mt-10 divide-y divide-line border-y border-line">
          {[
            ['/about', 'О нас'],
            ['/contacts', 'Контакты и часы работы'],
            ['/social', 'Мы в соцсетях'],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="press flex items-center justify-between py-4 text-[15px]">
              {label}
              <ArrowRight className="size-[18px] text-muted" strokeWidth={1.5} />
            </Link>
          ))}
        </nav>
      </section>
    </div>
  )
}
