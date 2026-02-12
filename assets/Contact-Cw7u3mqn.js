import{A as G,j as l}from"./index-DAffw1qd.js";import{r as c,b as K,c as V,x as Z}from"./icons-CZTAnE3N.js";import"./react-vendor-Bzgz95E1.js";import"./animations-CEIlrZmS.js";let J={data:""},Q=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||J},W=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,X=/\/\*[^]*?\*\/|  +/g,F=/\n+/g,j=(e,t)=>{let a="",r="",o="";for(let i in e){let s=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+s+";":r+=i[1]=="f"?j(s,i):i+"{"+j(s,i[1]=="k"?"":t)+"}":typeof s=="object"?r+=j(s,t?t.replace(/([^,])+/g,n=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,n):n?n+" "+d:d)):i):s!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=j.p?j.p(i,s):i+":"+s+";")}return a+(t&&o?t+"{"+o+"}":o)+r},x={},R=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+R(e[a]);return t}return e},ee=(e,t,a,r,o)=>{let i=R(e),s=x[i]||(x[i]=(d=>{let m=0,p=11;for(;m<d.length;)p=101*p+d.charCodeAt(m++)>>>0;return"go"+p})(i));if(!x[s]){let d=i!==e?e:(m=>{let p,u,f=[{}];for(;p=W.exec(m.replace(X,""));)p[4]?f.shift():p[3]?(u=p[3].replace(F," ").trim(),f.unshift(f[0][u]=f[0][u]||{})):f[0][p[1]]=p[2].replace(F," ").trim();return f[0]})(e);x[s]=j(o?{["@keyframes "+s]:d}:d,a?"":"."+s)}let n=a&&x.g?x.g:null;return a&&(x.g=x[s]),((d,m,p,u)=>{u?m.data=m.data.replace(u,d):m.data.indexOf(d)===-1&&(m.data=p?d+m.data:m.data+d)})(x[s],t,r,n),s},te=(e,t,a)=>e.reduce((r,o,i)=>{let s=t[i];if(s&&s.call){let n=s(a),d=n&&n.props&&n.props.className||/^go/.test(n)&&n;s=d?"."+d:n&&typeof n=="object"?n.props?"":j(n,""):n===!1?"":n}return r+o+(s??"")},"");function $(e){let t=this||{},a=e.call?e(t.p):e;return ee(a.unshift?a.raw?te(a,[].slice.call(arguments,1),t.p):a.reduce((r,o)=>Object.assign(r,o&&o.call?o(t.p):o),{}):a,Q(t.target),t.g,t.o,t.k)}let L,I,P;$.bind({g:1});let v=$.bind({k:1});function ae(e,t,a,r){j.p=t,L=e,I=a,P=r}function w(e,t){let a=this||{};return function(){let r=arguments;function o(i,s){let n=Object.assign({},i),d=n.className||o.className;a.p=Object.assign({theme:I&&I()},n),a.o=/ *go\d+/.test(d),n.className=$.apply(a,r)+(d?" "+d:"");let m=e;return e[0]&&(m=n.as||e,delete n.as),P&&m[0]&&P(n),L(m,n)}return t?t(o):o}}var se=e=>typeof e=="function",S=(e,t)=>se(e)?e(t):e,re=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ie=20,M="default",H=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:r}=t;return H(e,{type:e.toasts.find(s=>s.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},D=[],q={toasts:[],pausedAt:void 0,settings:{toastLimit:ie}},b={},Y=(e,t=M)=>{b[t]=H(b[t]||q,e),D.forEach(([a,r])=>{a===t&&r(b[t])})},B=e=>Object.keys(b).forEach(t=>Y(e,t)),oe=e=>Object.keys(b).find(t=>b[t].toasts.some(a=>a.id===e)),C=(e=M)=>t=>{Y(t,e)},ne={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},le=(e={},t=M)=>{let[a,r]=c.useState(b[t]||q),o=c.useRef(b[t]);c.useEffect(()=>(o.current!==b[t]&&r(b[t]),D.push([t,r]),()=>{let s=D.findIndex(([n])=>n===t);s>-1&&D.splice(s,1)}),[t]);let i=a.toasts.map(s=>{var n,d,m;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((n=e[s.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:s.duration||((d=e[s.type])==null?void 0:d.duration)||e?.duration||ne[s.type],style:{...e.style,...(m=e[s.type])==null?void 0:m.style,...s.style}}});return{...a,toasts:i}},ce=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||re()}),E=e=>(t,a)=>{let r=ce(t,e,a);return C(r.toasterId||oe(r.id))({type:2,toast:r}),r.id},g=(e,t)=>E("blank")(e,t);g.error=E("error");g.success=E("success");g.loading=E("loading");g.custom=E("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?C(t)(a):B(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?C(t)(a):B(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let r=g.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?S(t.success,o):void 0;return i?g.success(i,{id:r,...a,...a?.success}):g.dismiss(r),o}).catch(o=>{let i=t.error?S(t.error,o):void 0;i?g.error(i,{id:r,...a,...a?.error}):g.dismiss(r)}),e};var de=1e3,ue=(e,t="default")=>{let{toasts:a,pausedAt:r}=le(e,t),o=c.useRef(new Map).current,i=c.useCallback((u,f=de)=>{if(o.has(u))return;let h=setTimeout(()=>{o.delete(u),s({type:4,toastId:u})},f);o.set(u,h)},[]);c.useEffect(()=>{if(r)return;let u=Date.now(),f=a.map(h=>{if(h.duration===1/0)return;let N=(h.duration||0)+h.pauseDuration-(u-h.createdAt);if(N<0){h.visible&&g.dismiss(h.id);return}return setTimeout(()=>g.dismiss(h.id,t),N)});return()=>{f.forEach(h=>h&&clearTimeout(h))}},[a,r,t]);let s=c.useCallback(C(t),[t]),n=c.useCallback(()=>{s({type:5,time:Date.now()})},[s]),d=c.useCallback((u,f)=>{s({type:1,toast:{id:u,height:f}})},[s]),m=c.useCallback(()=>{r&&s({type:6,time:Date.now()})},[r,s]),p=c.useCallback((u,f)=>{let{reverseOrder:h=!1,gutter:N=8,defaultPosition:z}=f||{},O=a.filter(y=>(y.position||z)===(u.position||z)&&y.height),U=O.findIndex(y=>y.id===u.id),T=O.filter((y,A)=>A<U&&y.visible).length;return O.filter(y=>y.visible).slice(...h?[T+1]:[0,T]).reduce((y,A)=>y+(A.height||0)+N,0)},[a]);return c.useEffect(()=>{a.forEach(u=>{if(u.dismissed)i(u.id,u.removeDelay);else{let f=o.get(u.id);f&&(clearTimeout(f),o.delete(u.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:m,calculateOffset:p}}},me=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,pe=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,fe=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ge=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${me} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${pe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${fe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,he=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ye=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${he} 1s linear infinite;
`,be=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,xe=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ve=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${xe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,je=w("div")`
  position: absolute;
`,we=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ee=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ne=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ke=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return t!==void 0?typeof t=="string"?c.createElement(Ne,null,t):t:a==="blank"?null:c.createElement(we,null,c.createElement(ye,{...r}),a!=="loading"&&c.createElement(je,null,a==="error"?c.createElement(ge,{...r}):c.createElement(ve,{...r})))},De=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Se=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,$e="0%{opacity:0;} 100%{opacity:1;}",Ce="0%{opacity:1;} 100%{opacity:0;}",Oe=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ae=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ie=(e,t)=>{let a=e.includes("top")?1:-1,[r,o]=_()?[$e,Ce]:[De(a),Se(a)];return{animation:t?`${v(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Pe=c.memo(({toast:e,position:t,style:a,children:r})=>{let o=e.height?Ie(e.position||t||"top-center",e.visible):{opacity:0},i=c.createElement(ke,{toast:e}),s=c.createElement(Ae,{...e.ariaProps},S(e.message,e));return c.createElement(Oe,{className:e.className,style:{...o,...a,...e.style}},typeof r=="function"?r({icon:i,message:s}):c.createElement(c.Fragment,null,i,s))});ae(c.createElement);var Me=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let i=c.useCallback(s=>{if(s){let n=()=>{let d=s.getBoundingClientRect().height;r(e,d)};n(),new MutationObserver(n).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return c.createElement("div",{ref:i,className:t,style:a},o)},ze=(e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...o}},Te=$`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,Fe=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,toasterId:i,containerStyle:s,containerClassName:n})=>{let{toasts:d,handlers:m}=ue(a,i);return c.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...s},className:n,onMouseEnter:m.startPause,onMouseLeave:m.endPause},d.map(p=>{let u=p.position||t,f=m.calculateOffset(p,{reverseOrder:e,gutter:r,defaultPosition:t}),h=ze(u,f);return c.createElement(Me,{id:p.id,key:p.id,onHeightUpdate:m.updateHeight,className:p.visible?Te:"",style:h},p.type==="custom"?S(p.message,p):o?o(p):c.createElement(Pe,{toast:p,position:u}))}))},Re=g;const Le="/waleediftikhar.me/assets/image4-CVDK8I9D.png",Be=()=>{const[e,t]=c.useState(!1);c.useEffect(()=>{G.init({duration:800,once:!0})},[]);const a=async r=>{if(r.preventDefault(),e)return;t(!0);const o={name:r.target.elements[0].value,email:r.target.elements[1].value,subject:r.target.elements[2].value,message:r.target.elements[3].value},i=fetch("https://portfolio-api-three-gamma.vercel.app/api/send-message",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(s=>s.ok?s.json():s.json().then(n=>Promise.reject(n)));Re.promise(i,{loading:"Sending message...",success:s=>(r.target.reset(),t(!1)," Message sent successfully!"),error:s=>(t(!1),` Error: ${s.message||"Something went wrong!"}`)})};return l.jsxs("section",{id:"contact",className:"contact-section",children:[l.jsx(Fe,{position:"top-right",reverseOrder:!1,toastOptions:{className:"my-toast-animation",duration:3e3,style:{background:"#363636",color:"#fff"}}}),"      ",l.jsxs("div",{className:"container",children:[l.jsx("span",{className:"background-text-contact",children:"Contact"}),l.jsxs("div",{className:"section-header-contact","data-aos":"fade-up",children:[l.jsxs("h2",{children:[l.jsx("span",{id:"contactspan",children:"Contact"})," Me"]}),l.jsx("p",{children:'"Have a project or idea in mind? Feel free to contact me—let’s build something amazing together"'})]}),l.jsxs("div",{className:"contact-info-grid","data-aos":"fade-up",children:[l.jsxs("div",{className:"info-item",children:[l.jsx("div",{className:"info-icon",children:l.jsx(K,{})}),l.jsx("h3",{className:"info-title",children:"ADDRESS"}),l.jsx("p",{children:"Punjab, Pakistan"})]}),l.jsxs("div",{className:"info-item",children:[l.jsx("div",{className:"info-icon",children:l.jsx(V,{})}),l.jsx("h3",{className:"info-title",children:"CONTACT NUMBER"}),l.jsx("p",{children:"0303-0834088"})]}),l.jsxs("div",{className:"info-item",children:[l.jsx("div",{className:"info-icon",children:l.jsx(Z,{})}),l.jsx("h3",{className:"info-title",children:"EMAIL ADDRESS"}),l.jsx("p",{children:"waleediftikhar188@gmail.com"})]})]}),l.jsxs("div",{className:"contact-form-area",children:[l.jsx("div",{className:"contact-image",children:l.jsx("img",{src:Le,alt:"image",loading:"lazy"})}),l.jsxs("form",{className:"form-container","data-aos":"fade-left",onSubmit:a,children:[l.jsx("input",{type:"text",placeholder:"Your Name",required:!0}),l.jsx("input",{type:"email",placeholder:"Your Email",required:!0}),l.jsx("input",{type:"text",placeholder:"Subject"}),l.jsx("textarea",{placeholder:"Message",rows:"6",required:!0}),l.jsx("button",{type:"submit",className:"send-message-btn",disabled:e,children:e?"SENDING...":"SEND MESSAGE"})]})]})]})]})};export{Be as default};
