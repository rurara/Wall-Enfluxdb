class Wallenfluxdb {
	_token
	constructor(token) {
		this._token=token
	}

	get token(){
		return this._token
	}

	test(){
		console.log('eeeeeva ')
	}
}

export default Wallenfluxdb