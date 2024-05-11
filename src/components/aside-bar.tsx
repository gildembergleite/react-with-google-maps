'use client'

import { useMap } from '@/hook/use-map'
import { PlusIcon, XIcon } from 'lucide-react'
import { Button } from './ui/button'

export function AsideBar() {
  const map = useMap()

  return (
    <aside className="flex flex-col w-full h-full max-w-sm justify-start items-center px-6 py-12">
      <h1 className="text-3xl font-bold">React + Google Map</h1>
      <p className="text-lg font-light">This is the map example.</p>

      <div className="w-full mt-12 space-y-4">
        <div className="flex w-full gap-2">
          <Button className="w-full">Polyline</Button>
          <Button onClick={map.addPolyline} variant={'secondary'}>
            <PlusIcon />
          </Button>
          <Button onClick={map.removePolyline} variant={'destructive'}>
            <XIcon />
          </Button>
        </div>
        <div className="flex w-full gap-2">
          <Button className="w-full">Marker</Button>
          <Button onClick={map.addMarkers} variant={'secondary'}>
            <PlusIcon />
          </Button>
          <Button onClick={map.removeMarkers} variant={'destructive'}>
            <XIcon />
          </Button>
        </div>
        <div className="flex w-full gap-2">
          <Button className="w-full">Heatmap</Button>
          <Button onClick={map.addHeatmap} variant={'secondary'}>
            <PlusIcon />
          </Button>
          <Button onClick={map.removeHeatmap} variant={'destructive'}>
            <XIcon />
          </Button>
        </div>
      </div>
    </aside>
  )
}
