import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Info, MapPin, Send, UtensilsCrossed } from 'lucide-react'
import { Header } from '../components/Header'
import { cafe } from '../data/cafe'
import { asset } from '../asset'
const BG = asset('img/interior.webp')

/**
 * Демонстрационный QR: узор с настоящими «глазками», но без закодированной ссылки —
 * сайт ещё не опубликован. После публикации укажите cafe.publicMenuUrl и подключите генератор QR.
 */
function DemoQr() {
  const cells = useMemo(() => {
    const n = 25
    const out: [number, number][] = []
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const inFinder = (x: number, y: number) =>
      [[0, 0], [n - 7, 0], [0, n - 7]].some(([fx, fy]) => x >= fx - 1 && x < fx + 8 && y >= fy - 1 && y < fy + 8)
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > 0.52) out.push([x, y])
    return out
  }, [])
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.2" fill="#1c231d" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="0.8" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.5" fill="#1c231d" />
    </g>
  )
  return (
    <svg viewBox="-2 -2 29 29" className="size-full" role="img" aria-label="Демонстрационный QR-код">
      <rect x="-2" y="-2" width="29" height="29" fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}:${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.2" fill="#1c231d" />
      ))}
      {finder(0, 0)}
      {finder(18, 0)}
      {finder(0, 18)}
    </svg>
  )
}

const actions = [
  { to: '/menu', label: 'Меню', icon: UtensilsCrossed },
  { to: '/contacts', label: 'Адрес', icon: MapPin },
  { to: '/social', label: 'Соцсети', icon: Send },
  { to: '/about', label: 'О нас', icon: Info },
]

export function QrPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-espresso text-cream">
      <img src={BG} alt="" aria-hidden className="absolute inset-0 size-full scale-110 object-cover opacity-45 blur-[6px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/70 to-espresso" />

      <Header tone="dark" />
      <div className="relative z-10 flex flex-1 animate-fade-up flex-col items-center px-6 pb-[max(28px,env(safe-area-inset-bottom))] pt-6 text-center">
        <h1 className="font-serif text-[27px] leading-tight">
          Отсканируйте QR-код <br />
          для просмотра меню
        </h1>
        <p className="mt-3 text-[13.5px] text-cream/75">Сохраните, чтобы не потерять</p>

        <div className="relative mt-8 w-[min(62vw,240px)] rounded-[22px] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]">
          <div className={cafe.publicMenuUrl ? '' : 'opacity-90'}>
            <DemoQr />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-caramel px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-espresso">
            демо
          </span>
        </div>
        <p className="mt-6 max-w-[280px] text-[12.5px] leading-relaxed text-cream/60">
          Демонстрационный код. Рабочая ссылка появится после публикации сайта.
        </p>

        <nav className="mt-auto grid w-full grid-cols-4 gap-2 pt-10">
          {actions.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="press flex flex-col items-center gap-2 py-2 text-[12.5px] text-cream/90">
              <Icon className="size-6" strokeWidth={1.25} />
              {label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 font-serif text-[22px] tracking-[0.04em]">{cafe.name}</p>
        <p className="mt-1 text-[12px] text-cream/60">Кафе · Пекарня</p>
      </div>
    </div>
  )
}
