// В lucide-react нет брендовых иконок — минималистичные версии в том же стиле (stroke 1.5).
type Props = { className?: string }

export const InstagramIcon = ({ className = 'size-5' }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

export const TelegramIcon = ({ className = 'size-5' }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M21 4 3 11.2l6.3 2.3L18 7.5l-6.6 7.3L17.5 20 21 4Z" />
    <path d="m11.4 14.8-2.1 4.7v-6" />
  </svg>
)
