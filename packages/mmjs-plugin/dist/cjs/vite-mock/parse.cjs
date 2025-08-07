"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./options.cjs"),c=require("mime-types"),i=require("raw-body");function u(e){Object.defineProperty(e,"query",{get(){try{if(e.__params)return e.__params;if(!(e!=null&&e.url))return{};const r=new URL(e.url,`http://${e.headers.host||"localhost"}`),t=Object.fromEntries(r.searchParams.entries())??{};return e.__params=t,t}catch{return{}}}})}function a(e){const r=e.headers["content-type"];return(c.charset(r)||s.serverConfig.encoding||s.allowCharset[0]).toLocaleLowerCase()}async function m(e){Object.defineProperty(e,"body",{async get(){try{if(e.__body)return n;const r=a(e),t=await i(e,{encoding:r}),n=JSON.parse(t);return e.__body=n,n}catch{}return{}}})}const o=`/**
* @type {import('mmjs-plugin/vite-mock').MockTemplate}
*/
`;function p(e,r){if(![".js",".ts"].includes(s.serverConfig.fileExt))return e;let t=e;try{r.includes("json")?t=e:t=JSON.stringify(e)}catch{t=e}return s.serverConfig._esm?`export const enabled = true;
${o}export const mock = (req, res) => (${t})
`:`exports.enabled = true;
${o}exports.mock = (req, res) => (${t})
`}exports.getCharset=a;exports.transformInnerCodeTempate=p;exports.useParseBody=m;exports.useParseQueryParams=u;
