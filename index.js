/* globals customElements HTMLElement getComputedStyle */

const template = `
  <div><slot></slot></div>
  <style>
    div {display: inline-block; white-space: nowrap;}
  </style>
`

customElements.define(
  'fit-text',
  class extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = template
      this.div = shadowRoot.querySelector('div')
      this.resize = this.resize.bind(this)
      window.addEventListener('resize', this.resize)
    }

    disconnectedCallback() {
      window.removeEventListener('resize', this.resize)
    }

    resize() {
      cancelAnimationFrame(this.af)
      this.af = requestAnimationFrame(() => {
        const currentFontSize = parseInt(
          getComputedStyle(this.div).fontSize,
          10
        )
        this.div.style.fontSize = `${(this.clientWidth / this.div.scrollWidth) *
          currentFontSize}px`
      })
    }

    connectedCallback() {
      this.resize()
    }
  }
)
