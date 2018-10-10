/* globals customElements HTMLElement getComputedStyle addEventListener removeEventListener */

const template = `
  <div id="outer"><div id="inner"><slot></slot></div></div>
  <style>
    #inner {display: inline-block; white-space: nowrap;}
  </style>
`

customElements.define(
  'fit-text',
  class extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = template
      this.inner = shadowRoot.querySelector('#inner')
      this.outer = shadowRoot.querySelector('#outer')
      this.resize = this.resize.bind(this)
      addEventListener('resize', this.resize)
      if (document.fonts) {
        document.fonts.addEventListener('loadingdone', this.resize)
      }
    }

    disconnectedCallback() {
      removeEventListener('resize', this.resize)
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', this.resize)
      }
    }

    resize() {
      cancelAnimationFrame(this.af)
      this.af = requestAnimationFrame(() => {
        const currentFontSize = parseInt(
          getComputedStyle(this.inner).fontSize,
          10
        )
        this.inner.style.fontSize = `${(this.outer.clientWidth /
          this.inner.scrollWidth) *
          currentFontSize}px`
      })
    }

    connectedCallback() {
      this.resize()
    }
  }
)
