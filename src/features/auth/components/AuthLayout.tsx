import type { ReactNode } from 'react'
import { PageContainer } from '../../../components/layout/PageContainer'
import { BrandMark } from '../../../components/ui/Brand'
import '../auth.css'

export function AuthLayout({ title, children, welcome = false }: {
  title: string
  children: ReactNode
  welcome?: boolean
}) {
  return (
    <div className="auth-screen">
      <div className={welcome ? 'auth-card auth-card--welcome' : 'auth-card'}>
        {welcome ? (
          <span className="auth-brand"><BrandMark /></span>
        ) : (
          <a className="auth-brand" href="#/" aria-label="Neon Music welcome"><BrandMark /></a>
        )}
        <PageContainer title={title}>{children}</PageContainer>
      </div>
    </div>
  )
}
