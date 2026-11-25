import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function PageContainer({ title, children, className, artwork, headerDetails }: {
  title: string
  children: ReactNode
  className?: string
  artwork?: ReactNode
  headerDetails?: ReactNode
}) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    document.title = `${title} | Neon Music`
    heading.current?.focus()
  }, [title])

  const titleElement = <h1 ref={heading} tabIndex={-1}>{title}</h1>

  return (
    <main className={className ? `page-container ${className}` : 'page-container'}>
      {artwork || headerDetails ? (
        <header className="page-heading">
          {artwork}
          <div>
            {titleElement}
            {headerDetails}
          </div>
        </header>
      ) : titleElement}
      {children}
    </main>
  )
}
