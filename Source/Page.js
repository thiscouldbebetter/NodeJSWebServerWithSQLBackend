var FileReader = require("./FileReader.js").FileReader;

function Page(path)
{
	this.path = path;

	this.fileReader = new FileReader();
}
{
	Page.prototype.toHtmlAsync = function(succeed, fileNotFound, fail)
	{
		var pageFilePath = "." + this.path;

		this.fileReader.readTextFromFileAtPathAsync
		(
			pageFilePath, succeed, fileNotFound, fail
		);
	};
}

exports.Page = Page;
