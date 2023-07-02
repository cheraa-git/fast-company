export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
      return 'The password or email is incorrect'
    case 'EMAIL_EXISTS':
      return 'A user with this email already exists'
    default:
      return 'Too many attempts. Let`s try again later'
  }
}
