exports.enabled = true;
const parameters = {};
exports.parameters = parameters;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = (req, res) => ({"code":200,"msg":"操作成功","data":[{"order_status":0,"count":1},{"order_status":3,"count":1}]})
