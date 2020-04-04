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

	WebServer.prototype.handleRequest = function(request, response) 
	{
		var requestUrl = request.url;
		if (requestUrl == "/favicon.ico")
		{
			// Ignore favicon requests.
		}
		else
		{
			this.database.connect();

			this.database.query
			(
				"show databases",
				this.handleRequest_QueryComplete.bind(this, response),
				this // thisForQuery
			);
		}
	};

	WebServer.prototype.handleRequest_QueryComplete = function(response, rowsRetrieved, fields)
	{
		var responseText = "";

		for (var r = 0; r < rowsRetrieved.length; r++)
		{
			var row = rowsRetrieved[r];

			for (var f = 0; f < fields.length; f++)
			{
				var fieldName = fields[f].name;
				var fieldValue = row[fieldName];
				
				responseText += fieldValue + " ";
			}

			responseText += "\n";
		}

		this.respondWithText(response, responseText);
	};

	WebServer.prototype.respondWithText = function(response, responseText)
	{
		response.writeHead
		(
			200, // "OK"
			{"Text-Type": "text/plain"}
		);

		console.log("Response: " + responseText);

		response.end(responseText);
	};
}

exports.WebServer = WebServer;
