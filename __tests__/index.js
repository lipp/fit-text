const HttpServer = require('http-server').HttpServer
const puppeteer = require('puppeteer')

const server = new HttpServer()
const port = 8030

const width = 500
const height = 1000

beforeAll(done => {
  server.listen(port, '0.0.0.0', done)
})

afterAll(() => {
  server.close()
})

it('should calculate and set style.fontSize of #inner', async () => {
  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [`--window-size=${width},${height}`]
    })
    const page = await browser.newPage()
    page.setViewport({ width, height })

    await page.goto(`http://localhost:${port}/examples/minimal.html`)
    await page.waitForSelector('fit-text')
    const fontSize = await page.$eval(
      'fit-text',
      e => e.shadowRoot.querySelector('#inner').style.fontSize
    )
    expect(parseInt(fontSize)).toEqual(29)
  } finally {
    console.log(browser)
    browser.close()
  }
})
