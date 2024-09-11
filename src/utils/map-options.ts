import { mapStyle } from './map-style'

export const mapOptions: google.maps.MapOptions = {
  center: {
    lat: -3.812954,
    lng: -38.527563,
  },
  zoom: 13,
  mapTypeId: 'roadmap',
  zoomControl: true,
  streetViewControl: false,
  fullscreenControlOptions: {
    position: 6,
  },
  mapTypeControl: false,
  mapId: 'react-with-google-maps',
  styles: mapStyle,
}
