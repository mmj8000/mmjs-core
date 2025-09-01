"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./options.cjs"),d=require("mime-types"),h=require("raw-body"),y=require("./utils.cjs");function O(e){Object.defineProperty(e,"query",{get(){try{if(e.__params)return e.__params;if(!(e!=null&&e.url))return{};const r=new URL(e.url,`http://${e.headers.host||"localhost"}`),t=Object.fromEntries(r.searchParams.entries())??{};return e.__params=t,t}catch{return{}}}})}function f(e){const r=e.headers["content-type"];return(d.charset(r)||o.serverConfig.encoding||o.allowCharset[0]).toLocaleLowerCase()}async function b(e){Object.defineProperty(e,"body",{async get(){try{if(e.__body)return n;const r=f(e),t=await h(e,{encoding:r}),n=JSON.parse(t);return e.__body=n,n}catch{}return{}}})}const m=`/**
* @type {import('vite-http-mock').MockTemplate}
*/
`,P="parameters[JSON.stringify(req._parsedUrl?.query ?? null)]";function S(e){let r=!1,t=e;try{t=JSON.parse(e),r=!0}catch{}return{tryResolve:r,newData:t}}async function _(e,r,t){const{fileExt:n,multiParameter:g}=o.serverConfig;if(![".js",".ts"].includes(n))return e;let i=e;if(r.includes("json")){const{newData:s,tryResolve:l}=S(e);i=l?s:JSON.stringify(e)}else i=JSON.stringify(e);let a={},c="",u;switch(g){case"get":try{u=await y.dynamicImport(t.filePath)}catch(s){o.notFileErrMsg.some(l=>{var p;return((p=s==null?void 0:s.message)==null?void 0:p.indexOf(l))!==-1})||y.logger.error(`${s} ${t.filePath}`)}Object.assign(a,(u==null?void 0:u.parameters)??{},{[JSON.stringify(t.query)]:i}),c=P;break;default:c=JSON.stringify(i);break}return a=JSON.stringify(a,null,4),o.serverConfig._esm?`export const enabled = true;
export const parameters = ${a};
${m}export const mock = (req, res) => (${c})
`:`exports.enabled = true;
const parameters = ${a};
exports.parameters = parameters;
${m}exports.mock = (req, res) => (${c})
`}exports.getCharset=f;exports.transformInnerCodeTempate=_;exports.useParseBody=b;exports.useParseQueryParams=O;
