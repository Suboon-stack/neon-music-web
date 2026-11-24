import { AppLayout } from '../components/layout/AppLayout'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { WelcomePage } from '../features/auth/pages/WelcomePage'
import { routes, useRoute } from './router'

const relatedLinks: Record<string, { path: string; title: string }> = {
  [routes.home.path]: routes.discover,
  [routes.discover.path]: routes.album,
  [routes.library.path]: routes.playlist,
  [routes.album.path]: routes.discover,
  [routes.playlist.path]: routes.library,
}

export default function App() {
  const { path, title, layout } = useRoute()
  const relatedPage = relatedLinks[path]

  if (path === routes.welcome.path) return <WelcomePage />
  if (path === routes.login.path) return <LoginPage />
  if (path === routes.register.path) return <RegisterPage />

  if (layout === 'entry') {
    return (
      <AuthLayout title={title}>
        <Button href={`#${routes.home.path}`}>Go to Home</Button>
      </AuthLayout>
    )
  }

  return (
    <AppLayout activePath={path}>
      <PageContainer title={title}>
        <section className="placeholder">
          <p>This screen is planned for a later phase.</p>
          {relatedPage && <Button href={`#${relatedPage.path}`}>{relatedPage.title}</Button>}
        </section>
      </PageContainer>
    </AppLayout>
  )
}
