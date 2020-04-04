var Database = require("./Database.js").Database;
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
		database
	);

	webServer.start();
}

// run

main();
