'use client'

import React from 'react'
import { NextPage } from 'next'

export const withAuthorization = (Component: NextPage) => {
  const Wrapper = (props: any) => {
    const permissions = ['admin']

    if (!permissions) {
      return <p>Loading...</p> // Global loading durumu
    }

    const allows = Component.allows

    if (!allows) return <Component {...props} />

    const isAllowed = Array.isArray(allows)
      ? allows.some(allow => permissions.includes(allow))
      : permissions.includes(allows)

    // if (!isAllowed) return <Unauthorized />

    return <Component {...props} />
  }

  return Wrapper
}
