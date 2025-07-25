/**
 * AuthService tarafından emit edilecek kullanıcı oluşturma yükü
 */
export interface CreateUserPayload {
  id: string
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
