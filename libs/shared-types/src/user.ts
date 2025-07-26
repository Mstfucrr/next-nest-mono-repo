/**
 * UserService’in veritabanından döneceği User modeli
 */
export interface UserResult {
  message: string
  user: UserEntity
}

/**
 * AuthService tarafından emit edilecek kullanıcı oluşturma yükü
 */
export interface CreateUserPayload {
  email: string
  fullName: string
}

/**
 * UserService’in veritabanından döneceği User modeli
 */
export interface UserEntity {
  id: string
  email: string
  fullName: string
  createdAt: Date
  updatedAt: Date
}

/**
 * UserService’in veritabanından döneceği User modeli
 */
export interface UpdateUserPayload {
  email?: string
  fullName?: string
}
