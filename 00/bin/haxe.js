(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Bure = function() {
	this.amp = 20;
	this.look = new THREE.Vector3();
	this.lookTgt = new THREE.Vector3();
	this.cam = new THREE.Vector3();
	this.camTgt = new THREE.Vector3();
};
Bure.prototype = {
	update: function() {
		if(Math.random() < 0.04) {
			this.lookTgt.x = this.amp / 2 * (Math.random() - 0.5);
			this.lookTgt.y = this.amp / 2 * (Math.random() - 0.5);
			this.lookTgt.z = this.amp * (Math.random() - 0.5);
		}
		if(Math.random() < 0.05) {
			this.camTgt.x = this.amp / 2 * (Math.random() - 0.5);
			this.camTgt.y = this.amp / 2 * (Math.random() - 0.5);
			this.camTgt.z = this.amp * (Math.random() - 0.5);
		}
		this.look.x += (this.lookTgt.x - this.look.x) / 22;
		this.look.y += (this.lookTgt.y - this.look.y) / 22;
		this.look.z += (this.lookTgt.z - this.look.z) / 22;
		this.cam.x += (this.camTgt.x - this.cam.x) / 24;
		this.cam.y += (this.camTgt.y - this.cam.y) / 24;
		this.cam.z += (this.camTgt.z - this.cam.z) / 24;
	}
};
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
	Main._main = new Main3d();
	Main._main.init();
};
var Main3d = function() {
};
Main3d.prototype = {
	init: function() {
		this.renderer = new THREE.WebGLRenderer({ antialias : true, devicePixelRatio : 1});
		this.renderer.domElement.id = "webgl";
		window.document.body.appendChild(this.renderer.domElement);
		common.Dat.init($bind(this,this._onInit));
	}
	,_onInit: function() {
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this._onAudio));
	}
	,_onAudio: function() {
		common.TimeCounter.start();
		Main3d.W = common.StageRef.get_stageWidth();
		Main3d.H = common.StageRef.get_stageHeight();
		this.scene = new THREE.Scene();
		this.camera = new camera.ExCamera(45,Main3d.W / Main3d.H,10,5000);
		this.camera.near = 5;
		this.camera.far = 40000;
		var d = new THREE.DirectionalLight(16777215,1);
		this.scene.add(d);
		d.position.set(0,500,20);
		this.renderer.setSize(Main3d.W,Main3d.H);
		this.camera.init(this.renderer.domElement);
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
		this.camera.amp = 300;
		this.camera.radX = 0;
		this.camera.radY = 0;
		this.dae = new objects.MyDAELoader();
		this.dae.load($bind(this,this._onLoadDAE));
		common.Dat.gui.add(this.camera,"amp").listen();
	}
	,_onLoadDAE: function() {
		this._maeFaces = new faces.MaeFaces();
		this._maeFaces.init(this);
		this.scene.add(this._maeFaces);
		common.StageRef.setCenter();
		this._run();
	}
	,_onResize: function(e) {
		Main3d.W = common.StageRef.get_stageWidth();
		Main3d.H = common.StageRef.get_stageHeight();
		this.renderer.domElement.width = Main3d.W;
		this.renderer.domElement.height = Main3d.H;
		this.renderer.setSize(Main3d.W,Main3d.H);
		this.camera.aspect = Main3d.W / Main3d.H;
		this.camera.updateProjectionMatrix();
	}
	,_run: function() {
		if(this._audio != null) this._audio.update();
		if(this._maeFaces != null && this._audio != null) this._maeFaces.update(this._audio);
		this.camera.update();
		this.camera.lookAt(new THREE.Vector3());
		this.renderer.render(this.scene,this.camera);
		window.requestAnimationFrame($bind(this,this._run));
	}
};
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
var camera = {};
camera.ExCamera = function(fov,aspect,near,far) {
	this.tgtOffsetY = 0;
	this.isActive = false;
	this.radY = 0;
	this.radX = Math.PI / 5;
	this.amp = 900.0;
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
		this.amp += e.detail * 0.1;
		if(this.amp > 118000) this.amp = 118000;
		if(this.amp < 100) this.amp = 100;
	}
	,onMouseWheel: function(e) {
		this.amp += e.wheelDelta * 0.1;
		if(this.amp > 118000) this.amp = 118000;
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
		this._width = common.StageRef.get_stageWidth();
		this._height = common.StageRef.get_stageHeight();
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
	,_updatePosition: function(spd) {
		if(spd == null) spd = 1;
		var amp1 = this.amp * Math.cos(this.radY);
		var x = this.target.x + amp1 * Math.sin(this.radX);
		var y = this.target.y + this.amp * Math.sin(this.radY);
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
		common.Config.canvasOffsetY = data.canvasOffsetY;
		common.Config.globalVol = data.globalVol;
		common.Config.particleSize = data.particleSize;
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
	common.Dat.gui.domElement.style.zIndex = 999999;
	common.Key.init();
	common.Key.board.addEventListener("keydown",common.Dat._onKeyDown);
	common.Dat.show();
	if(common.Dat._callback != null) common.Dat._callback();
};
common.Dat._onKeyDown = function(e) {
	var _g = Std.parseInt(e.keyCode);
	switch(_g) {
	case 65:
		break;
	case 68:
		if(common.Dat.gui.domElement.style.display == "block") common.Dat.hide(); else common.Dat.show();
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
	common.Dat._goURL("../../01/bin/");
};
common.Dat._goURL2 = function() {
	common.Dat._goURL("../../02/bin/");
};
common.Dat._goURL3 = function() {
	common.Dat._goURL("../../03/bin/");
};
common.Dat._goURL4 = function() {
	common.Dat._goURL("../../04/bin/");
};
common.Dat._goURL5 = function() {
	common.Dat._goURL("../../05/bin/");
};
common.Dat._goURL6 = function() {
	common.Dat._goURL("../../06/bin/");
};
common.Dat._goURL = function(url) {
	window.location.href = url;
};
common.Dat.show = function() {
	common.Dat.gui.domElement.style.display = "block";
};
common.Dat.hide = function() {
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
		console.debug("_onkeydown " + n);
		this._dispatch(n);
	}
	,_dispatch: function(n) {
		if(!common.Dat.bg) this._socket.send(n);
		this.dispatchEvent({ type : "keydown", keyCode : n});
	}
});
common.StageRef = function() {
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
	if(!common.Dat.bg) {
		var dom = window.document.getElementById("webgl");
		var yy = window.innerHeight / 2 - common.StageRef.get_stageHeight() / 2 + common.Config.canvasOffsetY;
		dom.style.position = "absolute";
		dom.style.top = Math.round(yy) + "px";
	}
};
common.StageRef.get_stageWidth = function() {
	return window.innerWidth;
};
common.StageRef.get_stageHeight = function() {
	if(common.Dat.bg) return window.innerHeight;
	return Math.floor(window.innerWidth * 576 / 1920);
};
common.StringUtils = function() {
};
common.StringUtils.addCommma = function(n) {
	var s;
	if(n == null) s = "null"; else s = "" + n;
	var out = "";
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		out += HxOverrides.substr(s,i,1);
		var keta = s.length - 1 - i;
		if(keta % 3 == 0 && keta != 0) out += ",";
	}
	return out;
};
common.StringUtils.addCommaStr = function(s) {
	if(s.length <= 3) return s;
	var out = "";
	var lastIndex = s.length - 1;
	var last = "";
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var j = lastIndex - i;
		var last1 = HxOverrides.substr(s,j,1);
		if(i % 3 == 0 && i != 0) out = last1 + "," + out; else out = last1 + out;
	}
	return out;
};
common.StringUtils.addZero = function(val,keta) {
	var valStr = "" + val;
	var sa = keta - valStr.length;
	while(sa-- > 0) valStr = "0" + valStr;
	return valStr;
};
common.StringUtils.getDecimal = function(t,keta) {
	var n = Math.pow(10,keta - 1);
	n = Math.floor(t * n) / n;
	var str = "" + n;
	if(str.length == 1) str = str + ".";
	while(true) {
		if(str.length >= keta + 1) break;
		str = str + "0";
	}
	return str;
};
common.StringUtils.date2string = function(open_date) {
	if(open_date == null) return "UNDEFINED";
	var out = open_date.getFullYear() + "/" + common.StringUtils.addZero(open_date.getMonth() + 1,2) + "/" + common.StringUtils.addZero(open_date.getDate(),2);
	return out;
};
common.StringUtils.string2date = function(s) {
	var a = s.split("-");
	var date = new Date(Std.parseInt(a[0]),Std.parseInt(a[1]) - 1,Std.parseInt(a[2]),12,0,0);
	return date;
};
common.TimeCounter = function() {
};
common.TimeCounter.start = function() {
	if(common.TimeCounter._isStart) return;
	common.TimeCounter._isStart = true;
	common.TimeCounter._time = new Date();
};
common.TimeCounter.getTime = function() {
	var now = new Date();
	var time = Math.floor(now.getTime() - common.TimeCounter._time.getTime());
	var out = "";
	var msec = time % 1000;
	msec = Math.floor(msec / 100);
	var sec = Math.floor(time / 1000);
	var secOut = sec % 60;
	var min = Math.floor(sec / 60);
	var out1 = "00:" + common.StringUtils.addZero(min,2) + ":" + common.StringUtils.addZero(secOut,2);
	return out1;
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
common.WebfontLoader = function() {
};
common.WebfontLoader.load = function(fontNames,callback) {
	common.WebfontLoader._callback = callback;
	if(common.WebfontLoader._loading) {
	} else if(common.WebfontLoader._complete) common.WebfontLoader._callback();
	if(WebFont == null) {
		console.log("inactive webfont");
		if(common.WebfontLoader._callback != null) common.WebfontLoader._callback();
	} else {
		if(common.WebfontLoader._loading) return;
		common.WebfontLoader._loading = true;
		WebFont.load({ google : { families : fontNames}, loading : function() {
			console.log("loading webfont...");
		}, active : function() {
			common.WebfontLoader._loading = false;
			common.WebfontLoader._complete = true;
			if(common.WebfontLoader._callback != null) common.WebfontLoader._callback();
		}, inactive : function() {
			console.log("inactive webfont");
			if(common.WebfontLoader._callback != null) common.WebfontLoader._callback();
		}});
	}
};
var effect = {};
effect.PostProcessing2 = function() {
	this._rad = 0;
};
effect.PostProcessing2.prototype = {
	init: function(scene,camera,renderer,callback) {
		this._callback = callback;
		this._scene = scene;
		this._camera = camera;
		this._renderer = renderer;
		this._renderPass = new THREE.RenderPass(scene,camera);
		this._copyPass = new THREE.ShaderPass(effect.shaders.CopyShader.getObject());
		this._composer = new THREE.EffectComposer(renderer);
		this._composer.addPass(this._renderPass);
		this.tilt = new THREE.ShaderPass(effect.shaders.MyTiltShiftShader.getObject());
		this.vig = new THREE.ShaderPass(effect.shaders.VignetteShader.getObject());
		this._texture1 = THREE.ImageUtils.loadTexture("displace2.png");
		this.color = new THREE.ShaderPass(effect.shaders.DisplaceShader.getObject(this._texture1));
		this._composer.addPass(this.color);
		this._composer.addPass(this.tilt);
		this._composer.addPass(this.vig);
		this._composer.addPass(this._copyPass);
		this._copyPass.clear = true;
		this._copyPass.renderToScreen = true;
		if(this._callback != null) this._callback();
	}
	,setting: function() {
	}
	,render: function() {
		this.color.uniforms.texture.value = this._texture1;
		this.color.uniforms.counter.value += 0.01;
		this._composer.render();
	}
	,update: function(audio) {
	}
};
effect.shaders = {};
effect.shaders.CopyShader = function() {
};
effect.shaders.CopyShader.getObject = function() {
	var obj = { uniforms : { tDiffuse : { type : "t", value : null}, opacity : { type : "f", value : 1.0}}, vertexShader : "varying vec2 vUv;\r\n\r\n\t\t\t\tvoid main() {\r\n\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\r\n\t\t\t\t}", fragmentShader : "uniform float opacity;\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\tgl_FragColor = opacity * texel;\r\n\t\t\t\t}"};
	return obj;
};
effect.shaders.Dhiza = function() {
};
effect.shaders.Dhiza.getObject = function() {
	return { uniforms : { tDiffuse : { type : "t", value : null}, vScreenSize : { type : "v2", value : new THREE.Vector2(common.StageRef.get_stageWidth(),common.StageRef.get_stageHeight())}}, vertexShader : "varying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "\r\n#define R_LUMINANCE 0.298912\r\n#define G_LUMINANCE 0.586611\r\n#define B_LUMINANCE 0.114478\r\n\r\nvarying vec2 vUv;\r\nuniform sampler2D tDiffuse;\r\nuniform vec2 vScreenSize;\r\n\r\nvoid main() {\r\n\r\n\tvec4 color = texture2D(tDiffuse, vUv);\r\n\r\n\tfloat x = floor( vUv.x * vScreenSize.x  );\r\n\tfloat y = floor( vUv.y * vScreenSize.y );\r\n\r\n\t// 4ピクセルごとに使用する閾値の表\r\n\tmat4 m = mat4(\r\n\t\t    vec4( 0.0,  8.0,    2.0,    10.0),\r\n\t\t    vec4( 12.0, 4.0,    14.0,   6.0),\r\n\t\t    vec4( 3.0,  11.0,   1.0,    9.0),\r\n\t\t    vec4( 15.0, 7.0,    13.0,   5.0)\r\n\t\t);\r\n\r\n\tfloat xi = mod( x,4.0) ;\r\n\tfloat yi = mod( y,4.0) ;\r\n\r\n\tfloat threshold = 0.0;\r\n\r\n\tif( xi == 0.0 )\r\n\t{\r\n\t    if( yi == 0.0 ) { threshold = m[0][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[0][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[0][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[0][3]; }\r\n\t}\r\n\tif( xi == 1.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[1][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[1][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[1][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[1][3]; }\r\n\t}\r\n\tif( xi == 2.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[2][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[2][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[2][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[2][3]; }\r\n\t}\r\n\tif( xi == 3.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[3][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[3][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[3][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[3][3]; }\r\n\t}\r\n\r\n\tcolor = color * 16.0;\r\n\r\n\tfloat v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;\r\n\r\n\tif (v <threshold ) {\r\n\t    color.x = 0.0;\r\n\t    color.y = 0.0;\r\n\t    color.z = 0.0;\r\n\t} else {\r\n\t    color.x = 1.0;\r\n\t    color.y = 1.0;\r\n\t    color.z = 1.0;\r\n\t}\r\n     // 描画\r\n     gl_FragColor = color;\r\n\r\n}"};
};
effect.shaders.DisplaceShader = function() {
};
effect.shaders.DisplaceShader.getObject = function(tt) {
	tt.minFilter = 1003;
	tt.magFilter = 1003;
	tt.needsUpdate = true;
	return { uniforms : { tDiffuse : { type : "t", value : null}, texture : { type : "t", value : tt}, counter : { type : "f", value : 0}}, vertexShader : "\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t\t}\t\t\t\t\r\n\t\t\t\t", fragmentShader : "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D texture;\r\n\t\t\t\t\tuniform float counter;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tvec4 col = texture2D( texture, vUv);\r\n\t\t\t\t\t\tvec2 axis = vec2( \r\n\t\t\t\t\t\t\tvUv.x + col.x*0.1, vUv.y + col.y*0.1\r\n\t\t\t\t\t\t);\r\n\t\t\t\t\t\tvec4 texel = texture2D( tDiffuse, axis );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.5+0.5*v);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t\t}\r\n\t\t\t\t"};
};
effect.shaders.LuminosityShader = function() {
};
effect.shaders.LuminosityShader.getObject = function(tt) {
	tt.minFilter = 1003;
	tt.magFilter = 1003;
	tt.needsUpdate = true;
	return { uniforms : { tDiffuse : { type : "t", value : null}, texture : { type : "t", value : tt}, counter : { type : "f", value : 0}}, vertexShader : "\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t\t}\t\t\t\t\r\n\t\t\t\t", fragmentShader : "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D texture;\r\n\t\t\t\t\tuniform float counter;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\r\n\t\t\t\t\t\tfloat v = dot( texel.xyz, luma );\r\n\t\t\t\t\t\tv = v + counter;\r\n\t\t\t\t\t\tvec2 axis = vec2( 0.5,fract(v) );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 pa = texture2D( tDiffuse, vUv);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tvec4 pb = texture2D( texture, axis);\r\n\t\t\t\t\t\t//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.5+0.5*v);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = vec4( pb.x,pb.y,pb.z, 1.0 );\r\n\t\t\t\t\t}\r\n\t\t\t\t"};
};
effect.shaders.MyTiltShiftShader = function() {
};
effect.shaders.MyTiltShiftShader.getObject = function() {
	return { uniforms : { tDiffuse : { type : "t", value : null}, v : { type : "f", value : 0.005859375}, r : { type : "f", value : 0.5}, k : { type : "fv1", value : [1.0,4.0,6.0,4.0,1.0,4.0,16.0,24.0,16.0,4.0,6.0,24.0,36.0,24.0,6.0,4.0,16.0,24.0,16.0,4.0,1.0,4.0,6.0,4.0,1.0]}}, vertexShader : "\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\tuniform float v;\r\n\t\t\t\tuniform float r;\r\n\t\t\t\tuniform float k[25];\r\n\t\t\t\tvarying vec2 vUv;\r\n\r\n\t\t\t\tvoid main() {\r\n\r\n\t\t\t\t\tvec4 sum = vec4( 0.0 );\r\n\t\t\t\t\tfloat vv = v * abs( r - vUv.y );\r\n\t\t\t\t\t\r\n\t\t\t\t\tfor(float i=-2.0;i<=2.0;i++){\r\n\t\t\t\t\t\tfor(float j = -2.0; j <=2.0; j++) {\r\n\t\t\t\t\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + i * vv, vUv.y + j * vv ) ) / 25.0;\r\n\t\t\t\t\t\t\t//idx += 1;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = sum;\r\n\r\n\t\t\t\t}"};
};
effect.shaders.VignetteShader = function() {
};
effect.shaders.VignetteShader.getObject = function() {
	return { uniforms : { tDiffuse : { type : "t", value : null}, offset : { type : "f", value : 1.0}, darkness : { type : "f", value : 1.2}}, vertexShader : "varying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "uniform float offset;\r\n\t\t\t\tuniform float darkness;\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\tvec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );\r\n\t\t\t\t\tgl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );\r\n\t\t\t\t}"};
};
var faces = {};
faces.MaeBg = function() {
	this._fragment = "\r\n\r\nuniform vec3 col;\r\nvoid main()\r\n{\r\n  // テクスチャの色情報をそのままピクセルに塗る\r\n\tgl_FragColor = vec4(col,1.0);\r\n}\r\n\t\r\n";
	this._vertex = "\r\nvoid main()\r\n{\r\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    \r\n  gl_Position = projectionMatrix * mvPosition;\r\n}";
	if(faces.MaeBg._geo == null) {
		var w = 14.5;
		faces.MaeBg._geo = new THREE.Geometry();
		faces.MaeBg._geo.vertices.push(new THREE.Vector3(-w,-w,0));
		faces.MaeBg._geo.vertices.push(new THREE.Vector3(-w,w,0));
		faces.MaeBg._geo.vertices.push(new THREE.Vector3(w,w,0));
		faces.MaeBg._geo.vertices.push(new THREE.Vector3(w,-w,0));
	}
	this._mat = new THREE.PointsMaterial({ color : 16777215, size : 2});
	THREE.Points.call(this,faces.MaeBg._geo,this._mat);
};
faces.MaeBg.__super__ = THREE.Points;
faces.MaeBg.prototype = $extend(THREE.Points.prototype,{
	flash: function() {
		console.log("flash");
	}
	,_onUpdate: function() {
		this._mat.color.setRGB(this._light,this._light,this._light);
	}
});
faces.MaeFace = function() {
	this.enabled = true;
	this._lifeRatio = 0;
	this._life = 0;
	THREE.Object3D.call(this);
	this.randomIndex = [];
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		this.randomIndex.push(Math.floor(Math.random() * 20));
	}
	this._face = new faces.MaeFaceMesh();
	this.add(this._face);
	this._gauge = new faces.MaeGauge(30,2);
	this._gauge.init(this.randomIndex);
	this._gauge.position.x = 0;
	this._gauge.position.y = -16.5;
	this.add(this._gauge);
	this._plate = new faces.MaePlate();
	this._plate.init();
	this._plate.position.x = 0;
	this._plate.position.y = 17;
	this._plate.position.z = -1;
	this.add(this._plate);
	this._bg = new faces.MaeBg();
	this._bg.position.z = 0;
	this.add(this._bg);
	this._line = new faces.lines.MaeFaceLine();
};
faces.MaeFace.__super__ = THREE.Object3D;
faces.MaeFace.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
	}
	,addForce: function(idx,f) {
		if(!this.enabled) {
			this._bg.flash();
			this._life = 0;
			this.enabled = true;
			this._face.addForce(idx,f);
		}
	}
	,setRotMode: function(mode) {
		this._face.setRotMode(mode);
	}
	,setMaterial: function(type) {
		switch(type) {
		case 0:
			this._face.setWireframe(false);
			this._face.setColor(false);
			break;
		case 1:
			this._face.setWireframe(false);
			this._face.setColor(true);
			break;
		case 2:
			this._face.setWireframe(true);
			this._face.setColor(false);
			break;
		case 3:
			this._face.setWireframe(true);
			this._face.setColor(true);
			break;
		}
	}
	,updatePlate: function() {
		this._plate.updateText();
	}
	,addLineVertex: function(v1,v2) {
		this._line.addVertex(v1,v2);
	}
	,connectLine: function(idx,v1,col) {
		var p1 = this.position;
		if(idx == 0) this._line.lines[0].update2(v1,p1.x - 15,p1.y - 17.5,p1.z,col);
		if(idx == 1) this._line.lines[1].update2(v1,p1.x - 15,p1.y - 16.5,p1.z,col);
		if(idx == 2) this._line.lines[2].update2(v1,p1.x - 15,p1.y - 15.5,p1.z,col);
	}
	,_calcLifeRatio: function() {
		var nn = this._life / 20;
		if(nn > 1) nn = 1;
		this._lifeRatio = 1 - nn;
	}
	,update: function(audio) {
		if(this._life++ > 15) this.enabled = false; else this.enabled = true;
		this._calcLifeRatio();
		this._face.update(audio,this._lifeRatio);
		this._gauge.update(audio,this._lifeRatio);
	}
	,updateGauge: function(idx,ff) {
		this._gauge.setGauge(idx,ff);
	}
});
faces.MaeFaceMesh = function() {
	this._speedRotX = -0.02;
	this._vz = 0;
	this._vy = 0;
	this._vx = 0;
	this._rotMode = 0;
	this._geometry = objects.MyDAELoader.geometry;
	this._material = new faces.MaeShaderMaterial();
	THREE.Mesh.call(this,this._geometry,this._material);
	this._d = new THREE.Vector3(Math.random() < 0.5?1:-1,Math.random() < 0.5?1:-1,Math.random() < 0.5?1:-1);
	this.scale.set(10,10,10);
};
faces.MaeFaceMesh.getRandomRot = function() {
	return Math.floor(Math.random() * 4);
};
faces.MaeFaceMesh.__super__ = THREE.Mesh;
faces.MaeFaceMesh.prototype = $extend(THREE.Mesh.prototype,{
	setColor: function(b) {
		this._material.setColor(b);
	}
	,setWireframe: function(b) {
		this._material.setWireframe(b);
	}
	,setRotMode: function(n) {
		this._rotMode = n;
		this.rotation.set(0,0,0);
		this._vx = 0;
		this._vy = 0;
		this._vz = 0;
	}
	,addForce: function(idx,f) {
		if(idx == 0) this._vx += f * 0.5 * this._d.x;
		if(idx == 1) this._vy += f * 0.5 * this._d.y;
		if(idx == 2) this._vz += f * 0.5 * this._d.z;
	}
	,update: function(audio,lifeRatio) {
		this._material.update(audio,lifeRatio);
		if(lifeRatio == 0) {
			this.scale.x += (7 - this.scale.x) / 4;
			this.scale.y += (7 - this.scale.y) / 4;
			this.scale.z += (7 - this.scale.z) / 4;
			this.rotation.x += (0 - this.rotation.x) / 4;
			this.rotation.y += (0 - this.rotation.y) / 4;
			this.rotation.z += (0 - this.rotation.z) / 4;
		} else {
			this.scale.x += (10 - this.scale.x) / 4;
			this.scale.y += (10 - this.scale.y) / 4;
			this.scale.z += (10 - this.scale.z) / 4;
		}
		var _g = this._rotMode;
		switch(_g) {
		case 0:
			this.rotation.y += this._speedRotX;
			break;
		case 1:
			this.rotation.y += this._vy;
			this._vy *= 0.96;
			break;
		case 2:
			this.rotation.x += this._vx * 1.2;
			this.rotation.y += this._vy;
			this.rotation.z += this._vz;
			break;
		case 3:
			this.rotation.x += this._vx * 0.1;
			this.rotation.y += this._vx;
			this.rotation.z += this._vx * 0.1;
			break;
		}
		this._vx *= 0.96;
		this._vy *= 0.96;
		this._vz *= 0.96;
	}
});
faces.MaeFaces = function() {
	this._faces = [];
	this._offsetY = 0;
	this._currentForm = 0;
	THREE.Object3D.call(this);
};
faces.MaeFaces.__super__ = THREE.Object3D;
faces.MaeFaces.prototype = $extend(THREE.Object3D.prototype,{
	init: function(main3d) {
		console.log("init");
		this._main = main3d;
		this._faces = [];
		var ww = 20;
		var hh = 3;
		var _g = 0;
		while(_g < 150) {
			var i = _g++;
			var xx = i % ww - (ww - 1) / 2;
			var yy = Math.floor(i / ww) - (hh - 1) / 2;
			var ff = new faces.MaeFace();
			ff.enabled = true;
			ff.position.x = xx * 50;
			ff.position.y = yy * 50;
			ff.position.z = 0;
			this._faces.push(ff);
			this.add(ff);
		}
		this._lines = new faces.MaeLines();
		this._lines.init(this._faces);
		this.add(this._lines);
		this._formation = new faces.data.MaeFormation();
		this._formation.init(this._main,this._lines);
		this._formation.setFormation(0,this._faces);
		common.Key.board.addEventListener("keydown",$bind(this,this._keyDownFunc));
	}
	,_keyDownFunc: function(e) {
		console.log("_keyDownFunc ");
		var _g = Std.parseInt(e.keyCode);
		switch(_g) {
		case 39:
			this._currentForm++;
			this._formation.setFormation(this._currentForm,this._faces);
			break;
		case 37:
			this._currentForm--;
			if(this._currentForm < 0) this._currentForm = 3;
			this._formation.setFormation(this._currentForm,this._faces);
			break;
		case 38:
			this._setMaterial();
			break;
		}
	}
	,_setMaterial: function() {
		var type = Math.floor(Math.random() * 4);
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].setMaterial(type);
		}
	}
	,update: function(audio) {
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].update(audio);
		}
		this._formation.update();
		this._lines.update(audio);
	}
});
faces.MaeGauge = function(ww,hh) {
	this._fragment = "\r\n\t\t\tuniform vec2 resolution;\r\n\t\t\tuniform float time;\r\n\t\t\tuniform float freqs[5];\r\n\t\t\tvarying vec2 vUv; \r\n\t\t\t\r\n\t\t\tvec4 getColor(float xx, float freq) {\r\n\t\t\t\tvec4 black = vec4(0.3, 0.3, 0.3, 1.0);\r\n\t\t\t\tvec4 red = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t\t\r\n\t\t\t\tif (xx > freq ) {\r\n\t\t\t\t\treturn black;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\treturn red;\r\n\t\t\t\t\t\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tvoid main()\t{\r\n\t\t\t\t\r\n\t\t\t\tif (vUv.y < 0.2) {\r\n\t\t\t\r\n\t\t\t\t\tgl_FragColor = getColor( vUv.x, freqs[0] );\r\n\t\t\t\t\t\r\n\t\t\t\t}else if (0.4<vUv.y && vUv.y<0.6) {\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = getColor( vUv.x, freqs[1] );\r\n\t\t\t\t\t\r\n\t\t\t\t}else if (0.8<vUv.y && vUv.y<1.0) {\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = getColor( vUv.x, freqs[2] );\r\n\t\t\t\t\t\r\n\t\t\t\t}/*else if (0.6<vUv.y && vUv.y<0.7) {\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = getColor( vUv.x, freqs[3] );\r\n\t\t\t\t\t\r\n\t\t\t\t}else if (0.8<vUv.y && vUv.y<0.9) {\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = getColor( vUv.x, freqs[4] );\r\n\t\t\t\t}*/\r\n\t\t\t\t\r\n\t\t\t}\t\r\n\t";
	this._vertex = "\r\n\t\r\n\t\t\tvarying vec2 vUv;\r\n\t\r\n\t\t\tvoid main()\t{\r\n\t\t\t\tvUv = uv;\r\n\t\t\t\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    \r\n\t\t\t\t// 変換：カメラ座標 → 画面座標\r\n\t\t\t\tgl_Position = projectionMatrix * mvPosition;\r\n\t\t\t\t\r\n\t\t\t}\t\r\n\t";
	this._geometry = new THREE.PlaneBufferGeometry(ww,hh,1,2);
	this._material = new THREE.ShaderMaterial({ uniforms : { time : { type : "f", value : 1.0}, resolution : { type : "v2", value : new THREE.Vector2(512,512)}, freqs : { type : "fv1", value : [1,2,3,4,5]}}, vertexShader : this._vertex, fragmentShader : this._fragment});
	this._material.shading = 2;
	this._material.transparent = true;
	this._material.side = 2;
	THREE.Mesh.call(this,this._geometry,this._material);
};
faces.MaeGauge.__super__ = THREE.Mesh;
faces.MaeGauge.prototype = $extend(THREE.Mesh.prototype,{
	init: function(randomIdx) {
		this._randomIndex = randomIdx;
	}
	,update: function(audio,lifeRatio) {
		this._material.uniforms.time.value += 0.01;
		this._material.uniforms.resolution.value.x = 512;
		this._material.uniforms.resolution.value.y = 512;
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			var ff = audio.freqByteDataAry[this._randomIndex[i]] / 255;
			this._material.uniforms.freqs.value[i] += (ff - this._material.uniforms.freqs.value[i]) / 2;
		}
	}
	,setGauge: function(idx,ff) {
		this._material.uniforms.freqs.value[idx] = ff;
	}
});
faces.MaeLines = function() {
	this.startY = -150;
	this._lineIdx = 0;
	THREE.Object3D.call(this);
};
faces.MaeLines.__super__ = THREE.Object3D;
faces.MaeLines.prototype = $extend(THREE.Object3D.prototype,{
	init: function(faces) {
		this._hMesh = new THREE.Mesh(new THREE.BoxGeometry(100,1,1),new THREE.MeshBasicMaterial({ color : 16777215}));
		var geo = new THREE.Geometry();
		this._faces = faces;
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			var f = this._faces[i];
			var _g2 = 0;
			while(_g2 < 5) {
				var j = _g2++;
				var v1 = new THREE.Vector3();
				var v2 = new THREE.Vector3();
				geo.vertices.push(v1);
				geo.vertices.push(v2);
				f.addLineVertex(v1,v2);
			}
		}
		this._line = new THREE.LineSegments(geo,new THREE.LineBasicMaterial({ color : 16777215, transparent : true, opacity : 0.5}));
		this.add(this._line);
	}
	,update: function(audio) {
		this._resetLine();
		this._line.geometry.verticesNeedUpdate = true;
		this._line.geometry.colorsNeedUpdate = true;
		var offY = this.startY;
		var scaleX = audio.freqByteData[5] / 255 * 2;
		if(scaleX < 0) scaleX = 0;
		this._hMesh.scale.x = scaleX;
		this._hMesh.position.z = -100;
		this._hMesh.position.y = offY;
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			var face = this._faces[i];
			var idx0 = face.randomIndex[0];
			var idx1 = face.randomIndex[1];
			var idx2 = face.randomIndex[2];
			var freq0 = audio.freqByteDataAry[idx0] / 255;
			var freq1 = audio.freqByteDataAry[idx1] / 255;
			var freq2 = audio.freqByteDataAry[idx2] / 255;
			var freqs = [freq0,freq1,freq2];
			var idxs_0 = idx0;
			var idxs_1 = idx1;
			var idxs_2 = idx2;
			var _g2 = 0;
			while(_g2 < 3) {
				var j = _g2++;
				if(freqs[j] > 0.2 && face.visible) {
					face.addForce(j,freqs[j]);
					face.connectLine(j,new THREE.Vector3(scaleX * 100 * (Math.random() - 0.5),offY,-100),1);
				} else {
				}
			}
		}
	}
	,_resetLine: function() {
		this._lineIdx = 0;
		var _g1 = 0;
		var _g = this._line.geometry.vertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._line.geometry.vertices[i].set(0,0,0);
		}
	}
	,_connectLine: function(ss,ee,col) {
		var ox = -15;
		var oy = -18;
		this._line.geometry.vertices[this._lineIdx].set(ss.x + ox,ss.y + oy,ss.z);
		this._line.geometry.vertices[this._lineIdx + 1].set(ee.x,ee.y,ee.z);
		this._line.geometry.colors[this._lineIdx].setRGB(col,col,col);
		this._line.geometry.colors[this._lineIdx + 1].setRGB(col,col,col);
		this._lineIdx += 2;
	}
});
faces.MaePlate = function() {
	THREE.Object3D.call(this);
};
faces.MaePlate.__super__ = THREE.Object3D;
faces.MaePlate.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		common.TimeCounter.start();
		var ww = 3.8;
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		this._stage = this._createStage(canvas,512,64);
		this._material = this._getMaterial(canvas,true);
		this._plane = new THREE.Mesh(new THREE.PlaneGeometry(ww * 8,ww,1,1),this._material);
		this._plane.position.x = 0;
		this.add(this._plane);
		this._textCh = new objects.SpacingText("CH",objects.SpacingText.getFont(30,"700","Roboto Condensed"),0.5,"#ffffff");
		this._textCh.y = 0;
		this._textNo = new objects.SpacingText("0001",objects.SpacingText.getFont(50,"700","Roboto Condensed"),0.5,"#ffffff");
		this._stage.addChild(this._textNo);
		this._textNo.x = 0;
		this._textNo.y = 0;
		this._textTime = new objects.SpacingText("10:20:23",objects.SpacingText.getFont(50,"700","Roboto Condensed"),1,"#ffffff");
		this._textTime.x = 330;
		this._stage.addChild(this._textTime);
		this._stage.update();
		this._material.map.needsUpdate = true;
		this._material.transparent = true;
		this.updateText();
	}
	,updateText: function() {
		this._textNo.update("DE" + common.StringUtils.addZero(faces.MaePlate._index,4));
		this._textTime.update(common.TimeCounter.getTime());
		this._stage.update();
		this._material.map.needsUpdate = true;
		faces.MaePlate._index++;
	}
	,setColor: function(col) {
		this._material.color = new THREE.Color(col);
	}
	,_getMaterial: function(canvas,isAlphaTest) {
		if(isAlphaTest == null) isAlphaTest = false;
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		var mate = new THREE.MeshBasicMaterial({ map : texture, side : 0, transparent : true});
		if(isAlphaTest) mate.alphaTest = 0.5; else mate.shading = 2;
		return mate;
	}
	,_getFont: function(size,bold,text) {
		if(text == null) text = "Roboto Condensed";
		if(bold == null) bold = "400";
		return bold + " " + size + "px " + text;
	}
	,_addDisplayObject: function(stage,obj,xx,yy) {
		stage.addChild(obj);
		obj.x = xx;
		obj.y = yy;
	}
	,_createStage: function(canvas,ww,hh) {
		canvas.width = ww;
		canvas.height = hh;
		canvas.getContext("2d").imageSmoothingEnabled = true;
		return new createjs.Stage(canvas);
	}
	,_getStrMaterial: function(s,ww,hh) {
		if(hh == null) hh = 256;
		if(ww == null) ww = 512;
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		var stage = this._createStage(canvas,ww,hh);
		var text1 = new createjs.Text(s,this._getFont(60));
		text1.color = createjs.Graphics.getRGB(204,204,204);
		text1.x = 20;
		text1.y = 20;
		stage.addChild(text1);
		stage.update();
		return this._getMaterial(canvas);
	}
});
faces.MaeShaderMaterial = function() {
	this.vv = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t" + "\r\n\r\nconst float PI = 3.141592653;\r\n\t\r\nvarying vec2 vUv;\r\nvarying vec3 vPos;\r\nvarying vec3 vNormal;\r\nvarying vec4 vLight;\r\nvarying vec4 vAbs;\r\nvarying vec4 vVertex;\r\nuniform float _noise;\r\nuniform float _count;\r\nuniform float _freqByteData[32];\r\nuniform vec3 _lightPosition; //光源位置座標\r\nuniform float _strength;\r\n\r\nvoid main()\r\n{\r\n\tvUv = uv;\r\n\t//頂点法線ベクトルを視点座標系に変換する行列=normalMatrix\r\n\t//vNormal = (normal * normalMatrix);\r\n\t//vec4 fuga = projectionMatrix * vec4( normal * normalMatrix , 0.0);\r\n\tvNormal = normalMatrix * normal;\r\n\t\r\n\t//視点座標系における光線ベクトル\r\n\tvLight = (viewMatrix * vec4( _lightPosition, 0.0));\r\n\r\n\t\r\n\tvPos = (modelMatrix * vec4(position, 1.0 )).xyz;\r\n\t\r\n\t//vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\r\n\t//patams\r\n\t\r\n\tfloat nejireX\t\t= pow( _freqByteData[16] / 255.0, 1.5) * 15.0;\r\n\tfloat nejireY\t\t= pow(_freqByteData[18] / 255.0, 2.0) * PI * 2.0;// * 0.5;\r\n\tfloat noise \t\t= pow(_freqByteData[12] / 255.0, 1.0) * _noise;//1.5;\r\n\tfloat speed \t\t= pow(_freqByteData[8] / 255.0, 2.0) * 0.5;\r\n\tfloat sphere \t\t= pow(_freqByteData[4]/255.0, 2.0);\r\n\tfloat noiseSpeed \t= 0.1 + pow( _freqByteData[19] / 255.0, 4.0) * 0.25;\r\n\tfloat scale \t\t= 1.0 + pow(_freqByteData[1] / 255.0, 3.0) * 0.4;\t\t\t\t\r\n\tfloat yokoRatio \t= pow(_freqByteData[5] / 255.0, 2.0);\r\n\tfloat yokoSpeed \t= pow(_freqByteData[13] / 255.0, 2.0) * 4.0;\r\n\tfloat zengoRatio \t= pow(_freqByteData[19] / 255.0, 2.0);\t\t\r\n\tfloat tate\t\t\t= 1.0 + ( pow(_freqByteData[14] / 255.0, 2.0) * 1.0 - pow(_freqByteData[3] / 255.0, 2.0) * 1.0 );\r\n\t\r\n\tnejireX *= _strength;\r\n\tnejireY *= _strength;\r\n\tnoise *= _strength;\r\n\tspeed *= _strength;\r\n\tsphere *= _strength;\r\n\tnoiseSpeed *= _strength;\r\n\tscale *= _strength;\r\n\tyokoRatio *= _strength;\r\n\tyokoSpeed *= _strength;\r\n\tzengoRatio *= _strength;\r\n\ttate *= _strength;\r\n\t\r\n\t////////////////////\r\n\tvec3 vv = position;\r\n\t/*\r\n\t\tvar a:Float = Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);\r\n\t\tvar radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度\r\n\t\tvar radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度\t\r\n\t*/\t\r\n\tfloat a = length(vv);\r\n\tfloat radX = (-atan(vv.z, vv.x) + PI * 0.5) + vv.y * sin(_count) * nejireX;//横方向の角度\r\n\tfloat radY = asin(vv.y / a);\r\n\t\r\n\t/*\r\n\t\tvar amp:Float = (1-_sphere) * a + (_sphere) * 1;\r\n\t\tamp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;\r\n\t*/\r\n\r\n\t//float snoise(vec3 v) { \r\n\tfloat amp = (1.0 - sphere) * a + sphere * 1.0;\r\n\tvec3 snoisePos = vec3(vv.x, vv.y + _count * noiseSpeed, vv.z);\r\n\tamp += sin(_count * 0.7) * snoise(snoisePos) * noise;\r\n\t\r\n\t/*\r\n\t\tvar yoko:Float = Math.sin( 0.5*( vv.y * 2 * Math.PI ) + _count * _yokoSpeed ) * _yokoRatio;\r\n\t\tvar zengo:Float = Math.cos( 0.5*( vv.y * 2 * Math.PI ) + _count * 3 ) * 0.2 * _zengoRatio;\r\n\t\t\t\r\n\t\tvar tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY) + zengo;//横\r\n\t\tvar tgtY:Float = amp * Math.sin( radY );//縦\r\n\t\tvar tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横\t\r\n\t*/\r\n\r\n\tfloat yoko = sin( 0.5*( vv.y * 2.0 * PI ) + _count * yokoSpeed ) * yokoRatio;\r\n\tfloat zengo = cos( 0.5*( vv.y * 2.0 * PI ) + _count * 3.0 ) * 0.2 * zengoRatio;\t\r\n\t\r\n\tvec3 hoge = vec3(0.0);\r\n\t\thoge.x = amp * sin( radX ) * cos(radY) + zengo;//横\r\n\t\thoge.y = amp * sin( radY ) * tate;//縦\r\n\t\thoge.z = amp * cos( radX ) * cos(radY) + yoko;//横\t\r\n\t\t\r\n\t// 変換：ローカル座標 → 配置 → カメラ座標\r\n\tvec4 mvPosition = modelViewMatrix * vec4(hoge, 1.0);//vec4(vv, 1.0);    \r\n\t\r\n\t//vLight =  projectionMatrix * viewMatrix * vec4( _lightPosition, 0.0);\r\n\tvAbs = vec4(0.0);\r\n\tvAbs.x = hoge.x - position.x;\r\n\tvAbs.y = hoge.y - position.y;\r\n\tvAbs.z = hoge.z - position.z;\r\n\t\r\n\t\r\n\tvVertex = mvPosition;\r\n\t// 変換：カメラ座標 → 画面座標\r\n\tgl_Position = projectionMatrix * mvPosition;\r\n\t\r\n\t\r\n}\r\n\r\n\t";
	this.ff = "\r\n\t\t//uniform 変数としてテクスチャのデータを受け取る\r\n\t\tuniform sampler2D texture;\r\n\t\tuniform sampler2D colTexture;\r\n\t\tuniform vec3 _lightPosition; //光源位置座標\r\n\t\tuniform float _wireframe;\r\n\t\tuniform float _isColor;\r\n\t\tuniform float _brightness;\r\n\t\t\r\n\t\t// vertexShaderで処理されて渡されるテクスチャ座標\r\n\t\tvarying vec2 vUv;                                             \r\n\t\tvarying vec3 vNormal;\r\n\t\tvarying vec3 vPos;\r\n\t\tvarying vec4 vLight;\r\n\t\tvarying vec4 vAbs;\r\n\t\tvarying vec4 vVertex;\r\n\t\t\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t\tif ( _wireframe == 1.0 ) {\r\n\t\t\t\t\r\n\t\t\t\tgl_FragColor = vec4( _brightness, _brightness, _brightness, 1.0 );\r\n\t\t\t\t\r\n\t\t\t}else{\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t\t// テクスチャの色情報をそのままピクセルに塗る\r\n\t\t\t\tvec4 col = texture2D( texture, vec2( vUv.x, vUv.y ) )*1.0;\r\n\t\t\t\t//gl_FragColor = col;// texture2D(texture, vUv);\r\n\t\t\t\t\r\n\t\t\t\t//視点座標系における光線ベクトル\r\n\t\t\t\tvec4 viewLightPosition = vLight;// \r\n\t\t\t\t//vec4 viewLightPosition = viewMatrix * vec4( _lightPosition, 0.0);\r\n\t\t\t\t//vec3 lightDirection = normalize(vPos - _lightPosition);\r\n\t\t\t\t//float dotNL = clamp(dot( vLight.xyz, vNormal), 0.0, 1.0);\r\n\t\t\t\t\r\n\t\t\t\t//ベクトルの規格化\r\n\t\t\t\tvec3 N = normalize(vNormal);                //法線ベクトル\r\n\t\t\t\tvec3 L = normalize(viewLightPosition.xyz); //光線ベクトル\r\n\t\t\t\t\r\n\t\t\t\t//法線ベクトルと光線ベクトルの内積\r\n\t\t\t\tfloat dotNL = dot(N, L);\r\n\r\n\t\t\t\t//拡散色の決定\r\n\t\t\t\tvec3 diffuse = col.xyz * dotNL * 0.3 + col.xyz * 0.7;\r\n\t\t\t\t\r\n\t\t\t\t//diffuse = diffuse * vAbs.xyz;\r\n\t\t\t\t\r\n\t\t\t\tif( _isColor == 1.0 ){\r\n\t\t\t\t\t\tvec2 pp = vec2( 0.5, fract( length(vAbs) ) );\r\n\t\t\t\t\t\t//vec2 pp = vec2( fract(vUv.x+vAbs.x*0.03), fract(vUv.y+vAbs.z*0.03) );\r\n\t\t\t\t\t\tvec4 out1 = texture2D( colTexture, pp );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tdiffuse = out1.xyz * dotNL * 0.3 + out1.xyz * 0.7;\r\n\t\t\t\t\t\t//diffuse.x += out1.x;\r\n\t\t\t\t\t\t//diffuse.y += out1.y;\r\n\t\t\t\t\t\t//diffuse.z += out1.z;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t//diffuse.x *= vVertex.z / 5000.0;\r\n\t\t\t\t//diffuse.y *= vVertex.z / 5000.0;\r\n\t\t\t\t//diffuse.z *= vVertex.z / 5000.0;\r\n\t\t\t\t\r\n\t\t\t\tdiffuse.x *= _brightness;\r\n\t\t\t\tdiffuse.y *= _brightness;\r\n\t\t\t\tdiffuse.z *= _brightness;\r\n\t\t\t\t\r\n\t\t\t\tgl_FragColor = vec4( diffuse, 1.0);\t\t\t\r\n\t\t\t\r\n\t\t\t}\r\n\t\t}\t\r\n\t";
	if(faces.MaeShaderMaterial._texture1 == null) faces.MaeShaderMaterial._texture1 = THREE.ImageUtils.loadTexture("dede_face_diff.png");
	this._indecies = [];
	this._freq = [];
	var _g1 = 0;
	var _g = sound.MyAudio.a.freqByteDataAry.length;
	while(_g1 < _g) {
		var i = _g1++;
		this._indecies[i] = Math.floor(Math.random() * sound.MyAudio.a.freqByteDataAry.length);
		this._freq[i] = 0;
	}
	this.changeTexture();
	THREE.ShaderMaterial.call(this,{ vertexShader : this.vv, fragmentShader : this.ff, uniforms : { texture : { type : "t", value : faces.MaeShaderMaterial._texture1}, colTexture : { type : "t", value : this._currentTexture}, _noise : { type : "f", value : 1.5 + Math.random()}, _freqByteData : { type : "fv1", value : sound.MyAudio.a.freqByteDataAry}, _count : { type : "f", value : 100 * Math.random()}, _lightPosition : { type : "v3", value : new THREE.Vector3(0,100,50)}, _wireframe : { type : "f", value : 1}, _isColor : { type : "f", value : 1}, _brightness : { type : "f", value : 1}, _strength : { type : "f", value : 1}}});
	this.wireframe = true;
};
faces.MaeShaderMaterial.__super__ = THREE.ShaderMaterial;
faces.MaeShaderMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	changeTexture: function() {
		if(faces.MaeShaderMaterial._colorTextures == null) faces.MaeShaderMaterial._colorTextures = [THREE.ImageUtils.loadTexture("grade.png"),THREE.ImageUtils.loadTexture("grade2.png"),THREE.ImageUtils.loadTexture("grade3.png"),THREE.ImageUtils.loadTexture("grade4.png"),THREE.ImageUtils.loadTexture("grade8.png")];
		this._currentTexture = faces.MaeShaderMaterial._colorTextures[Math.floor(faces.MaeShaderMaterial._colorTextures.length * Math.random())];
	}
	,_getIndex: function() {
		var ary = [];
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			ary[i] = Math.floor(25 * Math.random());
		}
		return ary;
	}
	,setColor: function(b) {
		if(b) this.uniforms._isColor.value = 1; else this.uniforms._isColor.value = 0;
	}
	,setWireframe: function(b) {
		if(b) {
			this.uniforms._wireframe.value = 1;
			this.wireframe = true;
			this.wireframeLinewidth = 0;
		} else {
			this.uniforms._wireframe.value = 0;
			this.wireframe = false;
		}
	}
	,update: function(a,lifeRatio) {
		if(a != null && a.isStart) {
			this._updateFreq(a,lifeRatio);
			var speed = Math.pow(a.freqByteData[this._indecies[8]] / 255,2) * 0.5;
			this.uniforms._count.value += speed;
			this.uniforms._freqByteData.value = this._freq;
		}
	}
	,setBrightness: function(bright) {
		this.uniforms._brightness.value = 0.8 + 0.2 * bright;
	}
	,setStrength: function(f) {
		this.uniforms._strength.value = f;
	}
	,_updateFreq: function(audio,lifeRatio) {
		var _g1 = 0;
		var _g = this._freq.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._freq[i] = audio.freqByteDataAryEase[this._indecies[i]];
		}
	}
});
faces.data = {};
faces.data.MaeFormBase = function() {
	this._height = 0;
	this._width = 0;
};
faces.data.MaeFormBase.prototype = {
	init: function(camera,lines) {
		console.log("init");
		this._camera = camera;
		this._lines = lines;
	}
	,_setRot: function(mode) {
		var len = this._faces.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this._faces[i].setRotMode(mode);
		}
	}
	,setFormation: function(face) {
		this._faces = face;
	}
	,update: function() {
	}
};
faces.data.MaeFormH1 = function() {
	faces.data.MaeFormBase.call(this);
};
faces.data.MaeFormH1.__super__ = faces.data.MaeFormBase;
faces.data.MaeFormH1.prototype = $extend(faces.data.MaeFormBase.prototype,{
	setFormation: function(faces) {
		this._faces = faces;
		var rotMode = 0;
		this._setRot(rotMode);
		console.log("_setForm1");
		this._lines.startY = -110;
		this._camera.amp = 350;
		this._camera.setFOV(30);
		var offsetY = 0;
		var spaceX = 35;
		var xnum = 20;
		var ynum = 3;
		this._width = xnum * spaceX;
		var len = this._faces.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var ff = this._faces[i];
			ff.setMaterial(0);
			if(i < 20) {
				var xx = i % xnum - (xnum - 1) / 2;
				var yy = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = 8 + offsetY;
				ff.position.z = 230;
				ff.rotation.y = 0;
			} else {
				ff.visible = false;
				ff.enabled = false;
			}
		}
	}
	,update: function() {
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].position.x -= 0.1;
			if(this._faces[i].position.x < -this._width / 2) {
				this._faces[i].position.x = this._width / 2;
				this._faces[i].updatePlate();
			}
		}
	}
});
faces.data.MaeFormH3 = function() {
	faces.data.MaeFormBase.call(this);
};
faces.data.MaeFormH3.__super__ = faces.data.MaeFormBase;
faces.data.MaeFormH3.prototype = $extend(faces.data.MaeFormBase.prototype,{
	setFormation: function(faces1) {
		this._faces = faces1;
		var rotMode = faces.MaeFaceMesh.getRandomRot();
		this._setRot(rotMode);
		this._lines.startY = -100;
		this._camera.amp = 300;
		this._camera.setFOV(30);
		var offsetY = 10;
		var spaceX = 45;
		var spaceY = 45;
		var xnum = 20;
		var ynum = 3;
		var len = this._faces.length;
		this._width = xnum * spaceX;
		this._height = ynum * spaceY;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var ff = this._faces[i];
			if(i < 60) {
				var xx = i % xnum - (xnum - 1) / 2;
				var yy = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = yy * spaceY + offsetY;
				ff.position.z = 0;
				ff.rotation.y = 0;
			} else {
				ff.enabled = false;
				ff.visible = false;
			}
		}
	}
	,update: function() {
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].position.x -= 0.5;
			if(this._faces[i].position.x < -this._width / 2) {
				this._faces[i].position.x = this._width / 2;
				this._faces[i].updatePlate();
			}
		}
	}
});
faces.data.MaeFormV = function() {
	faces.data.MaeFormBase.call(this);
};
faces.data.MaeFormV.__super__ = faces.data.MaeFormBase;
faces.data.MaeFormV.prototype = $extend(faces.data.MaeFormBase.prototype,{
	setFormation: function(faces1) {
		this._faces = faces1;
		var rotMode = faces.MaeFaceMesh.getRandomRot();
		this._setRot(rotMode);
		this._lines.startY = -80;
		this._camera.amp = 215;
		this._camera.setFOV(35);
		var spaceX = 50;
		var spaceY = 50;
		var xnum = 9;
		var ynum = 5;
		var num = xnum * ynum;
		this._width = spaceX * xnum;
		this._height = spaceY * ynum;
		var len = this._faces.length;
		var oz = -200;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var ff = this._faces[i];
			ff.enabled = true;
			ff.visible = true;
			if(i < num) {
				var xx = i % xnum - (xnum - 1) / 2;
				var yy = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = yy * spaceY;
				ff.position.z = 0;
				ff.rotation.y = 0;
			} else {
				ff.enabled = false;
				ff.visible = false;
			}
		}
	}
	,update: function() {
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].position.y += 0.25;
			if(this._faces[i].position.y > this._height / 2) {
				this._faces[i].position.y = -this._height / 2;
				this._faces[i].updatePlate();
			}
		}
	}
});
faces.data.MaeFormVpers = function() {
	faces.data.MaeFormBase.call(this);
};
faces.data.MaeFormVpers.__super__ = faces.data.MaeFormBase;
faces.data.MaeFormVpers.prototype = $extend(faces.data.MaeFormBase.prototype,{
	setFormation: function(faces1) {
		this._faces = faces1;
		var rotMode = faces.MaeFaceMesh.getRandomRot();
		this._setRot(rotMode);
		this._lines.startY = -100;
		this._camera.amp = 255;
		this._camera.setFOV(35);
		var spaceX = 60;
		var spaceY = 60;
		var xnum = 9;
		var ynum = 8;
		var num = xnum * ynum;
		this._width = spaceX * xnum;
		this._height = spaceY * ynum;
		var len = this._faces.length;
		var oz = -200;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var ff = this._faces[i];
			ff.enabled = true;
			ff.visible = true;
			if(i < num) {
				var idx = i;
				var xx = idx % xnum - (xnum - 1) / 2;
				var yy = Math.floor(idx / xnum) - (ynum - 1) / 2;
				ff.position.x = 200;
				ff.position.y = yy * spaceX;
				ff.position.z = xx * spaceY + oz;
				ff.rotation.y = -Math.PI / 2;
			} else if(i < num * 2) {
				var idx1 = i - num;
				var xx1 = idx1 % xnum - (xnum - 1) / 2;
				var yy1 = Math.floor(idx1 / xnum) - (ynum - 1) / 2;
				ff.position.x = -200;
				ff.position.y = yy1 * spaceX;
				ff.position.z = xx1 * spaceY + oz;
				ff.rotation.y = Math.PI / 2;
			} else {
				ff.enabled = false;
				ff.visible = false;
			}
		}
	}
	,update: function() {
		var _g1 = 0;
		var _g = this._faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._faces[i].position.y += 0.25;
			if(this._faces[i].position.y > this._height / 2) {
				this._faces[i].position.y = -this._height / 2;
				this._faces[i].updatePlate();
			}
		}
	}
});
faces.data.MaeFormation = function() {
	this._height = 0;
	this._width = 0;
	this._currentIndex = 0;
};
faces.data.MaeFormation.prototype = {
	init: function(main,lines) {
		this._camera = main.camera;
		this._lines = lines;
		this._formH1 = new faces.data.MaeFormH1();
		this._formH3 = new faces.data.MaeFormH3();
		this._formVp = new faces.data.MaeFormVpers();
		this._formV = new faces.data.MaeFormV();
		this._forms = [this._formH1,this._formH3,this._formVp,this._formV];
		var _g1 = 0;
		var _g = this._forms.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._forms[i].init(this._camera,this._lines);
		}
	}
	,setFormation: function(n,faces) {
		this._faces = faces;
		this._currentIndex = n % this._forms.length;
		this._forms[this._currentIndex].setFormation(faces);
	}
	,update: function() {
		this._forms[this._currentIndex].update();
	}
};
faces.lines = {};
faces.lines.ConnectLine = function(v1,v2) {
	this._count = 0;
	this._isTween = false;
	this._v1 = v1;
	this._v2 = v2;
	this._count = Math.floor(Math.random() * 30);
};
faces.lines.ConnectLine.prototype = {
	update: function(start,goal) {
		this._start = start;
		this._goal = goal;
		this._v1.copy(this._start);
		this._v2.copy(this._goal);
	}
	,update2: function(start,xx,yy,zz,col) {
		this._v1.copy(start);
		this._v2.x = xx;
		this._v2.y = yy;
		this._v2.z = zz;
	}
};
faces.lines.MaeFaceLine = function() {
	this.lines = [];
};
faces.lines.MaeFaceLine.prototype = {
	addVertex: function(v1,v2) {
		this.lines.push(new faces.lines.ConnectLine(v1,v2));
	}
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
var js = {};
js.Browser = function() { };
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var objects = {};
objects.MyDAELoader = function() {
	THREE.Object3D.call(this);
};
objects.MyDAELoader.getPosY = function(ratio) {
	ratio = 1 - ratio;
	var maxY = 1.36578;
	var minY = -1.13318;
	return minY + (maxY - minY) * ratio;
};
objects.MyDAELoader.getRatioY = function(posY) {
	var maxY = 1.36578;
	var minY = -1.13318;
	return (posY - minY) / (maxY - minY);
};
objects.MyDAELoader.getHeight = function(ratio) {
	return 2.49896000000000029 * ratio;
};
objects.MyDAELoader.__super__ = THREE.Object3D;
objects.MyDAELoader.prototype = $extend(THREE.Object3D.prototype,{
	load: function(callback) {
		this._callback = callback;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load("dede_160807_3c4d.dae",$bind(this,this._onComplete));
	}
	,_onComplete: function(collada) {
		this.dae = collada.scene;
		this.material = new objects.MyShaderMaterial();
		objects.MyDAELoader.geometry = this.dae.children[0].children[0].geometry;
		this.scale.x = 150;
		this.scale.z = 150;
		this.scale.y = 150;
		if(this._callback != null) this._callback();
	}
	,update: function() {
		this.material.update();
	}
	,changeMap: function(isWire) {
	}
});
objects.MyShaderMaterial = function() {
	this.vv = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t" + "\r\n\r\nconst float PI = 3.141592653;\r\n\t\r\nvarying vec2 vUv;\r\nvarying vec3 vPos;\r\nvarying vec3 vNormal;\r\nvarying vec4 vLight;\r\n\r\nuniform float _count;\r\nuniform float _freqByteData[32];\r\nuniform vec3 _lightPosition; //光源位置座標\r\n\r\nvoid main()\r\n{\r\n\tvUv = uv;\r\n\t//頂点法線ベクトルを視点座標系に変換する行列=normalMatrix\r\n\t//vNormal = (normal * normalMatrix);\r\n\t//vec4 fuga = projectionMatrix * vec4( normal * normalMatrix , 0.0);\r\n\tvNormal = normalMatrix * normal;\r\n\t\r\n\t//視点座標系における光線ベクトル\r\n\tvLight = (viewMatrix * vec4( _lightPosition, 0.0));\r\n\r\n\tvPos = (modelMatrix * vec4(position, 1.0 )).xyz;\r\n\t\r\n\t//vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\r\n\t//patams\r\n\t\r\n\tfloat nejireX\t\t= pow( _freqByteData[16] / 255.0, 1.5) * 10.0;\r\n\tfloat nejireY\t\t= pow(_freqByteData[18] / 255.0, 2.0) * PI * 2.0;// * 0.5;\r\n\tfloat noise \t\t= pow(_freqByteData[12] / 255.0,1.0) * 1.5;\r\n\tfloat speed \t\t= pow(_freqByteData[8] / 255.0, 2.0) * 0.5;\r\n\tfloat sphere \t\t= pow(_freqByteData[4]/255.0, 2.0);\r\n\tfloat noiseSpeed \t= 0.1 + pow( _freqByteData[19] / 255.0, 4.0) * 0.05;\r\n\tfloat scale \t\t= 1.0 + pow(_freqByteData[1] / 255.0, 3.0) * 0.4;\t\t\t\t\r\n\tfloat yokoRatio \t= pow(_freqByteData[5] / 255.0, 2.0);\r\n\tfloat yokoSpeed \t= pow(_freqByteData[13] / 255.0, 2.0) * 4.0;\r\n\tfloat zengoRatio \t= pow(_freqByteData[19] / 255.0, 2.0);\t\t\r\n\tfloat tate\t\t\t= 1.0 + ( pow(_freqByteData[14] / 255.0, 2.0) * 1.4 - pow(_freqByteData[3] / 255.0, 2.0) * 0.7 );\r\n\t\r\n\t////////////////////\r\n\tvec3 vv = position;\r\n\t/*\r\n\t\tvar a:Float = Math.sqrt( vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);\r\n\t\tvar radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度\r\n\t\tvar radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度\t\r\n\t*/\t\r\n\tfloat a = length(vv);\r\n\tfloat radX = (-atan(vv.z, vv.x) + PI * 0.5) + vv.y * sin(_count) * nejireX;//横方向の角度\r\n\tfloat radY = asin(vv.y / a);\r\n\t\r\n\t/*\r\n\t\tvar amp:Float = (1-_sphere) * a + (_sphere) * 1;\r\n\t\tamp += Math.sin(_count * 0.7) * _getNoise(vv.x, vv.y + _count * _noiseSpeed, vv.z) * _noise;\r\n\t*/\r\n\r\n\t//float snoise(vec3 v) { \r\n\tfloat amp = (1.0 - sphere) * a + sphere * 1.0;\r\n\tvec3 snoisePos = vec3(vv.x, vv.y + _count * noiseSpeed, vv.z);\r\n\tamp += sin(_count * 0.7) * snoise(snoisePos) * noise;\r\n\t\r\n\t/*\r\n\t\tvar yoko:Float = Math.sin( 0.5*( vv.y * 2 * Math.PI ) + _count * _yokoSpeed ) * _yokoRatio;\r\n\t\tvar zengo:Float = Math.cos( 0.5*( vv.y * 2 * Math.PI ) + _count * 3 ) * 0.2 * _zengoRatio;\r\n\t\t\t\r\n\t\tvar tgtX:Float = amp * Math.sin( radX ) * Math.cos(radY) + zengo;//横\r\n\t\tvar tgtY:Float = amp * Math.sin( radY );//縦\r\n\t\tvar tgtZ:Float = amp * Math.cos( radX ) * Math.cos(radY) + yoko;//横\t\r\n\t*/\r\n\r\n\tfloat yoko = sin( 0.5*( vv.y * 2.0 * PI ) + _count * yokoSpeed ) * yokoRatio;\r\n\tfloat zengo = cos( 0.5*( vv.y * 2.0 * PI ) + _count * 3.0 ) * 0.2 * zengoRatio;\t\r\n\t\r\n\tvec3 hoge = vec3(0.0);\r\n\t\thoge.x = amp * sin( radX ) * cos(radY) + zengo;//横\r\n\t\thoge.y = amp * sin( radY ) * tate;//縦\r\n\t\thoge.z = amp * cos( radX ) * cos(radY) + yoko;//横\t\r\n\t\t\r\n\t// 変換：ローカル座標 → 配置 → カメラ座標\r\n\tvec4 mvPosition = modelViewMatrix * vec4(hoge, 1.0);//vec4(vv, 1.0);    \r\n\t\r\n\t//vLight =  projectionMatrix * viewMatrix * vec4( _lightPosition, 0.0);\r\n\t\r\n\r\n\t// 変換：カメラ座標 → 画面座標\r\n\tgl_Position = projectionMatrix * mvPosition;\r\n\t\r\n\t\r\n}\r\n\r\n\t";
	this.ff = "\r\n\t\t//uniform 変数としてテクスチャのデータを受け取る\r\n\t\tuniform sampler2D texture;\r\n\t\tuniform vec3 _lightPosition; //光源位置座標\r\n\t\t\r\n\t\t// vertexShaderで処理されて渡されるテクスチャ座標\r\n\t\tvarying vec2 vUv;                                             \r\n\t\tvarying vec3 vNormal;\r\n\t\tvarying vec3 vPos;\r\n\t\tvarying vec4 vLight;\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t\t// テクスチャの色情報をそのままピクセルに塗る\r\n\t\t\tvec4 col = texture2D( texture, vec2( vUv.x, vUv.y ) )*1.0;\r\n\t\t\t//gl_FragColor = col;// texture2D(texture, vUv);\r\n\t\t\t\r\n\t\t\t//視点座標系における光線ベクトル\r\n\t\t\tvec4 viewLightPosition = vLight;// \r\n\t\t\t//vec4 viewLightPosition = viewMatrix * vec4( _lightPosition, 0.0);\r\n\t\t\t//vec3 lightDirection = normalize(vPos - _lightPosition);\r\n\t\t\t//float dotNL = clamp(dot( vLight.xyz, vNormal), 0.0, 1.0);\r\n\t\t\t\r\n\t\t\t//ベクトルの規格化\r\n\t\t\tvec3 N = normalize(vNormal);                //法線ベクトル\r\n\t\t\tvec3 L = normalize(viewLightPosition.xyz); //光線ベクトル\r\n\t\t\t\r\n\t\t\t//法線ベクトルと光線ベクトルの内積\r\n\t\t\tfloat dotNL = dot(N, L);\r\n\r\n\t\t\t//拡散色の決定\r\n\t\t\tvec3 diffuse = col.xyz * dotNL * 0.5 + col.xyz * 0.5;\r\n\t\t\tgl_FragColor = vec4( diffuse, 1.0);\t\t\t\r\n\t\t\t\r\n\t\t}\t\r\n\t";
	if(objects.MyShaderMaterial._texture1 == null) objects.MyShaderMaterial._texture1 = THREE.ImageUtils.loadTexture("mae_face.png");
	this._indecies = [];
	this._freq = [];
	var _g1 = 0;
	var _g = sound.MyAudio.a.freqByteDataAry.length;
	while(_g1 < _g) {
		var i = _g1++;
		this._indecies[i] = Math.floor(Math.random() * sound.MyAudio.a.freqByteDataAry.length);
		this._freq[i] = 0;
	}
	THREE.ShaderMaterial.call(this,{ vertexShader : this.vv, fragmentShader : this.ff, uniforms : { texture : { type : "t", value : objects.MyShaderMaterial._texture1}, _freqByteData : { type : "fv1", value : sound.MyAudio.a.freqByteDataAry}, _count : { type : "f", value : 100 * Math.random()}, _lightPosition : { type : "v3", value : new THREE.Vector3(0,100,50)}}});
};
objects.MyShaderMaterial.__super__ = THREE.ShaderMaterial;
objects.MyShaderMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	_getIndex: function() {
		var ary = [];
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			ary[i] = Math.floor(25 * Math.random());
		}
		return ary;
	}
	,update: function() {
		this._updateFreq();
		var speed = Math.pow(sound.MyAudio.a.freqByteData[this._indecies[8]] / 255,2) * 0.5;
		this.uniforms._count.value += speed;
		this.uniforms._freqByteData.value = this._freq;
	}
	,_updateFreq: function() {
		var _g1 = 0;
		var _g = this._freq.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._freq[i] = sound.MyAudio.a.freqByteData[this._indecies[i]];
		}
	}
});
objects.MySphere = function() {
	this.power = 1;
	this._yokoRatio = 0;
	this._tateScaleXZ = 1;
	this._tateScaleY = 1;
	this._vr = 0;
	this._speed = 0;
	this._scale = 0;
	this._noiseSpeed = 0;
	this._sphere = 0;
	this._noise = 0;
	this._nejireY = 0;
	this._nejireX = 0;
	this._count = 0;
	THREE.Object3D.call(this);
	var texture = THREE.ImageUtils.loadTexture("R0010035.JPG");
	this._textures = [texture,THREE.ImageUtils.loadTexture("bg/dedebg.jpg"),THREE.ImageUtils.loadTexture("bg/R0010042.jpg"),THREE.ImageUtils.loadTexture("bg/R0010046.jpg"),THREE.ImageUtils.loadTexture("bg/R0010047.jpg"),THREE.ImageUtils.loadTexture("bg/R0010048.jpg"),THREE.ImageUtils.loadTexture("bg/R0010051.jpg"),THREE.ImageUtils.loadTexture("bg/R0010053.jpg"),THREE.ImageUtils.loadTexture("bg/R0010053.jpg"),THREE.ImageUtils.loadTexture("bg/R0010055.jpg"),THREE.ImageUtils.loadTexture("bg/R0010057.jpg"),THREE.ImageUtils.loadTexture("bg/R0010059.jpg"),THREE.ImageUtils.loadTexture("bg/R0010061.jpg"),THREE.ImageUtils.loadTexture("bg/R0010062.jpg"),THREE.ImageUtils.loadTexture("bg/R0010063.jpg"),THREE.ImageUtils.loadTexture("bg/R0010065.jpg"),THREE.ImageUtils.loadTexture("bg/R0010066.jpg"),THREE.ImageUtils.loadTexture("bg/R0010068.jpg"),THREE.ImageUtils.loadTexture("bg/R0010069.jpg"),THREE.ImageUtils.loadTexture("img/IMG_5796B.jpg"),THREE.ImageUtils.loadTexture("img/IMG_5796.jpg"),THREE.ImageUtils.loadTexture("img/a.jpg"),THREE.ImageUtils.loadTexture("img/b.jpg"),THREE.ImageUtils.loadTexture("img/hoge.jpg"),THREE.ImageUtils.loadTexture("img/fuga.jpg"),THREE.ImageUtils.loadTexture("bg/white.png")];
	this.mate = new THREE.MeshBasicMaterial({ map : texture});
	var g = new THREE.SphereGeometry(1000,60,30);
	this.mesh = new THREE.Mesh(g,this.mate);
	this.mesh.position.z = 0;
	this.mesh.scale.x = -1;
	this.mesh.rotation.y = Math.PI / 2;
	this.mesh.receiveShadow = true;
	this.mesh.geometry.verticesNeedUpdate = true;
	this._base = [];
	var _g1 = 0;
	var _g = g.vertices.length;
	while(_g1 < _g) {
		var i = _g1++;
		this._base.push(g.vertices[i].clone());
	}
	this.add(this.mesh);
};
objects.MySphere.__super__ = THREE.Object3D;
objects.MySphere.prototype = $extend(THREE.Object3D.prototype,{
	changeBg: function() {
		var idx = Math.floor(Math.random() * (this._textures.length - 1));
		if(Math.random() < 0.05) {
			this.mate.map = this._textures[this._textures.length - 1];
			this.mate.wireframe = true;
			return true;
		} else {
			this.mate.wireframe = false;
			this.mate.map = this._textures[idx];
		}
		return false;
	}
	,update: function(audio) {
		this._audio = audio;
		var g = this.mesh.geometry;
		g.verticesNeedUpdate = true;
		this._count += this._speed;
		this._vr *= 0.9;
		if(Math.abs(this._vr) < 0.001) {
			if(this._vr == 0) this._vr = 0.001;
			this._vr = 0.001 * this._vr / Math.abs(this._vr);
		}
		this.rotation.y += this._vr;
		if(this._audio != null && this._audio.isStart) {
			this._audio.update();
			var pp = Math.pow(this._audio.freqByteData[18] / 255,6) * 0.1 * this.power;
			this._vr += pp;
			if(this._audio.freqByteData[19] / 255 > 0.5) {
			}
			this._nejireX = Math.pow(this._audio.freqByteData[19] / 255,1.5) * 0.02 * this.power;
			this._nejireY = Math.pow(this._audio.freqByteData[11] / 255,2.5) * this.power;
			this._noise = Math.pow(this._audio.freqByteData[13] / 255,2) * 0.8 * this.power;
			this._speed = Math.pow(this._audio.freqByteData[8] / 255,2) * 0.2 * this.power;
			this._sphere = 0;
			this._noiseSpeed = 0.01 + Math.pow(this._audio.freqByteData[19] / 255,1.5) * 0.1;
			this._scale = 1 + Math.pow(this._audio.freqByteData[1] / 255,1) * this.power;
			this._tateScaleY = 1 + Math.pow(this._audio.freqByteData[6] / 255,5) * 0.7 * this.power;
			this._tateScaleXZ = 1 + Math.pow(this._audio.freqByteData[7] / 255,5) * 1.5 * this.power;
			this._yokoRatio = Math.pow(this._audio.freqByteData[3] / 255,1) * this.power;
		}
		var len = g.vertices.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var vv = this._base[i];
			var a = Math.sqrt(vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
			var radX = -Math.atan2(vv.z,vv.x) + vv.y * Math.sin(this._count + vv.y / (500 * this._scale)) * this._nejireX;
			var radY = Math.asin(vv.y / a);
			var amp = (1 - this._sphere) * a + this._sphere;
			amp += Math.sin(this._count * 0.7) * this._getNoise(vv.x,vv.y + this._count * this._noiseSpeed,vv.z) * this._noise;
			var yoko = Math.sin(0.01 * (vv.y * 2 * Math.PI) + this._count * 3) * this._yokoRatio * 200;
			var tgtX = amp * Math.sin(radX) * Math.cos(radY);
			var tgtY = amp * Math.sin(radY) + 600 * this._nejireY * Math.sin(Math.atan2(vv.z,vv.x) * 2 + this._count * 0.3);
			var tgtZ = amp * Math.cos(radX) * Math.cos(radY) + yoko;
			g.vertices[i].x = tgtX;
			g.vertices[i].y = tgtY;
			g.vertices[i].z = tgtZ;
		}
		this.scale.set(this._tateScaleXZ,this._tateScaleY,this._tateScaleXZ);
	}
	,_getNoise: function(xx,yy,zz) {
		var f = noise.perlin3;
		var n = f(xx,yy,zz);
		return n;
	}
});
objects.SpacingText = function(text,font,space,color) {
	this._space = 0;
	this._height = 0;
	this._width = 0;
	createjs.Container.call(this);
	this._font = font;
	this._space = space;
	this._color = color;
	this._setText(text);
};
objects.SpacingText.getFont = function(size,bold,text) {
	if(text == null) text = "Roboto Condensed";
	if(bold == null) bold = "400";
	return bold + " " + size + "px " + text;
};
objects.SpacingText.__super__ = createjs.Container;
objects.SpacingText.prototype = $extend(createjs.Container.prototype,{
	_setText: function(text) {
		this._removeTexts();
		var sx = 0;
		var _g1 = 0;
		var _g = text.length;
		while(_g1 < _g) {
			var i = _g1++;
			var tt = HxOverrides.substr(text,i,1);
			var text1 = new createjs.Text(tt,this._font);
			text1.color = this._color;
			if(tt == "@") text1.y = -2; else text1.y = 0;
			text1.x = sx;
			this._texts.push(text1);
			sx += text1.getMeasuredWidth() + this._space;
			this._height = Math.max(this._height,text1.getMeasuredHeight());
			this._texts.push(text1);
			this.addChild(text1);
		}
		this._width = sx - this._space;
	}
	,_removeTexts: function() {
		if(this._texts != null) {
			var _g1 = 0;
			var _g = this._texts.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.contains(this._texts[i])) this.removeChild(this._texts[i]);
			}
		}
		this._texts = [];
	}
	,update: function(text) {
		this._setText(text);
	}
	,getWidth: function() {
		return this._width;
	}
	,getHeight: function() {
		return this._height;
	}
});
objects.shaders = {};
objects.shaders.CurlNoise = function() {
};
var sound = {};
sound.MyAudio = function() {
	this.globalVolume = 0.899;
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
		common.Dat.gui.add(this,"globalVolume",0.1,3).step(0.1);
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
Main3d.W = 1280;
Main3d.H = 800;
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
common.StageRef.$name = "webgl";
common.TimeCounter._isStart = false;
common.WebfontLoader.ROBOTO_CONDENSED = "Roboto Condensed";
common.WebfontLoader.ROBOTO_CONDENSED_700400 = "Roboto+Condensed:700,400:latin";
common.WebfontLoader.ROBOTO_CONDENSED_400300 = "Roboto+Condensed:400,300:latin";
common.WebfontLoader._loading = false;
common.WebfontLoader._complete = false;
faces.MaeFace.MAT_NORMAL = 0;
faces.MaeFace.MAT_COLOR = 1;
faces.MaeFace.MAT_WIRE_WHITE = 2;
faces.MaeFace.MAT_WIRE_COLOR = 3;
faces.MaeFaceMesh.ROT_MODE_X = 0;
faces.MaeFaceMesh.ROT_MODE_X2 = 1;
faces.MaeFaceMesh.ROT_MODE_XYZ = 2;
faces.MaeFaceMesh.ROT_MODE_NNM = 3;
faces.MaeFaces.MAX = 150;
faces.MaePlate._index = 0;
faces.data.MaeFormation.FORM_H1 = 0;
faces.data.MaeFormation.FORM_H3 = 1;
faces.data.MaeFormation.FORM_VP = 2;
faces.data.MaeFormation.FORM_V = 3;
faces.data.MaeFormation.num = 4;
objects.shaders.CurlNoise.glsl = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t";
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
Main.main();
})();

//# sourceMappingURL=haxe.js.map