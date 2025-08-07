export const enabled = true;
export const parameters = {
    "\"pageCode=equipmentMonitor&pageId=T300K-103T300K-103equipmentMonitor2\"": {
        "test": 1
    }
};
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
export const mock = (req, res) => (parameters[JSON.stringify(req._parsedUrl?.query ?? null)])
