import fetch from 'node-fetch';

//todo::http로 바꾸고 fetch 삭제하기
// import http from "http"

class Wallenfluxdb {
	_token
	_influxUrl
	_data
	_timeUnit
	_fetchOptions
	_organization
	_bucket

	constructor(token, url, organization, bucket, timeUnit) { 
		this._token 		= token
		this._data 			= []
		this._influxUrl 	= url
		this._timeUnit 		= timeUnit
		this._organization	= organization
		this._bucket		= bucket

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
				tempString = isFirst 
					? `${key}=${object[key]}`
					: `${tempString},${key}=${object[key]}`	
				isFirst = false
			}

			return tempString
		}

		const tagString = makeData(tag)
		const fieldString = makeData(field)

		this._data.push(`${measurement},${tagString} ${fieldString} ${time}`)
	}
	
	commitData(){
		let dataString = ""

	    for (const inData of this._data){
        	dataString = `${dataString}
				${inData}`
    	}

		const writeUrl = `${this._influxUrl}/api/v2/write?org=${this._organization}&bucket=${this._bucket}&precision=${this._timeUnit}`
		this._fetchOptions.body = dataString

		
		return new Promise((resolve, reject)=>{
			fetch(writeUrl, this._fetchOptions)
			.then((response) => {
				resolve(response)
				this._data=[]
			}).catch((error) =>{
				reject(error)
			})
		})
	}

	test(){
		console.log('eeeeeva ')
	}
}

export default Wallenfluxdb
