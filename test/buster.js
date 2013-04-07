var config = module.exports;

config["FruitMachineTests"] = {
	rootPath: '../',
	environment: "browser",
	sources: [
		'build/event.js'
	],
	tests: [
		'test/tests/*.js'
	]
};
