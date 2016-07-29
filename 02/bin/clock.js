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
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
var Main = function() {
	window.onload = $bind(this,this.initialize);
};
Main.main = function() {
	new Main();
};
Main.prototype = {
	initialize: function(e) {
		var main = new Main3d();
		main.init();
	}
};
var Main3d = function() {
	this.scale = 1;
	this.counter = 0;
	this.clock = new THREE.Clock();
	this.animationFrameLength = 32;
	this.hh = canvas.CanvasSrc.H;
	this.ww = canvas.CanvasSrc.W;
};
Main3d.prototype = {
	init: function() {
		this.scene = new THREE.Scene();
		this._audio = new sound.MyAudio();
		this._audio.init();
		common.Dat.init();
		var W = 1280;
		var H = 720;
		Main3d.renderer = new THREE.WebGLRenderer({ devicePixelRatio : 1, antialias : false, preserveDrawingBuffer : true, alpha : true});
		Main3d.renderer.setSize(W,H);
		window.document.body.appendChild(Main3d.renderer.domElement);
		Main3d.renderer.domElement.style.position = "absolute";
		Main3d.renderer.domElement.style.zIndex = "2002";
		Main3d.renderer.domElement.style.width = "" + W;
		Main3d.renderer.domElement.style.height = "" + H;
		this.camera = new camera.ExCamera(30,W / H,2,2000);
		this.camera.init(Main3d.renderer.domElement);
		this.camera.amp = 1000;
		this.camera.position.z = 350;
		this.camera.lookAt(new THREE.Vector3());
		this._mosaic = new Mosaic();
		this._mosaic.init(this.scene,this.camera,Main3d.renderer);
		this.scene.add(this._mosaic);
		this.animate();
		common.Dat.gui.add(this.camera,"amp",10,20000).listen();
	}
	,goFullScreen: function() {
		window.document.body.webkitRequestFullscreen();
	}
	,onWindowResize: function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		Main3d.renderer.setSize(window.innerWidth,window.innerHeight);
	}
	,animate: function() {
		this._audio.update();
		this.camera.update();
		this.counter++;
		this._mosaic.update(this._audio);
		haxe.Timer.delay($bind(this,this.animate),Math.floor(33.3333333333333357));
	}
};
var Mosaic = function() {
	this._isAutoClear = false;
	this._mode = Mosaic.MODE_MOSAIC;
	THREE.Object3D.call(this);
};
Mosaic.__super__ = THREE.Object3D;
Mosaic.prototype = $extend(THREE.Object3D.prototype,{
	init: function(scene,camera,renderer) {
		this._scene = scene;
		this._renderer = renderer;
		this._camera = camera;
		this._emoji = new emoji.Emojis();
		this._emoji.init(this._scene,canvas.CanvasSrc.W,canvas.CanvasSrc.H);
		this._sliter = new planes.PlaneFactory();
		this._sliter.isActive = true;
		this._sliter.init();
		this.add(this._sliter);
		common.Dat.gui.add(this,"showMosaic");
		common.Dat.gui.add(this,"showSlitter");
		this.showMosaic();
		window.document.addEventListener("keydown",$bind(this,this._onKeyDown));
	}
	,_onKeyDown: function(e) {
		if(Std.parseInt(e.keyCode) == 67) {
			if(this._mode == Mosaic.MODE_MOSAIC) this.showSlitter(); else this.showMosaic();
		}
	}
	,showMosaic: function() {
		this._mode = Mosaic.MODE_MOSAIC;
		this._emoji.particles.visible = true;
		this._sliter.visible = false;
		this._isAutoClear = true;
		this._emoji.isActive = true;
		this._sliter.isActive = false;
	}
	,showSlitter: function() {
		this._mode = Mosaic.MODE_SLITTER;
		Mosaic.forceClear = true;
		this._emoji.particles.visible = false;
		this._sliter.visible = true;
		this._isAutoClear = false;
		this._emoji.isActive = false;
		this._sliter.isActive = true;
	}
	,update: function(audio) {
		if(this._sliter.visible) this._sliter.update(audio);
		if(this._emoji.particles.visible) this._emoji.update(audio);
		this._renderer.autoClearColor = this._isAutoClear;
		if(Mosaic.forceClear) this._renderer.autoClearColor = true;
		this._renderer.render(this._scene,this._camera);
		Mosaic.forceClear = false;
	}
});
var OsChecker = function() {
};
OsChecker.isMobile = function() {
	var s = OsChecker.osis();
	return s == OsChecker.IOS || s == OsChecker.ANDROID;
};
OsChecker.osis = function() {
	if(OsChecker._check("iPhone") >= 0 || OsChecker._check("iPad") >= 0 || OsChecker._check("iPod") >= 0) return OsChecker.IOS;
	if(OsChecker._check("Mac") >= 0) return OsChecker.MAC;
	if(OsChecker._check("Win") >= 0) return OsChecker.WIN;
	if(OsChecker._check("android") >= 0) return OsChecker.ANDROID;
	return OsChecker.ANDROID;
};
OsChecker._check = function(str) {
	return window.navigator.platform.indexOf(str);
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
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
	this.radX = 0;
	this.amp = 200.0;
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
		this._isMobile = OsChecker.isMobile();
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
var canvas = {};
canvas.CanvasData = function() {
};
canvas.CanvasData.prototype = {
	init: function(src) {
	}
	,update: function() {
		this._imageData = this._context.getImageData(0,0,canvas.CanvasSrc.W,canvas.CanvasSrc.H);
	}
	,getPixel: function(x,y) {
		var index = (x + y * canvas.CanvasSrc.W) * 4;
		var r = this._imageData.data[index];
		var g = this._imageData.data[index + 1];
		var b = this._imageData.data[index + 2];
		var a = this._imageData.data[index + 3];
		return (r + g + b) / 3;
	}
	,getImageData: function() {
		return this._imageData;
	}
};
canvas.CanvasSrc = function() {
};
canvas.CanvasSrc.prototype = {
	init: function() {
		this._renderer = new THREE.WebGLRenderer({ devicePixelRatio : 1, antialias : false});
		this._imageData = new Uint8Array(canvas.CanvasSrc.W * canvas.CanvasSrc.H * 4);
		this._renderer.setSize(Math.floor(canvas.CanvasSrc.W),Math.floor(canvas.CanvasSrc.H));
		this._renderer.domElement.style.zIndex = "100000";
		this._renderer.domElement.style.position = "absolute";
		this._renderer.domElement.style.top = "0";
		this._renderer.domElement.style.left = "0";
		this._renderer.setClearColor(new THREE.Color(0),1);
		this._camera = new camera.ExCamera(60,canvas.CanvasSrc.W / canvas.CanvasSrc.H,2,2000);
		this._camera.init();
		this._scene = new THREE.Scene();
		var light = new THREE.DirectionalLight(16777215,1);
		light.position.set(20,30,200);
		this._scene.add(light);
		var light2 = new THREE.AmbientLight(3355443);
		this._scene.add(light2);
		this._pp = new effect.PostProcessing2();
		this._pp.init(this._scene,this._camera,this._renderer);
		this._canvas = new canvas.CanvasData();
		this._canvas.init(this);
		this._primitives = new canvas.primitives.Primitives();
		this._primitives.init();
		this._scene.add(this._primitives);
	}
	,next: function() {
		this._primitives.next();
	}
	,update: function(a) {
		if(!a.isStart && a.freqByteData == null) return;
		this._primitives.update(a);
		this._camera.update();
		this._renderer.render(this._scene,this._camera);
		var context = this._renderer.getContext();
		context.readPixels(0,0,canvas.CanvasSrc.W,canvas.CanvasSrc.H,6408,5121,this._imageData);
	}
	,getPixel: function(x,y) {
		var index = (x + y * canvas.CanvasSrc.W) * 4;
		var r = this._imageData[index];
		var g = this._imageData[index + 1];
		var b = this._imageData[index + 2];
		var a = this._imageData[index + 3];
		return (r + g + b) / 3;
	}
};
canvas.primitives = {};
canvas.primitives.PrimitiveBase = function() {
	THREE.Object3D.call(this);
};
canvas.primitives.PrimitiveBase.__super__ = THREE.Object3D;
canvas.primitives.PrimitiveBase.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
	}
	,update: function(a) {
	}
});
canvas.primitives.ChannelLogo = function() {
	this._logos = [];
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.ChannelLogo.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.ChannelLogo.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		data.LogoPaths.init();
		var paths = data.LogoPaths.getPaths();
		var geo = new THREE.Geometry();
		var _g1 = 0;
		var _g = paths.length;
		while(_g1 < _g) {
			var i = _g1++;
			var p = paths[i];
			var list = p.getPoints();
			var shape = new THREE.Shape();
			var _g3 = 0;
			var _g2 = list.length;
			while(_g3 < _g2) {
				var j = _g3++;
				if(j == 0) shape.moveTo(list[j].x,list[j].y); else if(j == list.length - 1) {
					shape.lineTo(list[j].x,list[j].y);
					shape.lineTo(list[0].x,list[0].y);
				} else shape.lineTo(list[j].x,list[j].y);
			}
			var g = new THREE.ExtrudeGeometry(shape,{ amount : 20, bevelEnabled : false});
			geo.merge(g);
		}
		this._logos = [];
		var num = 10;
		var _g4 = 0;
		while(_g4 < num) {
			var i1 = _g4++;
			var mesh = new THREE.Mesh(geo,new THREE.MeshLambertMaterial({ color : 16711680}));
			mesh.scale.set(0.6,0.6,0.6);
			mesh.position.y = (i1 - 4) * 100;
			mesh.rotation.y = Math.PI / 20 * i1;
			this.add(mesh);
			this._logos.push(mesh);
		}
	}
	,update: function(a) {
		var _g1 = 0;
		var _g = this._logos.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._logos[i].rotation.y += Math.PI / 150 * i;
		}
	}
});
canvas.primitives.Cube = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Cube.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Cube.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var materials = [new THREE.MeshLambertMaterial({ color : 2293555}),new THREE.MeshLambertMaterial({ color : 4521728}),new THREE.MeshLambertMaterial({ color : 1179647}),new THREE.MeshLambertMaterial({ color : 3342591}),new THREE.MeshLambertMaterial({ color : 16711731}),new THREE.MeshLambertMaterial({ color : 16746496})];
		var cube = new THREE.Mesh(new THREE.BoxGeometry(130,130,130,10,10,10),new THREE.MeshFaceMaterial(materials));
		this.add(cube);
	}
});
canvas.primitives.Kitasenju = function() {
	this.a3 = "M-27,79.1c0.8,0,0.9,0,1.9-0.5c0.3-0.2,3.3-0.5,3.9-0.7c0.5-0.1,0.8-0.3,1.2-0.6c3,0,3.4,0.3,6,2c3.6,2.5,5.8,4.1,6.7,6.2c0.1,0.4,1.1,1.6,1.2,1.9c0.9,1.9,1,2.1,1,2.4c0,0.4-0.2,0.6-0.4,0.8v0.7c-1.6,1.4-1.8,1.6-3.3,2.8c-0.2,0.2-1.1,1.5-1.3,1.7c-1.2,1-1.3,1.1-1.8,2c-0.2,0.4-1.2,2.2-1.4,2.6c-0.3,0.4-1.1,3.2-1.3,3.7c-1.6,3.1-1.8,3.5-3.1,5.7c-0.5,0.7-0.8,1.5-1.2,2.5c1.4,1.2,1.5,1.4,2.5,1.9c0.3,0.1,3.8,4.3,3.8,6.5c0,0.9,0.2,5.1,0.1,6.1c0,0.3-0.3,1.8-0.3,2.2v10.2c0,1.1,0,5.3-0.1,6.1l-0.5,6.8v2c0.3,0.1,0.7,0.3,1,0.3c0.9,0,4.8-1,5.6-1c0.2,0,0.9,0.1,1,0l8.9-1.6c0.5,0,3.7-0.6,5.2-0.6c1.6,0,1.9,0,1.9-1c0-0.3-0.1-1.7-0.1-2L10,139c-0.2,0-3.8,0.4-4.2,0.5C5.4,139.6,4,140,3.7,140c-0.4,0-5.6-0.8-9.3-4.7c-0.6-0.5-4-3.1-4.1-3.7c0.1-0.2,0.5-0.5,0.8-0.5c2.9,0,6.7,0,9.3-0.5l8.3-1.5c1.6-0.3,2-0.3,2-1.4c0-0.4-0.2-2.1-0.2-2.5c0-7.3,0-8.8-1.2-8.8c-0.9,0-4.8,0.6-5.6,0.6c-4.9,0-15.2-5.6-15.3-6.9l-0.6-0.2v-1.1c2.1-0.2,2.7-0.2,3.9,0c0.7-0.4,5.3-1.1,5.5-1.1c1.4,0,1.7-0.1,4.5-0.8c0.8-0.2,4.4-0.6,5.2-0.8l6.8-1.4c0.5-0.1,1.1-0.2,1.5-0.3c1.4,0,3.4-0.4,4.9-0.7c1.3-0.3,7.1-1.1,8.1-1.7c0.3-0.2,1.5-2,1.7-2.3c0.1-0.2,1.3-1,1.5-1.2c0.6,0.3,3.6,0.8,4.2,1c3,1,3.2,1.4,5.4,3c0.5,0.3,2.5,1.6,2.7,2c0.1,0.3,0.7,1.8,0.8,2.1c-0.3,0.9-0.5,1.6-0.8,1.8c-0.7,0.5-2,1.2-2.6,1.7c-3.3,0.5-17.4,4-20.3,4.4v0.2c1.9,1.8,3.7,3.4,3.7,5.5c0,0.3,0,1.9,0.3,2.4c-0.1,0.3-0.6,1.8-0.6,2.1c0,0.3,0,0.5,0.3,1.4c1.4,0.1,1.6-0.1,3.8-1.2c0.2-0.2,1.3-0.9,1.5-0.9c0.3-0.1,1.4-0.6,1.7-0.6c0.3-0.1,1.3-0.2,1.8-0.2c0.4,0,2.2,1.1,2.6,1.2c3.8,1.7,4.4,1.9,6.5,4.5c0.2,0.3,0.5,0.9,0.5,1.5c0,1.3-1,4.1-3.9,4.4c-1.2,0.1-1.4,0.1-2,0.6c-2.6,0.2-5.3,0.4-7.7,0.6c-3.5,0.3-3.9,0.4-5.1,0.9c-0.2,0.8-0.2,1.1-0.2,1.8v0.8l-0.6,8.3l-0.6,1.3v0.4l0.6,0.2l7.7-0.9c0.5,0,2.9,0.1,3.4-0.1c1.8-0.7,2-0.8,2.9-1c0.3-0.1,1.4-1,1.7-1c0.8,0,8.2,5.3,8.3,5.4c0.3,0.3,1.5,1.6,1.7,2.1c1.1,3.8,1.2,4.2,1.2,4.5c0,0.7-0.6,1.5-1,1.9c-0.3,0.1-1.8,0.9-2.1,1c-0.5,0.1-0.8,0.1-1.1,0l-7.8-1c-2.8-0.4-7.2-1.4-10-1.4l-7.5,0.1c-3.8,0.1-4.2,0.3-6.7,0.6c-0.2,0-1.9,0.1-2.6,0.3c-0.3,0-1.9,0.5-2.2,0.6c-0.3,0-1.8,0.1-2.1,0.2c-0.9,0.1-4.6,1.3-5.4,1.2c-0.8,0.3-1,0.4-1.6,0.8c-0.7,0-0.8,0.1-1.1,0.4c-2.3,0-7.3-2.9-8.8-3.8c-0.6-0.4-3-2.5-3.6-2.8c-0.4,3.4-0.5,3.7-1.7,6.2l-0.7,0.3c-0.6,0.9-1.9,2.7-3.3,2.7c-1.3,0-2.1-0.4-2.4-0.6c-0.9-1-5.6-7.6-5.6-9.5c0-0.4,0.4-1.2,0.4-1.3v-2c0.2-0.3,1.3-1.7,1.4-2.1l0.6-0.4l0.2-1.5l1-11l0.5-9v-6.1l-0.1-0.4c-0.5,0.6-0.6,0.8-1.2,2.1c-0.9,1.7-6.5,8.5-9.1,11.1c-0.7,0.7-4.4,3.8-5,4.5c-0.2,0.2-1.2,0.6-1.4,0.7c-3.5,2.3-3.8,2.5-6.7,3.3c-0.2-0.3-0.2-0.4-0.2-0.6c0-0.9,0.2-1.2,2.4-4.4c0.1-0.2,12.5-25.8,13.5-28.2c1.6-3.6,8.3-22.2,8.8-23.2c0.2-2.2-1.5-3.7-3.2-5.2c-0.3-0.3-1.5-2-1.8-2.3L-27,79.1z M2.5,79.3l0.2-0.7c0.9,0.1,4.5,1.7,5.3,2c1.7,0.5,3.9,0.5,6.2,0.5c0.8,0,3.3-0.1,4-0.3c0.4-0.1,1.7-0.9,2.1-0.9c0.1,0,1,0.2,1.1,0.2c2.1,0,5.3,1.6,7.7,3c0.3,0.2,1.9,1.2,2.2,1.3c0.3,0.1,0.7,0.2,0.8,0.2c1,1.6,1.5,2.3,1.5,4.5l-0.4,0.3c-0.1,0.6-1.1,2.3-1.7,2.6c-0.7,0.4-2.3,0.9-3.4,1.3c-3.9,0-4.3,0-6.7,0.3c-2.6,0-9.9-1-11.7-2.8c-0.4-0.4-1.4-0.7-1.9-1.1C7,89,3.4,86,1.8,81.2c-0.1-0.3,0-1,0.1-2.1L2.5,79.3z";
	this.a2 = "M-44.9-0.7c0.3-0.1,0.9-0.2,1.3-0.1c0.3,0.2,0.9,0.3,1.1,0.4c0.2,0,0.8-0.2,1-0.2c0.7,0,3.9,0.1,4.6,0c0.1,0,1.7,0.3,2.1,0.3c0.1,0,0.8-0.3,0.9-0.3l8.4-1h0.5l10.5-1.3h0.5l8.9-0.8l2.2-0.5l0.2-1.4l-0.2-17.5c0-1.6,0-2.9-1-2.9c-0.5,0-6.5,1.2-7.7,1.2c-3.7,0-5-0.9-5.8-1.5l-5.1-3.7c-0.3-0.2-3-2.1-3.7-2.9c-0.2-0.2-1.8-1.8-3.2-3c0.2-0.1,0.5-0.4,0.7-0.4c0.3,0,1.7,0.4,2,0.5c0.3-0.3,0.5-0.4,0.8-0.4c0.3,0,0.7,0.1,0.9,0.2l0.6-0.2l0.5,0.6l4.1,0.4L-3-36.9l13.3-2.3c0.4-0.1,5.2-1.2,5.4-1.8c0.7-1.3,1-2.1,3-2.1c0.3,0,1,0.1,1.3,0c0.4,0,1.8-0.5,2.1-0.5c2,0,3.7,1.5,5.2,2.9c0.3,0.3,2.3,1.3,2.6,1.5c0.7,0.6,3.5,3.1,3.5,4.4c0,0.5-0.2,2.2-0.9,3c-0.6,0.1-3,1.5-3.5,1.7c-3.9,1.2-4.9,1.3-5.9,1.3c-0.4,0-2.7,0-3,0.1h-0.6l-8.2,1.2c-1,0.1-5.8,0.5-6.7,0.7c0.6,1.3,2.3,2.5,3.8,3.5c1.1,0.8,4.2,5.6,4.2,7.9c0,0.8-1,4-1.1,4.7l-0.3,5.9l0.1,0.3l11.6-0.9l3.9-0.4c1.1-1.5,2.5-3.3,5.8-3.3c2.1,0,5.7,0.9,7.8,2c7.6,4.1,8.4,4.6,8.4,8c0,2.1-0.8,2.7-1.3,3.2L47.1,4c-1.2,1.4-4.2,1.9-5.9,1.9c-0.4,0-2-0.4-2.3-0.4L27.6,4.6l-3.7-0.3L12.1,5.2l-1.5,0.2l-0.2,0.2v0.3l-0.2,11.8v0.7l0.4,8.7c0,0.3-0.2,1-0.2,1.3c0,0.2,0.1,1,0.1,1.2l-0.8,8.5C9.3,42,7.5,48.4,2.9,48.4c-0.3,0-3-0.4-4.7-4.9L-4.3,37c-0.5-1.4-0.6-1.6-0.6-2.5l-0.3-0.3l-0.1-0.4c0.4-0.2,0.5-0.4,0.7-1.2c0.9-0.6,0.9-1,1.1-4.8L-3,17.7l0.1-11.1c-4.3,0-4.9-0.1-9.7,1.1l-7,1.7c-0.5,0.1-3.4,0.8-3.6,0.9c-0.3,0.2-1.9,1.4-2.3,1.4c-0.4,0-3-0.3-3.5-0.3c-0.6-0.1-5.2-2-10-5.9c-0.8-0.7-4.2-4.4-5-5L-44.9-0.7z";
	this.a1 = "M-24-93.5c1-0.7,5.2-3.8,6.2-4.3c1.3-0.7,1.6-1,1.6-1.9c0-0.7-0.5-3.7-0.5-4.3l0.1-9.6v-2.9l-0.2-0.1c-1.4,0.8-2.1,1.1-2.6,1.3c-0.4,0.2-7.1,2.1-7.8,2.1c-0.2,0-7.6-1.8-8.9-3.3c-0.3-0.5-2.3-2.2-2.5-2.6c-0.4-0.7-1.3-2.8-1.3-3.7c0.5,0,2.4,0.8,2.9,0.8c0.8,0,3-0.5,4.2-0.9l7.8-2.7c0.2-0.1,4.9-2.1,5.9-2.2l1.5-0.7l-0.1-10.3c0-2.7-0.1-8-0.3-8.6c-0.4-0.9-1.9-2.3-3.4-2.9c-0.1-0.1-2-1.9-2.1-2.7c0.8-0.1,4.5-1.8,5.3-1.8c3.9,0,5.8,1.6,8.5,3.8c0.4,0.3,2.1,1.6,2.4,1.9c1.3,1.7,1.4,1.9,2.5,2.9c1.1,1.1,2.3,2.2,2.3,4.8c0,1.1-0.4,1.4-1.2,2.3c-0.5,0.6-0.8,2.3-0.8,2.6l0.1,0.5l-0.5,8.8c0,0.7-0.5,3.5-0.5,4.1c0,0.1,0.2,0.6,0.2,0.7c0,0.2-0.4,1.2-0.4,1.4l-0.2,8.7l-0.1,5.5l0.7-0.3l7-4.7l1.3-1l0.2,0.5c-0.4,0.6-0.7,1.5-1,2.1c0,0.8-0.3,1.8-0.7,2.5c-0.7,1.2-3.8,6.6-4.4,7.7c-0.1,0.1-4.1,4.3-5.4,5.3c-0.2,0.2-0.2,0.4-0.3,0.8c-0.6,0.8-3.6,3.6-4.2,4.2l-5.6,5.8c-0.9,0.9-4.6,4.5-5.2,5.3c-0.3,0.5-0.3,0.8-0.3,1.6c-0.8,0.5-1,0.6-1.8,0.9l-0.1,0.3c-0.1,0-4.9-0.1-6-1c-3.3-2.5-6.8-5.2-7.1-6.3c0-0.2-0.3-1.1-0.4-1.3c0-0.2-0.9-1.1-1-1.3c-0.2-0.4-0.9-2.1-0.8-2.3c0.8,0.1,1.2,0.1,5.4,0.3c0.3,0.1,1.3,0.4,1.6,0.4c0.5,0,4.4-2.4,5-2.8L-24-93.5z M18.7-153.5c1.7,1.3,2.5,3.1,2.5,4.2c0,0.4-0.3,1.1-0.4,1.2c-0.7,0.7-1.9,2.1-1.9,3.3l-0.2,8.2c0,0.3-0.6,2.6-0.7,2.9c0,3.2,0,3.5,0.1,4.3l5.5-3.8c2.4-1.6,5.1-4.4,6.9-6.3c-0.1-0.4-0.3-2.5-0.5-2.8c-1-1.5-1.2-1.7-1.3-2.4c0.8-0.1,1.2,0,4.4,1c0.8,0.2,2.1,0.3,2.9,0.4c0.7,0,1.4,0.8,1.6,1l5.5,6.1c2.4,2.7,2.6,3,3,5.4l-0.3,1.4c-1.6,2.3-2,3-4.6,3c-0.4,0-2.6-0.2-2.7-0.2c-1.4,0-8.1,1.7-10.3,2.4c-1.3,0.5-7,2.8-8.2,2.9c-1.6,0.3-1.6,0.3-2.2,1.2l-0.6,14.7l-0.2,1.2l0.1,12.6c0,2,5.7,2,6.7,2c4.2,0,9.2-0.9,10.5-1.2c4.1-1.1,4.5-1.3,5.7-1.4c0.7-1.9,1.4-8.1,1.4-9.7c0-0.2-0.2-3.3-0.2-4c0-1,0.1-1.7,0.3-2.7c0.6,1.1,0.7,1.4,1.2,2.8l3,8.4l0.7,1.9l1.4,2.4l1.5,0.4c0.4,0.5,2.6,2,2.8,2.5c0.3,0.8,0.7,1.8,1,2.7c0,0.7-0.8,3.5-5.5,6.6c-0.5,0.3-2.7,1.4-3,1.8c-0.9,0.4-1.2,0.5-2.8,0.6c-1.4,0.7-5.8,1.5-7,1.5c-0.4,0-2.2,0.4-2.6,0.4c-0.5,0-3-0.2-3.5-0.2h-1.4L18.2-79c-2.6-0.6-7.7-3.3-9.6-6C5.9-88.8,5-90.2,5.1-95l0.1-6.7l-0.1-1L5-111.4c0-1.7,0.5-9.4,0.5-11l0.1-8.7l0.1-11.3v-10.2c0-0.8-0.2-1-1.6-2.7c-0.2-0.3-1.2-1.9-1.4-2.1c-0.4-0.3-2-1.2-2.1-1.5c-0.9-1.6-1-1.7-1-3.6c0.8,0.1,4.1,0.8,4.8,0.8c0.4,0,0.9,0.1,5.2,1.3c0.8,0.2,3.7,2.8,4.3,3.3L18.7-153.5z";
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Kitasenju.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Kitasenju.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var ary = [this.a1,this.a2,this.a3];
		this._meshes = [];
		var _g1 = 0;
		var _g = ary.length;
		while(_g1 < _g) {
			var i = _g1++;
			var shape = common.Svg2Shape.getShape(ary[i]);
			var g = new THREE.ExtrudeGeometry(shape,{ amount : 60, bevelEnabled : false});
			var mesh1 = new THREE.Mesh(g,new THREE.MeshLambertMaterial({ color : 16711680}));
			mesh1.position.z = -30;
			this.add(mesh1);
			this._meshes.push(mesh1);
		}
	}
	,update: function(a) {
		this.scale.z = 0.3 + a.freqByteData[3] / 255;
		this.scale.x = 0.5 + 0.8 * a.freqByteData[3] / 255;
		this.scale.y = 0.5 + 0.8 * a.freqByteData[3] / 255;
	}
});
canvas.primitives.Knot = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Knot.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Knot.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(50,18,60,10,2,3),new THREE.MeshPhongMaterial({ color : 16746547}));
		this.add(mesh);
	}
});
canvas.primitives.Octa = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Octa.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Octa.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var mesh = new THREE.Mesh(new THREE.OctahedronGeometry(100),new THREE.MeshPhongMaterial({ color : 8947848, shading : 1}));
		this.add(mesh);
	}
});
canvas.primitives.Primitives = function() {
	this._tgtScale = 1;
	this._count = 0;
	THREE.Object3D.call(this);
};
canvas.primitives.Primitives.__super__ = THREE.Object3D;
canvas.primitives.Primitives.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._primitives = [];
		this._minV = new THREE.Vector3();
		this._addV = new THREE.Vector3();
		this._cube = new canvas.primitives.Cube();
		this._cube.init();
		this.add(this._cube);
		this._sphere = new canvas.primitives.Sphere();
		this._sphere.init();
		this.add(this._sphere);
		this._torus = new canvas.primitives.Torus();
		this._torus.init();
		this.add(this._torus);
		this._logo = new canvas.primitives.ChannelLogo();
		this._logo.init();
		this.add(this._logo);
		this._roppongi = new canvas.primitives.RoppongiLogo();
		this._roppongi.init();
		this.add(this._roppongi);
		this._octa = new canvas.primitives.Octa();
		this._octa.init();
		this.add(this._octa);
		this._knot = new canvas.primitives.Knot();
		this._knot.init();
		this.add(this._knot);
		this._kitasen = new canvas.primitives.Kitasenju();
		this._kitasen.init();
		this.add(this._kitasen);
		this._primitives = [this._cube,this._roppongi,this._sphere,this._torus,this._logo,this._octa,this._knot,this._kitasen];
		this.next();
	}
	,next: function() {
		this._count++;
		this.setVisible(false);
		this._primitives[this._count % this._primitives.length].visible = true;
		this._setParam();
	}
	,_setParam: function() {
	}
	,setVisible: function(b) {
		var _g1 = 0;
		var _g = this._primitives.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._primitives[i].visible = b;
		}
	}
	,update: function(audio) {
		if(audio.subFreqByteData[3] / 255 > 0.1) {
			this._addV.x += Math.pow(audio.freqByteData[2],2) / 255 * 1.5;
			this._addV.y += Math.pow(audio.freqByteData[3],2) / 255 * 1.5;
			this._addV.z += Math.pow(audio.freqByteData[4],2) / 255 * 1.5;
		}
		this._addV.x *= 0.98;
		this._addV.y *= 0.98;
		this._addV.z *= 0.98;
		this._tgtScale = 0.8 + Math.pow(audio.freqByteData[8] / 255,2);
		this.scale.x = this._tgtScale;
		this.scale.y = this._tgtScale;
		this.scale.z = this._tgtScale;
		if(this._addV.length() > Math.PI / 8) {
			this._addV = this._addV.normalize();
			this._addV = this._addV.multiplyScalar(Math.PI / 8);
		}
		this.rotation.x += this._addV.x;
		this.rotation.y += this._addV.y;
		this.rotation.z += this._addV.z;
		var _g1 = 0;
		var _g = this._primitives.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._primitives[i].visible) this._primitives[i].update(audio);
		}
	}
});
canvas.primitives.RoppongiLogo = function() {
	this.a3 = "M105.4,62.9c2.8-0.2,13.8-8.5,14.9-9.6l11.5-11.5c0.9-0.9,4.7-5.3,5.5-6c1.9-1.3,2.1-1.5,3.2-3.2L153.2,17l11.3-18.5c1.3-1.9,5.5-11.1,6.8-12.8l1.5-4l-0.2-0.4c-1.9,0.6-15.7,6.6-16.4,6.6c-4.5,0-29.3-14.5-33.4-21.1l0.4-0.9l3.8,0.4l0.6-1.3c1.3,0,7.4-0.9,8.7-0.9c1.5,0,8.1-1.3,9.4-1.5L163-40l2.8-0.2l18.1-1.9c1.1-0.2,6-1.3,6.8-1.5c0.6,0,0.9-0.2,1.3-0.9l0.2-4.3l-0.2-18.7c0-1.3-0.6-7.4-0.6-8.7c-0.2-2.3-0.4-9.6-3.2-10.8c-4-1.7-6.6-2.8-8.7-6.6c0.6-0.2,1.7-0.4,2.6-0.6c0.9-0.4,6.4-4,7.2-4c4.7,0,10.6,1.5,15.5,3.8c0.6,0.2,3.2,1.1,3.6,1.3l1.5,2.3c1.1,0.2,10.2,5.7,10.8,6.2c3,1.3,6.6,4.5,7.2,7.7c0.2,0.4,0.9,1.7,0.9,2.6c0,0.6-0.9,3.4-1.1,4c-0.2,1.1-3.8,4.9-4.3,6c-0.2,0.6-0.4,3.6-0.6,4c-0.2,0.9-1.5,4.5-1.5,5.3c0,0.6-0.6,3.4-0.6,4c0,0.6,0.2,1.1,0.6,2.1l25.7-2.8c0.9-0.2,4.7-0.2,5.5-0.4l0.6-1.1c0.9-0.2,1.1-0.2,1.5-1.1c0.6-0.2,3-1.5,3.6-1.5c0.2,0,0.6,0,1.1,0.2c0.2-0.2,0.6-0.6,1.1-0.6c0.6,0,3.6,0.6,4.3,0.6c1.5,1.3,1.7,1.3,2.8,1.1l0.9,1.1c4,1.1,4.5,1.1,6.4,3.6h0.9c2.8,3.6,4.7,4.3,8.3,5.3c2.6,0.9,3.8,7.9,3.8,8.9c0,2.1-0.9,3-3.4,5.5c-1.3,1.5-5.5,1.7-11.3,1.9l-17.9-1.5h-11.7l-17,1.7h-0.9l-0.2,0.6c2.1,2.8,10.6,15.9,12.8,18.5L249.1,4c1.9,2.1,10.4,10.2,12.1,11.9l11.3,10.8l7.9,8.1l11.9,12.3L308,59.3c3.8,4,6,6.2,6,7.2c0,1.9-8.9,2.8-11.9,3l-17.7-0.9h-11.3c-5.1,0-7-0.6-9.4-3.6l-8.3-10.6c-3.2-4.3-9.6-10.6-12.3-15.1c-1.3-2.1-6.8-11.1-8.9-14.7c-1.7-2.8-3.6-7.2-5.3-10c-1.7-2.3-8.9-13.8-9.6-14.7c-0.4,1.3-0.4,1.5-0.4,3c0,1.3-0.4,6.8-0.2,8.1v19.6l-0.2,0.9l0.2,21.5c0,1.7,0.9,9.8,0.9,11.5c0,0.4-0.6,3.2-0.6,3.4c0,0.2,0.4,1.7,0.4,1.9c0,0.9-0.2,4.7-0.2,5.3c0,0.9-1.5,4.7-1.5,5.3c0,6.8-0.4,7.2-3,12.8c-2.1,0.9-2.6,1.5-5.3,5.3c-0.4,0.6-1.3,1.1-1.9,1.1c-0.2,0-3.6-0.4-4.3-0.4c-1.3,0-2.1,0-3.2-1.1c-0.4-0.6-1.9-3.6-2.3-4l-6.6-17.4c-0.2-0.4-0.6-2.3-0.9-2.8c-0.4-0.6-0.4-1.9-0.4-2.6c0-0.9,0.2-1.5,1.3-3c1.1-5.3,1.3-6,1.5-7.9l-0.2-18.9c0-0.4-0.2-2.6-0.2-3c0.2-5.7,0.4-13.6,0.6-18.9c0.2-5.1,0.6-13.8,0.2-18.3l-0.2-2.6L190.9,1l-8.1,14.7c-1.9,3.4-8.3,10.6-12.3,15.3c-0.4,0.4-3,4.7-3.4,5.3c-0.2,0.6-3,2.3-3.4,3c-0.9,0.9-9.4,10.6-10.4,11.5c-1.5,1.1-7.7,6.2-8.9,7c-0.2,0.2-11.9,6.6-12.3,6.8c-0.4,0-11.5,2.3-12.3,2.3c-6.8,0-8.7-1.3-11.1-2.6l-3.4-0.9L105.4,62.9z";
	this.a2 = "M-96-33.6h6c1.9,0.4,2.1,0.4,4.7-0.6l17.9-0.9l22.8-3.8c3.4-0.6,6.4-0.9,13.2-1.5c0.6,0,8.1-1.7,9.8-1.9c-0.2-3.2-0.2-4.3-0.2-5.3c0.2-1.3,1.1-7,0.9-8.3l-1.7-20.2c-0.2-1.7-0.4-9.4-0.9-10.6c-0.6-1.7-1.5-2.1-8.5-5.5c-0.9-0.4-2.8-2.1-2.8-3c0-0.4,0.2-1.3,0.6-2.1c1.7,0,9.6-1.3,11.9-2.6c1.5,0,14.2,1.9,15.1,2.6c1.1,0.9,6,4,6.8,4.7c1.1,0.9,5.1,5.7,6.2,6.6c0.6,0.6,5.3,3.6,6,4.5c0.6,0.6,3.2,4,3.2,5.3c0,4.5-3,8.5-5.3,11.7C8.2-63,8-62.1,8-61.5c0,1.5-0.6,8.3-0.6,9.6c0,0.2,0.2,6.2,0.2,6.8l6-0.4l18.3-2.3c3.4-0.4,6.6-3.2,9.6-5.7c0.6-0.4,0.9-0.6,3.6-1.1c0.4,0,1.9-1.3,2.3-1.3c0.9,0.2,5.7,0.6,8.3,2.8c0.9,0.4,4.7,2.3,5.5,2.6c3.4,2.8,4.7,3.8,8.3,6c3.6,2.1,4.3,2.6,6,4.7v0.9l1.1,1.1c-0.4,1.7-0.6,2.3-0.4,4.5c-0.4,0.9-3.4,5.1-4.3,6.2C70.5-27.3,65-26,64.5-26l-16.8-1.3c-10.8-0.9-18.5-1.5-21.7-1.5c-1.7,0-9.4,0.6-10.8,0.6l-0.4,0.6c4.5,5.5,10.4,13.2,12.8,15.3L40.9-0.5L41.6,0l12.8,12.8c0.6,0.9,3.8,3.4,4.3,4c6.2,7.2,42.5,38.1,42.5,41.9c0,1.5-1.1,1.7-9.6,2.6c-11.9,1.3-20.6,2.1-26.4,2.1c-2.8,0-9.1,0-14.7-8.1L39.2,39.1L37.1,37L26.1,22.5C19.5,14,16.1,7.6,14.6,4.6c-0.2-0.4-1.5-2.1-1.7-2.6c-1.7-1.7-2.1-2.3-5.5-7.9H6.5c0,0.6-0.9,3.2-0.9,3.6c0.2,0.6,0.6,3,0.6,3.6c0,6.8-0.9,19.4-1.5,20.2c0,1.5,0.4,2.3,1.1,3.8c1.1-0.2,4.9-2.3,5.5-2.8c1.9-0.6,2.8-0.9,6.6-0.4c0.9,0.9,5.5,4.3,6.4,5.1c1.1,0.9,6.6,4.5,7.7,5.1c0.9,1.5,2.3,3.6,2.3,6.2c0,0.4-4.3,5.7-5.5,5.7c-3.4,0-4.3,0.2-11.7,1.7C15,46.5,7.1,47.4,5,47.6c0,1.5-0.4,7.7-0.4,8.9c0,1.1,0.9,4.9,0.9,5.7L5.6,78c0,1.1-0.6,6.2-0.6,7.7c0,4,0,5.7-2.3,9.8C1.2,98-2.7,101-4.6,101c-4.7,0-6.6-1.9-10.6-6.8c-1.9-1.9-5.3-6-6.2-7.4c-0.6-1.5-3.2-11.9-3.2-12.1c0-0.4,2.3-8.3,2.6-9.6c0-1.5,0.9-7.9,0.9-9.1c0-1.1-0.2-2.6-0.2-3.6c-1.1-0.2-5.7,0.9-6.6,0.9c-1.1-0.4-14.7-4.9-17.4-7c-0.6-0.4-4.9-5.3-6.2-5.3c-0.6,0-8.7,8.1-10.4,9.8c-1.5,1.5-8.5,6.8-9.6,8.1c-2.1,1.9-11.5,7.4-16.4,7.9c-2.1,0.2-12.3,2.8-13.4,2.8s-7-0.6-7-1.7l0.4-1.1c7.9-4.7,8.5-5.3,15.5-14c0.9-1.1,8.3-7.4,9.8-8.9c5.1-6,36.4-49.3,38.3-59.1c-0.6,0-3.4,0.6-3.8,0.6c-0.6,0-5.5,1.1-6.6,1.3c-1.1,0.2-5.7,3-6.8,3c-4.9,0-20-6.8-34.5-22.3V-33.6z";
	this.a1 = "M-264.2,30.6c0.6-1.1,4.3-5.1,4.3-6.2c0-1.9-6-8.5-6-10.2c0-0.2,0.2-0.6,0.6-0.6c1.3,0,14.5,1.1,17,2.6c4.7,3,19.4,11.9,19.4,18.7c0,4.9-8.3,15.1-8.9,15.7c-5.1,4-27.6,23.8-31.3,25.9c-7,4.5-16.4,8.3-20.8,8.5c-2.6,0.2-14.2,1.1-16.2,1.1c-0.9,0-3-0.6-3.6-0.6C-284.9,68.6-279.8,59.3-264.2,30.6z M-234.5-43.6c0-1.1,0.4-5.7,0.4-6.6c0-3.2-1.9-28.1-3.6-31c-1.3-2.3-11.1-9.6-12.8-11.3c0.4-0.2,2.1-0.6,2.6-0.6c13,0,13.4,0.2,19.1,2.8c1.9,0.9,11.7,4.7,17.7,7c0.6,0.2,11.1,9.4,11.5,9.8c1.1,1.1,2.3,3.2,2.3,5.7c0,5.5-11.3,31.3-11.3,33.4c0,1.7,1.9,1.7,2.8,1.7c3.4,0,17.9-1.3,21.1-1.5c17.9-0.9,23.2-1.1,25.7-2.1c0.9-0.4,5.1-2.8,6-3.2c1.1-0.4,1.9-0.4,3-0.4c3.6,0,4.9,0.6,17,7.7c9.1,5.3,9.4,8.5,9.4,11.9c0,9.6-12.3,10-13,10c-2.8,0-49.8-4.3-50.6-4.3c-13.4,0-43.2,3.4-44.9,3.8c-4.7,1.1-28.1,6.2-28.7,6.6c-0.4,0.2-6.2,3.2-7.2,3.2c-3.2,0-15.5-6.6-18.1-7.7c-15.9-6.2-22.8-14.5-22.8-14.9c0-1.7,2.1-1.7,3-1.7c2.3,0.2,6.4,0.4,8.1,0.4c5.1,0,27-3,31.5-3.4c6.2-0.6,33.8-3,39.3-3.8C-233.8-40.2-234.5-41.1-234.5-43.6z M-203.6,11c6,0,23.8,13.6,30.4,18.7c3.4,2.8,19.1,13.4,22.1,15.9c6.4,5.3,13.2,17.7,13.2,28.9c0,7.9-5.7,14.7-12.8,14.7c-4.7,0-16.8-7.7-23.6-20c-2.6-4.5-22.3-42.3-24.7-45.7c-3.6-5.3-7-9.4-9.1-11.9C-206.8,11.4-205.1,11-203.6,11z";
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.RoppongiLogo.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.RoppongiLogo.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var ary = [this.a1,this.a2,this.a3];
		this._meshes = [];
		var _g1 = 0;
		var _g = ary.length;
		while(_g1 < _g) {
			var i = _g1++;
			var shape = common.Svg2Shape.getShape(ary[i]);
			var g = new THREE.ExtrudeGeometry(shape,{ amount : 60, bevelEnabled : false});
			var mesh1 = new THREE.Mesh(g,new THREE.MeshLambertMaterial({ color : 16711680}));
			mesh1.position.z = -30;
			this.add(mesh1);
			this._meshes.push(mesh1);
		}
	}
	,update: function(a) {
		this.scale.z = 0.12 + 2.5 * a.freqByteData[3] / 255;
		this.scale.x = 0.13 + 0.5 * a.freqByteData[3] / 255;
		this.scale.y = 0.13 + 0.5 * a.freqByteData[3] / 255;
	}
});
canvas.primitives.Sphere = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Sphere.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Sphere.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(85,1),new THREE.MeshLambertMaterial({ color : 8947848, shading : 1}));
		this.add(mesh);
	}
});
canvas.primitives.Torus = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Torus.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Torus.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var m = new THREE.Mesh(new THREE.TorusGeometry(100,30,20,20),new THREE.MeshLambertMaterial({ color : 16777215}));
		this.add(m);
	}
});
var common = {};
common.Dat = function() {
};
common.Dat.init = function() {
	common.Dat.gui = new dat.GUI({ autoPlace: false });
	common.Dat.gui.domElement.id = "ddgui";
	window.document.body.appendChild(common.Dat.gui.domElement);
	common.Dat.gui.domElement.style.position = "absolute";
	common.Dat.gui.domElement.style.right = "0px";
	common.Dat.gui.domElement.style.top = "0px";
	common.Dat.gui.domElement.style.opacity = "0.7";
	common.Dat.gui.domElement.style.zIndex = 999999;
	window.document.addEventListener("keydown",common.Dat._onKeyDown);
	common.Dat.hide();
};
common.Dat._onKeyDown = function(e) {
	console.log("keydown");
	var _g = Std.parseInt(e.keyCode);
	switch(_g) {
	case 68:
		if(common.Dat.gui.domElement.style.display == "block") common.Dat.hide(); else common.Dat.show();
		break;
	case 70:
		window.document.body.webkitRequestFullscreen();
		break;
	case 81:
		window.location.href = "../../03/bin/";
		break;
	case 65:
		window.location.href = "../../01/bin/";
		break;
	}
};
common.Dat.show = function() {
	common.Dat.gui.domElement.style.display = "block";
};
common.Dat.hide = function() {
	common.Dat.gui.domElement.style.display = "none";
};
common.StageRef = function() {
};
common.Svg2Shape = function() {
};
common.Svg2Shape.getShape = function(sss) {
	var path = new THREE.Shape();
	var pathStr = sss;
	
			var DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46,
			MINUS = 45;

		  var idx = 1, len = pathStr.length, activeCmd,
			  x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
			  x1 = 0, x2 = 0, y1 = 0, y2 = 0,
			  rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;
		  
		  function eatNum() {
			var sidx, c, isFloat = false, s;
			// eat delims
			while (idx < len) {
			  c = pathStr.charCodeAt(idx);
			  if (c !== COMMA && c !== SPACE)
				break;
			  idx++;
			}
			if (c === MINUS)
			  sidx = idx++;
			else
			  sidx = idx;
			// eat number
			while (idx < len) {
			  c = pathStr.charCodeAt(idx);
			  if (DIGIT_0 <= c && c <= DIGIT_9) {
				idx++;
				continue;
			  }
			  else if (c === PERIOD) {
				idx++;
				isFloat = true;
				continue;
			  }
			  
			  s = pathStr.substring(sidx, idx);
			  return isFloat ? parseFloat(s) : parseInt(s);
			}
			
			s = pathStr.substring(sidx);
			return isFloat ? parseFloat(s) : parseInt(s);
		  }
		  
		  function nextIsNum() {
			var c;
			// do permanently eat any delims...
			while (idx < len) {
			  c = pathStr.charCodeAt(idx);
			  if (c !== COMMA && c !== SPACE)
				break;
			  idx++;
			}
			c = pathStr.charCodeAt(idx);
			return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
		  }
		  
		  var canRepeat;
		  activeCmd = pathStr[0];
		  while (idx <= len) {
			canRepeat = true;
			switch (activeCmd) {
				// moveto commands, become lineto's if repeated
			  case 'M':
				x = eatNum();
				y = eatNum();
				path.moveTo(x, y);
				activeCmd = 'L';
				break;
			  case 'm':
				x += eatNum();
				y += eatNum();
				path.moveTo(x, y);
				activeCmd = 'l';
				break;
			  case 'Z':
			  case 'z':
				canRepeat = false;
				if (x !== firstX || y !== firstY)
				  path.lineTo(firstX, firstY);
				break;
				// - lines!
			  case 'L':
			  case 'H':
			  case 'V':
				nx = (activeCmd === 'V') ? x : eatNum();
				ny = (activeCmd === 'H') ? y : eatNum();
				path.lineTo(nx, ny);
				x = nx;
				y = ny;
				break;
			  case 'l':
			  case 'h':
			  case 'v':
				nx = (activeCmd === 'v') ? x : (x + eatNum());
				ny = (activeCmd === 'h') ? y : (y + eatNum());
				path.lineTo(nx, ny);
				x = nx;
				y = ny;
				break;
				// - cubic bezier
			  case 'C':
				x1 = eatNum(); y1 = eatNum();
			  case 'S':
				if (activeCmd === 'S') {
				  x1 = 2 * x - x2; y1 = 2 * y - y2;
				}
				x2 = eatNum();
				y2 = eatNum();
				nx = eatNum();
				ny = eatNum();
				path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
				x = nx; y = ny;
				break;
			  case 'c':
				x1 = x + eatNum();
				y1 = y + eatNum();
			  case 's':
				if (activeCmd === 's') {
				  x1 = 2 * x - x2;
				  y1 = 2 * y - y2;
				}
				x2 = x + eatNum();
				y2 = y + eatNum();
				nx = x + eatNum();
				ny = y + eatNum();
				path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
				x = nx; y = ny;
				break;
				// - quadratic bezier
			  case 'Q':
				x1 = eatNum(); y1 = eatNum();
			  case 'T':
				if (activeCmd === 'T') {
				  x1 = 2 * x - x1;
				  y1 = 2 * y - y1;
				}
				nx = eatNum();
				ny = eatNum();
				path.quadraticCurveTo(x1, y1, nx, ny);
				x = nx;
				y = ny;
				break;
			  case 'q':
				x1 = x + eatNum();
				y1 = y + eatNum();
			  case 't':
				if (activeCmd === 't') {
				  x1 = 2 * x - x1;
				  y1 = 2 * y - y1;
				}
				nx = x + eatNum();
				ny = y + eatNum();
				path.quadraticCurveTo(x1, y1, nx, ny);
				x = nx; y = ny;
				break;
				// - elliptical arc
			  case 'A':
				rx = eatNum();
				ry = eatNum();
				xar = eatNum() * DEGS_TO_RADS;
				laf = eatNum();
				sf = eatNum();
				nx = eatNum();
				ny = eatNum();
				if (rx !== ry) {
				  console.warn('Forcing elliptical arc to be a circular one :(',
							 rx, ry);
				}
				// SVG implementation notes does all the math for us! woo!
				// http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
				// step1, using x1 as x1'
				x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
				y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
				// step 2, using x2 as cx'
				var norm = Math.sqrt(
				  (rx*rx * ry*ry - rx*rx * y1*y1 - ry*ry * x1*x1) /
				  (rx*rx * y1*y1 + ry*ry * x1*x1));
				if (laf === sf)
				  norm = -norm;
				x2 = norm * rx * y1 / ry;
				y2 = norm * -ry * x1 / rx;
				// step 3
				cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
				cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;
				
				var u = new THREE.Vector2(1, 0),
					v = new THREE.Vector2((x1 - x2) / rx,
										  (y1 - y2) / ry);
				var startAng = Math.acos(u.dot(v) / u.length() / v.length());
				if (u.x * v.y - u.y * v.x < 0)
				  startAng = -startAng;
				
				// we can reuse 'v' from start angle as our 'u' for delta angle
				u.x = (-x1 - x2) / rx;
				u.y = (-y1 - y2) / ry;
				
				var deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
				// This normalization ends up making our curves fail to triangulate...
				if (v.x * u.y - v.y * u.x < 0)
				  deltaAng = -deltaAng;
				if (!sf && deltaAng > 0)
				  deltaAng -= Math.PI * 2;
				if (sf && deltaAng < 0)
				  deltaAng += Math.PI * 2;
				
				path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
				x = nx;
				y = ny;
				break;
			  default:
				//throw new Error('weird path command: >> code=' + activeCmd.charCodeAt(0));
				console.warn('weird path command: >> code=' + activeCmd.charCodeAt(0));
				
			}
			if (firstX === null) {
			  firstX = x;
			  firstY = y;
			}
			// just reissue the command
			if (canRepeat && nextIsNum())
			  continue;
			activeCmd = pathStr[idx++];
		  }
	var list = path.getPoints(0);
	var sumX = 0;
	var sumY = 0;
	var _g1 = 0;
	var _g = list.length;
	while(_g1 < _g) {
		var i = _g1++;
		sumX += list[i].x;
		sumY += list[i].y;
	}
	return path;
};
var data = {};
data.LogoPaths = function() {
};
data.LogoPaths.init = function() {
	var str = "367.6,65.8 311.1,9.7 324.9,9.7 381.4,65.8\r\n348.2,65.8 320,37.8 333.8,37.8 362,65.8\r\n251.2,103 223,74.7 209.2,74.7 171.5,112.4 185.3,112.4 216.1,81.6 237.3,103\r\n175.9,103 162.1,103 200.7,66.3 181.5,46.9 195.3,46.9 214.5,66.3\r\n286.2,103 272.4,103 320.3,57 309.9,46.6 323.7,46.6 334.1,57\r\n257.4,103 271.2,103 232.6,66.3 251.8,46.9 238,46.9 218.7,66.3\r\n98,9.3 84.2,9.3 102.4,27.6 100.2,30.2 70.1,0 56.3,0 93.9,37.8 107.7,37.8 116.2,27.6\r\n144.8,37.8 131,37.8 93.5,0 107.3,0\r\n79.9,84.6 9.7,84.6 0,74.7 70.4,74.7\r\n324.8,27.6 254.7,27.6 245,37.6 315.3,37.6\r\n554.7,93 467,93 457.3,103 545.2,103\r\n392.7,53.7 444.1,53.7 453.8,63.6 402.2,63.6\r\n60.2,9.3 46.4,9.3 84,47.1 65.2,66.3 79,66.3 97.8,47.1\r\n115.9,47.1 116.1,47.1 118.9,44.4 121.7,47.1 135.8,47.1 125.9,37.8 111.9,37.8 102.1,47.1 139.7,84.8 153.5,84.8\r\n144.8,94.1 109.1,57 95.1,57 95.1,57 95.1,57 75.3,74.7 89.4,74.7 101.6,63.7 130.8,94.1\r\n183.2,57 130.4,57 140.5,46.6 173.1,46.6\r\n270.8,122.4 217.9,122.4 228.1,112 260.6,112\r\n352.1,156.6 352.1,93.6 362.5,103.7 362.5,146.4\r\n414.9,85 346.8,85 357,74.7 404.8,74.7\r\n229.9,37.8 217,50.3 204.2,37.8 190.6,37.8 210.2,57 223.8,57 243.5,37.8\r\n359.3,18.1 355.7,21.2 334.6,0 320.8,0 348.2,27.6 362,27.6 373.1,18.1\r\n371.1,37.8 371.4,37.8 381.4,27.6 367.3,27.6 357.3,37.8 385.6,65.8 399.4,65.8\r\n353.6,74.7 343.4,66.3 328.7,66.3 281.7,112.4 296.4,112.4 336.7,72.8 338.9,74.7\r\n451.4,46.6 438.1,46.6 485.7,0 499.1,0\r\n462.1,54.1 448.7,54.1 496.4,7.5 509.7,7.5\r\n440.5,81.8 521.4,0 534.7,0 453.8,81.8\r\n459.4,81.8 534.7,7.5 548.1,7.5 472.7,81.8";
	var ary = str.split("\r");
	data.LogoPaths.points = [];
	var maxX = -1000;
	var maxY = -1000;
	var minX = 1000;
	var minY = 1000;
	var width = 554.7;
	var height = 156.6;
	var _g1 = 0;
	var _g = ary.length;
	while(_g1 < _g) {
		var i = _g1++;
		data.LogoPaths.points[i] = [];
		var line = ary[i];
		var pstrs = line.split(" ");
		var _g3 = 0;
		var _g2 = pstrs.length;
		while(_g3 < _g2) {
			var j = _g3++;
			var pp = pstrs[j].split(",");
			var xx = Std.parseFloat(pp[0]);
			var yy = Std.parseFloat(pp[1]);
			var v = new THREE.Vector2(xx - width / 2,-yy + height / 2);
			data.LogoPaths.points[i].push(v);
			maxX = Math.max(maxX,xx);
			maxY = Math.max(maxY,yy);
			minX = Math.min(minX,xx);
			minY = Math.min(minY,yy);
		}
	}
};
data.LogoPaths.getPaths = function() {
	var out = [];
	var _g1 = 0;
	var _g = data.LogoPaths.points.length;
	while(_g1 < _g) {
		var i = _g1++;
		var p = new data.Paths();
		p.init(data.LogoPaths.points[i]);
		out.push(p);
	}
	return out;
};
data.LogoPaths.prototype = {
	getPoint: function(r,points) {
		var n = Math.floor(r * points.length);
		var index1 = n;
		var index2 = n + 1;
		var p1 = points[index1];
		var p2;
		if(index2 >= points.length) p2 = points[0]; else p2 = points[index2];
		var p = null;
		if(p1 != null && p2 != null) {
			var xx = r * p1.x + (1 - r) * p2.x;
			var yy = r * p1.y + (1 - r) * p2.y;
			p = new THREE.Vector2(xx,yy);
		} else {
			if(p1 != null) p = p1;
			if(p2 != null) p = p2;
		}
		return p;
	}
};
data.Paths = function() {
};
data.Paths.prototype = {
	init: function(points) {
		this._points = points;
	}
	,getPoints: function() {
		return this._points;
	}
	,getPoint: function(r) {
		var n = Math.floor(r * this._points.length);
		var index1 = n;
		var index2 = n + 1;
		var p1 = this._points[index1];
		var p2;
		if(index2 >= this._points.length) p2 = this._points[0]; else p2 = this._points[index2];
		var p = null;
		if(p1 != null && p2 != null) {
			var xx = r * p1.x + (1 - r) * p2.x;
			var yy = r * p1.y + (1 - r) * p2.y;
			p = new THREE.Vector2(xx,yy);
		} else {
			if(p1 != null) p = p1;
			if(p2 != null) p = p2;
		}
		return p;
	}
};
data.TextureData = function(u,w,h) {
	this.height = 0;
	this.width = 0;
	this.url = "";
	this.url = u;
	this.width = w;
	this.height = h;
	this.texture = THREE.ImageUtils.loadTexture(this.url);
};
var effect = {};
effect.PostProcessing2 = function() {
	this._rad = 0;
};
effect.PostProcessing2.prototype = {
	init: function(scene,camera,renderer) {
		this._scene = scene;
		this._camera = camera;
		this._renderer = renderer;
		this._renderPass = new THREE.RenderPass(scene,camera);
	}
	,setting: function() {
	}
	,render: function() {
	}
	,update: function() {
	}
};
effect.shaders = {};
effect.shaders.CopyShader = function() {
};
effect.shaders.CopyShader.getObject = function() {
	var obj = { uniforms : { tDiffuse : { type : "t", value : null}, opacity : { type : "f", value : 1.0}}, vertexShader : "varying vec2 vUv;\r\n\t\tvoid main() {\r\n\t\t\tvUv = uv;\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}", fragmentShader : "uniform float opacity;\t\tuniform sampler2D tDiffuse;\r\n\t\tvarying vec2 vUv;\t\tvoid main() {\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\t\t\tgl_FragColor = opacity * texel;\t\t}"};
	return obj;
};
effect.shaders.MyTiltShiftShader = function() {
};
effect.shaders.MyTiltShiftShader.getObject = function() {
	return { uniforms : { tDiffuse : { type : "t", value : null}, v : { type : "f", value : 0.001953125}, r : { type : "f", value : 0.5}, k : { type : "fv1", value : [1.0,4.0,6.0,4.0,1.0,4.0,16.0,24.0,16.0,4.0,6.0,24.0,36.0,24.0,6.0,4.0,16.0,24.0,16.0,4.0,1.0,4.0,6.0,4.0,1.0]}}, vertexShader : "\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\tuniform float v;\r\n\t\t\t\tuniform float r;\r\n\t\t\t\tuniform float k[25];\r\n\t\t\t\tvarying vec2 vUv;\r\n\r\n\t\t\t\tvoid main() {\r\n\r\n\t\t\t\t\tvec4 sum = vec4( 0.0 );\r\n\t\t\t\t\tfloat vv = v;// * abs( r - vUv.y );\r\n\t\t\t\t\t\r\n\t\t\t\t\tfor(float i=-2.0;i<=2.0;i++){\r\n\t\t\t\t\t\tfor(float j = -2.0; j <=2.0; j++) {\r\n\t\t\t\t\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + i * vv, vUv.y + j * vv ) ) / 25.0;\r\n\t\t\t\t\t\t\t//idx += 1;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = sum;\r\n\r\n\t\t\t\t}"};
};
var emoji = {};
emoji.EmojiPiece = function() {
	this._count = 0;
	this.EMOJI_MAX = 845;
	this.animationFrameLength = 32;
	this._texture = THREE.ImageUtils.loadTexture("./emo2048.png");
	this._texture.minFilter = 1003;
	this._texture.magFilter = 1003;
	this._geo = new THREE.PlaneGeometry(80,80,1,1);
	this._mat = new THREE.MeshBasicMaterial({ map : this._texture, side : 2, shading : 1});
	THREE.Mesh.call(this,this._geo,this._mat);
	this.updateEmoji();
};
emoji.EmojiPiece.__super__ = THREE.Mesh;
emoji.EmojiPiece.prototype = $extend(THREE.Mesh.prototype,{
	updateEmoji: function() {
		var vv = this._getIconPos(Math.floor(this._count) % 700);
		this._count += 0.4;
		this._texture.offset.x = vv.x;
		this._texture.offset.y = vv.y;
		this._texture.repeat.x = 1 / this.animationFrameLength;
		this._texture.repeat.y = 1 / this.animationFrameLength;
	}
	,_getIconPos: function(index) {
		var xx = index % this.animationFrameLength;
		var yy = this.animationFrameLength - 1 - Math.floor(index / this.animationFrameLength);
		return new THREE.Vector2(xx / this.animationFrameLength,yy / this.animationFrameLength);
	}
});
emoji.EmojiShader = function() {
	this.fragmentShader = "\r\n\t\t  uniform vec3 color;\r\n\t\t  uniform sampler2D texture;\r\n\t\t  uniform vec2 offset;\r\n\t\t  varying vec2 vaOffset;\r\n\t\t  uniform vec2 repeat;\r\n\t\t  void main() {\r\n\t\t\tvec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);\r\n\t\t\tvec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//\r\n\t\t\tgl_FragColor = color0;\r\n\t\t  }\r\n\t";
	this.vertexShader = "\r\n\t\t\tuniform float scale;\r\n\t\t\tuniform vec3 posScale;\r\n\t\t\tattribute vec2 aOffset;\r\n\t\t\tvarying vec2 vaOffset;\t  \r\n\t\t\tvoid main() {\r\n\t\t\t\t//vec3 ps = vec3(2.0, 2.0, 2.0);\r\n\t\t\t\tvaOffset = aOffset;\r\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position * posScale, 1.0 );\r\n\t\t\t\tgl_PointSize = 12000.0 * scale / gl_Position.w;\r\n\t\t\t}\r\n\t";
	this.animationFrameLength = 32;
};
emoji.EmojiShader.prototype = {
	init: function() {
		this.attributes = { aOffset : { type : "v2", value : []}};
		var _g1 = 0;
		var _g = canvas.CanvasSrc.W * canvas.CanvasSrc.H;
		while(_g1 < _g) {
			var i = _g1++;
			this.attributes.aOffset.value[i] = new THREE.Vector2(Math.random(),0);
		}
		var tex = data.TextureData.emo2048.texture;
		tex.minFilter = 1003;
		tex.magFilter = 1003;
		this.uniforms = { texture : { type : "t", value : tex}, scale : { type : "f", value : 3000.0}, posScale : { type : "v3", value : new THREE.Vector3(1.0,1.0,1.0)}, offset : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,0.0)}, repeat : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,1 / this.animationFrameLength)}};
		this.shaderMaterial = new THREE.ShaderMaterial({ uniforms : this.uniforms, attributes : this.attributes, vertexShader : this.vertexShader, fragmentShader : this.fragmentShader, transparent : true, alphaTest : 0.5, depthWrite : false});
	}
};
emoji.EmojiSingleShader = function() {
	this.fragmentShader = "\r\n\t\t//uniform 変数としてテクスチャのデータを受け取る\r\n\t\tuniform sampler2D texture;\r\n\t\tuniform vec2 offset;\r\n\t\tuniform vec2 repeat;\r\n\t\t\r\n\t\t// vertexShaderで処理されて渡されるテクスチャ座標\r\n\t\tvarying vec2 vUv;                                             \r\n\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t  // テクスチャの色情報をそのままピクセルに塗る\r\n\t\t  gl_FragColor = texture2D(texture, vUv * repeat + offset);\r\n\t\t}\r\n\t";
	this.vertexShader = "\r\n\t\tvarying vec2 vUv;// fragmentShaderに渡すためのvarying変数\r\n\t\tuniform vec2 offset;\r\n\t\tuniform vec2 repeat;\r\n\t\t\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t  // 処理する頂点ごとのuv(テクスチャ)座標をそのままfragmentShaderに横流しする\r\n\t\t  vUv = uv;\r\n\t\t  // 変換：ローカル座標 → 配置 → カメラ座標\r\n\t\t  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    \r\n\t\t  // 変換：カメラ座標 → 画面座標\r\n\t\t  gl_Position = projectionMatrix * mvPosition;\r\n\t\t}\r\n\t";
	this.animationFrameLength = 32;
};
emoji.EmojiSingleShader.prototype = {
	init: function() {
		this.animationFrameLength = emoji.EmojiSpritePos.NUMX2;
		this._pos = new emoji.EmojiSpritePos(emoji.EmojiSpritePos.EMOJI_MAX2,emoji.EmojiSpritePos.NUMX2);
		this.attributes = { };
		if(emoji.EmojiSingleShader.tex == null) {
			emoji.EmojiSingleShader.tex = data.TextureData.emo128.texture;
			emoji.EmojiSingleShader.tex.minFilter = 1003;
			emoji.EmojiSingleShader.tex.magFilter = 1003;
		}
		this.uniforms = { texture : { type : "t", value : emoji.EmojiSingleShader.tex}, offset : { type : "v2", value : this._pos.getIconPosByIndex(92)}, repeat : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,1 / this.animationFrameLength)}};
		this.shaderMaterial = new THREE.ShaderMaterial({ uniforms : this.uniforms, attributes : this.attributes, vertexShader : this.vertexShader, fragmentShader : this.fragmentShader, transparent : true, alphaTest : 0.5, depthWrite : false, side : 2});
	}
	,setIconIndex: function(n) {
		n = n % emoji.EmojiSpritePos.EMOJI_MAX2;
		this.uniforms.offset.value = this._pos.getIconPosByIndex(n);
	}
	,setHeight: function(ratio) {
		var pos = this._pos.getIconPos(255 * Math.random());
		pos.y = pos.y + 1 / this.animationFrameLength * (1 - ratio) / 2;
		this.uniforms.offset.value = pos;
		this.uniforms.repeat.value = new THREE.Vector2(1 / this.animationFrameLength,1 / this.animationFrameLength * ratio);
	}
};
emoji.EmojiSpritePos = function(max,numx) {
	this._isSoundReact = false;
	this._nn = 0;
	this._maxRange = 0;
	this.range = 100;
	this.currentIndex = 0;
	this.counter = 0;
	this.endIndex = 0;
	this.startIndex = 0;
	this.animationFrameLength = 32;
	this._max = 845;
	this._max = max;
	this._maxRange = this._max;
	this.animationFrameLength = numx;
	this.startIndex = 0;
	this.endIndex = 50;
};
emoji.EmojiSpritePos.prototype = {
	init: function() {
		common.Dat.gui.add(this,"startIndex",0,this._max - 1).listen();
		common.Dat.gui.add(this,"range",0,this._max - 1).listen();
	}
	,getIconPos: function(light) {
		this.endIndex = this.startIndex + this.range;
		var ratio = light / 255;
		var num = this.endIndex - this.startIndex;
		var no = Math.floor((this.endIndex - this.startIndex) * ratio + Math.floor(this.counter));
		no = no % num;
		var index = Math.floor(this.startIndex + no);
		index = index % this._max;
		var xx = index % this.animationFrameLength;
		var yy = this.animationFrameLength - 1 - Math.floor(index / this.animationFrameLength);
		return new THREE.Vector2(xx / this.animationFrameLength,yy / this.animationFrameLength);
	}
	,getIconPosByIndex: function(index) {
		var xx = index % this.animationFrameLength;
		var yy = this.animationFrameLength - 1 - Math.floor(index / this.animationFrameLength);
		return new THREE.Vector2(xx / this.animationFrameLength,yy / this.animationFrameLength);
	}
	,setRange: function(startIdxRatio,rangeRatio) {
		this.startIndex = Math.floor(startIdxRatio * this._max);
		this._maxRange = Math.floor(rangeRatio * this._max);
		if(Math.random() < 0.2) this._maxRange = 5;
		if(Math.random() < 0.5) this._isSoundReact = true; else this._isSoundReact = false;
	}
	,update: function(audio) {
		if(audio == null) return;
		if(!audio.isStart) return;
		if(this._isSoundReact) this.range = this._maxRange; else this.range = 5 + Math.floor(audio.freqByteData[6] / 255 * this._maxRange);
		if(this.range > this._max - 1) this.range = this._max - 1;
	}
};
emoji.Emojis = function() {
	this._isBlackPixel = true;
	this.isActive = true;
	this.pScale = 1;
	this.space = 4;
	this._scale = 1;
	THREE.Object3D.call(this);
};
emoji.Emojis.__super__ = THREE.Object3D;
emoji.Emojis.prototype = $extend(THREE.Object3D.prototype,{
	init: function(scene,maxW,maxH) {
		this._canvas = new canvas.CanvasSrc();
		this._canvas.init();
		this._pos = new emoji.EmojiSpritePos(emoji.EmojiSpritePos.EMOJI_MAX1,emoji.EmojiSpritePos.NUMX1);
		this._pos.init();
		this._maxW = maxW;
		this._maxH = maxH;
		this.shader = new emoji.EmojiShader();
		this.shader.init();
		this.geometry = new THREE.Geometry();
		var _g = 0;
		while(_g < maxH) {
			var j = _g++;
			var _g1 = 0;
			while(_g1 < maxW) {
				var i = _g1++;
				var vertex = new THREE.Vector3();
				vertex.x = i * this.space - (maxW - 1) * this.space / 2;
				vertex.y = -(j * this.space - (maxH - 1) * this.space / 2);
				this.geometry.vertices.push(vertex);
			}
		}
		this.particles = new THREE.PointCloud(this.geometry,this.shader.shaderMaterial);
		this.particles.sortParticles = true;
		scene.add(this.particles);
		this._twnWide();
		window.document.addEventListener("keydown",$bind(this,this._onDown));
	}
	,_onDown: function(e) {
		if(!this.isActive) return;
		var keyCode = Std.parseInt(e.keyCode);
		if(keyCode == 39) {
			this._canvas.next();
			this._pos.setRange(Math.random(),Math.pow(Math.random(),2));
			if(Math.random() < 0.5) this._isBlackPixel = true; else this._isBlackPixel = false;
		} else if(keyCode == 37) this._tweenZoom(true); else if(keyCode == 38) this._tweenZoom(false); else if(keyCode == 40) this._tweenWide();
	}
	,_goMiddle: function() {
		console.log("_goMiddle");
	}
	,_tweenZoom: function(loop) {
		if(loop == null) loop = false;
		var ary = [0.04,0.1,0.2,0.2,0.2];
		if(this._tween != null) this._tween.kill();
		this._tween = TweenMax.to(this,1.5,{ _scale : ary[Math.floor(Math.random() * ary.length)], ease : Cubic.easeInOut, onComplete : loop?$bind(this,this._tweenWide):null});
	}
	,_tweenWide: function() {
		var ary = [1,1,1,0.6 + 0.4 * Math.random()];
		if(this._tween != null) this._tween.kill();
		this._tween = TweenMax.to(this,1.5,{ _scale : ary[Math.floor(Math.random() * ary.length)], ease : Cubic.easeInOut});
	}
	,_twnWide: function() {
		var ary = [1,0.5,0.5 + 0.5 * Math.random()];
		if(this._tween != null) this._tween.kill();
		this._tween = TweenMax.to(this,2,{ _scale : ary[Math.floor(Math.random() * ary.length)], ease : Cubic.easeInOut});
	}
	,_twnZoom: function() {
		var ary = [0.04,0.02,0.1,0.2];
		if(this._tween != null) this._tween.kill();
		this._tween = TweenMax.to(this,2,{ _scale : ary[Math.floor(Math.random() * ary.length)], ease : Cubic.easeInOut});
	}
	,update: function(audio) {
		this._pos.update(audio);
		var tgtW = Math.floor(this._scale * canvas.CanvasSrc.W);
		var tgtH = Math.floor(this._scale * canvas.CanvasSrc.H);
		this.space = 1 / this._scale * 7;
		this.pScale = 1 / this._scale * 0.5;
		this._canvas.update(audio);
		this._w = tgtW;
		this._h = tgtH;
		this.shader.uniforms.scale.value = this.pScale;
		var index = 0;
		var _g1 = 0;
		var _g = this._w * this._h;
		while(_g1 < _g) {
			var i = _g1++;
			var xx = i % this._w;
			var yy = Math.floor(i / this._w);
			var light = this._canvas.getPixel(Math.floor(xx / this._w * this._maxW),Math.floor((1 - yy / this._h - 1 / this._h) * this._maxH));
			if(this._isBlackPixel) {
				if(light != 0) this.shader.attributes.aOffset.value[i] = this._pos.getIconPos(light); else this.shader.attributes.aOffset.value[i] = new THREE.Vector2(0,0);
			} else this.shader.attributes.aOffset.value[i] = this._pos.getIconPos(light);
		}
		this._reposition(tgtW,tgtH,this._canvas);
	}
	,_reposition: function(ww,hh,src) {
		var index = 0;
		this.particles.geometry.verticesNeedUpdate = true;
		var len = ww * hh;
		var maxY = 0;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var vertex = this.particles.geometry.vertices[i];
			var xx = i % ww;
			var yy = Math.floor(i / ww);
			maxY = Math.max(maxY,yy);
			vertex.x = xx * this.space - (ww - 1) * this.space / 2;
			vertex.y = -(yy * this.space) + (hh - 1) * this.space / 2;
			vertex.z = 0;
		}
		var _g1 = len;
		var _g2 = this._maxW * this._maxH;
		while(_g1 < _g2) {
			var i1 = _g1++;
			var vertex1 = this.particles.geometry.vertices[i1];
			vertex1.z = -8000;
		}
	}
});
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js = {};
var planes = {};
planes.IconGenerator = function() {
	THREE.Object3D.call(this);
};
planes.IconGenerator.__super__ = THREE.Object3D;
planes.IconGenerator.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this.icons = [];
		this.currentIcons = [];
		var _g1 = 0;
		var _g = planes.IconGenerator.MAX;
		while(_g1 < _g) {
			var i = _g1++;
			var p = new planes.ImgPlane();
			p.scale.set(0.1,0.1,0.1);
			p.init(null);
			this.add(p);
			this.icons.push(p);
		}
	}
	,reset: function() {
		var num = 3;
		var ran = Math.random();
		var isRandom = false;
		if(ran < 0.1) num = 2; else if(ran < 0.2) {
			num = 1;
			isRandom = false;
		} else if(ran < 0.22) {
			num = 15;
			isRandom = true;
		}
		var _g1 = 0;
		var _g = this.icons.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.icons[i].visible = false;
		}
		this.currentIcons = [];
		var _g2 = 0;
		while(_g2 < num) {
			var i1 = _g2++;
			this.icons[i1].visible = true;
			this.icons[i1].setIcon(Math.floor(emoji.EmojiSpritePos.EMOJI_MAX2 * Math.random()));
			if(num == 1) {
				this.icons[i1].position.x = 0;
				this.icons[i1].position.y = 0;
			} else if(num == 2) {
				this.icons[0].position.x = -300;
				this.icons[0].position.y = 0;
				this.icons[1].position.x = 300;
				this.icons[1].position.y = 0;
			} else if(!isRandom) {
				this.icons[i1].position.x = (i1 / (num - 1) - 0.5) * 500;
				this.icons[i1].position.y = 0;
			} else {
				this.icons[i1].position.x = 400 * (Math.random() - 0.5);
				this.icons[i1].position.y = 300 * (Math.random() - 0.5);
			}
			this.currentIcons.push(this.icons[i1]);
		}
	}
	,getRandom: function() {
		if(this.currentIcons.length == 0) return null;
		return this.currentIcons[Math.floor(Math.random() * this.currentIcons.length)];
	}
});
planes.PlaneBase = function() {
	THREE.Object3D.call(this);
};
planes.PlaneBase.__super__ = THREE.Object3D;
planes.PlaneBase.prototype = $extend(THREE.Object3D.prototype,{
	init: function(callback) {
	}
	,setIcon: function(idx) {
	}
	,update: function(audio) {
	}
	,kill: function() {
	}
});
planes.ImgPlane = function() {
	this.selectIndex = 0;
	this._count = 0;
	this.vr = 0;
	this.vy = 0;
	this.vx = 0;
	planes.PlaneBase.call(this);
};
planes.ImgPlane.__super__ = planes.PlaneBase;
planes.ImgPlane.prototype = $extend(planes.PlaneBase.prototype,{
	init: function(callback) {
		this._count = 0;
		this._callback = callback;
		if(planes.ImgPlane._geo == null) planes.ImgPlane._geo = new THREE.PlaneBufferGeometry(256,256,1,1);
		this.shader = new emoji.EmojiSingleShader();
		this.shader.init();
		this.setIcon(0);
		this._mesh = new THREE.Mesh(planes.ImgPlane._geo,this.shader.shaderMaterial);
		this.add(this._mesh);
		this.vy = 2 + 3 * Math.random();
	}
	,setIcon: function(idx) {
		this.shader.setIconIndex(idx);
		this.selectIndex = idx;
	}
	,update: function(audio) {
		this._count++;
		if(this._count == 100) this._callback(this); else {
			this.vx *= 1 + 0.2 * audio.freqByteData[2] / 255;
			this.vy *= 1 + 0.5 * audio.freqByteData[4] / 255;
			this.rotation.z += this.vr;
			this.position.y += this.vy;
			this.vx *= 0.99;
			this.vy *= 0.99;
		}
	}
});
planes.PlaneFactory = function() {
	this.isActive = false;
	this._num = 0;
	this._count = 0;
	THREE.Object3D.call(this);
};
planes.PlaneFactory.__super__ = THREE.Object3D;
planes.PlaneFactory.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._planes = [];
		planes.rtt.RTTTextures.init();
		this._gen = new planes.IconGenerator();
		this._gen.init();
		this._gen.reset();
		this.add(this._gen);
		window.document.addEventListener("keydown",$bind(this,this.onKeyDown));
	}
	,onKeyDown: function(e) {
		if(!this.isActive) return;
		var _g = Std.parseInt(e.keyCode);
		switch(_g) {
		case 39:
			this._reset();
			break;
		}
	}
	,update: function(audio) {
		if(this._gen == null) return;
		planes.rtt.RTTTextures.update();
		var sub = audio.subFreqByteData;
		if(sub != null) {
			var _g1 = 0;
			var _g = sub.length;
			while(_g1 < _g) {
				var i = _g1++;
				if((sub[i] > 24 || Math.pow(audio.freqByteData[3] / 255,4) > 0.3) && this.children.length <= 20) {
					var g = this._gen.getRandom();
					if(g != null) {
						this._num++;
						var plane = new planes.RTTPlane();
						plane.init($bind(this,this.removePiece));
						plane.position.x = g.position.x;
						plane.position.y = g.position.y;
						plane.setIcon(g.selectIndex);
						this.add(plane);
						this._planes.push(plane);
					}
				}
			}
		}
		var _g11 = 0;
		var _g2 = this._planes.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(this._planes[i1] != null) this._planes[i1].update(audio);
		}
		this._count++;
	}
	,_reset: function() {
		Mosaic.forceClear = true;
		var _g1 = 0;
		var _g = this._planes.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._planes[i].kill();
			this.remove(this._planes[i]);
		}
		this._planes = [];
		this._gen.reset();
	}
	,removePiece: function(plane) {
		var idx = HxOverrides.indexOf(this._planes,plane,0);
		this.remove(plane);
		if(idx >= 0) this._planes.splice(idx,1);
		console.log("削除" + this._planes.length + "/" + this.children.length);
	}
});
planes.RTTPlane = function() {
	this._boost = 1;
	this._minAmpRatio = 0;
	this._lifePower = 1;
	this._life = 0;
	this._speedRad = 0;
	this._moveSpd = 4 * Math.random() + 0.3;
	this._moveRad = 2 * Math.PI * Math.random();
	this._oldRad = 0;
	this._vr = 0;
	this._count = 0;
	this._vz = 0;
	this._vy = 0;
	this._vx = 0;
	planes.PlaneBase.call(this);
};
planes.RTTPlane.__super__ = planes.PlaneBase;
planes.RTTPlane.prototype = $extend(planes.PlaneBase.prototype,{
	init: function(callback) {
		this._callback = callback;
		this._pos = new THREE.Vector2();
		this._oldPos = new THREE.Vector2();
		this._oldRad = 0;
		this._geo = new THREE.PlaneGeometry(512,1,1,1);
		this._life = Math.floor(30 + 60 * Math.random());
		this._lifePower = 0.5 + 2 * Math.random();
		this._rttTexture = planes.rtt.RTTTextures.getNext();
		this._rttTexture.start(10,this._life);
		this._mate = new THREE.MeshBasicMaterial({ map : this._rttTexture.getRenderTarget(), side : 2, transparent : true, depthTest : false});
		this._mate.needsUpdate = true;
		this._mate.transparent = true;
		this._mesh = new THREE.Mesh(this._geo,this._mate);
		this.add(this._mesh);
		this._vx = 0.5 + 12 * (Math.random() - 0.5);
		this._vy = 0.5 + 12 * (Math.random() - 0.5);
		this._vr = Math.random() - 0.5;
		this.position.z = 10 * (Math.random() - 0.5);
		this._minAmpRatio = Math.random() * 0.3;
		this._moveSpd = 15 * Math.pow(Math.random(),3) + 0.3;
		this._geo.vertices[2].x = 0;
		this._geo.vertices[2].y = 0;
		this._geo.vertices[3].x = 0;
		this._geo.vertices[3].y = 0;
		this._geo.vertices[0].x = 0;
		this._geo.vertices[0].y = 0;
		this._geo.vertices[1].x = 0;
		this._geo.vertices[1].y = 0;
		this.visible = false;
	}
	,setIcon: function(idx) {
		if(this._rttTexture != null) this._rttTexture.setIconIndex(idx);
	}
	,update: function(audio) {
		if(this._count == 0) this._boost = 1 + Math.pow(audio.subFreqByteData[3] / 255,7) * 2;
		this._count++;
		if(this._count >= this._life) this._callback(this);
		var ratio = Math.pow(Math.sin(this._count / this._life * Math.PI),this._lifePower);
		if(audio.subFreqByteData[4] / 255 > 0.2) this._speedRad += audio.subFreqByteData[5] * 0.002;
		this._speedRad *= 0.97;
		this._moveRad += this._speedRad;
		this._moveSpd += Math.pow(audio.freqByteData[4] / 255,5);
		this._moveSpd *= 0.95;
		this._vx = this._moveSpd * Math.cos(this._moveRad);
		this._vy = this._moveSpd * Math.sin(this._moveRad);
		this._pos.x += this._vx;
		this._pos.y += this._vy;
		var dx = this._pos.x - this._oldPos.x;
		var dy = this._pos.y - this._oldPos.y;
		var rad = Math.atan2(dy,dx);
		this._geo.verticesNeedUpdate = true;
		var react = Math.pow(audio.freqByteData[5] / 255,1);
		var amp = this._boost * react * 512 / 4 * Math.sin(this._count * audio.freqByteData[0] / 255 * 0.01) + 512 * this._minAmpRatio;
		amp *= ratio;
		this._geo.vertices[2].x = this._geo.vertices[0].x;
		this._geo.vertices[2].y = this._geo.vertices[0].y;
		this._geo.vertices[3].x = this._geo.vertices[1].x;
		this._geo.vertices[3].y = this._geo.vertices[1].y;
		this._geo.vertices[0].x = this._pos.x + amp * Math.cos(rad - Math.PI / 2);
		this._geo.vertices[0].y = this._pos.y + amp * Math.sin(rad - Math.PI / 2);
		this._geo.vertices[1].x = this._pos.x + amp * Math.cos(rad + Math.PI / 2);
		this._geo.vertices[1].y = this._pos.y + amp * Math.sin(rad + Math.PI / 2);
		this._oldPos.x = this._pos.x;
		this._oldPos.y = this._pos.y;
		this._oldRad = rad;
		this.visible = true;
	}
	,kill: function() {
	}
});
planes.rtt = {};
planes.rtt.RTTTexture = function() {
	this._type = 0;
	this._life = 0;
	this._vr = 0;
	this._count = 0;
};
planes.rtt.RTTTexture.prototype = {
	init: function() {
		this._render = Main3d.renderer;
		this._renderTarget = new THREE.WebGLRenderTarget(512,1);
		this._scene = new THREE.Scene();
		this._camera = new THREE.OrthographicCamera(-512 / 2,512 / 2,1 / 2,-1 / 2);
		this._camera.position.z = 300;
		this._camera.lookAt(new THREE.Vector3());
		if(planes.rtt.RTTTexture._geo == null) planes.rtt.RTTTexture._geo = new THREE.PlaneBufferGeometry(512,512,1,1);
		this.shader = new emoji.EmojiSingleShader();
		this.shader.init();
		this._mesh = new THREE.Mesh(planes.rtt.RTTTexture._geo,this.shader.shaderMaterial);
		this._scene.add(this._mesh);
		this._vr = Math.PI / 20 * (Math.random() - 0.5);
	}
	,setIconIndex: function(idx) {
		this.shader.setIconIndex(idx);
	}
	,start: function(idx,life) {
		this.setIconIndex(idx);
		this._life = life;
		this._type = Math.floor(Math.random() * 4);
		this._count = 0;
		this._vr = Math.PI / 40 * (Math.random() - 0.5);
	}
	,update: function() {
		var ratio = this._count / this._life;
		this._count++;
		if(this._mesh != null) {
			var _g = this._type;
			switch(_g) {
			case 0:
				this._mesh.rotation.z += this._vr;
				break;
			case 1:
				this._mesh.position.y = 512 / 2 * Math.sin(ratio * 2 * Math.PI);
				break;
			case 2:
				this._mesh.position.y = 512 / 2 * Math.sin(ratio * 2 * Math.PI) * Math.sin(ratio * 3.2 * Math.PI);
				break;
			case 3:
				this._mesh.rotation.z += this._vr / 4;
				this._mesh.position.y = 512 / 2 * Math.sin(ratio * 1.3 * Math.PI) * Math.sin(ratio * 1.9 * Math.PI);
				break;
			}
			this._render.autoClearColor = true;
			this._render.render(this._scene,this._camera,this._renderTarget);
			this._render.autoClearColor = false;
		}
	}
	,getRenderTarget: function() {
		return this._renderTarget;
	}
};
planes.rtt.RTTTextures = function() {
};
planes.rtt.RTTTextures.init = function() {
	planes.rtt.RTTTextures._textures = [];
	var _g1 = 0;
	var _g = planes.rtt.RTTTextures.MAX;
	while(_g1 < _g) {
		var i = _g1++;
		var t = new planes.rtt.RTTTexture();
		t.init();
		planes.rtt.RTTTextures._textures.push(t);
	}
};
planes.rtt.RTTTextures.getNext = function() {
	planes.rtt.RTTTextures._counter++;
	return planes.rtt.RTTTextures._textures[planes.rtt.RTTTextures._counter % planes.rtt.RTTTextures._textures.length];
};
planes.rtt.RTTTextures.update = function() {
	var _g1 = 0;
	var _g = planes.rtt.RTTTextures._textures.length;
	while(_g1 < _g) {
		var i = _g1++;
		planes.rtt.RTTTextures._textures[i].update();
	}
};
var sound = {};
sound.MyAudio = function() {
	this.globalVolume = 0.899;
	this.isStart = false;
};
sound.MyAudio.prototype = {
	init: function() {
		var nav = window.navigator;
		nav.webkitGetUserMedia({ audio : true},$bind(this,this._handleSuccess),$bind(this,this._handleError));
	}
	,_handleError: function(evt) {
		window.alert("err");
	}
	,_handleSuccess: function(evt) {
		var audioContext = new AudioContext();
		var source = audioContext.createMediaStreamSource(evt);
		this.analyser = audioContext.createAnalyser(evt);
		this.analyser.fftSize = 32;
		this.subFreqByteData = [];
		this._oldFreqByteData = [];
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			this.subFreqByteData[i] = 0;
			this._oldFreqByteData[i] = 0;
		}
		source.connect(this.analyser);
		this.isStart = true;
		common.Dat.gui.add(this,"globalVolume",0.1,3).step(0.1);
	}
	,update: function() {
		if(!this.isStart) return;
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
			this.freqByteData[i2] = Math.floor(this.freqByteData[i2] * this.globalVolume);
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
	}
};
var three = {};
three.Face = function() { };
three.IFog = function() { };
three.Mapping = function() { };
three.Renderer = function() { };
three._WebGLRenderer = {};
three._WebGLRenderer.RenderPrecision_Impl_ = function() { };
var utils = {};
utils.MyBitmapData = function() {
	this.visible = true;
};
utils.MyBitmapData.prototype = {
	draw: function() {
	}
	,initB: function(video,ww,hh,img) {
		if(this._canvas == null) {
			var _this = window.document;
			this._canvas = _this.createElement("canvas");
			this._canvas.id = "bitmap";
			this._context = this._canvas.getContext("2d");
			this._video = video;
			this._width = ww;
			this._height = hh;
			this._canvas.width = this._width;
			this._canvas.height = this._height;
			this._img = img;
			if(this._img != null) this._context.drawImage(this._img,0,0,this._img.width,this._img.height,0,0,this._width,this._height); else this._context.drawImage(video,0,0,video.videoHeight,video.videoHeight,0,0,this._width,this._height);
			this._imageData = this._context.getImageData(0,0,this._width,this._height);
		}
	}
	,drawVideo: function(ww,hh) {
		if(this._video != null) this._context.drawImage(this._video,0,0,this._video.videoHeight,this._video.videoHeight,0,0,ww,hh); else this._context.drawImage(this._img,0,0,this._img.width,this._img.height,0,0,ww,hh);
		this._imageData = this._context.getImageData(0,0,ww,hh);
	}
	,updateImageData: function() {
		if(this._context != null) this._imageData = this._context.getImageData(0,0,this._width,this._height);
	}
	,setPixel: function(color,x,y) {
		var r = (color & 16711680) >> 16;
		var g = (color & 65280) >> 8;
		var b = color & 255;
		var a = (color & -16777216) >> 24;
		var index = (this._width * y + x) * 4;
		this._imageData.data[index] = r;
		this._imageData.data[index + 1] = g;
		this._imageData.data[index + 2] = b;
		this._imageData.data[index + 3] = a;
	}
	,getPixel: function(x,y,ww) {
		var index = (x + y * ww) * 4;
		var r = this._imageData.data[index];
		var g = this._imageData.data[index + 1];
		var b = this._imageData.data[index + 2];
		var a = this._imageData.data[index + 3];
		return (r + g + b) / 3;
	}
	,show: function() {
		this.visible = true;
	}
	,hide: function() {
		this.visible = false;
	}
	,getCanvas: function() {
		return this._canvas;
	}
	,kill: function() {
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
var q = window.jQuery;
js.JQuery = q;
Mosaic.MODE_MOSAIC = "MODE_MOSAIC";
Mosaic.MODE_SLITTER = "MODE_SLITTER";
Mosaic.forceClear = false;
OsChecker.WIN = "win";
OsChecker.MAC = "mac";
OsChecker.IOS = "ios";
OsChecker.ANDROID = "android";
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
canvas.CanvasSrc.W = 160;
canvas.CanvasSrc.H = 120;
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
common.StageRef.w = 1024;
common.StageRef.h = 768;
data.TextureData.emo2048 = new data.TextureData("emo2048.png",2048,2048);
data.TextureData.emo128 = new data.TextureData("emo128.png",2048,2048);
emoji.EmojiSpritePos.EMOJI_MAX1 = 845;
emoji.EmojiSpritePos.EMOJI_MAX2 = 200;
emoji.EmojiSpritePos.NUMX1 = 32;
emoji.EmojiSpritePos.NUMX2 = 16;
planes.IconGenerator.MAX = 10;
planes.rtt.RTTTexture.width = 512;
planes.rtt.RTTTexture.height = 1;
planes.rtt.RTTTexture.TYPE_0 = 0;
planes.rtt.RTTTexture.TYPE_1 = 1;
planes.rtt.RTTTexture.TYPE_2 = 2;
planes.rtt.RTTTexture.TYPE_3 = 3;
planes.rtt.RTTTextures.MAX = 20;
planes.rtt.RTTTextures._counter = 0;
sound.MyAudio.FFTSIZE = 32;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
Main.main();
})();
