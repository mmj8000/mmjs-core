"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./options.cjs"),g=require("mime-types"),d=require("raw-body"),p=require("./utils.cjs");function h(e){Object.defineProperty(e,"query",{get(){try{if(e.__params)return e.__params;if(!(e!=null&&e.url))return{};const r=new URL(e.url,`http://${e.headers.host||"localhost"}`),t=Object.fromEntries(r.searchParams.entries())??{};return e.__params=t,t}catch{return{}}}})}function m(e){const r=e.headers["content-type"];return(g.charset(r)||o.serverConfig.encoding||o.allowCharset[0]).toLocaleLowerCase()}async function O(e){Object.defineProperty(e,"body",{async get(){try{if(e.__body)return n;const r=m(e),t=await d(e,{encoding:r}),n=JSON.parse(t);return e.__body=n,n}catch{}return{}}})}const y=`/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`,b="parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";function P(e){let r=!1,t=e;try{t=JSON.parse(e),r=!0}catch{}return{tryResolve:r,newData:t}}async function S(e,r,t){const{fileExt:n,multiParameter:f}=o.serverConfig;if(![".js",".ts"].includes(n))return e;let c=e;if(r.includes("json")){const{newData:s,tryResolve:u}=P(e);c=u?s:JSON.stringify(e)}else c=JSON.stringify(e);let a={},i="";switch(f){case"get":try{const s=await p.dynamicImport(t.filePath);Object.assign(a,(s==null?void 0:s.parameters)??{},{[JSON.stringify(t.query)]:c})}catch(s){o.notFileErrMsg.some(u=>{var l;return((l=s==null?void 0:s.message)==null?void 0:l.indexOf(u))!==-1})||p.logger.error(`${s} ${t.filePath}`)}i=b;break;default:i=JSON.stringify(c);break}return a=JSON.stringify(a,null,4),o.serverConfig._esm?`export const enabled = true;
export const parameters = ${a};
${y}export const mock = (req, res) => (${i})
`:`exports.enabled = true;
const parameters = ${a};
exports.parameters = parameters;
${y}exports.mock = (req, res) => (${i})
`}exports.getCharset=m;exports.transformInnerCodeTempate=S;exports.useParseBody=O;exports.useParseQueryParams=h;
