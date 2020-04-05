var fs = require("fs");

function FileReader()
{
	// Do nothing.
}
{
	FileReader.prototype.readTextFromFileAtPathAsync = function(filePath, succeed, notFound, fail)
	{
		fs.readFile
		(
			filePath,
			"utf8",
			function(error, data)
			{
				if (error)
				{
					errorName = error.name;
					var isNotFoundError =
						(error.message.indexOf("no such file or directory") >= 0);
					if (isNotFoundError)
					{
						notFound();
					}
					else
					{
						fail("Error attempting to read file: " + error);
					}
				}
				else
				{
					succeed(data);
				}
			}
		);
	}
}

exports.FileReader = FileReader;
