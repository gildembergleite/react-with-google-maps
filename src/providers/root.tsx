'use client'

import { MapProvider } from '@/context/map-context'
import { ReactNode } from 'react'

export function RootProvider({ children }: { children: ReactNode }) {
  return <MapProvider>{children}</MapProvider>
}
