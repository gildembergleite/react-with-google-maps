import { MapContext } from '@/context/map-context'
import { useContext } from 'react'

export function useMap() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within an MapProvider')
  }
  return context
}
