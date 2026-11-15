import { Link } from 'react-router-dom'
import { dishImage, dishMeta, dishPrice, type Dish } from '../data/menu'
import { DishImage } from './DishImage'

/** Компактная карточка блюда — по две в ряд (сетка `grid-cols-2`). */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      to={`/dish/${dish.id}`}
      className="press group flex flex-col overflow-hidden rounded-[18px] border border-line/70 bg-card active:scale-[0.97]"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-2">
        <DishImage src={dishImage(dish.id)} alt={dish.name} className="transition-transform duration-700 group-hover:scale-[1.04]" />
        {dish.hit && (
          <span className="absolute right-2 top-2 rounded-full bg-latte px-2 py-0.5 text-[10.5px] font-semibold text-espresso">
            Хит
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-ink">{dish.name}</h3>
        <span className="mt-1 line-clamp-1 text-[11px] text-muted">{dishMeta(dish)}</span>
        <span className="mt-auto pt-2 text-[15px] font-bold">{dishPrice(dish)}</span>
      </div>
    </Link>
  )
}
