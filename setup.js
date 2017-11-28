const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body><div class="memory-game"></div></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.map(prop => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value.toString();
	}
}

global.localStorage = new LocalStorageMock;

global.window = window;
global.localStorage = new LocalStorageMock;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};
copyProps(window, global);