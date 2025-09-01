exports.enabled = true;
const parameters = {};
exports.parameters = parameters;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = (req, res) => ({"code":401,"msg":"认证失败，无法访问系统资源","data":null})
