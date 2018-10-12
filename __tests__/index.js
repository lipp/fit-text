const HttpServer = require('http-server').HttpServer
const puppeteer = require('puppeteer')

const server = new HttpServer()
const port = 8030

const minimalExample = `http://localhost:${port}/examples/minimal.html`

const width = 500
const height = 1000

let browser

beforeAll(async () => {
  const results = await Promise.all([
    new Promise(resolve => server.listen(port, '0.0.0.0', resolve)),
    puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
  ])
  browser = results[1]
})

afterAll(() => {
  server.close()
  browser.close()
})

const getFontSize = page =>
  page.$eval('fit-text', e =>
    parseInt(e.shadowRoot.querySelector('#inner').style.fontSize)
  )

it('should calculate and set style.fontSize of #inner', async () => {
  const page = await browser.newPage()
  page.setViewport({ width, height })
  await page.goto(minimalExample)
  await page.waitFor(200)
  const fontSize = await getFontSize(page)
  expect(fontSize).toEqual(29)
})

it('should calculate and set style.fontSize on resize', async () => {
  const page = await browser.newPage()
  page.setViewport({ width, height })
  await page.goto(minimalExample)
  await page.waitFor(200)
  const fontSize = await getFontSize(page)
  expect(fontSize).toEqual(29)
  page.setViewport({ width: width / 2, height })
  await page.waitFor(200)
  const fontSizeResized = await getFontSize(page)
  expect(fontSizeResized).toEqual(14)
})
