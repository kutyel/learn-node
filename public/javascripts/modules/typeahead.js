import purify from 'dompurify'

const resultsHTML = stores =>
  stores
    .map(
      ({ slug, name }) => `
  <a href="/store/${slug}" class="search__result">
    <strong>${name}</strong>
  </a>
  `
    )
    .join('')

export default search => {
  if (search) {
    const input = search.querySelector('input[name="search"]')
    const results = search.querySelector('.search__results')

    input.on('input', async function() {
      if (!this.value) {
        results.style.display = 'none'
        return
      }
      results.style.display = 'block'
      results.innerHTML = ''
      try {
        const res = await fetch(`/api/search?q=${this.value}`)
        const data = await res.json()
        results.innerHTML = purify.sanitize(
          data.length
            ? resultsHTML(data)
            : `<div class="search__result">No results for <mark>${this
                .value}</mark> found!</div>`
        )
      } catch (err) {
        console.error(err)
      }
    })

    // handle keyboard inputs
    input.on('keyup', ({ keyCode }) => {
      if ([38, 40, 13].includes(keyCode)) {
        const active = 'search__result--active'
        const current = search.querySelector(`.${active}`)
        const items = search.querySelectorAll('.search__result')
        let next
        if (keyCode === 40 && current) {
          next = current.nextElementSibling || items[0]
        } else if (keyCode === 40) {
          next = items[0]
        } else if (keyCode === 38 && current) {
          next = current.previousElementSibling || items[items.length - 1]
        } else if (keyCode === 38) {
          next = items[items.length - 1]
        } else if (keyCode === 13 && current) {
          window.location = current.href
          return
        }
        current && current.classList.remove(active)
        next.classList.add(active)
      }
    })
  }
}
