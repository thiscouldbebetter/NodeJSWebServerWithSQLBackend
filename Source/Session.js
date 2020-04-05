function Session(id, variables)
{
	this.id = id;
	this.variables = variables;
}
{
	Session.prototype.new = function()
	{
		var id = ("" + Math.random()).substr("0.".length);
		var variables = {};
		return new Session(id, variables);
	};
}
