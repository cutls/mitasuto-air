import puppeteer from 'puppeteer'
export default async () => {
    try {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        // Navigate the page to a URL
        await page.goto('http://192.168.1.1/')

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 })
        // Locate the speed
        const textSelector = await page.waitForSelector('#status_img div')
        const className = await textSelector?.evaluate(el => el.className)
        const m = className?.match(/^icon_signal_0([0-9])/)
        if (!m || !m[1]) return
        const signalStr = m[1]
        const signal = parseInt(signalStr)
        // Print the signal
        console.log('Signal', signal)
        await browser.close()
        return signal
    } catch {
        return -1
    }
}