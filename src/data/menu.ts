import { asset } from '../asset'
/**
 * Ассортимент ХРУСТ. Источник — карточка заведения в Яндекс Еде (названия, цены, вес, ккал, фото).
 * Описания и составы не заполнены: в исходных данных их нет. Поле `composition` можно
 * заполнить позже — карточка блюда покажет блок «Состав» автоматически.
 */

export type CategoryId =
  | 'breakfast' | 'salads' | 'pasta' | 'sandwiches' | 'bowls' | 'soups'
  | 'lunch' | 'bakery' | 'desserts' | 'pizza25' | 'pizza33' | 'combo'

export type BreakfastKind = 'hearty' | 'sweet'

export interface Category {
  id: CategoryId
  title: string
}

export interface Dish {
  id: string
  name: string
  price: number
  /** Цена «от» — для комбо, где итог зависит от выбора блюд. */
  priceFrom?: boolean
  weight?: number
  kcal?: number
  categories: CategoryId[]
  breakfastKind?: BreakfastKind
  /** Пометка из Яндекс Еды («Выбор пользователей»). */
  hit?: boolean
  /** Короткая подпись из исходных данных: «2 блюда», «Много белка». */
  note?: string
  description?: string
  composition?: string
}

export const categories: Category[] = [
  { id: 'breakfast', title: 'Завтраки' },
  { id: 'salads', title: 'Салаты' },
  { id: 'pasta', title: 'Паста' },
  { id: 'sandwiches', title: 'Сэндвичи' },
  { id: 'bowls', title: 'Боулы' },
  { id: 'soups', title: 'Супы' },
  { id: 'lunch', title: 'Ланч' },
  { id: 'bakery', title: 'Выпечка' },
  { id: 'desserts', title: 'Десерты' },
  { id: 'pizza25', title: 'Пицца 25 см' },
  { id: 'pizza33', title: 'Пицца 33 см' },
  { id: 'combo', title: 'Комбо' },
]

export const breakfastKinds: { id: BreakfastKind | 'all'; title: string }[] = [
  { id: 'all', title: 'Все' },
  { id: 'hearty', title: 'Сытные' },
  { id: 'sweet', title: 'Сладкие' },
]

type Row = [id: string, name: string, price: number, weight?: number, kcal?: number, extra?: Partial<Dish>]

const group = (cats: CategoryId[], rows: Row[], base: Partial<Dish> = {}): Dish[] =>
  rows.map(([id, name, price, weight, kcal, extra]) => ({
    id, name, price, weight, kcal, categories: cats, ...base, ...extra,
  }))

const H: Partial<Dish> = { breakfastKind: 'hearty' }
const S: Partial<Dish> = { breakfastKind: 'sweet' }

