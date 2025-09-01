exports.enabled = false;
const parameters = {};
exports.parameters = parameters;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = (req, res) => ({"code":200,"msg":"操作成功","data":{"total":1,"rows":[{"id":"1961747841328017410","relationId":"1961747839960674305","carNo":"粤BBA2346","rating":5,"ratingRate":100,"onboardRate":100,"carDistance":310.5740796120539,"checkStatus":1,"scheduStatus":req.query.scheduStatus ?? 2,"pushStatus":0,"pushTime":null,"createTime":"2025-08-30 19:08:27","schedulingTimeLimit":30,"issueTime":null,"expireTime":null,"pointId":145,"pointName":"深圳市宝安区人民医院-西门","schedulingVo":{"id":"1961747839960674305","pointId":145,"lon":null,"lat":null,"schedulingScope":500.0,"schedulingFee":0,"schedulingTimeLimit":30,"notificationMethod":0,"notificationType":0,"schedulingAmount":13,"schedulingWaitingTime":5,"pushContent":null,"schedulingStatus":0,"pointRange":500.0,"pointName":"深圳市宝安区人民医院-西门"}}],"code":200,"msg":"查询成功"}}})