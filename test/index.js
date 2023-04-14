import dotenv from "dotenv";
dotenv.config();
import Wallenfluxdb from '../lib/Wall-Enfluxdb.js'

const WallE = new Wallenfluxdb(
	process.env.INFLUX_TOKEN,
	process.env.INFLUX_URL,
	process.env.INFLUX_ORG,
	process.env.INFLUX_BUCKET,
	"ms")

WallE.writeData("walle", {tag:"walle", tag2:"yaho"},{field:16}, new Date().getTime())
WallE.writeData("eva", {tag:"eva", tag2:"pizza"},{field:28}, new Date().getTime())

WallE.commitData().then((response)=>{
	console.log(`response [${response}]`)
}).catch((error)=>{
	console.log(`error [${error}]`)
})

WallE.test()