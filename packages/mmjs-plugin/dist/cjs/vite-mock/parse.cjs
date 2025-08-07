"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./options.cjs"),m=require("mime-types"),f=require("raw-body"),u=require("./utils.cjs");function d(e){Object.defineProperty(e,"query",{get(){try{if(e.__params)return e.__params;if(!(e!=null&&e.url))return{};const r=new URL(e.url,`http://${e.headers.host||"localhost"}`),t=Object.fromEntries(r.searchParams.entries())??{};return e.__params=t,t}catch{return{}}}})}function p(e){const r=e.headers["content-type"];return(m.charset(r)||o.serverConfig.encoding||o.allowCharset[0]).toLocaleLowerCase()}async function g(e){Object.defineProperty(e,"body",{async get(){try{if(e.__body)return s;const r=p(e),t=await f(e,{encoding:r}),s=JSON.parse(t);return e.__body=s,s}catch{}return{}}})}const l=`/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`,h="parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";async function P(e,r,t){const{fileExt:s,multiParameter:y}=o.serverConfig;if(![".js",".ts"].includes(s))return e;let n=e;try{r.includes("json")?n=e:n=JSON.stringify(e)}catch{n=e}let a={},c=n;try{switch(y){case"get":const i=await u.dynamicImport(t.filePath);Object.assign(a,i.parameters??{},{[JSON.stringify(t.query)]:n}),c=h;break}a=JSON.stringify(a,null,4)}catch(i){u.logger.error(`${i} ${t.filePath}`)}return o.serverConfig._esm?`export const enabled = true;
export const parameters = ${a};
${l}export const mock = (req, res) => (${c})
`:`exports.enabled = true;
exports.parameters = ${a};
${l}exports.mock = (req, res) => (exports.${c})
`}exports.getCharset=p;exports.transformInnerCodeTempate=P;exports.useParseBody=g;exports.useParseQueryParams=d;
