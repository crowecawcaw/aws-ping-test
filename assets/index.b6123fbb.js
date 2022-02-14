var N=Object.defineProperty,v=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var f=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,g=(t,e)=>{for(var n in e||(e={}))j.call(e,n)&&f(t,n,e[n]);if(m)for(var n of m(e))L.call(e,n)&&f(t,n,e[n]);return t},y=(t,e)=>v(t,S(e));import{j as x,r as R,a as u}from"./vendor.662fb514.js";const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}};A();const r=x.exports.jsx,c=x.exports.jsxs,h=["us-east-2","us-east-1","us-west-1","us-west-2","af-south-1","ap-east-1","ap-southeast-3","ap-south-1","ap-northeast-3","ap-northeast-2","ap-southeast-1","ap-southeast-2","ap-northeast-1","ca-central-1","eu-central-1","eu-west-1","eu-west-2","eu-south-1","eu-west-3","eu-north-1","me-south-1","sa-east-1"],d=5,w=Object.fromEntries(h.map(t=>[t,[]])),O=async t=>{const e=Date.now();return await fetch(`https://dynamodb.${t}.amazonaws.com`),Date.now()-e},P=t=>new Promise(e=>setTimeout(e,t)),D=t=>t.sort((e,n)=>e-n)[(t.length+1)/2];function T(){const[t,e]=u.exports.useState(w),[n,l]=u.exports.useState(!1),s=async a=>{for(let i=0;i<d;i++){const b=await O(a);e(p=>y(g({},p),{[a]:p[a].concat(b)})),await P(250)}},o=async()=>{let a=0;const i=async()=>{for(;a<h.length;)await s(h[a++])};await Promise.all([i(),i(),i()])};return c("div",{className:"App",children:[r("h1",{children:"AWS Regional Ping Test"}),c("div",{className:"row",children:[c("div",{className:"col info",children:[r("p",{children:"Find your ping to each AWS region. This test will ping the regional DynamoDB endpoint 5 times and display the median latency."}),r("p",{children:r("button",{disabled:n,onClick:async()=>{l(!0),e(w),await o(),l(!1)},children:n?"Running":"Test Now"})})]}),r("div",{className:"col",children:c("table",{children:[c("thead",{children:[r("th",{children:"Region"}),r("th",{children:"Median Latency"})]}),r("tbody",{children:Object.entries(t).map(([a,i])=>c("tr",{children:[r("td",{children:a}),r("td",{className:"latency",children:n&&i.length<d?r(B,{value:i.length/d}):i.length===d?`${D(i)}ms`:null})]}))})]})})]})]})}const B=({value:t})=>r("div",{className:"progress-bar",children:r("div",{className:"progress",style:{width:`${t*100}%`,height:"100%"}})});R.exports.render(r(u.exports.StrictMode,{children:r(T,{})}),document.getElementById("root"));
