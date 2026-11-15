import { useState } from 'react'

/** Фото блюда: object-cover без искажений, ленивая загрузка и мягкое появление. */
export function DishImage({ src, alt = '', className = '', eager = false }: { src: string; alt?: string; className?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      width={480}
      height={480}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`size-full object-cover object-[50%_45%] transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
