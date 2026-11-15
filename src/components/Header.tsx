import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { SideMenu } from './SideMenu'

export function Header({ tone = 'light', logo = true, compact = false }: { tone?: 'light' | 'dark'; logo?: boolean; compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const color = tone === 'dark' ? 'text-cream' : 'text-ink'

  return (
    <>
      <header className={`relative z-20 flex ${compact ? 'h-14' : 'h-[68px]'} items-center justify-between px-5 pt-[env(safe-area-inset-top)] ${color}`}>
        {logo ? (
          <Link to="/" className="font-serif text-[26px] leading-none tracking-[0.04em]" aria-label="ХРУСТ — на главную">
            ХРУСТ
          </Link>
        ) : (
          <span />
        )}
        <button onClick={() => setOpen(true)} aria-label="Открыть меню" className="press -mr-2 grid size-11 place-items-center">
          <Menu className="size-6" strokeWidth={1.5} />
        </button>
      </header>
      {createPortal(<SideMenu open={open} onClose={close} />, document.body)}
    </>
  )
}
