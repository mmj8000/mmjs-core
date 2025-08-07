export const enabled = true;
export const parameters = {};
/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
export const mock = (req, res) => ("<!doctype html>\r\n<html lang=\"en\">\r\n  <head>\n    <script type=\"module\" src=\"/@vite/client\"></script>\n\r\n    <meta charset=\"UTF-8\" />\r\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n  </head>\r\n  <body>\r\n    <div id=\"app\"></div>\r\n    <script type=\"module\" src=\"/src/main.ts\"></script>\r\n  </body>\r\n</html>\r\n")
