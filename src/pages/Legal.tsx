import { Navigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'

const docs: Record<string, { title: string; body: string[] }> = {
  terms: {
    title: 'Пользовательское соглашение',
    body: [
      'Сайт — онлайн-меню кафе-пекарни ХРУСТ. Он носит информационный характер: заказ и оплата через сайт не предусмотрены.',
      'Цены, вес и наличие блюд могут меняться — актуальную информацию уточняйте у сотрудников кафе.',
    ],
  },
  privacy: {
    title: 'Политика конфиденциальности',
    body: [
      'Сайт не собирает персональные данные, не использует формы и не передаёт сведения о посетителях третьим лицам.',
      'Для отображения шрифтов используются Google Fonts.',
    ],
  },
}

export function Legal() {
  const { doc = '' } = useParams()
  const page = docs[doc]
  if (!page) return <Navigate to="/" replace />

  return (
    <div className="pb-16">
      <Header />
      <article className="animate-fade-up px-5">
        <h1 className="font-serif text-[32px] leading-tight">{page.title}</h1>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
          {page.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  )
}
