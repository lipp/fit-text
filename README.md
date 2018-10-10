# fit-text

A very basic and lightweight vanilla fit-text web component.

Adjusts the font-size to fit the parent container width.

## Highlights

 - vanilla web component / custom element
 - less than 600 byte (minified + gzip)
 - no dependencies
 - no additional css / js required
 - supports custom fonts

The implementation relies on custom elements and shadow dom parts of the web component specs
([check support](https://developer.mozilla.org/en-US/docs/Web/Web_Components#Browser_support)).
For using custom fonts, the browser must support the `FontFaceSet` API (`onloadingdone` event,
[check support](https://developer.mozilla.org/kab/docs/Web/API/FontFaceSet#Browser_compatibility))

Thus, not every major Browser is supported yet.

# Demo

[![Demo on Codepen](./demo.gif)](https://codepen.io/lipp/pen/YJGvEe?editors=1100#0)

Play with this demo on [codepen.io](https://codepen.io/lipp/pen/YJGvEe?editors=1100#0).

# Usage

```html
<script src="https://unpkg.com/fit-text-webcomponent"></script>

<div style="width: 50vw;">
  <fix-text>This fits to 50vw</fit-text>
</div>
```

Also checkout the [examples directory](./examples).

