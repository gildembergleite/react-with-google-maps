import { createContext, ReactNode, useState } from 'react'

import { Map } from '@/entities/map'
import { contentString } from '@/mock/content-string'

interface MapContextType {
  onMapReady: (instance: Map) => void
  setCoordinatesData: (coordinates: Array<{ lat: number; lng: number }>) => void
  addHeatmap: () => void
  removeHeatmap: () => void
  addMarkers: () => void
  removeMarkers: () => void
  addPolyline: () => void
  removePolyline: () => void
}

export const MapContext = createContext<MapContextType | undefined>(undefined)

export function MapProvider({ children }: { children: ReactNode }) {
  const [coordinates, setCoordinates] = useState<
    Array<{ lat: number; lng: number }>
  >([])
  const [entityMap, setEntityMap] = useState<Map | null>(null)

  function setCoordinatesData(
    coordinates: Array<{ lat: number; lng: number }>,
  ) {
    setCoordinates(coordinates)
  }

  function addPolyline() {
    if (entityMap) {
      entityMap.removePolyline()

      const path: google.maps.LatLng[] = []

      coordinates.forEach((coord) => {
        const latLng = new google.maps.LatLng(coord.lat, coord.lng)

        path.push(latLng)
      })

      entityMap.addPolyline(path)
    }
  }

  function removePolyline() {
    if (entityMap) {
      entityMap.removePolyline()
    }
  }

  function addMarkers() {
    if (entityMap) {
      removeMarkers()
      const lastCoord = new google.maps.LatLng(
        coordinates[0].lat,
        coordinates[0].lng,
      )

      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      })

      entityMap.addMarker(lastCoord, infoWindow)

      entityMap.addMarkerClusterer()
    }
  }

  function removeMarkers() {
    if (entityMap) {
      entityMap.removeMarkers()
    }
  }

  function addHeatmap() {
    if (entityMap && coordinates) {
      entityMap.removeHeatmapLayer()

      const heatmapData = coordinates.flatMap(
        (coord) => new google.maps.LatLng(coord.lat, coord.lng),
      )

      entityMap.addHeatmapLayer(heatmapData)
    }
  }

  function removeHeatmap() {
    if (entityMap) {
      entityMap.removeHeatmapLayer()
    }
  }

  function onMapReady(instance: Map) {
    setEntityMap(instance)
  }

  const value = {
    onMapReady,
    setCoordinatesData,
    addHeatmap,
    removeHeatmap,
    addPolyline,
    removePolyline,
    addMarkers,
    removeMarkers,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
