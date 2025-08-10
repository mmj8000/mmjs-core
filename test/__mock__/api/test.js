export const enabled = true;
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
export const mock = (req, res) => {

    res.end(JSON.stringify({
        test: 1,
    }))
}