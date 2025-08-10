export const enabled = true;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
export const mock = (req, res) => {
    req.query
    req.body
    req._parsedUrl.query
    res.writeHead(200).send(
        [1,2]
        
    );

}