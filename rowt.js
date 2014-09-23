var Route = function (url) {

	this.url = url;
	this.template = this.url.split("/");
	this.regex = "^";
	this.paramNames = [];

	for (var i = 0; i < this.template.length; i++) {
		if (this.template[i] === "") continue;
		if (this.template[i].charAt(0) !== ":") {
			this.regex += "/" + this.template[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			continue;
		}

		var required = this.template[i].charAt(this.template[i].length - 1) !== "?";
		this.paramNames.push(this.template[i].slice(1, required ? this.template[i].length : this.template[i].length - 1));
		this.regex += required ? "(/[^/]+)" : "(/[^/]+)?";

	}

	this.regex += "$";
	this.regex = new RegExp(this.regex);

	return this;

};

Route.prototype.match = function (url) {

	var matches = url.match(this.regex);
	if (!matches) return false;

	var params = {};
	var paramValues = matches.slice(1, matches.length);
	for (var i = 0; i < paramValues.length; i++) {
		params[this.paramNames[i]] = paramValues[i] ? paramValues[i].slice(1) : undefined;
	}

	return params;

};

Route.prototype.fill = function (params) {

	if (!params) params = {};
	var failure = false;
	var compiledUrl = this.url.replace(/\/:([^\/]+)/g, function (match, paramName) {
		var required = paramName.charAt(paramName.length - 1) !== "?";
		if (!required) paramName = paramName.slice(0, paramName.length - 1);
		if (!params[paramName]) {
			if (required) failure = true;
			return "";
		} else {
			return "/" + params[paramName];
		}
	});

	return failure ? false : compiledUrl;

};

if (typeof module === "Object" && typeof window === "undefined") module.exports = {
	Route: Route,
	route: function (url) {
		return new Route(url);
	}
};
