import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Header } from '../components/Header'
import { DishImage } from '../components/DishImage'
import { InstagramIcon, TelegramIcon } from '../components/BrandIcons'
import { cafe } from '../data/cafe'
import { dishImage } from '../data/menu'

const gallery = [
  'pasta-pesto-chicken', 'salad-eggplant', 'shakshuka',
  'eggs-bacon', 'pepperoni-25', 'caesar-shrimp',
  'croissant-classic', 'casserole-sour-cream', 'pasta-alfredo-shrimp',
]

export function Social() {
  return (
    <div className="pb-16">
      <Header />
      <div className="animate-fade-up px-5">
        <h1 className="font-serif text-[36px] leading-tight">Мы в соцсетях</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">Следите за новинками, акциями и атмосферой нашей кофейни.</p>

        <div className="mt-5 divide-y divide-line border-y border-line">
          {[
            { ...cafe.instagram, icon: InstagramIcon },
            { ...cafe.telegram, icon: TelegramIcon },
          ].map(({ url, handle, icon: Icon }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="press flex items-center gap-4 py-4">
              <Icon className="size-[22px]" />
              <span className="flex-1 text-[15px] underline underline-offset-4">{handle}</span>
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1.5 px-3">
        {gallery.map((id, i) => (
          <Link
            key={id}
            to={`/dish/${id}`}
            className="press aspect-square animate-fade-up overflow-hidden rounded-xl bg-cream-2"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <DishImage src={dishImage(id)} alt="" />
          </Link>
        ))}
      </div>

      <div className="px-5">
        <a
          href={cafe.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="press mt-6 flex h-14 items-center justify-center rounded-2xl bg-ink text-[15px] font-medium text-cream"
        >
          Перейти в Instagram
        </a>
      </div>
    </div>
  )
}
