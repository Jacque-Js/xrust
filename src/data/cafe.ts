/**
 * Контакты и ссылки. `null` — данные ещё не подтверждены: интерфейс покажет аккуратную заглушку.
 * Заполните поля, когда владелец подтвердит информацию.
 */
export const cafe = {
  name: 'ХРУСТ',
  tagline: 'Кафе-пекарня',
  city: null as string | null,
  address: null as string | null,
  phone: null as string | null, // формат: '+7 (913) 000-00-00'
  hours: null as string | null, // например: 'Ежедневно с 08:00 до 22:00'
  instagram: { handle: '@xrust.cafe', url: 'https://instagram.com/xrust.cafe' },
  telegram: { handle: 't.me/xrustcafe', url: 'https://t.me/xrustcafe' },
  /** Адрес опубликованного меню для QR-кода. Пока сайт не опубликован — показывается демо-код. */
  publicMenuUrl: null as string | null,
}

/** Ссылка на маршрут в Яндекс Картах; `null`, пока адрес не подтверждён. */
export const routeUrl = () =>
  cafe.address
    ? `https://yandex.ru/maps/?rtext=~${encodeURIComponent([cafe.city, cafe.address].filter(Boolean).join(', '))}`
    : null

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`
