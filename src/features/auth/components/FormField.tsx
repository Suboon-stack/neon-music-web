import { useId, useState } from 'react'
import type { AuthField } from '../validation'

interface FormFieldProps {
  name: AuthField
  label: string
  type?: 'text' | 'email' | 'password'
  autoComplete: string
  error?: string
  hint?: string
  minLength?: number
}

export function FormField({ name, label, type = 'text', autoComplete, error, hint, minLength }: FormFieldProps) {
  const id = useId()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const description = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className={isPassword ? 'auth-field-control auth-field-control--password' : 'auth-field-control'}>
        <input
          id={id}
          name={name}
          type={passwordVisible ? 'text' : type}
          autoComplete={autoComplete}
          autoCapitalize={type === 'text' ? undefined : 'none'}
          spellCheck={type === 'text'}
          required
          minLength={minLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={description || undefined}
        />
        {isPassword && (
          <button
            className="auth-password-toggle"
            type="button"
            aria-controls={id}
            aria-label={`${passwordVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {hint && <p className="auth-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="auth-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
