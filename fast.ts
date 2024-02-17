import puppeteer from 'puppeteer'
const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec))
export default async () => {
    try {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        // Navigate the page to a URL
        await page.goto('https://fast.com/')

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 })
        await sleep(5000)
        // Locate the speed
        const textSelector = await page.waitForSelector('#speed-value')
        const speed = await textSelector?.evaluate(el => el.textContent)

        // Print the speed
        console.log(speed, 'Mbps')
        if (typeof speed !== 'string') return -1
        await browser.close()
        return parseFloat(speed)
    } catch {
        return -1
    }

}