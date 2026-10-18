// Offline support. VERSION must match APPV in index.html.
const VERSION="v20261018c";const CACHE="a350cq-"+VERSION;
const ASSETS=["./", "index.html", "manifest.webmanifest", "favicon.ico", "favicon-16.png", "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "img/logo-96.png", "img/profiles/emg-engine-failure-after-v1.jpg", "img/profiles/emg-engine-out-precision.jpg", "img/profiles/emg-slat-flap.jpg", "img/profiles/emg-windshear-escape.jpg", "img/profiles/nrm-cat1-ils.jpg", "img/profiles/oth-xwind-tailwind-takeoff.jpg", "img/profiles/nrm-fls-approach.jpg", "img/profiles/nrm-go-around.jpg", "img/profiles/nrm-normal-landing.jpg", "img/profiles/nrm-normal-takeoff.jpg", "img/profiles/nrm-visual-approach.jpg", "img/profiles/rto-rejected-takeoff.jpg", "img/slide10.png", "img/slide8.png", "img/slide9.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("a350cq-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(u.searchParams.has("_"))return; // version check: always straight to network
const isPage=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
if(isPage){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put("./",cp))}return res}).catch(()=>caches.match("./",{ignoreSearch:true}).then(m=>m||caches.match("index.html",{ignoreSearch:true}))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})))});
