(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Lambda = function() { };
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
var Main = function() { };
Main.main = function() {
	window.onload = Main._init;
};
Main._init = function() {
	Main._fbo = new fbo.FboMain();
	Main._fbo.init();
};
var IMap = function() { };
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var _Three = {};
_Three.CullFace_Impl_ = function() { };
_Three.FrontFaceDirection_Impl_ = function() { };
_Three.ShadowMapType_Impl_ = function() { };
_Three.Side_Impl_ = function() { };
_Three.Shading_Impl_ = function() { };
_Three.Colors_Impl_ = function() { };
_Three.BlendMode_Impl_ = function() { };
_Three.BlendingEquation_Impl_ = function() { };
_Three.BlendingDestinationFactor_Impl_ = function() { };
_Three.TextureConstant_Impl_ = function() { };
_Three.WrappingMode_Impl_ = function() { };
_Three.Filter_Impl_ = function() { };
_Three.DataType_Impl_ = function() { };
_Three.PixelType_Impl_ = function() { };
_Three.PixelFormat_Impl_ = function() { };
_Three.TextureFormat_Impl_ = function() { };
_Three.LineType_Impl_ = function() { };
var Three = function() { };
Three.requestAnimationFrame = function(f) {
	return window.requestAnimationFrame(f);
};
Three.cancelAnimationFrame = function(f) {
	window.cancelAnimationFrame(id);
};
var Tracer = function() {
};
Tracer.assert = function(condition,p1,p2,p3,p4,p5) {
};
Tracer.clear = function(p1,p2,p3,p4,p5) {
};
Tracer.count = function(p1,p2,p3,p4,p5) {
};
Tracer.debug = function(p1,p2,p3,p4,p5) {
};
Tracer.dir = function(p1,p2,p3,p4,p5) {
};
Tracer.dirxml = function(p1,p2,p3,p4,p5) {
};
Tracer.error = function(p1,p2,p3,p4,p5) {
};
Tracer.group = function(p1,p2,p3,p4,p5) {
};
Tracer.groupCollapsed = function(p1,p2,p3,p4,p5) {
};
Tracer.groupEnd = function() {
};
Tracer.info = function(p1,p2,p3,p4,p5) {
};
Tracer.log = function(p1,p2,p3,p4,p5) {
};
Tracer.markTimeline = function(p1,p2,p3,p4,p5) {
};
Tracer.profile = function(title) {
};
Tracer.profileEnd = function(title) {
};
Tracer.time = function(title) {
};
Tracer.timeEnd = function(title,p1,p2,p3,p4,p5) {
};
Tracer.timeStamp = function(p1,p2,p3,p4,p5) {
};
Tracer.trace = function(p1,p2,p3,p4,p5) {
};
Tracer.warn = function(p1,p2,p3,p4,p5) {
};
var camera = {};
camera.ExCamera = function(fov,aspect,near,far) {
	this._flag = false;
	this.tgtOffsetY = 0;
	this._countSpeed = 0;
	this._rAmp = 0;
	this._count = 0;
	this.isActive = false;
	this.radY = 0.001;
	this.radX = 0.001;
	this.amp = 300.0;
	this._oRadY = 0;
	this._oRadX = 0;
	this._height = 0;
	this._width = 0;
	this._mouseY = 0;
	this._mouseX = 0;
	this._downY = 0;
	this._downX = 0;
	this._down = false;
	THREE.PerspectiveCamera.call(this,fov,aspect,near,far);
};
camera.ExCamera.__super__ = THREE.PerspectiveCamera;
camera.ExCamera.prototype = $extend(THREE.PerspectiveCamera.prototype,{
	init: function(dom) {
		this._camera = this;
		this.target = new THREE.Vector3();
		dom.onmousedown = $bind(this,this.onMouseDown);
		dom.onmouseup = $bind(this,this.onMouseUp);
		dom.onmousemove = $bind(this,this.onMouseMove);
		dom.onmousewheel = $bind(this,this.onMouseWheel);
		window.addEventListener("DOMMouseScroll",$bind(this,this.onMouseWheelFF));
	}
	,_onResize: function() {
	}
	,onMouseWheelFF: function(e) {
		this.amp += e.detail * 0.5;
		if(this.amp > 18000) this.amp = 18000;
		if(this.amp < 100) this.amp = 100;
	}
	,onMouseWheel: function(e) {
		this.amp += e.wheelDelta * 0.5;
		if(this.amp > 18000) this.amp = 18000;
		if(this.amp < 100) this.amp = 100;
	}
	,onMouseUp: function(e) {
		e.preventDefault();
		this._down = false;
	}
	,onMouseDown: function(e) {
		e.preventDefault();
		this._down = true;
		this._downX = e.clientX;
		this._downY = e.clientY;
		this._oRadX = this.radX;
		this._oRadY = this.radY;
	}
	,onMouseMove: function(e) {
		e.preventDefault();
		this._mouseX = e.clientX;
		this._mouseY = e.clientY;
	}
	,update: function() {
		if(this._down) {
			var dx = -(this._mouseX - this._downX);
			var dy = this._mouseY - this._downY;
			this.radX = this._oRadX + dx / 100;
			this.radY = this._oRadY + dy / 100;
			if(this.radY > Math.PI / 2) this.radY = Math.PI / 2;
			if(this.radY < -Math.PI / 2) this.radY = -Math.PI / 2;
		}
		if(this._camera != null) this._updatePosition(0.25);
	}
	,setFOV: function(fov) {
		console.log("setFOV = " + fov);
		this._camera.fov = fov;
		this._camera.updateProjectionMatrix();
	}
	,resize: function() {
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._camera.aspect = this._width / this._height;
		this._camera.updateProjectionMatrix();
	}
	,reset: function(target) {
		var p = this._camera.position;
		this.amp = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
		this.radX = Math.atan2(p.x,p.z);
		this.radY = Math.atan2(p.y,p.z);
		this._updatePosition();
		if(this.radY > Math.PI / 2 * 0.96) this.radY = Math.PI / 2 * 0.96;
		if(this.radY < -Math.PI / 2 * 0.96) this.radY = -Math.PI / 2 * 0.96;
		if(target != null) this._camera.lookAt(target);
	}
	,setPolar: function(a,rx,ry) {
		this.amp = a;
		this.radX = rx;
		this.radY = ry;
		this._updatePosition();
	}
	,setRAmp: function(rAmp,countSpeed) {
		this._flag = true;
		this._rAmp += rAmp;
		this._countSpeed += countSpeed;
	}
	,_onAmp: function() {
		this._flag = false;
	}
	,_updatePosition: function(spd) {
		if(spd == null) spd = 1;
		var amp1 = this.amp * Math.cos(this.radY);
		this._count += this._countSpeed;
		var ox = this._rAmp * Math.cos(this._count / 30 * 2 * Math.PI);
		var oy = this._rAmp * Math.sin(this._count / 30 * 2 * Math.PI);
		this._rAmp *= 0.97;
		this._countSpeed *= 0.95;
		var x = this.target.x + amp1 * Math.sin(this.radX) + ox;
		var y = this.target.y + this.amp * Math.sin(this.radY) + oy;
		var z = this.target.z + amp1 * Math.cos(this.radX);
		this._camera.position.x += (x - this._camera.position.x) * spd;
		this._camera.position.y += (y - this._camera.position.y) * spd;
		this._camera.position.z += (z - this._camera.position.z) * spd;
		var t = this.target.clone();
		t.y += this.tgtOffsetY;
		this.target2 = t;
		this._camera.lookAt(t);
	}
});
var common = {};
common.Callback = function() {
};
common.Callback.create = function(scope,func,args) {
	return function() {
		func.apply(scope,args);
	};
};
common.Config = function() {
};
common.Config.prototype = {
	load: function(callback) {
		this._callback = callback;
		this._http = new haxe.Http("../../config.json");
		this._http.onData = $bind(this,this._onData);
		this._http.request();
	}
	,_onData: function(str) {
		var data = JSON.parse(str);
		common.Config.host = data.host;
		var win = window;
		win.host = common.Config.host;
		if(common.QueryGetter.getQuery("host") != null) win.host = common.QueryGetter.getQuery("host");
		common.Config.canvasOffsetY = data.canvasOffsetY;
		common.Config.globalVol = data.globalVol;
		common.Config.particleSize = data.particleSize;
		common.Config.bgLight = data.bgLight;
		if(this._callback != null) this._callback();
	}
};
common.Dat = function() {
};
common.Dat.init = function(callback) {
	common.StageRef.fadeIn();
	common.Dat._callback = callback;
	common.Dat._config = new common.Config();
	common.Dat._config.load(common.Dat._onInit);
};
common.Dat._onInit = function() {
	common.Dat.bg = window.location.hash == "#bg";
	common.Dat.gui = new dat.GUI({ autoPlace: false });
	window.document.body.appendChild(common.Dat.gui.domElement);
	common.Dat.gui.domElement.style.position = "absolute";
	common.Dat.gui.domElement.style.right = "0px";
	common.Dat.gui.domElement.style.top = "0px";
	common.Dat.gui.domElement.style.opacity = 0.7;
	common.Dat.gui.domElement.style.zIndex = 10;
	common.Key.init();
	common.Key.board.addEventListener("keydown",common.Dat._onKeyDown);
	common.Dat.show(false);
	if(common.Dat._callback != null) common.Dat._callback();
};
common.Dat._onKeyDown = function(e) {
	var _g = Std.parseInt(e.keyCode);
	switch(_g) {
	case 65:
		break;
	case 68:
		if(common.Dat.gui.domElement.style.display == "block") common.Dat.hide(); else common.Dat.show(true);
		break;
	case 49:
		common.StageRef.fadeOut(common.Dat._goURL1);
		break;
	case 50:
		common.StageRef.fadeOut(common.Dat._goURL2);
		break;
	case 51:
		common.StageRef.fadeOut(common.Dat._goURL3);
		break;
	case 52:
		common.StageRef.fadeOut(common.Dat._goURL4);
		break;
	case 53:
		common.StageRef.fadeOut(common.Dat._goURL5);
		break;
	case 54:
		common.StageRef.fadeOut(common.Dat._goURL6);
		break;
	}
};
common.Dat._goURL1 = function() {
	common.Dat._goURL("../../04/bin/");
};
common.Dat._goURL2 = function() {
	common.Dat._goURL("../../05/bin/");
};
common.Dat._goURL3 = function() {
	common.Dat._goURL("../../02/bin/");
};
common.Dat._goURL4 = function() {
	common.Dat._goURL("../../03/bin/");
};
common.Dat._goURL5 = function() {
	common.Dat._goURL("../../00/bin/");
};
common.Dat._goURL6 = function() {
	common.Dat._goURL("../../01/bin/");
};
common.Dat._goURL = function(url) {
	Tracer.log("goURL " + url);
	window.location.href = url + window.location.hash;
};
common.Dat.show = function(isBorder) {
	if(isBorder == null) isBorder = false;
	if(isBorder) common.StageRef.showBorder();
	common.Dat.gui.domElement.style.display = "block";
};
common.Dat.hide = function() {
	common.StageRef.hideBorder();
	common.Dat.gui.domElement.style.display = "none";
};
common.FadeSheet = function(ee) {
	this.opacity = 1;
	this.element = ee;
};
common.FadeSheet.prototype = {
	fadeIn: function() {
		this.element.style.opacity = "0";
		this.opacity = 0;
		if(this._twn != null) this._twn.kill();
		this._twn = TweenMax.to(this,0.8,{ opacity : 1, delay : 0.2, ease : Power0.easeInOut, onUpdate : $bind(this,this._onUpdate)});
	}
	,fadeOut: function(callback) {
		if(this._twn != null) this._twn.kill();
		this._twn = TweenMax.to(this,0.5,{ opacity : 0, ease : Power0.easeInOut, onUpdate : $bind(this,this._onUpdate), onComplete : callback});
	}
	,_onUpdate: function() {
		this.element.style.opacity = "" + this.opacity;
	}
};
common.Key = function() {
	THREE.EventDispatcher.call(this);
};
common.Key.init = function() {
	if(common.Key.board == null) {
		common.Key.board = new common.Key();
		common.Key.board.init2();
	}
};
common.Key.__super__ = THREE.EventDispatcher;
common.Key.prototype = $extend(THREE.EventDispatcher.prototype,{
	init2: function() {
		window.document.addEventListener("keydown",$bind(this,this._onKeyDown));
		this._socket = new common.WSocket();
		this._socket.init();
		if(common.Dat.bg) this._socket.addCallback($bind(this,this._onKeyDown));
	}
	,_onKeyDown: function(e) {
		var n = Std.parseInt(e.keyCode);
		Tracer.debug("_onkeydown " + n);
		this._dispatch(n);
	}
	,_dispatch: function(n) {
		if(!common.Dat.bg) this._socket.send(n);
		this.dispatchEvent({ type : "keydown", keyCode : n});
	}
});
common.Path = function() {
};
common.QueryGetter = function() {
};
common.QueryGetter.init = function() {
	common.QueryGetter._map = new haxe.ds.StringMap();
	var str = window.location.search;
	if(str.indexOf("?") < 0) Tracer.log("query nashi"); else {
		str = HxOverrides.substr(str,1,str.length - 1);
		var list = str.split("&");
		Tracer.log(list);
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var fuga = list[i].split("=");
			common.QueryGetter._map.set(fuga[0],fuga[1]);
		}
	}
	if(common.QueryGetter._map.get("t") != null) common.QueryGetter.t = Std.parseInt(common.QueryGetter._map.get("t"));
	common.QueryGetter._isInit = true;
};
common.QueryGetter.getQuery = function(idd) {
	if(!common.QueryGetter._isInit) common.QueryGetter.init();
	return common.QueryGetter._map.get(idd);
};
common.StageRef = function() {
};
common.StageRef.showBorder = function() {
	var dom = window.document.getElementById("webgl");
	dom.style.border = "solid 1px #cccccc";
};
common.StageRef.hideBorder = function() {
	var dom = window.document.getElementById("webgl");
	dom.style.border = "solid 0px";
};
common.StageRef.fadeIn = function() {
	if(common.StageRef.sheet == null) common.StageRef.sheet = new common.FadeSheet(window.document.getElementById("webgl"));
	common.StageRef.sheet.fadeIn();
};
common.StageRef.fadeOut = function(callback) {
	if(common.StageRef.sheet == null) common.StageRef.sheet = new common.FadeSheet(window.document.getElementById("webgl"));
	common.StageRef.sheet.fadeOut(callback);
};
common.StageRef.setCenter = function() {
	var dom = window.document.getElementById("webgl");
	var yy = window.innerHeight / 2 - common.StageRef.get_stageHeight() / 2 + common.Config.canvasOffsetY;
	dom.style.position = "absolute";
	dom.style.zIndex = "1000";
	dom.style.top = Math.round(yy) + "px";
};
common.StageRef.get_stageWidth = function() {
	return window.innerWidth;
};
common.StageRef.get_stageHeight = function() {
	if(common.Dat.bg) return Math.floor(window.innerWidth * 816 / 1920);
	return Math.floor(window.innerWidth * 576 / 1920);
};
common.WSocket = function() {
};
common.WSocket.prototype = {
	init: function() {
		var win = window;
		if(win.io != null) {
			this._socket = io.connect(window.host);
			this._socket.on("server_to_client",$bind(this,this._onRecieve));
		} else {
		}
	}
	,send: function(key) {
		if(this._socket != null) this._socket.emit("client_to_server",{ value : key});
	}
	,addCallback: function(callback) {
		this._callback = callback;
	}
	,_onRecieve: function(data) {
		data.keyCode = data.value;
		if(this._callback != null) this._callback(data);
	}
};
var effect = {};
effect.PostProcessing2 = function() {
	this.strength = 0;
	this._rad = 0;
	this._mode = 0;
	this._modeList = ["MODE_NORMAL","MODE_DISPLACEMENT_A","MODE_DISPLACEMENT_B","MODE_COLOR"];
};
effect.PostProcessing2.prototype = {
	init: function(scene,camera,renderer) {
		this._scene = scene;
		this._camera = camera;
		this._renderer = renderer;
		this._renderPass = new THREE.RenderPass(scene,camera);
		this._copyPass = new THREE.ShaderPass(effect.shaders.CopyShader.getObject());
		this._composer = new THREE.EffectComposer(renderer);
		this._composer.addPass(this._renderPass);
		this._displacePass = new effect.pass.DisplacementPass();
		this._displacePass.enabled = true;
		this._composer.addPass(this._displacePass);
		this._composer.addPass(this._copyPass);
		this._copyPass.clear = true;
		this._copyPass.renderToScreen = true;
		this.change(false,true);
	}
	,change: function(isColor,isDisplace) {
		this._displacePass.setTexture(isColor,isDisplace);
	}
	,update: function(audio) {
		this._displacePass.update(audio);
		this._composer.render();
	}
	,resize: function(w,h) {
		this._composer.setSize(w,h);
	}
};
effect.pass = {};
effect.pass.DisplacementPass = function() {
	this._fragment = "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D disTexture;\r\n\t\t\t\t\tuniform sampler2D colTexture;\r\n\t\t\t\t\tuniform float strengthX;\r\n\t\t\t\t\tuniform float strengthY;\r\n\t\t\t\t\tuniform float counter;\r\n\t\t\t\t\tuniform float isDisplace;\r\n\t\t\t\t\tuniform float isColor;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\t\r\n\t\t\t\t\tvec4 getColor(vec4 texel) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tvec4 out1 = vec4(0.0);\r\n\t\t\t\t\t\tvec2 pp = vec2( 0.5, fract( texel.x + counter ) );\r\n\t\t\t\t\t\t\tif ( pp.y < 0.5) {\r\n\t\t\t\t\t\t\t\tpp.y = pp.y * 2.0;\r\n\t\t\t\t\t\t\t\tout1 = texture2D( colTexture, pp );\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\t\tpp.y = (1.0 - (pp.y - 0.5) * 2.0);\t\t\t\t\r\n\t\t\t\t\t\t\t\tout1 = texture2D( colTexture, pp );\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tif ( texel.x == 0.0 ) {\r\n\t\t\t\t\t\t\t\tout1 = vec4(0.0, 0.0, 0.0, 1.0);\r\n\t\t\t\t\t\t\t}\t\t\r\n\t\t\t\t\t\t\treturn out1;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//dispace\r\n\t\t\t\t\t\tvec4 texel = vec4(0.0);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tif(isDisplace == 1.0){\r\n\t\t\t\t\t\t\tvec4 col = texture2D( disTexture, vUv);\r\n\t\t\t\t\t\t\tfloat f1 = strengthX * sin(counter*0.17);// pow(counter, 2.0 + 3.0 * col.x);//sin(counter * 3.9) * 0.23;\r\n\t\t\t\t\t\t\tfloat f2 = strengthY * sin(counter*0.22);// pow(counter, 2.0 + 3.0 * col.x) * 0.001;// pow(counter, 2.0 + 3.0 * col.y);//cos(counter * 3.7) * 0.23;\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\tvec2 axis = vec2( \r\n\t\t\t\t\t\t\t\tvUv.x + (col.y-0.5)*f1, vUv.y + (col.z-0.5)*f2\r\n\t\t\t\t\t\t\t);\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\ttexel = texture2D( tDiffuse, axis );\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\ttexel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 texel = texture2D( colTexture, axis );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec3 luma = vec3( 0.299, 0.587, 0.114 );\r\n\t\t\t\t\t\t//float v = dot( texel.xyz, luma );//akarusa\r\n\t\t\t\t\t\t//vec2 axis = vec2( 0.5,v );\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//position\r\n\t\t\t\t\t\tvec4 out1 = vec4(0.0);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tif( isColor == 1.0){\r\n\t\t\t\t\t\t\tout1 = getColor(texel);\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\tout1 = texel;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\tif ( texel.x == 0.0 || mod( floor( texel.x * 1000.0 + counter ),2.0) == 0.0 ) {\r\n\t\t\t\t\t\t\ttexel.x = 0.0;\r\n\t\t\t\t\t\t\ttexel.y = 0.0;\r\n\t\t\t\t\t\t\ttexel.z = 0.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\ttexel.x = out1.x;//1.0;\r\n\t\t\t\t\t\t\ttexel.y = out1.y;//1.0;\r\n\t\t\t\t\t\t\ttexel.z = out1.z;//1.0;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}*/\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t\ttexel.x = out1.x;//1.0;\r\n\t\t\t\t\t\t\ttexel.y = out1.y;//1.0;\r\n\t\t\t\t\t\t\ttexel.z = out1.z;//1.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t*/\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = out1;\r\n\t\t\t\t\t\t//gl_FragColor =  out1;// texel;\r\n\t\t\t\t\t}\r\n\t";
	this._vertex = "\r\n\t\tvarying vec2 vUv;\r\n\t\tvoid main() {\r\n\t\t\tvUv = uv;\r\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}\t\t\r\n\t";
	this._textures = [];
	this._textures.push(THREE.ImageUtils.loadTexture("../../assets/" + "displace/displaceA.png"));
	this._textures.push(THREE.ImageUtils.loadTexture("../../assets/" + "displace/displaceV.png"));
	this._colors = [THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade2.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade3.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade4.png")];
	THREE.ShaderPass.call(this,{ uniforms : { tDiffuse : { type : "t", value : null}, isDisplace : { type : "f", value : 1}, isColor : { type : "f", value : 1}, disTexture : { type : "t", value : this._textures[0]}, colTexture : { type : "t", value : this._colors[3]}, strengthX : { type : "f", value : 0}, strengthY : { type : "f", value : 0}, counter : { type : "f", value : 0}}, vertexShader : this._vertex, fragmentShader : this._fragment});
};
effect.pass.DisplacementPass.__super__ = THREE.ShaderPass;
effect.pass.DisplacementPass.prototype = $extend(THREE.ShaderPass.prototype,{
	update: function(audio) {
		if(!this.enabled) return;
		this.uniforms.strengthX.value = Math.pow(audio.freqByteData[3] / 255,4) * 0.75;
		this.uniforms.strengthY.value = Math.pow(audio.freqByteData[7] / 255,4) * 0.75;
		this.uniforms.counter.value += audio.freqByteData[3] / 255 * 0.8;
	}
	,setTexture: function(isColor,isDisplace) {
		if(isColor) this.uniforms.isColor.value = 1; else this.uniforms.isColor.value = 0;
		if(isDisplace) this.uniforms.isDisplace.value = 1; else this.uniforms.isDisplace.value = 0;
		this.uniforms.disTexture.value = this._textures[Math.floor(Math.random() * this._textures.length)];
		this.uniforms.colTexture.value = this._colors[Math.floor(Math.random() * this._colors.length)];
	}
});
effect.shaders = {};
effect.shaders.CopyShader = function() {
};
effect.shaders.CopyShader.getObject = function() {
	var obj = { uniforms : { tDiffuse : { type : "t", value : null}, opacity : { type : "f", value : 1.0}}, vertexShader : "varying vec2 vUv;\r\n\r\n\t\t\t\tvoid main() {\r\n\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\r\n\t\t\t\t}", fragmentShader : "uniform float opacity;\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\tgl_FragColor = opacity * texel;\r\n\t\t\t\t}"};
	return obj;
};
var emoji = {};
emoji.Emoji = function() {
	this.animationFrameLength = 32;
	this._height = 32;
	this._width = 32;
	THREE.Object3D.call(this);
};
emoji.Emoji.__super__ = THREE.Object3D;
emoji.Emoji.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		var l = this._width * this._height;
		var vertices = new Float32Array(l * 3);
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			var i3 = i * 3;
			vertices[i3] = 300 * (Math.random() - 0.5);
			vertices[i3 + 1] = 300 * (Math.random() - 0.5);
			vertices[i3 + 2] = 300 * (Math.random() - 0.5);
		}
		var aOffsets = new Float32Array(l * 2);
		var _g1 = 0;
		while(_g1 < l) {
			var i1 = _g1++;
			var i2 = i1 * 2;
			var pos = this.getIconPos(Math.floor(Math.random() * 700));
			aOffsets[i2] = pos.x;
			aOffsets[i2 + 1] = pos.y;
		}
		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute("position",new THREE.BufferAttribute(vertices,3));
		geometry.addAttribute("aOffset",new THREE.BufferAttribute(aOffsets,2));
		this._emojiMat = new emoji.EmojiShader();
		this._emoji = new THREE.Points(geometry,this._emojiMat);
		this.add(this._emoji);
	}
	,getIconPos: function(index) {
		index = index % 700;
		var xx = index % this.animationFrameLength;
		var yy = this.animationFrameLength - 1 - Math.floor(index / this.animationFrameLength);
		return new THREE.Vector2(xx / this.animationFrameLength,yy / this.animationFrameLength);
	}
	,update: function() {
		this._emojiMat.update();
	}
});
emoji.EmojiShader = function() {
	this.fragment = "\r\n\t\t  uniform vec3 color;\r\n\t\t  uniform sampler2D texture;\r\n\t\t  uniform vec2 offset;\r\n\t\t  varying vec2 vaOffset;\r\n\t\t  uniform vec2 repeat;\r\n\t\t  \r\n\t\t  void main() {\r\n\t\t\t\r\n\t\t\tvec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);\r\n\t\t\tvec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//\r\n\t\t\tgl_FragColor = color0;\r\n\t\t\t\r\n\t\t  }\r\n\t";
	this.vertex = "\r\n\t\t\tuniform float scale;\r\n\t\t\tuniform vec3 posScale;\r\n\t\t\tattribute vec2 aOffset;\r\n\t\t\tvarying vec2 vaOffset;\t  \r\n\t\t\tvoid main() {\r\n\t\t\t\t//vec3 ps = vec3(2.0, 2.0, 2.0);\r\n\t\t\t\tvaOffset = aOffset;\r\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position * posScale, 1.0 );\r\n\t\t\t\tgl_PointSize = 2.0 * scale / gl_Position.w;\r\n\t\t\t}\r\n\t";
	this.animationFrameLength = 32;
	this._texture = new THREE.TextureLoader().load("../../assets/" + "emoji/emo2048_64.png");
	this._texture.minFilter = 1003;
	this._texture.magFilter = 1003;
	this._texture.needsUpdate = true;
	this.uniforms = { texture : { type : "t", value : this._texture}, scale : { type : "f", value : 3000.0}, posScale : { type : "v3", value : new THREE.Vector3(1.0,1.0,1.0)}, repeat : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,1 / this.animationFrameLength)}};
	THREE.ShaderMaterial.call(this,{ uniforms : this.uniforms, vertexShader : this.vertex, fragmentShader : this.fragment, transparent : true, alphaTest : 0.5, depthWrite : false});
};
emoji.EmojiShader.__super__ = THREE.ShaderMaterial;
emoji.EmojiShader.prototype = $extend(THREE.ShaderMaterial.prototype,{
	update: function() {
	}
});
var fbo = {};
fbo.Fbo = function() {
	this.animationFrameLength = 32;
	this._height = 512;
	this._width = 512;
	this._flag = false;
};
fbo.Fbo.prototype = {
	init: function(ww,hh) {
		this._width = ww;
		this._height = hh;
		this._simuShaderMat = new fbo.SimulationShaderMat(ww,hh);
		this._simScene = new THREE.Scene();
		this._simCam = new THREE.OrthographicCamera(-1,1,1,-1,1 / Math.pow(2,53),1);
		this._posRttA = new THREE.WebGLRenderTarget(this._width,this._height,{ minFilter : 1003, magFilter : 1003, format : 1020, type : 1015});
		this._posRttB = this._posRttA.clone();
		var simGeo = new THREE.BufferGeometry();
		simGeo.addAttribute("position",new THREE.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0]),3));
		simGeo.addAttribute("uv",new THREE.BufferAttribute(new Float32Array([0,1,1,1,1,0,0,1,1,0,0,0]),2));
		var l = this._width * this._height;
		var life = new Float32Array(l);
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			life[i] = Math.random() * 0.4;
		}
		simGeo.addAttribute("life",new THREE.BufferAttribute(life,1));
		this._simMesh = new THREE.Mesh(simGeo,this._simuShaderMat);
		this._simScene.add(this._simMesh);
		this._particles = new fbo.RenderParticle(this._width,this._height);
		this._line = new THREE.Line(this._particles.getGeometry(),this._particles.getMaterial());
	}
	,next: function() {
		var isRandom;
		if(Math.random() < 0.5) isRandom = true; else isRandom = false;
		if(Math.random() < 0.5) this._line.visible = true; else this._line.visible = false;
		this._particles.updateIconPos(Math.floor(Math.random() * 700),isRandom);
		this._simuShaderMat.next();
	}
	,update: function(audio,render) {
		this._simuShaderMat.update(audio);
		if(this._flag) {
			render.render(this._simScene,this._simCam,this._posRttA,true);
			this._particles.getMaterial().uniforms.positions.value = this._posRttA;
			this._simuShaderMat.uniforms.texture.value = this._posRttA;
		} else {
			render.render(this._simScene,this._simCam,this._posRttB,true);
			this._particles.getMaterial().uniforms.positions.value = this._posRttB;
			this._simuShaderMat.uniforms.texture.value = this._posRttB;
		}
		this._flag = !this._flag;
	}
	,getMesh: function() {
		return this._mesh;
	}
	,getLine: function() {
		return this._line;
	}
	,getParticles: function() {
		return this._particles;
	}
};
fbo.FboMain = function() {
	this._isPP = false;
};
fbo.FboMain.prototype = {
	init: function() {
		this._renderer = new THREE.WebGLRenderer({ antialias : false, devicePixelRatio : 1});
		this._renderer.domElement.id = "webgl";
		window.document.body.appendChild(this._renderer.domElement);
		common.Dat.init($bind(this,this._onInit2));
	}
	,_onInit2: function() {
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this._onAudio));
	}
	,_onAudio: function() {
		common.StageRef.setCenter();
		this._scene = new THREE.Scene();
		this._camera = new camera.ExCamera(40,window.innerWidth / window.innerHeight,30,3000);
		this._camera.init(this._renderer.domElement);
		this._camera.amp = 1000;
		this._renderer.setClearColor(new THREE.Color(0));
		this._pp = new effect.PostProcessing2();
		this._pp.init(this._scene,this._camera,this._renderer);
		this._fbo = new fbo.Fbo();
		var num = 128;
		this._fbo.init(num,num);
		this._particles = this._fbo.getParticles();
		this._scene.add(this._particles);
		this._line = this._fbo.getLine();
		if(!common.Dat.bg) this._scene.add(this._line);
		var mesh = new THREE.Mesh(new THREE.BoxGeometry(50,50,50,1,1,1),new THREE.MeshBasicMaterial({ color : 16711680, wireframe : true}));
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
		common.Dat.gui.add(this,"changePP");
		common.Dat.gui.add(this,"changeLine");
		common.Dat.gui.add(this,"next");
		common.Key.board.addEventListener("keydown",$bind(this,this._onKeyDown));
		this.update();
	}
	,_onKeyDown: function(e) {
		var n = Std.parseInt(e.keyCode);
		switch(n) {
		case 39:
			this.next();
			break;
		case 38:
			this.changePP();
			break;
		case 76:
			this.changeLine();
			break;
		}
	}
	,next: function() {
		this._fbo.next();
	}
	,changeLine: function() {
		this._line.visible = !this._line.visible;
	}
	,changePP: function() {
		this._isPP = true;
		this._pp.change(false,true);
	}
	,update: function() {
		if(this._audio != null) this._audio.update();
		if(this._fbo != null) this._fbo.update(this._audio,this._renderer);
		this._camera.radX += Math.PI / 720;
		this._camera.update();
		if(this._isPP) this._pp.update(this._audio); else this._renderer.render(this._scene,this._camera);
		window.requestAnimationFrame($bind(this,this.update));
	}
	,_onResize: function(e) {
		var ww = common.StageRef.get_stageWidth();
		var hh = common.StageRef.get_stageHeight();
		this._renderer.domElement.width = ww;
		this._renderer.domElement.height = hh;
		this._renderer.setSize(ww,hh);
		this._camera.aspect = ww / hh;
		this._camera.updateProjectionMatrix();
		this._pp.resize(ww,hh);
	}
};
fbo.RenderParticle = function(ww,hh) {
	this._width = ww;
	this._height = hh;
	this._renderShaderMat = new fbo.RenderShaderMat();
	this._particleGeo = this._getParticleGeo();
	THREE.Points.call(this,this._particleGeo,this._renderShaderMat);
	this.sortParticles = true;
};
fbo.RenderParticle.__super__ = THREE.Points;
fbo.RenderParticle.prototype = $extend(THREE.Points.prototype,{
	_getParticleGeo: function() {
		var l = this._width * this._height;
		var vertices = new Float32Array(l * 3);
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			var i3 = i * 3;
			vertices[i3] = i % this._width / this._width;
			vertices[i3 + 1] = i / this._width / this._height;
		}
		var aOffsets = new Float32Array(l * 2);
		var _g1 = 0;
		while(_g1 < l) {
			var i1 = _g1++;
			var i2 = i1 * 2;
			var pos = this._getIconPos(Math.floor(Math.random() * 700));
			aOffsets[i2] = pos.x;
			aOffsets[i2 + 1] = pos.y;
		}
		var life = new Float32Array(l);
		var _g2 = 0;
		while(_g2 < l) {
			var i4 = _g2++;
			life[i4] = Math.random();
		}
		var rand = new Float32Array(l);
		var _g3 = 0;
		while(_g3 < l) {
			var i5 = _g3++;
			rand[i5] = Math.random();
		}
		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute("position",new THREE.BufferAttribute(vertices,3));
		geometry.addAttribute("aOffset",new THREE.BufferAttribute(aOffsets,2));
		geometry.addAttribute("rand",new THREE.BufferAttribute(rand,1));
		return geometry;
	}
	,updateIconPos: function(idx,isRandom) {
		if(isRandom == null) isRandom = false;
		this._particleGeo.attributes.aOffset.needsUpdate = true;
		var ary = this._particleGeo.attributes.aOffset.array;
		var l = this._width * this._height;
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			var i2 = i * 2;
			var pos;
			if(isRandom) pos = this._getIconPos(Math.floor(Math.random() * 700)); else pos = this._getIconPos(idx);
			ary[i2] = pos.x;
			ary[i2 + 1] = pos.y;
		}
	}
	,_getIconPos: function(index) {
		var nn = 32;
		index = index % 700;
		var xx = index % nn;
		var yy = nn - 1 - Math.floor(index / nn);
		return new THREE.Vector2(xx / nn,yy / nn);
	}
	,getGeometry: function() {
		return this._particleGeo;
	}
	,getMaterial: function() {
		return this._renderShaderMat;
	}
});
fbo.RenderShaderMat = function() {
	this._fragment = "\r\nuniform sampler2D texture;\r\nvarying vec2 vUv;\r\nvarying vec2 vaOffset;\r\nuniform vec2 repeat;\r\nvoid main()\r\n{\r\n\t\t\tvec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);\r\n\t\t\tvec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//\r\n\t\t\tgl_FragColor = color0;\r\n}\r\n\t";
	this._vertex = "\r\n//float texture containing the positions of each particle\r\nuniform sampler2D positions;\r\nuniform sampler2D texture;\r\nuniform vec2 nearFar;\r\nuniform float pointSize;\r\nvarying vec2 vUv;\r\nvarying float size;\r\n\r\nuniform float scale;\r\nattribute vec2 aOffset;\r\nattribute float rand;\r\nvarying vec2 vaOffset;\t  \r\n\r\nvoid main() {\r\n\r\n\t//positions画像のuv と vertexのposition が 対応するようになっている\r\n    //the mesh is a nomrliazed square so the uvs = the xy positions of the vertices\r\n    vec3 pos = texture2D( positions, position.xy ).xyz;\r\n\tvUv = uv;\r\n\r\n\tvaOffset = aOffset;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( pos + rand, 1.0 );\r\n\tgl_PointSize = 2.0 * scale / gl_Position.w;\t\r\n\t\r\n    //pos now contains the position of a point in space taht can be transformed\r\n    //gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\r\n    //size\r\n    //gl_PointSize = size = 3.0;// max( 1., ( step( 1. - ( 1. / 512. ), position.x ) ) * pointSize );\r\n}\t\r\n\t";
	var tex = THREE.ImageUtils.loadTexture("../../assets/" + "emoji/emoji2048_64.png");
	THREE.ShaderMaterial.call(this,{ uniforms : { positions : { type : "t", value : null}, pointSize : { type : "f", value : 40}, texture : { type : "t", value : tex}, scale : { type : "f", value : 3000.0}, repeat : { type : "v2", value : new THREE.Vector2(0.03125,0.03125)}}, vertexShader : this._vertex, fragmentShader : this._fragment, transparent : true, side : 2});
	this.depthTest = true;
	this.transparent = true;
	this.alphaTest = 0.5;
};
fbo.RenderShaderMat.__super__ = THREE.ShaderMaterial;
fbo.RenderShaderMat.prototype = $extend(THREE.ShaderMaterial.prototype,{
});
fbo.SimulationShaderMat = function(ww,hh) {
	this._rad = 0;
	this._idx3 = 2;
	this._idx2 = 1;
	this._idx1 = 0;
	this._fragment = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t" + "\r\n\r\n// simulation\r\n\r\nvarying vec2 vUv;\r\nvarying float vLife;\r\nuniform sampler2D texture;\r\nuniform float timer;\r\nuniform float frequency;\r\nuniform float amplitude;\r\nuniform float maxDistance;\r\nuniform float freqByteData[32];\r\nuniform float strength;\r\nuniform vec3 freqs;\r\nuniform vec3 start;\r\nvoid main() {\r\n\r\n    vec3 pos = texture2D( texture, vUv ).xyz;\r\n\t\r\n    //vec3 tar = pos + curl( pos.x * frequency, pos.y * frequency, pos.z * frequency ) * amplitude;\r\n    //float d = length( pos-tar ) / maxDistance;\r\n    //pos = mix( pos, tar, pow( d, 5. ) );\r\n\t\r\n\tfloat rr = 0.2 * sin(timer * 0.1);\r\n\tvec3 vv = curlNoise(pos * rr);/////koko\r\n\tvv.x *= freqs.x / 255.0 * 10.0 * strength;\r\n\tvv.y *= freqs.y / 255.0 * 10.0 * strength;\r\n\tvv.z *= freqs.z / 255.0 * 10.0 * strength;\r\n\t\r\n    //pos = pos + vv * 2.5;\r\n\tpos = pos + vv;// * freqByteData[3] / 255.0 * 10.0;\r\n\t\r\n    //pos.y += hoge.y * 2.1;\r\n    //pos.z += hoge.z * 2.1;\r\n\tfloat nn = fract( timer + vLife );\r\n\t\r\n\t\r\n\tif ( nn > 0.95 ) {\r\n\t\t//if (length(pos) > 500.0) {\r\n\t\tpos = start + curlNoise( vec3(vLife*10.0,vLife*11.1,vLife*13.3) ) * 10.0;// * 0.01;\r\n\t}\r\n\t\r\n    gl_FragColor = vec4( pos, 1. );//pos wo hozon\r\n\r\n}\t\r\n\t";
	this._vertex = "\r\n\t\tvarying vec2 vUv;\r\n\t\tvarying float vLife;\r\n\t\tattribute float life;\r\n\t\t//varying float fragDepth;\r\n\t\tvoid main() {\r\n\t\t\tvLife = life;\r\n\t\t\tvUv = vec2(uv.x, uv.y);\r\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}\t\r\n\t";
	var width = ww;
	var height = hh;
	var data = this.getSphere(width * height,250);
	var texture = new THREE.DataTexture(data,width,height,THREE.RGBFormat,THREE.FloatType,THREE.DEFAULT_MAPPING,THREE.RepeatWrapping,THREE.RepeatWrapping);
	texture.needsUpdate = true;
	THREE.ShaderMaterial.call(this,{ uniforms : { texture : { type : "t", value : texture}, timer : { type : "f", value : 0}, frequency : { type : "f", value : 0.01}, amplitude : { type : "f", value : 96}, maxDistance : { type : "f", value : 48}, freqByteData : { type : "fv1", value : sound.MyAudio.a.freqByteDataAry}, freqs : { type : "v3", value : new THREE.Vector3(0,1,2)}, start : { type : "v3", value : new THREE.Vector3(0,1,2)}, strength : { type : "f", value : 1}}, vertexShader : this._vertex, fragmentShader : this._fragment});
};
fbo.SimulationShaderMat.__super__ = THREE.ShaderMaterial;
fbo.SimulationShaderMat.prototype = $extend(THREE.ShaderMaterial.prototype,{
	next: function() {
		this._idx1 = Math.floor(12 * Math.random());
		this._idx2 = Math.floor(12 * Math.random());
		this._idx3 = Math.floor(12 * Math.random());
	}
	,update: function(a) {
		this.uniforms.timer.value += 0.001;
		this.uniforms.freqByteData.value = a.freqByteDataAry;
		this.uniforms.freqs.value.x = a.freqByteDataAry[this._idx1];
		this.uniforms.freqs.value.y = a.freqByteDataAry[this._idx2];
		this.uniforms.freqs.value.z = a.freqByteDataAry[this._idx3];
		var amp = Math.pow(a.freqByteDataAry[10] / 255,2) * 300;
		this._rad += 0.01;
		this.uniforms.start.value.x = amp * Math.sin(this._rad * 0.86);
		this.uniforms.start.value.y = amp * Math.cos(this._rad * 0.79);
		this.uniforms.start.value.z = amp * Math.sin(this._rad * 0.90);
	}
	,getSphere: function(count,size) {
		var len = count * 3;
		var data = new Float32Array(len);
		var p = new THREE.Vector3();
		var i = 0;
		var _g = 0;
		while(_g < len) {
			var j = _g++;
			this.getPoint(p,size);
			data[i] = p.x;
			data[i + 1] = p.y;
			data[i + 2] = p.z;
			i += 3;
		}
		return data;
	}
	,getPoint: function(v,size) {
		v.x = Math.random() * 2 - 1;
		v.y = Math.random() * 2 - 1;
		v.z = Math.random() * 2 - 1;
		if(v.length() > 1) return this.getPoint(v,size);
		return v.normalize().multiplyScalar(size);
	}
});
fbo.shaders = {};
fbo.shaders.CurlNoise = function() {
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
};
var js = {};
js.Browser = function() { };
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var sound = {};
sound.MyAudio = function() {
	this.globalVolume = 0.897;
	this.isStart = false;
	this.freqByteDataAryEase = [];
	this._impulse = [];
};
sound.MyAudio.prototype = {
	init: function(callback) {
		this.globalVolume = common.Config.globalVol;
		this._callback = callback;
		sound.MyAudio.a = this;
		var nav = window.navigator;
		nav.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;
		nav.getUserMedia({ audio : true},$bind(this,this._handleSuccess),$bind(this,this._handleError));
	}
	,_handleError: function(evt) {
		window.alert("err");
	}
	,_handleSuccess: function(evt) {
		var audioContext = new AudioContext();
		var source = audioContext.createMediaStreamSource(evt);
		this.analyser = audioContext.createAnalyser();
		this.analyser.fftSize = 64;
		this._impulse = [];
		this.subFreqByteData = [];
		this.freqByteDataAry = [];
		this._oldFreqByteData = [];
		var _g = 0;
		while(_g < 64) {
			var i = _g++;
			this.subFreqByteData[i] = 0;
			this.freqByteDataAryEase[i] = 0;
			this._oldFreqByteData[i] = 0;
		}
		source.connect(this.analyser,0);
		this.isStart = true;
		common.Dat.gui.add(this,"globalVolume",0.01,3.00).step(0.01);
		common.Dat.gui.add(this,"setImpulse");
		this.setImpulse();
		this.update();
		this._callback();
	}
	,update: function() {
		if(!this.isStart) {
			console.log("not work");
			return;
		}
		this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteFrequencyData(this.freqByteData);
		var _g1 = 0;
		var _g = this.freqByteData.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.subFreqByteData[i] = this.freqByteData[i] - this._oldFreqByteData[i];
		}
		var _g11 = 0;
		var _g2 = this.freqByteData.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this._oldFreqByteData[i1] = this.freqByteData[i1];
		}
		this.timeData = new Uint8Array(this.analyser.fftSize);
		this.analyser.getByteTimeDomainData(this.timeData);
		var _g12 = 0;
		var _g3 = this.freqByteData.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			this.freqByteData[i2] = Math.floor(this.freqByteData[i2] * this.globalVolume) + Math.floor(this._impulse[i2]);
		}
		var _g13 = 0;
		var _g4 = this.freqByteData.length;
		while(_g13 < _g4) {
			var i3 = _g13++;
			this.subFreqByteData[i3] = Math.floor(this.subFreqByteData[i3] * this.globalVolume);
		}
		var _g14 = 0;
		var _g5 = this.freqByteData.length;
		while(_g14 < _g5) {
			var i4 = _g14++;
			this.timeData[i4] = Math.floor(this.timeData[i4] * this.globalVolume);
		}
		var _g15 = 0;
		var _g6 = this.freqByteData.length;
		while(_g15 < _g6) {
			var i5 = _g15++;
			this.freqByteDataAry[i5] = this.freqByteData[i5];
			this.freqByteDataAryEase[i5] += (this.freqByteData[i5] - this.freqByteDataAryEase[i5]) / 2;
		}
		this._updateInpulse();
	}
	,_updateInpulse: function() {
		var _g = 0;
		while(_g < 64) {
			var i = _g++;
			this._impulse[i] += (0 - this._impulse[i]) / 2;
		}
	}
	,setImpulse: function(stlength) {
		if(stlength == null) stlength = 1;
		var _g = 0;
		while(_g < 64) {
			var i = _g++;
			this._impulse[i] = 255 * Math.random() * stlength;
		}
	}
};
var three = {};
three.Face = function() { };
three.IFog = function() { };
three.Mapping = function() { };
three.Renderer = function() { };
three._WebGLRenderer = {};
three._WebGLRenderer.RenderPrecision_Impl_ = function() { };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
_Three.CullFace_Impl_.None = 0;
_Three.CullFace_Impl_.Back = 1;
_Three.CullFace_Impl_.Front = 2;
_Three.CullFace_Impl_.FrontBack = 3;
_Three.FrontFaceDirection_Impl_.CW = 0;
_Three.FrontFaceDirection_Impl_.CCW = 1;
_Three.ShadowMapType_Impl_.BasicShadowMap = 0;
_Three.ShadowMapType_Impl_.PCFShadowMap = 1;
_Three.ShadowMapType_Impl_.PCFSoftShadowMap = 2;
_Three.Side_Impl_.FrontSide = 0;
_Three.Side_Impl_.BackSide = 1;
_Three.Side_Impl_.DoubleSide = 2;
_Three.Shading_Impl_.NoShading = 0;
_Three.Shading_Impl_.FlatShading = 1;
_Three.Shading_Impl_.SmoothShading = 2;
_Three.Colors_Impl_.NoColors = 0;
_Three.Colors_Impl_.FaceColors = 1;
_Three.Colors_Impl_.VertexColors = 2;
_Three.BlendMode_Impl_.NoBlending = 0;
_Three.BlendMode_Impl_.NormalBlending = 1;
_Three.BlendMode_Impl_.AdditiveBlending = 2;
_Three.BlendMode_Impl_.SubtractiveBlending = 3;
_Three.BlendMode_Impl_.MultiplyBlending = 4;
_Three.BlendMode_Impl_.CustomBlending = 5;
_Three.BlendingEquation_Impl_.AddEquation = 100;
_Three.BlendingEquation_Impl_.SubtractEquation = 101;
_Three.BlendingEquation_Impl_.ReverseSubtractEquation = 102;
_Three.BlendingDestinationFactor_Impl_.ZeroFactor = 200;
_Three.BlendingDestinationFactor_Impl_.OneFactor = 201;
_Three.BlendingDestinationFactor_Impl_.SrcColorFactor = 202;
_Three.BlendingDestinationFactor_Impl_.OneMinusSrcColorFactor = 203;
_Three.BlendingDestinationFactor_Impl_.SrcAlphaFactor = 204;
_Three.BlendingDestinationFactor_Impl_.OneMinusSrcAlphaFactor = 205;
_Three.BlendingDestinationFactor_Impl_.DstAlphaFactor = 206;
_Three.BlendingDestinationFactor_Impl_.OneMinusDstAlphaFactor = 207;
_Three.BlendingDestinationFactor_Impl_.DstColorFactor = 208;
_Three.BlendingDestinationFactor_Impl_.OneMinusDstColorFactor = 209;
_Three.BlendingDestinationFactor_Impl_.SrcAlphaSaturateFactor = 210;
_Three.TextureConstant_Impl_.MultiplyOperation = 0;
_Three.TextureConstant_Impl_.MixOperation = 1;
_Three.TextureConstant_Impl_.AddOperation = 2;
_Three.WrappingMode_Impl_.RepeatWrapping = 1000;
_Three.WrappingMode_Impl_.ClampToEdgeWrapping = 1001;
_Three.WrappingMode_Impl_.MirroredRepeatWrapping = 1002;
_Three.Filter_Impl_.NearestFilter = 1003;
_Three.Filter_Impl_.NearestMipMapNearestFilter = 1004;
_Three.Filter_Impl_.NearestMipMapLinearFilter = 1005;
_Three.Filter_Impl_.LinearFilter = 1006;
_Three.Filter_Impl_.LinearMipMapNearestFilter = 1007;
_Three.Filter_Impl_.LinearMipMapLinearFilter = 1008;
_Three.DataType_Impl_.UnsignedByteType = 1009;
_Three.DataType_Impl_.ByteType = 1010;
_Three.DataType_Impl_.ShortType = 1011;
_Three.DataType_Impl_.UnsignedShortType = 1012;
_Three.DataType_Impl_.IntType = 1013;
_Three.DataType_Impl_.UnsignedIntType = 1014;
_Three.DataType_Impl_.FloatType = 1015;
_Three.PixelType_Impl_.UnsignedShort4444Type = 1016;
_Three.PixelType_Impl_.UnsignedShort5551Type = 1017;
_Three.PixelType_Impl_.UnsignedShort565Type = 1018;
_Three.PixelFormat_Impl_.AlphaFormat = 1019;
_Three.PixelFormat_Impl_.RGBFormat = 1020;
_Three.PixelFormat_Impl_.RGBAFormat = 1021;
_Three.PixelFormat_Impl_.LuminanceFormat = 1022;
_Three.PixelFormat_Impl_.LuminanceAlphaFormat = 1023;
_Three.TextureFormat_Impl_.RGB_S3TC_DXT1_Format = 2001;
_Three.TextureFormat_Impl_.RGBA_S3TC_DXT1_Format = 2002;
_Three.TextureFormat_Impl_.RGBA_S3TC_DXT3_Format = 2003;
_Three.TextureFormat_Impl_.RGBA_S3TC_DXT5_Format = 2004;
_Three.LineType_Impl_.LineStrip = 0;
_Three.LineType_Impl_.LinePieces = 1;
Three.CullFaceNone = 0;
Three.CullFaceBack = 1;
Three.CullFaceFront = 2;
Three.CullFaceFrontBack = 3;
Three.FrontFaceDirectionCW = 0;
Three.FrontFaceDirectionCCW = 1;
Three.BasicShadowMap = 0;
Three.PCFShadowMap = 1;
Three.PCFSoftShadowMap = 2;
Three.FrontSide = 0;
Three.BackSide = 1;
Three.DoubleSide = 2;
Three.NoShading = 0;
Three.FlatShading = 1;
Three.SmoothShading = 2;
Three.NoColors = 0;
Three.FaceColors = 1;
Three.VertexColors = 2;
Three.NoBlending = 0;
Three.NormalBlending = 1;
Three.AdditiveBlending = 2;
Three.SubtractiveBlending = 3;
Three.MultiplyBlending = 4;
Three.CustomBlending = 5;
Three.AddEquation = 100;
Three.SubtractEquation = 101;
Three.ReverseSubtractEquation = 102;
Three.ZeroFactor = 200;
Three.OneFactor = 201;
Three.SrcColorFactor = 202;
Three.OneMinusSrcColorFactor = 203;
Three.SrcAlphaFactor = 204;
Three.OneMinusSrcAlphaFactor = 205;
Three.DstAlphaFactor = 206;
Three.OneMinusDstAlphaFactor = 207;
Three.MultiplyOperation = 0;
Three.MixOperation = 1;
Three.AddOperation = 2;
Three.RepeatWrapping = 1000;
Three.ClampToEdgeWrapping = 1001;
Three.MirroredRepeatWrapping = 1002;
Three.NearestFilter = 1003;
Three.NearestMipMapNearestFilter = 1004;
Three.NearestMipMapLinearFilter = 1005;
Three.LinearFilter = 1006;
Three.LinearMipMapNearestFilter = 1007;
Three.LinearMipMapLinearFilter = 1008;
Three.UnsignedByteType = 1009;
Three.ByteType = 1010;
Three.ShortType = 1011;
Three.UnsignedShortType = 1012;
Three.IntType = 1013;
Three.UnsignedIntType = 1014;
Three.FloatType = 1015;
Three.UnsignedShort4444Type = 1016;
Three.UnsignedShort5551Type = 1017;
Three.UnsignedShort565Type = 1018;
Three.AlphaFormat = 1019;
Three.RGBFormat = 1020;
Three.RGBAFormat = 1021;
Three.LuminanceFormat = 1022;
Three.LuminanceAlphaFormat = 1023;
Three.RGB_S3TC_DXT1_Format = 2001;
Three.RGBA_S3TC_DXT1_Format = 2002;
Three.RGBA_S3TC_DXT3_Format = 2003;
Three.RGBA_S3TC_DXT5_Format = 2004;
Three.LineStrip = 0;
Three.LinePieces = 1;
common.Config.canvasOffsetY = 0;
common.Config.globalVol = 1.0;
common.Config.particleSize = 3000;
common.Config.bgLight = 0.5;
common.Dat.UP = 38;
common.Dat.DOWN = 40;
common.Dat.LEFT = 37;
common.Dat.RIGHT = 39;
common.Dat.K1 = 49;
common.Dat.K2 = 50;
common.Dat.K3 = 51;
common.Dat.K4 = 52;
common.Dat.K5 = 53;
common.Dat.K6 = 54;
common.Dat.K7 = 55;
common.Dat.K8 = 56;
common.Dat.K9 = 57;
common.Dat.K0 = 58;
common.Dat.A = 65;
common.Dat.B = 66;
common.Dat.C = 67;
common.Dat.D = 68;
common.Dat.E = 69;
common.Dat.F = 70;
common.Dat.G = 71;
common.Dat.H = 72;
common.Dat.I = 73;
common.Dat.J = 74;
common.Dat.K = 75;
common.Dat.L = 76;
common.Dat.M = 77;
common.Dat.N = 78;
common.Dat.O = 79;
common.Dat.P = 80;
common.Dat.Q = 81;
common.Dat.R = 82;
common.Dat.S = 83;
common.Dat.T = 84;
common.Dat.U = 85;
common.Dat.V = 86;
common.Dat.W = 87;
common.Dat.X = 88;
common.Dat.Y = 89;
common.Dat.Z = 90;
common.Dat.hoge = 0;
common.Dat.bg = false;
common.Dat._showing = true;
common.Key.keydown = "keydown";
common.Path.assets = "../../assets/";
common.QueryGetter.NORMAL = 0;
common.QueryGetter.SKIP = 1;
common.QueryGetter._isInit = false;
common.QueryGetter.t = 0;
common.StageRef.$name = "webgl";
effect.PostProcessing2.MODE_NORMAL = "MODE_NORMAL";
effect.PostProcessing2.MODE_DISPLACEMENT_A = "MODE_DISPLACEMENT_A";
effect.PostProcessing2.MODE_DISPLACEMENT_B = "MODE_DISPLACEMENT_B";
effect.PostProcessing2.MODE_COLOR = "MODE_COLOR";
emoji.Emoji.NUM = 700;
fbo.RenderShaderMat.animationFrameLength = 32;
fbo.shaders.CurlNoise.glsl = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t";
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
Main.main();
})();
