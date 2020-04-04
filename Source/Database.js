var mysql = require("mysql");

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

exports.Database = Database;
