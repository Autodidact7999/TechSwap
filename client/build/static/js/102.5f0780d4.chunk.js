"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[102],{102:(e,n,t)=>{t.r(n),t.d(n,{default:()=>r});var s=t(5043),a=t(3216),c=t(5475),l=t(7154),i=t(579);const r=()=>{const[e,n]=(0,s.useState)(!1),t=(0,a.Zp)(),r=(0,a.zy)(),o=new URLSearchParams(r.search),d=o.get("id"),u=o.get("email"),g=(0,s.useCallback)((()=>{const e="".concat("https://techswap.onrender.com","/auth/verify-login?id=").concat(d,"&email=").concat(u);l.A.get(e).then((e=>{200===e.status&&n(!0)})).catch((e=>{n(!1)}))}),[d,u,n]);return(0,s.useEffect)((()=>{d&&u&&g()}),[d,u,g]),e?(0,i.jsx)("div",{className:"flex flex-col items-center justify-center h-screen bg-gray-100",children:(0,i.jsxs)("div",{className:"max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-lg",children:[(0,i.jsxs)("div",{className:"mb-4 text-center",children:[(0,i.jsx)("h2",{className:"text-3xl font-bold text-green-600 mb-4",children:"Congratulations!"}),(0,i.jsx)("p",{className:"text-gray-600",children:"You have been verified and can now login."})]}),(0,i.jsx)("button",{onClick:()=>t("/signin"),className:"w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50",children:"Login Now"})]})}):(0,i.jsx)("div",{className:"bg-yellow-200 text-black p-4 rounded-lg shadow-md flex justify-center items-center",children:(0,i.jsxs)("p",{className:"text-center",children:["You may not have been verified yet. Please check your email for a link to verify your account. If you have already verified your account, please try",(0,i.jsxs)(c.N_,{className:"text-blue-500 font-bold",to:"/signin",children:[" ","logging in"," "]}),"again."]})})}}}]);
//# sourceMappingURL=102.5f0780d4.chunk.js.map