import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Info, MapPin, QrCode, UtensilsCrossed, X } from 'lucide-react'
import { InstagramIcon } from './BrandIcons'

const items = [
  { to: '/menu', label: 'Меню', icon: UtensilsCrossed },
  { to: '/breakfasts', label: 'Завтраки', icon: Coffee },
  { to: '/about', label: 'О нас', icon: Info },
  { to: '/contacts', label: 'Контакты', icon: MapPin },
  { to: '/social', label: 'Соцсети', icon: InstagramIcon },
  { to: '/qr', label: 'QR-код меню', icon: QrCode },
]

export function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-500 ${open ? 'visible' : 'invisible'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-espresso/40 backdrop-blur-[2px] transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <nav
        role="dialog"
        aria-label="Навигация"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col bg-[linear-gradient(170deg,#f7efe3_0%,#f1e5da_55%,#ebe6d8_100%)] px-6 pb-[max(28px,env(safe-area-inset-bottom))] pt-5 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-12 items-center justify-between">
          <Link to="/" onClick={onClose} className="font-serif text-[26px] tracking-[0.04em]">
            ХРУСТ
          </Link>
          <button onClick={onClose} aria-label="Закрыть меню" className="press -mr-2 grid size-11 place-items-center rounded-full">
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <ul className="mt-8 space-y-1">
          {items.map(({ to, label, icon: Icon }, i) => (
            <li
              key={to}
              className={`transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
              style={{ transitionDelay: open ? `${120 + i * 45}ms` : '0ms' }}
            >
              <Link to={to} onClick={onClose} className="press flex items-center gap-5 py-3.5 text-[17px]">
                <Icon className="size-5 text-rose" strokeWidth={1.5} />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-3 border-t border-line pt-6 text-center text-[13px] text-muted">
          <Link to="/legal/terms" onClick={onClose} className="block py-1 hover:text-ink">
            Пользовательское соглашение
          </Link>
          <Link to="/legal/privacy" onClick={onClose} className="block py-1 hover:text-ink">
            Политика конфиденциальности
          </Link>
        </div>
      </nav>
    </div>
  )
}
