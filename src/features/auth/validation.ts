export type AuthField = 'fullName' | 'email' | 'password' | 'confirmPassword'
export type FormErrors = Partial<Record<AuthField, string>>
export const minimumPasswordLength = 8

function readField(form: FormData, name: AuthField) {
  const value = form.get(name)
  return typeof value === 'string' ? value : ''
}

export function validateLogin(form: FormData): FormErrors {
  const errors: FormErrors = {}
  const email = readField(form, 'email').trim()

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address, like you@example.com.'
  }

  if (!readField(form, 'password')) {
    errors.password = 'Enter your password.'
  }

  return errors
}

export function validateRegistration(form: FormData): FormErrors {
  const errors = validateLogin(form)
  const password = readField(form, 'password')
  const confirmation = readField(form, 'confirmPassword')

  if (!readField(form, 'fullName').trim()) {
    errors.fullName = 'Enter your full name.'
  }
  if (password && password.length < minimumPasswordLength) {
    errors.password = `Use at least ${minimumPasswordLength} characters.`
  }
  if (!confirmation) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (confirmation !== password) {
    errors.confirmPassword = 'Your passwords must match.'
  }

  return errors
}
