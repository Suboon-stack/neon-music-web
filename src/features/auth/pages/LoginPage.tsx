import { routes } from '../../../app/router'
import { AuthForm } from '../components/AuthForm'
import { AuthLayout } from '../components/AuthLayout'
import { FormField } from '../components/FormField'
import { validateLogin } from '../validation'

export function LoginPage() {
  return (
    <AuthLayout title="Welcome Back">
      <p className="auth-description">Log in to your Neon Music account.</p>
      <AuthForm submitLabel="Log In" validate={validateLogin} canResetPassword>
        {(errors) => (
          <>
            <FormField name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            <FormField name="password" label="Password" type="password" autoComplete="current-password" error={errors.password} />
          </>
        )}
      </AuthForm>
      <div className="auth-footer">
        <p>New to Neon Music? <a className="auth-link" href={`#${routes.register.path}`}>Create Account</a></p>
        <a className="auth-link" href={`#${routes.home.path}`}>Explore as Guest</a>
      </div>
    </AuthLayout>
  )
}
