export const enabled = true;
/**
 * @type {import('mmjs-plugin/vite-mock').MockTemplate}
 */
export const mock = async (req, res) => {
    console.log(req.query, await req.body)
    return '4'
}