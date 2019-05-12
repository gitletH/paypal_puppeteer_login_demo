const puppeteer = require('puppeteer')
const assert = require('assert')


const email = "";
const password = "";
// You might want to change this if this is invalid when you test it
const login_url = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4JR04850Y9063343G"
assert.notEqual(email, "")
assert.notEqual(password, "");

const login_png = 'paypal_login_page.png';
const loading_png = 'paypal_loading.png';
const payment_png = 'paypal_payment.png';
(async () => {
  console.log("Launching headless chrome")
  const browser = await puppeteer.launch({headless: true})
  console.log("Opening a new page")
  const page = await browser.newPage()
  console.log("Redirect to " + login_url)
  await page.goto(login_url) // You might want to change this if this is invalid when you test it
  await page.screenshot({ path: login_png })
  await page.type('#email', email)
  await page.type('#password', password)
  await page.click('[name="btnLogin"]')
  console.log("Logging in as " + email)
  await page.waitForNavigation()
  await page.screenshot({ path: loading_png })
  console.log("Logged in ")
  await page.waitForNavigation()
  await page.screenshot({ path: payment_png })
  browser.close()
  console.log('See screenshots: ' + login_png + "," + loading_png + "," + payment_png)
})()