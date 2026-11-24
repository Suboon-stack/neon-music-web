import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { FormErrors } from '../validation'

interface AuthFormProps {
  submitLabel: string
  validate: (form: FormData) => FormErrors
  children: (errors: FormErrors) => ReactNode
  canResetPassword?: boolean
}

export function AuthForm({ submitLabel, validate, children, canResetPassword }: AuthFormProps) {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [notice, setNotice] = useState('')

  useEffect(() => {
    // Focus after React renders the error descriptions.
    form.current?.querySelector<HTMLInputElement>('input[aria-invalid="true"]')?.focus()
  }, [errors])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(new FormData(event.currentTarget))
    setErrors(nextErrors)
    setNotice(Object.keys(nextErrors).length ? '' : 'Account authentication isn’t connected yet.')
  }

  return (
    <form className="auth-form" ref={form} method="post" noValidate onSubmit={handleSubmit} onChange={() => setNotice('')}>
      {children(errors)}
      {canResetPassword && (
        <button
          className="auth-text-button"
          type="button"
          onClick={() => setNotice('Password reset will be available when account authentication is connected.')}
        >
          Forgot Password?
        </button>
      )}
      <button className="button button--primary auth-submit" type="submit">{submitLabel}</button>
      <div className="auth-status" role="status">{notice}</div>
    </form>
  )
}
