(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Test3d = function() {
	this._rad = 0;
	this._yy = 400;
	this._amp = 3500;
	this._mouseY = 0;
	this._mouseX = 0;
};
Test3d.prototype = {
	init: function() {
		this._renderer = new THREE.WebGLRenderer({ antialias : false, devicePixelRatio : 1});
		this._renderer.shadowMapEnabled = false;
		this._scene = new THREE.Scene();
		this._renderer.setSize(1280,720);
		window.document.body.appendChild(this._renderer.domElement);
		this._renderer.domElement.id = "webgl";
		common.StageRef.setCenter();
		this._camera = new camera.ExCamera(60,1.77777777777777768,10,10000);
		this._camera.init(this._renderer.domElement);
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
	}
	,_run: function() {
		if(this._camera != null) this._camera.update();
		this._renderer.render(this._scene,this._camera);
		window.requestAnimationFrame($bind(this,this._run));
	}
	,_onResize: function(object) {
		var W = common.StageRef.get_stageWidth();
		var H = common.StageRef.get_stageHeight();
		this._renderer.domElement.width = W;
		this._renderer.domElement.height = H;
		this._renderer.setSize(W,H);
		this._camera.aspect = W / H;
		this._camera.updateProjectionMatrix();
	}
};
var CanvasTest3d = function() {
	this._isPP = false;
	this._isWhite = false;
	Test3d.call(this);
};
CanvasTest3d.__super__ = Test3d;
CanvasTest3d.prototype = $extend(Test3d.prototype,{
	init: function() {
		Test3d.prototype.init.call(this);
		common.Dat.init($bind(this,this.initA));
	}
	,initA: function() {
		if(common.Dat.bg) return;
		logo.Logos.init($bind(this,this.initB));
	}
	,initB: function() {
		logo.Logos.init2();
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this.initC));
	}
	,initC: function() {
		this._pp = new effect.PostProcessing2();
		this._pp.init(this._scene,this._camera,this._renderer);
		this._dots = new typo.Dots();
		this._dots.init(1280,720);
		this._scene.add(this._dots);
		this._scene.fog = new THREE.Fog(0,1000,10000);
		this._run();
		common.Dat.gui.add(this._camera,"amp").listen();
		common.Dat.gui.add(this,"_isPP").listen();
		this._onResize(null);
		window.document.addEventListener("keydown",$bind(this,this._onKeyDown));
	}
	,_onKeyDown: function(e) {
		console.log("keydown");
		var _g = Std.parseInt(e.keyCode);
		switch(_g) {
		case 37:
			this._pp.changeTexture();
			break;
		case 39:
			this._pp.changeTexture();
			break;
		case 66:
			this._isWhite = !this._isWhite;
			if(this._isWhite) {
				this._renderer.setClearColor(new THREE.Color(255));
				this._dots.setWhite(true);
			} else {
				this._renderer.setClearColor(new THREE.Color(0));
				this._dots.setWhite(false);
			}
			break;
		}
	}
	,_run: function() {
		if(this._audio != null) this._audio.update();
		if(this._dots != null) this._dots.update(this._audio,this._camera);
		if(this._camera != null) this._camera.update();
		if(this._isPP) this._pp.render(); else this._renderer.render(this._scene,this._camera);
		window.requestAnimationFrame($bind(this,this._run));
	}
	,_onResize: function(object) {
		Test3d.prototype._onResize.call(this,object);
		if(this._pp != null) this._pp.resize(common.StageRef.get_stageWidth(),common.StageRef.get_stageHeight());
	}
});
var Cube = function() {
	THREE.Object3D.call(this);
};
Cube.__super__ = THREE.Object3D;
Cube.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		var w = 1000;
		this.title = new CubeTitle();
		this.title.init(w);
		this.add(this.title);
		this.title2 = new CubeTitle();
		this.title2.init(w);
		this.title2.rotation.y = Math.PI;
		this.add(this.title2);
		this.mate = new THREE.LineBasicMaterial({ color : 16777215});
		this.mate.fog = false;
		var geo = new THREE.Geometry();
		geo.vertices.push(new THREE.Vector3(w,w,w));
		geo.vertices.push(new THREE.Vector3(w,-w,w));
		geo.vertices.push(new THREE.Vector3(-w,-w,w));
		geo.vertices.push(new THREE.Vector3(-w,w,w));
		geo.vertices.push(new THREE.Vector3(w,w,w));
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var line = new THREE.Line(geo,this.mate);
			this.add(line);
			line.rotation.x = i * Math.PI / 2;
		}
	}
	,setScale: function(size) {
		this.scale.set(size.x / 1000,size.y / 1000,size.z / 1000);
	}
	,setWhite: function(b) {
		if(b) this.mate.color.set(10066431); else this.mate.color.set(6710886);
	}
});
var CubeTitle = function() {
	THREE.Object3D.call(this);
};
CubeTitle.__super__ = THREE.Object3D;
CubeTitle.prototype = $extend(THREE.Object3D.prototype,{
	init: function(w) {
		var s = 1.9;
		var ww = 512 * s;
		var hh = 128 * s;
		if(CubeTitle.mate1 == null) {
			var tex = THREE.ImageUtils.loadTexture("./sheet/title.png");
			CubeTitle.mate1 = new THREE.MeshBasicMaterial({ map : tex, transparent : true});
			CubeTitle.mate2 = new THREE.MeshBasicMaterial({ map : tex, transparent : true, side : 1, color : 16777215});
			CubeTitle.geo = new THREE.PlaneBufferGeometry(ww,hh,1,1);
		}
		this.logo = new THREE.Mesh(CubeTitle.geo,CubeTitle.mate1);
		this.logo.position.x = -w + ww / 2 + 20;
		this.logo.position.y = w - hh / 2 - 5;
		this.logo.position.z = w;
		this.add(this.logo);
		this.logo2 = new THREE.Mesh(CubeTitle.geo,CubeTitle.mate2);
		this.logo2.position.copy(this.logo.position.clone());
		this.add(this.logo2);
	}
});
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
	window.onload = Main._onLoad;
};
Main._onLoad = function(e) {
	var test = new CanvasTest3d();
	test.init();
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
	this.tgtOffsetY = 0;
	this.isActive = false;
	this.radY = 0.01;
	this.radX = 0.01;
	this.amp = 2800.0;
	this.pos = new THREE.Vector3();
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
	this.posMode = "MODE_NORMAL";
};
camera.ExCamera.__super__ = THREE.PerspectiveCamera;
camera.ExCamera.prototype = $extend(THREE.PerspectiveCamera.prototype,{
	init: function(dom) {
		this._camera = this;
		this.target = new THREE.Vector3();
		if(dom != null) {
			dom.ontouchstart = $bind(this,this.onMouseDown);
			dom.ontouchend = $bind(this,this.onMouseUp);
			dom.ontouchmove = $bind(this,this.onMouseMove);
			dom.onmousedown = $bind(this,this.onMouseDown);
			dom.onmouseup = $bind(this,this.onMouseUp);
			dom.onmousemove = $bind(this,this.onMouseMove);
			dom.onmousewheel = $bind(this,this.onMouseWheel);
			window.addEventListener("DOMMouseScroll",$bind(this,this.onMouseWheelFF));
			this._dom = dom;
		}
	}
	,_onResize: function() {
	}
	,onMouseWheelFF: function(e) {
		this.amp += e.detail;
		if(this.amp > 8000) this.amp = 8000;
		if(this.amp < 50) this.amp = 50;
	}
	,onMouseWheel: function(e) {
		this.amp += e.wheelDelta * 0.5;
		if(this.amp > 8000) this.amp = 8000;
		if(this.amp < 50) this.amp = 50;
	}
	,onMouseUp: function(e) {
		e.preventDefault();
		this._down = false;
	}
	,onMouseDown: function(e) {
		e.preventDefault();
		this._down = true;
		if(this._isMobile) {
			var touch = e.touches[0];
			if(e.touches.length <= 1) {
				this._downX = touch.pageX;
				this._downY = touch.pageY;
			}
		} else {
			this._downX = e.clientX;
			this._downY = e.clientY;
		}
		this._oRadX = this.radX;
		this._oRadY = this.radY;
	}
	,onMouseMove: function(e) {
		e.preventDefault();
		if(this._isMobile) {
			var touch = e.touches[0];
			if(e.touches.length <= 1) {
				this._mouseX = touch.pageX;
				this._mouseY = touch.pageY;
			}
		} else {
			this._mouseX = e.clientX;
			this._mouseY = e.clientY;
		}
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
		if(this.radY > Math.PI / 2 * 0.9) this.radY = Math.PI / 2 * 0.9;
		if(this.radY < -Math.PI / 2 * 0.9) this.radY = -Math.PI / 2 * 0.9;
		if(target != null) this._camera.lookAt(target);
	}
	,setPolar: function(a,rx,ry) {
		this.amp = a;
		this.radX = rx;
		this.radY = ry;
		this._updatePosition();
	}
	,kill: function() {
		this._dom.onmousedown = null;
		this._dom.onmouseup = null;
		this._dom.onmousemove = null;
		this._dom.onmousewheel = null;
		window.removeEventListener("DOMMouseScroll",$bind(this,this.onMouseWheelFF));
	}
	,_updatePosition: function(spd) {
		if(spd == null) spd = 1;
		if(this.posMode == "MODE_NORMAL") {
			var amp1 = this.amp * Math.cos(this.radY);
			var x = this.target.x + amp1 * Math.sin(this.radX);
			var y = this.target.y + this.amp * Math.sin(this.radY);
			var z = this.target.z + amp1 * Math.cos(this.radX);
			this._camera.position.x += (x - this._camera.position.x) * spd;
			this._camera.position.y += (y - this._camera.position.y) * spd;
			this._camera.position.z += (z - this._camera.position.z) * spd;
		} else {
			this._camera.position.x += (this.pos.x - this._camera.position.x) * spd;
			this._camera.position.y += (this.pos.y - this._camera.position.y) * spd;
			this._camera.position.z += (this.pos.z - this._camera.position.z) * spd;
		}
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
		dom.style.zIndex = "1000";
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
		typo.Textures.init();
		this._texture1 = typo.Textures.getTexture();
		this._texture2 = typo.Textures.getTexture();
		this.color = new THREE.ShaderPass(effect.shaders.LuminosityShader.getObject(this._texture1));
		this._composer.addPass(this.color);
		this.color.renderToScreen = true;
		this._copyPass.clear = true;
		this._copyPass.renderToScreen = true;
		if(this._callback != null) this._callback();
	}
	,changeTexture: function() {
		this._texture1 = typo.Textures.getTexture();
		this._texture2 = typo.Textures.getTexture();
	}
	,setting: function() {
	}
	,render: function() {
		this.color.uniforms.texture.value = this._texture1;
		this.color.uniforms.texture2.value = this._texture2;
		this._composer.render();
	}
	,update: function(audio) {
	}
	,resize: function(ww,hh) {
		this._composer.setSize(ww,hh);
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
	return { uniforms : { tDiffuse : { type : "t", value : null}, vScreenSize : { type : "v2", value : new THREE.Vector2(window.innerWidth,window.innerHeight)}}, vertexShader : "varying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "\r\n#define R_LUMINANCE 0.298912\r\n#define G_LUMINANCE 0.586611\r\n#define B_LUMINANCE 0.114478\r\n\r\nvarying vec2 vUv;\r\nuniform sampler2D tDiffuse;\r\nuniform vec2 vScreenSize;\r\n\r\nvoid main() {\r\n\r\n\tvec4 color = texture2D(tDiffuse, vUv);\r\n\r\n\tfloat x = floor( vUv.x * vScreenSize.x  );\r\n\tfloat y = floor( vUv.y * vScreenSize.y );\r\n\r\n\t// 4ピクセルごとに使用する閾値の表\r\n\tmat4 m = mat4(\r\n\t\t    vec4( 0.0,  8.0,    2.0,    10.0),\r\n\t\t    vec4( 12.0, 4.0,    14.0,   6.0),\r\n\t\t    vec4( 3.0,  11.0,   1.0,    9.0),\r\n\t\t    vec4( 15.0, 7.0,    13.0,   5.0)\r\n\t\t);\r\n\r\n\tfloat xi = mod( x,4.0) ;\r\n\tfloat yi = mod( y,4.0) ;\r\n\r\n\tfloat threshold = 0.0;\r\n\r\n\tif( xi == 0.0 )\r\n\t{\r\n\t    if( yi == 0.0 ) { threshold = m[0][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[0][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[0][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[0][3]; }\r\n\t}\r\n\tif( xi == 1.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[1][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[1][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[1][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[1][3]; }\r\n\t}\r\n\tif( xi == 2.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[2][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[2][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[2][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[2][3]; }\r\n\t}\r\n\tif( xi == 3.0) {\r\n\t    if( yi == 0.0 ) { threshold = m[3][0]; }\r\n\t    if( yi == 1.0 ) { threshold = m[3][1]; }\r\n\t    if( yi == 2.0 ) { threshold = m[3][2]; }\r\n\t    if( yi == 3.0 ) { threshold = m[3][3]; }\r\n\t}\r\n\r\n\tcolor = color * 16.0;\r\n\r\n\tfloat v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;\r\n\r\n\tif (v <threshold ) {\r\n\t    color.x = 0.0;\r\n\t    color.y = 0.0;\r\n\t    color.z = 0.0;\r\n\t} else {\r\n\t    color.x = 1.0;\r\n\t    color.y = 1.0;\r\n\t    color.z = 1.0;\r\n\t}\r\n     // 描画\r\n     gl_FragColor = color;\r\n\r\n}"};
};
effect.shaders.LuminosityShader = function() {
};
effect.shaders.LuminosityShader.getObject = function(tt) {
	return { uniforms : { tDiffuse : { type : "t", value : null}, texture : { type : "t", value : tt}, texture2 : { type : "t", value : tt}}, vertexShader : "\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t\t}\t\t\t\t\r\n\t\t\t\t", fragmentShader : "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D texture;\r\n\t\t\t\t\tuniform sampler2D texture2;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\r\n\t\t\t\t\t\tfloat v = dot( texel.xyz, luma );//akarusa\r\n\t\t\t\t\t\tvec2 axis = vec2( 0.5,v );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 pa = texture2D( tDiffuse, vUv);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 pb = texture2D( texture, axis);\r\n\t\t\t\t\t\t//vec4 pb = mix( texture2D( tDiffuse, vUv), texture2D( texture, axis), 0.6+0.4*vUv.y);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//fu tatsu wo mazeteiru\r\n\t\t\t\t\t\tvec4 pb = mix( texture2D( texture2, axis), texture2D( texture, axis), vUv.y);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = vec4( pb.x,pb.y,pb.z, 1.0 );\r\n\t\t\t\t\t}\r\n\t\t\t\t"};
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
var logo = {};
logo.LogoData = function(o) {
	this.color2 = 0;
	this.color1 = 0;
	this.h = 0;
	this.w = 0;
	this.y = 0;
	this.x = 0;
	this.x = o.frame.x;
	this.y = o.frame.y;
	this.w = o.frame.w;
	this.h = o.frame.h;
	this.filename = o.filename;
};
logo.LogoData.prototype = {
	setWhite: function(b) {
		if(b) this.mate2.color = new THREE.Color(10066431); else this.mate2.color = new THREE.Color(this.color2);
	}
};
logo.LogoMaterialMaker = function() {
};
logo.LogoMaterialMaker.prototype = {
	init: function(ary,texture,ww,hh) {
		this._datalist = [];
		var _g1 = 0;
		var _g = ary.length;
		while(_g1 < _g) {
			var i = _g1++;
			var data = new logo.LogoData(ary[i]);
			var tt = texture.clone();
			tt.needsUpdate = true;
			tt.offset.x = data.x / ww;
			tt.offset.y = 1 - (data.y + data.h) / hh;
			tt.repeat.x = data.w / ww;
			tt.repeat.y = data.h / hh;
			tt.minFilter = 1003;
			tt.magFilter = 1003;
			var lumi = 255;
			var lumi2 = 210;
			var rgbA = lumi << 16 | lumi << 8 | lumi;
			var rgbB = lumi2 << 16 | lumi2 << 8 | lumi2;
			var mate1 = new THREE.MeshBasicMaterial({ map : tt, side : 0, transparent : true, color : rgbA, alphaTest : 0.9});
			var mate2 = new THREE.MeshBasicMaterial({ map : tt, side : 1, transparent : true, color : rgbB, alphaTest : 0.9});
			data.texture = tt;
			data.mate1 = mate1;
			data.mate2 = mate2;
			data.color1 = rgbA;
			data.color2 = rgbB;
			this._datalist[i] = data;
		}
	}
	,getData: function(index) {
		return this._datalist[index];
	}
};
logo.LogoParam = function() {
};
logo.LogoParam.getParam = function() {
	return { frames : [{ filename : "sheet0000", frame : { x : 4, y : 4, w : 438, h : 114}, rotated : false, trimmed : false, spriteSourceSize : { x : 0, y : 0, w : 438, h : 114}, sourceSize : { w : 438, h : 114}},{ filename : "sheet0001", frame : { x : 4, y : 122, w : 438, h : 114}, rotated : false, trimmed : false, spriteSourceSize : { x : 0, y : 0, w : 438, h : 114}, sourceSize : { w : 438, h : 114}},{ filename : "sheet0002", frame : { x : 4, y : 240, w : 438, h : 114}, rotated : false, trimmed : false, spriteSourceSize : { x : 0, y : 0, w : 438, h : 114}, sourceSize : { w : 438, h : 114}}], meta : { app : "Adobe Animate", version : "15.1.1.13", image : "sheet1.png", format : "RGBA8888", size : { w : 512, h : 512}, scale : "1"}};
};
logo.Logos = function() {
};
logo.Logos.init = function(callback) {
	logo.Logos._texture = THREE.ImageUtils.loadTexture("sheet/sheet1.png",null,callback);
};
logo.Logos.init2 = function() {
	var param = logo.LogoParam.getParam();
	var ww = param.meta.size.w;
	var hh = param.meta.size.h;
	var maker = new logo.LogoMaterialMaker();
	maker.init(param.frames,logo.Logos._texture,ww,hh);
	logo.Logos._logos = [];
	var _g1 = 0;
	var _g = param.frames.length;
	while(_g1 < _g) {
		var i = _g1++;
		var data = maker.getData(i);
		logo.Logos._logos.push(data);
	}
};
logo.Logos.getBaseTexture = function() {
	return logo.Logos._texture;
};
logo.Logos.getRandom = function() {
	return logo.Logos._logos[0];
};
logo.Logos.getTextureByName = function(s) {
	var _g1 = 0;
	var _g = logo.Logos._logos.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(logo.Logos._logos[i].filename == s) return logo.Logos._logos[i];
	}
	return null;
};
logo.Logos.getTexture = function(idx) {
	return logo.Logos._logos[idx];
};
logo.Logos.getLength = function() {
	return logo.Logos._logos.length;
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
var typo = {};
typo.CamTarget = function() {
	this.sinPos = new THREE.Vector3();
	this._speed = 0;
	this._count = new THREE.Vector3();
	THREE.Mesh.call(this,new THREE.OctahedronGeometry(30),new THREE.MeshBasicMaterial({ wireframe : true, color : 16777215}));
};
typo.CamTarget.__super__ = THREE.Mesh;
typo.CamTarget.prototype = $extend(THREE.Mesh.prototype,{
	init: function(data) {
		this._data = data;
	}
	,update: function() {
		this._updateSinPos();
		if(this._data.camPosMode == "MODE_FOLLOW") this._updateFollow(); else this._updateZero();
	}
	,_updateSinPos: function() {
		this.rotation.x += 0.02;
		this.rotation.y += 0.02;
		this.rotation.z += 0.02;
		this._count.x += this._speed + 0.5;
		this._count.y += this._speed * 1.25 + 1;
		this.sinPos.x = Math.cos(this._count.x / 20) * 1000 + 100 * Math.sin(this._count.y / 100);
		this.sinPos.y = Math.sin(this._count.x / 45) * 1000;
		this.sinPos.z = Math.sin(this._count.x / 25) * 1000 + 100 * Math.cos(this._count.y / 100);
	}
	,_updateZero: function() {
		this.position.x += (0 - this.position.x) / 4;
		this.position.y += (0 - this.position.y) / 4;
		this.position.z += (0 - this.position.z) / 4;
	}
	,_updateFollow: function() {
		this.position.x = this.sinPos.x;
		this.position.y = this.sinPos.y;
		Math.sin(this._count.x / 45) * 1000;
		this.position.z = this.sinPos.z;
		Math.sin(this._count.x / 25) * 1000 + 100 * Math.cos(this._count.y / 100);
	}
	,setSpeed: function(f) {
		this._speed = f + 0.01;
	}
	,_getNoise: function(xx,yy,zz) {
		var f = noise.perlin3;
		var n = f(xx,yy,zz);
		return n;
	}
});
typo.Dot = function() {
	this._countLim = 0;
	this._count = 0;
	this._sh = 0;
	this._sw = 0;
	this._flag = false;
	this.isActive = false;
	this.vz = 0;
	this.vy = 0;
	this.vx = 0;
	THREE.Object3D.call(this);
	this._target = new THREE.Vector3();
	this.plane = new typo.TypoCanvasPlane();
	this.plane.init();
	this.plane.rotation.y = Math.PI / 2;
	this.add(this.plane);
};
typo.Dot.__super__ = THREE.Object3D;
typo.Dot.prototype = $extend(THREE.Object3D.prototype,{
	init: function(data) {
		this._data = data;
		this.vx = 7 * (Math.random() - 0.5);
		this.vy = 7 * (Math.random() - 0.5);
		this.vz = 7 * (Math.random() - 0.5);
		this.renderOrder = typo.Dot._order++;
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;
		if(this._data.maxLife == -1) this._countLim = -1; else this._countLim = typo.Dot._order + this._data.maxLife;
	}
	,getAbsV: function() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy + this.vz * this.vz);
	}
	,normalizeV: function(n) {
		var v = new THREE.Vector3(this.vx,this.vy,this.vz);
		this.vx = v.normalize().x * n;
		this.vy = v.normalize().y * n;
		this.vz = v.normalize().z * n;
	}
	,look: function() {
		this._target.x += (this.position.x + 8 * this.vx - this._target.x) / 12;
		this._target.y += (this.position.y + 8 * this.vy - this._target.y) / 12;
		this._target.z += (this.position.z + 8 * this.vz - this._target.z) / 12;
		this.lookAt(this._target);
	}
	,update: function(pos) {
		this._count++;
		if(this._countLim != -1 && this._count > this._countLim) {
		}
		if(this.plane != null) this.plane.update();
	}
	,hide: function() {
	}
	,setActive: function(bb) {
		this.isActive = bb;
		this.visible = bb;
	}
	,reset: function(pos) {
		this._count = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.position.x = pos.x;
		this.position.y = pos.y;
		this.position.z = pos.z;
	}
	,changeMat: function(isWhite) {
		if(isWhite) this.plane.changeMat(true); else this.plane.changeMat(false);
	}
});
typo.Dots = function() {
	this._camType = "";
	this._gene = false;
	this._count = 0;
	this._tgtSpeed = 10;
	this._activeNum = 0;
	this._limV = 20;
	this._forceC = 0.005;
	this._forceB = 0.005;
	this._forceA = 0.005;
	this._limC = 120;
	this._limB = 90;
	this._limA = 60;
	this._cutName = "";
	this.number_of_points = 180;
	this._d = 0;
	this._h = 0;
	this._w = 0;
	THREE.Object3D.call(this);
};
typo.Dots.__super__ = THREE.Object3D;
typo.Dots.prototype = $extend(THREE.Object3D.prototype,{
	init: function(w,h) {
		this._cube = new Cube();
		this._cube.init();
		this._balance = new THREE.Mesh(new THREE.BoxGeometry(4,4,4),new THREE.MeshBasicMaterial({ color : 16777215}));
		this.add(this._balance);
		var g = new THREE.Geometry();
		g.vertices.push(new THREE.Vector3(0,0,0));
		g.vertices.push(new THREE.Vector3(0,0,0));
		this._line = new THREE.Line(g,new THREE.MeshBasicMaterial({ color : 16777215}));
		typo.data.CutParams.init();
		this._activeNum = this.number_of_points;
		this.targetObj = new typo.CamTarget();
		this.add(this.targetObj);
		this.dots = new Array();
		var _g1 = 0;
		var _g = this.number_of_points;
		while(_g1 < _g) {
			var i = _g1++;
			var dot = new typo.Dot();
			dot.position.x = 2000 * (Math.random() - 0.5);
			dot.position.y = 2000 * (Math.random() - 0.5);
			dot.position.z = 2000 * (Math.random() - 0.5);
			this.add(dot);
			this.dots.push(dot);
		}
		this.distance = new Array();
		common.Dat.gui.add(this,"_gene").listen();
		common.Dat.gui.add(this,"_camType").listen();
		common.Dat.gui.add(this,"_limA",10,1500).listen();
		common.Dat.gui.add(this,"_limB",10,1500).listen();
		common.Dat.gui.add(this,"_limC",10,1500).listen();
		common.Dat.gui.add(this,"_forceA",0.0025,2).listen();
		common.Dat.gui.add(this,"_forceB",0.0025,2).listen();
		common.Dat.gui.add(this,"_forceC",0.0025,2).listen();
		common.Dat.gui.add(this,"_limV",0,100).listen();
		common.Dat.gui.add(this,"_tgtSpeed",0,100);
		common.Dat.gui.add(this,"removeParams");
		common.Dat.gui.add(this,"reset");
		common.Dat.gui.add(this,"change");
		common.Dat.gui.add(this,"_cutName").listen();
		common.Dat.gui.close();
		var d = typo.data.CutParams.getNextData();
		d.init(this);
		this.initParams(d);
		this.calcMotion();
		common.Key.board.addEventListener("keydown",$bind(this,this._onKeyDown));
	}
	,change: function() {
	}
	,_onKeyDown: function(e) {
		console.log("keydown");
		var _g = Std.parseInt(e.keyCode);
		switch(_g) {
		case 39:
			var d = typo.data.CutParams.getNextData();
			d.init(this);
			this.initParams(d);
			d.nextcCam();
			d.tween();
			this._gene = d.getGene();
			this._camType = d.camPosMode;
			this.reset();
			this._doRot();
			break;
		case 70:
			this._currentData.addForce();
			break;
		}
	}
	,_doRot: function() {
		this.camera.amp = 2800;
		if(Math.random() < 0.08) this.camera.amp = 6000;
		TweenMax.to(this.camera,0.8,{ radX : this.camera.radX + Math.PI * 2});
	}
	,reset: function() {
		if(this._currentData != null) this._currentData.reset();
	}
	,removeParams: function() {
		this._currentData = null;
	}
	,initParams: function(d) {
		if(this._currentData != null) this._currentData.kill();
		this._currentData = d;
		var _g1 = 0;
		var _g = this.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.dots[i].init(this._currentData);
		}
		this._cube.setScale(this._currentData.size);
		this._cutName = this._currentData.name;
		this._w = this._currentData.size.x;
		this._h = this._currentData.size.y;
		this._d = this._currentData.size.z;
		this.targetObj.init(this._currentData);
	}
	,update: function(audio,cam) {
		this.camera = cam;
		if(this._currentData != null) {
			this._currentData.update(audio);
			this._limA = this._currentData.limA;
			this._limB = this._currentData.limB;
			this._limC = this._currentData.limC;
			this._forceA = this._currentData.forceA;
			this._forceB = this._currentData.forceB;
			this._forceC = this._currentData.forceC;
			this._limV = this._currentData.limV;
			cam.posMode = this._currentData.camPosMode;
			this._activeNum = Math.floor(this._currentData.numRatio * this.number_of_points);
		}
		this.calcDistance();
		this.calcMotion();
		this.targetObj.update();
	}
	,calcMotion: function() {
		this._balance.position.set(0,0,0);
		var count = 0;
		var _g1 = 0;
		var _g = this.number_of_points;
		while(_g1 < _g) {
			var i = _g1++;
			var t = this.dots[i];
			if(i < this._activeNum) t.setActive(true); else t.setActive(false);
			var b = i * this.number_of_points;
			var acp = new THREE.Vector3();
			var ac = 0;
			var atp = new THREE.Vector3();
			var at = 0;
			var vp = new THREE.Vector3();
			var vc = 0;
			var _g3 = 0;
			var _g2 = this.number_of_points;
			while(_g3 < _g2) {
				var j = _g3++;
				var dis = this.distance[b + j];
				var tb;
				var dx = 0;
				var dy = 0;
				var dz = 0;
				if(i == j) continue;
				if(dis < this._limA) {
					tb = this.dots[j];
					dx = t.position.x - tb.position.x;
					dy = t.position.y - tb.position.y;
					dz = t.position.z - tb.position.z;
					acp.x += dx * this._forceA;
					acp.y += dy * this._forceA;
					acp.z += dz * this._forceA;
					ac++;
				} else if(dis < this._limB) {
					tb = this.dots[j];
					dx = tb.vx;
					dy = tb.vy;
					dz = tb.vz;
					vp.x += dx * this._forceB;
					vp.y += dy * this._forceB;
					vp.z += dz * this._forceB;
					vc++;
				} else if(dis < this._limC) {
					tb = this.dots[j];
					dx = t.position.x - tb.position.x;
					dy = t.position.y - tb.position.y;
					dz = t.position.z - tb.position.z;
					atp.x += dx * this._forceC;
					atp.y += dy * this._forceC;
					atp.z += dz * this._forceC;
					at++;
				}
			}
			if(ac > 0) {
				t.vx += acp.x / ac;
				t.vy += acp.y / ac;
				t.vz += acp.z / ac;
			}
			if(at > 0) {
				t.vx -= atp.x / at;
				t.vy -= atp.y / at;
				t.vz -= atp.z / at;
			}
			if(vc > 0) {
				t.vx += vp.x / vc;
				t.vy += vp.y / vc;
				t.vz += vp.z / vc;
			}
			if(t.getAbsV() > this._limV) t.normalizeV(this._limV);
			var nx = t.position.x + t.vx;
			var ny = t.position.y + t.vy;
			var nz = t.position.z + t.vz;
			t.look();
			if(this._currentData.limitLoop) {
				if(nx < -this._w) {
					nx = this._w;
					t.position.x = nx;
				} else if(nx > this._w) {
					nx = -this._w;
					t.position.x = nx;
				}
				if(ny < -this._h) {
					ny = this._h;
					t.position.y = ny;
				} else if(ny > this._h) {
					ny = -this._h;
					t.position.y = ny;
				}
				if(nz < -this._d) {
					nz = this._d;
					t.position.z = nz;
				} else if(nz > this._d) {
					nz = -this._d;
					t.position.z = nz;
				}
			} else {
				if(nx < -this._w) {
					nx = -this._w;
					t.vx *= -1;
				}
				if(nx > this._w) {
					nx = this._w;
					t.vx *= -1;
				}
				if(ny < -this._h) {
					ny = -this._h;
					t.vy *= -1;
				}
				if(ny > this._h) {
					ny = this._h;
					t.vy *= -1;
				}
				if(nz < -this._d) {
					nz = -this._d;
					t.vz *= -1;
				}
				if(nz > this._d) {
					nz = this._d;
					t.vz *= -1;
				}
			}
			this.calcTarget(t);
			t.position.x += (nx - t.position.x) / 4;
			t.position.y += (ny - t.position.y) / 4;
			t.position.z += (nz - t.position.z) / 4;
			t.update(this.targetObj.position);
			count++;
			this._balance.position.x += t.position.x;
			this._balance.position.y += t.position.y;
			this._balance.position.z += t.position.z;
		}
		this._balance.position.x = this._balance.position.x / count;
		this._balance.position.y = this._balance.position.y / count;
		this._balance.position.z = this._balance.position.z / count;
		this._line.geometry.verticesNeedUpdate = true;
		this._line.geometry.vertices[0].x = this._balance.position.x;
		this._line.geometry.vertices[0].y = this._balance.position.y;
		this._line.geometry.vertices[0].z = this._balance.position.z;
		this._line.geometry.vertices[1].x = this.targetObj.position.x;
		this._line.geometry.vertices[1].y = this.targetObj.position.y;
		this._line.geometry.vertices[1].z = this.targetObj.position.z;
	}
	,setNum: function(ratio) {
		var len = this.dots.length;
		var num = Math.floor(len * ratio);
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(i < num) this.dots[i].setActive(true); else this.dots[i].setActive(false);
		}
	}
	,calcTarget: function(t) {
	}
	,resize: function(w,h) {
		this._w = w;
		this._h = h;
	}
	,setWhite: function(b) {
		this._cube.setWhite(b);
		var _g1 = 0;
		var _g = this.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.dots[i].changeMat(b);
		}
	}
	,calcDistance: function() {
		var _g1 = 0;
		var _g = this.number_of_points;
		while(_g1 < _g) {
			var a = _g1++;
			var ta = this.dots[a];
			var _g3 = a + 1;
			var _g2 = this.number_of_points;
			while(_g3 < _g2) {
				var b = _g3++;
				var tb = this.dots[b];
				var dx = ta.position.x - tb.position.x;
				var dy = ta.position.y - tb.position.y;
				var dz = ta.position.z - tb.position.z;
				var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
				this.distance[a + b * this.number_of_points] = d;
				this.distance[a * this.number_of_points + b] = d;
			}
		}
	}
	,getActiveNum: function() {
		return this._activeNum;
	}
});
typo.Textures = function() {
};
typo.Textures.init = function() {
	typo.Textures._textures = [THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade1.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade2.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade3.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade4.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade5.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade6.png"),THREE.ImageUtils.loadTexture("../../assets/" + "grade/grade7.png")];
};
typo.Textures.getTexture = function() {
	return typo.Textures._textures[Math.floor(Math.random() * typo.Textures._textures.length)];
};
typo.TypoCanvasPlane = function() {
	this._scale = 1.5;
	this._index = 0;
	this._count = 0;
	this._spaceX = 0;
	this.SEG_Y = 1;
	this.SEG_X = 16;
	THREE.Object3D.call(this);
};
typo.TypoCanvasPlane.__super__ = THREE.Object3D;
typo.TypoCanvasPlane.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._v0 = new THREE.Vector3();
		this._v1 = new THREE.Vector3();
		this._positions = [];
		this._distance = [[],[]];
		this._cubes = [];
		this._index = Math.floor(logo.Logos.getLength() * Math.random());
		var data = logo.Logos.getRandom();
		this._spaceX = data.w * this._scale / this.SEG_X;
		this.geo = new THREE.PlaneBufferGeometry(data.w * this._scale,data.h * this._scale,this.SEG_X,this.SEG_Y);
		this._geoPos = this.geo.attributes.position.array;
		this._plane = new THREE.Mesh(this.geo,data.mate1);
		this.add(this._plane);
		this._plane2 = new THREE.Mesh(this.geo,data.mate2);
		this.add(this._plane2);
	}
	,changeMat: function(isWhite) {
		var data = logo.Logos.getRandom();
		this._spaceX = data.w * this._scale / this.SEG_X;
		data.setWhite(isWhite);
		this._plane.material = data.mate1;
		this._plane2.material = data.mate2;
	}
	,setScale: function(s) {
		this.scale.set(s,s,s);
	}
	,update: function() {
		var pos = [];
		pos[0] = this._getVertex(0,0).clone();
		pos[1] = this._getVertex(0,1).clone();
		this._positions.unshift(pos);
		if(this._positions.length > this.SEG_X + 1) this._positions.pop();
		this._updateSin();
	}
	,_updateSin: function() {
		this.geo.attributes.position.needsUpdate = true;
		var p0 = this._plane.worldToLocal(this._positions[0][0].clone());
		var p1 = this._plane.worldToLocal(this._positions[0][1].clone());
		this._setVertex(this._getVertexIndex(0,0),p0.x,p0.y,p0.z);
		this._setVertex(this._getVertexIndex(0,1),p1.x,p1.y,p1.z);
		var pB0 = p0.clone();
		var pB1 = p1.clone();
		var _g1 = 1;
		var _g = this._positions.length;
		while(_g1 < _g) {
			var i = _g1++;
			var pA0 = this._plane.worldToLocal(this._positions[i][0].clone());
			var pA1 = this._plane.worldToLocal(this._positions[i][1].clone());
			var v0 = new THREE.Vector3(pA0.x - pB0.x,pA0.y - pB0.y,pA0.z - pB0.z);
			var v1 = new THREE.Vector3(pA1.x - pB1.x,pA1.y - pB1.y,pA1.z - pB1.z);
			v0.normalize();
			v0.multiplyScalar(this._spaceX);
			v1.normalize();
			v1.multiplyScalar(this._spaceX);
			p0.add(v0);
			p1.add(v1);
			this._setVertex(this._getVertexIndex(i,0),p0.x,p0.y,p0.z);
			this._setVertex(this._getVertexIndex(i,1),p1.x,p1.y,p1.z);
			pB0 = pA0;
			pB1 = pA1;
		}
	}
	,_setVertex: function(idx,xx,yy,zz) {
		this._geoPos[idx * 3] = xx;
		this._geoPos[idx * 3 + 1] = yy;
		this._geoPos[idx * 3 + 2] = zz;
	}
	,_getVertex: function(i,j) {
		var index = this._getVertexIndex(i,j);
		var vv = new THREE.Vector3(this._geoPos[index * 3],this._geoPos[index * 3 + 1],this._geoPos[index * 3 + 2]);
		return this._plane.localToWorld(vv.clone());
	}
	,_getVertexIndex: function(i,j) {
		return j * (this.SEG_X + 1) + i % (this.SEG_X + 1);
	}
});
typo.data = {};
typo.data.CutData = function() {
	this.firstTweenTime = 1;
	this.limitLoop = false;
	this.offsetV = 0;
	this.name = "";
	this.limV = 60;
	this.forceC = 0;
	this.forceB = 0;
	this.forceA = 0;
	this.limC = 0;
	this.limB = 0;
	this.limA = 0;
	this.size = new THREE.Vector3(2000,2000,2000);
	this.numRatio = 1;
	this.camPosMode = "MODE_NORMAL";
	this.maxLife = -1;
	this._gene = false;
	this._frame = 0;
	this._count = 0;
};
typo.data.CutData.prototype = {
	init: function(d) {
		this._dots = d;
		this._camera = d.camera;
	}
	,tween: function() {
		var tgt = this.numRatio;
		this.numRatio = 0;
		if(this._twn != null) this._twn.kill();
		this._twn = TweenMax.to(this,this.firstTweenTime,{ numRatio : tgt, ease : Power0.easeInOut});
	}
	,update: function(a) {
		if(this._camera == null) return;
		if(this._gene) {
			var spd = Math.pow(a.freqByteData[6] / 255,1.5);
			this._dots.targetObj.setSpeed(0.01 + spd);
			this._frame++;
			if(spd > 0.05 || this._frame > 5) {
				this._frame = 0;
				this._count++;
				var d = this._dots.dots[this._count % this._dots.getActiveNum()];
				if(d != null) {
					var pos = this._dots.targetObj.sinPos.clone();
					pos.x += 20 * (Math.random() - 0.5);
					pos.y += 20 * (Math.random() - 0.5);
					pos.z += 20 * (Math.random() - 0.5);
					d.reset(pos);
				}
			}
			if(this.camPosMode == "MODE_FOLLOW") {
				this._camera.target.x = this._dots.targetObj.position.x;
				this._camera.target.y = this._dots.targetObj.position.y;
				this._camera.target.z = this._dots.targetObj.position.z;
			} else this._camera.radX += Math.PI / 900;
		} else {
			this._camera.radX += Math.PI / 900;
			this._camera.target.x = 0;
			this._camera.target.y = 0;
			this._camera.target.z = 0;
		}
	}
	,_getNoise: function(xx,yy,zz) {
		var f = noise.perlin3;
		var n = f(xx,yy,zz);
		return n;
	}
	,addForce: function() {
		this.offsetV = 600;
		TweenMax.to(this,0.5,{ offsetV : 0});
		var dir;
		if(Math.random() < 0.5) dir = 1; else dir = -1;
		var _g1 = 0;
		var _g = this._dots.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			var vv = this._dots.dots[i].position.clone();
			vv.normalize();
			var amp = 350 * Math.random();
			this._dots.dots[i].vx += dir * vv.x * amp;
			this._dots.dots[i].vy += dir * vv.y * amp;
			this._dots.dots[i].vz += dir * vv.z * amp;
		}
	}
	,reset: function() {
		var ran = Math.random();
		if(ran < 0.5) {
			var _g1 = 0;
			var _g = this._dots.dots.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._dots.dots[i].position.x = 0;
				this._dots.dots[i].position.y = 0;
				this._dots.dots[i].position.z = 0;
			}
		} else {
			var tgt1 = new THREE.Vector3(700,0,0);
			var tgt2 = new THREE.Vector3(-700,0,0);
			var ran1 = Math.random();
			if(ran1 < 0.33) {
				tgt1 = new THREE.Vector3(0,700,0);
				tgt2 = new THREE.Vector3(0,-700,0);
			} else if(ran1 < 0.66) {
				tgt1 = new THREE.Vector3(-700,700,700);
				tgt2 = new THREE.Vector3(700,-700,-700);
			}
			var _g11 = 0;
			var _g2 = this._dots.dots.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this._setPos(this._dots.dots[i1],Math.random() < 0.5?tgt1:tgt2);
			}
		}
	}
	,_setPos: function(dot,tgt) {
		var radX = Math.random() * 2 * Math.PI;
		var radY = Math.random() * 2 * Math.PI;
		var amp = 300 * Math.random();
		var amp1 = amp * Math.cos(radY);
		var xx = tgt.x + amp1 * Math.sin(radX);
		var yy = tgt.y + amp * Math.sin(radY);
		var zz = tgt.z + amp1 * Math.cos(radX);
		dot.position.x = xx;
		dot.position.y = yy;
		dot.position.z = zz;
	}
	,nextcCam: function() {
		typo.data.CutData._typ++;
		if(typo.data.CutData._typ >= 3) typo.data.CutData._typ = 0;
		this.firstTweenTime = 2 + 3 * Math.random();
		if(Math.random() < 0.7) this.firstTweenTime = 0;
		var _g = typo.data.CutData._typ;
		switch(_g) {
		case 0:
			this.camPosMode = "MODE_NORMAL";
			this._gene = false;
			break;
		case 1:
			this.camPosMode = "MODE_NORMAL";
			this._gene = true;
			break;
		case 2:
			this.camPosMode = "MODE_NORMAL";
			this._gene = true;
			break;
		}
	}
	,getGene: function() {
		return this._gene;
	}
	,getTyp: function() {
		return typo.data.CutData._typ;
	}
	,kill: function() {
		if(this._twn != null) this._twn.kill();
	}
};
typo.data.CutDataA = function() {
	this._idxC2 = 0;
	this._idxB2 = 0;
	this._idxA2 = 0;
	this._idxC1 = 0;
	this._idxB1 = 0;
	this._idxA1 = 0;
	typo.data.CutData.call(this);
};
typo.data.CutDataA.__super__ = typo.data.CutData;
typo.data.CutDataA.prototype = $extend(typo.data.CutData.prototype,{
	init: function(dots) {
		this.name = "cutA";
		this.limA = 150;
		this.limB = 200;
		this.limC = 300;
		this.forceA = 0.0166666666666666664;
		this.forceB = 0.01;
		this.forceC = 0.01;
		this.limitLoop = true;
		this._idxA1 = Math.floor(Math.random() * 15);
		this._idxB1 = Math.floor(Math.random() * 15);
		this._idxC1 = Math.floor(Math.random() * 15);
		this._idxA2 = Math.floor(Math.random() * 15);
		this._idxB2 = Math.floor(Math.random() * 15);
		this._idxC2 = Math.floor(Math.random() * 15);
		this.numRatio = 1;
		typo.data.CutData.prototype.init.call(this,dots);
	}
	,update: function(a) {
		this.forceA = Math.pow(a.freqByteData[this._idxA1] / 255,5) * 1.5 + 0.01;
		this.forceB = Math.pow(a.freqByteData[this._idxB1] / 255,5) + 0.01;
		this.forceC = Math.pow(a.freqByteData[this._idxC1] / 255,4) * 1.4 + 0.01;
		this.limA = Math.pow(a.freqByteData[this._idxA2] / 255,2) * 1200 + 150;
		this.limB = Math.pow(a.freqByteData[this._idxB2] / 255,2) * 500 + 350;
		this.limC = Math.pow(a.freqByteData[this._idxC2] / 255,2) * 500 + 550;
		var ff = Math.pow(a.freqByteData[3] / 255,2);
		this.limV = ff * 200 + 40 + this.offsetV;
		var _g1 = 0;
		var _g = this._dots.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._dots.dots[i].vx *= ff * 0.5 + 1;
			this._dots.dots[i].vy *= ff * 0.5 + 1;
			this._dots.dots[i].vz *= ff * 0.5 + 1;
		}
		typo.data.CutData.prototype.update.call(this,a);
	}
});
typo.data.CutDataB = function() {
	typo.data.CutData.call(this);
};
typo.data.CutDataB.__super__ = typo.data.CutData;
typo.data.CutDataB.prototype = $extend(typo.data.CutData.prototype,{
	init: function(dots) {
		this.name = "cutB";
		this.limA = 270;
		this.limB = 380;
		this.limC = 500;
		this.forceA = 0.41;
		this.forceB = 0.48;
		this.forceC = 0.005;
		this.size.set(2000,2000,2000);
		this.numRatio = 1;
		typo.data.CutData.prototype.init.call(this,dots);
	}
	,update: function(a) {
		typo.data.CutData.prototype.update.call(this,a);
	}
});
typo.data.CutDataC = function() {
	typo.data.CutData.call(this);
};
typo.data.CutDataC.__super__ = typo.data.CutData;
typo.data.CutDataC.prototype = $extend(typo.data.CutData.prototype,{
	init: function(dots) {
		this.name = "cutC";
		this.limA = 150;
		this.limB = 200;
		this.limC = 300;
		this.forceA = 1;
		this.forceB = 2;
		this.forceC = 0.0457;
		this.limitLoop = true;
		this.numRatio = 1;
		typo.data.CutData.prototype.init.call(this,dots);
	}
	,update: function(a) {
		this.forceA = Math.pow(a.freqByteData[1] / 255,3) * 5 + 1;
		var ff = Math.pow(a.freqByteData[3] / 255,4);
		this.limV = ff * 200 + 40;
		var _g1 = 0;
		var _g = this._dots.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Math.random() < 0.9) {
				this._dots.dots[i].vx *= ff * (0.5 + 0.7 * Math.random()) + 1;
				this._dots.dots[i].vy *= ff * (0.5 + 0.7 * Math.random()) + 1;
				this._dots.dots[i].vz *= ff * (0.5 + 0.7 * Math.random()) + 1;
			}
		}
		typo.data.CutData.prototype.update.call(this,a);
	}
});
typo.data.CutDataD = function() {
	typo.data.CutData.call(this);
};
typo.data.CutDataD.__super__ = typo.data.CutData;
typo.data.CutDataD.prototype = $extend(typo.data.CutData.prototype,{
	init: function(dd) {
		this.name = "cutD";
		this.limA = 150;
		this.limB = 200;
		this.limC = 300;
		this.forceA = 1;
		this.forceB = 2;
		this.forceC = 0.0457;
		this.maxLife = 10;
		typo.data.CutData.prototype.init.call(this,dd);
	}
	,update: function(a) {
		this._frame++;
		var ff = Math.pow(a.freqByteData[9] / 255,3);
		this.limV = ff * 50 + 40;
		var _g1 = 0;
		var _g = this._dots.dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._dots.dots[i].vx *= ff * 0.5 + 1;
			this._dots.dots[i].vy *= ff * 0.5 + 1;
			this._dots.dots[i].vz *= ff * 0.5 + 1;
		}
		typo.data.CutData.prototype.update.call(this,a);
	}
});
typo.data.CutParams = function() {
};
typo.data.CutParams.init = function() {
	typo.data.CutParams._params = [new typo.data.CutDataA(),new typo.data.CutDataB(),new typo.data.CutDataC(),new typo.data.CutDataD()];
};
typo.data.CutParams.getNextData = function() {
	typo.data.CutParams._count++;
	var d = typo.data.CutParams._params[typo.data.CutParams._count % typo.data.CutParams._params.length];
	return d;
};
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
camera.ExCamera.POS_NORMAL = "MODE_NORMAL";
camera.ExCamera.POS_FOLLOW = "MODE_FOLLOW";
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
common.Key.keydown = "keydown";
common.Path.assets = "../../assets/";
common.QueryGetter.NORMAL = 0;
common.QueryGetter.SKIP = 1;
common.QueryGetter._isInit = false;
common.QueryGetter.t = 0;
common.StageRef.$name = "webgl";
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
typo.Dot._order = 1;
typo.Textures._count = 0;
typo.data.CutData._typ = 0;
typo.data.CutParams._params = [];
typo.data.CutParams._count = -1;
Main.main();
})();
