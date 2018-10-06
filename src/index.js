/* globals customElements HTMLElement getComputedStyle */

const template = document.createElement('template')
template.innerHTML = `
  <div><slot></slot></div>
  <style>
    :host {overflow: scroll;}
    div {display: inline-block;}
  </style>
`

customElements.define(
  'lipp-fitty',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      window.addEventListener('resize', () => {
        this.resize()
      })
    }

    resize() {
      cancelAnimationFrame(this.af)
      this.af = requestAnimationFrame(() => {
        const div = this.shadowRoot.querySelector('div')
        const currentFontSize = parseInt(getComputedStyle(div).fontSize, 10)
        div.style.fontSize = `${(this.clientWidth / div.scrollWidth) *
          currentFontSize}px`
      })
    }

    connectedCallback() {
      this.resize()
    }
  }
)
