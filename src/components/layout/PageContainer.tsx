import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function PageContainer({ title, children }: { title: string; children: ReactNode }) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    document.title = `${title} | Neon Music`
    heading.current?.focus()
  }, [title])

  return (
    <main className="page-container">
      <h1 ref={heading} tabIndex={-1}>{title}</h1>
      {children}
    </main>
  )
}