export const dishes: Dish[] = [
  ...group(['breakfast'], [
    ['english-sausage', 'Английский завтрак с колбасками', 660, 350, 665, { ...H, hit: true }],
    ['shakshuka', 'Шакшука', 660, 400, 880, { ...H, hit: true }],
    ['english-bacon', 'Английский завтрак с беконом', 635, 300, 678, H],
    ['eggs-bacon', 'Глазунья с беконом', 320, 180, 479, { ...H, hit: true }],
    ['eggs-sausage', 'Глазунья с сосиской', 320, 180, 470, { ...H, hit: true }],
    ['eggs-chicken', 'Глазунья с цыплёнком', 320, 165, 284, { ...H, hit: true }],
    ['cheese-oat-shrimp', 'Сырная овсянка с креветками', 650, 290, undefined, H],
    ['french-toast-salmon', 'Френч тост с лососем и яйцом пашот', 600, 210, 475, H],
    ['french-toast-bacon', 'Френч тост с беконом и яйцом пашот', 600, 145, 370, H],
    ['scramble-salmon', 'Скрэмбл с лососем', 800, 290, 661, H],
    ['waffle-bacon', 'Вафля из цукини с беконом и яйцом пашот', 520, 300, 708, H],
    ['waffle-salmon', 'Вафля из цукини с лососем и яйцом пашот', 650, 300, 549, H],
    ['waffle-turkey', 'Вафля из цукини с индейкой и яйцом пашот', 520, 300, 546, H],
    ['waffle-roastbeef', 'Вафля из цукини с ростбифом и яйцом пашот', 785, 320, 566, H],
    ['spinach-pancake-salmon', 'Шпинатный овсяноблинчик с лососем', 580, 320, 512, H],
    ['fitness-chicken', 'Фитнес завтрак с цыплёнком', 700, 330, 512, H],
    ['fitness-salmon', 'Фитнес завтрак с лососем', 800, 320, 496, H],
    ['buckwheat-roastbeef', 'Каша гречневая с ростбифом', 660, 290, 638, H],
    ['rice-porridge', 'Каша рисовая с маслом', 320, 320, undefined, S],
    ['oat-porridge', 'Каша овсяная с маслом', 320, 320, undefined, S],
  ]),
  ...group(['breakfast', 'desserts'], [
    ['casserole-sour-cream', 'Творожная запеканка со сметаной', 360, 140, 224],
    ['casserole-caramel', 'Творожная запеканка с домашней карамелью', 360, 140, 224],
  ], S),
  ...group(['salads'], [
    ['nicoise', 'Салат Нисуаз', 760, 220, 726],
    ['caesar-chicken', 'Салат Цезарь с цыплёнком', 720, 270, undefined, { hit: true }],
    ['caesar-shrimp', 'Цезарь с креветками', 900, 270, 594],
    ['salad-roastbeef', 'Салат с ростбифом', 780, 160, 320],
    ['salad-eggplant', 'Салат с хрустящими баклажанами', 780, 265, 684, { hit: true }],
    ['salad-pumpkin-duck', 'Салат с печёной тыквой и ростбифом из утки', 780, 190, 200],
  ]),
  ...group(['pasta'], [
    ['pasta-pesto-chicken', 'Паста Песто с цыплёнком', 756, 295, 856],
    ['pasta-four-cheese-chicken', 'Паста Четыре сыра с курицей', 756, 295, 1027],
    ['pasta-alfredo-chicken', 'Паста Альфредо с курицей', 756, 330],
    ['pasta-mushroom-chicken', 'Паста Грибная с курицей', 756, 312, 905],
    ['pasta-alfredo-shrimp', 'Паста Альфредо с креветками', 930, 330],
    ['pasta-pesto-shrimp', 'Паста Песто с креветками', 930, 295, 856],
    ['pasta-four-cheese-shrimp', 'Паста Четыре сыра с креветками', 930, 295, 1027],
    ['pasta-mushroom-shrimp', 'Паста Грибная с креветками', 930, 312, 905],
    ['pasta-four-cheese-veg', 'Паста Четыре сыра без мяса', 660, 270, 940],
    ['pasta-alfredo-veg', 'Паста Альфредо без мяса', 660, 280],
    ['pasta-pesto-veg', 'Паста Песто без мяса', 660, 245, 711],
    ['pasta-mushroom-veg', 'Паста Грибная без мяса', 660, 260, 754],
  ]),
  ...group(['sandwiches'], [
    ['croissant-roastbeef', 'Круассан-сэндвич с ростбифом и соусом', 620, 190, 342],
    ['croissant-mortadella', 'Круассан-сэндвич с мортаделлой', 620, 155, 450],
    ['croissant-keta', 'Круассан-сэндвич с кетой и рикоттой', 520, 140],
    ['croissant-salmon', 'Круассан-сэндвич с лососем', 520, 140],
    ['croissant-bacon-egg', 'Круассан-сэндвич с беконом и яйцом', 520, 165],
    ['croissant-chicken-cheddar', 'Круассан-сэндвич с курицей и сыром чеддер', 520, 130],
    ['croissant-smoked-chicken', 'Круассан-сэндвич с копчёной курочкой', 520, 140],
    ['croissant-ham', 'Круассан-сэндвич с рубленой ветчиной', 520, 160],
    ['focaccia-bacon-egg', 'Фокачча-сэндвич с беконом и яйцом', 560, 206],
    ['focaccia-caesar', 'Фокачча-сэндвич с цыплёнком Цезарь', 560, 240],
    ['focaccia-beef', 'Фокачча-сэндвич со рваной говядиной', 560, 206],
    ['focaccia-tuna', 'Фокачча-сэндвич с тунцом', 560, 206],
    ['focaccia-chicken-sauce', 'Фокачча-сэндвич с курочкой в соусе', 560, 260],
    ['focaccia-cured-meat', 'Фокачча-сэндвич с вяленым мясом', 560, 175],
  ]),
  ...group(['bowls'], [
    ['bowl-shrimp', 'Боул с креветками', 730, 340],
    ['bowl-chicken', 'Боул с цыплёнком', 595, 340],
  ], { note: 'Много белка' }),
  ...group(['soups'], [
    ['soup-pumpkin', 'Суп-пюре тыквенный', 460, 320, 294],
    ['soup-cheese', 'Суп-пюре сырный', 460, 320, 320],
    ['soup-pumpkin-chicken', 'Суп-пюре тыквенный с цыплёнком', 560, 370, 370],
    ['soup-cheese-chicken', 'Суп-пюре сырный с цыплёнком', 560, 370, 370],
    ['borscht', 'Борщ домашний с салом', 650, 450, 450],
    ['solyanka', 'Солянка мясная на копчёных рёбрышках', 630, 380, 331],
  ]),
  ...group(['lunch'], [
    ['cheeks-buckwheat', 'Томлёные щёчки с гречкой', 970, 300, 339],
    ['cheeks-bulgur', 'Томлёные щёчки с булгуром', 970, 300, 396],
    ['cheeks-mash', 'Томлёные щёчки с картофельным пюре', 970, 300, 363],
    ['cordon-bleu', 'Кордон блю с салатом коул-слоу', 740, 220, 763],
  ]),
  ...group(['bakery'], [
    ['croissant-classic', 'Круассан классический на сливочном масле', 180, 65, 234],
  ]),
  ...group(['bakery', 'desserts'], [
    ['muffin-vanilla', 'Маффин ванильный с маковой начинкой', 180, 115],
    ['muffin-chocolate', 'Маффин шоколадный с арахисом', 180, 115],
  ]),
  ...group(['pizza25'], [
    ['pepperoni-25', 'Пицца Пепперони 25 см', 680, 320],
    ['cheese-chicken-25', 'Пицца Сырная курица 25 см', 680, 350],
    ['four-cheese-25', 'Пицца Четыре сыра 25 см', 680, 320],
    ['margherita-25', 'Пицца Маргарита 25 см', 680, 340],
    ['julienne-25', 'Пицца Жюльен 25 см', 680, 380],
    ['bbq-25', 'Пицца Барбекю 25 см', 680, 380],
  ]),
  ...group(['pizza33'], [
    ['pepperoni-33', 'Пицца Пепперони 33 см', 960, 600],
    ['bbq-33', 'Пицца Барбекю 33 см', 960, 600],
    ['cheese-chicken-33', 'Пицца Сырная курица 33 см', 960, 600],
    ['julienne-33', 'Пицца Жюльен 33 см', 960, 600],
    ['margherita-33', 'Пицца Маргарита 33 см', 960, 600],
    ['four-cheese-33', 'Пицца Четыре сыра 33 см', 960, 600],
  ]),
  ...group(['combo'], [
    ['combo-morning-classic', 'Утренняя классика', 640],
    ['combo-sweet-breakfast', 'Завтрак со сладким', 680],
    ['combo-light-sweet', 'Лёгкий завтрак со сладким', 680],
    ['combo-second-salad', 'Второе + Салат', 1380],
  ], { priceFrom: true, note: '2 блюда' }),
]

const byId = new Map(dishes.map((d) => [d.id, d]))

export const getDish = (id: string) => byId.get(id)
export const dishImage = (id: string) => asset(`dishes/${id}.webp`)
export const dishesIn = (category: CategoryId) => dishes.filter((d) => d.categories.includes(category))
export const categoryTitle = (id: CategoryId) => categories.find((c) => c.id === id)?.title ?? ''

export const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`
export const dishPrice = (d: Pick<Dish, 'price' | 'priceFrom'>) => (d.priceFrom ? 'от ' : '') + formatPrice(d.price)
export const dishMeta = (d: Dish) =>
  [d.weight && `${d.weight} г`, d.kcal && `${d.kcal} ккал`, d.note].filter(Boolean).join(' · ')
