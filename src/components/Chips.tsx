import { useEffect, useRef } from 'react'

interface Props<T extends string> {
  options: { id: T; title: string }[]
  value: T
  onChange: (id: T) => void
  label: string
}

/** Компактные переключатели с горизонтальной прокруткой; активный всегда в зоне видимости. */
export function Chips<T extends string>({ options, value, onChange, label }: Props<T>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = ref.current
    const el = box?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (box && el) box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [value])

  return (
    <div ref={ref} role="group" aria-label={label} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1">
      {options.map((o) => {
        const active = o.id === value
        return (
          <button
            key={o.id}
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`press h-10 shrink-0 rounded-full px-[18px] text-[13.5px] font-medium ${
              active ? 'bg-olive text-cream' : 'border border-line/70 bg-card/70 text-ink-2 hover:bg-card'
            }`}
          >
            {o.title}
          </button>
        )
      })}
    </div>
  )
}
