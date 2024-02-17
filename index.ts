import fast from './fast'
import huawei from './huawei'
import fs from 'fs'
const br = `
`

const main = () => {
    const fastMeasure = async () => {
        const speed = await fast()
        const unixTime = Math.floor(new Date().getTime() / 1000)
        fs.appendFileSync('speed.txt', `${unixTime},${speed}${br}`)
    }
    const signalMeasure = async () => {
        const signal = await huawei()
        const unixTime = Math.floor(new Date().getTime() / 1000)
        fs.appendFileSync('signal.txt', `${unixTime},${signal}${br}`)
    }
    fastMeasure()
    setInterval(() => fastMeasure(), 60000)
    setTimeout(() => {
        signalMeasure()
        setInterval(() => signalMeasure(), 10000)
    }
    , 8200)
}
main()