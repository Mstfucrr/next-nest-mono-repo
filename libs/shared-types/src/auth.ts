/**
 * AuthService'den dönen kayıt yanıt modeli
 */
export interface AuthResult {
  message: string
  auth: Omit<AuthEntity, 'password'>
}

/**
 * Auth domain’inin entity tanımı
 */
export interface AuthEntity {
  id: string
  email: string
  password: string
  fullName: string
}

/**
 * AuthService’e iletilecek kayıt verisi
 */
export interface RegisterPayload {
  email: string
  password: string
  fullName: string
}

/**
 * AuthService’e iletilecek login verisi
 */
export interface LoginPayload {
  email: string
  password: string
}
