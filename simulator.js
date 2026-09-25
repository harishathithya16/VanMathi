(function(){"use strict";var Kc=document.createElement("style");Kc.textContent=`:root{font-family:Inter,Segoe UI,Arial,sans-serif;color:#eef7ee;background:#07130d;font-synthesis:none}*{box-sizing:border-box}html,body,#app{width:100%;height:100%;margin:0;overflow:hidden}body{background:#07130d}canvas{display:block}#hud{position:fixed;inset:0;pointer-events:none}.panel{background:#07140de6;border:1px solid rgba(117,190,137,.22);box-shadow:0 16px 45px #00000047;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-radius:16px}#brand{position:absolute;top:16px;left:50%;transform:translate(-50%);padding:13px 20px;display:flex;gap:12px;align-items:center;min-width:440px;justify-content:center}#brand strong{font-size:17px;letter-spacing:.3px}#brand span{font-size:10px;letter-spacing:1.3px;color:#9bb2a0}#live{color:#86e6a5;font-size:11px;font-weight:800;letter-spacing:1px}#dataFeedToggle{background:#0f3a23;border:1px solid #2d7048;color:#a4efb6;border-radius:6px;padding:4px 8px;font-size:9px;font-weight:700;cursor:pointer;pointer-events:auto}#leftStack{position:absolute;top:16px;left:16px;width:285px;display:flex;flex-direction:column;gap:8px;max-height:calc(100vh - 100px);overflow-y:auto;overflow-x:hidden;pointer-events:none;z-index:12}#leftStack .panel,#leftStack .side-card{pointer-events:auto;flex-shrink:0}#controls{position:relative;top:auto;left:auto;width:100%;padding:14px 16px}.eyebrow{font-size:10px;letter-spacing:1.7px;font-weight:900;color:#a8b8aa;margin-bottom:6px}h2{font-size:14px;margin:0 0 10px}.row{display:flex;justify-content:space-between;align-items:center;margin:8px 0 5px;font-size:12px;color:#b8c7bb}.compact-row{margin:6px 0 4px}select,input[type=range],button{width:100%}select{background:#0d2719;color:#eff8f0;border:1px solid #31583e;border-radius:10px;padding:8px 10px;font-size:12px}input[type=range]{accent-color:#64d58d}button{background:#0f3a23;border:1px solid #2d7048;color:#eff8f0;border-radius:10px;padding:8px;font-weight:800;cursor:pointer;font-size:11px}button:hover{filter:brightness(1.15)}.buttons,.checks{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px}.checks label{font-size:10px;color:#b9c9bd}.checks input{accent-color:#62d28c}#stats{position:absolute;top:16px;right:16px;display:flex;gap:6px}.stat{min-width:96px;padding:10px 11px}.stat b{display:block;font-size:15px}.stat small{font-size:8px;color:#91a397;letter-spacing:1px}#info{position:absolute;left:16px;bottom:10px;width:430px;padding:12px 15px;pointer-events:none}#info strong{font-size:13px}.muted{font-size:11px;color:#9db0a2;line-height:1.45;margin-top:5px}.event-readout{font-size:10px;color:#76d99a;margin-top:8px;font-weight:700;letter-spacing:.2px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.metric{background:#ffffff09;padding:9px;border-radius:9px}.metric small{display:block;color:#829687;font-size:9px}.metric b{font-size:13px}#hint{position:absolute;left:50%;bottom:19px;transform:translate(-50%);font-size:10px;color:#b9c9bd;background:#040c08b3;padding:8px 12px;border-radius:999px}#cross{position:absolute;left:50%;top:50%;width:13px;height:13px;transform:translate(-50%,-50%)}#cross:before,#cross:after{content:"";position:absolute;background:#fffc}#cross:before{width:13px;height:1px;top:6px}#cross:after{height:13px;width:1px;left:6px}#loading{position:fixed;inset:0;display:grid;place-items:center;background:#07130d;z-index:20;transition:opacity .5s}.loadbox{width:370px;padding:24px;text-align:center}.bar{height:5px;background:#193324;border-radius:999px;overflow:hidden;margin-top:16px}.bar i{display:block;height:100%;width:0;background:#64d58d;transition:width .25s}#toast{position:absolute;top:86px;left:50%;transform:translate(-50%);padding:10px 14px;font-size:11px;opacity:0;transition:.2s;z-index:100}.show{opacity:1!important}@media(max-width:900px){#leftStack{width:245px}.stat:nth-child(n+3){display:none}#info{width:340px}}.event-readout{margin-top:8px;font-size:12px;color:#8fd6a8;min-height:16px}.side-card{pointer-events:auto}#zoneEnv{position:relative;left:auto;top:auto;width:100%;padding:10px 12px;max-height:none;overflow:visible;transform:none}.selected-zone{display:flex;flex-direction:column;gap:2px;margin-bottom:6px}.selected-zone span,.zone-sub{font-size:8px;color:#7f9786;text-transform:uppercase;letter-spacing:1px}.selected-zone b{font-size:11px;color:#cfe7d3}.env-row{display:flex;justify-content:space-between;align-items:center;margin-top:4px;font-size:9.5px;color:#9db0a2}.env-row b{color:#d9eadc;font-size:9.5px}.env-bar,.meter{height:4px;background:#182d20;border-radius:99px;overflow:hidden;margin-top:3px}.env-bar i,.meter i{display:block;height:100%;width:0;background:#55d58b;border-radius:99px;transition:width .25s}#sideDetails{position:absolute;right:16px;top:84px;width:280px;display:flex;flex-direction:column;gap:8px;max-height:calc(100vh - 100px);pointer-events:none}#sideDetails .side-card{pointer-events:auto;padding:11px}#mapCard{padding-bottom:9px!important}.side-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.side-title strong{font-size:11px;letter-spacing:1.2px;color:#d6ead9}.side-title span{font-size:8px;color:#79d89a;letter-spacing:1px;border:1px solid #2b6540;padding:4px 6px;border-radius:7px}#miniMap{height:116px;position:relative;overflow:hidden;border:1px solid rgba(105,173,123,.2);border-radius:8px;background:linear-gradient(145deg,#0b2116,#123522)}.map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(122,190,139,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(122,190,139,.12) 1px,transparent 1px);background-size:25% 50%}.zone-dot{position:absolute;font-size:7px;color:#9eb9a4;background:#040f09a6;padding:3px 4px;border-radius:4px}.zone-dot.active{color:#a4efb6;border:1px solid #4bd37e;box-shadow:0 0 12px #4bd37e59}.z1{left:8%;top:12%}.z2{left:39%;top:10%}.z3{right:7%;top:20%}.z4{left:47%;top:43%}.z5{left:13%;top:63%}.z6{left:65%;top:62%}.z7{right:12%;top:72%}.z8{left:37%;top:78%}.map-legend{display:flex;gap:8px;flex-wrap:wrap;margin-top:7px;font-size:8px;color:#8da894}#detailZone h2{color:#79dc9b;margin:0 0 1px;font-size:15px}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:8px 0}.detail-grid>div{background:#ffffff09;padding:6px;border-radius:7px}.detail-grid small{display:block;color:#718578;font-size:8px;margin-bottom:3px}.detail-grid b{font-size:10px}.meter-row{display:flex;justify-content:space-between;margin-top:7px;font-size:9px;color:#9db0a2}.meter-row b{color:#d7e9da}.meter{height:4px;margin-top:4px}#alertsCard{max-height:220px;overflow:hidden}#alertsFeed{display:flex;flex-direction:column}.alert-row{display:grid;grid-template-columns:50px 50px 1fr 40px 45px;gap:4px;align-items:center;padding:7px 0;border-top:1px solid rgba(117,190,137,.1);font-size:7.5px}.sev{font-size:7px;text-align:center}.sev.high{color:#ff7c63}.sev.medium{color:#f0cf72}.sev.low{color:#7edb9c}#dispatchModal{position:fixed;inset:0;background:#000000b3;z-index:200;display:none;place-items:center;pointer-events:auto}#dispatchModal.active{display:grid}.dispatch-box{width:420px;padding:20px;background:#081810;border:1px solid #4bd37e;border-radius:12px;box-shadow:0 0 30px #4bd37e4d}.dispatch-box h3{margin:0 0 12px;font-size:14px;color:#f44;letter-spacing:1px}.dispatch-field{font-size:11px;margin:6px 0;display:flex;justify-content:space-between;color:#9bb2a0}.dispatch-field b{color:#eef7ee}.dispatch-actions{display:flex;gap:10px;margin-top:16px}.dispatch-actions button{font-size:11px;padding:8px}@media(max-width:1100px){#sideDetails{width:250px}#leftStack{width:260px}}@media(max-width:900px){#sideDetails,#leftStack{display:none}}
/*$vite$:1*/`,document.head.appendChild(Kc);const Aa="179",Au=0,jc=1,Ru=2,Jc=1,Qc=2,An=3,Vn=0,Wt=1,sn=2,Wn=0,Ri=1,tr=2,el=3,tl=4,Cu=5,si=100,Pu=101,Lu=102,Du=103,Iu=104,Uu=200,Nu=201,Fu=202,Ou=203,Ra=204,Ca=205,zu=206,Bu=207,ku=208,Hu=209,Gu=210,Vu=211,Wu=212,Xu=213,qu=214,Pa=0,La=1,Da=2,Ci=3,Ia=4,Ua=5,Na=6,Fa=7,nl=0,Yu=1,$u=2,Xn=0,Zu=1,Ku=2,ju=3,il=4,Ju=5,Qu=6,eh=7,sl=300,Pi=301,Li=302,Oa=303,za=304,nr=306,Ba=1e3,ri=1001,ka=1002,Yt=1003,th=1004,ir=1005,vn=1006,Ha=1007,ai=1008,Mn=1009,rl=1010,al=1011,_s=1012,Ga=1013,oi=1014,Sn=1015,xs=1016,Va=1017,Wa=1018,vs=1020,ol=35902,cl=1021,ll=1022,dn=1023,Ms=1026,Ss=1027,Xa=1028,qa=1029,dl=1030,Ya=1031,$a=1033,sr=33776,rr=33777,ar=33778,or=33779,Za=35840,Ka=35841,ja=35842,Ja=35843,Qa=36196,eo=37492,to=37496,no=37808,io=37809,so=37810,ro=37811,ao=37812,oo=37813,co=37814,lo=37815,uo=37816,ho=37817,fo=37818,po=37819,mo=37820,go=37821,cr=36492,_o=36494,xo=36495,ul=36283,vo=36284,Mo=36285,So=36286,nh=3200,ih=3201,hl=0,sh=1,qn="",$t="srgb",Di="srgb-linear",lr="linear",at="srgb",Ii=7680,fl=519,rh=512,ah=513,oh=514,pl=515,ch=516,lh=517,dh=518,uh=519,yo=35044,hh=35048,ml="300 es",yn=2e3,dr=2001;class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gl=1234567;const ys=Math.PI/180,Es=180/Math.PI;function Rn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function Eo(n,e){return(n%e+e)%e}function fh(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function ph(n,e,t){return n!==e?(t-n)/(e-n):0}function bs(n,e,t){return(1-t)*n+t*e}function mh(n,e,t,i){return bs(n,e,1-Math.exp(-t*i))}function gh(n,e=1){return e-Math.abs(Eo(n,e*2)-e)}function _h(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function xh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function vh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Mh(n,e){return n+Math.random()*(e-n)}function Sh(n){return n*(.5-Math.random())}function yh(n){n!==void 0&&(gl=n);let e=gl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Eh(n){return n*ys}function bh(n){return n*Es}function Th(n){return(n&n-1)===0&&n!==0}function wh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ah(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Rh(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),f=r((e-i)/2),u=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*f,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*f,o*l);break;case"ZXZ":n.set(c*f,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const bt={DEG2RAD:ys,RAD2DEG:Es,generateUUID:Rn,clamp:Ze,euclideanModulo:Eo,mapLinear:fh,inverseLerp:ph,lerp:bs,damp:mh,pingpong:gh,smoothstep:_h,smootherstep:xh,randInt:vh,randFloat:Mh,randFloatSpread:Sh,seededRandom:yh,degToRad:Eh,radToDeg:bh,isPowerOfTwo:Th,ceilPowerOfTwo:wh,floorPowerOfTwo:Ah,setQuaternionFromProperEuler:Rh,normalize:st,denormalize:un};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ni{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],f=i[s+3];const u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==u||l!==p||h!==g){let m=1-o;const d=c*u+l*p+h*g+f*_,M=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const R=Math.sqrt(b),w=Math.atan2(R,d*M);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const v=o*M;if(c=c*m+u*v,l=l*m+p*v,h=h*m+g*v,f=f*m+_*v,m===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=R,l*=R,h*=R,f*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*f+c*p-l*u,e[t+1]=c*g+h*u+l*f-o*p,e[t+2]=l*g+h*p+o*u-c*f,e[t+3]=h*g-o*f-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),f=o(r/2),u=c(i/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"YZX":this._x=u*h*f+l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f-u*p*g;break;case"XZY":this._x=u*h*f-l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),f=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=a*f+this._w*u,this._x=i*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+c*l+a*f-o*h,this.y=i+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bo.copy(this).projectOnVector(e),this.sub(bo)}reflect(e){return this.sub(bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bo=new L,_l=new Ni;class Ve{constructor(e,t,i,s,r,a,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],u=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],M=s[1],b=s[4],v=s[7],R=s[2],w=s[5],C=s[8];return r[0]=a*_+o*M+c*R,r[3]=a*m+o*b+c*w,r[6]=a*d+o*v+c*C,r[1]=l*_+h*M+f*R,r[4]=l*m+h*b+f*w,r[7]=l*d+h*v+f*C,r[2]=u*_+p*M+g*R,r[5]=u*m+p*b+g*w,r[8]=u*d+p*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,p=l*r-a*c,g=t*f+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=u*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(To.makeScale(e,t)),this}rotate(e){return this.premultiply(To.makeRotation(-e)),this}translate(e,t){return this.premultiply(To.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const To=new Ve;function xl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ur(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ch(){const n=ur("canvas");return n.style.display="block",n}const vl={};function Fi(n){n in vl||(vl[n]=!0,console.warn(n))}function Ph(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Ml=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lh(){const n={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qn?lr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Di]:{primaries:e,whitePoint:i,transfer:lr,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),n}const et=Lh();function Cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Oi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let zi;class Dh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{zi===void 0&&(zi=ur("canvas")),zi.width=e.width,zi.height=e.height;const s=zi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=zi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ur("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Cn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cn(t[i]/255)*255):t[i]=Cn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ih=0;class wo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=Rn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ao(s[a].image)):r.push(Ao(s[a]))}else r=Ao(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ao(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Dh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uh=0;const Ro=new L;class Ot extends Ui{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=ri,s=ri,r=vn,a=ai,o=dn,c=Mn,l=Ot.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Rn(),this.name="",this.source=new wo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ro).x}get height(){return this.source.getSize(Ro).y}get depth(){return this.source.getSize(Ro).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ba:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ba:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null,Ot.DEFAULT_MAPPING=sl,Ot.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,i=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,v=(p+1)/2,R=(d+1)/2,w=(h+u)/4,C=(f+_)/4,P=(g+m)/4;return b>v&&b>R?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=w/i,r=C/i):v>R?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=w/s,r=P/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=C/r,s=P/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nh extends Ui{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Ot(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new wo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Nh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class yl extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fh extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class li{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),hr.copy(i.boundingBox)),hr.applyMatrix4(e.matrixWorld),this.union(hr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),fr.subVectors(this.max,Ts),Bi.subVectors(e.a,Ts),ki.subVectors(e.b,Ts),Hi.subVectors(e.c,Ts),Yn.subVectors(ki,Bi),$n.subVectors(Hi,ki),di.subVectors(Bi,Hi);let t=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-di.z,di.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,di.z,0,-di.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-di.y,di.x,0];return!Co(t,Bi,ki,Hi,fr)||(t=[1,0,0,0,1,0,0,0,1],!Co(t,Bi,ki,Hi,fr))?!1:(pr.crossVectors(Yn,$n),t=[pr.x,pr.y,pr.z],Co(t,Bi,ki,Hi,fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pn=[new L,new L,new L,new L,new L,new L,new L,new L],hn=new L,hr=new li,Bi=new L,ki=new L,Hi=new L,Yn=new L,$n=new L,di=new L,Ts=new L,fr=new L,pr=new L,ui=new L;function Co(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ui.fromArray(n,r);const o=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),c=e.dot(ui),l=t.dot(ui),h=i.dot(ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Oh=new li,ws=new L,Po=new L;class hi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Oh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ws.subVectors(e,this.center);const t=ws.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ws,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ws.copy(e.center).add(Po)),this.expandByPoint(ws.copy(e.center).sub(Po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ln=new L,Lo=new L,mr=new L,Zn=new L,Do=new L,gr=new L,Io=new L;class Uo{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Lo.copy(e).add(t).multiplyScalar(.5),mr.copy(t).sub(e).normalize(),Zn.copy(this.origin).sub(Lo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(mr),o=Zn.dot(this.direction),c=-Zn.dot(mr),l=Zn.lengthSq(),h=Math.abs(1-a*a);let f,u,p,g;if(h>0)if(f=a*c-o,u=a*o-c,g=r*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,p=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Lo).addScaledVector(mr,u),p}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);const i=Ln.dot(this.direction),s=Ln.dot(Ln)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,i,s,r){Do.subVectors(t,e),gr.subVectors(i,e),Io.crossVectors(Do,gr);let a=this.direction.dot(Io),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,e);const c=o*this.direction.dot(gr.crossVectors(Zn,gr));if(c<0)return null;const l=o*this.direction.dot(Do.cross(Zn));if(l<0||c+l>a)return null;const h=-o*Zn.dot(Io);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,i,s,r,a,o,c,l,h,f,u,p,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,f,u,p,g,_,m)}set(e,t,i,s,r,a,o,c,l,h,f,u,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Gi.setFromMatrixColumn(e,0).length(),r=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*f,g=o*h,_=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=p+g*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*f,g=l*h,_=l*f;t[0]=u+_*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*f,g=l*h,_=l*f;t[0]=u-_*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*f,g=o*h,_=o*f;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+_,t[1]=c*f,t[5]=_*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-u*f,t[8]=g*f+p,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=a*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zh,e,Bh)}lookAt(e,t,i){const s=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),Kn.crossVectors(i,Zt),Kn.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),Kn.crossVectors(i,Zt)),Kn.normalize(),_r.crossVectors(Zt,Kn),s[0]=Kn.x,s[4]=_r.x,s[8]=Zt.x,s[1]=Kn.y,s[5]=_r.y,s[9]=Zt.y,s[2]=Kn.z,s[6]=_r.z,s[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],u=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],M=i[3],b=i[7],v=i[11],R=i[15],w=s[0],C=s[4],P=s[8],E=s[12],y=s[1],A=s[5],O=s[9],G=s[13],H=s[2],J=s[6],V=s[10],ne=s[14],W=s[3],le=s[7],pe=s[11],Ae=s[15];return r[0]=a*w+o*y+c*H+l*W,r[4]=a*C+o*A+c*J+l*le,r[8]=a*P+o*O+c*V+l*pe,r[12]=a*E+o*G+c*ne+l*Ae,r[1]=h*w+f*y+u*H+p*W,r[5]=h*C+f*A+u*J+p*le,r[9]=h*P+f*O+u*V+p*pe,r[13]=h*E+f*G+u*ne+p*Ae,r[2]=g*w+_*y+m*H+d*W,r[6]=g*C+_*A+m*J+d*le,r[10]=g*P+_*O+m*V+d*pe,r[14]=g*E+_*G+m*ne+d*Ae,r[3]=M*w+b*y+v*H+R*W,r[7]=M*C+b*A+v*J+R*le,r[11]=M*P+b*O+v*V+R*pe,r[15]=M*E+b*G+v*ne+R*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+r*c*f-s*l*f-r*o*u+i*l*u+s*o*p-i*c*p)+_*(+t*c*p-t*l*u+r*a*u-s*a*p+s*l*h-r*c*h)+m*(+t*l*f-t*o*p-r*a*f+i*a*p+r*o*h-i*l*h)+d*(-s*o*h-t*c*f+t*o*u+s*a*f-i*a*u+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],M=f*m*l-_*u*l+_*c*p-o*m*p-f*c*d+o*u*d,b=g*u*l-h*m*l-g*c*p+a*m*p+h*c*d-a*u*d,v=h*_*l-g*f*l+g*o*p-a*_*p-h*o*d+a*f*d,R=g*f*c-h*_*c-g*o*u+a*_*u+h*o*m-a*f*m,w=t*M+i*b+s*v+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=M*C,e[1]=(_*u*r-f*m*r-_*s*p+i*m*p+f*s*d-i*u*d)*C,e[2]=(o*m*r-_*c*r+_*s*l-i*m*l-o*s*d+i*c*d)*C,e[3]=(f*c*r-o*u*r-f*s*l+i*u*l+o*s*p-i*c*p)*C,e[4]=b*C,e[5]=(h*m*r-g*u*r+g*s*p-t*m*p-h*s*d+t*u*d)*C,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*d-t*c*d)*C,e[7]=(a*u*r-h*c*r+h*s*l-t*u*l-a*s*p+t*c*p)*C,e[8]=v*C,e[9]=(g*f*r-h*_*r-g*i*p+t*_*p+h*i*d-t*f*d)*C,e[10]=(a*_*r-g*o*r+g*i*l-t*_*l-a*i*d+t*o*d)*C,e[11]=(h*o*r-a*f*r-h*i*l+t*f*l+a*i*p-t*o*p)*C,e[12]=R*C,e[13]=(h*_*s-g*f*s+g*i*u-t*_*u-h*i*m+t*f*m)*C,e[14]=(g*o*s-a*_*s-g*i*c+t*_*c+a*i*m-t*o*m)*C,e[15]=(a*f*s-h*o*s+h*i*c-t*f*c-a*i*u+t*o*u)*C,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,p=r*h,g=r*f,_=a*h,m=a*f,d=o*f,M=c*l,b=c*h,v=c*f,R=i.x,w=i.y,C=i.z;return s[0]=(1-(_+d))*R,s[1]=(p+v)*R,s[2]=(g-b)*R,s[3]=0,s[4]=(p-v)*w,s[5]=(1-(u+d))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+b)*C,s[9]=(m-M)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Gi.set(s[0],s[1],s[2]).length();const a=Gi.set(s[4],s[5],s[6]).length(),o=Gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],fn.copy(this);const l=1/r,h=1/a,f=1/o;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=f,fn.elements[9]*=f,fn.elements[10]*=f,t.setFromRotationMatrix(fn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=yn,c=!1){const l=this.elements,h=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===yn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===dr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=yn,c=!1){const l=this.elements,h=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===yn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===dr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Gi=new L,fn=new rt,zh=new L(0,0,0),Bh=new L(1,1,1),Kn=new L,_r=new L,Zt=new L,El=new rt,bl=new Ni;class pn{constructor(e=0,t=0,i=0,s=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ze(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bl.setFromEuler(this),this.setFromQuaternion(bl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kh=0;const wl=new L,Vi=new Ni,Dn=new rt,xr=new L,As=new L,Hh=new L,Gh=new Ni,Al=new L(1,0,0),Rl=new L(0,1,0),Cl=new L(0,0,1),Pl={type:"added"},Vh={type:"removed"},Wi={type:"childadded",child:null},No={type:"childremoved",child:null};class Tt extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new L,t=new pn,i=new Ni,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ve}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Al,e)}rotateY(e){return this.rotateOnAxis(Rl,e)}rotateZ(e){return this.rotateOnAxis(Cl,e)}translateOnAxis(e,t){return wl.copy(e).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Al,e)}translateY(e){return this.translateOnAxis(Rl,e)}translateZ(e){return this.translateOnAxis(Cl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xr.copy(e):xr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(As,xr,this.up):Dn.lookAt(xr,As,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),Vi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pl),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vh),No.child=e,this.dispatchEvent(No),No.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pl),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,e,Hh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,Gh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Tt.DEFAULT_UP=new L(0,1,0),Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new L,In=new L,Fo=new L,Un=new L,Xi=new L,qi=new L,Ll=new L,Oo=new L,zo=new L,Bo=new L,ko=new ot,Ho=new ot,Go=new ot;class rn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),mn.subVectors(e,t),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){mn.subVectors(s,t),In.subVectors(i,t),Fo.subVectors(e,t);const a=mn.dot(mn),o=mn.dot(In),c=mn.dot(Fo),l=In.dot(In),h=In.dot(Fo),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return ko.setScalar(0),Ho.setScalar(0),Go.setScalar(0),ko.fromBufferAttribute(e,t),Ho.fromBufferAttribute(e,i),Go.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ko,r.x),a.addScaledVector(Ho,r.y),a.addScaledVector(Go,r.z),a}static isFrontFacing(e,t,i,s){return mn.subVectors(i,t),In.subVectors(e,t),mn.cross(In).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),mn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return rn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Xi.subVectors(s,i),qi.subVectors(r,i),Oo.subVectors(e,i);const c=Xi.dot(Oo),l=qi.dot(Oo);if(c<=0&&l<=0)return t.copy(i);zo.subVectors(e,s);const h=Xi.dot(zo),f=qi.dot(zo);if(h>=0&&f<=h)return t.copy(s);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Xi,a);Bo.subVectors(e,r);const p=Xi.dot(Bo),g=qi.dot(Bo);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(qi,o);const m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return Ll.subVectors(r,s),o=(f-h)/(f-h+(p-g)),t.copy(s).addScaledVector(Ll,o);const d=1/(m+_+u);return a=_*d,o=u*d,t.copy(i).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Vo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ne{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=Eo(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Vo(a,r,e+1/3),this.g=Vo(a,r,e),this.b=Vo(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const i=Dl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return et.workingToColorSpace(zt.copy(this),e),Math.round(Ze(zt.r*255,0,255))*65536+Math.round(Ze(zt.g*255,0,255))*256+Math.round(Ze(zt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(zt.copy(this),t);const i=zt.r,s=zt.g,r=zt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=$t){et.workingToColorSpace(zt.copy(this),e);const t=zt.r,i=zt.g,s=zt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(vr);const i=bs(jn.h,vr.h,t),s=bs(jn.s,vr.s,t),r=bs(jn.l,vr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Ne;Ne.NAMES=Dl;let Wh=0;class Jn extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Rn(),this.name="",this.type="Material",this.blending=Ri,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ra,this.blendDst=Ca,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(i.blending=this.blending),this.side!==Vn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ra&&(i.blendSrc=this.blendSrc),this.blendDst!==Ca&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mr extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new L,Sr=new we;let Xh=0;class Ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=yo,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Sr.fromBufferAttribute(this,t),Sr.applyMatrix3(e),this.setXY(t,Sr.x,Sr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==yo&&(e.usage=this.usage),e}}class Il extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ul extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class pt extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}let qh=0;const an=new rt,Wo=new Tt,Yi=new L,Kt=new li,Rs=new li,Dt=new L;class gt extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xl(e)?Ul:Il)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return Wo.lookAt(e),Wo.updateMatrix(),this.applyMatrix4(Wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Kt.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(Kt.min,Rs.min),Kt.expandByPoint(Dt),Dt.addVectors(Kt.max,Rs.max),Kt.expandByPoint(Dt)):(Kt.expandByPoint(Rs.min),Kt.expandByPoint(Rs.max))}Kt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Dt.fromBufferAttribute(o,l),c&&(Yi.fromBufferAttribute(e,l),Dt.add(Yi)),s=Math.max(s,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<i.count;P++)o[P]=new L,c[P]=new L;const l=new L,h=new L,f=new L,u=new we,p=new we,g=new we,_=new L,m=new L;function d(P,E,y){l.fromBufferAttribute(i,P),h.fromBufferAttribute(i,E),f.fromBufferAttribute(i,y),u.fromBufferAttribute(r,P),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(l),f.sub(l),p.sub(u),g.sub(u);const A=1/(p.x*g.y-g.x*p.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(A),m.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(A),o[P].add(_),o[E].add(_),o[y].add(_),c[P].add(m),c[E].add(m),c[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let P=0,E=M.length;P<E;++P){const y=M[P],A=y.start,O=y.count;for(let G=A,H=A+O;G<H;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new L,v=new L,R=new L,w=new L;function C(P){R.fromBufferAttribute(s,P),w.copy(R);const E=o[P];b.copy(E),b.sub(R.multiplyScalar(R.dot(E))).normalize(),v.crossVectors(w,E);const A=v.dot(c[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,A)}for(let P=0,E=M.length;P<E;++P){const y=M[P],A=y.start,O=y.count;for(let G=A,H=A+O;G<H;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,f=new L;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*h;for(let d=0;d<h;d++)u[g++]=l[p++]}return new Ct(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nl=new rt,fi=new Uo,yr=new hi,Fl=new L,Er=new L,br=new L,Tr=new L,Xo=new L,wr=new L,Ol=new L,Ar=new L;class q extends Tt{constructor(e=new gt,t=new Mr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){wr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],f=r[c];h!==0&&(Xo.fromBufferAttribute(f,e),a?wr.addScaledVector(Xo,h):wr.addScaledVector(Xo.sub(t),h))}t.add(wr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(r),fi.copy(e.ray).recast(e.near),!(yr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(yr,Fl)===null||fi.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Nl.copy(r).invert(),fi.copy(e.ray).applyMatrix4(Nl),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,R=b;v<R;v+=3){const w=o.getX(v),C=o.getX(v+1),P=o.getX(v+2);s=Rr(this,d,e,i,l,h,f,w,C,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=o.getX(m),b=o.getX(m+1),v=o.getX(m+2);s=Rr(this,a,e,i,l,h,f,M,b,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,R=b;v<R;v+=3){const w=v,C=v+1,P=v+2;s=Rr(this,d,e,i,l,h,f,w,C,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=m,b=m+1,v=m+2;s=Rr(this,a,e,i,l,h,f,M,b,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Yh(n,e,t,i,s,r,a,o){let c;if(e.side===Wt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===Vn,o),c===null)return null;Ar.copy(o),Ar.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ar);return l<t.near||l>t.far?null:{distance:l,point:Ar.clone(),object:n}}function Rr(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,Er),n.getVertexPosition(c,br),n.getVertexPosition(l,Tr);const h=Yh(n,e,t,i,Er,br,Tr,Ol);if(h){const f=new L;rn.getBarycoord(Ol,Er,br,Tr,f),s&&(h.uv=rn.getInterpolatedAttribute(s,o,c,l,f,new we)),r&&(h.uv1=rn.getInterpolatedAttribute(r,o,c,l,f,new we)),a&&(h.normal=rn.getInterpolatedAttribute(a,o,c,l,f,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new L,materialIndex:0};rn.getNormal(Er,br,Tr,u.normal),h.face=u,h.barycoord=f}return h}class Qn extends gt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(f,2));function g(_,m,d,M,b,v,R,w,C,P,E){const y=v/C,A=R/P,O=v/2,G=R/2,H=w/2,J=C+1,V=P+1;let ne=0,W=0;const le=new L;for(let pe=0;pe<V;pe++){const Ae=pe*A-G;for(let Ye=0;Ye<J;Ye++){const _t=Ye*y-O;le[_]=_t*M,le[m]=Ae*b,le[d]=H,l.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[d]=w>0?1:-1,h.push(le.x,le.y,le.z),f.push(Ye/C),f.push(1-pe/P),ne+=1}}for(let pe=0;pe<P;pe++)for(let Ae=0;Ae<C;Ae++){const Ye=u+Ae+J*pe,_t=u+Ae+J*(pe+1),dt=u+(Ae+1)+J*(pe+1),Z=u+(Ae+1)+J*pe;c.push(Ye,_t,Z),c.push(_t,dt,Z),W+=6}o.addGroup(p,W,E),p+=W,u+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const s in i)e[s]=i[s]}return e}function $h(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function zl(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Zh={clone:$i,merge:kt};var Kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kh,this.fragmentShader=jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=$h(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bl extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new L,kl=new we,Hl=new we;class jt extends Bl{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Es*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ti.x,ti.y).multiplyScalar(-e/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ti.x,ti.y).multiplyScalar(-e/ti.z)}getViewSize(e,t){return this.getViewBounds(e,kl,Hl),t.subVectors(Hl,kl)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ys*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zi=-90,Ki=1;class Jh extends Tt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Zi,Ki,e,t);s.layers=this.layers,this.add(s);const r=new jt(Zi,Ki,e,t);r.layers=this.layers,this.add(r);const a=new jt(Zi,Ki,e,t);a.layers=this.layers,this.add(a);const o=new jt(Zi,Ki,e,t);o.layers=this.layers,this.add(o);const c=new jt(Zi,Ki,e,t);c.layers=this.layers,this.add(c);const l=new jt(Zi,Ki,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===dr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(f,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Gl extends Ot{constructor(e=[],t=Pi,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qh extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Gl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Qn(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wt,blending:Wn});r.uniforms.tEquirect.value=t;const a=new q(s,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=vn),new Jh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class je extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ef={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ef)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new je;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Yo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new Yo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tf extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class nf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=yo,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ht=new L;class Cr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Cr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vl extends Jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ji;const Cs=new L,Ji=new L,Qi=new L,es=new we,Ps=new we,Wl=new rt,Pr=new L,Ls=new L,Lr=new L,Xl=new we,$o=new we,ql=new we;class sf extends Tt{constructor(e=new Vl){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new nf(t,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new Cr(i,3,0,!1)),ji.setAttribute("uv",new Cr(i,2,3,!1))}this.geometry=ji,this.material=e,this.center=new we(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ji.setFromMatrixScale(this.matrixWorld),Wl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Qi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ji.multiplyScalar(-Qi.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Dr(Pr.set(-.5,-.5,0),Qi,a,Ji,s,r),Dr(Ls.set(.5,-.5,0),Qi,a,Ji,s,r),Dr(Lr.set(.5,.5,0),Qi,a,Ji,s,r),Xl.set(0,0),$o.set(1,0),ql.set(1,1);let o=e.ray.intersectTriangle(Pr,Ls,Lr,!1,Cs);if(o===null&&(Dr(Ls.set(-.5,.5,0),Qi,a,Ji,s,r),$o.set(0,1),o=e.ray.intersectTriangle(Pr,Lr,Ls,!1,Cs),o===null))return;const c=e.ray.origin.distanceTo(Cs);c<e.near||c>e.far||t.push({distance:c,point:Cs.clone(),uv:rn.getInterpolation(Cs,Pr,Ls,Lr,Xl,$o,ql,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Dr(n,e,t,i,s,r){es.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ps.x=r*es.x-s*es.y,Ps.y=s*es.x+r*es.y):Ps.copy(es),n.copy(e),n.x+=Ps.x,n.y+=Ps.y,n.applyMatrix4(Wl)}class rf extends Ot{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Yt,h=Yt,f,u){super(null,a,o,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yl extends Ct{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ts=new rt,$l=new rt,Ir=[],Zl=new li,af=new rt,Ds=new q,Is=new hi;class Ur extends q{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,af)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ts),Zl.copy(e.boundingBox).applyMatrix4(ts),this.boundingBox.union(Zl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ts),Is.copy(e.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Is)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ds.geometry=this.geometry,Ds.material=this.material,Ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(i),e.ray.intersectsSphere(Is)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),$l.multiplyMatrices(i,ts),Ds.matrixWorld=$l,Ds.raycast(e,Ir);for(let a=0,o=Ir.length;a<o;a++){const c=Ir[a];c.instanceId=r,c.object=this,t.push(c)}Ir.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new rf(new Float32Array(s*this.count),s,this.count,Xa,Sn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zo=new L,of=new L,cf=new Ve;class pi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Zo.subVectors(i,t).cross(of.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Zo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||cf.getNormalMatrix(e),s=this.coplanarPoint(Zo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new hi,lf=new we(.5,.5),Nr=new L;class Ko{constructor(e=new pi,t=new pi,i=new pi,s=new pi,r=new pi,a=new pi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],d=r[11],M=r[12],b=r[13],v=r[14],R=r[15];if(s[0].setComponents(l-a,p-h,d-g,R-M).normalize(),s[1].setComponents(l+a,p+h,d+g,R+M).normalize(),s[2].setComponents(l+o,p+f,d+_,R+b).normalize(),s[3].setComponents(l-o,p-f,d-_,R-b).normalize(),i)s[4].setComponents(c,u,m,v).normalize(),s[5].setComponents(l-c,p-u,d-m,R-v).normalize();else if(s[4].setComponents(l-c,p-u,d-m,R-v).normalize(),t===yn)s[5].setComponents(l+c,p+u,d+m,R+v).normalize();else if(t===dr)s[5].setComponents(c,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){mi.center.set(0,0,0);const t=lf.distanceTo(e.center);return mi.radius=.7071067811865476+t,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Nr.x=s.normal.x>0?e.max.x:e.min.x,Nr.y=s.normal.y>0?e.max.y:e.min.y,Nr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fr extends Jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new L,zr=new L,Kl=new rt,Us=new Uo,Br=new hi,jo=new L,jl=new L;class Jl extends Tt{constructor(e=new gt,t=new Fr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Or.fromBufferAttribute(t,s-1),zr.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Or.distanceTo(zr);e.setAttribute("lineDistance",new pt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,e.ray.intersectsSphere(Br)===!1)return;Kl.copy(s).invert(),Us.copy(e.ray).applyMatrix4(Kl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=h.getX(_),M=h.getX(_+1),b=kr(this,e,Us,c,d,M,_);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),d=kr(this,e,Us,c,_,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=kr(this,e,Us,c,_,_+1,_);d&&t.push(d)}if(this.isLineLoop){const _=kr(this,e,Us,c,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function kr(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Or.fromBufferAttribute(o,s),zr.fromBufferAttribute(o,r),t.distanceSqToSegment(Or,zr,jo,jl)>i)return;jo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(jo);if(!(l<e.near||l>e.far))return{distance:l,point:jl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Ql=new L,ed=new L;class df extends Jl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Ql.fromBufferAttribute(t,s),ed.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ql.distanceTo(ed);e.setAttribute("lineDistance",new pt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uf extends Jl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class gi extends Jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const td=new rt,Jo=new Uo,Hr=new hi,Gr=new L;class ns extends Tt{constructor(e=new gt,t=new gi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(s),Hr.radius+=r,e.ray.intersectsSphere(Hr)===!1)return;td.copy(s).invert(),Jo.copy(e.ray).applyMatrix4(td);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,_=p;g<_;g++){const m=l.getX(g);Gr.fromBufferAttribute(f,m),nd(Gr,m,c,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=u,_=p;g<_;g++)Gr.fromBufferAttribute(f,g),nd(Gr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function nd(n,e,t,i,s,r,a){const o=Jo.distanceSqToPoint(n);if(o<t){const c=new L;Jo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ns extends Ot{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class id extends Ot{constructor(e,t,i=oi,s,r,a,o=Yt,c=Yt,l,h=Ms,f=1){if(h!==Ms&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fs extends gt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new L,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const p=i+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(o,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Le extends gt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],p=[];let g=0;const _=[],m=i/2;let d=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new pt(f,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(p,2));function M(){const v=new L,R=new L;let w=0;const C=(t-e)/i;for(let P=0;P<=r;P++){const E=[],y=P/r,A=y*(t-e)+e;for(let O=0;O<=s;O++){const G=O/s,H=G*c+o,J=Math.sin(H),V=Math.cos(H);R.x=A*J,R.y=-y*i+m,R.z=A*V,f.push(R.x,R.y,R.z),v.set(J,C,V).normalize(),u.push(v.x,v.y,v.z),p.push(G,1-y),E.push(g++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const y=_[E][P],A=_[E+1][P],O=_[E+1][P+1],G=_[E][P+1];(e>0||E!==0)&&(h.push(y,A,G),w+=3),(t>0||E!==r-1)&&(h.push(A,O,G),w+=3)}l.addGroup(d,w,0),d+=w}function b(v){const R=g,w=new we,C=new L;let P=0;const E=v===!0?e:t,y=v===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,m*y,0),u.push(0,y,0),p.push(.5,.5),g++;const A=g;for(let O=0;O<=s;O++){const H=O/s*c+o,J=Math.cos(H),V=Math.sin(H);C.x=E*V,C.y=m*y,C.z=E*J,f.push(C.x,C.y,C.z),u.push(0,y,0),w.x=J*.5+.5,w.y=V*.5*y+.5,p.push(w.x,w.y),g++}for(let O=0;O<s;O++){const G=R+O,H=A+O;v===!0?h.push(H,H+1,G):h.push(H+1,H,G),P+=3}l.addGroup(d,P,v===!0?1:2),d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Le(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xt extends Le{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Xt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qo extends gt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),l(i),h(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new L,v=new L,R=new L;for(let w=0;w<t.length;w+=3)p(t[w+0],b),p(t[w+1],v),p(t[w+2],R),c(b,v,R,M)}function c(M,b,v,R){const w=R+1,C=[];for(let P=0;P<=w;P++){C[P]=[];const E=M.clone().lerp(v,P/w),y=b.clone().lerp(v,P/w),A=w-P;for(let O=0;O<=A;O++)O===0&&P===w?C[P][O]=E:C[P][O]=E.clone().lerp(y,O/A)}for(let P=0;P<w;P++)for(let E=0;E<2*(w-P)-1;E++){const y=Math.floor(E/2);E%2===0?(u(C[P][y+1]),u(C[P+1][y]),u(C[P][y])):(u(C[P][y+1]),u(C[P+1][y+1]),u(C[P+1][y]))}}function l(M){const b=new L;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(M),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){const M=new L;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const v=m(M)/2/Math.PI+.5,R=d(M)/Math.PI+.5;a.push(v,1-R)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const b=a[M+0],v=a[M+2],R=a[M+4],w=Math.max(b,v,R),C=Math.min(b,v,R);w>.9&&C<.1&&(b<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),R<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,b){const v=M*3;b.x=e[v+0],b.y=e[v+1],b.z=e[v+2]}function g(){const M=new L,b=new L,v=new L,R=new L,w=new we,C=new we,P=new we;for(let E=0,y=0;E<r.length;E+=9,y+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),v.set(r[E+6],r[E+7],r[E+8]),w.set(a[y+0],a[y+1]),C.set(a[y+2],a[y+3]),P.set(a[y+4],a[y+5]),R.copy(M).add(b).add(v).divideScalar(3);const A=m(R);_(w,y+0,M,A),_(C,y+2,b,A),_(P,y+4,v,A)}}function _(M,b,v,R){R<0&&M.x===1&&(a[b]=M.x-1),v.x===0&&v.z===0&&(a[b]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.vertices,e.indices,e.radius,e.details)}}class is extends Qo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new is(e.radius,e.detail)}}class hf{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new we:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,s=[],r=[],a=[],o=new L,c=new rt;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ze(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ze(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function ec(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,p*=h,s(a,o,u,p)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const Vr=new L,tc=new ec,nc=new ec,ic=new ec;class ff extends hf{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new L){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Vr.subVectors(s[0],s[1]).add(s[0]),l=Vr);const f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Vr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),tc.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,g,_,m),nc.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,g,_,m),ic.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(tc.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),nc.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),ic.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return i.set(tc.calc(c),nc.calc(c),ic.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class Os extends gt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,f=e/o,u=t/c,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const M=d*u-a;for(let b=0;b<l;b++){const v=b*f-r;g.push(v,-M,0),_.push(0,0,1),m.push(b/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<o;M++){const b=M+l*d,v=M+l*(d+1),R=M+1+l*(d+1),w=M+1+l*d;p.push(b,v,w),p.push(v,R,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wr extends gt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let f=e;const u=(t-e)/s,p=new L,g=new we;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<s;_++){const m=_*(i+1);for(let d=0;d<i;d++){const M=d+m,b=M,v=M+i+1,R=M+i+2,w=M+1;o.push(b,v,w),o.push(v,R,w)}}this.setIndex(o),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Be extends gt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new L,u=new L,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const M=[],b=d/i;let v=0;d===0&&a===0?v=.5/t:d===i&&c===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const w=R/t;f.x=-e*Math.cos(s+w*r)*Math.sin(a+b*o),f.y=e*Math.cos(a+b*o),f.z=e*Math.sin(s+w*r)*Math.sin(a+b*o),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(w+v,1-b),M.push(l++)}h.push(M)}for(let d=0;d<i;d++)for(let M=0;M<t;M++){const b=h[d][M+1],v=h[d][M],R=h[d+1][M],w=h[d+1][M+1];(d!==0||a>0)&&p.push(b,v,w),(d!==i-1||c<Math.PI)&&p.push(v,R,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Be(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fe extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pf extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mf extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sc extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class gf extends sc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const rc=new rt,sd=new L,rd=new L;class ad{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ko,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(sd),rd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rd),t.updateMatrixWorld(),rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const od=new rt,zs=new L,ac=new L;class _f extends ad{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),zs.setFromMatrixPosition(e.matrixWorld),i.position.copy(zs),ac.copy(i.position),ac.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ac),i.updateMatrixWorld(),s.makeTranslation(-zs.x,-zs.y,-zs.z),od.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(od,i.coordinateSystem,i.reversedDepth)}}class oc extends sc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new _f}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class cd extends Bl{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xf extends ad{constructor(){super(new cd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ld extends sc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new xf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class vf extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Mf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function dd(n,e,t,i){const s=Sf(i);switch(t){case cl:return n*e;case Xa:return n*e/s.components*s.byteLength;case qa:return n*e/s.components*s.byteLength;case dl:return n*e*2/s.components*s.byteLength;case Ya:return n*e*2/s.components*s.byteLength;case ll:return n*e*3/s.components*s.byteLength;case dn:return n*e*4/s.components*s.byteLength;case $a:return n*e*4/s.components*s.byteLength;case sr:case rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ar:case or:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:case Ja:return Math.max(n,16)*Math.max(e,8)/4;case Za:case ja:return Math.max(n,8)*Math.max(e,8)/2;case Qa:case eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case io:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case so:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ao:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case co:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case po:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case go:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case cr:case _o:case xo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ul:case vo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Mo:case So:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sf(n){switch(n){case Mn:case rl:return{byteLength:1,components:1};case _s:case al:case xs:return{byteLength:2,components:1};case Va:case Wa:return{byteLength:2,components:4};case oi:case Ga:case Sn:return{byteLength:4,components:1};case ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);function ud(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function yf(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const h=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Ef=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Tf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,If=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ff=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Of=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,qf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$f=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qf="gl_FragColor = linearToOutputTexel( gl_FragColor );",ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_p=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,em=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,om=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,um=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_m=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xe={alphahash_fragment:Ef,alphahash_pars_fragment:bf,alphamap_fragment:Tf,alphamap_pars_fragment:wf,alphatest_fragment:Af,alphatest_pars_fragment:Rf,aomap_fragment:Cf,aomap_pars_fragment:Pf,batching_pars_vertex:Lf,batching_vertex:Df,begin_vertex:If,beginnormal_vertex:Uf,bsdfs:Nf,iridescence_fragment:Ff,bumpmap_pars_fragment:Of,clipping_planes_fragment:zf,clipping_planes_pars_fragment:Bf,clipping_planes_pars_vertex:kf,clipping_planes_vertex:Hf,color_fragment:Gf,color_pars_fragment:Vf,color_pars_vertex:Wf,color_vertex:Xf,common:qf,cube_uv_reflection_fragment:Yf,defaultnormal_vertex:$f,displacementmap_pars_vertex:Zf,displacementmap_vertex:Kf,emissivemap_fragment:jf,emissivemap_pars_fragment:Jf,colorspace_fragment:Qf,colorspace_pars_fragment:ep,envmap_fragment:tp,envmap_common_pars_fragment:np,envmap_pars_fragment:ip,envmap_pars_vertex:sp,envmap_physical_pars_fragment:mp,envmap_vertex:rp,fog_vertex:ap,fog_pars_vertex:op,fog_fragment:cp,fog_pars_fragment:lp,gradientmap_pars_fragment:dp,lightmap_pars_fragment:up,lights_lambert_fragment:hp,lights_lambert_pars_fragment:fp,lights_pars_begin:pp,lights_toon_fragment:gp,lights_toon_pars_fragment:_p,lights_phong_fragment:xp,lights_phong_pars_fragment:vp,lights_physical_fragment:Mp,lights_physical_pars_fragment:Sp,lights_fragment_begin:yp,lights_fragment_maps:Ep,lights_fragment_end:bp,logdepthbuf_fragment:Tp,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:Rp,map_fragment:Cp,map_pars_fragment:Pp,map_particle_fragment:Lp,map_particle_pars_fragment:Dp,metalnessmap_fragment:Ip,metalnessmap_pars_fragment:Up,morphinstance_vertex:Np,morphcolor_vertex:Fp,morphnormal_vertex:Op,morphtarget_pars_vertex:zp,morphtarget_vertex:Bp,normal_fragment_begin:kp,normal_fragment_maps:Hp,normal_pars_fragment:Gp,normal_pars_vertex:Vp,normal_vertex:Wp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:qp,clearcoat_normal_fragment_maps:Yp,clearcoat_pars_fragment:$p,iridescence_pars_fragment:Zp,opaque_fragment:Kp,packing:jp,premultiplied_alpha_fragment:Jp,project_vertex:Qp,dithering_fragment:em,dithering_pars_fragment:tm,roughnessmap_fragment:nm,roughnessmap_pars_fragment:im,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:rm,shadowmap_vertex:am,shadowmask_pars_fragment:om,skinbase_vertex:cm,skinning_pars_vertex:lm,skinning_vertex:dm,skinnormal_vertex:um,specularmap_fragment:hm,specularmap_pars_fragment:fm,tonemapping_fragment:pm,tonemapping_pars_fragment:mm,transmission_fragment:gm,transmission_pars_fragment:_m,uv_pars_fragment:xm,uv_pars_vertex:vm,uv_vertex:Mm,worldpos_vertex:Sm,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ce={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},En={basic:{uniforms:kt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:kt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:kt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:kt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:kt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:kt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:kt([ce.points,ce.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:kt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:kt([ce.common,ce.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:kt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:kt([ce.sprite,ce.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:kt([ce.common,ce.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:kt([ce.lights,ce.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};En.physical={uniforms:kt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Xr={r:0,b:0,g:0},_i=new pn,ym=new rt;function Em(n,e,t,i,s,r,a){const o=new Ne(0);let c=r===!0?0:1,l,h,f=null,u=0,p=null;function g(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function _(b){let v=!1;const R=g(b);R===null?d(o,c):R&&R.isColor&&(d(R,1),v=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===nr)?(h===void 0&&(h=new q(new Qn(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:$i(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),_i.copy(v.backgroundRotation),_i.x*=-1,_i.y*=-1,_i.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ym.makeRotationFromEuler(_i)),h.material.toneMapped=et.getTransfer(R.colorSpace)!==at,(f!==R||u!==R.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,f=R,u=R.version,p=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new q(new Os(2,2),new ei({name:"BackgroundMaterial",uniforms:$i(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=et.getTransfer(R.colorSpace)!==at,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(f!==R||u!==R.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,f=R,u=R.version,p=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function d(b,v){b.getRGB(Xr,zl(n)),i.buffers.color.setClear(Xr.r,Xr.g,Xr.b,v,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,v=1){o.set(b),c=v,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,d(o,c)},render:_,addToRenderList:m,dispose:M}}function bm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(y,A,O,G,H){let J=!1;const V=f(G,O,A);r!==V&&(r=V,l(r.object)),J=p(y,G,O,H),J&&g(y,G,O,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,v(y,A,O,G),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function h(y){return n.deleteVertexArray(y)}function f(y,A,O){const G=O.wireframe===!0;let H=i[y.id];H===void 0&&(H={},i[y.id]=H);let J=H[A.id];J===void 0&&(J={},H[A.id]=J);let V=J[G];return V===void 0&&(V=u(c()),J[G]=V),V}function u(y){const A=[],O=[],G=[];for(let H=0;H<t;H++)A[H]=0,O[H]=0,G[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:O,attributeDivisors:G,object:y,attributes:{},index:null}}function p(y,A,O,G){const H=r.attributes,J=A.attributes;let V=0;const ne=O.getAttributes();for(const W in ne)if(ne[W].location>=0){const pe=H[W];let Ae=J[W];if(Ae===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Ae=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Ae=y.instanceColor)),pe===void 0||pe.attribute!==Ae||Ae&&pe.data!==Ae.data)return!0;V++}return r.attributesNum!==V||r.index!==G}function g(y,A,O,G){const H={},J=A.attributes;let V=0;const ne=O.getAttributes();for(const W in ne)if(ne[W].location>=0){let pe=J[W];pe===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor));const Ae={};Ae.attribute=pe,pe&&pe.data&&(Ae.data=pe.data),H[W]=Ae,V++}r.attributes=H,r.attributesNum=V,r.index=G}function _(){const y=r.newAttributes;for(let A=0,O=y.length;A<O;A++)y[A]=0}function m(y){d(y,0)}function d(y,A){const O=r.newAttributes,G=r.enabledAttributes,H=r.attributeDivisors;O[y]=1,G[y]===0&&(n.enableVertexAttribArray(y),G[y]=1),H[y]!==A&&(n.vertexAttribDivisor(y,A),H[y]=A)}function M(){const y=r.newAttributes,A=r.enabledAttributes;for(let O=0,G=A.length;O<G;O++)A[O]!==y[O]&&(n.disableVertexAttribArray(O),A[O]=0)}function b(y,A,O,G,H,J,V){V===!0?n.vertexAttribIPointer(y,A,O,H,J):n.vertexAttribPointer(y,A,O,G,H,J)}function v(y,A,O,G){_();const H=G.attributes,J=O.getAttributes(),V=A.defaultAttributeValues;for(const ne in J){const W=J[ne];if(W.location>=0){let le=H[ne];if(le===void 0&&(ne==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),ne==="instanceColor"&&y.instanceColor&&(le=y.instanceColor)),le!==void 0){const pe=le.normalized,Ae=le.itemSize,Ye=e.get(le);if(Ye===void 0)continue;const _t=Ye.buffer,dt=Ye.type,Z=Ye.bytesPerElement,de=dt===n.INT||dt===n.UNSIGNED_INT||le.gpuType===Ga;if(le.isInterleavedBufferAttribute){const ae=le.data,De=ae.stride,Ie=le.offset;if(ae.isInstancedInterleavedBuffer){for(let ke=0;ke<W.locationSize;ke++)d(W.location+ke,ae.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ke=0;ke<W.locationSize;ke++)m(W.location+ke);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let ke=0;ke<W.locationSize;ke++)b(W.location+ke,Ae/W.locationSize,dt,pe,De*Z,(Ie+Ae/W.locationSize*ke)*Z,de)}else{if(le.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)d(W.location+ae,le.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let ae=0;ae<W.locationSize;ae++)b(W.location+ae,Ae/W.locationSize,dt,pe,Ae*Z,Ae/W.locationSize*ae*Z,de)}}else if(V!==void 0){const pe=V[ne];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(W.location,pe);break;case 3:n.vertexAttrib3fv(W.location,pe);break;case 4:n.vertexAttrib4fv(W.location,pe);break;default:n.vertexAttrib1fv(W.location,pe)}}}}M()}function R(){P();for(const y in i){const A=i[y];for(const O in A){const G=A[O];for(const H in G)h(G[H].object),delete G[H];delete A[O]}delete i[y]}}function w(y){if(i[y.id]===void 0)return;const A=i[y.id];for(const O in A){const G=A[O];for(const H in G)h(G[H].object),delete G[H];delete A[O]}delete i[y.id]}function C(y){for(const A in i){const O=i[A];if(O[y.id]===void 0)continue;const G=O[y.id];for(const H in G)h(G[H].object),delete G[H];delete O[y.id]}}function P(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Tm(n,e,t){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function a(l,h,f){f!==0&&(n.drawArraysInstanced(i,l,h,f),t.update(h,i,f))}function o(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];t.update(p,i,1)}function c(l,h,f,u){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_]*u[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function wm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==dn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const P=C===xs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Mn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Sn&&!P)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:R,maxSamples:w}}function Am(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new pi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:i,b=M*4;let v=d.clippingState||null;c.value=v,v=h(g,u,b,p);for(let R=0;R!==b;++R)v[R]=t[R];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=p+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,v=p;b!==_;++b,v+=4)a.copy(f[b]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Rm(n){let e=new WeakMap;function t(a,o){return o===Oa?a.mapping=Pi:o===za&&(a.mapping=Li),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Oa||o===za)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Qh(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const ss=4,hd=[.125,.215,.35,.446,.526,.582],xi=20,cc=new cd,fd=new Ne;let lc=null,dc=0,uc=0,hc=!1;const vi=(1+Math.sqrt(5))/2,rs=1/vi,pd=[new L(-vi,rs,0),new L(vi,rs,0),new L(-rs,0,vi),new L(rs,0,vi),new L(0,vi,-rs),new L(0,vi,rs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Cm=new L;class md{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Cm}=r;lc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),uc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lc,dc,uc),this._renderer.xr.enabled=hc,e.scissorTest=!1,qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lc=this._renderer.getRenderTarget(),dc=this._renderer.getActiveCubeFace(),uc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:xs,format:dn,colorSpace:Di,depthBuffer:!1},s=gd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gd(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Pm(r)),this._blurMaterial=Lm(r,e,t)}return s}_compileMaterial(e){const t=new q(this._lodPlanes[0],e);this._renderer.compile(t,cc)}_sceneToCubeUV(e,t,i,s,r){const c=new jt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(fd),f.toneMapping=Xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));const _=new Mr({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),m=new q(new Qn,_);let d=!1;const M=e.background;M?M.isColor&&(_.color.copy(M),e.background=null,d=!0):(_.color.copy(fd),d=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):v===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const R=this._cubeSize;qr(s,v*R,b>2?R:0,R,R),f.setRenderTarget(s),d&&f.render(m,c),f.render(e,c)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Pi||e.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_d());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new q(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;qr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,cc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=pd[(s-r-1)%pd.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new q(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*xi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):xi;m>xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xi}`);const d=[];let M=0;for(let C=0;C<xi;++C){const P=C/_,E=Math.exp(-P*P/2);d.push(E),C===0?M+=E:C<m&&(M+=2*E)}for(let C=0;C<d.length;C++)d[C]=d[C]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;const v=this._sizeLods[s],R=3*v*(s>b-ss?s-b+ss:0),w=4*(this._cubeSize-v);qr(t,R,w,3*v,2*v),c.setRenderTarget(t),c.render(f,cc)}}function Pm(n){const e=[],t=[],i=[];let s=n;const r=n-ss+1+hd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-ss?c=hd[a-n+ss-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,_=3,m=2,d=1,M=new Float32Array(_*g*p),b=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,P=w>2?0:-1,E=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];M.set(E,_*g*w),b.set(u,m*g*w);const y=[w,w,w,w,w,w];v.set(y,d*g*w)}const R=new gt;R.setAttribute("position",new Ct(M,_)),R.setAttribute("uv",new Ct(b,m)),R.setAttribute("faceIndex",new Ct(v,d)),e.push(R),s>ss&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function gd(n,e,t){const i=new ci(n,e,t);return i.texture.mapping=nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Lm(n,e,t){const i=new Float32Array(xi),s=new L(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function _d(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function xd(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function fc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dm(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Oa||c===za,h=c===Pi||c===Li;if(l||h){let f=e.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new md(n)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new md(n)),f=l?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Im(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Fi("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Um(n,e,t,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function l(f){const u=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let b=0,v=M.length;b<v;b+=3){const R=M[b+0],w=M[b+1],C=M[b+2];u.push(R,w,w,C,C,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let b=0,v=M.length/3-1;b<v;b+=3){const R=b+0,w=b+1,C=b+2;u.push(R,w,w,C,C,R)}}else return;const m=new(xl(u)?Ul:Il)(u,1);m.version=_;const d=r.get(f);d&&e.remove(d),r.set(f,m)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Nm(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,p){n.drawElements(i,p,r,u*a),t.update(p,i,1)}function l(u,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,u*a,g),t.update(p,i,g))}function h(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,u,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,i,1)}function f(u,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<u.length;d++)l(u[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,u,0,_,0,g);let d=0;for(let M=0;M<g;M++)d+=p[M]*_[M];t.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Fm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Om(n,e,t){const i=new WeakMap,s=new ot;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let E=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let v=o.attributes.position.count*b,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const w=new Float32Array(v*R*4*f),C=new yl(w,v,R,f);C.type=Sn,C.needsUpdate=!0;const P=b*4;for(let y=0;y<f;y++){const A=m[y],O=d[y],G=M[y],H=v*R*4*y;for(let J=0;J<A.count;J++){const V=J*P;p===!0&&(s.fromBufferAttribute(A,J),w[H+V+0]=s.x,w[H+V+1]=s.y,w[H+V+2]=s.z,w[H+V+3]=0),g===!0&&(s.fromBufferAttribute(O,J),w[H+V+4]=s.x,w[H+V+5]=s.y,w[H+V+6]=s.z,w[H+V+7]=0),_===!0&&(s.fromBufferAttribute(G,J),w[H+V+8]=s.x,w[H+V+9]=s.y,w[H+V+10]=s.z,w[H+V+11]=G.itemSize===4?s.w:1)}}u={count:f,texture:C,size:new we(v,R)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function zm(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const vd=new Ot,Md=new id(1,1),Sd=new yl,yd=new Fh,Ed=new Gl,bd=[],Td=[],wd=new Float32Array(16),Ad=new Float32Array(9),Rd=new Float32Array(4);function as(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=bd[s];if(r===void 0&&(r=new Float32Array(s),bd[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Lt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Yr(n,e){let t=Td[e];t===void 0&&(t=new Int32Array(e),Td[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Bm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2fv(this.addr,e),Lt(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;n.uniform3fv(this.addr,e),Lt(t,e)}}function Gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4fv(this.addr,e),Lt(t,e)}}function Vm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;Rd.set(i),n.uniformMatrix2fv(this.addr,!1,Rd),Lt(t,i)}}function Wm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;Ad.set(i),n.uniformMatrix3fv(this.addr,!1,Ad),Lt(t,i)}}function Xm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;wd.set(i),n.uniformMatrix4fv(this.addr,!1,wd),Lt(t,i)}}function qm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2iv(this.addr,e),Lt(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3iv(this.addr,e),Lt(t,e)}}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4iv(this.addr,e),Lt(t,e)}}function Km(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2uiv(this.addr,e),Lt(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3uiv(this.addr,e),Lt(t,e)}}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4uiv(this.addr,e),Lt(t,e)}}function e0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Md.compareFunction=pl,r=Md):r=vd,t.setTexture2D(e||r,s)}function t0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||yd,s)}function n0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ed,s)}function i0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Sd,s)}function s0(n){switch(n){case 5126:return Bm;case 35664:return km;case 35665:return Hm;case 35666:return Gm;case 35674:return Vm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return qm;case 35667:case 35671:return Ym;case 35668:case 35672:return $m;case 35669:case 35673:return Zm;case 5125:return Km;case 36294:return jm;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}function r0(n,e){n.uniform1fv(this.addr,e)}function a0(n,e){const t=as(e,this.size,2);n.uniform2fv(this.addr,t)}function o0(n,e){const t=as(e,this.size,3);n.uniform3fv(this.addr,t)}function c0(n,e){const t=as(e,this.size,4);n.uniform4fv(this.addr,t)}function l0(n,e){const t=as(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function d0(n,e){const t=as(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function u0(n,e){const t=as(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function h0(n,e){n.uniform1iv(this.addr,e)}function f0(n,e){n.uniform2iv(this.addr,e)}function p0(n,e){n.uniform3iv(this.addr,e)}function m0(n,e){n.uniform4iv(this.addr,e)}function g0(n,e){n.uniform1uiv(this.addr,e)}function _0(n,e){n.uniform2uiv(this.addr,e)}function x0(n,e){n.uniform3uiv(this.addr,e)}function v0(n,e){n.uniform4uiv(this.addr,e)}function M0(n,e,t){const i=this.cache,s=e.length,r=Yr(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||vd,r[a])}function S0(n,e,t){const i=this.cache,s=e.length,r=Yr(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yd,r[a])}function y0(n,e,t){const i=this.cache,s=e.length,r=Yr(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ed,r[a])}function E0(n,e,t){const i=this.cache,s=e.length,r=Yr(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sd,r[a])}function b0(n){switch(n){case 5126:return r0;case 35664:return a0;case 35665:return o0;case 35666:return c0;case 35674:return l0;case 35675:return d0;case 35676:return u0;case 5124:case 35670:return h0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return g0;case 36294:return _0;case 36295:return x0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return E0}}class T0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=s0(t.type)}}class w0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b0(t.type)}}class A0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const pc=/(\w+)(\])?(\[|\.)?/g;function Cd(n,e){n.seq.push(e),n.map[e.id]=e}function R0(n,e,t){const i=n.name,s=i.length;for(pc.lastIndex=0;;){const r=pc.exec(i),a=pc.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Cd(t,l===void 0?new T0(o,n,e):new w0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new A0(o),Cd(t,f)),t=f}}}class $r{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);R0(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Pd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const C0=37297;let P0=0;function L0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ld=new Ve;function D0(n){et._getMatrix(Ld,et.workingColorSpace,n);const e=`mat3( ${Ld.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case lr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Dd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+L0(n.getShaderSource(e),o)}else return r}function I0(n,e){const t=D0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function U0(n,e){let t;switch(e){case Zu:t="Linear";break;case Ku:t="Reinhard";break;case ju:t="Cineon";break;case il:t="ACESFilmic";break;case Qu:t="AgX";break;case eh:t="Neutral";break;case Ju:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Zr=new L;function N0(){et.getLuminanceCoefficients(Zr);const n=Zr.x.toFixed(4),e=Zr.y.toFixed(4),t=Zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function O0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function z0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Bs(n){return n!==""}function Id(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const B0=/^[ \t]*#include +<([\w\d./]+)>/gm;function mc(n){return n.replace(B0,H0)}const k0=new Map;function H0(n,e){let t=Xe[e];if(t===void 0){const i=k0.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return mc(t)}const G0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(n){return n.replace(G0,V0)}function V0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function W0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Jc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Qc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===An&&(e="SHADOWMAP_TYPE_VSM"),e}function X0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Pi:case Li:e="ENVMAP_TYPE_CUBE";break;case nr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function q0(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Li&&(e="ENVMAP_MODE_REFRACTION"),e}function Y0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case nl:e="ENVMAP_BLENDING_MULTIPLY";break;case Yu:e="ENVMAP_BLENDING_MIX";break;case $u:e="ENVMAP_BLENDING_ADD";break}return e}function $0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Z0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=W0(t),l=X0(t),h=q0(t),f=Y0(t),u=$0(t),p=F0(t),g=O0(r),_=s.createProgram();let m,d,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Bs).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Bs).join(`
`),d.length>0&&(d+=`
`)):(m=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),d=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Xn?U0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,I0("linearToOutputTexel",t.outputColorSpace),N0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bs).join(`
`)),a=mc(a),a=Id(a,t),a=Ud(a,t),o=mc(o),o=Id(o,t),o=Ud(o,t),a=Nd(a),o=Nd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=M+m+a,v=M+d+o,R=Pd(s,s.VERTEX_SHADER,b),w=Pd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,R),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(A){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",G=s.getShaderInfoLog(R)||"",H=s.getShaderInfoLog(w)||"",J=O.trim(),V=G.trim(),ne=H.trim();let W=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,R,w);else{const pe=Dd(s,R,"vertex"),Ae=Dd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+J+`
`+pe+`
`+Ae)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(V===""||ne==="")&&(le=!1);le&&(A.diagnostics={runnable:W,programLog:J,vertexShader:{log:V,prefix:m},fragmentShader:{log:ne,prefix:d}})}s.deleteShader(R),s.deleteShader(w),P=new $r(s,_),E=z0(s,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,C0)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=P0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}let K0=0;class j0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new J0(e),t.set(e,i)),i}}class J0{constructor(e){this.id=K0++,this.code=e,this.usedTimes=0}}function Q0(n,e,t,i,s,r,a){const o=new Tl,c=new j0,l=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,A,O,G){const H=O.fog,J=G.geometry,V=E.isMeshStandardMaterial?O.environment:null,ne=(E.isMeshStandardMaterial?t:e).get(E.envMap||V),W=ne&&ne.mapping===nr?ne.image.height:null,le=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const pe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Ae=pe!==void 0?pe.length:0;let Ye=0;J.morphAttributes.position!==void 0&&(Ye=1),J.morphAttributes.normal!==void 0&&(Ye=2),J.morphAttributes.color!==void 0&&(Ye=3);let _t,dt,Z,de;if(le){const it=En[le];_t=it.vertexShader,dt=it.fragmentShader}else _t=E.vertexShader,dt=E.fragmentShader,c.update(E),Z=c.getVertexShaderID(E),de=c.getFragmentShaderID(E);const ae=n.getRenderTarget(),De=n.state.buffers.depth.getReversed(),Ie=G.isInstancedMesh===!0,ke=G.isBatchedMesh===!0,wt=!!E.map,Qe=!!E.matcap,D=!!ne,ht=!!E.aoMap,Ce=!!E.lightMap,nt=!!E.bumpMap,Te=!!E.normalMap,xt=!!E.displacementMap,_e=!!E.emissiveMap,$e=!!E.metalnessMap,Ut=!!E.roughnessMap,At=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,z=E.iridescence>0,Y=E.sheen>0,Q=E.transmission>0,X=At&&!!E.anisotropyMap,be=T&&!!E.clearcoatMap,re=T&&!!E.clearcoatNormalMap,Me=T&&!!E.clearcoatRoughnessMap,ye=z&&!!E.iridescenceMap,ie=z&&!!E.iridescenceThicknessMap,fe=Y&&!!E.sheenColorMap,Oe=Y&&!!E.sheenRoughnessMap,Ee=!!E.specularMap,ue=!!E.specularColorMap,We=!!E.specularIntensityMap,U=Q&&!!E.transmissionMap,se=Q&&!!E.thicknessMap,oe=!!E.gradientMap,ge=!!E.alphaMap,ee=E.alphaTest>0,j=!!E.alphaHash,ve=!!E.extensions;let He=Xn;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(He=n.toneMapping);const ft={shaderID:le,shaderType:E.type,shaderName:E.name,vertexShader:_t,fragmentShader:dt,defines:E.defines,customVertexShaderID:Z,customFragmentShaderID:de,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:ke,batchingColor:ke&&G._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&G.instanceColor!==null,instancingMorph:Ie&&G.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Di,alphaToCoverage:!!E.alphaToCoverage,map:wt,matcap:Qe,envMap:D,envMapMode:D&&ne.mapping,envMapCubeUVHeight:W,aoMap:ht,lightMap:Ce,bumpMap:nt,normalMap:Te,displacementMap:u&&xt,emissiveMap:_e,normalMapObjectSpace:Te&&E.normalMapType===sh,normalMapTangentSpace:Te&&E.normalMapType===hl,metalnessMap:$e,roughnessMap:Ut,anisotropy:At,anisotropyMap:X,clearcoat:T,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:Me,dispersion:x,iridescence:z,iridescenceMap:ye,iridescenceThicknessMap:ie,sheen:Y,sheenColorMap:fe,sheenRoughnessMap:Oe,specularMap:Ee,specularColorMap:ue,specularIntensityMap:We,transmission:Q,transmissionMap:U,thicknessMap:se,gradientMap:oe,opaque:E.transparent===!1&&E.blending===Ri&&E.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:j,combine:E.combine,mapUv:wt&&_(E.map.channel),aoMapUv:ht&&_(E.aoMap.channel),lightMapUv:Ce&&_(E.lightMap.channel),bumpMapUv:nt&&_(E.bumpMap.channel),normalMapUv:Te&&_(E.normalMap.channel),displacementMapUv:xt&&_(E.displacementMap.channel),emissiveMapUv:_e&&_(E.emissiveMap.channel),metalnessMapUv:$e&&_(E.metalnessMap.channel),roughnessMapUv:Ut&&_(E.roughnessMap.channel),anisotropyMapUv:X&&_(E.anisotropyMap.channel),clearcoatMapUv:be&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(E.sheenRoughnessMap.channel),specularMapUv:Ee&&_(E.specularMap.channel),specularColorMapUv:ue&&_(E.specularColorMap.channel),specularIntensityMapUv:We&&_(E.specularIntensityMap.channel),transmissionMapUv:U&&_(E.transmissionMap.channel),thicknessMapUv:se&&_(E.thicknessMap.channel),alphaMapUv:ge&&_(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Te||At),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!J.attributes.uv&&(wt||ge),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:De,skinning:G.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:wt&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===at,decodeVideoTextureEmissive:_e&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===at,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===sn,flipSided:E.side===Wt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ve&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&E.extensions.multiDraw===!0||ke)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function d(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const A in E.defines)y.push(A),y.push(E.defines[A]);return E.isRawShaderMaterial===!1&&(M(y,E),b(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function M(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function v(E){const y=g[E.type];let A;if(y){const O=En[y];A=Zh.clone(O.uniforms)}else A=E.uniforms;return A}function R(E,y){let A;for(let O=0,G=h.length;O<G;O++){const H=h[O];if(H.cacheKey===y){A=H,++A.usedTimes;break}}return A===void 0&&(A=new Z0(n,y,E,r),h.push(A)),A}function w(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function C(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:C,programs:h,dispose:P}}function eg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function tg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Od(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function zd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f,u,p,g,_,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:u,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=u,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),e++,d}function o(f,u,p,g,_,m){const d=a(f,u,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(f,u,p,g,_,m){const d=a(f,u,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(f,u){t.length>1&&t.sort(f||tg),i.length>1&&i.sort(u||Od),s.length>1&&s.sort(u||Od)}function h(){for(let f=e,u=n.length;f<u;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function ng(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new zd,n.set(i,[a])):s>=r.length?(a=new zd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ig(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ne};break;case"SpotLight":t={position:new L,direction:new L,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function sg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let rg=0;function ag(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function og(n){const e=new ig,t=sg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const s=new L,r=new rt,a=new rt;function o(l){let h=0,f=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,M=0,b=0,v=0,R=0,w=0,C=0;l.sort(ag);for(let E=0,y=l.length;E<y;E++){const A=l[E],O=A.color,G=A.intensity,H=A.distance,J=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=O.r*G,f+=O.g*G,u+=O.b*G;else if(A.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(A.sh.coefficients[V],G);C++}else if(A.isDirectionalLight){const V=e.get(A);if(V.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const ne=A.shadow,W=t.get(A);W.shadowIntensity=ne.intensity,W.shadowBias=ne.bias,W.shadowNormalBias=ne.normalBias,W.shadowRadius=ne.radius,W.shadowMapSize=ne.mapSize,i.directionalShadow[p]=W,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=A.shadow.matrix,M++}i.directional[p]=V,p++}else if(A.isSpotLight){const V=e.get(A);V.position.setFromMatrixPosition(A.matrixWorld),V.color.copy(O).multiplyScalar(G),V.distance=H,V.coneCos=Math.cos(A.angle),V.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),V.decay=A.decay,i.spot[_]=V;const ne=A.shadow;if(A.map&&(i.spotLightMap[R]=A.map,R++,ne.updateMatrices(A),A.castShadow&&w++),i.spotLightMatrix[_]=ne.matrix,A.castShadow){const W=t.get(A);W.shadowIntensity=ne.intensity,W.shadowBias=ne.bias,W.shadowNormalBias=ne.normalBias,W.shadowRadius=ne.radius,W.shadowMapSize=ne.mapSize,i.spotShadow[_]=W,i.spotShadowMap[_]=J,v++}_++}else if(A.isRectAreaLight){const V=e.get(A);V.color.copy(O).multiplyScalar(G),V.halfWidth.set(A.width*.5,0,0),V.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=V,m++}else if(A.isPointLight){const V=e.get(A);if(V.color.copy(A.color).multiplyScalar(A.intensity),V.distance=A.distance,V.decay=A.decay,A.castShadow){const ne=A.shadow,W=t.get(A);W.shadowIntensity=ne.intensity,W.shadowBias=ne.bias,W.shadowNormalBias=ne.normalBias,W.shadowRadius=ne.radius,W.shadowMapSize=ne.mapSize,W.shadowCameraNear=ne.camera.near,W.shadowCameraFar=ne.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=J,i.pointShadowMatrix[g]=A.shadow.matrix,b++}i.point[g]=V,g++}else if(A.isHemisphereLight){const V=e.get(A);V.skyColor.copy(A.color).multiplyScalar(G),V.groundColor.copy(A.groundColor).multiplyScalar(G),i.hemi[d]=V,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==M||P.numPointShadows!==b||P.numSpotShadows!==v||P.numSpotMaps!==R||P.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=M,P.numPointShadows=b,P.numSpotShadows=v,P.numSpotMaps=R,P.numLightProbes=C,i.version=rg++)}function c(l,h){let f=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,M=l.length;d<M;d++){const b=l[d];if(b.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(b.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const v=i.point[u];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function Bd(n){const e=new og(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function cg(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Bd(n),e.set(s,[o])):r>=a.length?(o=new Bd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const lg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ug(n,e,t){let i=new Ko;const s=new we,r=new we,a=new ot,o=new pf({depthPacking:ih}),c=new mf,l={},h=t.maxTextureSize,f={[Vn]:Wt,[Wt]:Vn,[sn]:sn},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:lg,fragmentShader:dg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new q(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jc;let d=this.type;this.render=function(w,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Wn),O.buffers.depth.getReversed()?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const G=d!==An&&this.type===An,H=d===An&&this.type!==An;for(let J=0,V=w.length;J<V;J++){const ne=w[J],W=ne.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const le=W.getFrameExtents();if(s.multiply(le),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/le.x),s.x=r.x*le.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/le.y),s.y=r.y*le.y,W.mapSize.y=r.y)),W.map===null||G===!0||H===!0){const Ae=this.type!==An?{minFilter:Yt,magFilter:Yt}:{};W.map!==null&&W.map.dispose(),W.map=new ci(s.x,s.y,Ae),W.map.texture.name=ne.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const pe=W.getViewportCount();for(let Ae=0;Ae<pe;Ae++){const Ye=W.getViewport(Ae);a.set(r.x*Ye.x,r.y*Ye.y,r.x*Ye.z,r.y*Ye.w),O.viewport(a),W.updateMatrices(ne,Ae),i=W.getFrustum(),v(C,P,W.camera,ne,this.type)}W.isPointLightShadow!==!0&&this.type===An&&M(W,P),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(E,y,A)};function M(w,C){const P=e.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ci(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,P,u,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,P,p,_,null)}function b(w,C,P,E){let y=null;const A=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)y=A;else if(y=P.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=y.uuid,G=C.uuid;let H=l[O];H===void 0&&(H={},l[O]=H);let J=H[G];J===void 0&&(J=y.clone(),H[G]=J,C.addEventListener("dispose",R)),y=J}if(y.visible=C.visible,y.wireframe=C.wireframe,E===An?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:f[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const O=n.properties.get(y);O.light=P}return y}function v(w,C,P,E,y){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===An)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const G=e.update(w),H=w.material;if(Array.isArray(H)){const J=G.groups;for(let V=0,ne=J.length;V<ne;V++){const W=J[V],le=H[W.materialIndex];if(le&&le.visible){const pe=b(w,le,E,y);w.onBeforeShadow(n,w,C,P,G,pe,W),n.renderBufferDirect(P,null,G,pe,w,W),w.onAfterShadow(n,w,C,P,G,pe,W)}}}else if(H.visible){const J=b(w,H,E,y);w.onBeforeShadow(n,w,C,P,G,J,null),n.renderBufferDirect(P,null,G,J,w,null),w.onAfterShadow(n,w,C,P,G,J,null)}}const O=w.children;for(let G=0,H=O.length;G<H;G++)v(O[G],C,P,E,y)}function R(w){w.target.removeEventListener("dispose",R);for(const P in l){const E=l[P],y=w.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const hg={[Pa]:La,[Da]:Na,[Ia]:Fa,[Ci]:Ua,[La]:Pa,[Na]:Da,[Fa]:Ia,[Ua]:Ci};function fg(n,e){function t(){let U=!1;const se=new ot;let oe=null;const ge=new ot(0,0,0,0);return{setMask:function(ee){oe!==ee&&!U&&(n.colorMask(ee,ee,ee,ee),oe=ee)},setLocked:function(ee){U=ee},setClear:function(ee,j,ve,He,ft){ft===!0&&(ee*=He,j*=He,ve*=He),se.set(ee,j,ve,He),ge.equals(se)===!1&&(n.clearColor(ee,j,ve,He),ge.copy(se))},reset:function(){U=!1,oe=null,ge.set(-1,0,0,0)}}}function i(){let U=!1,se=!1,oe=null,ge=null,ee=null;return{setReversed:function(j){if(se!==j){const ve=e.get("EXT_clip_control");j?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),se=j;const He=ee;ee=null,this.setClear(He)}},getReversed:function(){return se},setTest:function(j){j?ae(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(j){oe!==j&&!U&&(n.depthMask(j),oe=j)},setFunc:function(j){if(se&&(j=hg[j]),ge!==j){switch(j){case Pa:n.depthFunc(n.NEVER);break;case La:n.depthFunc(n.ALWAYS);break;case Da:n.depthFunc(n.LESS);break;case Ci:n.depthFunc(n.LEQUAL);break;case Ia:n.depthFunc(n.EQUAL);break;case Ua:n.depthFunc(n.GEQUAL);break;case Na:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=j}},setLocked:function(j){U=j},setClear:function(j){ee!==j&&(se&&(j=1-j),n.clearDepth(j),ee=j)},reset:function(){U=!1,oe=null,ge=null,ee=null,se=!1}}}function s(){let U=!1,se=null,oe=null,ge=null,ee=null,j=null,ve=null,He=null,ft=null;return{setTest:function(it){U||(it?ae(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(it){se!==it&&!U&&(n.stencilMask(it),se=it)},setFunc:function(it,Gn,wn){(oe!==it||ge!==Gn||ee!==wn)&&(n.stencilFunc(it,Gn,wn),oe=it,ge=Gn,ee=wn)},setOp:function(it,Gn,wn){(j!==it||ve!==Gn||He!==wn)&&(n.stencilOp(it,Gn,wn),j=it,ve=Gn,He=wn)},setLocked:function(it){U=it},setClear:function(it){ft!==it&&(n.clearStencil(it),ft=it)},reset:function(){U=!1,se=null,oe=null,ge=null,ee=null,j=null,ve=null,He=null,ft=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},f={},u=new WeakMap,p=[],g=null,_=!1,m=null,d=null,M=null,b=null,v=null,R=null,w=null,C=new Ne(0,0,0),P=0,E=!1,y=null,A=null,O=null,G=null,H=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ne=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=ne>=1):W.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=ne>=2);let le=null,pe={};const Ae=n.getParameter(n.SCISSOR_BOX),Ye=n.getParameter(n.VIEWPORT),_t=new ot().fromArray(Ae),dt=new ot().fromArray(Ye);function Z(U,se,oe,ge){const ee=new Uint8Array(4),j=n.createTexture();n.bindTexture(U,j),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ve=0;ve<oe;ve++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(se+ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return j}const de={};de[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(n.DEPTH_TEST),a.setFunc(Ci),nt(!1),Te(jc),ae(n.CULL_FACE),ht(Wn);function ae(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function De(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function Ie(U,se){return f[U]!==se?(n.bindFramebuffer(U,se),f[U]=se,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=se),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=se),!0):!1}function ke(U,se){let oe=p,ge=!1;if(U){oe=u.get(se),oe===void 0&&(oe=[],u.set(se,oe));const ee=U.textures;if(oe.length!==ee.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let j=0,ve=ee.length;j<ve;j++)oe[j]=n.COLOR_ATTACHMENT0+j;oe.length=ee.length,ge=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,ge=!0);ge&&n.drawBuffers(oe)}function wt(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const Qe={[si]:n.FUNC_ADD,[Pu]:n.FUNC_SUBTRACT,[Lu]:n.FUNC_REVERSE_SUBTRACT};Qe[Du]=n.MIN,Qe[Iu]=n.MAX;const D={[Uu]:n.ZERO,[Nu]:n.ONE,[Fu]:n.SRC_COLOR,[Ra]:n.SRC_ALPHA,[Gu]:n.SRC_ALPHA_SATURATE,[ku]:n.DST_COLOR,[zu]:n.DST_ALPHA,[Ou]:n.ONE_MINUS_SRC_COLOR,[Ca]:n.ONE_MINUS_SRC_ALPHA,[Hu]:n.ONE_MINUS_DST_COLOR,[Bu]:n.ONE_MINUS_DST_ALPHA,[Vu]:n.CONSTANT_COLOR,[Wu]:n.ONE_MINUS_CONSTANT_COLOR,[Xu]:n.CONSTANT_ALPHA,[qu]:n.ONE_MINUS_CONSTANT_ALPHA};function ht(U,se,oe,ge,ee,j,ve,He,ft,it){if(U===Wn){_===!0&&(De(n.BLEND),_=!1);return}if(_===!1&&(ae(n.BLEND),_=!0),U!==Cu){if(U!==m||it!==E){if((d!==si||v!==si)&&(n.blendEquation(n.FUNC_ADD),d=si,v=si),it)switch(U){case Ri:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case tr:n.blendFunc(n.ONE,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ri:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case el:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,b=null,R=null,w=null,C.set(0,0,0),P=0,m=U,E=it}return}ee=ee||se,j=j||oe,ve=ve||ge,(se!==d||ee!==v)&&(n.blendEquationSeparate(Qe[se],Qe[ee]),d=se,v=ee),(oe!==M||ge!==b||j!==R||ve!==w)&&(n.blendFuncSeparate(D[oe],D[ge],D[j],D[ve]),M=oe,b=ge,R=j,w=ve),(He.equals(C)===!1||ft!==P)&&(n.blendColor(He.r,He.g,He.b,ft),C.copy(He),P=ft),m=U,E=!1}function Ce(U,se){U.side===sn?De(n.CULL_FACE):ae(n.CULL_FACE);let oe=U.side===Wt;se&&(oe=!oe),nt(oe),U.blending===Ri&&U.transparent===!1?ht(Wn):ht(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ge=U.stencilWrite;o.setTest(ge),ge&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),_e(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){y!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),y=U)}function Te(U){U!==Au?(ae(n.CULL_FACE),U!==A&&(U===jc?n.cullFace(n.BACK):U===Ru?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),A=U}function xt(U){U!==O&&(V&&n.lineWidth(U),O=U)}function _e(U,se,oe){U?(ae(n.POLYGON_OFFSET_FILL),(G!==se||H!==oe)&&(n.polygonOffset(se,oe),G=se,H=oe)):De(n.POLYGON_OFFSET_FILL)}function $e(U){U?ae(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function Ut(U){U===void 0&&(U=n.TEXTURE0+J-1),le!==U&&(n.activeTexture(U),le=U)}function At(U,se,oe){oe===void 0&&(le===null?oe=n.TEXTURE0+J-1:oe=le);let ge=pe[oe];ge===void 0&&(ge={type:void 0,texture:void 0},pe[oe]=ge),(ge.type!==U||ge.texture!==se)&&(le!==oe&&(n.activeTexture(oe),le=oe),n.bindTexture(U,se||de[U]),ge.type=U,ge.texture=se)}function T(){const U=pe[le];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(U){_t.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),_t.copy(U))}function Oe(U){dt.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),dt.copy(U))}function Ee(U,se){let oe=l.get(se);oe===void 0&&(oe=new WeakMap,l.set(se,oe));let ge=oe.get(U);ge===void 0&&(ge=n.getUniformBlockIndex(se,U.name),oe.set(U,ge))}function ue(U,se){const ge=l.get(se).get(U);c.get(se)!==ge&&(n.uniformBlockBinding(se,ge,U.__bindingPointIndex),c.set(se,ge))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},le=null,pe={},f={},u=new WeakMap,p=[],g=null,_=!1,m=null,d=null,M=null,b=null,v=null,R=null,w=null,C=new Ne(0,0,0),P=0,E=!1,y=null,A=null,O=null,G=null,H=null,_t.set(0,0,n.canvas.width,n.canvas.height),dt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:De,bindFramebuffer:Ie,drawBuffers:ke,useProgram:wt,setBlending:ht,setMaterial:Ce,setFlipSided:nt,setCullFace:Te,setLineWidth:xt,setPolygonOffset:_e,setScissorTest:$e,activeTexture:Ut,bindTexture:At,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:ye,texImage3D:ie,updateUBOMapping:Ee,uniformBlockBinding:ue,texStorage2D:re,texStorage3D:Me,texSubImage2D:Y,texSubImage3D:Q,compressedTexSubImage2D:X,compressedTexSubImage3D:be,scissor:fe,viewport:Oe,reset:We}}function pg(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap;let f;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):ur("canvas")}function _(T,x,z){let Y=1;const Q=At(T);if((Q.width>z||Q.height>z)&&(Y=z/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(Y*Q.width),be=Math.floor(Y*Q.height);f===void 0&&(f=g(X,be));const re=x?g(X,be):f;return re.width=X,re.height=be,re.getContext("2d").drawImage(T,0,0,X,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+X+"x"+be+")."),re}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function d(T){n.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,x,z,Y,Q=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=x;if(x===n.RED&&(z===n.FLOAT&&(X=n.R32F),z===n.HALF_FLOAT&&(X=n.R16F),z===n.UNSIGNED_BYTE&&(X=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(X=n.R8UI),z===n.UNSIGNED_SHORT&&(X=n.R16UI),z===n.UNSIGNED_INT&&(X=n.R32UI),z===n.BYTE&&(X=n.R8I),z===n.SHORT&&(X=n.R16I),z===n.INT&&(X=n.R32I)),x===n.RG&&(z===n.FLOAT&&(X=n.RG32F),z===n.HALF_FLOAT&&(X=n.RG16F),z===n.UNSIGNED_BYTE&&(X=n.RG8)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(X=n.RG8UI),z===n.UNSIGNED_SHORT&&(X=n.RG16UI),z===n.UNSIGNED_INT&&(X=n.RG32UI),z===n.BYTE&&(X=n.RG8I),z===n.SHORT&&(X=n.RG16I),z===n.INT&&(X=n.RG32I)),x===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(X=n.RGB8UI),z===n.UNSIGNED_SHORT&&(X=n.RGB16UI),z===n.UNSIGNED_INT&&(X=n.RGB32UI),z===n.BYTE&&(X=n.RGB8I),z===n.SHORT&&(X=n.RGB16I),z===n.INT&&(X=n.RGB32I)),x===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),z===n.UNSIGNED_INT&&(X=n.RGBA32UI),z===n.BYTE&&(X=n.RGBA8I),z===n.SHORT&&(X=n.RGBA16I),z===n.INT&&(X=n.RGBA32I)),x===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),x===n.RGBA){const be=Q?lr:et.getTransfer(Y);z===n.FLOAT&&(X=n.RGBA32F),z===n.HALF_FLOAT&&(X=n.RGBA16F),z===n.UNSIGNED_BYTE&&(X=be===at?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(T,x){let z;return T?x===null||x===oi||x===vs?z=n.DEPTH24_STENCIL8:x===Sn?z=n.DEPTH32F_STENCIL8:x===_s&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===oi||x===vs?z=n.DEPTH_COMPONENT24:x===Sn?z=n.DEPTH_COMPONENT32F:x===_s&&(z=n.DEPTH_COMPONENT16),z}function R(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Yt&&T.minFilter!==vn?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){const x=T.target;x.removeEventListener("dispose",w),P(x),x.isVideoTexture&&h.delete(x)}function C(T){const x=T.target;x.removeEventListener("dispose",C),y(x)}function P(T){const x=i.get(T);if(x.__webglInit===void 0)return;const z=T.source,Y=u.get(z);if(Y){const Q=Y[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(T),Object.keys(Y).length===0&&u.delete(z)}i.remove(T)}function E(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const z=T.source,Y=u.get(z);delete Y[x.__cacheKey],a.memory.textures--}function y(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let Q=0;Q<x.__webglFramebuffer[Y].length;Q++)n.deleteFramebuffer(x.__webglFramebuffer[Y][Q]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=T.textures;for(let Y=0,Q=z.length;Y<Q;Y++){const X=i.get(z[Y]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(z[Y])}i.remove(T)}let A=0;function O(){A=0}function G(){const T=A;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),A+=1,T}function H(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function J(T,x){const z=i.get(T);if(T.isVideoTexture&&$e(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(z,T,x);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function V(T,x){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){de(z,T,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function ne(T,x){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){de(z,T,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function W(T,x){const z=i.get(T);if(T.version>0&&z.__version!==T.version){ae(z,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const le={[Ba]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[ka]:n.MIRRORED_REPEAT},pe={[Yt]:n.NEAREST,[th]:n.NEAREST_MIPMAP_NEAREST,[ir]:n.NEAREST_MIPMAP_LINEAR,[vn]:n.LINEAR,[Ha]:n.LINEAR_MIPMAP_NEAREST,[ai]:n.LINEAR_MIPMAP_LINEAR},Ae={[rh]:n.NEVER,[uh]:n.ALWAYS,[ah]:n.LESS,[pl]:n.LEQUAL,[oh]:n.EQUAL,[dh]:n.GEQUAL,[ch]:n.GREATER,[lh]:n.NOTEQUAL};function Ye(T,x){if(x.type===Sn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===vn||x.magFilter===Ha||x.magFilter===ir||x.magFilter===ai||x.minFilter===vn||x.minFilter===Ha||x.minFilter===ir||x.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,le[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,le[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,le[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,pe[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,pe[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Ae[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Yt||x.minFilter!==ir&&x.minFilter!==ai||x.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function _t(T,x){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",w));const Y=x.source;let Q=u.get(Y);Q===void 0&&(Q={},u.set(Y,Q));const X=H(x);if(X!==T.__cacheKey){Q[X]===void 0&&(Q[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[X].usedTimes++;const be=Q[T.__cacheKey];be!==void 0&&(Q[T.__cacheKey].usedTimes--,be.usedTimes===0&&E(x)),T.__cacheKey=X,T.__webglTexture=Q[X].texture}return z}function dt(T,x,z){return Math.floor(Math.floor(T/z)/x)}function Z(T,x,z,Y){const X=T.updateRanges;if(X.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{X.sort((ie,fe)=>ie.start-fe.start);let be=0;for(let ie=1;ie<X.length;ie++){const fe=X[be],Oe=X[ie],Ee=fe.start+fe.count,ue=dt(Oe.start,x.width,4),We=dt(fe.start,x.width,4);Oe.start<=Ee+1&&ue===We&&dt(Oe.start+Oe.count-1,x.width,4)===ue?fe.count=Math.max(fe.count,Oe.start+Oe.count-fe.start):(++be,X[be]=Oe)}X.length=be+1;const re=n.getParameter(n.UNPACK_ROW_LENGTH),Me=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ie=0,fe=X.length;ie<fe;ie++){const Oe=X[ie],Ee=Math.floor(Oe.start/4),ue=Math.ceil(Oe.count/4),We=Ee%x.width,U=Math.floor(Ee/x.width),se=ue,oe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,We),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,We,U,se,oe,z,Y,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Me),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function de(T,x,z){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);const Q=_t(T,x),X=x.source;t.bindTexture(Y,T.__webglTexture,n.TEXTURE0+z);const be=i.get(X);if(X.version!==be.__version||Q===!0){t.activeTexture(n.TEXTURE0+z);const re=et.getPrimaries(et.workingColorSpace),Me=x.colorSpace===qn?null:et.getPrimaries(x.colorSpace),ye=x.colorSpace===qn||re===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ie=_(x.image,!1,s.maxTextureSize);ie=Ut(x,ie);const fe=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type);let Ee=b(x.internalFormat,fe,Oe,x.colorSpace,x.isVideoTexture);Ye(Y,x);let ue;const We=x.mipmaps,U=x.isVideoTexture!==!0,se=be.__version===void 0||Q===!0,oe=X.dataReady,ge=R(x,ie);if(x.isDepthTexture)Ee=v(x.format===Ss,x.type),se&&(U?t.texStorage2D(n.TEXTURE_2D,1,Ee,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ie.width,ie.height,0,fe,Oe,null));else if(x.isDataTexture)if(We.length>0){U&&se&&t.texStorage2D(n.TEXTURE_2D,ge,Ee,We[0].width,We[0].height);for(let ee=0,j=We.length;ee<j;ee++)ue=We[ee],U?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ue.width,ue.height,fe,Oe,ue.data):t.texImage2D(n.TEXTURE_2D,ee,Ee,ue.width,ue.height,0,fe,Oe,ue.data);x.generateMipmaps=!1}else U?(se&&t.texStorage2D(n.TEXTURE_2D,ge,Ee,ie.width,ie.height),oe&&Z(x,ie,fe,Oe)):t.texImage2D(n.TEXTURE_2D,0,Ee,ie.width,ie.height,0,fe,Oe,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Ee,We[0].width,We[0].height,ie.depth);for(let ee=0,j=We.length;ee<j;ee++)if(ue=We[ee],x.format!==dn)if(fe!==null)if(U){if(oe)if(x.layerUpdates.size>0){const ve=dd(ue.width,ue.height,x.format,x.type);for(const He of x.layerUpdates){const ft=ue.data.subarray(He*ve/ue.data.BYTES_PER_ELEMENT,(He+1)*ve/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,He,ue.width,ue.height,1,fe,ft)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,ie.depth,fe,ue.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Ee,ue.width,ue.height,ie.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?oe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,ie.depth,fe,Oe,ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Ee,ue.width,ue.height,ie.depth,0,fe,Oe,ue.data)}else{U&&se&&t.texStorage2D(n.TEXTURE_2D,ge,Ee,We[0].width,We[0].height);for(let ee=0,j=We.length;ee<j;ee++)ue=We[ee],x.format!==dn?fe!==null?U?oe&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,ue.width,ue.height,fe,ue.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Ee,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ue.width,ue.height,fe,Oe,ue.data):t.texImage2D(n.TEXTURE_2D,ee,Ee,ue.width,ue.height,0,fe,Oe,ue.data)}else if(x.isDataArrayTexture)if(U){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Ee,ie.width,ie.height,ie.depth),oe)if(x.layerUpdates.size>0){const ee=dd(ie.width,ie.height,x.format,x.type);for(const j of x.layerUpdates){const ve=ie.data.subarray(j*ee/ie.data.BYTES_PER_ELEMENT,(j+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,ie.width,ie.height,1,fe,Oe,ve)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,fe,Oe,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ie.width,ie.height,ie.depth,0,fe,Oe,ie.data);else if(x.isData3DTexture)U?(se&&t.texStorage3D(n.TEXTURE_3D,ge,Ee,ie.width,ie.height,ie.depth),oe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,fe,Oe,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ie.width,ie.height,ie.depth,0,fe,Oe,ie.data);else if(x.isFramebufferTexture){if(se)if(U)t.texStorage2D(n.TEXTURE_2D,ge,Ee,ie.width,ie.height);else{let ee=ie.width,j=ie.height;for(let ve=0;ve<ge;ve++)t.texImage2D(n.TEXTURE_2D,ve,Ee,ee,j,0,fe,Oe,null),ee>>=1,j>>=1}}else if(We.length>0){if(U&&se){const ee=At(We[0]);t.texStorage2D(n.TEXTURE_2D,ge,Ee,ee.width,ee.height)}for(let ee=0,j=We.length;ee<j;ee++)ue=We[ee],U?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,fe,Oe,ue):t.texImage2D(n.TEXTURE_2D,ee,Ee,fe,Oe,ue);x.generateMipmaps=!1}else if(U){if(se){const ee=At(ie);t.texStorage2D(n.TEXTURE_2D,ge,Ee,ee.width,ee.height)}oe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Oe,ie)}else t.texImage2D(n.TEXTURE_2D,0,Ee,fe,Oe,ie);m(x)&&d(Y),be.__version=X.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ae(T,x,z){if(x.image.length!==6)return;const Y=_t(T,x),Q=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);const X=i.get(Q);if(Q.version!==X.__version||Y===!0){t.activeTexture(n.TEXTURE0+z);const be=et.getPrimaries(et.workingColorSpace),re=x.colorSpace===qn?null:et.getPrimaries(x.colorSpace),Me=x.colorSpace===qn||be===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const ye=x.isCompressedTexture||x.image[0].isCompressedTexture,ie=x.image[0]&&x.image[0].isDataTexture,fe=[];for(let j=0;j<6;j++)!ye&&!ie?fe[j]=_(x.image[j],!0,s.maxCubemapSize):fe[j]=ie?x.image[j].image:x.image[j],fe[j]=Ut(x,fe[j]);const Oe=fe[0],Ee=r.convert(x.format,x.colorSpace),ue=r.convert(x.type),We=b(x.internalFormat,Ee,ue,x.colorSpace),U=x.isVideoTexture!==!0,se=X.__version===void 0||Y===!0,oe=Q.dataReady;let ge=R(x,Oe);Ye(n.TEXTURE_CUBE_MAP,x);let ee;if(ye){U&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,We,Oe.width,Oe.height);for(let j=0;j<6;j++){ee=fe[j].mipmaps;for(let ve=0;ve<ee.length;ve++){const He=ee[ve];x.format!==dn?Ee!==null?U?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,He.width,He.height,Ee,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,We,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,He.width,He.height,Ee,ue,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,We,He.width,He.height,0,Ee,ue,He.data)}}}else{if(ee=x.mipmaps,U&&se){ee.length>0&&ge++;const j=At(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,We,j.width,j.height)}for(let j=0;j<6;j++)if(ie){U?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,fe[j].width,fe[j].height,Ee,ue,fe[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,We,fe[j].width,fe[j].height,0,Ee,ue,fe[j].data);for(let ve=0;ve<ee.length;ve++){const ft=ee[ve].image[j].image;U?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,ft.width,ft.height,Ee,ue,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,We,ft.width,ft.height,0,Ee,ue,ft.data)}}else{U?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ee,ue,fe[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,We,Ee,ue,fe[j]);for(let ve=0;ve<ee.length;ve++){const He=ee[ve];U?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,Ee,ue,He.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,We,Ee,ue,He.image[j])}}}m(x)&&d(n.TEXTURE_CUBE_MAP),X.__version=Q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function De(T,x,z,Y,Q,X){const be=r.convert(z.format,z.colorSpace),re=r.convert(z.type),Me=b(z.internalFormat,be,re,z.colorSpace),ye=i.get(x),ie=i.get(z);if(ie.__renderTarget=x,!ye.__hasExternalTextures){const fe=Math.max(1,x.width>>X),Oe=Math.max(1,x.height>>X);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,X,Me,fe,Oe,x.depth,0,be,re,null):t.texImage2D(Q,X,Me,fe,Oe,0,be,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,Q,ie.__webglTexture,0,xt(x)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,Q,ie.__webglTexture,X),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(T,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const Y=x.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,X=v(x.stencilBuffer,Q),be=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=xt(x);_e(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,X,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,X,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,X,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,T)}else{const Y=x.textures;for(let Q=0;Q<Y.length;Q++){const X=Y[Q],be=r.convert(X.format,X.colorSpace),re=r.convert(X.type),Me=b(X.internalFormat,be,re,X.colorSpace),ye=xt(x);z&&_e(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Me,x.width,x.height):_e(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,Me,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Me,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);const Q=Y.__webglTexture,X=xt(x);if(x.depthTexture.format===Ms)_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(x.depthTexture.format===Ss)_e(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function wt(T){const x=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=Y}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const Y=T.texture.mipmaps;Y&&Y.length>0?ke(x.__webglFramebuffer[0],T):ke(x.__webglFramebuffer,T)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),Ie(x.__webglDepthbuffer[Y],T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,X)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ie(x.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,X)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Qe(T,x,z){const Y=i.get(T);x!==void 0&&De(Y.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&wt(T)}function D(T){const x=T.texture,z=i.get(T),Y=i.get(x);T.addEventListener("dispose",C);const Q=T.textures,X=T.isWebGLCubeRenderTarget===!0,be=Q.length>1;if(be||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,a.memory.textures++),X){z.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[re]=[];for(let Me=0;Me<x.mipmaps.length;Me++)z.__webglFramebuffer[re][Me]=n.createFramebuffer()}else z.__webglFramebuffer[re]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)z.__webglFramebuffer[re]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(be)for(let re=0,Me=Q.length;re<Me;re++){const ye=i.get(Q[re]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&_e(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let re=0;re<Q.length;re++){const Me=Q[re];z.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[re]);const ye=r.convert(Me.format,Me.colorSpace),ie=r.convert(Me.type),fe=b(Me.internalFormat,ye,ie,Me.colorSpace,T.isXRRenderTarget===!0),Oe=xt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,fe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,z.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ye(n.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let Me=0;Me<x.mipmaps.length;Me++)De(z.__webglFramebuffer[re][Me],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Me);else De(z.__webglFramebuffer[re],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(x)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,Me=Q.length;re<Me;re++){const ye=Q[re],ie=i.get(ye);let fe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(fe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,ie.__webglTexture),Ye(fe,ye),De(z.__webglFramebuffer,T,ye,n.COLOR_ATTACHMENT0+re,fe,0),m(ye)&&d(fe)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(re=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),Ye(re,x),x.mipmaps&&x.mipmaps.length>0)for(let Me=0;Me<x.mipmaps.length;Me++)De(z.__webglFramebuffer[Me],T,x,n.COLOR_ATTACHMENT0,re,Me);else De(z.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,re,0);m(x)&&d(re),t.unbindTexture()}T.depthBuffer&&wt(T)}function ht(T){const x=T.textures;for(let z=0,Y=x.length;z<Y;z++){const Q=x[z];if(m(Q)){const X=M(T),be=i.get(Q).__webglTexture;t.bindTexture(X,be),d(X),t.unbindTexture()}}}const Ce=[],nt=[];function Te(T){if(T.samples>0){if(_e(T)===!1){const x=T.textures,z=T.width,Y=T.height;let Q=n.COLOR_BUFFER_BIT;const X=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(T),re=x.length>1;if(re)for(let ye=0;ye<x.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const Me=T.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ye=0;ye<x.length;ye++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ie=i.get(x[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,z,Y,0,0,z,Y,Q,n.NEAREST),c===!0&&(Ce.length=0,nt.length=0,Ce.push(n.COLOR_ATTACHMENT0+ye),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ce.push(X),nt.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,nt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ce))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let ye=0;ye<x.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ie=i.get(x[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function xt(T){return Math.min(s.maxSamples,T.samples)}function _e(T){const x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function $e(T){const x=a.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Ut(T,x){const z=T.colorSpace,Y=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Di&&z!==qn&&(et.getTransfer(z)===at?(Y!==dn||Q!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function At(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=J,this.setTexture2DArray=V,this.setTexture3D=ne,this.setTextureCube=W,this.rebindTextures=Qe,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=_e}function mg(n,e){function t(i,s=qn){let r;const a=et.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===Va)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ol)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rl)return n.BYTE;if(i===al)return n.SHORT;if(i===_s)return n.UNSIGNED_SHORT;if(i===Ga)return n.INT;if(i===oi)return n.UNSIGNED_INT;if(i===Sn)return n.FLOAT;if(i===xs)return n.HALF_FLOAT;if(i===cl)return n.ALPHA;if(i===ll)return n.RGB;if(i===dn)return n.RGBA;if(i===Ms)return n.DEPTH_COMPONENT;if(i===Ss)return n.DEPTH_STENCIL;if(i===Xa)return n.RED;if(i===qa)return n.RED_INTEGER;if(i===dl)return n.RG;if(i===Ya)return n.RG_INTEGER;if(i===$a)return n.RGBA_INTEGER;if(i===sr||i===rr||i===ar||i===or)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Za||i===Ka||i===ja||i===Ja)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qa||i===eo||i===to)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qa||i===eo)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===to)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===no||i===io||i===so||i===ro||i===ao||i===oo||i===co||i===lo||i===uo||i===ho||i===fo||i===po||i===mo||i===go)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===no)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===io)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===so)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ro)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ao)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===oo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===co)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===lo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ho)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===po)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===go)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cr||i===_o||i===xo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===cr)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_o)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ul||i===vo||i===Mo||i===So)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===cr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===vo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Mo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===So)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class kd extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const gg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_g=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new kd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ei({vertexShader:gg,fragmentShader:_g,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new Os(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vg extends Ui{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,p=null,g=null;const _=new xg,m={},d=t.getContextAttributes();let M=null,b=null;const v=[],R=[],w=new we;let C=null;const P=new jt;P.viewport=new ot;const E=new jt;E.viewport=new ot;const y=[P,E],A=new vf;let O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let de=v[Z];return de===void 0&&(de=new qo,v[Z]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Z){let de=v[Z];return de===void 0&&(de=new qo,v[Z]=de),de.getGripSpace()},this.getHand=function(Z){let de=v[Z];return de===void 0&&(de=new qo,v[Z]=de),de.getHandSpace()};function H(Z){const de=R.indexOf(Z.inputSource);if(de===-1)return;const ae=v[de];ae!==void 0&&(ae.update(Z.inputSource,Z.frame,l||a),ae.dispatchEvent({type:Z.type,data:Z.inputSource}))}function J(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",V);for(let Z=0;Z<v.length;Z++){const de=R[Z];de!==null&&(R[Z]=null,v[Z].disconnect(de))}O=null,G=null,_.reset();for(const Z in m)delete m[Z];e.setRenderTarget(M),p=null,u=null,f=null,s=null,b=null,dt.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",J),s.addEventListener("inputsourceschange",V),d.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&(f=new XRWebGLBinding(s,t)),f!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,De=null,Ie=null;d.depth&&(Ie=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=d.stencil?Ss:Ms,De=d.stencil?vs:oi);const ke={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};u=f.createProjectionLayer(ke),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new ci(u.textureWidth,u.textureHeight,{format:dn,type:Mn,depthTexture:new id(u.textureWidth,u.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ae={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new ci(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),dt.setContext(s),dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(Z){for(let de=0;de<Z.removed.length;de++){const ae=Z.removed[de],De=R.indexOf(ae);De>=0&&(R[De]=null,v[De].disconnect(ae))}for(let de=0;de<Z.added.length;de++){const ae=Z.added[de];let De=R.indexOf(ae);if(De===-1){for(let ke=0;ke<v.length;ke++)if(ke>=R.length){R.push(ae),De=ke;break}else if(R[ke]===null){R[ke]=ae,De=ke;break}if(De===-1)break}const Ie=v[De];Ie&&Ie.connect(ae)}}const ne=new L,W=new L;function le(Z,de,ae){ne.setFromMatrixPosition(de.matrixWorld),W.setFromMatrixPosition(ae.matrixWorld);const De=ne.distanceTo(W),Ie=de.projectionMatrix.elements,ke=ae.projectionMatrix.elements,wt=Ie[14]/(Ie[10]-1),Qe=Ie[14]/(Ie[10]+1),D=(Ie[9]+1)/Ie[5],ht=(Ie[9]-1)/Ie[5],Ce=(Ie[8]-1)/Ie[0],nt=(ke[8]+1)/ke[0],Te=wt*Ce,xt=wt*nt,_e=De/(-Ce+nt),$e=_e*-Ce;if(de.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX($e),Z.translateZ(_e),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ie[10]===-1)Z.projectionMatrix.copy(de.projectionMatrix),Z.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Ut=wt+_e,At=Qe+_e,T=Te-$e,x=xt+(De-$e),z=D*Qe/At*Ut,Y=ht*Qe/At*Ut;Z.projectionMatrix.makePerspective(T,x,z,Y,Ut,At),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pe(Z,de){de===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(de.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let de=Z.near,ae=Z.far;_.texture!==null&&(_.depthNear>0&&(de=_.depthNear),_.depthFar>0&&(ae=_.depthFar)),A.near=E.near=P.near=de,A.far=E.far=P.far=ae,(O!==A.near||G!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),O=A.near,G=A.far),A.layers.mask=Z.layers.mask|6,P.layers.mask=A.layers.mask&3,E.layers.mask=A.layers.mask&5;const De=Z.parent,Ie=A.cameras;pe(A,De);for(let ke=0;ke<Ie.length;ke++)pe(Ie[ke],De);Ie.length===2?le(A,P,E):A.projectionMatrix.copy(P.projectionMatrix),Ae(Z,A,De)};function Ae(Z,de,ae){ae===null?Z.matrix.copy(de.matrixWorld):(Z.matrix.copy(ae.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(de.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(de.projectionMatrix),Z.projectionMatrixInverse.copy(de.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Es*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(Z){return m[Z]};let Ye=null;function _t(Z,de){if(h=de.getViewerPose(l||a),g=de,h!==null){const ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let De=!1;ae.length!==A.cameras.length&&(A.cameras.length=0,De=!0);for(let Qe=0;Qe<ae.length;Qe++){const D=ae[Qe];let ht=null;if(p!==null)ht=p.getViewport(D);else{const nt=f.getViewSubImage(u,D);ht=nt.viewport,Qe===0&&(e.setRenderTargetTextures(b,nt.colorTexture,nt.depthStencilTexture),e.setRenderTarget(b))}let Ce=y[Qe];Ce===void 0&&(Ce=new jt,Ce.layers.enable(Qe),Ce.viewport=new ot,y[Qe]=Ce),Ce.matrix.fromArray(D.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(D.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(ht.x,ht.y,ht.width,ht.height),Qe===0&&(A.matrix.copy(Ce.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),De===!0&&A.cameras.push(Ce)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&f){const Qe=f.getDepthInformation(ae[0]);Qe&&Qe.isValid&&Qe.texture&&_.init(Qe,s.renderState)}if(Ie&&Ie.includes("camera-access")&&(e.state.unbindTexture(),f))for(let Qe=0;Qe<ae.length;Qe++){const D=ae[Qe].camera;if(D){let ht=m[D];ht||(ht=new kd,m[D]=ht);const Ce=f.getCameraImage(D);ht.sourceTexture=Ce}}}for(let ae=0;ae<v.length;ae++){const De=R[ae],Ie=v[ae];De!==null&&Ie!==void 0&&Ie.update(De,de,l||a)}Ye&&Ye(Z,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),g=null}const dt=new ud;dt.setAnimationLoop(_t),this.setAnimationLoop=function(Z){Ye=Z},this.dispose=function(){}}}const Mi=new pn,Mg=new rt;function Sg(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,zl(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,M,b,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),u(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,M,b):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Wt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Wt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=e.get(d),b=M.envMap,v=M.envMapRotation;b&&(m.envMap.value=b,Mi.copy(v),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),m.envMapRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(Mi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,M,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=b*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Wt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const M=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function yg(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const v=b.program;i.uniformBlockBinding(M,v)}function l(M,b){let v=s[M.id];v===void 0&&(g(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",m));const R=b.program;i.updateUBOMapping(M,R);const w=e.render.frame;r[M.id]!==w&&(u(M),r[M.id]=w)}function h(M){const b=f();M.__bindingPointIndex=b;const v=n.createBuffer(),R=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,v),v}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const b=s[M.id],v=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let w=0,C=v.length;w<C;w++){const P=Array.isArray(v[w])?v[w]:[v[w]];for(let E=0,y=P.length;E<y;E++){const A=P[E];if(p(A,w,E,R)===!0){const O=A.__offset,G=Array.isArray(A.value)?A.value:[A.value];let H=0;for(let J=0;J<G.length;J++){const V=G[J],ne=_(V);typeof V=="number"||typeof V=="boolean"?(A.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,O+H,A.__data)):V.isMatrix3?(A.__data[0]=V.elements[0],A.__data[1]=V.elements[1],A.__data[2]=V.elements[2],A.__data[3]=0,A.__data[4]=V.elements[3],A.__data[5]=V.elements[4],A.__data[6]=V.elements[5],A.__data[7]=0,A.__data[8]=V.elements[6],A.__data[9]=V.elements[7],A.__data[10]=V.elements[8],A.__data[11]=0):(V.toArray(A.__data,H),H+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,b,v,R){const w=M.value,C=b+"_"+v;if(R[C]===void 0)return typeof w=="number"||typeof w=="boolean"?R[C]=w:R[C]=w.clone(),!0;{const P=R[C];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[C]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(M){const b=M.uniforms;let v=0;const R=16;for(let C=0,P=b.length;C<P;C++){const E=Array.isArray(b[C])?b[C]:[b[C]];for(let y=0,A=E.length;y<A;y++){const O=E[y],G=Array.isArray(O.value)?O.value:[O.value];for(let H=0,J=G.length;H<J;H++){const V=G[H],ne=_(V),W=v%R,le=W%ne.boundary,pe=W+le;v+=le,pe!==0&&R-pe<ne.storage&&(v+=R-pe),O.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=ne.storage}}}const w=v%R;return w>0&&(v+=R-w),M.__size=v,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const v=a.indexOf(b.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}class Eg{constructor(e={}){const{canvas:t=Ch(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=$t;let w=0,C=0,P=null,E=-1,y=null;const A=new ot,O=new ot;let G=null;const H=new Ne(0);let J=0,V=t.width,ne=t.height,W=1,le=null,pe=null;const Ae=new ot(0,0,V,ne),Ye=new ot(0,0,V,ne);let _t=!1;const dt=new Ko;let Z=!1,de=!1;const ae=new rt,De=new L,Ie=new ot,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function Qe(){return P===null?W:1}let D=i;function ht(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",ee,!1),D===null){const N="webgl2";if(D=ht(N,S),D===null)throw ht(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ce,nt,Te,xt,_e,$e,Ut,At,T,x,z,Y,Q,X,be,re,Me,ye,ie,fe,Oe,Ee,ue,We;function U(){Ce=new Im(D),Ce.init(),Ee=new mg(D,Ce),nt=new wm(D,Ce,e,Ee),Te=new fg(D,Ce),nt.reversedDepthBuffer&&u&&Te.buffers.depth.setReversed(!0),xt=new Fm(D),_e=new eg,$e=new pg(D,Ce,Te,_e,nt,Ee,xt),Ut=new Rm(v),At=new Dm(v),T=new yf(D),ue=new bm(D,T),x=new Um(D,T,xt,ue),z=new zm(D,x,T,xt),ie=new Om(D,nt,$e),re=new Am(_e),Y=new Q0(v,Ut,At,Ce,nt,ue,re),Q=new Sg(v,_e),X=new ng,be=new cg(Ce),ye=new Em(v,Ut,At,Te,z,p,c),Me=new ug(v,z,nt),We=new yg(D,xt,nt,Te),fe=new Tm(D,Ce,xt),Oe=new Nm(D,Ce,xt),xt.programs=Y.programs,v.capabilities=nt,v.extensions=Ce,v.properties=_e,v.renderLists=X,v.shadowMap=Me,v.state=Te,v.info=xt}U();const se=new vg(v,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Ce.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ce.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(V,ne,!1))},this.getSize=function(S){return S.set(V,ne)},this.setSize=function(S,N,B=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=S,ne=N,t.width=Math.floor(S*W),t.height=Math.floor(N*W),B===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(V*W,ne*W).floor()},this.setDrawingBufferSize=function(S,N,B){V=S,ne=N,W=B,t.width=Math.floor(S*B),t.height=Math.floor(N*B),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(Ae)},this.setViewport=function(S,N,B,k){S.isVector4?Ae.set(S.x,S.y,S.z,S.w):Ae.set(S,N,B,k),Te.viewport(A.copy(Ae).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Ye)},this.setScissor=function(S,N,B,k){S.isVector4?Ye.set(S.x,S.y,S.z,S.w):Ye.set(S,N,B,k),Te.scissor(O.copy(Ye).multiplyScalar(W).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(S){Te.setScissorTest(_t=S)},this.setOpaqueSort=function(S){le=S},this.setTransparentSort=function(S){pe=S},this.getClearColor=function(S){return S.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,B=!0){let k=0;if(S){let F=!1;if(P!==null){const te=P.texture.format;F=te===$a||te===Ya||te===qa}if(F){const te=P.texture.type,he=te===Mn||te===oi||te===_s||te===vs||te===Va||te===Wa,xe=ye.getClearColor(),me=ye.getClearAlpha(),Ue=xe.r,ze=xe.g,Re=xe.b;he?(g[0]=Ue,g[1]=ze,g[2]=Re,g[3]=me,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Ue,_[1]=ze,_[2]=Re,_[3]=me,D.clearBufferiv(D.COLOR,0,_))}else k|=D.COLOR_BUFFER_BIT}N&&(k|=D.DEPTH_BUFFER_BIT),B&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),ye.dispose(),X.dispose(),be.dispose(),_e.dispose(),Ut.dispose(),At.dispose(),z.dispose(),ue.dispose(),We.dispose(),Y.dispose(),se.dispose(),se.removeEventListener("sessionstart",wn),se.removeEventListener("sessionend",Su),wi.stop()};function oe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const S=xt.autoReset,N=Me.enabled,B=Me.autoUpdate,k=Me.needsUpdate,F=Me.type;U(),xt.autoReset=S,Me.enabled=N,Me.autoUpdate=B,Me.needsUpdate=k,Me.type=F}function ee(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function j(S){const N=S.target;N.removeEventListener("dispose",j),ve(N)}function ve(S){He(S),_e.remove(S)}function He(S){const N=_e.get(S).programs;N!==void 0&&(N.forEach(function(B){Y.releaseProgram(B)}),S.isShaderMaterial&&Y.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,B,k,F,te){N===null&&(N=ke);const he=F.isMesh&&F.matrixWorld.determinant()<0,xe=V_(S,N,B,k,F);Te.setMaterial(k,he);let me=B.index,Ue=1;if(k.wireframe===!0){if(me=x.getWireframeAttribute(B),me===void 0)return;Ue=2}const ze=B.drawRange,Re=B.attributes.position;let Ke=ze.start*Ue,lt=(ze.start+ze.count)*Ue;te!==null&&(Ke=Math.max(Ke,te.start*Ue),lt=Math.min(lt,(te.start+te.count)*Ue)),me!==null?(Ke=Math.max(Ke,0),lt=Math.min(lt,me.count)):Re!=null&&(Ke=Math.max(Ke,0),lt=Math.min(lt,Re.count));const Et=lt-Ke;if(Et<0||Et===1/0)return;ue.setup(F,k,xe,B,me);let mt,ut=fe;if(me!==null&&(mt=T.get(me),ut=Oe,ut.setIndex(mt)),F.isMesh)k.wireframe===!0?(Te.setLineWidth(k.wireframeLinewidth*Qe()),ut.setMode(D.LINES)):ut.setMode(D.TRIANGLES);else if(F.isLine){let Pe=k.linewidth;Pe===void 0&&(Pe=1),Te.setLineWidth(Pe*Qe()),F.isLineSegments?ut.setMode(D.LINES):F.isLineLoop?ut.setMode(D.LINE_LOOP):ut.setMode(D.LINE_STRIP)}else F.isPoints?ut.setMode(D.POINTS):F.isSprite&&ut.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Fi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ce.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pe=F._multiDrawStarts,vt=F._multiDrawCounts,tt=F._multiDrawCount,tn=me?T.get(me).bytesPerElement:1,gs=_e.get(k).currentProgram.getUniforms();for(let nn=0;nn<tt;nn++)gs.setValue(D,"_gl_DrawID",nn),ut.render(Pe[nn]/tn,vt[nn])}else if(F.isInstancedMesh)ut.renderInstances(Ke,Et,F.count);else if(B.isInstancedBufferGeometry){const Pe=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,vt=Math.min(B.instanceCount,Pe);ut.renderInstances(Ke,Et,vt)}else ut.render(Ke,Et)};function ft(S,N,B){S.transparent===!0&&S.side===sn&&S.forceSinglePass===!1?(S.side=Wt,S.needsUpdate=!0,wa(S,N,B),S.side=Vn,S.needsUpdate=!0,wa(S,N,B),S.side=sn):wa(S,N,B)}this.compile=function(S,N,B=null){B===null&&(B=S),d=be.get(B),d.init(N),b.push(d),B.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),S!==B&&S.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const k=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const te=F.material;if(te)if(Array.isArray(te))for(let he=0;he<te.length;he++){const xe=te[he];ft(xe,B,F),k.add(xe)}else ft(te,B,F),k.add(te)}),d=b.pop(),k},this.compileAsync=function(S,N,B=null){const k=this.compile(S,N,B);return new Promise(F=>{function te(){if(k.forEach(function(he){_e.get(he).currentProgram.isReady()&&k.delete(he)}),k.size===0){F(S);return}setTimeout(te,10)}Ce.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let it=null;function Gn(S){it&&it(S)}function wn(){wi.stop()}function Su(){wi.start()}const wi=new ud;wi.setAnimationLoop(Gn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(S){it=S,se.setAnimationLoop(S),S===null?wi.stop():wi.start()},se.addEventListener("sessionstart",wn),se.addEventListener("sessionend",Su),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,N,P),d=be.get(S,b.length),d.init(N),b.push(d),ae.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),dt.setFromProjectionMatrix(ae,yn,N.reversedDepth),de=this.localClippingEnabled,Z=re.init(this.clippingPlanes,de),m=X.get(S,M.length),m.init(),M.push(m),se.enabled===!0&&se.isPresenting===!0){const te=v.xr.getDepthSensingMesh();te!==null&&$c(te,N,-1/0,v.sortObjects)}$c(S,N,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(le,pe),wt=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,wt&&ye.addToRenderList(m,S),this.info.render.frame++,Z===!0&&re.beginShadows();const B=d.state.shadowsArray;Me.render(B,S,N),Z===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,F=m.transmissive;if(d.setupLights(),N.isArrayCamera){const te=N.cameras;if(F.length>0)for(let he=0,xe=te.length;he<xe;he++){const me=te[he];Eu(k,F,S,me)}wt&&ye.render(S);for(let he=0,xe=te.length;he<xe;he++){const me=te[he];yu(m,S,me,me.viewport)}}else F.length>0&&Eu(k,F,S,N),wt&&ye.render(S),yu(m,S,N);P!==null&&C===0&&($e.updateMultisampleRenderTarget(P),$e.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(v,S,N),ue.resetDefaultState(),E=-1,y=null,b.pop(),b.length>0?(d=b[b.length-1],Z===!0&&re.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function $c(S,N,B,k){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||dt.intersectsSprite(S)){k&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ae);const he=z.update(S),xe=S.material;xe.visible&&m.push(S,he,xe,B,Ie.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||dt.intersectsObject(S))){const he=z.update(S),xe=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Ie.copy(he.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(ae)),Array.isArray(xe)){const me=he.groups;for(let Ue=0,ze=me.length;Ue<ze;Ue++){const Re=me[Ue],Ke=xe[Re.materialIndex];Ke&&Ke.visible&&m.push(S,he,Ke,B,Ie.z,Re)}}else xe.visible&&m.push(S,he,xe,B,Ie.z,null)}}const te=S.children;for(let he=0,xe=te.length;he<xe;he++)$c(te[he],N,B,k)}function yu(S,N,B,k){const F=S.opaque,te=S.transmissive,he=S.transparent;d.setupLightsView(B),Z===!0&&re.setGlobalState(v.clippingPlanes,B),k&&Te.viewport(A.copy(k)),F.length>0&&Ta(F,N,B),te.length>0&&Ta(te,N,B),he.length>0&&Ta(he,N,B),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Eu(S,N,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[k.id]===void 0&&(d.state.transmissionRenderTarget[k.id]=new ci(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float")?xs:Mn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const te=d.state.transmissionRenderTarget[k.id],he=k.viewport||A;te.setSize(he.z*v.transmissionResolutionScale,he.w*v.transmissionResolutionScale);const xe=v.getRenderTarget(),me=v.getActiveCubeFace(),Ue=v.getActiveMipmapLevel();v.setRenderTarget(te),v.getClearColor(H),J=v.getClearAlpha(),J<1&&v.setClearColor(16777215,.5),v.clear(),wt&&ye.render(B);const ze=v.toneMapping;v.toneMapping=Xn;const Re=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),d.setupLightsView(k),Z===!0&&re.setGlobalState(v.clippingPlanes,k),Ta(S,B,k),$e.updateMultisampleRenderTarget(te),$e.updateRenderTargetMipmap(te),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let lt=0,Et=N.length;lt<Et;lt++){const mt=N[lt],ut=mt.object,Pe=mt.geometry,vt=mt.material,tt=mt.group;if(vt.side===sn&&ut.layers.test(k.layers)){const tn=vt.side;vt.side=Wt,vt.needsUpdate=!0,bu(ut,B,k,Pe,vt,tt),vt.side=tn,vt.needsUpdate=!0,Ke=!0}}Ke===!0&&($e.updateMultisampleRenderTarget(te),$e.updateRenderTargetMipmap(te))}v.setRenderTarget(xe,me,Ue),v.setClearColor(H,J),Re!==void 0&&(k.viewport=Re),v.toneMapping=ze}function Ta(S,N,B){const k=N.isScene===!0?N.overrideMaterial:null;for(let F=0,te=S.length;F<te;F++){const he=S[F],xe=he.object,me=he.geometry,Ue=he.group;let ze=he.material;ze.allowOverride===!0&&k!==null&&(ze=k),xe.layers.test(B.layers)&&bu(xe,N,B,me,ze,Ue)}}function bu(S,N,B,k,F,te){S.onBeforeRender(v,N,B,k,F,te),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(v,N,B,k,S,te),F.transparent===!0&&F.side===sn&&F.forceSinglePass===!1?(F.side=Wt,F.needsUpdate=!0,v.renderBufferDirect(B,N,k,F,S,te),F.side=Vn,F.needsUpdate=!0,v.renderBufferDirect(B,N,k,F,S,te),F.side=sn):v.renderBufferDirect(B,N,k,F,S,te),S.onAfterRender(v,N,B,k,F,te)}function wa(S,N,B){N.isScene!==!0&&(N=ke);const k=_e.get(S),F=d.state.lights,te=d.state.shadowsArray,he=F.state.version,xe=Y.getParameters(S,F.state,te,N,B),me=Y.getProgramCacheKey(xe);let Ue=k.programs;k.environment=S.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(S.isMeshStandardMaterial?At:Ut).get(S.envMap||k.environment),k.envMapRotation=k.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",j),Ue=new Map,k.programs=Ue);let ze=Ue.get(me);if(ze!==void 0){if(k.currentProgram===ze&&k.lightsStateVersion===he)return wu(S,xe),ze}else xe.uniforms=Y.getUniforms(S),S.onBeforeCompile(xe,v),ze=Y.acquireProgram(xe,me),Ue.set(me,ze),k.uniforms=xe.uniforms;const Re=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=re.uniform),wu(S,xe),k.needsLights=X_(S),k.lightsStateVersion=he,k.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMap.value=F.state.directionalShadowMap,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotShadowMap.value=F.state.spotShadowMap,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMap.value=F.state.pointShadowMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=ze,k.uniformsList=null,ze}function Tu(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=$r.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function wu(S,N){const B=_e.get(S);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function V_(S,N,B,k,F){N.isScene!==!0&&(N=ke),$e.resetTextureUnits();const te=N.fog,he=k.isMeshStandardMaterial?N.environment:null,xe=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Di,me=(k.isMeshStandardMaterial?At:Ut).get(k.envMap||he),Ue=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,ze=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Re=!!B.morphAttributes.position,Ke=!!B.morphAttributes.normal,lt=!!B.morphAttributes.color;let Et=Xn;k.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Et=v.toneMapping);const mt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ut=mt!==void 0?mt.length:0,Pe=_e.get(k),vt=d.state.lights;if(Z===!0&&(de===!0||S!==y)){const Vt=S===y&&k.id===E;re.setState(k,S,Vt)}let tt=!1;k.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==vt.state.version||Pe.outputColorSpace!==xe||F.isBatchedMesh&&Pe.batching===!1||!F.isBatchedMesh&&Pe.batching===!0||F.isBatchedMesh&&Pe.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pe.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pe.instancing===!1||!F.isInstancedMesh&&Pe.instancing===!0||F.isSkinnedMesh&&Pe.skinning===!1||!F.isSkinnedMesh&&Pe.skinning===!0||F.isInstancedMesh&&Pe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pe.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pe.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pe.instancingMorph===!1&&F.morphTexture!==null||Pe.envMap!==me||k.fog===!0&&Pe.fog!==te||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==re.numPlanes||Pe.numIntersection!==re.numIntersection)||Pe.vertexAlphas!==Ue||Pe.vertexTangents!==ze||Pe.morphTargets!==Re||Pe.morphNormals!==Ke||Pe.morphColors!==lt||Pe.toneMapping!==Et||Pe.morphTargetsCount!==ut)&&(tt=!0):(tt=!0,Pe.__version=k.version);let tn=Pe.currentProgram;tt===!0&&(tn=wa(k,N,F));let gs=!1,nn=!1,er=!1;const Mt=tn.getUniforms(),cn=Pe.uniforms;if(Te.useProgram(tn.program)&&(gs=!0,nn=!0,er=!0),k.id!==E&&(E=k.id,nn=!0),gs||y!==S){Te.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Mt.setValue(D,"projectionMatrix",S.projectionMatrix),Mt.setValue(D,"viewMatrix",S.matrixWorldInverse);const qt=Mt.map.cameraPosition;qt!==void 0&&qt.setValue(D,De.setFromMatrixPosition(S.matrixWorld)),nt.logarithmicDepthBuffer&&Mt.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Mt.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,nn=!0,er=!0)}if(F.isSkinnedMesh){Mt.setOptional(D,F,"bindMatrix"),Mt.setOptional(D,F,"bindMatrixInverse");const Vt=F.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),Mt.setValue(D,"boneTexture",Vt.boneTexture,$e))}F.isBatchedMesh&&(Mt.setOptional(D,F,"batchingTexture"),Mt.setValue(D,"batchingTexture",F._matricesTexture,$e),Mt.setOptional(D,F,"batchingIdTexture"),Mt.setValue(D,"batchingIdTexture",F._indirectTexture,$e),Mt.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&Mt.setValue(D,"batchingColorTexture",F._colorsTexture,$e));const ln=B.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&ie.update(F,B,tn),(nn||Pe.receiveShadow!==F.receiveShadow)&&(Pe.receiveShadow=F.receiveShadow,Mt.setValue(D,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(cn.envMap.value=me,cn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(cn.envMapIntensity.value=N.environmentIntensity),nn&&(Mt.setValue(D,"toneMappingExposure",v.toneMappingExposure),Pe.needsLights&&W_(cn,er),te&&k.fog===!0&&Q.refreshFogUniforms(cn,te),Q.refreshMaterialUniforms(cn,k,W,ne,d.state.transmissionRenderTarget[S.id]),$r.upload(D,Tu(Pe),cn,$e)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&($r.upload(D,Tu(Pe),cn,$e),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Mt.setValue(D,"center",F.center),Mt.setValue(D,"modelViewMatrix",F.modelViewMatrix),Mt.setValue(D,"normalMatrix",F.normalMatrix),Mt.setValue(D,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Vt=k.uniformsGroups;for(let qt=0,Zc=Vt.length;qt<Zc;qt++){const Ai=Vt[qt];We.update(Ai,tn),We.bind(Ai,tn)}}return tn}function W_(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function X_(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,N,B){const k=_e.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),_e.get(S.texture).__webglTexture=N,_e.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:B,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const B=_e.get(S);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const q_=D.createFramebuffer();this.setRenderTarget=function(S,N=0,B=0){P=S,w=N,C=B;let k=!0,F=null,te=!1,he=!1;if(S){const me=_e.get(S);if(me.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(D.FRAMEBUFFER,null),k=!1;else if(me.__webglFramebuffer===void 0)$e.setupRenderTarget(S);else if(me.__hasExternalTextures)$e.rebindTextures(S,_e.get(S.texture).__webglTexture,_e.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Re=S.depthTexture;if(me.__boundDepthTexture!==Re){if(Re!==null&&_e.has(Re)&&(S.width!==Re.image.width||S.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$e.setupDepthRenderbuffer(S)}}const Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(he=!0);const ze=_e.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ze[N])?F=ze[N][B]:F=ze[N],te=!0):S.samples>0&&$e.useMultisampledRTT(S)===!1?F=_e.get(S).__webglMultisampledFramebuffer:Array.isArray(ze)?F=ze[B]:F=ze,A.copy(S.viewport),O.copy(S.scissor),G=S.scissorTest}else A.copy(Ae).multiplyScalar(W).floor(),O.copy(Ye).multiplyScalar(W).floor(),G=_t;if(B!==0&&(F=q_),Te.bindFramebuffer(D.FRAMEBUFFER,F)&&k&&Te.drawBuffers(S,F),Te.viewport(A),Te.scissor(O),Te.setScissorTest(G),te){const me=_e.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,me.__webglTexture,B)}else if(he){const me=N;for(let Ue=0;Ue<S.textures.length;Ue++){const ze=_e.get(S.textures[Ue]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ue,ze.__webglTexture,B,me)}}else if(S!==null&&B!==0){const me=_e.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,me.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(S,N,B,k,F,te,he,xe=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me){Te.bindFramebuffer(D.FRAMEBUFFER,me);try{const Ue=S.textures[xe],ze=Ue.format,Re=Ue.type;if(!nt.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-k&&B>=0&&B<=S.height-F&&(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),D.readPixels(N,B,k,F,Ee.convert(ze),Ee.convert(Re),te))}finally{const Ue=P!==null?_e.get(P).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(S,N,B,k,F,te,he,xe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=_e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me)if(N>=0&&N<=S.width-k&&B>=0&&B<=S.height-F){Te.bindFramebuffer(D.FRAMEBUFFER,me);const Ue=S.textures[xe],ze=Ue.format,Re=Ue.type;if(!nt.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ke),D.bufferData(D.PIXEL_PACK_BUFFER,te.byteLength,D.STREAM_READ),S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),D.readPixels(N,B,k,F,Ee.convert(ze),Ee.convert(Re),0);const lt=P!==null?_e.get(P).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,lt);const Et=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Ph(D,Et,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ke),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,te),D.deleteBuffer(Ke),D.deleteSync(Et),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,B=0){const k=Math.pow(2,-B),F=Math.floor(S.image.width*k),te=Math.floor(S.image.height*k),he=N!==null?N.x:0,xe=N!==null?N.y:0;$e.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,he,xe,F,te),Te.unbindTexture()};const Y_=D.createFramebuffer(),$_=D.createFramebuffer();this.copyTextureToTexture=function(S,N,B=null,k=null,F=0,te=null){te===null&&(F!==0?(Fi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=F,F=0):te=0);let he,xe,me,Ue,ze,Re,Ke,lt,Et;const mt=S.isCompressedTexture?S.mipmaps[te]:S.image;if(B!==null)he=B.max.x-B.min.x,xe=B.max.y-B.min.y,me=B.isBox3?B.max.z-B.min.z:1,Ue=B.min.x,ze=B.min.y,Re=B.isBox3?B.min.z:0;else{const ln=Math.pow(2,-F);he=Math.floor(mt.width*ln),xe=Math.floor(mt.height*ln),S.isDataArrayTexture?me=mt.depth:S.isData3DTexture?me=Math.floor(mt.depth*ln):me=1,Ue=0,ze=0,Re=0}k!==null?(Ke=k.x,lt=k.y,Et=k.z):(Ke=0,lt=0,Et=0);const ut=Ee.convert(N.format),Pe=Ee.convert(N.type);let vt;N.isData3DTexture?($e.setTexture3D(N,0),vt=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?($e.setTexture2DArray(N,0),vt=D.TEXTURE_2D_ARRAY):($e.setTexture2D(N,0),vt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const tt=D.getParameter(D.UNPACK_ROW_LENGTH),tn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),gs=D.getParameter(D.UNPACK_SKIP_PIXELS),nn=D.getParameter(D.UNPACK_SKIP_ROWS),er=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ue),D.pixelStorei(D.UNPACK_SKIP_ROWS,ze),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Re);const Mt=S.isDataArrayTexture||S.isData3DTexture,cn=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const ln=_e.get(S),Vt=_e.get(N),qt=_e.get(ln.__renderTarget),Zc=_e.get(Vt.__renderTarget);Te.bindFramebuffer(D.READ_FRAMEBUFFER,qt.__webglFramebuffer),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,Zc.__webglFramebuffer);for(let Ai=0;Ai<me;Ai++)Mt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.get(S).__webglTexture,F,Re+Ai),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.get(N).__webglTexture,te,Et+Ai)),D.blitFramebuffer(Ue,ze,he,xe,Ke,lt,he,xe,D.DEPTH_BUFFER_BIT,D.NEAREST);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||_e.has(S)){const ln=_e.get(S),Vt=_e.get(N);Te.bindFramebuffer(D.READ_FRAMEBUFFER,Y_),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,$_);for(let qt=0;qt<me;qt++)Mt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ln.__webglTexture,F,Re+qt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ln.__webglTexture,F),cn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vt.__webglTexture,te,Et+qt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Vt.__webglTexture,te),F!==0?D.blitFramebuffer(Ue,ze,he,xe,Ke,lt,he,xe,D.COLOR_BUFFER_BIT,D.NEAREST):cn?D.copyTexSubImage3D(vt,te,Ke,lt,Et+qt,Ue,ze,he,xe):D.copyTexSubImage2D(vt,te,Ke,lt,Ue,ze,he,xe);Te.bindFramebuffer(D.READ_FRAMEBUFFER,null),Te.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else cn?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(vt,te,Ke,lt,Et,he,xe,me,ut,Pe,mt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(vt,te,Ke,lt,Et,he,xe,me,ut,mt.data):D.texSubImage3D(vt,te,Ke,lt,Et,he,xe,me,ut,Pe,mt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,te,Ke,lt,he,xe,ut,Pe,mt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,te,Ke,lt,mt.width,mt.height,ut,mt.data):D.texSubImage2D(D.TEXTURE_2D,te,Ke,lt,he,xe,ut,Pe,mt);D.pixelStorei(D.UNPACK_ROW_LENGTH,tt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,tn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,gs),D.pixelStorei(D.UNPACK_SKIP_ROWS,nn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,er),te===0&&N.generateMipmaps&&D.generateMipmap(vt),Te.unbindTexture()},this.copyTextureToTexture3D=function(S,N,B=null,k=null,F=0){return Fi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,B,k,F)},this.initRenderTarget=function(S){_e.get(S).__webglFramebuffer===void 0&&$e.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?$e.setTextureCube(S,0):S.isData3DTexture?$e.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?$e.setTexture2DArray(S,0):$e.setTexture2D(S,0),Te.unbindTexture()},this.resetState=function(){w=0,C=0,P=null,Te.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Hd=document.createElement("style");Hd.innerHTML=`
  html, body { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; background: #0a0a0a; font-family: system-ui, sans-serif; }
  #app { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
  #scene { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
  #scene canvas { display: block; width: 100% !important; height: 100% !important; }
  #hud { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; }
  .panel, select, input, button, .zone-dot { pointer-events: auto; }
  .zone-dot.ignition { background-color: #ff3300 !important; box-shadow: 0 0 10px #ff3300; }
`,document.head.appendChild(Hd);const I={activeScenario:"Normal Forest",intensity:75,baseTemp:32,timeMinutes:582,temperature:32,humidity:42,fireRisk:65,rainfall:0,windSpeed:18,soilMoisture:48,vegetationHealth:78,waterAvailability:68,wildlifeActivity:75,humanPressure:24,eventDetected:!1,alertMessage:"System operational.",recommendedAction:"Routine automated monitoring active.",riskAnalysisLevel:"LOW",isLiveSync:!1},Gt={"NLM-01":{name:"NLM-01",sub:"Atmakur Northern Buffer",area:"312.4 km²",elev:"410 m",slope:"12°",baseVeg:85,baseWater:72,xMin:-500,xMax:-250,zMin:-500,zMax:-250,cX:-375,cZ:-375,station:"Atmakur Range HQ",eta:"18 mins"},"NLM-02":{name:"NLM-02",sub:"Markapur Eastern Ridge",area:"389.1 km²",elev:"525 m",slope:"22°",baseVeg:64,baseWater:45,xMin:-250,xMax:0,zMin:-500,zMax:-250,cX:-125,cZ:-375,station:"Markapur Outpost",eta:"24 mins"},"NLM-03":{name:"NLM-03",sub:"Bairluty Sanctuary Core",area:"450.8 km²",elev:"580 m",slope:"15°",baseVeg:92,baseWater:80,xMin:0,xMax:250,zMin:-500,zMax:-250,cX:125,cZ:-375,station:"Bairluty Eco-Depot",eta:"12 mins"},"NLM-04":{name:"NLM-04",sub:"Srisailam Core Plateau",area:"428.63 km²",elev:"612 m",slope:"18°",baseVeg:78,baseWater:68,xMin:-250,xMax:0,zMin:-250,zMax:0,cX:-125,cZ:-125,station:"Srisailam Central Command",eta:"8 mins",river:"Krishna River (Srisailam Gorge)"},"NLM-05":{name:"NLM-05",sub:"Dornala Southern Buffer",area:"365.2 km²",elev:"390 m",slope:"8°",baseVeg:70,baseWater:55,xMin:0,xMax:250,zMin:-250,zMax:0,cX:125,cZ:-125,station:"Dornala Checkpost",eta:"20 mins"},"NLM-06":{name:"NLM-06",sub:"Gundla Brahmeswaram Core",area:"512.7 km²",elev:"740 m",slope:"26°",baseVeg:88,baseWater:85,xMin:-500,xMax:-250,zMin:0,zMax:250,cX:-375,cZ:125,station:"GBM Sanctuary Post",eta:"32 mins",river:"Gundlakamma River (headwaters)"},"NLM-07":{name:"NLM-07",sub:"Nandyal Western Escarpment",area:"298.5 km²",elev:"480 m",slope:"31°",baseVeg:55,baseWater:38,xMin:-250,xMax:0,zMin:0,zMax:500,cX:-125,cZ:250,station:"Nandyal West Station",eta:"15 mins"},"NLM-08":{name:"NLM-08",sub:"Rollapandu Wildlife Corridor",area:"340.9 km²",elev:"320 m",slope:"4°",baseVeg:60,baseWater:40,xMin:0,xMax:500,zMin:0,zMax:500,cX:250,cZ:250,station:"Rollapandu Guard Hut",eta:"22 mins"}};let Bt="NLM-04";Object.values(Gt).forEach(n=>{n.elevM=parseFloat(n.elev),n.slopeDeg=parseFloat(n.slope)});const Gd=Object.values(Gt).map(n=>({x:n.cX,z:n.cZ,h:n.elevM,s:n.slopeDeg})),bg=Math.min(...Gd.map(n=>n.h)),Tg=.3,wg=document.querySelector("#app");wg.innerHTML=`
<div id="scene"></div>
<div id="zonePinsContainer" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden;"></div>
<div id="hud">
  <div id="brand" class="panel">
    <span>🌲</span><strong>VANMATHI</strong><span>NALLAMALA SIMULATOR</span>
    <b id="live">● LIVE</b>
    <button id="dataFeedToggle">📡 MANUAL LAB</button>
  </div>
  <div id="leftStack">
  <div id="controls" class="panel">
    <div class="eyebrow">NALLAMALA SCENARIO LAB</div><h2>Environmental Response Simulator</h2>
    <div class="row"><span>Scenario</span></div>
    <select id="scenario">
      <option>Normal Forest</option><option>Forest Fire</option><option>Heavy Rain</option><option>Illegal Wood Cutting</option><option>Landslide</option><option>Drought</option>
    </select>
    <div class="row"><span>Intensity</span><b id="intensityVal">75%</b></div><input id="intensity" type="range" min="0" max="100" value="75">
    <div class="row"><span>Temperature</span><b id="tempVal">32°C</b></div><input id="temp" type="range" min="12" max="46" value="32">
    <div class="row"><span>Time (IST)</span><b id="timeVal">09:42</b></div><input id="time" type="range" min="0" max="1439" value="582">
    <div class="buttons">
      <button id="start">▶ START</button>
      <button id="navModeBtn">🚶 WALK MODE</button>
      <button id="audioBtn">🔊 AUDIO: OFF</button>
      <button id="reset">↻ RESET</button>
    </div>
    <div class="row compact-row"><span>Quality</span></div>
    <select id="qualitySelect">
      <option value="high">High</option>
      <option value="medium" selected>Medium</option>
      <option value="low">Low</option>
    </select>
    <div class="checks">
      <label><input id="grass" type="checkbox" checked> Grass Vegetation</label>
      <label><input id="wildlife" type="checkbox" checked> Wildlife Fauna</label>
      <label><input id="atmo" type="checkbox" checked> Atmospheric Fog</label>
    </div>
  </div>
  <div id="zoneEnv" class="panel side-card">
    <div class="eyebrow">ZONE ENVIRONMENT</div>
    <div class="selected-zone"><span>Selected</span><b id="selectedZone">NLM-04 • Core</b></div>
    <div class="env-row"><span>Temperature</span><b id="envTemp">32°C</b></div><div class="env-bar"><i id="envTempBar"></i></div>
    <div class="env-row"><span>Humidity</span><b id="envHumidity">42%</b></div><div class="env-bar"><i id="envHumidityBar"></i></div>
    <div class="env-row"><span>Rainfall</span><b id="envRain">0 mm/hr</b></div><div class="env-bar"><i id="envRainBar"></i></div>
    <div class="env-row"><span>Wind</span><b id="envWind">18 km/h</b></div><div class="env-bar"><i id="envWindBar"></i></div>
    <div class="env-row"><span>Soil moisture</span><b id="envSoil">48%</b></div><div class="env-bar"><i id="envSoilBar"></i></div>
    <div class="env-row"><span>Vegetation</span><b id="envVegetation">78%</b></div><div class="env-bar"><i id="envVegetationBar"></i></div>
  </div>
  </div>
  <div id="stats">
    <div class="stat panel"><small>TEMP</small><b id="sTemp">32°C</b></div>
    <div class="stat panel"><small>HUMIDITY</small><b id="humidity">42%</b></div>
    <div class="stat panel"><small>FIRE RISK</small><b id="risk">65%</b></div>
    <div class="stat panel"><small>FPS</small><b id="fps">--</b></div>
  </div>
  <div id="info" class="panel"><strong id="scenarioTitle">Simulation Running</strong><div id="scenarioDesc" class="muted">Dynamic high-density ecosystem, intelligent predator-prey roaming, and audio engine active.</div><div id="eventReadout" class="event-readout"></div></div>
  <div id="sideDetails">
    <div id="mapCard" class="panel side-card">
      <div class="side-title"><strong>NALLAMALA ZONES</strong><span>GIS MAP</span></div>
      <div id="miniMap">
        <div class="map-grid"></div>
        <span class="zone-dot z1" data-zone="NLM-01">NLM-01</span><span class="zone-dot z2" data-zone="NLM-02">NLM-02</span>
        <span class="zone-dot z3" data-zone="NLM-03">NLM-03</span><span class="zone-dot z4 active" data-zone="NLM-04">NLM-04</span>
        <span class="zone-dot z5" data-zone="NLM-05">NLM-05</span><span class="zone-dot z6" data-zone="NLM-06">NLM-06</span>
        <span class="zone-dot z7" data-zone="NLM-07">NLM-07</span><span class="zone-dot z8" data-zone="NLM-08">NLM-08</span>
      </div>
      <div class="map-legend"><span>🟩 Biome Zones</span><span>🔥 Ignition</span></div>
    </div>
    <div id="detailZone" class="panel side-card">
      <div class="eyebrow">ZONE INFORMATION</div>
      <h2 id="detailZoneName">NLM-04</h2><div class="zone-sub">SRISAILAM CORE ZONE</div>
      <div id="detailRiver" class="muted" style="display:none; font-size:11px; margin:2px 0 6px; opacity:0.85;">🏞 <span id="detailRiverText"></span></div>
      <div class="detail-grid">
        <div><small>Area</small><b>428.63 km²</b></div><div><small>Center</small><b>16.11°N</b></div>
        <div><small>Elevation</small><b>612 m</b></div><div><small>Slope</small><b>18°</b></div>
      </div>
      <div class="meter-row"><span>Vegetation Health</span><b id="detailVeg">78%</b></div><div class="meter"><i id="detailVegBar"></i></div>
      <div class="meter-row"><span>Water Availability</span><b id="detailWater">68%</b></div><div class="meter"><i id="detailWaterBar"></i></div>
      <div class="meter-row"><span>Wildlife Activity</span><b id="detailWild">75%</b></div><div class="meter"><i id="detailWildBar"></i></div>
      <div class="meter-row"><span>Fire Risk</span><b id="detailFire">65%</b></div><div class="meter"><i id="detailFireBar"></i></div>
      <div class="meter-row"><span>Human Pressure</span><b id="detailHuman">24%</b></div><div class="meter"><i id="detailHumanBar"></i></div>
    </div>
    <div id="alertsCard" class="panel side-card">
      <div class="side-title"><strong>ALERTS FEED</strong><span id="alertCount">LIVE</span></div>
      <div id="alertsFeed"></div>
    </div>
  </div>
  <div id="hint">Click screen to lock cursor & look around • WASD: Move • Shift: Sprint • C: Crouch • M: Mode • ESC: Release mouse</div><div id="cross"></div><div id="toast" class="panel"></div>
</div>

<!-- SIH SOP Emergency Dispatch Modal -->
<div id="dispatchModal">
  <div class="dispatch-box panel">
    <h3>🚨 DISPATCH EMERGENCY RESPONSE PROTOCOL</h3>
    <div class="dispatch-field"><span>Target Sector:</span><b id="mSector">NLM-04</b></div>
    <div class="dispatch-field"><span>Primary Threat:</span><b id="mThreat">Forest Fire</b></div>
    <div class="dispatch-field"><span>Nearest Station:</span><b id="mStation">Srisailam Central Command</b></div>
    <div class="dispatch-field"><span>Estimated Rapid ETA:</span><b id="mEta">8 mins</b></div>
    <div class="dispatch-field"><span>Spread Vector:</span><b>+45° NE (Wind Driving)</b></div>
    <div class="dispatch-actions">
      <button id="confirmDispatchBtn" style="background:#b32400; border-color:#ff4444;">DISPATCH SOS TEAMS</button>
      <button id="closeDispatchBtn" style="background:#223326; border-color:#3e6648;">CANCEL</button>
    </div>
  </div>
</div>

<div id="loading"><div class="loadbox panel"><div class="eyebrow">VANMATHI • NALLAMALA</div><h2>Initializing procedural terrain, vegetation density & telemetry engines…</h2><div class="bar"><i id="loadbar"></i></div></div></div>`;const K=n=>document.getElementById(n),qe=new tf;qe.background=new Ne(8900331);const Vd=new Yo(8900331,.0022);qe.fog=Vd;const Je=new jt(70,window.innerWidth/window.innerHeight,.1,2e3);Je.position.set(0,5,40);const bn=new Eg({antialias:!0,powerPreference:"high-performance"});bn.setPixelRatio(Math.min(window.devicePixelRatio,1.7)),bn.setSize(window.innerWidth,window.innerHeight),bn.shadowMap.enabled=!0,bn.shadowMap.type=Qc,bn.outputColorSpace=$t,bn.toneMapping=il,document.querySelector("#scene").appendChild(bn.domElement),window.addEventListener("resize",()=>{Je.aspect=window.innerWidth/window.innerHeight,Je.updateProjectionMatrix(),bn.setSize(window.innerWidth,window.innerHeight)});const It=new je;qe.add(It);let gn="WALK",ks=!1,Wd=0,os=!1,gc=0,Kr=0,jr=!1;const Nt={},cs=new L;let _c=1.2;function $(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Xd(n,e){const t=Math.floor(n),i=Math.floor(e),s=n-t,r=e-i,a=s*s*(3-2*s),o=r*r*(3-2*r),c=$(t,i),l=$(t+1,i),h=$(t,i+1),f=$(t+1,i+1),u=c+(l-c)*a,p=h+(f-h)*a;return u+(p-u)*o}function Ag(n,e,t,i,s,r){let a=1,o=r,c=0,l=0;for(let h=0;h<t;h++)c+=(Xd(n*o,e*o)*2-1)*a,l+=a,a*=s,o*=i;return c/l}function qd(n,e,t){let i=0,s=0;for(const r of Gd){const a=n-r.x,o=e-r.z,c=a*a+o*o+2500,l=1/(c*c);i+=l,s+=l*r[t]}return s/i}const Jr={"NLM-04":{label:"Krishna River — Srisailam Gorge",halfWidth:13,bankFeather:22,depth:9,waterDepth:.6,color:1859468,controlPoints:[{x:-300,z:-155},{x:-230,z:-125},{x:-150,z:-100},{x:-65,z:-65},{x:25,z:-20}]},"NLM-06":{label:"Gundlakamma River — headwaters",halfWidth:4,bankFeather:9,depth:4,waterDepth:.35,color:3112854,controlPoints:[{x:-435,z:195},{x:-400,z:150},{x:-360,z:95},{x:-315,z:35},{x:-270,z:-15}]}},Qr={};Object.entries(Jr).forEach(([n,e])=>{const t=new ff(e.controlPoints.map(i=>new L(i.x,0,i.z)));Qr[n]=t.getPoints(48).map(i=>({x:i.x,z:i.z}))});function Rg(n,e){let t=0;for(const[i,s]of Object.entries(Jr)){let r=1/0;for(const l of Qr[i]){const h=n-l.x,f=e-l.z,u=h*h+f*f;u<r&&(r=u)}const a=Math.sqrt(r),o=1-bt.clamp((a-s.halfWidth)/s.bankFeather,0,1),c=o*o*(3-2*o);t=Math.max(t,c*s.depth)}return t}function xc(n,e,t=1.5){for(const[i,s]of Object.entries(Jr)){const r=s.halfWidth+t,a=r*r;for(const o of Qr[i]){const c=n-o.x,l=e-o.z;if(c*c+l*l<a)return!0}}return!1}function Ge(n,e){const t=qd(n,e,"h"),i=qd(n,e,"s"),s=(t-bg)*Tg,r=bt.clamp(i*.9,1,30),a=Ag(n,e,4,2.15,.52,.006)*r,o=(Xd(n*.35,e*.35)-.5)*1.4,c=Rg(n,e);return s+a+o-c}function Hs(n,e){const i=Ge(n-1,e),s=Ge(n+1,e),r=Ge(n,e-1),a=Ge(n,e+1);return new L(i-s,2,r-a).normalize()}function Cg(n){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t.fillStyle="rgba(10, 20, 15, 0.85)",t.strokeStyle="#426e2d",t.lineWidth=4,t.beginPath(),t.roundRect(10,10,236,44,8),t.fill(),t.stroke(),t.fillStyle="#ffffff",t.font="bold 22px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(n,128,32);const i=new Ns(e);i.needsUpdate=!0;const s=new Vl({map:i,transparent:!0}),r=new sf(s);return r.scale.set(16,4,1),r}const vc=new gf(13493247,1848600,1.8);qe.add(vc);const Nn=new ld(16773580,3.2);Nn.castShadow=!0,Nn.shadow.mapSize.set(1048,1048),qe.add(Nn);const Pg=new ld(7244219,0);qe.add(Pg);let Gs,Mc,ls;function Lg(){Gs=new Os(1e3,1e3,120,120),Gs.rotateX(-Math.PI/2);const n=Gs.attributes.position;for(let e=0;e<n.count;e++)n.setY(e,Ge(n.getX(e),n.getZ(e)));Gs.computeVertexNormals(),ls=new Fe({color:3031589,roughness:.92,metalness:.04}),Mc=new q(Gs,ls),Mc.receiveShadow=!0,It.add(Mc)}Lg();const Yd=new je;It.add(Yd);function Dg(n,e){const t=Qr[n],i=[],s=[];for(let c=0;c<t.length;c++){const l=t[c],h=t[Math.min(c+1,t.length-1)],f=t[Math.max(c-1,0)],u=h.x-f.x,p=h.z-f.z,g=Math.hypot(u,p)||1,_=-p/g,m=u/g,d=Ge(l.x,l.z)+e.waterDepth;if(i.push(l.x+_*e.halfWidth,d,l.z+m*e.halfWidth,l.x-_*e.halfWidth,d,l.z-m*e.halfWidth),c<t.length-1){const M=c*2,b=c*2+1,v=(c+1)*2,R=(c+1)*2+1;s.push(M,v,b,b,v,R)}}const r=new gt;r.setAttribute("position",new pt(i,3)),r.setIndex(s),r.computeVertexNormals();const a=new Fe({color:e.color,transparent:!0,opacity:.82,roughness:.2,metalness:.45,side:sn,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),o=new q(r,a);return o.receiveShadow=!0,o.userData.baseColor=new Ne(e.color),o.userData.floodColor=new Ne(4866088),Yd.add(o),o}const Sc={};Object.entries(Jr).forEach(([n,e])=>{Sc[n]=Dg(n,e)});const $d=new je;It.add($d);const Zd=new Fr({color:4353581,transparent:!0,opacity:.6}),Ig=new Fr({color:16755200,transparent:!0,opacity:.95,linewidth:2}),Kd={};Object.entries(Gt).forEach(([n,e])=>{const t=[];for(let a=e.xMin;a<=e.xMax;a+=10)t.push(new L(a,Ge(a,e.zMin)+.3,e.zMin));for(let a=e.zMin;a<=e.zMax;a+=10)t.push(new L(e.xMax,Ge(e.xMax,a)+.3,a));for(let a=e.xMax;a>=e.xMin;a-=10)t.push(new L(a,Ge(a,e.zMax)+.3,e.zMax));for(let a=e.zMax;a>=e.zMin;a-=10)t.push(new L(e.xMin,Ge(e.xMin,a)+.3,a));const s=new gt().setFromPoints(t),r=new uf(s,Zd);$d.add(r),Kd[n]=r});function ea(){Object.entries(Kd).forEach(([n,e])=>{e.material=n===Bt?Ig:Zd})}const ds=new je;It.add(ds);const jd=new Wr(35,37,32);jd.rotateX(-Math.PI/2);const Jd=new Wr(65,68,32);Jd.rotateX(-Math.PI/2);const Ug=new Mr({color:16742144,transparent:!0,opacity:.75,side:sn}),Ng=new Mr({color:16720384,transparent:!0,opacity:.45,side:sn}),Qd=new q(jd,Ug),eu=new q(Jd,Ng);ds.add(Qd),ds.add(eu),ds.visible=!1;function yc(){if(I.activeScenario==="Forest Fire"){const n=Gt[Bt];ds.visible=!0;const e=Ge(n.cX,n.cZ)+.4,t=I.windSpeed/3;Qd.position.set(n.cX+t,e,n.cZ-t),eu.position.set(n.cX+t*2.2,e+.1,n.cZ-t*2.2)}else ds.visible=!1}const Vs=new je;It.add(Vs);const Ec=[],Fg=new Le(.24,.4,3.4,7),Og=new Le(.4,.44,.6,7),zg=new Xt(2.3,3.8,7),Bg=new Xt(1.7,3,7),kg=new Xt(1,2.2,7),Hg=new is(2.5,1),Gg=new Xt(1.5,4.4,6),Vg=new Be(1.7,7,7),tu=new Be(1.3,7,7),Wg=new Fe({color:3875859,roughness:.95}),Xg=new Fe({color:4731422,roughness:.95}),qg=new Fe({color:14078142,roughness:.8}),Yg=new Fe({color:4205339,roughness:.95}),$g=new Fe({color:1322514,roughness:.8}),Zg=new Fe({color:2575901,roughness:.85}),Kg=new Fe({color:3958306,roughness:.8}),jg=new Fe({color:2376219,roughness:.85});function Jg(n,e,t){const i=new je;i.position.set(n,Ge(n,e),e);let s,r;t===0?(s=Wg,r=$g):t===1?(s=Xg,r=Zg):t===2?(s=qg,r=Kg):(s=Yg,r=jg);const a=new q(Og,s);a.position.y=.3,i.add(a);const o=new je;o.position.y=.6;const c=new q(Fg,s);if(c.position.y=1.7,o.add(c),t===0){const h=new q(zg,r);h.position.y=3.4,o.add(h);const f=new q(Bg,r);f.position.y=4.9,o.add(f);const u=new q(kg,r);u.position.y=6.2,o.add(u)}else if(t===1){const h=new q(Hg,r);h.position.y=3.2,h.scale.set(1.2,.9,1.2),o.add(h)}else if(t===2){const h=new q(Gg,r);h.position.y=4,o.add(h)}else{const h=new q(Vg,r);h.position.set(0,3.5,0),o.add(h);const f=new q(tu,r);f.position.set(.6,4.4,.3),o.add(f);const u=new q(tu,r);u.position.set(-.6,4.2,-.4),o.add(u)}i.add(o);const l=.78+$(n,e)*.44;i.scale.set(l,l,l),i.rotation.y=$(e,n)*Math.PI*2,i.userData={isTree:!0,leafMat:r,trunkMat:s,origLeaf:r.color.getHex(),origTrunk:s.color.getHex(),upperPart:o,baseStump:a},Vs.add(i),Ec.push(i)}const nu=new Map,bc=4.4,ta=bc;function Qg(n,e){const t=Math.floor(n/ta),i=Math.floor(e/ta);for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){const a=`${t+s},${i+r}`,o=nu.get(a);if(o&&(n-o.x)**2+(e-o.z)**2<bc*bc)return!1}return!0}for(let n=0;n<6500;n++){const e=($(n,11)-.5)*940,t=($(n,83)-.5)*940;if(Qg(e,t)&&!xc(e,t,2.5)){const i=Math.floor(e/ta),s=Math.floor(t/ta);nu.set(`${i},${s}`,{x:e,z:t});const r=Math.floor($(e,t)*4);Jg(e,t,r)}}const e_=new Xt(.16,.85,3),Tc=new Fe({color:3560481,roughness:.95}),na=new Ur(e_,Tc,6e3),St=new Tt;for(let n=0;n<6e3;n++){const e=($(n,42)-.5)*920,t=($(n,99)-.5)*920;St.position.set(e,Ge(e,t)+.42,t),xc(e,t,1)?St.scale.set(0,0,0):St.scale.set(1+$(n,3)*.7,.8+$(n,7)*.9,1+$(n,3)*.7),St.rotation.y=$(n,5)*Math.PI,St.updateMatrix(),na.setMatrixAt(n,St.matrix)}It.add(na);const t_=new is(.65,0),wc=new Fe({color:2245144,roughness:.88}),ia=new Ur(t_,wc,1200);for(let n=0;n<1200;n++){const e=($(n,19)-.5)*900,t=($(n,67)-.5)*900;if(St.position.set(e,Ge(e,t)+.35,t),xc(e,t,1.5))St.scale.set(0,0,0);else{const i=.7+$(n,5)*.9;St.scale.set(i*1.3,i*.6,i*1.3)}St.rotation.y=$(n,31)*Math.PI,St.updateMatrix(),ia.setMatrixAt(n,St.matrix)}It.add(ia);const n_=new is(.4,0),i_=new Fe({color:4735547,roughness:.95}),sa=new Ur(n_,i_,700);for(let n=0;n<700;n++){const e=($(n,29)-.5)*900,t=($(n,73)-.5)*900;St.position.set(e,Ge(e,t)+.15,t),St.scale.set(.6+$(n,11)*1,.4+$(n,13)*.5,.6+$(n,17)*1),St.rotation.y=$(n,23)*Math.PI,St.updateMatrix(),sa.setMatrixAt(n,St.matrix)}It.add(sa);const Fn=new je;Fn.visible=!1,It.add(Fn);const Ac=new Fe({color:13010498,roughness:.75}),iu=new Fe({color:2771566,roughness:.85}),ra=new Fe({color:1710618,roughness:.9}),su=new Fe({color:6044190,roughness:.92}),ru=new Fe({color:12887412,roughness:.7}),s_=new Fe({color:4862496,roughness:.9});function r_(){const n=new je,e=new q(new Le(.08,.1,.55,8),ra);e.position.set(-.11,.28,0),e.castShadow=!0,n.add(e);const t=new q(new Le(.08,.1,.55,8),ra);t.position.set(.11,.28,0),t.castShadow=!0,n.add(t);const i=new q(new Le(.16,.19,.52,10),iu);i.position.y=.74,i.castShadow=!0,n.add(i);const s=new q(new Be(.2,8,6),iu);s.position.y=.98,s.scale.set(1.15,.55,.7),n.add(s);const r=new q(new Be(.15,10,10),Ac);r.position.y=1.2,r.castShadow=!0,n.add(r);const a=new q(new Le(.16,.18,.1,10),new Fe({color:15254855,roughness:.55}));a.position.y=1.34,n.add(a);const o=new q(new Le(.22,.22,.03,10),new Fe({color:13938746,roughness:.6}));o.position.y=1.29,n.add(o);const c=new q(new Le(.055,.065,.42,8),Ac);c.position.set(-.26,.78,0),c.rotation.z=.32,n.add(c);const l=new q(new Le(.055,.065,.42,8),Ac);l.position.set(.26,.78,0),l.rotation.z=-.32,n.add(l);const h=new q(new Le(.035,.04,.5,6),ra);h.position.set(.4,.68,.12),h.rotation.x=-.45,h.rotation.z=-.2,n.add(h);const f=new q(new Qn(.04,.22,.12),ra);return f.position.set(.4,.88,.28),n.add(f),n.scale.set(1.12,1.12,1.12),n}function a_(){const n=new je,e=new Le(.18,.2,1.6,7);for(let t=0;t<5;t++){const i=new q(e,su);i.rotation.z=Math.PI/2,i.position.set((t%3-1)*.35,.2+Math.floor(t/3)*.32,t%2*.25),i.rotation.y=t*.3,n.add(i);const s=new q(new Fs(.19,8),ru);s.rotation.y=Math.PI/2,s.position.copy(i.position),s.position.x+=.82,n.add(s)}return n}function o_(){const n=new je,e=new q(new Le(.35,.4,.55,8),s_);e.position.y=.28,n.add(e);const t=new q(new Fs(.36,8),ru);t.rotation.x=-Math.PI/2,t.position.y=.56,n.add(t);for(let i=0;i<2;i++){const s=new q(new Le(.06,.09,.9,5),su);s.rotation.z=Math.PI/2+i*.4,s.position.set(.5+i*.3,.08,(i-.5)*.4),n.add(s)}return n}function c_(){const n=new je,e=new q(new Qn(.55,.18,.22),new Fe({color:2763306,roughness:.7}));e.position.y=.12,n.add(e);const t=new q(new Qn(.7,.06,.08),new Fe({color:8947848,roughness:.4,metalness:.6}));t.position.set(.55,.12,0),n.add(t);const i=new q(new Le(.04,.04,.25,6),new Fe({color:13386752,roughness:.6}));return i.rotation.z=Math.PI/2,i.position.set(-.15,.22,0),n.add(i),n}const aa=[],Rc=[],Cc=[],Pc=[];for(let n=0;n<8;n++){const e=r_();e.visible=!1,Fn.add(e),aa.push(e)}for(let n=0;n<6;n++){const e=a_();e.visible=!1,Fn.add(e),Rc.push(e)}for(let n=0;n<10;n++){const e=o_();e.visible=!1,Fn.add(e),Cc.push(e)}for(let n=0;n<5;n++){const e=c_();e.visible=!1,Fn.add(e),Pc.push(e)}const l_=new Fe({color:3811864,roughness:1,metalness:0,transparent:!0,opacity:.85}),Si=new q(new Fs(28,24),l_);Si.rotation.x=-Math.PI/2,Si.visible=!1,Si.renderOrder=1,Fn.add(Si);let Lc=null;function d_(n){if(Lc===n.name)return;Lc=n.name;const e=n.cX,t=n.cZ,i=70;Si.position.set(e,Ge(e,t)+.08,t),Si.visible=!0,aa.forEach((s,r)=>{const a=$(r,11)*Math.PI*2,o=12+$(r,22)*i,c=e+Math.cos(a)*o,l=t+Math.sin(a)*o;s.position.set(c,Ge(c,l),l),s.rotation.y=$(r,33)*Math.PI*2,s.visible=!0}),Rc.forEach((s,r)=>{const a=$(r+40,11)*Math.PI*2,o=8+$(r+40,22)*(i*.85),c=e+Math.cos(a)*o,l=t+Math.sin(a)*o;s.position.set(c,Ge(c,l),l),s.rotation.y=$(r,55)*Math.PI*2,s.scale.setScalar(.9+$(r,7)*.4),s.visible=!0}),Cc.forEach((s,r)=>{const a=$(r+80,11)*Math.PI*2,o=6+$(r+80,22)*i,c=e+Math.cos(a)*o,l=t+Math.sin(a)*o;s.position.set(c,Ge(c,l),l),s.rotation.y=$(r,66)*Math.PI*2,s.scale.setScalar(.85+$(r,9)*.5),s.visible=!0}),Pc.forEach((s,r)=>{const a=$(r+120,11)*Math.PI*2,o=10+$(r+120,22)*40,c=e+Math.cos(a)*o,l=t+Math.sin(a)*o;s.position.set(c,Ge(c,l)+.05,l),s.rotation.y=$(r,77)*Math.PI*2,s.rotation.z=($(r,12)-.5)*.4,s.visible=!0})}function u_(){Fn.visible=!1,aa.forEach(n=>n.visible=!1),Rc.forEach(n=>n.visible=!1),Cc.forEach(n=>n.visible=!1),Pc.forEach(n=>n.visible=!1),Si.visible=!1,Lc=null}const Dc=400,Ws=new gt,oa=new Float32Array(Dc*3);for(let n=0;n<Dc;n++)oa[n*3]=0,oa[n*3+1]=-100,oa[n*3+2]=0;Ws.setAttribute("position",new Ct(oa,3));const Xs=new gi({map:null,size:12,color:13215339,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0,sizeAttenuation:!0});(function(){const n=document.createElement("canvas");n.width=32,n.height=32;const e=n.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,16);t.addColorStop(0,"rgba(200,160,100,0.7)"),t.addColorStop(.5,"rgba(160,120,70,0.35)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),Xs.map=new Ns(n)})();const au=new ns(Ws,Xs);au.renderOrder=996,qe.add(au);const h_=3560481,f_=2245144,on=480,p_=140;function ct(n,e,t,i,s){const r=new je;r.position.set(t,i,s);const a=new q(n,e);return a.position.y=-n.parameters.height/2,a.castShadow=!0,r.add(a),r}function m_(){const n=new je,e=new Fe({color:9132587,roughness:.78,metalness:.02}),t=new Fe({color:2758152,roughness:.85}),i=new Fe({color:13943968,roughness:.55}),s=new Fe({color:12887412,roughness:.8}),r=new q(new Le(.28,.34,1.35,10),e);r.rotation.x=Math.PI/2,r.position.y=.92,r.castShadow=!0,n.add(r);const a=new q(new Be(.34,10,8),e);a.position.set(0,.92,-.55),a.scale.set(1,.95,1.05),n.add(a);const o=new q(new Be(.3,10,8),e);o.position.set(0,.95,.55),n.add(o);const c=new q(new Le(.12,.2,.72,8),e);c.position.set(0,1.32,.55),c.rotation.x=-.55,n.add(c);const l=new q(new Be(.2,10,8),e);l.position.set(0,1.68,.78),l.scale.set(.95,.9,1.15),n.add(l);const h=new q(new Le(.06,.11,.28,8),t);h.rotation.x=Math.PI/2,h.position.set(0,1.58,1.05),n.add(h);const f=new Xt(.06,.16,6),u=new q(f,e);u.position.set(.12,1.88,.72),u.rotation.z=-.35,n.add(u);const p=new q(f,e);p.position.set(-.12,1.88,.72),p.rotation.z=.35,n.add(p);function g(R){const w=new je,C=new q(new Le(.018,.035,.55,6),i);C.position.y=.28,C.rotation.z=R*.25,w.add(C);const P=new q(new Le(.012,.02,.22,5),i);return P.position.set(R*.08,.42,.02),P.rotation.z=R*.9,w.add(P),w.position.set(R*.1,1.9,.7),w}n.add(g(1)),n.add(g(-1));const _=new Le(.045,.03,.95,7),m=ct(_,t,.16,.92,.42),d=ct(_,t,-.16,.92,.42),M=ct(_,t,.16,.92,-.48),b=ct(_,t,-.16,.92,-.48);n.add(m),n.add(d),n.add(M),n.add(b);const v=new q(new Xt(.05,.18,6),s);return v.position.set(0,1.05,-.85),v.rotation.x=Math.PI/2.2,n.add(v),n.scale.set(.9,.9,.9),{group:n,legs:[m,d,M,b],rideHeight:.85,baseSpeed:2.8,runSpeed:8.5,tail:v}}function g_(){const n=new je,e=new Fe({color:14248474,roughness:.7,metalness:.02}),t=new Fe({color:1707525,roughness:.85}),i=new Fe({color:15258800,roughness:.75}),s=new q(new Le(.32,.36,1.45,12),e);s.rotation.x=Math.PI/2,s.position.y=.7,s.castShadow=!0,n.add(s);const r=new q(new Be(.34,10,8),e);r.position.set(0,.72,.6),n.add(r);const a=new q(new Be(.35,10,8),e);a.position.set(0,.7,-.6),n.add(a);const o=new q(new Le(.22,.24,1.1,10),i);o.rotation.x=Math.PI/2,o.position.set(0,.52,0),n.add(o);const c=new q(new Le(.18,.26,.35,10),e);c.position.set(0,.85,.78),c.rotation.x=-.25,n.add(c);const l=new q(new Be(.28,12,10),e);l.position.set(0,.95,1.05),l.scale.set(1.05,.95,1.1),n.add(l);const h=new q(new Be(.14,10,8),i);h.position.set(0,.82,1.28),h.scale.set(1.1,.85,1.2),n.add(h);const f=new q(new Be(.05,6,6),t);f.position.set(0,.88,1.42),n.add(f);const u=new Be(.07,6,6),p=new q(u,e);p.position.set(.18,1.18,.95),p.scale.set(1,1.2,.6),n.add(p);const g=new q(u,e);g.position.set(-.18,1.18,.95),g.scale.set(1,1.2,.6),n.add(g);const _=new q(new Le(.05,.03,.95,8),e);_.position.set(0,.72,-1.15),_.rotation.x=-.55,n.add(_);const m=new q(new Be(.04,6,6),t);m.position.set(0,.55,-1.55),n.add(m);const d=new Le(.09,.07,.7,8),M=ct(d,e,.22,.7,.5),b=ct(d,e,-.22,.7,.5),v=ct(d,e,.22,.7,-.5),R=ct(d,e,-.22,.7,-.5);return n.add(M),n.add(b),n.add(v),n.add(R),n.scale.set(.95,.95,.95),{group:n,legs:[M,b,v,R],rideHeight:.65,baseSpeed:2.2,runSpeed:7.2,tail:_}}function __(){const n=new je,e=new Fe({color:12883002,roughness:.68,metalness:.02}),t=new Fe({color:1971206,roughness:.85}),i=new Fe({color:14469536,roughness:.75}),s=new q(new Le(.26,.3,1.25,12),e);s.rotation.x=Math.PI/2,s.position.y=.58,s.castShadow=!0,n.add(s);const r=new q(new Be(.28,10,8),e);r.position.set(0,.6,.52),n.add(r);const a=new q(new Be(.29,10,8),e);a.position.set(0,.58,-.52),n.add(a);const o=new q(new Le(.18,.2,.95,10),i);o.rotation.x=Math.PI/2,o.position.set(0,.42,0),n.add(o);const c=new q(new Be(.22,12,10),e);c.position.set(0,.78,.92),c.scale.set(1.05,.95,1.1),n.add(c);const l=new q(new Be(.11,10,8),i);l.position.set(0,.68,1.12),l.scale.set(1.05,.85,1.15),n.add(l);const h=new q(new Be(.035,6,6),t);h.position.set(0,.72,1.24),n.add(h);const f=new Be(.055,6,6),u=new q(f,e);u.position.set(.14,.95,.85),u.scale.set(1,1.15,.55),n.add(u);const p=new q(f,e);p.position.set(-.14,.95,.85),p.scale.set(1,1.15,.55),n.add(p);const g=new q(new Le(.04,.025,.9,8),e);g.position.set(0,.62,-1.05),g.rotation.x=-.7,n.add(g);const _=new q(new Be(.03,6,6),t);_.position.set(0,.42,-1.4),n.add(_);const m=new Le(.06,.045,.58,8),d=ct(m,e,.16,.58,.4),M=ct(m,e,-.16,.58,.4),b=ct(m,e,.16,.58,-.4),v=ct(m,e,-.16,.58,-.4);return n.add(d),n.add(M),n.add(b),n.add(v),n.scale.set(.9,.9,.9),{group:n,legs:[d,M,b,v],rideHeight:.55,baseSpeed:2.6,runSpeed:7.8,tail:g}}function x_(){const n=new je,e=new Fe({color:8026744,roughness:.88,metalness:.02}),t=new Fe({color:3815992,roughness:.9}),i=new Fe({color:15920096,roughness:.4}),s=new q(new Le(.95,1.05,2.4,14),e);s.rotation.x=Math.PI/2,s.position.y=1.55,s.castShadow=!0,n.add(s);const r=new q(new Be(1,12,10),e);r.position.set(0,1.55,1),r.scale.set(1.05,1,.95),n.add(r);const a=new q(new Be(1.05,12,10),e);a.position.set(0,1.5,-1.05),n.add(a);const o=new q(new Be(.75,12,10),e);o.position.set(0,1.95,1.75),o.scale.set(1.1,1,1.05),n.add(o);const c=[],l=new je;l.position.set(0,1.7,2.1),l.rotation.x=-Math.PI/2+.05,n.add(l);const h=7,f=[.02,.05,.1,.18,.26,.32,.36];let u=l;for(let E=0;E<h;E++){const y=E/(h-1),A=.34*(1-y*.35),O=.23*(1-y*.8),G=.23*(1-(y+1/h)*.8),H=new je;H.rotation.x=f[E];const J=new q(new Le(Math.max(G,.02),Math.max(O,.03),A,8),e);J.position.y=-A/2,J.castShadow=!0,H.add(J),u.add(H),c.push(H);const V=new je;V.position.y=-A,H.add(V),u=V}const p=new q(new Be(.07,8,6),t);u.add(p);const g=new Be(.55,10,8),_=new q(g,e);_.position.set(.85,2.15,1.55),_.scale.set(.18,1.1,.95),n.add(_);const m=new q(g,e);m.position.set(-.85,2.15,1.55),m.scale.set(.18,1.1,.95),n.add(m);const d=new Le(.28,.32,1.45,10),M=ct(d,e,.55,1.45,.85),b=ct(d,e,-.55,1.45,.85),v=ct(d,e,.55,1.45,-.85),R=ct(d,e,-.55,1.45,-.85);n.add(M),n.add(b),n.add(v),n.add(R);const w=new q(new Le(.05,.08,.95,8),i);w.position.set(.32,1.45,2.15),w.rotation.x=-.75,w.rotation.z=.15,n.add(w);const C=w.clone();C.position.x=-.32,C.rotation.z=-.15,n.add(C);const P=new q(new Le(.06,.03,.7,6),e);return P.position.set(0,1.4,-1.85),P.rotation.x=.5,n.add(P),n.scale.set(1.35,1.35,1.35),{group:n,legs:[M,b,v,R],rideHeight:1.9,baseSpeed:1.4,runSpeed:4.2,trunkSegs:c,tail:P,earL:_,earR:m}}function v_(){const n=new je,e=new Fe({color:6184026,roughness:.9,metalness:.02}),t=new Fe({color:14208437,roughness:.45}),i=new q(new Le(.55,.62,2,12),e);i.rotation.x=Math.PI/2,i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new q(new Be(.6,10,8),e);s.position.set(0,1.15,.85),n.add(s);const r=new q(new Be(.62,10,8),e);r.position.set(0,1.12,-.85),n.add(r);const a=new q(new Be(.42,10,8),e);a.position.set(0,1.3,1.45),a.scale.set(.95,.9,1.2),n.add(a);const o=new q(new Xt(.11,.55,8),t);o.position.set(0,1.55,1.85),o.rotation.x=-.85,n.add(o);const c=new q(new Xt(.07,.28,7),t);c.position.set(0,1.45,1.65),c.rotation.x=-.7,n.add(c);const l=new Xt(.08,.18,5),h=new q(l,e);h.position.set(.28,1.6,1.35),h.rotation.z=-.3,n.add(h);const f=new q(l,e);f.position.set(-.28,1.6,1.35),f.rotation.z=.3,n.add(f);const u=new Le(.2,.24,1.05,8),p=ct(u,e,.38,1.05,.65),g=ct(u,e,-.38,1.05,.65),_=ct(u,e,.38,1.05,-.65),m=ct(u,e,-.38,1.05,-.65);n.add(p),n.add(g),n.add(_),n.add(m);const d=new q(new Le(.05,.03,.5,6),e);return d.position.set(0,1.35,-1.55),d.rotation.x=.45,n.add(d),n.scale.set(1.25,1.25,1.25),{group:n,legs:[p,g,_,m],rideHeight:1.3,baseSpeed:1.6,runSpeed:5.5,tail:d}}function M_(){const n=new je,e=new Fe({color:12886874,roughness:.72,metalness:.02}),t=new Fe({color:4074002,roughness:.85}),i=new q(new Le(.42,.5,1.7,12),e);i.rotation.x=Math.PI/2,i.position.y=2.55,i.castShadow=!0,n.add(i);const s=new q(new Be(.48,10,8),e);s.position.set(0,2.55,.7),n.add(s);const r=new q(new Be(.5,10,8),e);r.position.set(0,2.52,-.7),n.add(r);const a=[],o=new je;o.position.set(0,2.85,.6),o.rotation.x=.15,n.add(o);const c=4,l=[.05,-.05,-.08,-.1];let h=o;for(let A=0;A<c;A++){const O=A/(c-1),G=.78,H=.27*(1-O*.55),J=.27*(1-(O+1/c)*.55),V=new je;V.rotation.x=l[A];const ne=new q(new Le(J,H,G,10),e);ne.position.y=G/2,ne.castShadow=!0,V.add(ne),h.add(V),a.push(V);const W=new je;W.position.y=G,V.add(W),h=W}const f=new je;h.add(f);const u=new q(new Be(.22,10,8),e);u.position.set(0,.12,.14),u.scale.set(.9,.85,1.25),f.add(u);const p=new q(new Le(.08,.12,.28,8),t);p.rotation.x=Math.PI/2,p.position.set(0,.03,.42),f.add(p);const g=new q(new Le(.035,.045,.22,6),t);g.position.set(.1,.38,.05),f.add(g);const _=g.clone();_.position.x=-.1,f.add(_);const m=new q(new Be(.05,6,6),t);m.position.set(.1,.5,.05),f.add(m);const d=m.clone();d.position.x=-.1,f.add(d);const M=new Xt(.06,.14,5),b=new q(M,e);b.position.set(.2,.28,.05),b.rotation.z=-.5,f.add(b);const v=new q(M,e);v.position.set(-.2,.28,.05),v.rotation.z=.5,f.add(v);const R=new Le(.1,.13,2.5,8),w=ct(R,e,.32,2.5,.55),C=ct(R,e,-.32,2.5,.55),P=ct(R,e,.32,2.5,-.55),E=ct(R,e,-.32,2.5,-.55);n.add(w),n.add(C),n.add(P),n.add(E);const y=new q(new Le(.04,.025,.8,6),t);return y.position.set(0,2.6,-1.15),y.rotation.x=.35,n.add(y),n.scale.set(1.1,1.1,1.1),{group:n,legs:[w,C,P,E],rideHeight:2.4,baseSpeed:2,runSpeed:6.5,neckSegs:a,tail:y}}function S_(){const n=new je,e=new Fe({color:12884554,roughness:.72,metalness:.02}),t=new Fe({color:6044186,roughness:.88}),i=new Fe({color:14733224,roughness:.75}),s=new q(new Le(.32,.36,1.4,12),e);s.rotation.x=Math.PI/2,s.position.y=.75,s.castShadow=!0,n.add(s);const r=new q(new Be(.35,10,8),e);r.position.set(0,.78,.55),n.add(r);const a=new q(new Be(.34,10,8),e);a.position.set(0,.75,-.55),n.add(a);const o=new q(new Be(.3,12,10),e);o.position.set(0,1.05,.95),n.add(o);const c=new q(new Be(.14,10,8),i);c.position.set(0,.92,1.18),c.scale.set(1.05,.85,1.15),n.add(c);const l=new q(new Be(.52,10,8),t);l.position.set(0,1,.82),l.scale.set(1.15,1.05,1.1),n.add(l);const h=new q(new Be(.4,8,6),t);h.position.set(0,.95,.55),h.scale.set(1.2,.9,.8),n.add(h);const f=new Le(.09,.07,.82,8),u=ct(f,e,.24,.75,.48),p=ct(f,e,-.24,.75,.48),g=ct(f,e,.24,.75,-.48),_=ct(f,e,-.24,.75,-.48);n.add(u),n.add(p),n.add(g),n.add(_);const m=new q(new Le(.04,.03,.9,6),e);m.position.set(0,.85,-.95),m.rotation.x=.35,n.add(m);const d=new q(new Be(.06,6,6),t);return d.position.set(0,.7,-1.35),n.add(d),n.scale.set(1.15,1.15,1.15),{group:n,legs:[u,p,g,_],rideHeight:.7,baseSpeed:2.3,runSpeed:8,tail:m}}const _n=[];for(let n=0;n<35;n++){const e=($(n,17)-.5)*900,t=($(n,51)-.5)*900,i=m_();It.add(i.group),_n.push({isCarnivore:!1,mesh:i.group,legs:i.legs,tail:i.tail,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,7)*4,walkCycle:$(n,13)*Math.PI*2})}for(let n=0;n<5;n++){const e=-300+($(n,23)-.5)*400,t=80+($(n,79)-.5)*300,i=g_();It.add(i.group),_n.push({isCarnivore:!0,mesh:i.group,legs:i.legs,tail:i.tail,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,3)*5,walkCycle:$(n,11)*Math.PI*2})}for(let n=0;n<4;n++){const e=-100+($(n,37)-.5)*300,t=200+($(n,91)-.5)*250,i=__();It.add(i.group),_n.push({isCarnivore:!0,mesh:i.group,legs:i.legs,tail:i.tail,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,5)*5,walkCycle:$(n,17)*Math.PI*2})}for(let n=0;n<4;n++){const e=160+($(n,41)-.5)*90,t=-100+($(n,67)-.5)*80,i=x_();It.add(i.group),_n.push({isCarnivore:!1,mesh:i.group,legs:i.legs,tail:i.tail,trunkSegs:i.trunkSegs,earL:i.earL,earR:i.earR,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,9)*6,walkCycle:$(n,19)*Math.PI*2})}for(let n=0;n<3;n++){const e=-90+($(n,13)-.5)*70,t=40+($(n,29)-.5)*180,i=v_();It.add(i.group),_n.push({isCarnivore:!1,mesh:i.group,legs:i.legs,tail:i.tail,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,11)*5,walkCycle:$(n,23)*Math.PI*2})}for(let n=0;n<3;n++){const e=320+($(n,53)-.5)*160,t=220+($(n,71)-.5)*140,i=M_();It.add(i.group),_n.push({isCarnivore:!1,mesh:i.group,legs:i.legs,tail:i.tail,neckSegs:i.neckSegs,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,7)*5,walkCycle:$(n,31)*Math.PI*2})}for(let n=0;n<3;n++){const e=-380+($(n,19)-.5)*120,t=-280+($(n,43)-.5)*120,i=S_();It.add(i.group),_n.push({isCarnivore:!0,mesh:i.group,legs:i.legs,tail:i.tail,rideHeight:i.rideHeight,baseSpeed:i.baseSpeed,runSpeed:i.runSpeed,pos:new L(e,Ge(e,t),t),targetDir:new we($(e,t)-.5,$(t,e)-.5).normalize(),switchTimer:$(n,5)*5,walkCycle:$(n,17)*Math.PI*2})}const Ic=4500,ca=new gt,yi=new Float32Array(Ic*6);for(let n=0;n<Ic;n++){const e=(Math.random()-.5)*500,t=Math.random()*160,i=(Math.random()-.5)*500;yi[n*6]=e,yi[n*6+1]=t,yi[n*6+2]=i,yi[n*6+3]=e-.5,yi[n*6+4]=t-4.5,yi[n*6+5]=i-.5}ca.setAttribute("position",new Ct(yi,3));const qs=new Fr({color:11197951,transparent:!0,opacity:0}),y_=new df(ca,qs);qe.add(y_);const E_=420,b_=520,T_=380,us=280,hs=720;function Uc(n,e=64){const t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d"),s=i.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);return n.forEach(([r,a])=>s.addColorStop(r,a)),i.fillStyle=s,i.fillRect(0,0,e,e),new Ns(t)}function w_(){const n=document.createElement("canvas");n.width=64,n.height=96;const e=n.getContext("2d"),t=e.createRadialGradient(32,70,2,32,48,38);t.addColorStop(0,"rgba(255, 255, 210, 1.0)"),t.addColorStop(.18,"rgba(255, 230, 90, 0.98)"),t.addColorStop(.42,"rgba(255, 140, 20, 0.92)"),t.addColorStop(.68,"rgba(230, 45, 0, 0.55)"),t.addColorStop(.88,"rgba(80, 10, 0, 0.18)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.beginPath(),e.ellipse(32,52,26,42,0,0,Math.PI*2),e.fill();const i=e.createRadialGradient(32,62,0,32,62,14);return i.addColorStop(0,"rgba(255, 255, 240, 0.95)"),i.addColorStop(1,"rgba(255, 200, 40, 0)"),e.fillStyle=i,e.beginPath(),e.ellipse(32,62,12,16,0,0,Math.PI*2),e.fill(),new Ns(n)}const Nc=w_(),A_=Uc([[0,"rgba(255, 240, 160, 1)"],[.25,"rgba(255, 160, 40, 0.95)"],[.55,"rgba(255, 60, 0, 0.5)"],[1,"rgba(0,0,0,0)"]],32),R_=Uc([[0,"rgba(40, 38, 36, 0.7)"],[.35,"rgba(22, 20, 18, 0.45)"],[.7,"rgba(12, 11, 10, 0.18)"],[1,"rgba(0,0,0,0)"]],64);function Fc(n,e,t,i=1){const s=new gt,r=new Float32Array(n*3),a=new Float32Array(n),o=new Float32Array(n),c=new Float32Array(n);for(let f=0;f<n;f++)r[f*3]=0,r[f*3+1]=-200,r[f*3+2]=0,a[f]=Math.random(),o[f]=.7+Math.random()*.8,c[f]=Math.floor(Math.random()*5);s.setAttribute("position",new Ct(r,3));const l=new gi({map:t,size:e,transparent:!0,opacity:i,blending:tr,depthWrite:!1,depthTest:!0,sizeAttenuation:!0}),h=new ns(s,l);return h.renderOrder=999,qe.add(h),{geo:s,mat:l,system:h,pos:r,age:a,speed:o,front:c,count:n}}const ni=Fc(E_,5.2,Nc,1),fs=Fc(b_,9.5,Nc,.95),ps=Fc(T_,14,Nc,.75),la=new gt,Jt=new Float32Array(us*3),da=new Float32Array(us),ua=new Float32Array(us),ou=new Float32Array(us);for(let n=0;n<us;n++)Jt[n*3]=0,Jt[n*3+1]=-200,Jt[n*3+2]=0,da[n]=Math.random(),ua[n]=1.1+Math.random()*1.4,ou[n]=Math.floor(Math.random()*5);la.setAttribute("position",new Ct(Jt,3));const ha=new gi({map:A_,size:2.8,transparent:!0,opacity:1,blending:tr,depthWrite:!1,depthTest:!0,sizeAttenuation:!0}),cu=new ns(la,ha);cu.renderOrder=1e3,qe.add(cu);const fa=new gt,Qt=new Float32Array(hs*3),Ys=new Float32Array(hs),pa=new Float32Array(hs),lu=new Float32Array(hs);for(let n=0;n<hs;n++)Qt[n*3]=0,Qt[n*3+1]=-200,Qt[n*3+2]=0,Ys[n]=Math.random(),pa[n]=.55+Math.random()*.7,lu[n]=Math.floor(Math.random()*5);fa.setAttribute("position",new Ct(Qt,3));const ma=new gi({map:R_,size:22,transparent:!0,opacity:.55,depthWrite:!1,depthTest:!0,sizeAttenuation:!0}),du=new ns(fa,ma);du.renderOrder=997,qe.add(du);const $s=new oc(16738840,0,280);$s.position.set(0,3,0),qe.add($s);const Zs=new oc(16729088,0,220);Zs.position.set(0,2.5,0),qe.add(Zs);const Ks=new oc(16755251,0,160);Ks.position.set(0,4,0),qe.add(Ks);const C_=[{x:0,z:0},{x:38,z:-22},{x:-42,z:18},{x:25,z:45},{x:-30,z:-38}],ga=500,js=new gt,_a=new Float32Array(ga*3),xa=new Float32Array(ga);for(let n=0;n<ga;n++)_a[n*3]=-2e3,_a[n*3+1]=-2e3,_a[n*3+2]=-2e3,xa[n]=0;js.setAttribute("position",new Ct(_a,3));const uu=()=>{const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(122, 98, 68, 0.85)"),t.addColorStop(.45,"rgba(90, 70, 48, 0.5)"),t.addColorStop(1,"rgba(90, 70, 48, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Ns(n)},Oc=new gi({map:uu(),size:6.5,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0}),hu=new ns(js,Oc);hu.renderOrder=997,qe.add(hu);const va=160,Js=new gt,Ma=new Float32Array(va*3),Sa=new Float32Array(va);for(let n=0;n<va;n++)Ma[n*3]=-2e3,Ma[n*3+1]=-2e3,Ma[n*3+2]=-2e3,Sa[n]=0;Js.setAttribute("position",new Ct(Ma,3));const zc=new gi({map:uu(),size:20,color:13351062,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0}),fu=new ns(Js,zc);fu.renderOrder=996,qe.add(fu);const Ei=46,P_=new is(1,0),L_=new Fe({color:7035460,roughness:.96,metalness:.03}),On=new Ur(P_,L_,Ei);On.instanceMatrix.setUsage(hh),On.castShadow=!0,On.receiveShadow=!0,On.visible=!1,qe.add(On);const ya=new Float32Array(Ei*2),Bc=new Float32Array(Ei),Ea=new Float32Array(Ei).fill(.8),pu=new Float32Array(Ei).fill(1),kc=new Float32Array(Ei),mu=new je;It.add(mu);const ii={};Object.entries(Gt).forEach(([n,e])=>{const t=new je,i=new Be(2.5,16,16),s=new Fe({color:16724736,roughness:.3,metalness:.2,emissive:11145472,emissiveIntensity:.4}),r=new q(i,s);r.position.y=12,r.castShadow=!0,t.add(r);const a=new Xt(1.2,12,16);a.rotateX(Math.PI);const o=new Fe({color:14540253,roughness:.2,metalness:.8}),c=new q(a,o);c.position.y=6,c.castShadow=!0,t.add(c);const l=Cg(e.name);l.position.set(0,17.5,0),t.add(l);const h=Ge(e.cX,e.cZ);t.position.set(e.cX,h,e.cZ),mu.add(t),ii[n]={group:t,headMat:s}});function D_(n){Bt=n;const e=Gt[n];Je.position.set(e.cX,Ge(e.cX,e.cZ)+18,e.cZ+35),gc=Math.atan2(-(e.cX-Je.position.x),-(e.cZ-Je.position.z)),Tn(),en(),ea(),yc(),yt(`Zone shifted to ${e.name}`)}function I_(){Object.entries(Gt).forEach(([n])=>{ii[n]&&(n===Bt?(ii[n].headMat.color.setHex(16755200),ii[n].headMat.emissive.setHex(16755200),ii[n].group.scale.set(1.25,1.25,1.25)):(ii[n].headMat.color.setHex(16724736),ii[n].headMat.emissive.setHex(11145472),ii[n].group.scale.set(1,1,1)))})}function U_(){const n=Je.position.x,e=Je.position.z;for(const[t,i]of Object.entries(Gt))if(n>=i.xMin&&n<=i.xMax&&e>=i.zMin&&e<=i.zMax){Bt!==t&&(Bt=t,Tn(),en(),ea(),yc(),yt(`Entered Zone: ${i.name}`));break}}let Se,Qs,zn,Bn,kn,Hn;function N_(){if(Se)return;const n=window.AudioContext||window.webkitAudioContext;Se=new n;const e=Se.sampleRate*3,t=Se.createBuffer(1,e,Se.sampleRate),i=t.getChannelData(0);let s=0,r=0,a=0,o=0,c=0,l=0,h=0;for(let A=0;A<e;A++){const O=Math.random()*2-1;s=.99886*s+O*.0555179,r=.99332*r+O*.0750759,a=.969*a+O*.153852,o=.8665*o+O*.3104856,c=.55*c+O*.5329522,l=-.7616*l-O*.016898,i[A]=s+r+a+o+c+l+h+O*.5362,i[A]*=.05,h=O*.115926}const f=Se.createBufferSource();f.buffer=t,f.loop=!0,Bn=Se.createGain(),Bn.gain.value=0,f.connect(Bn),Bn.connect(Se.destination),f.start();const u=Se.createBuffer(1,e,Se.sampleRate),p=u.getChannelData(0);let g=0;for(let A=0;A<e;A++){const O=Math.random()*2-1;g=.95*g+O*.1;const G=Math.random()>.992?Math.random()*8-4:0;p[A]=g*.4+G}Qs=Se.createBufferSource(),Qs.buffer=u,Qs.loop=!0;const _=Se.createBiquadFilter();_.type="lowpass",_.frequency.value=850,zn=Se.createGain(),zn.gain.value=0,Qs.connect(_),_.connect(zn),zn.connect(Se.destination),Qs.start();const m=Se.createOscillator();m.type="sawtooth",m.frequency.value=140,kn=Se.createGain(),kn.gain.value=0,m.connect(kn),kn.connect(Se.destination),m.start();const d=Se.createBuffer(1,e,Se.sampleRate),M=d.getChannelData(0);let b=0,v=0,R=0;for(let A=0;A<e;A++){const O=Math.random()*2-1;b=.995*b+O*.03,v=.985*v+O*.06,R=.9*R+O*.14,M[A]=b*.6+v*.3+R*.1}const w=Se.createBufferSource();w.buffer=d,w.loop=!0;const C=Se.createBiquadFilter();C.type="lowpass",C.frequency.value=115;const P=Se.createGain();P.gain.value=1;const E=Se.createOscillator();E.type="sine",E.frequency.value=5.2;const y=Se.createGain();y.gain.value=.35,E.connect(y),y.connect(P.gain),E.start(),Hn=Se.createGain(),Hn.gain.value=0,w.connect(C),C.connect(P),P.connect(Hn),Hn.connect(Se.destination),w.start()}function F_(n){if(!os||!Se)return;const e=.3+Math.random()*.3,t=Se.createBuffer(1,Math.floor(Se.sampleRate*e),Se.sampleRate),i=t.getChannelData(0);for(let o=0;o<i.length;o++){const c=Math.pow(1-o/i.length,2.4);i[o]=(Math.random()*2-1)*c}const s=Se.createBufferSource();s.buffer=t;const r=Se.createBiquadFilter();r.type="lowpass",r.frequency.value=150+Math.random()*220+n*120;const a=Se.createGain();a.gain.value=Math.min(.9,.35+n*.55),s.connect(r),r.connect(a),a.connect(Se.destination),s.start()}function O_(){if(!os||!Se)return;const n=I.intensity/100;if(I.activeScenario==="Heavy Rain")Bn.gain.setTargetAtTime(.4*n,Se.currentTime,.1),zn.gain.setTargetAtTime(0,Se.currentTime,.1),kn.gain.setTargetAtTime(0,Se.currentTime,.1),Hn.gain.setTargetAtTime(0,Se.currentTime,.1);else if(I.activeScenario==="Forest Fire")zn.gain.setTargetAtTime(.75*n,Se.currentTime,.1),Bn.gain.setTargetAtTime(0,Se.currentTime,.1),kn.gain.setTargetAtTime(0,Se.currentTime,.1),Hn.gain.setTargetAtTime(0,Se.currentTime,.1);else if(I.activeScenario==="Illegal Wood Cutting")kn.gain.setTargetAtTime(.2*n,Se.currentTime,.1),zn.gain.setTargetAtTime(0,Se.currentTime,.1),Bn.gain.setTargetAtTime(0,Se.currentTime,.1),Hn.gain.setTargetAtTime(0,Se.currentTime,.1);else if(I.activeScenario==="Landslide"){const e=Gt[Bt],t=bt.clamp(e.slopeDeg/28,.2,1.5);Hn.gain.setTargetAtTime(.55*n*t,Se.currentTime,.2),Bn.gain.setTargetAtTime(.1*n,Se.currentTime,.15),zn.gain.setTargetAtTime(0,Se.currentTime,.1),kn.gain.setTargetAtTime(0,Se.currentTime,.1)}else Bn.gain.setTargetAtTime(0,Se.currentTime,.1),zn.gain.setTargetAtTime(0,Se.currentTime,.1),kn.gain.setTargetAtTime(0,Se.currentTime,.1),Hn.gain.setTargetAtTime(0,Se.currentTime,.1)}function yt(n){const e=K("toast");e.textContent=n,e.classList.add("visible"),setTimeout(()=>e.classList.remove("visible"),2800)}function Tn(){const n=I.intensity/100,e=Gt[Bt];I.vegetationHealth=e.baseVeg,I.waterAvailability=e.baseWater;const t=parseFloat(e.elev)||500;switch(I.humanPressure=15+Math.floor($(t,12)*20),I.activeScenario){case"Normal Forest":I.temperature=I.baseTemp,I.humidity=Math.max(15,Math.min(95,85-I.baseTemp)),I.rainfall=0,I.windSpeed=12,I.soilMoisture=Math.floor(I.humidity*1.1),I.fireRisk=Math.floor(I.temperature*1.5-I.humidity*.4),I.wildlifeActivity=75,I.eventDetected=!1,I.riskAnalysisLevel="LOW",I.alertMessage="System nominal. Normal forest profile.",I.recommendedAction="Maintain scanning grids.";break;case"Forest Fire":I.temperature=Math.floor(I.baseTemp+n*45),I.humidity=Math.max(5,Math.floor(54-n*45)),I.rainfall=0,I.windSpeed=Math.floor(12+n*40),I.soilMoisture=Math.max(2,Math.floor(62-n*55)),I.fireRisk=Math.floor(60+n*40),I.vegetationHealth=Math.max(10,Math.floor(e.baseVeg-n*50)),I.wildlifeActivity=Math.max(5,Math.floor(75-n*65)),I.eventDetected=!0,I.riskAnalysisLevel=n>.5?"CRITICAL":"HIGH",I.alertMessage=`Ground fire thermal signature verified in ${e.name}.`,I.recommendedAction="Deploy firebreak crews to active perimeter.";break;case"Heavy Rain":I.temperature=Math.floor(I.baseTemp-n*10),I.humidity=Math.min(100,Math.floor(54+n*46)),I.rainfall=Math.floor(20+n*140),I.windSpeed=Math.floor(18+n*45),I.soilMoisture=Math.min(100,Math.floor(62+n*38)),I.fireRisk=0,I.wildlifeActivity=Math.max(15,Math.floor(75-n*40)),I.eventDetected=!0,I.riskAnalysisLevel=n>.6?"CRITICAL":"HIGH",I.alertMessage=`Heavy downpour rate (${I.rainfall} mm/hr) in ${e.name}.`,I.recommendedAction="Monitor drainage channels for flood surges.";break;case"Illegal Wood Cutting":I.temperature=I.baseTemp,I.humidity=54,I.rainfall=0,I.soilMoisture=62,I.fireRisk=30,I.humanPressure=Math.floor(30+n*70),I.vegetationHealth=Math.max(15,Math.floor(e.baseVeg-n*35)),I.wildlifeActivity=Math.max(15,Math.floor(75-n*50)),I.eventDetected=!0,I.riskAnalysisLevel="HIGH",I.alertMessage=`Acoustic spikes (chainsaw profile) logged in ${e.name}.`,I.recommendedAction="Dispatch forest ranger unit to sector.";break;case"Landslide":{const i=e.slopeDeg;I.temperature=Math.floor(I.baseTemp-n*6),I.humidity=Math.min(100,Math.floor(60+n*30)),I.rainfall=Math.floor(15+n*90),I.windSpeed=Math.floor(10+n*15),I.soilMoisture=Math.min(100,Math.floor(70+n*25)),I.fireRisk=0,I.vegetationHealth=Math.max(20,Math.floor(e.baseVeg-i*n*.6)),I.wildlifeActivity=Math.max(10,Math.floor(75-n*35)),I.eventDetected=!0;const s=Math.min(100,Math.round(i*2.2+n*35));I.riskAnalysisLevel=s>70?"CRITICAL":s>40?"HIGH":s>20?"MEDIUM":"LOW",I.alertMessage=i>15?`Slope failure in progress on ${e.name} (${i}° incline) — debris flow moving downslope.`:`Minor slope creep monitored in ${e.name} (${i}° incline) — low failure likelihood on this gradient.`,I.recommendedAction=i>15?"Evacuate downslope corridor and close access roads.":"Continue routine slope monitoring.";break}case"Drought":I.temperature=Math.floor(I.baseTemp+n*14),I.humidity=Math.max(5,Math.floor(54-n*45)),I.rainfall=0,I.soilMoisture=Math.max(1,Math.floor(62-n*60)),I.waterAvailability=Math.max(0,Math.floor(e.baseWater-n*70)),I.vegetationHealth=Math.max(10,Math.floor(e.baseVeg-n*55)),I.fireRisk=Math.floor(50+n*45),I.eventDetected=!0,I.riskAnalysisLevel="HIGH",I.alertMessage=`Severe soil desiccation in ${e.name}.`,I.recommendedAction="Initiate sanctuary water table replenishment.";break}}function en(){const n=Gt[Bt];K("intensityVal").textContent=`${I.intensity}%`,K("tempVal").textContent=`${I.baseTemp}°C`,K("timeVal").textContent=`${String(Math.floor(I.timeMinutes/60)).padStart(2,"0")}:${String(I.timeMinutes%60).padStart(2,"0")}`,K("sTemp").textContent=`${I.temperature}°C`,K("humidity").textContent=`${I.humidity}%`,K("risk").textContent=`${I.fireRisk}%`,K("selectedZone").textContent=`${n.name} • Core`,K("envTemp").textContent=`${I.temperature}°C`,K("envTempBar").style.width=`${Math.min(100,I.temperature/90*100)}%`,K("envHumidity").textContent=`${I.humidity}%`,K("envHumidityBar").style.width=`${I.humidity}%`,K("envRain").textContent=`${I.rainfall} mm/hr`,K("envRainBar").style.width=`${Math.min(100,I.rainfall)}%`,K("envWind").textContent=`${I.windSpeed} km/h`,K("envWindBar").style.width=`${Math.min(100,I.windSpeed/60*100)}%`,K("envSoil").textContent=`${I.soilMoisture}%`,K("envSoilBar").style.width=`${I.soilMoisture}%`,K("envVegetation").textContent=`${I.vegetationHealth}%`,K("envVegetationBar").style.width=`${I.vegetationHealth}%`,K("detailZoneName").textContent=n.name,document.querySelector(".zone-sub")&&(document.querySelector(".zone-sub").textContent=n.sub.toUpperCase());const e=K("detailRiver");e&&(n.river?(K("detailRiverText").textContent=n.river,e.style.display="block"):e.style.display="none"),K("detailVeg").textContent=`${I.vegetationHealth}%`,K("detailVegBar").style.width=`${I.vegetationHealth}%`,K("detailWater").textContent=`${I.waterAvailability}%`,K("detailWaterBar").style.width=`${I.waterAvailability}%`,K("detailWild").textContent=`${I.wildlifeActivity}%`,K("detailWildBar").style.width=`${I.wildlifeActivity}%`,K("detailFire").textContent=`${I.fireRisk}%`,K("detailFireBar").style.width=`${I.fireRisk}%`,K("detailHuman").textContent=`${I.humanPressure}%`,K("detailHumanBar").style.width=`${I.humanPressure}%`,document.querySelectorAll(".zone-dot").forEach(i=>{const s=i.getAttribute("data-zone");i.classList.remove("active","ignition"),s===Bt&&(i.classList.add("active"),I.activeScenario==="Forest Fire"&&i.classList.add("ignition"))});const t=K("alertsFeed");t.innerHTML="",I.eventDetected?(K("alertCount").textContent="1 CRITICAL",K("alertCount").style.background="#ff3333",t.innerHTML=`<div class="alert-item high-alert">
        <div><span class="badge ${I.riskAnalysisLevel.toLowerCase()}">${I.riskAnalysisLevel}</span> <small>INCIDENT</small></div>
        <div style="margin:4px 0; font-size:11px;">${I.alertMessage}</div>
        <div style="margin-top:4px; font-size:10px; background:rgba(255,255,255,0.05); padding:3px;"><b>ACTION:</b> ${I.recommendedAction}</div>
        <button id="triggerSOPBtn" style="margin-top:8px; padding:6px; font-size:9px; background:#a31d00; border-color:#ff3300;">🚨 INITIATE SOP DISPATCH</button>
      </div>`,K("triggerSOPBtn").addEventListener("click",Hc)):(K("alertCount").textContent="NOMINAL",K("alertCount").style.background="#2b732b",t.innerHTML='<div style="font-size:11px; color:#8fbc8f;">🟢 Scan Active: All zone sensor telemetry verified.</div>'),K("scenarioTitle").textContent=`Simulation: ${I.activeScenario}`,K("eventReadout").innerHTML=I.isLiveSync?"Live Telemetry: <b>ISRO Bhuvan & LoRaWAN Node active</b>":`Confidence: <b>${I.eventDetected?Math.floor(65+I.intensity*.32):98}%</b>`}function Hc(){const n=Gt[Bt];K("mSector").textContent=n.name+" ("+n.sub+")",K("mThreat").textContent=I.activeScenario.toUpperCase(),K("mStation").textContent=n.station,K("mEta").textContent=n.eta,K("dispatchModal").classList.add("active")}function z_(){const e=I.timeMinutes/1440*Math.PI*2-Math.PI/2;Nn.position.x=Math.cos(e)*400,Nn.position.y=Math.sin(e)*400,Nn.position.z=200;const t=Nn.position.y>0,i=Math.max(0,Math.sin(e));if(I.activeScenario==="Forest Fire"){const s=new Ne(2756613);qe.background=s,qe.fog&&(qe.fog.color=s)}else if(I.activeScenario==="Heavy Rain"){const s=new Ne(3819604);qe.background=s,qe.fog&&(qe.fog.color=s)}else if(t){const s=new Ne(8900331).lerp(new Ne(16747520),(1-i)*.5);qe.background=s,qe.fog&&(qe.fog.color=s),Nn.intensity=3.2*i,vc.intensity=1.8*i}else{const s=new Ne(396308);qe.background=s,qe.fog&&(qe.fog.color=s),Nn.intensity=0,vc.intensity=.2}}const xn=new Mf;function B_(n){const e=I.intensity/100,t=Gt[Bt],i=xn.getElapsedTime();for(const[r,a]of Object.entries(Sc)){a.material.opacity=.78+Math.sin(i*.6+(r==="NLM-04"?0:2))*.05;const o=I.activeScenario==="Heavy Rain"?a.userData.floodColor:a.userData.baseColor;a.material.color.lerp(o,.02)}if(I.activeScenario==="Forest Fire"){const r=Math.max(.18,e),a=xn.getElapsedTime(),o=I.windSpeed*.045,c=-I.windSpeed*.02,l=C_.map((u,p)=>{const g=55+r*95,_=u.x*(.55+r*.9)+o*18*(p+1)*.15,m=u.z*(.55+r*.9)+c*18*(p+1)*.15,d=t.cX+_*(g/80),M=t.cZ+m*(g/80);return{x:d,z:M,y:Ge(d,M)}}),h=l[0].y;$s.intensity=(11+Math.sin(a*14.3)*4.2+Math.sin(a*23.1)*1.8)*r,$s.position.set(l[0].x,h+3.2,l[0].z),Zs.intensity=(7.5+Math.sin(a*19.7+1.2)*3.5)*r,Zs.position.set(l[1].x,l[1].y+2.4,l[1].z),Ks.intensity=(5.5+Math.sin(a*27.4+.7)*2.8)*r,Ks.position.set(l[2].x,l[2].y+4,l[2].z);const f=(u,p,g,_,m)=>{const d=u.pos;for(let M=0;M<u.count;M++){u.age[M]+=n*u.speed[M]*(1.1+r*.9);const b=u.front[M]|0,v=l[b%l.length],R=p*(.7+M%7*.12)*(.85+r*.4);if(u.age[M]>=1||d[M*3+1]>v.y+R){const w=14+r*28+M%5*3,C=$(M,a*.3)*Math.PI*2,P=$(M+3,a*.2)*w;d[M*3]=v.x+Math.cos(C)*P,d[M*3+2]=v.z+Math.sin(C)*P,d[M*3+1]=Ge(d[M*3],d[M*3+2])+.15+$(M,2)*.4,u.age[M]=0,u.speed[M]=.65+Math.random()*.9}else{const w=u.age[M],C=(g+r*2.2)*u.speed[M]*(1.15-w*.35);d[M*3+1]+=n*C;const P=Math.sin(a*9+M*.7)*_;d[M*3]+=(o*.9+P+($(M,a)-.5)*.4)*n*9,d[M*3+2]+=(c*.9+Math.cos(a*7.5+M)*_*.7)*n*9}}u.geo.attributes.position.needsUpdate=!0,u.geo.computeBoundingSphere(),u.mat.opacity=Math.min(1,r*m),u.mat.size=u.mat.userData?.baseSize||u.mat.size};ni.mat.userData.baseSize||(ni.mat.userData.baseSize=5.2,fs.mat.userData.baseSize=9.5,ps.mat.userData.baseSize=14),ni.mat.size=4.5+r*3.2,fs.mat.size=8+r*5.5,ps.mat.size=12+r*8,f(ni,4.8,4.8,.18,1.85),f(fs,6.5,3.6,.28,1.55),f(ps,8.2,2.6,.38,1.15);for(let u=0;u<us;u++){da[u]+=n*ua[u]*(.55+r*.5);const p=ou[u]|0,g=l[p%l.length],_=18+u%9*2.2;if(da[u]>=1||Jt[u*3+1]>g.y+_){const m=10+r*22,d=$(u+50,a)*Math.PI*2,M=$(u+60,a)*m;Jt[u*3]=g.x+Math.cos(d)*M,Jt[u*3+2]=g.z+Math.sin(d)*M,Jt[u*3+1]=Ge(Jt[u*3],Jt[u*3+2])+.8+Math.random()*1.5,da[u]=0,ua[u]=1+Math.random()*1.6}else Jt[u*3+1]+=n*(5.5+r*4.5)*ua[u],Jt[u*3]+=(o*1.6+($(u,a*1.3)-.5)*1.1)*n*11,Jt[u*3+2]+=(c*1.4+Math.sin(a*5+u)*.4)*n*11}la.attributes.position.needsUpdate=!0,la.computeBoundingSphere(),ha.opacity=Math.min(1,r*1.7),ha.size=2.2+r*1.8;for(let u=0;u<hs;u++){Ys[u]+=n*pa[u]*(.35+r*.4);const p=lu[u]|0,g=l[p%l.length],_=38+u%8*4;if(Ys[u]>=1||Qt[u*3+1]>g.y+_){const m=18+r*35,d=$(u+90,a*.4)*Math.PI*2,M=$(u+110,a*.3)*m;Qt[u*3]=g.x+Math.cos(d)*M,Qt[u*3+2]=g.z+Math.sin(d)*M,Qt[u*3+1]=Ge(Qt[u*3],Qt[u*3+2])+1.2,Ys[u]=0,pa[u]=.5+Math.random()*.75}else{const m=Ys[u];Qt[u*3+1]+=n*(4.5+r*5.5)*pa[u]*(1.05-m*.25),Qt[u*3]+=(o*1.8+($(u,a)-.5)*.5)*n*7,Qt[u*3+2]+=(c*1.6+Math.cos(a*3+u)*.35)*n*7}}fa.attributes.position.needsUpdate=!0,fa.computeBoundingSphere(),ma.opacity=Math.min(.62,r*.78),ma.size=18+r*12,Vs.children.forEach(u=>{u.userData.isTree&&u.position.distanceTo(new L(t.cX,u.position.y,t.cZ))<260*r&&(u.userData.leafMat.color.lerp(new Ne(1706501),n*1.6),u.userData.trunkMat.color.lerp(new Ne(328450),n*1.6))})}else $s.intensity=0,Zs.intensity=0,Ks.intensity=0,ni.mat.opacity=0,fs.mat.opacity=0,ps.mat.opacity=0,ha.opacity=0,ma.opacity=0;if(I.activeScenario==="Heavy Rain"){const r=Math.max(.2,e);qs.opacity=Math.min(.95,r*1.2);const a=ca.attributes.position.array,o=60+r*140;for(let c=0;c<Ic;c++)if(a[c*6+1]-=n*o,a[c*6+4]=a[c*6+1]-6,a[c*6+1]<Ge(a[c*6],a[c*6+2])){const l=Je.position.x+(Math.random()-.5)*400,h=Je.position.z+(Math.random()-.5)*400,f=110+Math.random()*50;a[c*6]=l,a[c*6+1]=f,a[c*6+2]=h,a[c*6+3]=l,a[c*6+4]=f-6,a[c*6+5]=h}ca.attributes.position.needsUpdate=!0,ls.color.lerp(new Ne(1977882),.04),qe.fog&&qe.fog.isFogExp2&&(qe.fog.density=bt.lerp(qe.fog.density,.0022+r*.0045,.05))}else qs.opacity=0,qe.fog&&qe.fog.isFogExp2&&I.activeScenario!=="Forest Fire"&&(qe.fog.density=bt.lerp(qe.fog.density,.0022,.04));if(I.activeScenario==="Landslide"){const r=t.slopeDeg,a=Math.max(.1,e)*bt.clamp(r/18,.2,1.8),o=(t.xMax-t.xMin)*.5,c=(t.zMax-t.zMin)*.5,l=Hs(t.cX,t.cZ),h=Math.hypot(l.x,l.z)||1e-4,f=-l.x/h,u=-l.z/h,p=xn.getElapsedTime();Oc.opacity=Math.min(.85,a*.75);const g=js.attributes.position.array;for(let d=0;d<ga;d++){let M=g[d*3],b=g[d*3+2];xa[d]-=n;const v=M<t.xMin-20||M>t.xMax+20||b<t.zMin-20||b>t.zMax+20;if(xa[d]<=0||v)M=t.cX+f*o*.6+($(d,p)-.5)*o*1.3,b=t.cZ+u*c*.6+($(d+5,p)-.5)*c*1.3,xa[d]=2.5+$(d,3)*2;else{const R=Hs(M,b),w=Math.hypot(R.x,R.z)||1e-4,C=(2.4+r*.4)*a;M+=R.x/w*C*n,b+=R.z/w*C*n}g[d*3]=M,g[d*3+1]=Ge(M,b)+.4+$(d,9)*.6,g[d*3+2]=b}js.attributes.position.needsUpdate=!0,js.computeBoundingSphere(),zc.opacity=Math.min(.5,a*.45);const _=Js.attributes.position.array;for(let d=0;d<va;d++){let M=_[d*3],b=_[d*3+1],v=_[d*3+2];Sa[d]-=n,Sa[d]<=0?(M=t.cX+f*o*.3+($(d,p)-.5)*o*1.3,v=t.cZ+u*c*.3+($(d+21,p)-.5)*c*1.3,b=Ge(M,v)+.5,Sa[d]=1.8+$(d,6)*2.2):(b+=n*(.6+a*1.1),M+=(-f*.4+($(d,p*.5)-.5)*.3)*n*3,v+=(-u*.4+($(d+3,p*.5)-.5)*.3)*n*3),_[d*3]=M,_[d*3+1]=b,_[d*3+2]=v}Js.attributes.position.needsUpdate=!0,Js.computeBoundingSphere(),On.visible=!0;for(let d=0;d<Ei;d++){let M=ya[d*2],b=ya[d*2+1];Bc[d]-=n;const v=M<t.xMin-25||M>t.xMax+25||b<t.zMin-25||b>t.zMax+25;if(Bc[d]<=0||v)M=t.cX+f*o*.65+($(d,p)-.5)*o*.9,b=t.cZ+u*c*.65+($(d+11,p)-.5)*c*.9,Bc[d]=3+$(d,4)*3.5,Ea[d]=.45+$(d,8)*1.5,pu[d]=.55+$(d,15)*.85;else{const w=Hs(M,b),C=Math.hypot(w.x,w.z)||1e-4,P=(2.6+r*.4)*a*pu[d];M+=w.x/C*P*n,b+=w.z/C*P*n,kc[d]+=P*n*(1.3/Math.max(.4,Ea[d]))}ya[d*2]=M,ya[d*2+1]=b;const R=Ge(M,b)+Ea[d]*.42;St.position.set(M,R,b),St.scale.setScalar(Ea[d]),St.rotation.set(kc[d]*.9,d*.37,kc[d]),St.updateMatrix(),On.setMatrixAt(d,St.matrix)}if(On.instanceMatrix.needsUpdate=!0,_c-=n,_c<=0){const d=bt.clamp((r-8)/25,.1,1.3)*Math.max(.3,e);F_(d),_c=bt.lerp(2.2,.4,bt.clamp(e*(r/30),0,1))+Math.random()*.6}const m=bt.clamp((r-10)/25,0,1)*e;if(m>.04){const d=m*.16;cs.set((Math.sin(p*37.1)+Math.sin(p*13.7)*.5)*d,Math.sin(p*29.3)*.5*d,(Math.cos(p*41.7)+Math.cos(p*17.3)*.5)*d)}else cs.set(0,0,0);Je.position.add(cs)}else Oc.opacity=0,zc.opacity=0,On.visible=!1;if(I.activeScenario==="Illegal Wood Cutting"){Fn.visible=!0,d_(t);const r=xn.getElapsedTime();aa.forEach((a,o)=>{a.position.y=Ge(a.position.x,a.position.z)+Math.sin(r*2.2+o)*.02,a.rotation.y+=Math.sin(r*.6+o)*.003})}else u_();if(I.activeScenario==="Drought"){const r=Math.max(.2,e);ls.color.setHex(7232312),Tc.color.setHex(9073472),wc.color.setHex(7034160),Vs.children.forEach(c=>{c.userData.isTree&&(c.userData.leafMat.color.setHex(7361056),c.userData.trunkMat.color.setHex(4337432))});for(const c of Object.values(Sc))c.material.color.lerp(new Ne(5917224),.04),c.material.opacity=bt.lerp(c.material.opacity,.35,.03);Xs.opacity=Math.min(.45,r*.5),Xs.size=10+r*8;const a=Ws.attributes.position.array,o=t;for(let c=0;c<Dc;c++){let l=a[c*3],h=a[c*3+1],f=a[c*3+2];h+=n*(.4+r*.8),l+=($(c,xn.getElapsedTime())-.5)*n*4,f+=($(c+3,xn.getElapsedTime())-.5)*n*4,(h>18||h<0)&&(l=o.cX+($(c,9)-.5)*220,f=o.cZ+($(c,17)-.5)*220,h=.5+$(c,5)*6),a[c*3]=l,a[c*3+1]=h,a[c*3+2]=f}Ws.attributes.position.needsUpdate=!0,Ws.computeBoundingSphere()}else Xs.opacity=0,I.activeScenario!=="Forest Fire"&&I.activeScenario!=="Landslide"&&(Tc.color.setHex(h_),wc.color.setHex(f_));I.activeScenario==="Drought"||(I.activeScenario==="Landslide"?ls.color.setHex(5917236):I.activeScenario!=="Forest Fire"&&(ls.color.setHex(3031589),Vs.children.forEach(r=>{r.userData.isTree&&(r.userData.leafMat.color.setHex(r.userData.origLeaf),r.userData.trunkMat.color.setHex(r.userData.origTrunk))}))),Ec.forEach(r=>{const a=r.position.x>=t.xMin&&r.position.x<=t.xMax&&r.position.z>=t.zMin&&r.position.z<=t.zMax,o=I.activeScenario==="Illegal Wood Cutting"&&a&&$(r.position.x,r.position.z)<e,c=I.activeScenario==="Landslide"&&a&&t.slopeDeg>12&&$(r.position.x,r.position.z)<e*(t.slopeDeg/35);if(o)r.userData.upperPart.rotation.z=bt.lerp(r.userData.upperPart.rotation.z,Math.PI/2.1,n*3),r.userData.upperPart.position.x=bt.lerp(r.userData.upperPart.position.x,1.2,n*3);else if(c){const l=Hs(r.position.x,r.position.z);r.userData.upperPart.rotation.z=bt.lerp(r.userData.upperPart.rotation.z,-l.x*.9,n*1.2),r.userData.upperPart.rotation.x=bt.lerp(r.userData.upperPart.rotation.x,l.z*.9,n*1.2)}else r.userData.upperPart.rotation.z=bt.lerp(r.userData.upperPart.rotation.z,0,n*3),r.userData.upperPart.rotation.x=bt.lerp(r.userData.upperPart.rotation.x,0,n*3),r.userData.upperPart.position.x=bt.lerp(r.userData.upperPart.position.x,0,n*3)});const s=_n.filter(r=>r.isCarnivore);_n.forEach(r=>{r.switchTimer-=n;let a=I.activeScenario==="Forest Fire"||I.activeScenario==="Illegal Wood Cutting";if(!r.isCarnivore){for(let _ of s)if(r.pos.distanceTo(_.pos)<65){a=!0,r.targetDir.set(r.pos.x-_.pos.x,r.pos.z-_.pos.z).normalize();break}}r.switchTimer<=0&&!a&&(r.switchTimer=4+$(r.pos.x,r.pos.z)*5,r.targetDir.set($(r.pos.z,xn.getElapsedTime())-.5,$(r.pos.x,xn.getElapsedTime())-.5).normalize());const o=a?r.runSpeed:r.baseSpeed;r.pos.x+=r.targetDir.x*o*n,r.pos.z+=r.targetDir.y*o*n,r.pos.x>on?(r.pos.x=on,r.targetDir.x=-Math.abs(r.targetDir.x)||-.5):r.pos.x<-on&&(r.pos.x=-on,r.targetDir.x=Math.abs(r.targetDir.x)||.5),r.pos.z>on?(r.pos.z=on,r.targetDir.y=-Math.abs(r.targetDir.y)||-.5):r.pos.z<-on&&(r.pos.z=-on,r.targetDir.y=Math.abs(r.targetDir.y)||.5),r.targetDir.normalize();const c=Ge(r.pos.x,r.pos.z);r.pos.y=c,r.walkCycle+=n*o*3.2;const l=a?.65:.42,h=Math.sin(r.walkCycle)*l,f=-h;r.legs&&r.legs.length===4&&(r.legs[0].rotation.x=h,r.legs[1].rotation.x=f,r.legs[2].rotation.x=f,r.legs[3].rotation.x=h);const u=Math.abs(Math.sin(r.walkCycle*2))*.04;r.mesh.position.set(r.pos.x,r.pos.y+u,r.pos.z);const p=Hs(r.pos.x,r.pos.z);r.mesh.lookAt(r.pos.x+r.targetDir.x,r.pos.y+u,r.pos.z+r.targetDir.y),r.mesh.up.copy(p);const g=xn.getElapsedTime();if(r.trunkSegs){const _=Math.sin(g*1+r.walkCycle*.2),m=Math.sin(g*2.6+r.walkCycle);for(let d=0;d<r.trunkSegs.length;d++)r.trunkSegs[d].rotation.z=_*.045*(d+1)+m*.008*d}if(r.neckSegs){const _=Math.sin(g*.6+r.walkCycle*.15);for(let m=0;m<r.neckSegs.length;m++)r.neckSegs[m].rotation.z=_*.02*(m+1)}if(r.tail&&(r.tail.rotation.z=Math.sin(g*2.2+r.walkCycle)*.18),r.earL&&r.earR){const _=Math.sin(g*1.4+r.walkCycle*.3)*.12;r.earL.rotation.y=_,r.earR.rotation.y=-_}}),z_(),I_(),O_(),yc()}function k_(){window.addEventListener("keydown",e=>{Nt[e.code]=!0,e.code==="KeyC"&&(ks=!ks,yt(ks?"Crouched":"Standing")),e.code==="KeyM"&&gu()}),window.addEventListener("keyup",e=>{Nt[e.code]=!1});const n=K("scene");n.addEventListener("click",()=>{jr||n.requestPointerLock()}),document.addEventListener("pointerlockchange",()=>{jr=document.pointerLockElement===n,jr&&yt("Pointer Locked: Move mouse to look around")}),document.addEventListener("mousemove",e=>{if(!jr)return;const t=.002;gc-=e.movementX*t,Kr-=e.movementY*t,Kr=Math.max(-Math.PI/2.2,Math.min(Math.PI/2.2,Kr))}),document.querySelectorAll(".zone-dot").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation(),D_(e.getAttribute("data-zone"))})}),K("closeDispatchBtn").addEventListener("click",()=>{K("dispatchModal").classList.remove("active")}),K("confirmDispatchBtn").addEventListener("click",()=>{K("dispatchModal").classList.remove("active"),yt("Dispatched: SOS Team alerted via telemetry mesh!")})}function H_(n){cs.lengthSq()>0&&Je.position.sub(cs),cs.set(0,0,0);let e=0;gn==="WALK"?e=Nt.ShiftLeft||Nt.ShiftRight?16:7:gn==="RUN"?e=16:gn==="DRONE"&&(e=Nt.ShiftLeft||Nt.ShiftRight?70:35),ks&&gn!=="DRONE"&&(e*=.45);const t=new L;(Nt.KeyW||Nt.ArrowUp)&&(t.z-=1),(Nt.KeyS||Nt.ArrowDown)&&(t.z+=1),(Nt.KeyA||Nt.ArrowLeft)&&(t.x-=1),(Nt.KeyD||Nt.ArrowRight)&&(t.x+=1),gn==="DRONE"&&(Nt.Space&&(t.y+=1),(Nt.ControlLeft||Nt.KeyE)&&(t.y-=1)),t.normalize();const i=new Ni;i.setFromEuler(new pn(Kr,gc,0,"YXZ")),Je.quaternion.slerp(i,.25);const s=new L(0,0,-1).applyQuaternion(Je.quaternion),r=new L(1,0,0).applyQuaternion(Je.quaternion),a=new L(0,1,0);let o=new L;if(gn==="DRONE"){o.addScaledVector(s,-t.z).addScaledVector(r,t.x).addScaledVector(a,t.y),Je.position.addScaledVector(o,e*n);const c=Ge(Je.position.x,Je.position.z)+1.5;Je.position.y<c&&(Je.position.y=c);const l=Ge(Je.position.x,Je.position.z)+p_;Je.position.y>l&&(Je.position.y=l)}else{const c=s.clone();c.y=0,c.normalize();const l=r.clone();l.y=0,l.normalize(),o.addScaledVector(c,-t.z).addScaledVector(l,t.x),Je.position.addScaledVector(o,e*n);const h=Ge(Je.position.x,Je.position.z),f=ks?1:2;let u=0;t.lengthSq()>0&&(Wd+=n*e*1.5,u=Math.sin(Wd)*(e>10?.12:.05)),Je.position.y=bt.lerp(Je.position.y,h+f+u,.25)}Je.position.x=bt.clamp(Je.position.x,-on,on),Je.position.z=bt.clamp(Je.position.z,-on,on),U_()}function gu(){gn==="WALK"?(gn="RUN",K("navModeBtn").textContent="🏃 RUN MODE",yt("Movement: Human Running Mode")):gn==="RUN"?(gn="DRONE",K("navModeBtn").textContent="🚁 DRONE CAM",yt("Surveillance: Free Drone Cam")):(gn="WALK",K("navModeBtn").textContent="🚶 WALK MODE",yt("Movement: Human Walking Mode"))}let Gc="medium";function Vc(n){Gc=n;const e=n==="low"?0:n==="medium"?1:2;Ec.forEach((i,s)=>{e===2?i.visible=!0:e===1?i.visible=s%2===0:i.visible=s%4===0}),na.visible=e>=1&&K("grass")?.checked!==!1,ia.visible=e>=1&&K("grass")?.checked!==!1,sa.visible=e>=0&&K("grass")?.checked!==!1;const t=e===2?1:e===1?.7:.4;typeof ni<"u"&&(ni.mat.size=(ni.mat.userData.baseSize||5.2)*t,fs.mat.size=(fs.mat.userData.baseSize||9.5)*t,ps.mat.size=(ps.mat.userData.baseSize||14)*t),typeof qs<"u"&&(qs.userData.qualityScale=t),_n.forEach((i,s)=>{i.mesh.visible=e===2||e===1&&s%2===0||e===0&&s%3===0}),bn.setPixelRatio(Math.min(window.devicePixelRatio,e===2?1.7:e===1?1.25:1)),yt(`Quality: ${n.toUpperCase()}`)}let Wc=!1,bi=[];function _u(){bi.forEach(n=>clearTimeout(n)),bi=[]}function ms(n,e,t){I.activeScenario=n,e!=null&&(I.intensity=e),t!=null&&(I.baseTemp=t);const i=K("scenario");i&&(i.value=n);const s=K("intensity");s&&(s.value=I.intensity);const r=K("temp");r&&(r.value=I.baseTemp),Tn(),en()}function xu(n){["controls","zoneEnv","sideDetails","hint"].forEach(i=>{const s=K(i);s&&(s.style.display=n?"none":"")});const t=K("info");t&&(t.style.opacity=n?"0.95":"1")}function vu(){if(Wc){ba();return}Wc=!0,_u(),xu(!0),K("demoModeBtn").textContent="⏹ STOP DEMO",K("demoModeBtn").style.background="#6a1a1a",yt("Demo Mode: auto sequence started"),ms("Normal Forest",40,30),bi.push(setTimeout(()=>{ms("Forest Fire",90,42),yt("ALERT: Forest Fire detected — NLM-04")},2500)),bi.push(setTimeout(()=>{Hc()},7e3)),bi.push(setTimeout(()=>{const n=K("dispatchModal");n&&n.classList.remove("active"),ms("Heavy Rain",85,22),yt("Recovery: Heavy Rain event — fire suppressed")},11e3)),bi.push(setTimeout(()=>{ms("Normal Forest",50,28),yt("System nominal — demo complete")},17e3)),bi.push(setTimeout(()=>{ba()},2e4))}function ba(){Wc=!1,_u(),xu(!1);const n=K("dispatchModal");n&&n.classList.remove("active"),K("demoModeBtn")&&(K("demoModeBtn").textContent="🎬 DEMO MODE",K("demoModeBtn").style.background="#1a4a2e"),yt("Demo Mode ended")}function Xc(){return{scenario:I.activeScenario,intensity:I.intensity,temperature:I.temperature,humidity:I.humidity,fireRisk:I.fireRisk,rainfall:I.rainfall,riskLevel:I.riskAnalysisLevel,alertMessage:I.alertMessage,recommendedAction:I.recommendedAction,eventDetected:I.eventDetected,zone:Bt,zoneName:Gt[Bt]?.sub||Bt,isLiveSync:I.isLiveSync,quality:Gc}}function Ti(n){if(!n||typeof n!="object")return;switch(n.type||n.action){case"SET_SCENARIO":ms(n.scenario||n.value,n.intensity,n.temperature??n.temp),I.isLiveSync=!0;break;case"SET_INTENSITY":I.intensity=Math.max(0,Math.min(100,Number(n.value)||0)),K("intensity")&&(K("intensity").value=I.intensity),Tn(),en();break;case"SET_ZONE":n.zone&&Gt[n.zone]&&(Bt=n.zone,ea(),Tn(),en());break;case"OPEN_DISPATCH":case"TRIGGER_SOP":Hc();break;case"CLOSE_DISPATCH":{const t=K("dispatchModal");t&&t.classList.remove("active")}break;case"GET_STATE":case"PING":window.parent.postMessage({type:"ECOSENTINEL_STATE",payload:Xc()},"*");break;case"SET_QUALITY":Vc(n.value||"medium"),K("qualitySelect")&&(K("qualitySelect").value=Gc);break;case"SET_LIVE_SYNC":I.isLiveSync=!!n.value,K("dataFeedToggle")&&(K("dataFeedToggle").textContent=I.isLiveSync?"🛰️ LIVE SATELLITE/IOT":"📡 MANUAL LAB",K("dataFeedToggle").style.background=I.isLiveSync?"#006644":"#0f3a23"),en();break;case"DEMO_START":vu();break;case"DEMO_STOP":ba();break;case"RESET":ms("Normal Forest",75,32);break}try{window.parent.postMessage({type:"ECOSENTINEL_STATE",payload:Xc()},"*")}catch{}}window.EcoSentinel={setScenario:(n,e,t)=>Ti({type:"SET_SCENARIO",scenario:n,intensity:e,temperature:t}),setIntensity:n=>Ti({type:"SET_INTENSITY",value:n}),setZone:n=>Ti({type:"SET_ZONE",zone:n}),openDispatch:()=>Ti({type:"OPEN_DISPATCH"}),getState:()=>Xc(),setQuality:n=>Ti({type:"SET_QUALITY",value:n}),startDemo:()=>vu(),stopDemo:()=>ba(),reset:()=>Ti({type:"RESET"})},window.addEventListener("message",n=>{Ti(n.data)});function G_(){K("scenario").addEventListener("change",n=>{I.activeScenario=n.target.value,I.activeScenario==="Forest Fire"?(K("temp").value=42,I.baseTemp=42,K("intensity").value=85,I.intensity=85):I.activeScenario==="Heavy Rain"?(K("temp").value=22,I.baseTemp=22,K("intensity").value=90,I.intensity=90):I.activeScenario==="Drought"?(K("temp").value=45,I.baseTemp=45,K("intensity").value=80,I.intensity=80):I.activeScenario==="Landslide"?(K("temp").value=23,I.baseTemp=23,K("intensity").value=70,I.intensity=70):I.activeScenario==="Illegal Wood Cutting"?(K("temp").value=30,I.baseTemp=30,K("intensity").value=75,I.intensity=75):(K("temp").value=32,I.baseTemp=32,K("intensity").value=75,I.intensity=75),Tn(),en()}),K("intensity").addEventListener("input",n=>{I.intensity=parseInt(n.target.value),Tn(),en()}),K("temp").addEventListener("input",n=>{I.baseTemp=parseInt(n.target.value),Tn(),en()}),K("time").addEventListener("input",n=>{I.timeMinutes=parseInt(n.target.value),en()}),K("audioBtn").addEventListener("click",()=>{N_(),Se.state==="suspended"&&Se.resume(),os=!os,K("audioBtn").textContent=os?"🔊 AUDIO: ON":"🔊 AUDIO: OFF",yt(os?"Synthesizer engine active":"Audio muted")}),K("navModeBtn").addEventListener("click",gu),K("reset").addEventListener("click",()=>{I.activeScenario="Normal Forest",I.intensity=75,I.baseTemp=32,K("scenario").value="Normal Forest",K("intensity").value=75,K("temp").value=32,Tn(),en(),yt("Reset simulation environment")}),K("start").addEventListener("click",()=>{yt("Simulation scan running")}),K("dataFeedToggle").addEventListener("click",()=>{I.isLiveSync=!I.isLiveSync,K("dataFeedToggle").textContent=I.isLiveSync?"🛰️ LIVE SATELLITE/IOT":"📡 MANUAL LAB",K("dataFeedToggle").style.background=I.isLiveSync?"#006644":"#0f3a23",yt(I.isLiveSync?"Synchronized to Bhuvan live stream":"Reverted to manual controls"),en()}),K("qualitySelect")?.addEventListener("change",n=>Vc(n.target.value)),K("closeDispatchBtn")?.addEventListener("click",()=>{const n=K("dispatchModal");n&&n.classList.remove("active")}),K("confirmDispatchBtn")?.addEventListener("click",()=>{yt("SOS teams dispatched — ETA logged");const n=K("dispatchModal");n&&n.classList.remove("active")}),K("grass").addEventListener("change",n=>{const e=n.target.checked;na.visible=e,ia.visible=e,sa.visible=e,yt(e?"Grass & Undergrowth Enabled":"Grass & Undergrowth Disabled")}),K("wildlife").addEventListener("change",n=>{const e=n.target.checked;_n.forEach(t=>{t.mesh.visible=e}),yt(e?"Wildlife Fauna Enabled":"Wildlife Fauna Disabled")}),K("atmo").addEventListener("change",n=>{const e=n.target.checked;qe.fog=e?Vd:null,yt(e?"Atmospheric Fog Enabled":"Atmospheric Fog Disabled")}),Vc("medium")}let qc=0,Yc=0;function Mu(){requestAnimationFrame(Mu);const n=xn.getDelta(),e=xn.getElapsedTime();H_(n),B_(n),qc++,e-Yc>.5&&(K("fps").textContent=Math.round(qc/(e-Yc)),qc=0,Yc=e),bn.render(qe,Je)}setTimeout(()=>{const n=K("loading");n&&(n.style.display="none")},1200),k_(),G_(),Tn(),en(),ea(),Mu()})();
