exports.enabled = true;
exports.parameters = {
    "\"33=122\"": "\"<!DOCTYPE HTML PUBLIC \\\"-//IETF//DTD HTML 2.0//EN\\\">\\n<html><head>\\n<title>404 Not Found</title>\\n</head><body>\\n<h1>Not Found</h1>\\n<p>The requested URL /2 was not found on this server.</p>\\n</body></html>\\n\"",
    "\"33=1\"": "\"<!DOCTYPE HTML PUBLIC \\\"-//IETF//DTD HTML 2.0//EN\\\">\\n<html><head>\\n<title>404 Not Found</title>\\n</head><body>\\n<h1>Not Found</h1>\\n<p>The requested URL /2 was not found on this server.</p>\\n</body></html>\\n\"",
    "\"33=1001\"": "\"<!DOCTYPE HTML PUBLIC \\\"-//IETF//DTD HTML 2.0//EN\\\">\\n<html><head>\\n<title>404 Not Found</title>\\n</head><body>\\n<h1>Not Found</h1>\\n<p>The requested URL /2 was not found on this server.</p>\\n</body></html>\\n\""
};
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = (req, res) => (exports.parameters[JSON.stringify(req._parsedUrl?.query ?? null)])
