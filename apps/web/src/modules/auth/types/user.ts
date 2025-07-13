export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'seller' | 'admin' | 'godlike'
}
