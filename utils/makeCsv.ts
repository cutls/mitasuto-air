import fs from 'fs'
const br = `
`

const fullTxt = fs.readFileSync('gps.csv').toString()
const gpsLines = fullTxt.split(br).map((l: string) => l.split(','))
const reversedGpsLines = gpsLines.reverse()
const findPosition = (time: string) => {
    const gps = reversedGpsLines.find((g: string[]) => new Date(g[0]).getTime() < parseInt(time, 10) * 1000)
    if (!gps) return
    return [gps[1], gps[2]]
}
const main = () => {
    const signalTxt = fs.readFileSync('signal.txt').toString()
    const signalLines = signalTxt.split(br).map((l: string) => l.split(','))
    const speedTxt = fs.readFileSync('speed.txt').toString()
    const speedLines = speedTxt.split(br).map((l: string) => l.split(','))
    const signalArr = []
    for (const s of signalLines) {
        const ps = findPosition(s[0])
        if (!ps) continue
        if (s[1] === '-1') continue
        signalArr.push([...ps, parseInt(s[1], 10)])
    }
    for (let i = signalArr.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const tmp: any = signalArr[i]
        signalArr[i] = signalArr[r]
        signalArr[r] = tmp
    }
    fs.writeFileSync('leaflet/signal.data.js', `const signals = ${JSON.stringify(signalArr)}`)

    const speedArr = []
    for (const s of speedLines) {
        const ps = findPosition(s[0])
        if (!ps) continue
        speedArr.push([...ps, parseFloat(s[1])])
    }
    for (let i = speedArr.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const tmp: any = speedArr[i]
        speedArr[i] = speedArr[r]
        speedArr[r] = tmp
    }
    fs.writeFileSync('leaflet/speed.data.js', `const speeds = ${JSON.stringify(speedArr)}`)

}
main()