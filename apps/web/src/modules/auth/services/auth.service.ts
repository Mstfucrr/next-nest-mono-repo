import { User } from '../types/user'

export const authService = {
  async me(): Promise<User> {
    const res = await fetch('/api/me', {
      credentials: 'include' // cookie'li istek için
    })

    if (!res.ok) {
      throw new Error('Kullanıcı bilgisi alınamadı')
    }

    return res.json()
  }
}
