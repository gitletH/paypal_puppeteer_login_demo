const puppeteer = require('puppeteer')


const email = "";
const password = "";

const login_png = 'paypal_login_page.png';
const loading_png = 'paypal_loading.png';
const payment_png = 'paypal_payment.png';
(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4JR04850Y9063343G') // You might want to change this if this is invalid when you test it
  await page.screenshot({ path: login_png })
  await page.type('#email', email)
  await page.type('#password', password)
  await page.click('[name="btnLogin"]')
  await page.waitForNavigation()
  await page.screenshot({ path: loading_png })
  await page.waitForNavigation()
  await page.screenshot({ path: payment_png })
  browser.close()
  console.log('See screenshots: ' + login_png + "," + loading_png + "," + payment_png)
})()