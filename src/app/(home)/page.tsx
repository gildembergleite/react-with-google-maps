import { AsideBar } from '@/components/aside-bar'
import { Map } from '@/components/map'

export default async function HomePage() {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    '/rastreamento/coordinates?page_size=200'
  const response = await fetch(url, {
    cache: 'no-cache',
  })
  const { data: coordinates } = await response.json()

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <AsideBar />
      <Map coordinates={coordinates} />
    </main>
  )
}
