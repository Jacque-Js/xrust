import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { Header } from '../components/Header'
import { Chips } from '../components/Chips'
import { DishCard } from '../components/DishCard'
import { categories, dishes, dishesIn, type CategoryId, type Dish } from '../data/menu'

const isCategory = (v: string | null): v is CategoryId => !!v && categories.some((c) => c.id === v)
const sectionId = (id: CategoryId) => `cat-${id}`
const normalize = (s: string) => s.toLowerCase().replace(/ё/g, 'е').trim()

/**
 * Меню одной лентой: разделы идут подряд (Завтраки → Салаты → …).
 * Вкладки сверху сами переключаются, когда раздел доходит до верха экрана,
 * а нажатие на вкладку плавно прокручивает к нужному разделу.
 */
export function MenuPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const initial = params.get('c')

  const [active, setActive] = useState<CategoryId>(isCategory(initial) ? initial : categories[0].id)
  const barRef = useRef<HTMLDivElement>(null)
  /** Пока идёт прокрутка по нажатию на вкладку, автопереключение не дёргает вкладки по пути */
  const lockUntil = useRef(0)
  /** Раздел, к которому надо прокрутить после отрисовки (переход с главной по ?c= или выход из поиска) */
  const pending = useRef<{ id: CategoryId; behavior: ScrollBehavior } | null>(
    isCategory(initial) && initial !== categories[0].id ? { id: initial, behavior: 'instant' } : null,
  )

  const results = useMemo(() => {
    const q = normalize(query)
    if (!q) return null
    return dishes.filter((d) => normalize(d.name).includes(q))
  }, [query])

  const setQuery = (q: string) => {
    const p = new URLSearchParams(params)
    p.delete('c')
    if (q) p.set('q', q)
    else p.delete('q')
    setParams(p, { replace: true, preventScrollReset: true })
  }

  const barHeight = () => barRef.current?.getBoundingClientRect().height ?? 0

  const scrollToCategory = (id: CategoryId, behavior: ScrollBehavior = 'smooth') => {
    const el = document.getElementById(sectionId(id))
    if (!el) return
    lockUntil.current = behavior === 'smooth' ? Date.now() + 1500 : 0
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - barHeight() - 12, behavior })
  }

  const select = (id: CategoryId) => {
    setActive(id)
    if (results) {
      pending.current = { id, behavior: 'instant' }
      setQuery('')
    } else {
      scrollToCategory(id)
    }
  }

  // Прокрутка к разделу, когда он уже отрисован
  useEffect(() => {
    if (results || !pending.current) return
    const { id, behavior } = pending.current
    // Ждём кадр: при первой загрузке страницы восстановление прокрутки роутера сначала сбрасывает её наверх
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        pending.current = null
        scrollToCategory(id, behavior)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [results])

  // Автопереключение вкладок при прокрутке
  useEffect(() => {
    if (results) return
    let raf = 0
    const update = () => {
      if (Date.now() < lockUntil.current) return
      const line = barHeight() + 24
      let current = categories[0].id
      for (const c of categories) {
        const el = document.getElementById(sectionId(c.id))
        if (el && el.getBoundingClientRect().top <= line) current = c.id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = categories[categories.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    const onScrollEnd = () => {
      lockUntil.current = 0
      onScroll()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Сразу после открытия (в т.ч. при возврате со страницы блюда) — подсветить текущий раздел
    onScroll()
    window.addEventListener('scrollend', onScrollEnd)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
    }
  }, [results])

  return (
    <div className="pb-16">
      {/* Липкая панель: ХРУСТ + меню ☰, поиск и вкладки разделов всегда остаются сверху при прокрутке */}
      <div ref={barRef} className="sticky top-0 z-30 border-b border-line/60 bg-cream/75 backdrop-blur-xl">
        <Header compact />
        <div className="px-5 pb-2">
          <label className="flex h-11 items-center gap-3 rounded-2xl border border-line/70 bg-card/80 px-4 focus-within:ring-1 focus-within:ring-ink-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по меню…"
              enterKeyHint="search"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button onClick={() => setQuery('')} aria-label="Очистить поиск" className="press -mr-2 grid size-10 place-items-center">
                <X className="size-[18px]" strokeWidth={1.5} />
              </button>
            ) : (
              <Search className="size-5 text-ink-2" strokeWidth={1.5} />
            )}
          </label>
          <div className="mt-1.5">
            <Chips label="Разделы меню" options={categories} value={active} onChange={select} />
          </div>
        </div>
      </div>

      <div className="px-5">
        <h1 className="sr-only">Меню</h1>
        <div key={results ? 'search' : 'list'} className="mt-5 animate-fade-up">
          {results ? (
            <SearchResults items={results} query={query} />
          ) : (
            categories.map((c) => <Section key={c.id} id={c.id} title={c.title} items={dishesIn(c.id)} />)
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ id, title, items }: { id: CategoryId; title: string; items: Dish[] }) {
  return (
    <section id={sectionId(id)} className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-serif text-[26px] leading-none">{title}</h2>
        {id === 'breakfast' && (
          <Link to="/breakfasts" className="press ml-auto flex items-center gap-1 text-[13px] font-medium text-ink-2 underline underline-offset-4">
            Сытные и сладкие <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((d) => (
          <DishCard key={d.id} dish={d} />
        ))}
      </div>
    </section>
  )
}

function SearchResults({ items, query }: { items: Dish[]; query: string }) {
  if (!items.length)
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-[22px]">Ничего не нашлось</p>
        <p className="mt-2 text-[14px] text-muted">По запросу «{query}» блюд нет. Попробуйте другое слово.</p>
      </div>
    )
  return (
    <>
      <p className="mb-4 text-[13px] text-muted">Найдено: {items.length}</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map((d) => (
          <DishCard key={d.id} dish={d} />
        ))}
      </div>
    </>
  )
}
