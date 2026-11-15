import { useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Chips } from '../components/Chips'
import { DishRow } from '../components/DishRow'
import { breakfastKinds, dishesIn, type BreakfastKind } from '../data/menu'

type Kind = BreakfastKind | 'all'
const all = dishesIn('breakfast')

export function Breakfasts() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('k')
  const kind: Kind = raw === 'hearty' || raw === 'sweet' ? raw : 'all'
  const items = kind === 'all' ? all : all.filter((d) => d.breakfastKind === kind)

  return (
    <div className="pb-16">
      <Header />
      <div className="px-5">
        <h1 className="animate-fade-up font-serif text-[36px] leading-tight">Завтраки</h1>
        <div className="mt-4">
          <Chips
            label="Тип завтрака"
            options={breakfastKinds}
            value={kind}
            onChange={(k) => setParams(k === 'all' ? {} : { k }, { replace: true, preventScrollReset: true })}
          />
        </div>
        <div key={kind} className="mt-3 animate-fade-up divide-y divide-line">
          {items.map((d) => (
            <DishRow key={d.id} dish={d} />
          ))}
        </div>
      </div>
    </div>
  )
}
