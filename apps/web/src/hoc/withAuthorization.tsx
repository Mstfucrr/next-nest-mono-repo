'use client'

import { useAuth } from '@/modules/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Role = 'user' | 'seller' | 'admin' | 'godlike'

interface WithAuthorizationOptions {
  requiredRoles?: Role[]
  redirectTo?: string
}

export function withAuthorization<P extends object>(
  Component: React.ComponentType<P>,
  options?: WithAuthorizationOptions
): React.FC<P> {
  const { requiredRoles = [], redirectTo = '/login' } = options || {}

  const AuthorizedComponent: React.FC<P> = props => {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && (!user || (requiredRoles.length && !requiredRoles.includes(user.role)))) {
        router.replace(redirectTo)
      }
    }, [isLoading, user, requiredRoles, router, redirectTo])

    if (isLoading || !user) return <div className='p-4'>Yükleniyor...</div>
    if (requiredRoles.length && !requiredRoles.includes(user.role)) return null

    return <Component {...props} />
  }

  return AuthorizedComponent
}
