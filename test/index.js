import Wallenfluxdb from './../bin/wall-enfluxdb.js'

const WallE = new Wallenfluxdb(process.env.INFLUX_TOKEN, process.env.INFLUX_URL, "ms")

WallE.writeData("walle", {tag:"walle"},{field:10}, new Date().getTime)
WallE.writeData("eva", {tag:"eva"},{field:20}, new Date().getTime)
WallE.commitData()



console.log(WallE.token)
WallE.test()