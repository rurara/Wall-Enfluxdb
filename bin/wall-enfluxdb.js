import url from 'url'
// import fetch from 'fetch'
// import request from 'request    '


class Wallenfluxdb {
	_token
	_influxUrl
	_data
	_timeUnit
	_fetchOptions

	constructor(token, url, timeUnit) { 
		this._token 		= token
		this._data 			= []
		this._influxUrl 	= url
		this._timeUnit 		= timeUnit

		this._fetchOptions = {
		    headers: {
	            Authorization   : `token ${this._token}`,
	            'Content-Type'    : "text/plain; charset=utf-8",
    	        'Accept'          : "application/json"
		    },
		    
		    method: 'POST'
		}
	}

	get token(){
		return this._token
	}


	writeData(measurement, tag, field, time){
	
		const makeData = (object)=>{
			let tempString
			let isFirst = true
			for (let key of Object.keys(object)) {
				tag = isFirst 
					? `${key}=${object.key}`
					: `${tag},${key}=${tag.key}`			
			}

			return tempString
		}

		const tagString = makeData(tag)
		const fieldString = makeData(field)

		this._data.push = `${measurement},${tagString} ${fieldString} ${time}`
	}
	
	commitData(){
		let dataString = ""

	    for (const inData of this._data){
        	dataString = `${dataString}
				${inData}`
    	}

		this._fetchOptions['data'] = dataString


		console.log(url.parse('https://google.com'))

		// fetch(_influxUrl, _fetchOptions)
		// .then((data) => {
		// 	console.log(data)
		// 	return data.json()
		// })
		// .then((res) => {
		// 	console.log(res)
		// 	this._data = []
		// })
	}
	test(){
		console.log('eeeeeva ')
	}
}

export default Wallenfluxdb
