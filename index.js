/* globals customElements HTMLElement getComputedStyle */

customElements.define(
  'lipp-fitty',
  class extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = `
  <div><slot></slot></div>
  <style>
    div {display: inline-block;}
  </style>
`
      this.div = shadowRoot.querySelector('div')
      window.addEventListener('resize', () => {
        this.resize()
      })
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
