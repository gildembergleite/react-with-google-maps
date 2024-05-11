import { AsideBar } from '@/components/aside-bar'
import { Map } from '@/components/map'

export default function HomePage() {
  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <AsideBar />
      <Map />
    </main>
  )
}
