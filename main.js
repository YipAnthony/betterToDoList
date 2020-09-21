!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function i(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function a(e){i(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(e,t){i(2,arguments);var n=a(e),r=a(t);return n.getTime()<r.getTime()}function o(e){i(1,arguments);var t=a(e);return t.setHours(0,0,0,0),t}function l(e,t){i(2,arguments);var n=o(e),a=o(t);return n.getTime()===a.getTime()}function s(e){return i(1,arguments),l(e,Date.now())}function d(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function c(e,t){i(1,arguments);var n=t||{},r=n.locale,o=r&&r.options&&r.options.weekStartsOn,l=null==o?0:d(o),s=null==n.weekStartsOn?l:d(n.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=a(e),u=c.getDay(),m=(u<s?7:0)+u-s;return c.setDate(c.getDate()-m),c.setHours(0,0,0,0),c}function u(e,t,n){i(2,arguments);var a=c(e,n),r=c(t,n);return a.getTime()===r.getTime()}function m(e,t){return i(1,arguments),u(e,Date.now(),t)}function p(){return function(e){i(1,arguments);var t=a(e);return t.setHours(23,59,59,999),t}(Date.now())}n.r(t);let g=(()=>{const e=(e,t,n="div",i="id")=>{let a=document.createElement(n);return a.setAttribute(i,e),t&&a.setAttribute("class",t),a};let t=e("signInContainer");document.querySelector("body").appendChild(t);let n=e("companyNameContainer"),i=document.createElement("img");i.setAttribute("id","companyName"),i.src="images/logo_transparent.png",n.appendChild(i);let a=e("welcomeContainer"),r=e("welcomeText");r.innerHTML="Welcome Back!",a.appendChild(r);let o=e("signInButton","button"),l=e("signInButtonText");l.innerHTML="Sign In",o.appendChild(l);let s=e("emailPasswordContainer"),d=e("emailContainer"),c=e("emailInputArea","","textarea");c.setAttribute("name","email"),c.setAttribute("scroll","none"),c.setAttribute("placeholder","Email Address");let u=e("emailIcon","icon","img");u.src="images/envelope.svg",d.appendChild(u),d.appendChild(c),s.appendChild(d);let m=e("passwordInputArea","","input"),p=e("passwordContainer");m.setAttribute("name","password"),m.setAttribute("placeholder","Password"),m.setAttribute("type","password");let g=e("passwordIcon","icon","img");g.src="images/padlock.svg",p.appendChild(g),p.appendChild(m),s.appendChild(p);let h=e("selectionDivider");h.innerHTML="- OR -";let f=e("signInWithGoogleButton","button"),b=e("signInWithGoogleText"),v=e("googleIcon","icon","img");v.src="images/google-plus.svg",b.innerHTML="Sign in with Google",f.appendChild(v),f.appendChild(b);let y=e("signInWithDemoButton","button"),k=e("signInWithDemoText"),C=e("signInWithDemoText2");k.innerHTML="Demo",C.innerHTML="Version",y.appendChild(k),y.appendChild(C);let A=e("signUpButton","button"),T=e("signUpButtonText");T.innerHTML="Sign Up",A.appendChild(T),A.addEventListener("click",(function(){j(),t.append(n,a,E,w,H),r.innerHTML="Sign Up",c.value="",m.value=""}));let E=e("signUpEmailPass","button"),L=e("signUpEmailPassText");E.appendChild(L),L.innerHTML="Email + Password",E.addEventListener("click",P);let w=e("signUpEmailOnly","button"),S=e("signUpEmailOnlyText");w.appendChild(S),S.innerHTML="Email Only",w.addEventListener("click",(function(){P(),s.removeChild(p),t.removeChild(D),s.appendChild(D)}));let D=e("submit","button"),I=e("submitText");D.appendChild(I),I.innerHTML="Submit Email";let H=e("backButton","button"),M=e("backButtonText");function j(){for(;t.firstElementChild;)t.removeChild(t.firstElementChild)}function P(){j(),t.append(n,a,s,D,H),r.innerHTML="Enter your desired email and password"}function B(){t.append(n,a,s,o,h,f,A,y),s.append(d,p),s.firstElementChild==D&&s.removeChild(D),r.innerHTML="Welcome Back!",c.setAttribute("placeholder","Email Address")}return M.innerHTML="Back",H.appendChild(M),H.addEventListener("click",(function(){j(),B()})),{createSignInContainer:B,emailSent:function(){j(),t.append(n,a),r.innerHTML="Email sent, please check your inbox"},reconfirmEmail:function(){P(),s.removeChild(p),t.removeChild(D),s.appendChild(D),r.innerHTML="Please re-confirm your email"},signInContainer:t,signInButton:o,signInWithGoogleButton:f,signUpButton:A,submit:D,signUpEmailOnly:w,signUpEmailPass:E,emailInputArea:c,passwordInputArea:m,signInWithDemoButton:y,backButton:H}})(),h=document.querySelector("body");const f=firebase.auth(),b=document.querySelector("#whenSignedIn"),v=document.querySelector("#signOutButton"),y=document.querySelector("#userDetails"),k=document.querySelector("#hiddenContainer");k.style.display="none";const C=document.createElement("img");C.src="images/background2.jpg",C.setAttribute("id","loginBackground"),h.appendChild(C),f.onAuthStateChanged(e=>{if(e){if(e.displayName?y.innerHTML="Hello, "+e.displayName:y.innerHTML="Hello, "+e.email,h.querySelector("#signInContainer")){let e=h.querySelector("#signInContainer");h.removeChild(e)}E(),b.hidden=!1,k.style.display="",k.style.display="auto",k.hidden=!1,v.onclick=()=>{f.signOut(),location.reload()}}else b.hidden=!0,y.innerHTML="Hello",T()});const A=firebase.firestore();let T=()=>{g.createSignInContainer(),g.signInWithDemoButton.onclick=()=>{firebase.auth().signInWithEmailAndPassword("demo@gmail.com","demodemo123")},g.signInButton.onclick=()=>{let e=g.emailInputArea,t=e.value,n=g.passwordInputArea,i=n.value;firebase.auth().signInWithEmailAndPassword(t,i).catch((function(t){var i=t.code;e.value="",n.value="","auth/user-not-found"==i?e.setAttribute("placeholder","email not registered"):"auth/invalid-email"==i?e.setAttribute("placeholder","Invalid email/password"):"auth/wrong-password"==i&&n.setAttribute("placeholder","Invalid email/password")}))};const e=new firebase.auth.GoogleAuthProvider;g.signInWithGoogleButton.onclick=()=>{f.signInWithPopup(e)};var t={url:"https://themddropout.github.io/betterToDoList/",handleCodeInApp:!0};if(g.signUpButton.onclick=()=>{g.signUpEmailOnly.onclick=()=>{g.submit.onclick=()=>{let e=g.emailInputArea,n=e.value;firebase.auth().sendSignInLinkToEmail(n,t).then((function(){g.emailSent(),window.localStorage.setItem("emailForSignIn",n)})).catch((function(t){e.value="",e.setAttribute("placeholder",t.message)}))}},g.signUpEmailPass.onclick=()=>{g.submit.onclick=()=>{let e=g.emailInputArea,t=e.value,n=g.passwordInputArea,i=n.value;firebase.auth().createUserWithEmailAndPassword(t,i).then((function(){})).catch((function(t){e.value="",n.value="",e.setAttribute("placeholder","Invalid email");t.code,t.message}))}}},firebase.auth().isSignInWithEmailLink(window.location.href)){var n=window.localStorage.getItem("emailForSignIn");if(!n){g.createSignInContainer(),g.reconfirmEmail();let e=g.emailInputArea;g.submit.onclick=()=>{n=e.value,firebase.auth().signInWithEmailLink(n,window.location.href).then((function(e){window.localStorage.removeItem("emailForSignIn");let t=document.querySelector("body"),n=g.signInContainer;t.removeChild(n)})).catch((function(t){e.value="",e.setAttribute("placeholder","Invalid Email")}))}}n&&firebase.auth().signInWithEmailLink(n,window.location.href).then((function(e){window.localStorage.removeItem("emailForSignIn");let t=document.querySelector("body"),n=g.signInContainer;t.removeChild(n)})).catch((function(e){let t=g.emailInputArea;t.value="",t.setAttribute("placeholder","Invalid Email")}))}},E=()=>{let e=document.querySelector("#sidebarToggleMenu");e.addEventListener("click",(function(){let t=document.querySelector("#sidebar");if(e.classList.contains("unclicked")){e.classList.remove("unclicked"),e.classList.add("clicked"),t.style.left="0",window.addEventListener("click",(function(n){n.target.id.includes("sidebar")||(e.classList.add("unclicked"),e.classList.remove("clicked"),t.style.left="-300px")}))}else e.classList.add("unclicked"),e.classList.remove("clicked"),t.style.left="-300px"}));const t=(e,t,n,i,a,r)=>({description:e,dueDate:t,project:n,completion:i,filter:a,details:r});let n=[];const i=new Map;f.onAuthStateChanged(e=>{e&&("SDzLU3EAgWOXI25mAkPNM4KslHj2"==e.uid?A.collection("users").doc("whfH5WOfbwe6ZQfXmEGWgYc2WRj2").get().then((function(e){n=[...e.data().userTaskArray],C(n),l(),b()})):A.collection("users").doc(e.uid).get().then((function(e){e.data()?n=[...e.data().userTaskArray]:o(),C(n),l(),b()})))});function o(){f.onAuthStateChanged(e=>{if(e){let t=A.collection("users").doc(e.uid);t.get().then((function(e){e.exists,t.set({userTaskArray:n})})).catch((function(e){}))}})}function l(){for(let e=0;e<n.length;e++)if(""!=n[e].project)if(i.has(n[e].project)){let t=i.get(n[e].project);t+=1,i.set(n[e].project,t)}else i.set(n[e].project,1)}const d=e=>{if(""!=e)if(i.has(e)){let t=i.get(e);t+=1,i.set(e,t)}else i.set(e,1)},c=e=>{if(i.has(e)){let t=i.get(e);t-=1,i.set(e,t)}0==i.get(e)&&i.delete(e)},u=document.querySelector("#dueDateTitle");u.setAttribute("class","descending"),u.addEventListener("click",(function(){let e,t=document.querySelector("#dateArrowToggle");u.classList.contains("descending")?(u.classList.remove("descending"),u.classList.add("ascending"),e=n.sort((function(e,t){return r(a(new Date(e.dueDate)),a(new Date(t.dueDate)))?1:-1})),t.style.transform="rotate(180deg)"):u.classList.contains("ascending")&&(u.classList.add("descending"),u.classList.remove("ascending"),e=n.sort((function(e,t){return r(a(new Date(e.dueDate)),a(new Date(t.dueDate)))?-1:1})),t.style.transform="rotate(0deg)");C(e)}));function g(e){let t=e.target.id;(e=>{if("sidebarHomeTab"==e)for(let e=0;e<n.length;e++)n[e].filter="yes";else for(let t=0;t<n.length;t++)n[t].project==e?n[t].filter="yes":n[t].filter=""})(t),C(n);let i=document.querySelector("#topRowTitle");i.innerHTML="sidebarHomeTab"==t?"Home":t}document.querySelector("#sidebarHomeTab").addEventListener("click",g),document.querySelector("#sidebarCalendarTab").addEventListener("click",(function(e){!function(){for(let e=0;e<n.length;e++){s(a(new Date(n[e].dueDate)))?n[e].filter="yes":n[e].filter=""}}(),C(n),document.querySelector("#topRowTitle").innerHTML="Today"})),document.querySelector("#sidebarWeekTab").addEventListener("click",(function(){!function(){for(let e=0;e<n.length;e++){m(a(new Date(n[e].dueDate)))?n[e].filter="yes":n[e].filter=""}}(),C(n),document.querySelector("#topRowTitle").innerHTML="Week"}));let h=(e,t)=>{let n=document.querySelector("#sidebarUserProjects"),i=document.createElement("div");i.setAttribute("id",e),i.setAttribute("class","userProject"),i.addEventListener("click",g);let a=document.createElement("div");a.setAttribute("class","projectName"),a.innerHTML=e;let r=document.createElement("div");r.setAttribute("class","taskNumberContainer");let o=document.createElement("div");o.setAttribute("class","taskNumber"),o.innerHTML=t,r.appendChild(o),i.appendChild(r),i.appendChild(a),n.appendChild(i)};const b=()=>{(()=>{let e=document.querySelector("#sidebarUserProjects");k(e)})(),(()=>{const e=i.keys(),t=i.values(),n=i[Symbol.iterator]();for(const i of n)h(e.next().value,t.next().value)})()};let v=(e,t,i)=>{const l=document.createElement("li");l.setAttribute("class","userTask");const s=document.createElement("div");s.setAttribute("class","taskDescription"),s.innerHTML=e;const d=document.createElement("div");d.setAttribute("class","taskDueDate"),d.innerHTML=t,r(a(new Date(t)),p())&&(d.style.color="red");const u=document.createElement("img");u.src="images/checkboxEmpty.svg",u.setAttribute("class","emptyCheckBox");const m=document.createElement("img");m.src="images/checkbox.svg",m.setAttribute("class","checkedBox");const g=document.createElement("img");g.src="images/edit.svg",g.setAttribute("class","editIcon");const h=document.createElement("img");h.src="images/delete.svg",h.setAttribute("class","deleteIcon"),"complete"==i?(l.appendChild(m),l.classList.add("checked")):""==i&&l.appendChild(u),l.appendChild(s),l.appendChild(d),l.appendChild(g),l.appendChild(h);const f=e=>{e.target==u?(l.removeChild(u),l.insertBefore(m,s),l.classList.add("checked"),n[l.id].completion="complete"):e.target==m&&(l.removeChild(m),l.insertBefore(u,s),l.classList.remove("checked"),n[l.id].completion="")};u.addEventListener("click",f),m.addEventListener("click",f);h.addEventListener("click",e=>{n[l.id].description="",C(n),c(n[l.id].project),n[l.id].project="",b(),o()});g.addEventListener("click",()=>{let e=document.querySelector("#userTaskContainer"),t=T(n[l.id].description,n[l.id].details,n[l.id].dueDate,n[l.id].project,l.id).addTaskFormContainer;t.setAttribute("class","editing"),e.insertBefore(t,l),e.removeChild(l),c(n[l.id].project),$("#dueDate").datepicker({format:"m/dd/yyyy",todayBtn:"linked",keyboardNavigation:!1,autoclose:!0,todayHighlight:!0})});return s.addEventListener("click",()=>{let e=document.createElement("div");e.setAttribute("class","taskPopUpContainer");let t=document.createElement("div");t.setAttribute("class","taskPopUpTopBar");let i=document.createElement("div");i.setAttribute("class","taskPopUpTitle"),i.innerHTML=n[l.id].description;let a=document.createElement("div");a.setAttribute("class","taskPopUpDetails"),null!=n[l.id].details&&""!=n[l.id].details?a.innerHTML="Details: "+n[l.id].details:a.innerHTML="Details: none";let r=document.createElement("img");r.src="images/add.svg",r.setAttribute("id","closePop");let o=document.createElement("div");o.setAttribute("class","taskPopUpDueDate"),o.innerHTML="Due: "+n[l.id].dueDate;let s=document.createElement("div");s.setAttribute("class","taskPopUpProject"),s.innerHTML="Project: "+n[l.id].project,e.appendChild(t),t.appendChild(i),e.appendChild(r),e.appendChild(o),e.appendChild(s),e.appendChild(a);let d=document.createElement("div");d.setAttribute("id","centerer"),d.appendChild(e);let c=document.createElement("div");c.setAttribute("id","mask");let u=document.querySelector("body");u.appendChild(d),u.appendChild(c),r.addEventListener("click",(function(){u.removeChild(d),u.removeChild(c)}))}),{userTask:l}},y=e=>{document.querySelector("#userTaskContainer").appendChild(e)};const k=e=>{for(;e.firstElementChild;)e.removeChild(e.firstElementChild)};let C=e=>{let t=document.querySelector("#userTaskContainer");k(t),(e=>{for(let t=0;t<e.length;t++)if(""!=e[t].description&&"yes"==e[t].filter){let n=v(e[t].description,e[t].dueDate,e[t].completion).userTask;n.setAttribute("id",""+t),y(n)}})(e),L("userTaskContainer")},T=(e,i,a,r,l)=>{let s,c=document.querySelector("#topRowTitle");c=c.innerHTML,l&&(s=l);const u=document.createElement("form");u.setAttribute("id","addTaskFormContainer");const m=document.createElement("div");m.setAttribute("id","addTaskTopBox");const p=document.createElement("textarea");p.setAttribute("name","message"),p.setAttribute("id","descriptionArea"),p.setAttribute("placeholder","Title: Laundry"),p.setAttribute("maxlength","35"),p.setAttribute("required","true"),e&&(p.value=e);const g=document.createElement("textarea");g.setAttribute("name","details"),g.setAttribute("id","detailsArea"),g.setAttribute("placeholder","Details: e.g. fold laundry at 4pm"),i&&(g.value=i);const h=document.createElement("input");h.setAttribute("type","text"),h.setAttribute("id","dueDate"),h.setAttribute("placeholder","Due Date"),h.setAttribute("autocomplete","off"),h.setAttribute("class","form-control"),a&&(h.value=a);const f=document.createElement("input");f.setAttribute("type","text"),f.setAttribute("id","inputProject"),f.setAttribute("placeholder","Project Name"),f.setAttribute("autocomplete","off"),f.setAttribute("class","form-control"),r&&(f.value=r),"Home"!=c&&"Today"!=c&&"Week"!=c&&(f.value=c),m.appendChild(p),m.appendChild(g),m.appendChild(h),m.appendChild(f);const v=document.createElement("div");v.setAttribute("id","addTaskBottomRow");const y=document.createElement("img");y.src="images/checkmark.svg";const k=document.createElement("img");k.src="images/cancel.svg",v.appendChild(y),v.appendChild(k),u.appendChild(m),u.appendChild(v);const A=()=>{let e=p.value,t=g.value;return"undefined"==t&&(t=""),{getUserDescription:e,getUserDetails:t,getUserDueDate:h.value,getProjectName:f.value}};return y.addEventListener("click",(function(e){if(u.classList.contains("editing"))n[s].description=p.value,n[s].details=g.value,n[s].dueDate=h.value,n[s].project=f.value,d(f.value),C(n),b(),o();else if(""!=p.value){(e=>{let i=t(e.getUserDescription,e.getUserDueDate,e.getProjectName,"","yes",e.getUserDetails);n.push(i)})(A()),d(f.value),p.value="",g.value="",h.value="",f.value="",C(n),b(),o()}else p.setAttribute("placeholder","Must include a title"),p.setAttribute("class","noDescription")})),k.addEventListener("click",(function(){u.classList.contains("editing")&&d(f.value);C(n),b()})),{addTaskFormContainer:u,getUserData:A}},E=e=>{let t=document.querySelector("#"+e),n=T();t.appendChild(n.addTaskFormContainer)},L=e=>{let t=document.querySelector("#"+e),n=(()=>{const e=document.createElement("li");e.setAttribute("class","addTaskButton");const t=document.createElement("img");t.src="images/add.svg";const n=document.createElement("div");return n.setAttribute("class","taskDescription"),n.innerHTML="Add Task",e.appendChild(t),e.appendChild(n),e.addEventListener("click",(function(){let e=document.querySelector("#userTaskContainer");e.removeChild(e.lastElementChild),E("userTaskContainer"),$("#dueDate").datepicker({format:"m/dd/yyyy",todayBtn:"linked",keyboardNavigation:!1,autoclose:!0,todayHighlight:!0})})),{addTaskButton:e}})();t.appendChild(n.addTaskButton)};return C(n),{taskFactoryFunc:t,projectHashMap:i}}}]);