var http = require("http");

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
	};

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
	};

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
	};
}

exports.WebServer = WebServer;
