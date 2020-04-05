var Database = require("./Database.js").Database;
var Page = require("./Page.js").Page;
var WebServer = require("./WebServer.js").WebServer;

// main

function main()
{
	var database = new Database
	(
		"127.0.0.1", // host
		"root", // username
		"Password42", // password
		"mysql" // databaseName
	);

	var webServer = new WebServer
	(
		"127.0.0.1", // hostAddress
		1337, // portNumber
		database,
		[
			new Page("/Pages/Test.page")
		]
	);

	webServer.start();
}

// run

main();
