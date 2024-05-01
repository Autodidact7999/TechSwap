"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[383],{5383:(e,t,s)=>{s.r(t),s.d(t,{default:()=>m});var a=s(5043),i=s(9456),n=s(7767),d=s(7796),r=s(579);const l=e=>{let{trustedAuthContextData:t}=e;const[s,l]=(0,a.useState)({}),[c,o]=(0,a.useState)({}),x=(0,i.wA)(),m=null===t||void 0===t?void 0:t.map((e=>({_id:e._id,device:e.device,deviceType:e.deviceType,ipAddress:e.ip,location:"".concat(e.city,", ").concat(e.country),browser:e.browser,operatingSystem:e.os,time:e.time})));return(0,r.jsxs)("div",{className:"max-w-3xl mx-auto mt-12 p-5",children:[(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900",children:"Trusted Devices and Locations"}),(0,r.jsx)("div",{className:"mt-6 border-t border-gray-200 pt-6",children:(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsxs)("ul",{className:"-my-5 divide-y divide-gray-200",children:[0===m.length&&(0,r.jsx)("span",{className:"text-sm font-medium text-gray-900",children:"Not available"}),m.map((e=>(0,r.jsx)("li",{className:"py-5",children:(0,r.jsxs)("div",{className:"flex items-center justify-between space-x-4",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{className:"text-sm font-medium text-gray-900",children:[e.device," ",e.deviceType," - ",e.time]}),(0,r.jsxs)("span",{className:"ml-1 text-sm text-gray-500",children:["(",e.ipAddress,")"]})]}),(0,r.jsxs)("div",{className:"mt-1 flex items-center space-x-4",children:[(0,r.jsx)("span",{className:"text-sm text-gray-500",children:e.location}),(0,r.jsx)("span",{className:"text-sm text-gray-500",children:"\u2022"}),(0,r.jsxs)("span",{className:"text-sm text-gray-500",children:[e.browser," on ",e.operatingSystem]})]})]}),(0,r.jsxs)("div",{className:"flex-shrink-0",children:[(0,r.jsx)("button",{disabled:s[e._id],onClick:()=>(async e=>{l((t=>({...t,[e]:!0}))),await x((0,n.lI)(e)),await x((0,n.LZ)()),l((t=>({...t,[e]:!1})))})(e._id),type:"button",className:"mx-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:s[e._id]?(0,r.jsx)(d.A,{loadingText:"Removing..."}):(0,r.jsx)("span",{children:"Remove"})}),(0,r.jsx)("button",{disabled:c[e._id],onClick:()=>(async e=>{o((t=>({...t,[e]:!0}))),await x((0,n.XL)(e)),await x((0,n.LZ)()),await x((0,n.Ck)()),o((t=>({...t,[e]:!1})))})(e._id),type:"button",className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",children:c[e._id]?(0,r.jsx)(d.A,{loadingText:"Blocking..."}):(0,r.jsx)("span",{children:"Block"})})]})]})},e._id)))]})})})]})},c=e=>{let{contextAuthData:t}=e;const s={"First Added":null===t||void 0===t?void 0:t.firstAdded,"IP Address":null===t||void 0===t?void 0:t.ip,Country:null===t||void 0===t?void 0:t.country,City:null===t||void 0===t?void 0:t.city,Browser:null===t||void 0===t?void 0:t.browser,Platform:null===t||void 0===t?void 0:t.platform,OS:null===t||void 0===t?void 0:t.os,Device:null===t||void 0===t?void 0:t.device,"Device Type":null===t||void 0===t?void 0:t.deviceType};return(0,r.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,r.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900",children:"Primary Devices and Locations"}),(0,r.jsx)("div",{className:"mt-6 border-t border-gray-200 pt-6",children:(0,r.jsx)("dl",{className:"grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2",children:Object.entries(s).map((e=>{let[t,s]=e;return(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:t}),(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900",children:s})]},t)}))})})]})})},o=e=>{let{blockedContextAuthData:t}=e;const[s,l]=(0,a.useState)({}),c=(0,i.wA)(),o=null===t||void 0===t?void 0:t.map((e=>({_id:e._id,device:e.device,deviceType:e.deviceType,ipAddress:e.ip,location:"".concat(e.city,", ").concat(e.country),browser:e.browser,operatingSystem:e.os,time:e.time})));return(0,r.jsxs)("div",{className:"max-w-3xl mx-auto mt-12 p-5",children:[(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900",children:"Blocked Devices and Locations"}),(0,r.jsx)("div",{className:"mt-6 border-t border-gray-200 pt-6",children:(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsxs)("ul",{className:"-my-5 divide-y divide-gray-200",children:[0===o.length&&(0,r.jsx)("span",{className:"text-sm font-medium text-gray-900",children:"Not available"}),o.map((e=>(0,r.jsx)("li",{className:"py-5",children:(0,r.jsxs)("div",{className:"flex items-center justify-between space-x-4",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{className:"text-sm font-medium text-gray-900",children:[e.device," ",e.deviceType," - ",e.time]}),(0,r.jsxs)("span",{className:"ml-1 text-sm text-gray-500",children:["(",e.ipAddress,")"]})]}),(0,r.jsxs)("div",{className:"mt-1 flex items-center space-x-4",children:[(0,r.jsx)("span",{className:"text-sm text-gray-500",children:e.location}),(0,r.jsx)("span",{className:"text-sm text-gray-500",children:"\u2022"}),(0,r.jsxs)("span",{className:"text-sm text-gray-500",children:[e.browser," on ",e.operatingSystem]})]})]}),(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)("button",{disabled:s[e._id],onClick:()=>(async e=>{l((t=>({...t,[e]:!0}))),await c((0,n.aR)(e)),await c((0,n.Ck)()),await c((0,n.LZ)()),l((t=>({...t,[e]:!1})))})(e._id),type:"button",className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ".concat(s[e._id]?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"),children:s[e._id]?(0,r.jsx)(d.A,{loadingText:"unblocking..."}):"Unblock"})})]})},e._id)))]})})})]})};var x=s(9719);const m=()=>{const e=(0,i.wA)(),[t,s]=(0,a.useState)(!1);(0,a.useEffect)((()=>{(async()=>{await e((0,n.c7)()),await e((0,n.oI)()),await e((0,n.LZ)()),await e((0,n.Ck)())})().then((()=>s(!0)))}),[e,t]);const d=(0,i.d4)((e=>{var t;return null===(t=e.auth)||void 0===t?void 0:t.userPreferences})),m=(0,i.d4)((e=>{var t;return null===(t=e.auth)||void 0===t?void 0:t.contextAuthData})),u=(0,i.d4)((e=>{var t;return null===(t=e.auth)||void 0===t?void 0:t.trustedAuthContextData})),v=(0,i.d4)((e=>{var t;return null===(t=e.auth)||void 0===t?void 0:t.blockedAuthContextData}));return t?d&&m?(0,r.jsxs)("div",{className:"main-section border bg-white",children:[(0,r.jsx)(c,{contextAuthData:m}),(0,r.jsx)(l,{trustedAuthContextData:u}),(0,r.jsx)(o,{blockedContextAuthData:v})]}):(0,r.jsxs)("div",{className:"bg-white border p-5 text-gray-700 text-center main-section",children:[(0,r.jsx)("p",{className:"text-lg font-semibold mb-4",children:"Context-based authentication is currently disabled for your account."}),(0,r.jsx)("p",{className:"text-sm",children:"By enabling context-based authentication, you will gain control over your devices, their locations, and manage trusted and blocked devices."})]}):(0,r.jsx)("div",{className:"col-span-2 flex items-center justify-center h-screen",children:(0,r.jsx)(x.A,{})})}}}]);
//# sourceMappingURL=383.d4614963.chunk.js.map