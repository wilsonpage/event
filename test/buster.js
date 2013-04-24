var config = module.exports;

config["EventTests"] = {
	rootPath: '../',
	environment: "browser",
	sources: [
		'build/event.js'
	],
	tests: [
		'test/tests/*.js'
	]
};
