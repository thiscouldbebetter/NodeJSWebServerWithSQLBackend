var http = require("http");
var inspect = require("util").inspect;
var mysql = require("mysql");

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

// classes

function Database(host, username, password, databaseName)
{
	this.host = host;
	this.username = username;
	this.password = password;
	this.databaseName = databaseName;
}
{
	Database.prototype.connect = function()
	{
		this.connection = mysql.createConnection
		({
			host     : this.host,
			user     : this.username,
			password : this.password,
			database : this.databaseName
		});
	}

	Database.prototype.query = function(queryText, callback, thisForCallback)
	{
		this.connection.connect();

		this.connection.query
		(
			queryText,
			this.handleEventQueryResult.bind(this, callback, thisForCallback)
		);

		this.connection.end();
	}

	// events

	Database.prototype.handleEventQueryResult = function
	(
		callback, thisForCallback, error, rowsRetrieved, fields
	) 
	{
		if (error) throw error;

		callback.call(thisForCallback, rowsRetrieved, fields);
	}
}

function WebServer(hostAddress, portNumber, database)
{
	this.hostAddress = hostAddress;
	this.portNumber = portNumber;
	this.database = database;

	this.server = http.createServer
	(
		this.handleRequest.bind(this)
	);
}
{
	WebServer.prototype.start = function()
	{
		this.server.listen(this.portNumber, this.hostAddress);

		console.log
		(
			"Server running at http://" 
			+ this.hostAddress + ":" 
			+ this.portNumber + "/"
		);
	}

	// events

	WebServer.prototype.handleRequest = function(webRequest, webResult) 
	{
		if (webRequest.url == "/favicon.ico")
		{
			// Ignore favicon requests.
			return;
		}

		this.database.connect();

		this.database.query
		(
			"show databases",
			this.handleRequest_QueryComplete.bind(this, webResult),
			this // thisForQuery
		);
	}

	WebServer.prototype.handleRequest_QueryComplete = function(webResult, rowsRetrieved, fields)
	{
		webResult.writeHead
		(
			200, // OK
			{"Content-Type": "text/plain"}
		);

		var resultContent = "";

		for (var r = 0; r < rowsRetrieved.length; r++)
		{
			var row = rowsRetrieved[r];

			for (var f = 0; f < fields.length; f++)
			{
				var fieldName = fields[f].name;
				var fieldValue = row[fieldName];
				
				resultContent += fieldValue + " ";
			}

			resultContent += "\n";
		}

		console.log("Result: " + resultContent);
	
		webResult.end(resultContent);
	}
}

// run

main();
