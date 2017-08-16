export default (input, latInput, lngInput) => {
  if (input) {
    const dropdown = new google.maps.places.Autocomplete(input)
    dropdown.addListener('place_changed', () => {
      const { geometry: { location: { lat, lng } } } = dropdown.getPlace()
      [latInput, lngInput] = [lat(), lng()]
    })
    // do not submit the form in the autocomplete input!
    input.on('keydown', e => e.keyCode === 13 && e.preventDefault())
  }
}
