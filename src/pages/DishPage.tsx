import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { DishImage } from '../components/DishImage'
import { categoryTitle, dishImage, dishPrice, dishesIn, getDish } from '../data/menu'

export function DishPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const dish = getDish(id)
  if (!dish) return <Navigate to="/menu" replace />

  const mainCategory = dish.categories[0]
  const related = dishesIn(mainCategory).filter((d) => d.id !== dish.id).slice(0, 8)
  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/menu'))

  return (
    <div key={dish.id} className="min-h-dvh pb-12">
      <div className="relative aspect-[5/4] animate-fade-in overflow-hidden bg-cream-2">
        <DishImage src={dishImage(dish.id)} alt={dish.name} eager />
        <button
          onClick={back}
          aria-label="Назад"
          className="press absolute left-4 top-[max(16px,env(safe-area-inset-top))] grid size-11 place-items-center rounded-full bg-cream text-ink shadow-sm"
        >
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
        {dish.hit && (
          <span className="absolute right-4 top-[max(22px,env(safe-area-inset-top))] rounded-full bg-latte px-3 py-1 text-[12px] font-semibold text-espresso">
            Хит
          </span>
        )}
      </div>

      <article className="relative -mt-6 animate-sheet-up rounded-t-[28px] bg-cream px-5 pt-7">
        <Link to={`/menu?c=${mainCategory}`} className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-muted">
          {categoryTitle(mainCategory)}
        </Link>
        <h1 className="mt-2 font-serif text-[30px] leading-[1.15]">{dish.name}</h1>
        <p className="mt-3 text-[24px] font-bold">{dishPrice(dish)}</p>

        <dl className="mt-5 flex divide-x divide-line rounded-2xl border border-line text-center">
          {[
            ['Вес', dish.weight && `${dish.weight} г`],
            ['Калорийность', dish.kcal && `${dish.kcal} ккал`],
            ['Порция', dish.note],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k as string} className="flex-1 px-2 py-3">
                <dt className="text-[11.5px] text-muted">{k}</dt>
                <dd className="mt-0.5 text-[14.5px] font-semibold">{v}</dd>
              </div>
            ))}
        </dl>

        {dish.description && <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{dish.description}</p>}
        {dish.composition && (
          <div className="mt-5 border-t border-line pt-5">
            <h2 className="text-[15px] font-semibold">Состав</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{dish.composition}</p>
          </div>
        )}
        {dish.priceFrom && (
          <p className="mt-5 text-[13.5px] leading-relaxed text-muted">Указана минимальная цена — итоговая зависит от выбранных блюд.</p>
        )}

        {related.length > 0 && (
          <section className="mt-9">
            <h2 className="font-serif text-[22px]">Ещё в разделе</h2>
            <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-1">
              {related.map((d) => (
                <Link key={d.id} to={`/dish/${d.id}`} replace className="press w-[148px] shrink-0">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-cream-2">
                    <DishImage src={dishImage(d.id)} alt="" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-snug">{d.name}</p>
                  <p className="mt-1 text-[14px] font-bold">{dishPrice(d)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <Link
          to={`/menu?c=${mainCategory}`}
          className="press mt-9 flex h-14 items-center justify-center rounded-2xl bg-olive text-[15px] font-medium text-cream"
        >
          Весь раздел «{categoryTitle(mainCategory)}»
        </Link>
      </article>
    </div>
  )
}
