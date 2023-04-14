
import http from "http"


class WallEnfluxdb {
	_token
	_influxUrl
	_influxUrlPort
	_influxUrlProtocol
	_data
	_timeUnit
	_organization
	_bucket

	constructor(token, url, organization, bucket, timeUnit) { 
		const urlProtocol = url.split('//')

		this._token 				= token
		this._data 					= []
		this._influxUrl 			= urlProtocol[1].split(':')[0]
		this._influxUrlPort 		= urlProtocol[1].split(':')[1]
		this._influxUrlProtocol 	= `${urlProtocol[0]}//`
		this._timeUnit 				= timeUnit
		this._organization			= organization
		this._bucket				= bucket
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

		return new Promise((resolve, reject)=>{
			const opts = {
				host: this._influxUrl,
			  	port: this._influxUrlPort,
			  	method: 'POST',
			  	path: `/api/v2/write?org=${this._organization}&bucket=${this._bucket}&precision=${this._timeUnit}`,
			  	headers: {
			  		Authorization   : `token ${this._token}`,
        			'Content-Type'    : "text/plain; charset=utf-8",
        			'Accept'          : "application/json"
			  	}
			};


			let resData = '';

			const req = http.request(opts, function(res){
			  //응답처리
			  	res.on('data', function(chunk){
			    	resData += chunk;
			  	});

			  	res.on('end', function(){
			  		resolve(resData)
			  	});
			});
			req.data = dataString;
			req.on('error', function(error){
			  	reject(error)
			})

			req.write(req.data);
			req.end();
		})
	}

	test(){
		console.log('eeeeeva ')
	}
}

export default WallEnfluxdb
