import { routes } from '../../../app/router'
import { Button } from '../../../components/ui/Button'
import { AuthLayout } from '../components/AuthLayout'

export function WelcomePage() {
  return (
    <AuthLayout title="Neon Music" welcome>
      <p className="auth-tagline">Your music, anywhere.</p>
      <div className="auth-welcome-actions">
        <Button href={`#${routes.login.path}`}>Log In</Button>
        <Button href={`#${routes.register.path}`} variant="secondary">Create Account</Button>
        <a className="auth-link" href={`#${routes.home.path}`}>Explore as Guest</a>
      </div>
      <div className="auth-vinyl-art" aria-hidden="true">
        <div className="auth-record" />
      </div>
    </AuthLayout>
  )
}
