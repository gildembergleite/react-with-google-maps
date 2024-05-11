import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

export class Map {
  private loader: Loader
  private markers: google.maps.marker.AdvancedMarkerElement[]
  private polylines: google.maps.Polyline[]
  private heatmapLayer: google.maps.visualization.HeatmapLayer | null

  public map: google.maps.Map | null

  constructor(
    public container: HTMLElement,
    public loaderOptions: LoaderOptions,
  ) {
    this.loader = new Loader(this.loaderOptions)
    this.markers = []
    this.polylines = []
    this.heatmapLayer = null
    this.map = null
  }

  async initMap(options: google.maps.MapOptions): Promise<void> {
    try {
      const { Map } = await this.loader.importLibrary('maps')
      if (!this.map) {
        this.map = new Map(this.container, options)
      }
    } catch (error) {
      console.error('Failed to load Google Maps API', error)
    }
  }

  async addHeatmapLayer(data: google.maps.LatLng[]) {
    const { HeatmapLayer } = await this.loader.importLibrary('visualization')

    this.heatmapLayer = new HeatmapLayer({
      maxIntensity: 3,
      dissipating: true,
      data,
      map: this.map,
    })
  }

  removeHeatmapLayer() {
    this.heatmapLayer?.setMap(null)
    this.heatmapLayer = null
  }

  addPolyline(path: google.maps.LatLng[]) {
    const polyline = new google.maps.Polyline({
      path,
      map: this.map,
      geodesic: true,
      strokeColor: '#149ECA',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    })

    this.polylines.push(polyline)
  }

  removePolyline() {
    this.polylines.forEach((polyline) => {
      polyline.setMap(null)
    })
  }

  async addMarker(
    position: google.maps.LatLng,
    infoWindow: google.maps.InfoWindow,
  ) {
    const { AdvancedMarkerElement } = await this.loader.importLibrary('marker')

    const marker = new AdvancedMarkerElement({
      position,
      map: this.map,
      gmpDraggable: true,
    })

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
      })
    })

    this.markers?.push(marker)
  }

  addMarkerClusterer() {
    const markerClusterer = new MarkerClusterer({
      markers: this.markers,
      map: this.map,
    })

    return markerClusterer
  }

  removeMarkers() {
    this.markers?.forEach((marker) => {
      marker.map = null
    })
    this.markers = []
  }
}
