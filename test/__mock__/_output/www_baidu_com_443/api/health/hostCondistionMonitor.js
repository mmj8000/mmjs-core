exports.enabled = true;
const parameters = {
    "\"componentCode=equipmentMonitorCm\"": "\"<!DOCTYPE HTML PUBLIC \\\"-//IETF//DTD HTML 2.0//EN\\\">\\n<html><head>\\n<title>404 Not Found</title>\\n</head><body>\\n<h1>Not Found</h1>\\n<p>The requested URL /api/health/hostCondistionMonitor was not found on this server.</p>\\n</body></html>\\n\""
};
exports.parameters = parameters;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = (req, res) => (parameters[JSON.stringify(req._parsedUrl?.query ?? null)])
