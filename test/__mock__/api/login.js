exports.enabled = true;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
exports.mock = async (req, res) =>{
    res.body
    console.log(req.query, await req.body)

    return {
        t: Date.now(),
    }
}