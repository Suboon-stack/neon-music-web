import type { ReactNode } from 'react'
import { Brand } from '../ui/Brand'
import { MobileNavigation, Sidebar } from './Navigation'

export function AppLayout({ activePath, children }: { activePath: string; children: ReactNode }) {
  return (
    <div className="app-layout">
      <Sidebar activePath={activePath} />
      <header className="mobile-header">
        <a className="brand-link" href="#/"><Brand /></a>
      </header>
      {children}
      <MobileNavigation activePath={activePath} />
    </div>
  )
}
