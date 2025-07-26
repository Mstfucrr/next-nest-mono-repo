'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'

export const useAuth = () => {
  const { user, setUser } = useAuthStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    enabled: !user // sadece user yoksa fetch et
  })

  useEffect(() => {
    if (data) setUser(data)
  }, [data, setUser])

  return {
    user,
    isLoading,
    error,
    refetch
  }
}
