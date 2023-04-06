import Wallenfluxdb from './../bin/wall-enfluxdb.js'

const WallE = new Wallenfluxdb("tokenccc")

console.log(WallE.token)
WallE.test()