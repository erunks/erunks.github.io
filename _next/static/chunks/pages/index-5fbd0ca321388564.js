(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{1362:function(e,n,s){"use strict";s.r(n),s.d(n,{__N_SSG:function(){return E},default:function(){return B}});var r=s(2809),i=s(5697),t={label:i.string,street:i.string,city:i.string,stateProvince:i.string,postalCode:i.string,countryRegion:i.string},o=(i.string.isRequired,i.string,i.string.isRequired,(0,i.arrayOf)(i.string),i.string,i.string,(0,i.shape)({homeAddress:(0,i.shape)(t),workAddress:(0,i.shape)(t)}),(0,i.shape)({cellPhone:i.string,workPhone:i.string,homePhone:i.string,pagerPhone:i.string}),(0,i.shape)({homeFax:i.string,workFax:i.string}),(0,i.shape)({email:i.string,workEmail:i.string}),(0,i.shape)({url:i.string.isRequired}),i.string,i.string.isRequired,(0,i.shape)({facebook:i.string,twitter:i.string,linkedIn:i.string,custom:i.string}),(0,i.shape)({href:i.string.isRequired,text:i.string.isRequired}),(0,i.shape)({url:i.string}).isRequired,i.string.isRequired,i.string.isRequired,(0,i.shape)({url:i.string}),i.any.isRequired,i.string,i.string.isRequired,(0,i.shape)({url:i.string}).isRequired,i.string.isRequired,i.string.isRequired,i.string.isRequired,s(266)),a=s(809),c=s.n(a),d=s(7294),u=s(9669),_=s.n(u),l=s(4184),h=s.n(l),b=s(5117),g=s.n(b),f=s(5893),v=function(e){var n=e.children,s=(0,d.useState)(!0),r=s[0],i=s[1];return r&&(0,f.jsxs)("div",{className:g().overlay,children:[(0,f.jsx)("button",{type:"button",title:"Close",className:g().overlay__button,onClick:function(){return i(!1)},children:"\u2715"}),(0,f.jsx)("div",{className:g().overlay__content,children:n})]})},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{width:0,height:0},n=e.width,s=e.height,r=(0,d.useState)(null),i=r[0],t=r[1],o=(0,d.useState)(null===i||void 0===i?void 0:i.clientWidth),a=o[0],c=o[1],u=(0,d.useState)(null===i||void 0===i?void 0:i.clientHeight),_=u[0],l=u[1],h=(0,d.useCallback)((function(){c(null===i||void 0===i?void 0:i.clientWidth),l(null===i||void 0===i?void 0:i.clientHeight)}),[i]);return(0,d.useEffect)((function(){var e,n;return document&&(t(document.body),h()),window.addEventListener("resize",h),null===(e=window.screen)||void 0===e||null===(n=e.orientation)||void 0===n||n.addEventListener("change",h),function(){var e,n;window.removeEventListener("resize",h),null===(e=window.screen)||void 0===e||null===(n=e.orientation)||void 0===n||n.removeEventListener("change",h)}}),[h]),{widthMet:a>=n,heightMet:_>=s}},y=s(8611),j=s.n(y),w=s(1640),x=s.n(w),m=(s(3045),s(7361),function(e,n,s){var r=document.createElement("a");r.href="data:".concat(n,";charset=utf-8,").concat(s),r.download=e,r.click()}),k=function(e,n){13!==e.keyCode&&32!==e.keyCode||n()},O=function(e){return e.src},C=s(5675),N=s(338),R=s.n(N),q=function(e){var n=e.firstname,s=e.middlenames,i=e.lastname,t=e.organization,a=e.jobTitle,u=e.logo,l=e.emails,b=e.socialUrls,g=(0,d.useState)(!0),y=g[0],w=g[1],N=(0,d.useRef)(null),q=p({width:500}).widthMet,P=j()([n,s,i]," "),E=j()([a,t]," - "),B=(0,f.jsx)("div",{className:h()(R().business_card__side,R().business_card__front),children:(0,f.jsxs)("div",{children:[(0,f.jsx)("h1",{children:P}),(0,f.jsx)("hr",{})]})}),S=(0,f.jsxs)("div",{className:h()(R().business_card__side,R().business_card__back),children:[(0,f.jsxs)("div",{className:R().business_card__back__header,children:[(null===u||void 0===u?void 0:u.url)&&(0,f.jsx)("div",{className:R().logo,children:(0,f.jsx)(C.default,{alt:"".concat(P," Logo"),layout:"fill",loader:O,loading:"lazy",objectFit:"contain",src:u.url,title:"".concat(P," Logo")})}),(0,f.jsxs)("div",{children:[(0,f.jsx)("h2",{children:P}),(0,f.jsx)("hr",{}),(0,f.jsx)("h3",{children:E})]})]}),(0,f.jsx)("div",{className:R().business_card__back__footer,children:(0,f.jsxs)("ul",{children:[(0,f.jsx)("li",{children:"E: ".concat(l.workEmail)}),(0,f.jsx)("li",{children:"G: ".concat(b.github)}),(0,f.jsx)("li",{children:"W: ".concat(b.linkedIn)})]})})]}),L=function(){return w(!y)},X=function(){var n=(0,o.Z)(c().mark((function n(){return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_().post("".concat(window.location.origin,"/api/vcf"),{info:e}).then((function(e){var n=e.data,s=e.headers,r=s["content-disposition"],i=s["content-type"],t=JSON.parse(x()(r,"filename=").pop());m(t,i,encodeURIComponent(n))}),(function(e){console.error(e)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,f.jsxs)(f.Fragment,{children:[!q&&(0,f.jsx)(v,{children:(0,f.jsx)("h1",{children:"Please rotate your screen for the best viewing experience."})}),(0,f.jsx)("div",{className:R().business_card_container,children:(0,f.jsxs)("div",{className:h()("business_card",R().business_card_body,(0,r.Z)({},R().business_card__flipped,!y)),onClick:L,onKeyUp:function(e){return k(e,L)},ref:N,role:"button",tabIndex:0,"data-tilt":!0,children:[B,S]})}),(0,f.jsx)("button",{className:R().business_card__download,type:"button",onClick:X,children:"\u2193"})]})};function P(e,n){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),s.push.apply(s,r)}return s}var E=!0,B=function(e){var n=e.card;return(0,f.jsx)(q,function(e){for(var n=1;n<arguments.length;n++){var s=null!=arguments[n]?arguments[n]:{};n%2?P(Object(s),!0).forEach((function(n){(0,r.Z)(e,n,s[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):P(Object(s)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(s,n))}))}return e}({},n))}},8581:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(1362)}])},338:function(e){e.exports={business_card_container:"BusinessCard_business_card_container__q3H5_",business_card_body:"BusinessCard_business_card_body__5yCjW",business_card__flipped:"BusinessCard_business_card__flipped__xXCQJ",business_card__side:"BusinessCard_business_card__side__OhM3L",business_card__front:"BusinessCard_business_card__front__Rn4lX",business_card__back:"BusinessCard_business_card__back__OXAvU",business_card__back__header:"BusinessCard_business_card__back__header__TZmTP",business_card__back__footer:"BusinessCard_business_card__back__footer__KqOve",business_card__download:"BusinessCard_business_card__download__y4bv2",logo:"BusinessCard_logo__FghZf"}},5117:function(e){e.exports={overlay:"Overlay_overlay__ggxQX",overlay__button:"Overlay_overlay__button__21UGo",overlay__content:"Overlay_overlay__content__6Ny5A"}}},function(e){e.O(0,[80,774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);