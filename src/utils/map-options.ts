import { mapStyle } from './map-style'

export const mapOptions: google.maps.MapOptions = {
  center: {
    lat: -3.785102,
    lng: -38.515231,
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
