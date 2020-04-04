var fs = require("fs");
var http = require("http");

function WebServer(hostAddress, portNumber, database)
{
	this.hostAddress = hostAddress;
	this.portNumber = portNumber;
	this.database = database;

	this.statusCodes = new StatusCode_Instances();

	this.server = http.createServer
	(
		this.handleRequest.bind(this)
	);
}
{
	// Inner classes.

	function StatusCode_Instances()
	{
		this.OK = 200;
		this.NotFound = 404;
	}

	// Methods.

	WebServer.prototype.start = function()
	{
		this.server.listen(this.portNumber, this.hostAddress);

		this.log
		(
			"Server running at http://" 
			+ this.hostAddress + ":" 
			+ this.portNumber + "/"
		);
	};

	// events

	WebServer.prototype.handleRequest = function(request, response) 
	{
		var webServer = this;

		var requestUrl = request.url;
		this.log("Request: " + requestUrl);

		if (requestUrl == "/favicon.ico")
		{
			// Ignore favicon requests.
		}
		else if (requestUrl == "/databases")
		{
			this.database.connect();

			this.database.query
			(
				"show databases",
				this.handleRequest_QueryComplete.bind(this, response),
				this // thisForQuery
			);
		}
		else if ( requestUrl.startsWith("/Pages/") )
		{
			var pageFilePath = "." + requestUrl;

			var pageAsString = fs.readFile
			(
				pageFilePath,
				"utf8",
				function(err, data)
				{
					if (err)
					{
						webServer.log("Error: " + err);
						webServer.respondWithErrorNotFound(response);
					}
					else
					{
						webServer.respondWithText(response, data);
					}
				}
			);
		}
		else
		{
			this.respondWithErrorNotFound(response);
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

	WebServer.prototype.respondWithErrorNotFound = function(response)
	{
		this.respondWithStatusCodeAndText(response, this.statusCodes.NotFound, "Not found!");
	};

	WebServer.prototype.respondWithStatusCodeAndText = function(response, statusCode, text)
	{
		response.writeHead
		(
			statusCode,
			{"Text-Type": "text/plain"}
		);

		this.log("Response: " + text);

		response.end(text);
	};

	WebServer.prototype.respondWithText = function(response, text)
	{
		this.respondWithStatusCodeAndText(response, this.statusCodes.OK, text);
	};

	// Logging.

	WebServer.prototype.log = function(message)
	{
		console.log(message);
	};
}

exports.WebServer = WebServer;
