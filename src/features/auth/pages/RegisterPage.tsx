import { routes } from '../../../app/router'
import { AuthForm } from '../components/AuthForm'
import { AuthLayout } from '../components/AuthLayout'
import { FormField } from '../components/FormField'
import { minimumPasswordLength, validateRegistration } from '../validation'

export function RegisterPage() {
  return (
    <AuthLayout title="Create Account">
      <p className="auth-description">Join Neon Music and start listening.</p>
      <AuthForm submitLabel="Create Account" validate={validateRegistration}>
        {(errors) => (
          <>
            <FormField name="fullName" label="Full name" autoComplete="name" error={errors.fullName} />
            <FormField name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            <FormField
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              minLength={minimumPasswordLength}
              hint={`At least ${minimumPasswordLength} characters.`}
              error={errors.password}
            />
            <FormField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword}
            />
          </>
        )}
      </AuthForm>
      <div className="auth-footer">
        <p>Already have an account? <a className="auth-link" href={`#${routes.login.path}`}>Log In</a></p>
      </div>
    </AuthLayout>
  )
}
