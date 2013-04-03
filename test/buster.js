var config = module.exports;

config["FruitMachineTests"] = {
	rootPath: '../',
	environment: "browser",
	sources: [
		'lib/event.js'
	],
	tests: [
		'test/tests/*.js'
	]
};
