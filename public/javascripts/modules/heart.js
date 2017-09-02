import { $ } from './bling'

export default async function(e) {
  e.preventDefault()
  try {
    const res = await fetch(this.action, { method: 'POST' })
    const data = await res.json()
    const isHearted = this.heart.classList.toggle('heart__button--hearted')
    $('.heart-count').textContent = data.hearts.length
    if (isHearted) {
      this.heart.classList.add('heart__button--float')
      setTimeout(
        () => this.heart.classList.remove('heart__button--float'),
        2500
      )
    }
  } catch (err) {
    console.error(err)
  }
}
