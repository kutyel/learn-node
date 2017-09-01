import { $ } from './bling'

const {
  Map,
  Marker,
  LatLngBounds,
  InfoWindow,
  places: { Autocomplete },
} = google.maps

const options = { center: { lat: 43.2, lng: -79.8 }, zoom: 10 }

const loadPlaces = async (map, lat = 43.2, lng = -79.8) => {
  const res = await fetch(`/api/stores/near?lat=${lat}&lng=${lng}`)
  const places = await res.json()

  if (!places.length) {
    alert('No places found!')
    return
  }

  const bounds = new LatLngBounds()
  const infoWindow = new InfoWindow()

  const markers = places.map(p => {
    const [lng, lat] = p.location.coordinates
    const position = { lat, lng }
    bounds.extend(position)
    const marker = new Marker({ map, position })
    marker.place = p
    return marker
  })

  markers.forEach(m =>
    m.addListener('click', function() {
      const html = `
        <div class="popup">
          <a href="/store/${this.place.slug}">
            <img src="/uploads/${this.place.photo || 'store.png'}" alt="${this
        .place.name}" />
            <p>${this.place.name} - ${this.place.location.address}</p>
          </a>
        </div>
      `
      infoWindow.setContent(html)
      infoWindow.open(map, this)
    })
  )

  map.setCenter(bounds.getCenter())
  map.fitBounds(bounds)
}

const makeMap = mapdiv => {
  if (mapdiv) {
    const map = new Map(mapdiv, options)
    loadPlaces(map)
    const input = $('[name="geolocate"]')
    const autocomplete = new Autocomplete(input)
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      loadPlaces(
        map,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      )
    })
  }
}

export default makeMap
