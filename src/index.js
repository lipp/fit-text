/* globals customElements HTMLElement getComputedStyle */
const templateHTML = `
  <div id='wrap'>
  <div id='x'>
  <slot id='content'>
  </slot>
  </div>
  </div>
`
const style = `
:host {
  display: flex;
}
#wrap {
  flex-grow: 1;
  overflow: scroll;
}
#x {
display: inline-block;
}
`

const template = document.createElement('template')
template.innerHTML = `
  ${templateHTML}
  <style>${style}</style>
`

customElements.define(
  'lipp-fitty',
  class extends HTMLElement {
      el (sel) {
        return this.shadowRoot.querySelector(sel)
      }
    constructor () {
      super()
      this.attachShadow({mode: 'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      window.addEventListener('resize', () => {
        this.resize()
      })
    }

    resize () {
      cancelAnimationFrame(this.af)
      this.af = requestAnimationFrame(() => {
      const wrap = this.el('#wrap')
      const x = this.el('#x')
      const currentFontSize = parseInt(getComputedStyle(x).fontSize, 10)
        //  console.log(currentFontSize, wrap.clientWidth, x.scrollWidth , currentFontSize)
      x.style.fontSize = `${wrap.clientWidth / x.scrollWidth * currentFontSize}px`
      })
    }

    connectedCallback () {
      this.resize()
    }
  }
)
