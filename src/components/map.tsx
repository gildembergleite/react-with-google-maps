'use client'

import { Map as EntityMap } from '@/entities/map'
import { useMap } from '@/hook/use-map'
import { mapOptions } from '@/utils/map-options'
import { useEffect, useRef } from 'react'

export function Map({
  coordinates,
}: {
  coordinates: Array<{ lat: number; lng: number }>
}) {
  const { onMapReady, setCoordinatesData } = useMap()
  const mapRef = useRef<HTMLDivElement>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    setCoordinatesData([...coordinates])
  }, [coordinates])

  useEffect(() => {
    if (!mapRef.current || !apiKey) return

    const map = new EntityMap(mapRef.current, {
      apiKey,
      version: 'weekly',
    })

    map.initMap(mapOptions).then(() => onMapReady(map))
  }, [])

  return <section className="w-full h-full" ref={mapRef} />
}
