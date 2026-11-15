import type { ReactNode } from 'react'
import { Clock, MapPin, Phone } from 'lucide-react'
import { Header } from '../components/Header'
import { InstagramIcon, TelegramIcon } from '../components/BrandIcons'
import { cafe, phoneHref, routeUrl } from '../data/cafe'

const Pending = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-4">
      <span className="mt-0.5 text-ink-2">{icon}</span>
      <div className="text-[15px] leading-snug">{children}</div>
    </div>
  )
}

export function Contacts() {
  const route = routeUrl()
  const ic = 'size-[22px]'

  return (
    <div className="pb-16">
      <Header />
      <div className="animate-fade-up px-5">
        <h1 className="font-serif text-[36px] leading-[1.1]">
          Контакты <br />и часы работы
        </h1>

        <div className="mt-4">
          <Row icon={<MapPin className={ic} strokeWidth={1.5} />}>
            {cafe.address ? (
              <>
                {cafe.city && <p className="font-medium">{cafe.city}</p>}
                <p className="mt-0.5 text-ink-2">{cafe.address}</p>
              </>
            ) : (
              <Pending>Адрес уточняется</Pending>
            )}
          </Row>
          <Row icon={<Phone className={ic} strokeWidth={1.5} />}>
            {cafe.phone ? (
              <>
                <p className="font-medium">{cafe.phone}</p>
                <a href={phoneHref(cafe.phone)} className="mt-1 inline-block text-[13.5px] text-ink-2 underline underline-offset-4">
                  Позвонить
                </a>
              </>
            ) : (
              <Pending>Телефон появится позже</Pending>
            )}
          </Row>
          <Row icon={<Clock className={ic} strokeWidth={1.5} />}>
            {cafe.hours ? <p>{cafe.hours}</p> : <Pending>Часы работы уточняются</Pending>}
          </Row>
        </div>

        <MapPlaceholder />

        {route ? (
          <a href={route} target="_blank" rel="noopener noreferrer" className="press mt-5 flex h-14 items-center justify-center rounded-2xl bg-ink text-[15px] font-medium text-cream">
            Построить маршрут
          </a>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-line px-4 py-4 text-center text-[13.5px] text-muted">
            Маршрут станет доступен, когда адрес будет подтверждён
          </p>
        )}

        <h2 className="mt-10 font-serif text-[22px]">Написать нам</h2>
        <div className="mt-3 divide-y divide-line border-y border-line">
          <a href={cafe.telegram.url} target="_blank" rel="noopener noreferrer" className="press flex items-center gap-4 py-4 text-[15px]">
            <TelegramIcon className={ic} /> {cafe.telegram.handle}
          </a>
          <a href={cafe.instagram.url} target="_blank" rel="noopener noreferrer" className="press flex items-center gap-4 py-4 text-[15px]">
            <InstagramIcon className={ic} /> {cafe.instagram.handle}
          </a>
        </div>
      </div>
    </div>
  )
}

/** Схематичная карта-заглушка в стиле референса — до подключения реальной карты. */
function MapPlaceholder() {
  return (
    <div className="relative mt-4 h-44 overflow-hidden rounded-[22px] bg-cream-2" aria-hidden>
      <svg className="absolute inset-0 size-full text-line" preserveAspectRatio="none" viewBox="0 0 400 180" fill="none" stroke="currentColor">
        <path d="M-10 40 L410 70 M-10 120 L410 100 M-10 165 L410 150 M60 -10 L90 190 M180 -10 L170 190 M300 -10 L330 190" strokeWidth="7" />
        <path d="M-10 80 L410 85 M120 -10 L130 190 M240 -10 L250 190 M360 -10 L370 190" strokeWidth="2.5" />
      </svg>
      <MapPin className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-full fill-ink text-cream-2" strokeWidth={1.5} />
    </div>
  )
}
