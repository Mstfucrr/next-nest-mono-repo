import { NextComponentType, NextPageContext } from 'next/types'

type AllowsType = string | string[]

// `NextPage` için `allows` özelliği ekleniyor
declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    allows?: AllowsType
  }
}
