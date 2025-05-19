import config from './ config.json';

class Config {
	private configState = config;
	constructor() {}

	getState() {
		return this.configState;
	}
}

export default Config;
