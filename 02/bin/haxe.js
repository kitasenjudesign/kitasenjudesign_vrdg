(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
var Lambda = function() { };
Lambda.__name__ = true;
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
List.__name__ = true;
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
	,__class__: List
};
var Main = function() {
	window.onload = $bind(this,this.initialize);
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	initialize: function(e) {
		var main = new Main3d();
		main.init();
	}
	,__class__: Main
};
var Main3d = function() {
	this.scale = 1;
	this.counter = 0;
	this.clock = new THREE.Clock();
	this.animationFrameLength = 32;
	this.hh = canvas.CanvasSrc.H;
	this.ww = canvas.CanvasSrc.W;
};
Main3d.__name__ = true;
Main3d.prototype = {
	init: function() {
		Main3d.renderer = new THREE.WebGLRenderer({ devicePixelRatio : 1, antialias : false, preserveDrawingBuffer : true, alpha : false});
		window.document.body.appendChild(Main3d.renderer.domElement);
		Main3d.renderer.domElement.id = "webgl";
		common.Dat.init($bind(this,this._onInit0));
	}
	,_onInit0: function() {
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this._onInit));
	}
	,_onInit: function() {
		this.scene = new THREE.Scene();
		Main3d.renderer.setSize(Main3d.W,Main3d.H);
		Main3d.renderer.domElement.style.position = "absolute";
		Main3d.renderer.domElement.style.zIndex = "2002";
		Main3d.renderer.domElement.style.width = "" + Main3d.W;
		Main3d.renderer.domElement.style.height = "" + Main3d.H;
		this.camera = new camera.ExCamera(30,Main3d.W / Main3d.H,2,10000);
		this.camera.init(Main3d.renderer.domElement);
		this.camera.amp = 1000;
		this.camera.position.z = 350;
		this.camera.lookAt(new THREE.Vector3());
		this._mosaic = new Mosaic();
		this._mosaic.init(this.scene,this.camera,Main3d.renderer);
		this.scene.add(this._mosaic);
		this.animate();
		common.Dat.gui.add(this.camera,"amp",10,20000).listen();
		common.Dat.gui.add(this.camera,"radX",0,2 * Math.PI).step(0.01).listen();
		common.Dat.gui.add(this.camera,"radY",0,2 * Math.PI).step(0.01).listen();
		common.StageRef.setCenter();
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
	}
	,goFullScreen: function() {
		window.document.body.webkitRequestFullscreen();
	}
	,_onResize: function(e) {
		Main3d.W = common.StageRef.get_stageWidth();
		Main3d.H = common.StageRef.get_stageHeight();
		Main3d.renderer.domElement.width = Main3d.W;
		Main3d.renderer.domElement.height = Main3d.H;
		Main3d.renderer.setSize(Main3d.W,Main3d.H);
		this.camera.aspect = Main3d.W / Main3d.H;
		this.camera.updateProjectionMatrix();
	}
	,animate: function() {
		this._audio.update();
		this.camera.update();
		this.counter++;
		this._mosaic.update(this._audio);
		haxe.Timer.delay($bind(this,this.animate),Math.floor(20.8333333333333321));
	}
	,__class__: Main3d
};
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Mosaic = function() {
	this._isAutoClear = false;
	THREE.Object3D.call(this);
};
Mosaic.__name__ = true;
Mosaic.__super__ = THREE.Object3D;
Mosaic.prototype = $extend(THREE.Object3D.prototype,{
	init: function(scene,camera,renderer) {
		this._scene = scene;
		this._renderer = renderer;
		this._camera = camera;
		this._emoji = new emoji.Emojis();
		this._emoji.init(this._scene,camera,canvas.CanvasSrc.W,canvas.CanvasSrc.H);
		this.showMosaic();
	}
	,showMosaic: function() {
		this._emoji.particles.visible = true;
		this._isAutoClear = true;
		this._emoji.isActive = true;
	}
	,update: function(audio) {
		if(this._emoji.particles.visible) this._emoji.update(audio);
		this._renderer.autoClearColor = this._isAutoClear;
		if(Mosaic.forceClear) this._renderer.autoClearColor = true;
		this._renderer.render(this._scene,this._camera);
		Mosaic.forceClear = false;
	}
	,__class__: Mosaic
});
var OsChecker = function() {
};
OsChecker.__name__ = true;
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
OsChecker.prototype = {
	__class__: OsChecker
};
var Std = function() { };
Std.__name__ = true;
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
_Three.CullFace_Impl_.__name__ = true;
_Three.FrontFaceDirection_Impl_ = function() { };
_Three.FrontFaceDirection_Impl_.__name__ = true;
_Three.ShadowMapType_Impl_ = function() { };
_Three.ShadowMapType_Impl_.__name__ = true;
_Three.Side_Impl_ = function() { };
_Three.Side_Impl_.__name__ = true;
_Three.Shading_Impl_ = function() { };
_Three.Shading_Impl_.__name__ = true;
_Three.Colors_Impl_ = function() { };
_Three.Colors_Impl_.__name__ = true;
_Three.BlendMode_Impl_ = function() { };
_Three.BlendMode_Impl_.__name__ = true;
_Three.BlendingEquation_Impl_ = function() { };
_Three.BlendingEquation_Impl_.__name__ = true;
_Three.BlendingDestinationFactor_Impl_ = function() { };
_Three.BlendingDestinationFactor_Impl_.__name__ = true;
_Three.TextureConstant_Impl_ = function() { };
_Three.TextureConstant_Impl_.__name__ = true;
_Three.WrappingMode_Impl_ = function() { };
_Three.WrappingMode_Impl_.__name__ = true;
_Three.Filter_Impl_ = function() { };
_Three.Filter_Impl_.__name__ = true;
_Three.DataType_Impl_ = function() { };
_Three.DataType_Impl_.__name__ = true;
_Three.PixelType_Impl_ = function() { };
_Three.PixelType_Impl_.__name__ = true;
_Three.PixelFormat_Impl_ = function() { };
_Three.PixelFormat_Impl_.__name__ = true;
_Three.TextureFormat_Impl_ = function() { };
_Three.TextureFormat_Impl_.__name__ = true;
_Three.LineType_Impl_ = function() { };
_Three.LineType_Impl_.__name__ = true;
var Three = function() { };
Three.__name__ = true;
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
	this.radY = 0.01;
	this.radX = 0.01;
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
camera.ExCamera.__name__ = true;
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
	,__class__: camera.ExCamera
});
var canvas = {};
canvas.CanvasData = function() {
};
canvas.CanvasData.__name__ = true;
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
	,__class__: canvas.CanvasData
};
canvas.CanvasSrc = function() {
};
canvas.CanvasSrc.__name__ = true;
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
		window.document.body.appendChild(this._renderer.domElement);
		this._camera = new camera.ExCamera(60,canvas.CanvasSrc.W / canvas.CanvasSrc.H,2,800);
		this._camera.init();
		this._scene = new THREE.Scene();
		this._scene.overrideMaterial = new THREE.MeshDepthMaterial();
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
	,next: function(isRandom) {
		this._primitives.next(isRandom);
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
	,__class__: canvas.CanvasSrc
};
canvas.primitives = {};
canvas.primitives.PrimitiveBase = function() {
	THREE.Object3D.call(this);
};
canvas.primitives.PrimitiveBase.__name__ = true;
canvas.primitives.PrimitiveBase.__super__ = THREE.Object3D;
canvas.primitives.PrimitiveBase.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
	}
	,start: function() {
	}
	,update: function(a,rotV) {
		this.rotation.x += rotV.x;
		this.rotation.y += rotV.y;
		this.rotation.z += rotV.z;
	}
	,__class__: canvas.primitives.PrimitiveBase
});
canvas.primitives.Cube = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Cube.__name__ = true;
canvas.primitives.Cube.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Cube.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var materials = [new THREE.MeshLambertMaterial({ color : 2293555}),new THREE.MeshLambertMaterial({ color : 4521728}),new THREE.MeshLambertMaterial({ color : 1179647}),new THREE.MeshLambertMaterial({ color : 3342591}),new THREE.MeshLambertMaterial({ color : 16711731}),new THREE.MeshLambertMaterial({ color : 16746496})];
		var cube = new THREE.Mesh(new THREE.BoxGeometry(130,130,130,10,10,10),new THREE.MeshFaceMaterial(materials));
		this.add(cube);
		var w = 65.15;
		var g = new THREE.Geometry();
		g.vertices.push(new THREE.Vector3(w,w,w));
		g.vertices.push(new THREE.Vector3(-w,w,w));
		g.vertices.push(new THREE.Vector3(-w,w,-w));
		g.vertices.push(new THREE.Vector3(w,w,-w));
		g.vertices.push(new THREE.Vector3(w,w,w));
		g.vertices.push(new THREE.Vector3(w,-w,w));
		g.vertices.push(new THREE.Vector3(-w,-w,w));
		g.vertices.push(new THREE.Vector3(-w,-w,-w));
		g.vertices.push(new THREE.Vector3(w,-w,-w));
		g.vertices.push(new THREE.Vector3(w,-w,w));
		var g2 = new THREE.Geometry();
		g2.vertices.push(new THREE.Vector3(-w,w,w));
		g2.vertices.push(new THREE.Vector3(-w,-w,w));
		var g3 = new THREE.Geometry();
		g3.vertices.push(new THREE.Vector3(w,w,-w));
		g3.vertices.push(new THREE.Vector3(w,-w,-w));
		var g4 = new THREE.Geometry();
		g4.vertices.push(new THREE.Vector3(-w,w,-w));
		g4.vertices.push(new THREE.Vector3(-w,-w,-w));
		var line = new THREE.LineBasicMaterial({ color : 16777215, linewidth : 2});
		var mesh1 = new THREE.Line(g,line);
		this.add(mesh1);
		var mesh2 = new THREE.Line(g2,line);
		this.add(mesh2);
		var mesh3 = new THREE.Line(g3,line);
		this.add(mesh3);
		var mesh4 = new THREE.Line(g4,line);
		this.add(mesh4);
	}
	,__class__: canvas.primitives.Cube
});
canvas.primitives.Cubes = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Cubes.__name__ = true;
canvas.primitives.Cubes.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Cubes.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var materials = [new THREE.MeshLambertMaterial({ color : 2293555}),new THREE.MeshLambertMaterial({ color : 4521728}),new THREE.MeshLambertMaterial({ color : 1179647}),new THREE.MeshLambertMaterial({ color : 3342591}),new THREE.MeshLambertMaterial({ color : 16711731}),new THREE.MeshLambertMaterial({ color : 16746496})];
		var mm = new THREE.MeshFaceMaterial(materials);
		var geo = new THREE.BoxGeometry(130,130,130,10,10,10);
		this._cubes = [];
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			var cube = new canvas.primitives.ExMesh(geo,mm);
			this.add(cube);
			cube.position.x = 800 * (Math.random() - 0.5);
			cube.position.y = 800 * (Math.random() - 0.5);
			cube.position.z = 800 * (Math.random() - 0.5);
			cube.amp = 400 + 600 * Math.random();
			cube.radX = 2 * Math.PI * Math.random();
			cube.radY = 2 * Math.PI * Math.random();
			var ss = Math.random() * 0.4 + 0.8;
			cube.scale.set(ss,ss,ss);
			this._cubes.push(cube);
		}
	}
	,update: function(a,rotV) {
		var _g1 = 0;
		var _g = this._cubes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var aa = a.freqByteData[0] / 255 * Math.PI / 5 + Math.PI / 10;
			this._cubes[i].rotation.x += aa * this._cubes[i].vx;
			this._cubes[i].rotation.y += aa * this._cubes[i].vz;
			this._cubes[i].rotation.z += aa * this._cubes[i].vz;
			this._cubes[i].position.y -= 10 + Math.abs(aa * this._cubes[i].vy);
			if(this._cubes[i].position.y < -400) this._cubes[i].position.y = 400;
		}
		this.rotation.y += rotV.y * 0.5;
	}
	,__class__: canvas.primitives.Cubes
});
canvas.primitives.DeDeFace = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.DeDeFace.__name__ = true;
canvas.primitives.DeDeFace.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.DeDeFace.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		if(this._loader == null) {
			this._loader = new data.MyDAELoader();
			this._loader.load("mae_face.dae",$bind(this,this._onLoad));
		}
	}
	,_onLoad: function() {
		this.visible = false;
		this.add(this._loader.dae);
	}
	,update: function(a,rotV) {
		this.rotation.y += rotV.y * 0.5 + 0.01;
	}
	,__class__: canvas.primitives.DeDeFace
});
canvas.primitives.DeDeLogo = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.DeDeLogo.__name__ = true;
canvas.primitives.DeDeLogo.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.DeDeLogo.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		if(this._loader == null) {
			this._loader = new data.MyDAELoader();
			this._loader.load("dae/mouse.dae",$bind(this,this._onLoad));
		}
	}
	,_onLoad: function() {
		this.visible = false;
		this._loader.dae.scale.x = 0.3;
		this._loader.dae.scale.y = 0.3;
		this._loader.dae.scale.z = 0.3;
		this.add(this._loader.dae);
		this._dede1 = this._loader.dae;
		this._dede2 = this._loader.dae.clone();
		this.add(this._dede2);
		this._dede2.position.x = 200;
		this._dede3 = this._loader.dae.clone();
		this.add(this._dede3);
		this._dede3.position.x = -200;
	}
	,update: function(a,rotV) {
		if(this._dede1 != null) this._dede1.rotation.y += rotV.y * 0.5 + 0.01;
		if(this._dede2 != null) this._dede2.rotation.y = this._dede1.rotation.y;
		if(this._dede3 != null) this._dede3.rotation.y = this._dede1.rotation.y;
	}
	,__class__: canvas.primitives.DeDeLogo
});
canvas.primitives.ExMesh = function(g,m) {
	this.vz = Math.random() - 0.5;
	this.vy = Math.random() - 0.5;
	this.vx = Math.random() - 0.5;
	this.radY = 0.01;
	this.radX = 0.01;
	this.amp = 200.0;
	THREE.Mesh.call(this,g,m);
};
canvas.primitives.ExMesh.__name__ = true;
canvas.primitives.ExMesh.__super__ = THREE.Mesh;
canvas.primitives.ExMesh.prototype = $extend(THREE.Mesh.prototype,{
	update: function() {
		var amp1 = this.amp * Math.cos(this.radY);
		this.position.x = amp1 * Math.sin(this.radX);
		this.position.y = this.amp * Math.sin(this.radY);
		this.position.z = amp1 * Math.cos(this.radX);
	}
	,__class__: canvas.primitives.ExMesh
});
canvas.primitives.Kitasenju = function() {
	this.a3 = "M-27,79.1c0.8,0,0.9,0,1.9-0.5c0.3-0.2,3.3-0.5,3.9-0.7c0.5-0.1,0.8-0.3,1.2-0.6c3,0,3.4,0.3,6,2c3.6,2.5,5.8,4.1,6.7,6.2c0.1,0.4,1.1,1.6,1.2,1.9c0.9,1.9,1,2.1,1,2.4c0,0.4-0.2,0.6-0.4,0.8v0.7c-1.6,1.4-1.8,1.6-3.3,2.8c-0.2,0.2-1.1,1.5-1.3,1.7c-1.2,1-1.3,1.1-1.8,2c-0.2,0.4-1.2,2.2-1.4,2.6c-0.3,0.4-1.1,3.2-1.3,3.7c-1.6,3.1-1.8,3.5-3.1,5.7c-0.5,0.7-0.8,1.5-1.2,2.5c1.4,1.2,1.5,1.4,2.5,1.9c0.3,0.1,3.8,4.3,3.8,6.5c0,0.9,0.2,5.1,0.1,6.1c0,0.3-0.3,1.8-0.3,2.2v10.2c0,1.1,0,5.3-0.1,6.1l-0.5,6.8v2c0.3,0.1,0.7,0.3,1,0.3c0.9,0,4.8-1,5.6-1c0.2,0,0.9,0.1,1,0l8.9-1.6c0.5,0,3.7-0.6,5.2-0.6c1.6,0,1.9,0,1.9-1c0-0.3-0.1-1.7-0.1-2L10,139c-0.2,0-3.8,0.4-4.2,0.5C5.4,139.6,4,140,3.7,140c-0.4,0-5.6-0.8-9.3-4.7c-0.6-0.5-4-3.1-4.1-3.7c0.1-0.2,0.5-0.5,0.8-0.5c2.9,0,6.7,0,9.3-0.5l8.3-1.5c1.6-0.3,2-0.3,2-1.4c0-0.4-0.2-2.1-0.2-2.5c0-7.3,0-8.8-1.2-8.8c-0.9,0-4.8,0.6-5.6,0.6c-4.9,0-15.2-5.6-15.3-6.9l-0.6-0.2v-1.1c2.1-0.2,2.7-0.2,3.9,0c0.7-0.4,5.3-1.1,5.5-1.1c1.4,0,1.7-0.1,4.5-0.8c0.8-0.2,4.4-0.6,5.2-0.8l6.8-1.4c0.5-0.1,1.1-0.2,1.5-0.3c1.4,0,3.4-0.4,4.9-0.7c1.3-0.3,7.1-1.1,8.1-1.7c0.3-0.2,1.5-2,1.7-2.3c0.1-0.2,1.3-1,1.5-1.2c0.6,0.3,3.6,0.8,4.2,1c3,1,3.2,1.4,5.4,3c0.5,0.3,2.5,1.6,2.7,2c0.1,0.3,0.7,1.8,0.8,2.1c-0.3,0.9-0.5,1.6-0.8,1.8c-0.7,0.5-2,1.2-2.6,1.7c-3.3,0.5-17.4,4-20.3,4.4v0.2c1.9,1.8,3.7,3.4,3.7,5.5c0,0.3,0,1.9,0.3,2.4c-0.1,0.3-0.6,1.8-0.6,2.1c0,0.3,0,0.5,0.3,1.4c1.4,0.1,1.6-0.1,3.8-1.2c0.2-0.2,1.3-0.9,1.5-0.9c0.3-0.1,1.4-0.6,1.7-0.6c0.3-0.1,1.3-0.2,1.8-0.2c0.4,0,2.2,1.1,2.6,1.2c3.8,1.7,4.4,1.9,6.5,4.5c0.2,0.3,0.5,0.9,0.5,1.5c0,1.3-1,4.1-3.9,4.4c-1.2,0.1-1.4,0.1-2,0.6c-2.6,0.2-5.3,0.4-7.7,0.6c-3.5,0.3-3.9,0.4-5.1,0.9c-0.2,0.8-0.2,1.1-0.2,1.8v0.8l-0.6,8.3l-0.6,1.3v0.4l0.6,0.2l7.7-0.9c0.5,0,2.9,0.1,3.4-0.1c1.8-0.7,2-0.8,2.9-1c0.3-0.1,1.4-1,1.7-1c0.8,0,8.2,5.3,8.3,5.4c0.3,0.3,1.5,1.6,1.7,2.1c1.1,3.8,1.2,4.2,1.2,4.5c0,0.7-0.6,1.5-1,1.9c-0.3,0.1-1.8,0.9-2.1,1c-0.5,0.1-0.8,0.1-1.1,0l-7.8-1c-2.8-0.4-7.2-1.4-10-1.4l-7.5,0.1c-3.8,0.1-4.2,0.3-6.7,0.6c-0.2,0-1.9,0.1-2.6,0.3c-0.3,0-1.9,0.5-2.2,0.6c-0.3,0-1.8,0.1-2.1,0.2c-0.9,0.1-4.6,1.3-5.4,1.2c-0.8,0.3-1,0.4-1.6,0.8c-0.7,0-0.8,0.1-1.1,0.4c-2.3,0-7.3-2.9-8.8-3.8c-0.6-0.4-3-2.5-3.6-2.8c-0.4,3.4-0.5,3.7-1.7,6.2l-0.7,0.3c-0.6,0.9-1.9,2.7-3.3,2.7c-1.3,0-2.1-0.4-2.4-0.6c-0.9-1-5.6-7.6-5.6-9.5c0-0.4,0.4-1.2,0.4-1.3v-2c0.2-0.3,1.3-1.7,1.4-2.1l0.6-0.4l0.2-1.5l1-11l0.5-9v-6.1l-0.1-0.4c-0.5,0.6-0.6,0.8-1.2,2.1c-0.9,1.7-6.5,8.5-9.1,11.1c-0.7,0.7-4.4,3.8-5,4.5c-0.2,0.2-1.2,0.6-1.4,0.7c-3.5,2.3-3.8,2.5-6.7,3.3c-0.2-0.3-0.2-0.4-0.2-0.6c0-0.9,0.2-1.2,2.4-4.4c0.1-0.2,12.5-25.8,13.5-28.2c1.6-3.6,8.3-22.2,8.8-23.2c0.2-2.2-1.5-3.7-3.2-5.2c-0.3-0.3-1.5-2-1.8-2.3L-27,79.1z M2.5,79.3l0.2-0.7c0.9,0.1,4.5,1.7,5.3,2c1.7,0.5,3.9,0.5,6.2,0.5c0.8,0,3.3-0.1,4-0.3c0.4-0.1,1.7-0.9,2.1-0.9c0.1,0,1,0.2,1.1,0.2c2.1,0,5.3,1.6,7.7,3c0.3,0.2,1.9,1.2,2.2,1.3c0.3,0.1,0.7,0.2,0.8,0.2c1,1.6,1.5,2.3,1.5,4.5l-0.4,0.3c-0.1,0.6-1.1,2.3-1.7,2.6c-0.7,0.4-2.3,0.9-3.4,1.3c-3.9,0-4.3,0-6.7,0.3c-2.6,0-9.9-1-11.7-2.8c-0.4-0.4-1.4-0.7-1.9-1.1C7,89,3.4,86,1.8,81.2c-0.1-0.3,0-1,0.1-2.1L2.5,79.3z";
	this.a2 = "M-44.9-0.7c0.3-0.1,0.9-0.2,1.3-0.1c0.3,0.2,0.9,0.3,1.1,0.4c0.2,0,0.8-0.2,1-0.2c0.7,0,3.9,0.1,4.6,0c0.1,0,1.7,0.3,2.1,0.3c0.1,0,0.8-0.3,0.9-0.3l8.4-1h0.5l10.5-1.3h0.5l8.9-0.8l2.2-0.5l0.2-1.4l-0.2-17.5c0-1.6,0-2.9-1-2.9c-0.5,0-6.5,1.2-7.7,1.2c-3.7,0-5-0.9-5.8-1.5l-5.1-3.7c-0.3-0.2-3-2.1-3.7-2.9c-0.2-0.2-1.8-1.8-3.2-3c0.2-0.1,0.5-0.4,0.7-0.4c0.3,0,1.7,0.4,2,0.5c0.3-0.3,0.5-0.4,0.8-0.4c0.3,0,0.7,0.1,0.9,0.2l0.6-0.2l0.5,0.6l4.1,0.4L-3-36.9l13.3-2.3c0.4-0.1,5.2-1.2,5.4-1.8c0.7-1.3,1-2.1,3-2.1c0.3,0,1,0.1,1.3,0c0.4,0,1.8-0.5,2.1-0.5c2,0,3.7,1.5,5.2,2.9c0.3,0.3,2.3,1.3,2.6,1.5c0.7,0.6,3.5,3.1,3.5,4.4c0,0.5-0.2,2.2-0.9,3c-0.6,0.1-3,1.5-3.5,1.7c-3.9,1.2-4.9,1.3-5.9,1.3c-0.4,0-2.7,0-3,0.1h-0.6l-8.2,1.2c-1,0.1-5.8,0.5-6.7,0.7c0.6,1.3,2.3,2.5,3.8,3.5c1.1,0.8,4.2,5.6,4.2,7.9c0,0.8-1,4-1.1,4.7l-0.3,5.9l0.1,0.3l11.6-0.9l3.9-0.4c1.1-1.5,2.5-3.3,5.8-3.3c2.1,0,5.7,0.9,7.8,2c7.6,4.1,8.4,4.6,8.4,8c0,2.1-0.8,2.7-1.3,3.2L47.1,4c-1.2,1.4-4.2,1.9-5.9,1.9c-0.4,0-2-0.4-2.3-0.4L27.6,4.6l-3.7-0.3L12.1,5.2l-1.5,0.2l-0.2,0.2v0.3l-0.2,11.8v0.7l0.4,8.7c0,0.3-0.2,1-0.2,1.3c0,0.2,0.1,1,0.1,1.2l-0.8,8.5C9.3,42,7.5,48.4,2.9,48.4c-0.3,0-3-0.4-4.7-4.9L-4.3,37c-0.5-1.4-0.6-1.6-0.6-2.5l-0.3-0.3l-0.1-0.4c0.4-0.2,0.5-0.4,0.7-1.2c0.9-0.6,0.9-1,1.1-4.8L-3,17.7l0.1-11.1c-4.3,0-4.9-0.1-9.7,1.1l-7,1.7c-0.5,0.1-3.4,0.8-3.6,0.9c-0.3,0.2-1.9,1.4-2.3,1.4c-0.4,0-3-0.3-3.5-0.3c-0.6-0.1-5.2-2-10-5.9c-0.8-0.7-4.2-4.4-5-5L-44.9-0.7z";
	this.a1 = "M-24-93.5c1-0.7,5.2-3.8,6.2-4.3c1.3-0.7,1.6-1,1.6-1.9c0-0.7-0.5-3.7-0.5-4.3l0.1-9.6v-2.9l-0.2-0.1c-1.4,0.8-2.1,1.1-2.6,1.3c-0.4,0.2-7.1,2.1-7.8,2.1c-0.2,0-7.6-1.8-8.9-3.3c-0.3-0.5-2.3-2.2-2.5-2.6c-0.4-0.7-1.3-2.8-1.3-3.7c0.5,0,2.4,0.8,2.9,0.8c0.8,0,3-0.5,4.2-0.9l7.8-2.7c0.2-0.1,4.9-2.1,5.9-2.2l1.5-0.7l-0.1-10.3c0-2.7-0.1-8-0.3-8.6c-0.4-0.9-1.9-2.3-3.4-2.9c-0.1-0.1-2-1.9-2.1-2.7c0.8-0.1,4.5-1.8,5.3-1.8c3.9,0,5.8,1.6,8.5,3.8c0.4,0.3,2.1,1.6,2.4,1.9c1.3,1.7,1.4,1.9,2.5,2.9c1.1,1.1,2.3,2.2,2.3,4.8c0,1.1-0.4,1.4-1.2,2.3c-0.5,0.6-0.8,2.3-0.8,2.6l0.1,0.5l-0.5,8.8c0,0.7-0.5,3.5-0.5,4.1c0,0.1,0.2,0.6,0.2,0.7c0,0.2-0.4,1.2-0.4,1.4l-0.2,8.7l-0.1,5.5l0.7-0.3l7-4.7l1.3-1l0.2,0.5c-0.4,0.6-0.7,1.5-1,2.1c0,0.8-0.3,1.8-0.7,2.5c-0.7,1.2-3.8,6.6-4.4,7.7c-0.1,0.1-4.1,4.3-5.4,5.3c-0.2,0.2-0.2,0.4-0.3,0.8c-0.6,0.8-3.6,3.6-4.2,4.2l-5.6,5.8c-0.9,0.9-4.6,4.5-5.2,5.3c-0.3,0.5-0.3,0.8-0.3,1.6c-0.8,0.5-1,0.6-1.8,0.9l-0.1,0.3c-0.1,0-4.9-0.1-6-1c-3.3-2.5-6.8-5.2-7.1-6.3c0-0.2-0.3-1.1-0.4-1.3c0-0.2-0.9-1.1-1-1.3c-0.2-0.4-0.9-2.1-0.8-2.3c0.8,0.1,1.2,0.1,5.4,0.3c0.3,0.1,1.3,0.4,1.6,0.4c0.5,0,4.4-2.4,5-2.8L-24-93.5z M18.7-153.5c1.7,1.3,2.5,3.1,2.5,4.2c0,0.4-0.3,1.1-0.4,1.2c-0.7,0.7-1.9,2.1-1.9,3.3l-0.2,8.2c0,0.3-0.6,2.6-0.7,2.9c0,3.2,0,3.5,0.1,4.3l5.5-3.8c2.4-1.6,5.1-4.4,6.9-6.3c-0.1-0.4-0.3-2.5-0.5-2.8c-1-1.5-1.2-1.7-1.3-2.4c0.8-0.1,1.2,0,4.4,1c0.8,0.2,2.1,0.3,2.9,0.4c0.7,0,1.4,0.8,1.6,1l5.5,6.1c2.4,2.7,2.6,3,3,5.4l-0.3,1.4c-1.6,2.3-2,3-4.6,3c-0.4,0-2.6-0.2-2.7-0.2c-1.4,0-8.1,1.7-10.3,2.4c-1.3,0.5-7,2.8-8.2,2.9c-1.6,0.3-1.6,0.3-2.2,1.2l-0.6,14.7l-0.2,1.2l0.1,12.6c0,2,5.7,2,6.7,2c4.2,0,9.2-0.9,10.5-1.2c4.1-1.1,4.5-1.3,5.7-1.4c0.7-1.9,1.4-8.1,1.4-9.7c0-0.2-0.2-3.3-0.2-4c0-1,0.1-1.7,0.3-2.7c0.6,1.1,0.7,1.4,1.2,2.8l3,8.4l0.7,1.9l1.4,2.4l1.5,0.4c0.4,0.5,2.6,2,2.8,2.5c0.3,0.8,0.7,1.8,1,2.7c0,0.7-0.8,3.5-5.5,6.6c-0.5,0.3-2.7,1.4-3,1.8c-0.9,0.4-1.2,0.5-2.8,0.6c-1.4,0.7-5.8,1.5-7,1.5c-0.4,0-2.2,0.4-2.6,0.4c-0.5,0-3-0.2-3.5-0.2h-1.4L18.2-79c-2.6-0.6-7.7-3.3-9.6-6C5.9-88.8,5-90.2,5.1-95l0.1-6.7l-0.1-1L5-111.4c0-1.7,0.5-9.4,0.5-11l0.1-8.7l0.1-11.3v-10.2c0-0.8-0.2-1-1.6-2.7c-0.2-0.3-1.2-1.9-1.4-2.1c-0.4-0.3-2-1.2-2.1-1.5c-0.9-1.6-1-1.7-1-3.6c0.8,0.1,4.1,0.8,4.8,0.8c0.4,0,0.9,0.1,5.2,1.3c0.8,0.2,3.7,2.8,4.3,3.3L18.7-153.5z";
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Kitasenju.__name__ = true;
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
	,update: function(a,rotV) {
		this.scale.z = 0.3 + a.freqByteData[3] / 255;
		this.scale.x = 0.5 + 0.8 * a.freqByteData[3] / 255;
		this.scale.y = 0.5 + 0.8 * a.freqByteData[3] / 255;
		canvas.primitives.PrimitiveBase.prototype.update.call(this,a,rotV);
	}
	,__class__: canvas.primitives.Kitasenju
});
canvas.primitives.Knot = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Knot.__name__ = true;
canvas.primitives.Knot.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Knot.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(50,18,60,10,2,3),new THREE.MeshPhongMaterial({ color : 16746547}));
		this.add(mesh);
	}
	,__class__: canvas.primitives.Knot
});
canvas.primitives.Octa = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Octa.__name__ = true;
canvas.primitives.Octa.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Octa.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var geo = new THREE.OctahedronGeometry(60);
		var m = new THREE.MeshPhongMaterial({ color : 8947848, shading : 1});
		this._cubes = [];
		var space = 150;
		var ww = space * 2;
		var hh = space * 0;
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			var mesh = new canvas.primitives.ExMesh(geo,new THREE.MeshPhongMaterial({ color : Math.floor(16777215 * Math.random()), shading : 1}));
			this.add(mesh);
			var amp = 80;
			mesh.position.x = amp * Math.cos(i / 3 * 2 * Math.PI);
			mesh.position.z = amp * Math.sin(i / 3 * 2 * Math.PI);
			this._cubes.push(mesh);
		}
	}
	,update: function(a,rotV) {
		var _g1 = 0;
		var _g = this._cubes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var aa = a.freqByteData[0] / 255 * Math.PI / 25 + Math.PI / 20;
			this._cubes[i].rotation.x += aa * this._cubes[i].vx / 7;
			this._cubes[i].rotation.y += aa * this._cubes[i].vy;
			this._cubes[i].rotation.z += aa * this._cubes[i].vz / 7;
		}
		this.rotation.y += rotV.y * 0.5 + 0.01;
	}
	,__class__: canvas.primitives.Octa
});
canvas.primitives.Primitives = function() {
	this._tgtScale = 1;
	this._count = 0;
	THREE.Object3D.call(this);
};
canvas.primitives.Primitives.__name__ = true;
canvas.primitives.Primitives.__super__ = THREE.Object3D;
canvas.primitives.Primitives.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._primitives = [];
		this._minV = new THREE.Vector3();
		this._addV = new THREE.Vector3();
		this._cube = new canvas.primitives.Cube();
		this._cube.init();
		this.add(this._cube);
		this._cubes = new canvas.primitives.Cubes();
		this._cubes.init();
		this.add(this._cubes);
		this._sphere = new canvas.primitives.Sphere();
		this._sphere.init();
		this.add(this._sphere);
		this._spheres = new canvas.primitives.Spheres();
		this._spheres.init();
		this.add(this._spheres);
		this._torus = new canvas.primitives.Torus();
		this._torus.init();
		this.add(this._torus);
		this._logo = new canvas.primitives.VrdgLogo();
		this._logo.init();
		this.add(this._logo);
		this._octa = new canvas.primitives.Octa();
		this._octa.init();
		this.add(this._octa);
		this._knot = new canvas.primitives.Knot();
		this._knot.init();
		this.add(this._knot);
		this._kitasen = new canvas.primitives.Kitasenju();
		this._kitasen.init();
		this.add(this._kitasen);
		this._face = new canvas.primitives.DeDeFace();
		this._face.init();
		this.add(this._face);
		this._mouse = new canvas.primitives.DeDeLogo();
		this._mouse.init();
		this.add(this._mouse);
		this._two = new canvas.primitives.Two();
		this._two.init();
		this.add(this._two);
		this._primitives = [this._cube,this._two,this._cubes,this._sphere,this._spheres,this._torus,this._octa,this._knot,this._kitasen,this._face,this._mouse,this._logo];
		this.next(true);
	}
	,next: function(isRandom) {
		if(isRandom) this._count = Math.floor(Math.random() * this._primitives.length); else this._count++;
		this.setVisible(false);
		if(this._count == this._primitives.length - 1) {
		}
		this._primitives[this._count % this._primitives.length].visible = true;
		this._primitives[this._count % this._primitives.length].start();
		this.add(this._primitives[this._count % this._primitives.length]);
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
			this.remove(this._primitives[i]);
		}
	}
	,update: function(audio) {
		if(audio.subFreqByteData[3] / 255 > 0.1) {
			this._addV.x += Math.pow(audio.freqByteData[2],2) / 255 * 0.2;
			this._addV.y += Math.pow(audio.freqByteData[3],2) / 255 * 0.2;
			this._addV.z += Math.pow(audio.freqByteData[4],2) / 255 * 0.2;
		}
		this._addV.x *= 0.99;
		this._addV.y *= 0.99;
		this._addV.z *= 0.99;
		this._tgtScale = 0.8 + Math.pow(audio.freqByteData[8] / 255,2);
		this.scale.x = this._tgtScale;
		this.scale.y = this._tgtScale;
		this.scale.z = this._tgtScale;
		if(this._addV.length() > Math.PI / 20) {
			this._addV = this._addV.normalize();
			this._addV = this._addV.multiplyScalar(Math.PI / 20);
		} else if(this._addV.length() < Math.PI / 300) {
			this._addV = this._addV.normalize();
			this._addV = this._addV.multiplyScalar(Math.PI / 300);
		}
		var _g1 = 0;
		var _g = this._primitives.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._primitives[i].visible) this._primitives[i].update(audio,this._addV);
		}
	}
	,__class__: canvas.primitives.Primitives
});
canvas.primitives.RoppongiLogo = function() {
	this.a3 = "M105.4,62.9c2.8-0.2,13.8-8.5,14.9-9.6l11.5-11.5c0.9-0.9,4.7-5.3,5.5-6c1.9-1.3,2.1-1.5,3.2-3.2L153.2,17l11.3-18.5c1.3-1.9,5.5-11.1,6.8-12.8l1.5-4l-0.2-0.4c-1.9,0.6-15.7,6.6-16.4,6.6c-4.5,0-29.3-14.5-33.4-21.1l0.4-0.9l3.8,0.4l0.6-1.3c1.3,0,7.4-0.9,8.7-0.9c1.5,0,8.1-1.3,9.4-1.5L163-40l2.8-0.2l18.1-1.9c1.1-0.2,6-1.3,6.8-1.5c0.6,0,0.9-0.2,1.3-0.9l0.2-4.3l-0.2-18.7c0-1.3-0.6-7.4-0.6-8.7c-0.2-2.3-0.4-9.6-3.2-10.8c-4-1.7-6.6-2.8-8.7-6.6c0.6-0.2,1.7-0.4,2.6-0.6c0.9-0.4,6.4-4,7.2-4c4.7,0,10.6,1.5,15.5,3.8c0.6,0.2,3.2,1.1,3.6,1.3l1.5,2.3c1.1,0.2,10.2,5.7,10.8,6.2c3,1.3,6.6,4.5,7.2,7.7c0.2,0.4,0.9,1.7,0.9,2.6c0,0.6-0.9,3.4-1.1,4c-0.2,1.1-3.8,4.9-4.3,6c-0.2,0.6-0.4,3.6-0.6,4c-0.2,0.9-1.5,4.5-1.5,5.3c0,0.6-0.6,3.4-0.6,4c0,0.6,0.2,1.1,0.6,2.1l25.7-2.8c0.9-0.2,4.7-0.2,5.5-0.4l0.6-1.1c0.9-0.2,1.1-0.2,1.5-1.1c0.6-0.2,3-1.5,3.6-1.5c0.2,0,0.6,0,1.1,0.2c0.2-0.2,0.6-0.6,1.1-0.6c0.6,0,3.6,0.6,4.3,0.6c1.5,1.3,1.7,1.3,2.8,1.1l0.9,1.1c4,1.1,4.5,1.1,6.4,3.6h0.9c2.8,3.6,4.7,4.3,8.3,5.3c2.6,0.9,3.8,7.9,3.8,8.9c0,2.1-0.9,3-3.4,5.5c-1.3,1.5-5.5,1.7-11.3,1.9l-17.9-1.5h-11.7l-17,1.7h-0.9l-0.2,0.6c2.1,2.8,10.6,15.9,12.8,18.5L249.1,4c1.9,2.1,10.4,10.2,12.1,11.9l11.3,10.8l7.9,8.1l11.9,12.3L308,59.3c3.8,4,6,6.2,6,7.2c0,1.9-8.9,2.8-11.9,3l-17.7-0.9h-11.3c-5.1,0-7-0.6-9.4-3.6l-8.3-10.6c-3.2-4.3-9.6-10.6-12.3-15.1c-1.3-2.1-6.8-11.1-8.9-14.7c-1.7-2.8-3.6-7.2-5.3-10c-1.7-2.3-8.9-13.8-9.6-14.7c-0.4,1.3-0.4,1.5-0.4,3c0,1.3-0.4,6.8-0.2,8.1v19.6l-0.2,0.9l0.2,21.5c0,1.7,0.9,9.8,0.9,11.5c0,0.4-0.6,3.2-0.6,3.4c0,0.2,0.4,1.7,0.4,1.9c0,0.9-0.2,4.7-0.2,5.3c0,0.9-1.5,4.7-1.5,5.3c0,6.8-0.4,7.2-3,12.8c-2.1,0.9-2.6,1.5-5.3,5.3c-0.4,0.6-1.3,1.1-1.9,1.1c-0.2,0-3.6-0.4-4.3-0.4c-1.3,0-2.1,0-3.2-1.1c-0.4-0.6-1.9-3.6-2.3-4l-6.6-17.4c-0.2-0.4-0.6-2.3-0.9-2.8c-0.4-0.6-0.4-1.9-0.4-2.6c0-0.9,0.2-1.5,1.3-3c1.1-5.3,1.3-6,1.5-7.9l-0.2-18.9c0-0.4-0.2-2.6-0.2-3c0.2-5.7,0.4-13.6,0.6-18.9c0.2-5.1,0.6-13.8,0.2-18.3l-0.2-2.6L190.9,1l-8.1,14.7c-1.9,3.4-8.3,10.6-12.3,15.3c-0.4,0.4-3,4.7-3.4,5.3c-0.2,0.6-3,2.3-3.4,3c-0.9,0.9-9.4,10.6-10.4,11.5c-1.5,1.1-7.7,6.2-8.9,7c-0.2,0.2-11.9,6.6-12.3,6.8c-0.4,0-11.5,2.3-12.3,2.3c-6.8,0-8.7-1.3-11.1-2.6l-3.4-0.9L105.4,62.9z";
	this.a2 = "M-96-33.6h6c1.9,0.4,2.1,0.4,4.7-0.6l17.9-0.9l22.8-3.8c3.4-0.6,6.4-0.9,13.2-1.5c0.6,0,8.1-1.7,9.8-1.9c-0.2-3.2-0.2-4.3-0.2-5.3c0.2-1.3,1.1-7,0.9-8.3l-1.7-20.2c-0.2-1.7-0.4-9.4-0.9-10.6c-0.6-1.7-1.5-2.1-8.5-5.5c-0.9-0.4-2.8-2.1-2.8-3c0-0.4,0.2-1.3,0.6-2.1c1.7,0,9.6-1.3,11.9-2.6c1.5,0,14.2,1.9,15.1,2.6c1.1,0.9,6,4,6.8,4.7c1.1,0.9,5.1,5.7,6.2,6.6c0.6,0.6,5.3,3.6,6,4.5c0.6,0.6,3.2,4,3.2,5.3c0,4.5-3,8.5-5.3,11.7C8.2-63,8-62.1,8-61.5c0,1.5-0.6,8.3-0.6,9.6c0,0.2,0.2,6.2,0.2,6.8l6-0.4l18.3-2.3c3.4-0.4,6.6-3.2,9.6-5.7c0.6-0.4,0.9-0.6,3.6-1.1c0.4,0,1.9-1.3,2.3-1.3c0.9,0.2,5.7,0.6,8.3,2.8c0.9,0.4,4.7,2.3,5.5,2.6c3.4,2.8,4.7,3.8,8.3,6c3.6,2.1,4.3,2.6,6,4.7v0.9l1.1,1.1c-0.4,1.7-0.6,2.3-0.4,4.5c-0.4,0.9-3.4,5.1-4.3,6.2C70.5-27.3,65-26,64.5-26l-16.8-1.3c-10.8-0.9-18.5-1.5-21.7-1.5c-1.7,0-9.4,0.6-10.8,0.6l-0.4,0.6c4.5,5.5,10.4,13.2,12.8,15.3L40.9-0.5L41.6,0l12.8,12.8c0.6,0.9,3.8,3.4,4.3,4c6.2,7.2,42.5,38.1,42.5,41.9c0,1.5-1.1,1.7-9.6,2.6c-11.9,1.3-20.6,2.1-26.4,2.1c-2.8,0-9.1,0-14.7-8.1L39.2,39.1L37.1,37L26.1,22.5C19.5,14,16.1,7.6,14.6,4.6c-0.2-0.4-1.5-2.1-1.7-2.6c-1.7-1.7-2.1-2.3-5.5-7.9H6.5c0,0.6-0.9,3.2-0.9,3.6c0.2,0.6,0.6,3,0.6,3.6c0,6.8-0.9,19.4-1.5,20.2c0,1.5,0.4,2.3,1.1,3.8c1.1-0.2,4.9-2.3,5.5-2.8c1.9-0.6,2.8-0.9,6.6-0.4c0.9,0.9,5.5,4.3,6.4,5.1c1.1,0.9,6.6,4.5,7.7,5.1c0.9,1.5,2.3,3.6,2.3,6.2c0,0.4-4.3,5.7-5.5,5.7c-3.4,0-4.3,0.2-11.7,1.7C15,46.5,7.1,47.4,5,47.6c0,1.5-0.4,7.7-0.4,8.9c0,1.1,0.9,4.9,0.9,5.7L5.6,78c0,1.1-0.6,6.2-0.6,7.7c0,4,0,5.7-2.3,9.8C1.2,98-2.7,101-4.6,101c-4.7,0-6.6-1.9-10.6-6.8c-1.9-1.9-5.3-6-6.2-7.4c-0.6-1.5-3.2-11.9-3.2-12.1c0-0.4,2.3-8.3,2.6-9.6c0-1.5,0.9-7.9,0.9-9.1c0-1.1-0.2-2.6-0.2-3.6c-1.1-0.2-5.7,0.9-6.6,0.9c-1.1-0.4-14.7-4.9-17.4-7c-0.6-0.4-4.9-5.3-6.2-5.3c-0.6,0-8.7,8.1-10.4,9.8c-1.5,1.5-8.5,6.8-9.6,8.1c-2.1,1.9-11.5,7.4-16.4,7.9c-2.1,0.2-12.3,2.8-13.4,2.8s-7-0.6-7-1.7l0.4-1.1c7.9-4.7,8.5-5.3,15.5-14c0.9-1.1,8.3-7.4,9.8-8.9c5.1-6,36.4-49.3,38.3-59.1c-0.6,0-3.4,0.6-3.8,0.6c-0.6,0-5.5,1.1-6.6,1.3c-1.1,0.2-5.7,3-6.8,3c-4.9,0-20-6.8-34.5-22.3V-33.6z";
	this.a1 = "M-264.2,30.6c0.6-1.1,4.3-5.1,4.3-6.2c0-1.9-6-8.5-6-10.2c0-0.2,0.2-0.6,0.6-0.6c1.3,0,14.5,1.1,17,2.6c4.7,3,19.4,11.9,19.4,18.7c0,4.9-8.3,15.1-8.9,15.7c-5.1,4-27.6,23.8-31.3,25.9c-7,4.5-16.4,8.3-20.8,8.5c-2.6,0.2-14.2,1.1-16.2,1.1c-0.9,0-3-0.6-3.6-0.6C-284.9,68.6-279.8,59.3-264.2,30.6z M-234.5-43.6c0-1.1,0.4-5.7,0.4-6.6c0-3.2-1.9-28.1-3.6-31c-1.3-2.3-11.1-9.6-12.8-11.3c0.4-0.2,2.1-0.6,2.6-0.6c13,0,13.4,0.2,19.1,2.8c1.9,0.9,11.7,4.7,17.7,7c0.6,0.2,11.1,9.4,11.5,9.8c1.1,1.1,2.3,3.2,2.3,5.7c0,5.5-11.3,31.3-11.3,33.4c0,1.7,1.9,1.7,2.8,1.7c3.4,0,17.9-1.3,21.1-1.5c17.9-0.9,23.2-1.1,25.7-2.1c0.9-0.4,5.1-2.8,6-3.2c1.1-0.4,1.9-0.4,3-0.4c3.6,0,4.9,0.6,17,7.7c9.1,5.3,9.4,8.5,9.4,11.9c0,9.6-12.3,10-13,10c-2.8,0-49.8-4.3-50.6-4.3c-13.4,0-43.2,3.4-44.9,3.8c-4.7,1.1-28.1,6.2-28.7,6.6c-0.4,0.2-6.2,3.2-7.2,3.2c-3.2,0-15.5-6.6-18.1-7.7c-15.9-6.2-22.8-14.5-22.8-14.9c0-1.7,2.1-1.7,3-1.7c2.3,0.2,6.4,0.4,8.1,0.4c5.1,0,27-3,31.5-3.4c6.2-0.6,33.8-3,39.3-3.8C-233.8-40.2-234.5-41.1-234.5-43.6z M-203.6,11c6,0,23.8,13.6,30.4,18.7c3.4,2.8,19.1,13.4,22.1,15.9c6.4,5.3,13.2,17.7,13.2,28.9c0,7.9-5.7,14.7-12.8,14.7c-4.7,0-16.8-7.7-23.6-20c-2.6-4.5-22.3-42.3-24.7-45.7c-3.6-5.3-7-9.4-9.1-11.9C-206.8,11.4-205.1,11-203.6,11z";
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.RoppongiLogo.__name__ = true;
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
	,update: function(a,rotV) {
		this.scale.z = 0.12 + 2.5 * a.freqByteData[3] / 255;
		this.scale.x = 0.13 + 0.5 * a.freqByteData[3] / 255;
		this.scale.y = 0.13 + 0.5 * a.freqByteData[3] / 255;
		canvas.primitives.PrimitiveBase.prototype.update.call(this,a,rotV);
	}
	,__class__: canvas.primitives.RoppongiLogo
});
canvas.primitives.Sphere = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Sphere.__name__ = true;
canvas.primitives.Sphere.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Sphere.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		this._mat = new THREE.MeshLambertMaterial({ color : 8947848, shading : 1, side : 2});
		this._mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(85,1),this._mat);
		this.add(this._mesh);
	}
	,start: function() {
		if(Math.random() < 0.3) {
			this._mesh.scale.set(6,6,6);
			this._mat.wireframe = true;
			this._mat.wireframeLinewidth = 2;
		} else {
			this._mesh.scale.set(1,1,1);
			if(Math.random() < 0.5) this._mat.wireframe = true; else this._mat.wireframe = false;
		}
	}
	,__class__: canvas.primitives.Sphere
});
canvas.primitives.Spheres = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Spheres.__name__ = true;
canvas.primitives.Spheres.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Spheres.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		this.mm = new THREE.MeshBasicMaterial({ color : 12303291});
		var geo = new THREE.SphereGeometry(85,10,10);
		this._cubes = [];
		var _g = 0;
		while(_g < 12) {
			var i = _g++;
			var cube = new THREE.Mesh(geo,this.mm);
			this.add(cube);
			cube.position.x = 800 * (Math.random() - 0.5);
			cube.position.y = 800 * (Math.random() - 0.5);
			cube.position.z = 800 * (Math.random() - 0.5);
			cube.rotation.x = 2 * Math.random() * Math.PI;
			cube.rotation.y = 2 * Math.random() * Math.PI;
			cube.rotation.z = 2 * Math.random() * Math.PI;
			this._cubes.push(cube);
		}
	}
	,start: function() {
		if(Math.random() < 0.6) {
			this.mm.wireframe = true;
			this.mm.wireframeLinewidth = 2;
		} else this.mm.wireframe = false;
	}
	,update: function(a,rotV) {
		canvas.primitives.PrimitiveBase.prototype.update.call(this,a,rotV);
	}
	,__class__: canvas.primitives.Spheres
});
canvas.primitives.Torus = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Torus.__name__ = true;
canvas.primitives.Torus.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Torus.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var m = new THREE.Mesh(new THREE.TorusGeometry(100,30,20,20),new THREE.MeshLambertMaterial({ color : 16777215}));
		this.add(m);
	}
	,__class__: canvas.primitives.Torus
});
canvas.primitives.Two = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.Two.__name__ = true;
canvas.primitives.Two.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.Two.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		var s = "3";
		var _g1 = 0;
		var _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var shape = new THREE.Shape();
			canvas.primitives.font.FontTest.getLetterPoints(shape,HxOverrides.substr(s,i,1),true,4,new net.badimon.five3D.typography.HelveticaMedium());
			var geo = new THREE.ExtrudeGeometry(shape,{ amount : 30, bevelEnabled : false});
			var mesh = new THREE.Mesh(geo,new THREE.MeshLambertMaterial({ color : 16777215}));
			mesh.position.x = i * 60 - (s.length - 1) * 60 / 2;
			this.add(mesh);
		}
	}
	,__class__: canvas.primitives.Two
});
canvas.primitives.VrdgLogo = function() {
	canvas.primitives.PrimitiveBase.call(this);
};
canvas.primitives.VrdgLogo.__name__ = true;
canvas.primitives.VrdgLogo.__super__ = canvas.primitives.PrimitiveBase;
canvas.primitives.VrdgLogo.prototype = $extend(canvas.primitives.PrimitiveBase.prototype,{
	init: function() {
		if(this._loader == null) {
			this._loader = new data.MyDAELoader();
			this._loader.load("dae/logo.dae",$bind(this,this._onLoad));
		}
	}
	,_onLoad: function() {
		this.visible = false;
		this._loader.dae.scale.x = 0.7;
		this._loader.dae.scale.y = 0.7;
		this._loader.dae.scale.z = 0.7;
		this.add(this._loader.dae);
	}
	,update: function(a,rotV) {
		this.rotation.y += rotV.y * 0.5 + 0.01;
	}
	,__class__: canvas.primitives.VrdgLogo
});
canvas.primitives.font = {};
canvas.primitives.font.FontTest = function() {
};
canvas.primitives.font.FontTest.__name__ = true;
canvas.primitives.font.FontTest.getLetterPoints = function(g,moji,isCentering,scale,letter) {
	if(scale == null) scale = 1;
	if(isCentering == null) isCentering = false;
	var shape = g;
	var motif = letter.motifs.get(moji);
	var ox = 0;
	var oy = 0;
	var s = scale;
	if(isCentering) {
		ox = -letter.widths.get(moji) / 2;
		oy = -letter.height / 2;
	}
	var len = motif.length;
	console.log(len);
	var count = 0;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var tgt = motif[i][0];
		if(tgt == "M") {
			if(count >= 1) {
				g = new THREE.Path();
				shape.holes.push(g);
			}
			g.moveTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy));
			count++;
		} else if(tgt == "L") g.lineTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy)); else if(tgt == "C") g.quadraticCurveTo(s * (motif[i][1][0] + ox),-s * (motif[i][1][1] + oy),s * (motif[i][1][2] + ox),-s * (motif[i][1][3] + oy));
	}
	return shape;
};
canvas.primitives.font.FontTest.prototype = {
	__class__: canvas.primitives.font.FontTest
};
var common = {};
common.Callback = function() {
};
common.Callback.__name__ = true;
common.Callback.create = function(scope,func,args) {
	return function() {
		func.apply(scope,args);
	};
};
common.Callback.prototype = {
	__class__: common.Callback
};
common.Config = function() {
};
common.Config.__name__ = true;
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
	,__class__: common.Config
};
common.Dat = function() {
};
common.Dat.__name__ = true;
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
common.Dat.prototype = {
	__class__: common.Dat
};
common.FadeSheet = function(ee) {
	this.opacity = 1;
	this.element = ee;
};
common.FadeSheet.__name__ = true;
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
	,__class__: common.FadeSheet
};
common.Key = function() {
	THREE.EventDispatcher.call(this);
};
common.Key.__name__ = true;
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
		this._dispatch(n);
	}
	,_dispatch: function(n) {
		if(!common.Dat.bg) this._socket.send(n);
		this.dispatchEvent({ type : "keydown", keyCode : n});
	}
	,__class__: common.Key
});
common.StageRef = function() {
};
common.StageRef.__name__ = true;
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
common.StageRef.prototype = {
	__class__: common.StageRef
};
common.Svg2Shape = function() {
};
common.Svg2Shape.__name__ = true;
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
common.Svg2Shape.prototype = {
	__class__: common.Svg2Shape
};
common.WSocket = function() {
};
common.WSocket.__name__ = true;
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
	,__class__: common.WSocket
};
var data = {};
data.LogoPaths = function() {
};
data.LogoPaths.__name__ = true;
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
	,__class__: data.LogoPaths
};
data.MyDAELoader = function() {
	THREE.Object3D.call(this);
};
data.MyDAELoader.__name__ = true;
data.MyDAELoader.__super__ = THREE.Object3D;
data.MyDAELoader.prototype = $extend(THREE.Object3D.prototype,{
	load: function(filename,callback) {
		this._callback = callback;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load(filename,$bind(this,this._onComplete));
	}
	,_onComplete: function(collada) {
		this.dae = collada.scene;
		this.dae.traverse($bind(this,this._getchild));
		this.dae.scale.x = 50;
		this.dae.scale.z = 50;
		this.dae.scale.y = 50;
		if(this._callback != null) this._callback();
	}
	,_getchild: function(child) {
		if(js.Boot.__instanceof(child,THREE.Mesh)) {
			var m = child;
			m.material.side = 2;
		}
	}
	,__class__: data.MyDAELoader
});
data.Paths = function() {
};
data.Paths.__name__ = true;
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
	,__class__: data.Paths
};
data.TextureData = function(u,w,h) {
	this.height = 0;
	this.width = 0;
	this.url = "";
	this.url = u;
	this.width = w;
	this.height = h;
	this.texture = THREE.ImageUtils.loadTexture(this.url);
	this.texture.minFilter = 1003;
	this.texture.magFilter = 1003;
};
data.TextureData.__name__ = true;
data.TextureData.prototype = {
	__class__: data.TextureData
};
var effect = {};
effect.PostProcessing2 = function() {
	this._rad = 0;
};
effect.PostProcessing2.__name__ = true;
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
	,__class__: effect.PostProcessing2
};
effect.shaders = {};
effect.shaders.CopyShader = function() {
};
effect.shaders.CopyShader.__name__ = true;
effect.shaders.CopyShader.getObject = function() {
	var obj = { uniforms : { tDiffuse : { type : "t", value : null}, opacity : { type : "f", value : 1.0}}, vertexShader : "varying vec2 vUv;\r\n\t\tvoid main() {\r\n\t\t\tvUv = uv;\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}", fragmentShader : "uniform float opacity;\t\tuniform sampler2D tDiffuse;\r\n\t\tvarying vec2 vUv;\t\tvoid main() {\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\t\t\tgl_FragColor = opacity * texel;\t\t}"};
	return obj;
};
effect.shaders.CopyShader.prototype = {
	__class__: effect.shaders.CopyShader
};
effect.shaders.MyTiltShiftShader = function() {
};
effect.shaders.MyTiltShiftShader.__name__ = true;
effect.shaders.MyTiltShiftShader.getObject = function() {
	return { uniforms : { tDiffuse : { type : "t", value : null}, v : { type : "f", value : 0.001953125}, r : { type : "f", value : 0.5}, k : { type : "fv1", value : [1.0,4.0,6.0,4.0,1.0,4.0,16.0,24.0,16.0,4.0,6.0,24.0,36.0,24.0,6.0,4.0,16.0,24.0,16.0,4.0,1.0,4.0,6.0,4.0,1.0]}}, vertexShader : "\r\n\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\tvoid main() {\r\n\t\t\t\t\tvUv = uv;\r\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t\t\t}", fragmentShader : "\r\n\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\tuniform float v;\r\n\t\t\t\tuniform float r;\r\n\t\t\t\tuniform float k[25];\r\n\t\t\t\tvarying vec2 vUv;\r\n\r\n\t\t\t\tvoid main() {\r\n\r\n\t\t\t\t\tvec4 sum = vec4( 0.0 );\r\n\t\t\t\t\tfloat vv = v;// * abs( r - vUv.y );\r\n\t\t\t\t\t\r\n\t\t\t\t\tfor(float i=-2.0;i<=2.0;i++){\r\n\t\t\t\t\t\tfor(float j = -2.0; j <=2.0; j++) {\r\n\t\t\t\t\t\t\tsum += texture2D( tDiffuse, vec2( vUv.x + i * vv, vUv.y + j * vv ) ) / 25.0;\r\n\t\t\t\t\t\t\t//idx += 1;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\tgl_FragColor = sum;\r\n\r\n\t\t\t\t}"};
};
effect.shaders.MyTiltShiftShader.prototype = {
	__class__: effect.shaders.MyTiltShiftShader
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
emoji.EmojiPiece.__name__ = true;
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
	,__class__: emoji.EmojiPiece
});
emoji.EmojiShader = function() {
	this.fragmentShader = "\r\n\t\t  uniform vec3 color;\r\n\t\t  uniform sampler2D texture;\r\n\t\t  uniform vec2 offset;\r\n\t\t  varying vec2 vaOffset;\r\n\t\t  uniform vec2 repeat;\r\n\t\t  void main() {\r\n\t\t\tvec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);\r\n\t\t\tvec4 color0 = texture2D( texture, uv * repeat + vaOffset  );//\r\n\t\t\tgl_FragColor = color0;\r\n\t\t  }\r\n\t";
	this.vertexShader = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t" + "\r\n\t\t\tuniform float strength;\r\n\t\t\tuniform float seed;\r\n\t\t\tuniform float scale;\r\n\t\t\tuniform float scale1;\r\n\t\t\tuniform vec3 posScale;\r\n\t\t\tuniform float counter;\r\n\t\t\tattribute vec2 aOffset;\r\n\t\t\tvarying vec2 vaOffset;\t  \r\n\t\t\tvoid main() {\r\n\t\t\t\t//vec3 ps = vec3(2.0, 2.0, 2.0);\r\n\t\t\t\tvaOffset = aOffset;\r\n\t\t\t\t\r\n\t\t\t\tvec3 cn = curlNoise(position * seed + counter);\r\n\t\t\t\tvec3 pp = position + vec3( cn.x * strength, cn.y * strength, cn.z * strength );\r\n\t\t\t\t//vec3 pp = position + vec3( cn.x, cn.y, cn.z ) * 10.0;\r\n\t\t\t\t\r\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( pp * posScale, 1.0 );\r\n\t\t\t\tgl_PointSize = scale1 * scale / gl_Position.w;\r\n\t\t\t}\r\n\t";
	this.animationFrameLength = 32;
};
emoji.EmojiShader.__name__ = true;
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
		this.uniforms = { strength : { type : "f", value : 100.0}, seed : { type : "f", value : 0.0}, counter : { type : "f", value : 0}, texture : { type : "t", value : tex}, scale1 : { type : "f", value : 22000}, scale : { type : "f", value : 1.0}, posScale : { type : "v3", value : new THREE.Vector3(1.0,1.0,1.0)}, offset : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,0.0)}, repeat : { type : "v2", value : new THREE.Vector2(1 / this.animationFrameLength,1 / this.animationFrameLength)}};
		this.shaderMaterial = new THREE.ShaderMaterial({ uniforms : this.uniforms, attributes : this.attributes, vertexShader : this.vertexShader, fragmentShader : this.fragmentShader, transparent : true, alphaTest : 0.5, depthWrite : false});
	}
	,__class__: emoji.EmojiShader
};
emoji.EmojiSingleShader = function() {
	this.fragmentShader = "\r\n\t\t//uniform 変数としてテクスチャのデータを受け取る\r\n\t\tuniform sampler2D texture;\r\n\t\tuniform vec2 offset;\r\n\t\tuniform vec2 repeat;\r\n\t\t\r\n\t\t// vertexShaderで処理されて渡されるテクスチャ座標\r\n\t\tvarying vec2 vUv;                                             \r\n\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t  // テクスチャの色情報をそのままピクセルに塗る\r\n\t\t  gl_FragColor = texture2D(texture, vUv * repeat + offset);\r\n\t\t}\r\n\t";
	this.vertexShader = "\r\n\t\tvarying vec2 vUv;// fragmentShaderに渡すためのvarying変数\r\n\t\tuniform vec2 offset;\r\n\t\tuniform vec2 repeat;\r\n\t\t\r\n\t\tvoid main()\r\n\t\t{\r\n\t\t  // 処理する頂点ごとのuv(テクスチャ)座標をそのままfragmentShaderに横流しする\r\n\t\t  vUv = uv;\r\n\t\t  // 変換：ローカル座標 → 配置 → カメラ座標\r\n\t\t  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);    \r\n\t\t  // 変換：カメラ座標 → 画面座標\r\n\t\t  gl_Position = projectionMatrix * mvPosition;\r\n\t\t}\r\n\t";
	this.animationFrameLength = 32;
};
emoji.EmojiSingleShader.__name__ = true;
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
	,__class__: emoji.EmojiSingleShader
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
emoji.EmojiSpritePos.__name__ = true;
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
	,__class__: emoji.EmojiSpritePos
};
emoji.Emojis = function() {
	this._depthDir = 1;
	this._isRotate = false;
	this._isDepth = false;
	this._isBlackPixel = true;
	this._mode = 0;
	this._depth = 0;
	this.isActive = true;
	this.pScale = 1;
	this.space = 4;
	this._scale = 1;
	THREE.Object3D.call(this);
};
emoji.Emojis.__name__ = true;
emoji.Emojis.__super__ = THREE.Object3D;
emoji.Emojis.prototype = $extend(THREE.Object3D.prototype,{
	init: function(scene,camera,maxW,maxH) {
		this._camera = camera;
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
		if(this._squre == null) {
		}
		window.document.addEventListener("keydown",$bind(this,this._onDown));
	}
	,_onDown: function(e) {
		if(!this.isActive) return;
		var keyCode = Std.parseInt(e.keyCode);
		if(keyCode == 78) this._isCurl = !this._isCurl; else if(keyCode == 39) {
			this._canvas.next(true);
			this._pos.setRange(Math.random(),Math.pow(Math.random(),2));
			if(Math.random() < 0.5) this._isBlackPixel = true; else this._isBlackPixel = false;
			if(Math.random() < 0.2) this._depthDir = -1; else this._depthDir = 1;
		} else if(keyCode == 37) this._tweenZoom(true); else if(keyCode == 38) this._tweenZoom(false); else if(keyCode == 40) this._tweenWide(); else if(keyCode == 80) this._isDepth = !this._isDepth; else if(keyCode == 82) {
			this._isRotate = !this._isRotate;
			if(this._isRotate) this._isDepth = true;
		}
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
		this._rotate();
		this._pos.update(audio);
		var tgtW = Math.floor(this._scale * canvas.CanvasSrc.W);
		var tgtH = Math.floor(this._scale * canvas.CanvasSrc.H);
		this.space = 1 / this._scale * 10;
		this.pScale = 1 / this._scale * 0.5;
		this._canvas.update(audio);
		if(audio.freqByteData != null && audio.freqByteData.length > 10) this._depth = this._depthDir * (Math.pow(audio.freqByteData[3] / 255,2) * 2 + 1);
		this._w = tgtW;
		this._h = tgtH;
		this.shader.uniforms.scale.value = this.pScale;
		var tgtSt = Math.pow(audio.freqByteData[6] / 255,2) * 300;
		if(!this._isCurl) tgtSt = 0;
		this.shader.uniforms.strength.value += (tgtSt - this.shader.uniforms.strength.value) / 8;
		var tgtSd = Math.pow(audio.freqByteData[2] / 255,3);
		this.shader.uniforms.seed.value += (tgtSd - this.shader.uniforms.seed.value) / 8;
		this.shader.uniforms.counter.value += 0.02;
		this._setPixels();
		this._reposition(tgtW,tgtH,this._canvas);
	}
	,_rotate: function() {
		if(this._isRotate) {
			this._camera.radX += Math.PI / 300;
			this._camera.radY = Math.PI / 4;
			this._camera.amp = 1000;
		} else {
			this._camera.radX = 0;
			this._camera.radY = Math.PI / 2 * 0.99;
			this._camera.amp = 1000;
		}
	}
	,_setPixels: function() {
		var index = 0;
		var _g1 = 0;
		var _g = this._w * this._h;
		while(_g1 < _g) {
			var i = _g1++;
			var xx = i % this._w;
			var yy = Math.floor(i / this._w);
			var light = this._canvas.getPixel(Math.floor(xx / this._w * this._maxW),Math.floor(yy / this._h * this._maxH));
			if(this._isBlackPixel) {
				if(light != 0) this.shader.attributes.aOffset.value[i] = this._pos.getIconPos(light); else this.shader.attributes.aOffset.value[i] = new THREE.Vector2(0,0);
			} else this.shader.attributes.aOffset.value[i] = this._pos.getIconPos(light);
		}
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
			vertex.z = -(yy * this.space) + (hh - 1) * this.space / 2;
			var tgtY = this._depth * src.getPixel(Math.floor(xx / this._w * this._maxW),Math.floor(yy / this._h * this._maxH));
			if(this._isDepth) vertex.y += (tgtY - vertex.y) / 2; else vertex.y += (0 - vertex.y) / 2;
		}
		var _g1 = len;
		var _g2 = this._maxW * this._maxH;
		while(_g1 < _g2) {
			var i1 = _g1++;
			var vertex1 = this.particles.geometry.vertices[i1];
			vertex1.z = -8000;
		}
	}
	,__class__: emoji.Emojis
});
emoji.shader = {};
emoji.shader.CurlNoise = function() {
};
emoji.shader.CurlNoise.__name__ = true;
emoji.shader.CurlNoise.prototype = {
	__class__: emoji.shader.CurlNoise
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
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
	,__class__: haxe.Http
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
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
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Browser = function() { };
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var net = {};
net.badimon = {};
net.badimon.five3D = {};
net.badimon.five3D.typography = {};
net.badimon.five3D.typography.Typography3D = function() {
	this.motifs = new haxe.ds.StringMap();
	this.widths = new haxe.ds.StringMap();
};
net.badimon.five3D.typography.Typography3D.__name__ = true;
net.badimon.five3D.typography.Typography3D.prototype = {
	getMotif: function($char) {
		return this.motifs.get($char);
	}
	,getWidth: function($char) {
		return this.widths.get($char);
	}
	,getHeight: function() {
		return this.height;
	}
	,__class__: net.badimon.five3D.typography.Typography3D
};
net.badimon.five3D.typography.HelveticaMedium = function() {
	net.badimon.five3D.typography.Typography3D.call(this);
	this.initializeMotifsUppercase();
	this.initializeMotifsLowercase();
	this.initializeMotifsNumbers();
	this.initializeMotifsPunctuation();
	this.initializeWidthsUppercase();
	this.initializeWidthsLowercase();
	this.initializeWidthsNumbers();
	this.initializeWidthsPunctuation();
	this.height = 117;
};
net.badimon.five3D.typography.HelveticaMedium.__name__ = true;
net.badimon.five3D.typography.HelveticaMedium.__super__ = net.badimon.five3D.typography.Typography3D;
net.badimon.five3D.typography.HelveticaMedium.prototype = $extend(net.badimon.five3D.typography.Typography3D.prototype,{
	initializeMotifsUppercase: function() {
		this.motifs.set("A",[["M",[26.7,23.8]],["L",[-0.7,95.2]],["L",[12.2,95.2]],["L",[18.95,76.3]],["L",[47.4,76.3]],["L",[54.1,95.2]],["L",[67.55,95.2]],["L",[40.05,23.8]],["L",[26.7,23.8]],["M",[33.45,36.1]],["L",[44.15,66.8]],["L",[22.3,66.8]],["L",[33.1,36.1]],["L",[33.45,36.1]]]);
		this.motifs.set("B",[["M",[51,43.8]],["C",[50.9,48.6,48,51.15]],["C",[45.05,53.7,40.5,53.7]],["L",[20.1,53.7]],["L",[20.1,34]],["L",[40.5,34]],["C",[45.6,33.95,48.3,36.2]],["C",[51,38.45,51,43.8]],["M",[42.3,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[40.45,95.2]],["C",[49.6,95.15,55.4,92.5]],["C",[61.3,89.95,64,85.45]],["C",[66.7,80.95,66.7,75.3]],["C",[66.65,67.95,63.3,63.15]],["C",[59.85,58.4,53.3,56.85]],["L",[53.3,56.65]],["C",[58.2,54.6,60.85,50.75]],["C",[63.45,46.9,63.5,41.5]],["C",[63.45,35.6,60.85,31.65]],["C",[58.2,27.7,53.45,25.75]],["C",[48.75,23.8,42.3,23.8]],["M",[20.1,62.7]],["L",[42.2,62.7]],["C",[47.95,62.75,51.05,65.55]],["C",[54.15,68.4,54.2,73.65]],["C",[54.15,79.15,51.05,82.05]],["C",[47.95,84.95,42.2,85]],["L",[20.1,85]],["L",[20.1,62.7]]]);
		this.motifs.set("C",[["M",[68.3,46.5]],["C",[67.5,38.8,63.4,33.35]],["C",[59.25,27.9,52.7,25.05]],["C",[46.15,22.2,38,22.1]],["C",[30,22.15,23.65,25.1]],["C",[17.3,28,12.9,33.15]],["C",[8.45,38.3,6.15,45.05]],["C",[3.8,51.8,3.8,59.5]],["C",[3.8,67.2,6.15,73.95]],["C",[8.45,80.7,12.9,85.85]],["C",[17.3,91,23.65,93.95]],["C",[30,96.85,38,96.9]],["C",[46.75,96.85,53.35,93.2]],["C",[60,89.6,63.9,83.1]],["C",[67.85,76.6,68.4,68]],["L",[56.2,68]],["C",[55.7,73.3,53.5,77.5]],["C",[51.3,81.65,47.4,84.15]],["C",[43.55,86.65,38,86.7]],["C",[32.3,86.65,28.15,84.35]],["C",[24,82.1,21.45,78.25]],["C",[18.8,74.4,17.55,69.5]],["C",[16.3,64.7,16.3,59.5]],["C",[16.3,54.35,17.55,49.5]],["C",[18.8,44.6,21.45,40.75]],["C",[24,36.9,28.15,34.65]],["C",[32.3,32.35,38,32.3]],["C",[45.75,32.4,50,36.3]],["C",[54.3,40.2,55.8,46.5]],["L",[68.3,46.5]]]);
		this.motifs.set("D",[["M",[55.15,28.7]],["C",[48.2,23.9,37.2,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[37.2,95.2]],["C",[48.2,95.1,55.15,90.3]],["C",[62.1,85.6,65.45,77.5]],["C",[68.75,69.45,68.7,59.5]],["C",[68.75,49.55,65.45,41.5]],["C",[62.1,33.45,55.15,28.7]],["M",[54.4,46.55]],["C",[56.3,52.3,56.2,59.5]],["C",[56.3,66.75,54.4,72.45]],["C",[52.5,78.2,47.25,81.6]],["C",[42.1,84.95,32.4,85]],["L",[20.1,85]],["L",[20.1,34]],["L",[32.4,34]],["C",[42.1,34.05,47.25,37.45]],["C",[52.5,40.8,54.4,46.55]]]);
		this.motifs.set("E",[["M",[59.05,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[59.7,95.2]],["L",[59.7,84.4]],["L",[20.1,84.4]],["L",[20.1,63.5]],["L",[56.1,63.5]],["L",[56.1,53.3]],["L",[20.1,53.3]],["L",[20.1,34.6]],["L",[59.05,34.6]],["L",[59.05,23.8]]]);
		this.motifs.set("F",[["M",[56.95,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[20.1,95.2]],["L",[20.1,63.5]],["L",[52.4,63.5]],["L",[52.4,53.3]],["L",[20.1,53.3]],["L",[20.1,34.6]],["L",[56.95,34.6]],["L",[56.95,23.8]]]);
		this.motifs.set("G",[["M",[52.95,24.85]],["C",[46.4,22.1,38.5,22.1]],["C",[30.45,22.15,24.1,25.1]],["C",[17.75,28,13.4,33.15]],["C",[8.95,38.3,6.65,45.05]],["C",[4.3,51.8,4.3,59.5]],["C",[4.3,67.2,6.65,73.95]],["C",[8.95,80.7,13.4,85.85]],["C",[17.75,91,24.1,93.95]],["C",[30.45,96.85,38.5,96.9]],["C",[44.9,97,50,94.7]],["C",[55.1,92.4,60,86.8]],["L",[61.9,95.2]],["L",[69.85,95.2]],["L",[69.85,57.6]],["L",[39.5,57.6]],["L",[39.5,67.1]],["L",[58.5,67.1]],["C",[58.3,76.3,53.2,81.55]],["C",[48.15,86.75,38.5,86.7]],["C",[32.75,86.65,28.65,84.35]],["C",[24.5,82.1,21.9,78.25]],["C",[19.3,74.4,18,69.55]],["C",[16.8,64.7,16.8,59.5]],["C",[16.8,54.35,18,49.5]],["C",[19.3,44.6,21.9,40.75]],["C",[24.5,36.9,28.65,34.65]],["C",[32.75,32.35,38.5,32.3]],["C",[43.05,32.3,47,33.9]],["C",[50.95,35.5,53.6,38.65]],["C",[56.25,41.8,56.9,46.5]],["L",[69.1,46.5]],["C",[68.05,38.45,63.75,33.05]],["C",[59.45,27.6,52.95,24.85]]]);
		this.motifs.set("H",[["M",[52.3,23.8]],["L",[52.3,52.2]],["L",[19.8,52.2]],["L",[19.8,23.8]],["L",[7.3,23.8]],["L",[7.3,95.2]],["L",[19.8,95.2]],["L",[19.8,62.95]],["L",[52.3,62.95]],["L",[52.3,95.2]],["L",[64.8,95.2]],["L",[64.8,23.8]],["L",[52.3,23.8]]]);
		this.motifs.set("I",[["M",[7.6,23.8]],["L",[7.6,95.2]],["L",[20.1,95.2]],["L",[20.1,23.8]],["L",[7.6,23.8]]]);
		this.motifs.set("J",[["M",[13.8,70.2]],["L",[1.3,70.2]],["L",[1.3,74]],["C",[1.3,80.55,3.45,85.75]],["C",[5.65,90.85,10.4,93.9]],["C",[15.1,96.85,22.6,96.9]],["C",[30.2,96.85,34.9,94.8]],["C",[39.6,92.7,42.05,89.2]],["C",[44.45,85.7,45.3,81.3]],["C",[46.15,76.9,46.1,72.2]],["L",[46.1,23.8]],["L",[33.6,23.8]],["L",[33.6,72.9]],["C",[33.65,77.4,32.8,80.45]],["C",[32,83.55,29.8,85.1]],["C",[27.65,86.7,23.6,86.7]],["C",[18,86.65,15.85,83.35]],["C",[13.7,80,13.8,73.9]],["L",[13.8,70.2]]]);
		this.motifs.set("K",[["M",[51.9,23.8]],["L",[20.1,56.3]],["L",[20.1,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[20.1,95.2]],["L",[20.1,71.2]],["L",[30.3,61.05]],["L",[53.7,95.2]],["L",[69.35,95.2]],["L",[38.8,52.3]],["L",[67.35,23.8]],["L",[51.9,23.8]]]);
		this.motifs.set("L",[["M",[7.6,23.8]],["L",[7.6,95.2]],["L",[56.4,95.2]],["L",[56.4,84.4]],["L",[20.1,84.4]],["L",[20.1,23.8]],["L",[7.6,23.8]]]);
		this.motifs.set("M",[["M",[81.5,23.8]],["L",[64.05,23.8]],["L",[44.85,79.7]],["L",[44.7,79.7]],["L",[25,23.8]],["L",[7.35,23.8]],["L",[7.35,95.2]],["L",[19.3,95.2]],["L",[19.3,40.1]],["L",[19.5,40.1]],["L",[39.3,95.2]],["L",[49.55,95.2]],["L",[69.4,40.1]],["L",[69.6,40.1]],["L",[69.6,95.2]],["L",[81.5,95.2]],["L",[81.5,23.8]]]);
		this.motifs.set("N",[["M",[53.1,23.8]],["L",[53.1,76.4]],["L",[52.9,76.4]],["L",[20.25,23.8]],["L",[7.1,23.8]],["L",[7.1,95.2]],["L",[19,95.2]],["L",[19,42.7]],["L",[19.3,42.7]],["L",[51.8,95.2]],["L",[65,95.2]],["L",[65,23.8]],["L",[53.1,23.8]]]);
		this.motifs.set("O",[["M",[54.6,40.75]],["C",[57.25,44.6,58.5,49.5]],["C",[59.7,54.35,59.7,59.5]],["C",[59.7,64.7,58.5,69.5]],["C",[57.25,74.4,54.6,78.25]],["C",[52,82.1,47.85,84.35]],["C",[43.75,86.65,38.05,86.7]],["C",[32.3,86.65,28.15,84.35]],["C",[24,82.1,21.45,78.25]],["C",[18.8,74.4,17.55,69.5]],["C",[16.3,64.7,16.3,59.5]],["C",[16.3,54.35,17.55,49.5]],["C",[18.8,44.6,21.45,40.75]],["C",[24,36.9,28.15,34.65]],["C",[32.3,32.35,38.05,32.3]],["C",[43.75,32.35,47.85,34.65]],["C",[52,36.9,54.6,40.75]],["M",[52.4,25.1]],["C",[46.05,22.15,38.05,22.1]],["C",[30,22.15,23.65,25.1]],["C",[17.3,28,12.9,33.15]],["C",[8.45,38.3,6.15,45.05]],["C",[3.8,51.8,3.8,59.5]],["C",[3.8,67.2,6.15,73.95]],["C",[8.45,80.7,12.9,85.85]],["C",[17.3,91,23.65,93.95]],["C",[30,96.85,38.05,96.9]],["C",[46.05,96.85,52.4,93.95]],["C",[58.75,91,63.15,85.85]],["C",[67.6,80.7,69.85,73.95]],["C",[72.2,67.2,72.2,59.5]],["C",[72.2,51.8,69.85,45.05]],["C",[67.6,38.3,63.15,33.15]],["C",[58.75,28,52.4,25.1]]]);
		this.motifs.set("P",[["M",[51.45,26]],["C",[46.7,23.85,39.1,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[20.1,95.2]],["L",[20.1,67.9]],["L",[39.1,67.9]],["C",[46.7,67.85,51.45,65.75]],["C",[56.3,63.65,58.9,60.3]],["C",[61.45,56.9,62.45,53.1]],["C",[63.45,49.35,63.4,46]],["C",[63.45,42.55,62.45,38.75]],["C",[61.45,34.9,58.9,31.55]],["C",[56.3,28.15,51.45,26]],["M",[50.9,45.85]],["C",[50.85,50.35,48.9,52.95]],["C",[46.95,55.55,44.15,56.65]],["C",[41.25,57.75,38.4,57.7]],["L",[20.1,57.7]],["L",[20.1,34]],["L",[38.55,34]],["C",[41.95,33.95,44.75,35]],["C",[47.5,36,49.15,38.6]],["C",[50.85,41.2,50.9,45.85]]]);
		this.motifs.set("Q",[["M",[52.4,25.1]],["C",[46.05,22.15,38.05,22.1]],["C",[30,22.15,23.65,25.1]],["C",[17.3,28,12.9,33.15]],["C",[8.45,38.3,6.15,45.05]],["C",[3.8,51.8,3.8,59.5]],["C",[3.8,67.2,6.15,73.95]],["C",[8.45,80.7,12.9,85.85]],["C",[17.3,91,23.65,93.95]],["C",[30,96.85,38.05,96.9]],["C",[42.25,96.9,46.55,95.9]],["C",[50.85,94.85,54.85,92.6]],["L",[65.25,101.7]],["L",[71.35,94.9]],["L",[62.1,86.9]],["C",[65.65,83.5,67.85,78.95]],["C",[70.1,74.45,71.2,69.45]],["C",[72.2,64.45,72.2,59.5]],["C",[72.2,51.8,69.85,45.05]],["C",[67.6,38.3,63.15,33.15]],["C",[58.75,28,52.4,25.1]],["M",[54.6,40.75]],["C",[57.25,44.6,58.5,49.5]],["C",[59.7,54.35,59.7,59.5]],["C",[59.75,65,58.3,70.15]],["C",[56.85,75.3,53.5,79.45]],["L",[44.8,71.8]],["L",[38.8,78.7]],["L",[46,85]],["C",[44.15,85.9,42.05,86.3]],["L",[38.05,86.7]],["C",[32.3,86.65,28.15,84.35]],["C",[24,82.1,21.45,78.25]],["C",[18.8,74.4,17.55,69.5]],["C",[16.3,64.7,16.3,59.5]],["C",[16.3,54.35,17.55,49.5]],["C",[18.8,44.6,21.45,40.75]],["C",[24,36.9,28.15,34.65]],["C",[32.3,32.35,38.05,32.3]],["C",[43.75,32.35,47.85,34.65]],["C",[52,36.9,54.6,40.75]]]);
		this.motifs.set("R",[["M",[41.7,23.8]],["L",[7.6,23.8]],["L",[7.6,95.2]],["L",[20.1,95.2]],["L",[20.1,65.8]],["L",[38.5,65.8]],["C",[44.2,65.8,47.3,67.8]],["C",[50.45,69.8,51.6,73.95]],["C",[52.8,78.15,52.75,84.7]],["C",[52.7,87.35,53,90.05]],["C",[53.25,92.85,54.65,95.2]],["L",[68,95.2]],["C",[66.65,93.7,65.8,90.85]],["C",[64.95,88.05,64.5,84.3]],["C",[64.1,80.6,64.1,76.4]],["C",[64,70.8,62.3,67.6]],["C",[60.6,64.4,58.2,62.95]],["C",[55.75,61.55,53.5,61.3]],["L",[53.5,61.1]],["L",[56.3,59.85]],["C",[58.2,58.9,60.25,56.9]],["C",[62.3,54.95,63.75,51.6]],["C",[65.25,48.25,65.3,43.1]],["C",[65.3,33.95,59.35,28.95]],["C",[53.4,23.9,41.7,23.8]],["M",[52.8,44.9]],["C",[52.8,50.5,49.65,53.4]],["C",[46.55,56.3,40.6,56.3]],["L",[20.1,56.3]],["L",[20.1,34]],["L",[40.45,34]],["C",[43.7,33.95,46.5,34.8]],["C",[49.3,35.7,51.05,38]],["C",[52.75,40.4,52.8,44.9]]]);
		this.motifs.set("S",[["M",[45.85,24.7]],["C",[39.65,22.1,32.15,22.1]],["C",[27.2,22.1,22.6,23.35]],["C",[17.95,24.65,14.2,27.25]],["C",[10.5,29.8,8.25,33.75]],["C",[6.05,37.75,6,43.1]],["C",[5.95,46.85,7.35,50.4]],["C",[8.85,53.85,12.3,56.65]],["C",[15.75,59.5,21.85,61.2]],["L",[34.3,64.45]],["L",[43.1,67.1]],["C",[45.4,67.85,47.15,69.85]],["C",[48.95,71.85,49,75.9]],["C",[49.05,78.65,47.55,81.1]],["C",[46.05,83.6,42.7,85.1]],["C",[39.4,86.65,33.95,86.7]],["C",[28.85,86.75,24.8,85.2]],["C",[20.7,83.65,18.3,80.25]],["C",[15.85,76.9,15.8,71.4]],["L",[3.3,71.4]],["C",[3.55,80.25,7.55,85.85]],["C",[11.55,91.55,18.2,94.2]],["C",[24.9,96.9,33.1,96.9]],["C",[38.55,96.9,43.55,95.65]],["C",[48.6,94.35,52.65,91.7]],["C",[56.7,89,59.1,84.75]],["C",[61.45,80.5,61.5,74.5]],["C",[61.5,70.75,60,67.1]],["C",[58.5,63.5,55.4,60.65]],["C",[52.35,57.75,47.6,56.3]],["L",[43,55]],["L",[36.35,53.25]],["L",[30.2,51.65]],["L",[27,50.8]],["C",[23.15,49.8,20.85,47.55]],["C",[18.55,45.35,18.5,41.6]],["C",[18.6,38,20.6,35.95]],["C",[22.65,33.95,25.65,33.15]],["C",[28.6,32.25,31.6,32.3]],["C",[38.2,32.2,42.35,35.15]],["C",[46.5,38.05,47,44.9]],["L",[59.5,44.9]],["C",[59.4,37.45,55.7,32.35]],["C",[52.05,27.3,45.85,24.7]]]);
		this.motifs.set("T",[["M",[58.6,23.8]],["L",[0.8,23.8]],["L",[0.8,34.6]],["L",[23.4,34.6]],["L",[23.4,95.2]],["L",[35.9,95.2]],["L",[35.9,34.6]],["L",[58.6,34.6]],["L",[58.6,23.8]]]);
		this.motifs.set("U",[["M",[52.9,23.8]],["L",[52.9,65.4]],["L",[52.55,72.7]],["C",[52.15,76.35,50.55,79.4]],["C",[48.95,82.4,45.55,84.2]],["C",[42.1,86.05,36.1,86.1]],["C",[30.1,86.05,26.6,84.2]],["C",[23.2,82.4,21.65,79.4]],["C",[20,76.35,19.65,72.7]],["C",[19.25,69.1,19.3,65.4]],["L",[19.3,23.8]],["L",[6.8,23.8]],["L",[6.8,69.5]],["C",[6.85,78.65,10.5,84.75]],["C",[14.1,90.85,20.65,93.9]],["C",[27.25,96.9,36.1,96.9]],["C",[44.9,96.9,51.5,93.9]],["C",[58.05,90.85,61.65,84.75]],["C",[65.35,78.65,65.4,69.5]],["L",[65.4,23.8]],["L",[52.9,23.8]]]);
		this.motifs.set("V",[["M",[48.95,23.8]],["L",[30.6,80.3]],["L",[30.4,80.3]],["L",[12.5,23.8]],["L",[-0.5,23.8]],["L",[23.35,95.2]],["L",[37.2,95.2]],["L",[61.6,23.8]],["L",[48.95,23.8]]]);
		this.motifs.set("W",[["M",[81.1,23.8]],["L",[67.8,78.4]],["L",[67.6,78.4]],["L",[53.6,23.8]],["L",[40.8,23.8]],["L",[26.4,78.4]],["L",[26.2,78.4]],["L",[13.3,23.8]],["L",[0.6,23.8]],["L",[19.4,95.2]],["L",[32.3,95.2]],["L",[46.9,40.6]],["L",[47.1,40.6]],["L",[61.4,95.2]],["L",[74.1,95.2]],["L",[93.8,23.8]],["L",[81.1,23.8]]]);
		this.motifs.set("X",[["M",[49.4,23.8]],["L",[32.5,49]],["L",[16.3,23.8]],["L",[1.4,23.8]],["L",[25,58.2]],["L",[-0.3,95.2]],["L",[14,95.2]],["L",[32.1,67.9]],["L",[49.9,95.2]],["L",[65.1,95.2]],["L",[39.8,58.2]],["L",[63.4,23.8]],["L",[49.4,23.8]]]);
		this.motifs.set("Y",[["M",[51.4,23.8]],["L",[32.8,55.8]],["L",[13.9,23.8]],["L",[-0.6,23.8]],["L",[26.2,67.2]],["L",[26.2,95.2]],["L",[38.7,95.2]],["L",[38.7,67.2]],["L",[65.45,23.8]],["L",[51.4,23.8]]]);
		this.motifs.set("Z",[["M",[59.8,23.8]],["L",[5.5,23.8]],["L",[5.5,34.6]],["L",[43.9,34.6]],["L",[2.3,85]],["L",[2.3,95.2]],["L",[60.8,95.2]],["L",[60.8,84.4]],["L",[18.2,84.4]],["L",[59.8,33.35]],["L",[59.8,23.8]]]);
	}
	,initializeMotifsLowercase: function() {
		this.motifs.set("a",[["M",[9.05,48.9]],["C",[5.6,52.65,5.15,59.25]],["L",[16.5,59.25]],["C",[16.95,55.05,19.95,53.05]],["C",[23.05,51.05,27.9,51.05]],["L",[32.7,51.55]],["C",[35.15,52.1,36.85,53.65]],["C",[38.55,55.15,38.55,58.1]],["C",[38.55,61.35,36.4,62.65]],["C",[34.3,63.95,30.75,64.35]],["L",[23.1,65.4]],["C",[18.2,65.85,13.65,67.2]],["C",[9.2,68.55,6.25,71.85]],["C",[3.3,75.15,3.2,81.55]],["C",[3.25,86.55,5.75,89.95]],["C",[8.2,93.3,12.2,94.95]],["C",[16.15,96.6,20.9,96.6]],["L",[27.25,96]],["C",[30.5,95.3,33.5,93.95]],["C",[36.5,92.5,38.75,90.3]],["C",[39.5,93.8,41.8,95.25]],["C",[44.1,96.65,47.55,96.6]],["L",[51.2,96.2]],["L",[54.8,95.3]],["L",[54.8,87.45]],["L",[53.15,87.65]],["L",[51.95,87.65]],["C",[50.45,87.65,49.8,86.75]],["C",[49.2,85.85,49.25,83.75]],["L",[49.25,57.05]],["C",[49.15,51.65,46.15,48.35]],["C",[43.1,45.05,38.45,43.55]],["C",[33.75,42.1,28.6,42.1]],["C",[22.8,42.05,17.65,43.6]],["C",[12.45,45.15,9.05,48.9]],["M",[37.9,69.3]],["L",[37.9,77.8]],["C",[37.8,81.45,35.7,83.6]],["C",[33.6,85.75,30.6,86.7]],["C",[27.7,87.65,25.1,87.65]],["L",[20.6,87.05]],["C",[18.15,86.45,16.4,85]],["C",[14.7,83.6,14.6,81.05]],["C",[14.7,76.6,17.45,74.75]],["C",[20.1,72.9,23.9,72.4]],["L",[31.45,71.35]],["C",[35.2,70.95,37.9,69.3]]]);
		this.motifs.set("b",[["M",[6.3,23.8]],["L",[6.3,95.2]],["L",[17.1,95.2]],["L",[17.1,88.1]],["L",[17.3,88.1]],["C",[19,91.5,21.9,93.35]],["C",[24.7,95.2,28.15,95.95]],["L",[35.2,96.6]],["C",[42.8,96.5,47.75,92.7]],["C",[52.7,88.9,55.1,82.8]],["C",[57.45,76.7,57.45,69.6]],["C",[57.45,61.95,54.85,55.75]],["C",[52.15,49.55,46.8,45.85]],["C",[41.45,42.15,33.3,42.1]],["C",[30.3,42.1,27.4,43.05]],["C",[24.45,44.05,21.95,45.85]],["C",[19.5,47.65,17.85,50.2]],["L",[17.7,50.2]],["L",[17.7,23.8]],["L",[6.3,23.8]],["M",[31.8,51.05]],["C",[36.45,51.15,39.7,53.7]],["C",[42.85,56.3,44.5,60.45]],["C",[46.1,64.6,46.1,69.4]],["C",[46.15,74,44.7,78.1]],["C",[43.25,82.25,40.15,84.9]],["C",[36.95,87.55,31.8,87.65]],["C",[27.15,87.6,23.95,85.25]],["C",[20.7,82.85,19,78.75]],["C",[17.3,74.65,17.3,69.4]],["C",[17.3,61,20.95,56.1]],["C",[24.55,51.15,31.8,51.05]]]);
		this.motifs.set("c",[["M",[14.85,45.85]],["C",[9.2,49.5,6.35,55.75]],["C",[3.5,62,3.5,69.9]],["C",[3.5,77.55,6.4,83.6]],["C",[9.35,89.6,14.9,93.05]],["C",[20.45,96.5,28.6,96.6]],["C",[38.6,96.55,44.65,91.25]],["C",[50.7,85.9,52.3,75.8]],["L",[40.85,75.8]],["C",[40.05,81.45,36.8,84.5]],["C",[33.6,87.6,28.6,87.65]],["C",[23.7,87.55,20.65,84.95]],["C",[17.65,82.35,16.25,78.3]],["C",[14.9,74.3,14.9,69.9]],["C",[15,62.1,17.25,58.05]],["C",[19.55,53.95,22.8,52.45]],["C",[26.05,50.95,29.1,51.05]],["C",[33.9,51.05,37,53.55]],["C",[40.15,56.05,40.85,60.8]],["L",[52.3,60.8]],["C",[51.65,54.45,48.45,50.3]],["C",[45.15,46.15,40.15,44.1]],["C",[35.05,42.1,29,42.1]],["C",[20.5,42.15,14.85,45.85]]]);
		this.motifs.set("d",[["M",[43.3,23.8]],["L",[43.3,50.2]],["L",[43.1,50.2]],["C",[41.3,47.3,38.55,45.55]],["C",[35.75,43.75,32.45,42.9]],["C",[29.2,42.1,25.9,42.1]],["C",[20.15,42.1,15.1,44.9]],["C",[10,47.75,6.8,53.7]],["C",[3.6,59.65,3.5,69]],["C",[3.5,76.85,6.15,83.05]],["C",[8.85,89.3,14.2,92.9]],["C",[19.55,96.5,27.7,96.6]],["C",[32.65,96.65,37,94.6]],["C",[41.35,92.6,43.7,88.2]],["L",[43.9,88.2]],["L",[43.9,95.2]],["L",[54.7,95.2]],["L",[54.7,23.8]],["L",[43.3,23.8]],["M",[29.4,51.05]],["C",[36.1,51.1,39.85,55.9]],["C",[43.65,60.7,43.7,69.25]],["C",[43.75,73.9,42.25,78.05]],["C",[40.7,82.2,37.5,84.9]],["C",[34.3,87.55,29.2,87.65]],["C",[24.25,87.55,21.1,85]],["C",[17.9,82.5,16.4,78.45]],["C",[14.9,74.45,14.9,69.9]],["C",[14.85,65.15,16.25,60.85]],["C",[17.7,56.6,20.9,53.9]],["C",[24.05,51.15,29.4,51.05]]]);
		this.motifs.set("e",[["M",[15.2,45.9]],["C",[9.55,49.6,6.6,55.75]],["C",[3.55,61.95,3.5,69.35]],["C",[3.5,77.45,6.5,83.55]],["C",[9.4,89.65,15.05,93.1]],["C",[20.65,96.55,28.8,96.6]],["C",[34.45,96.6,39.3,94.55]],["C",[44.15,92.5,47.5,88.6]],["C",[50.9,84.7,52.2,79]],["L",[41.4,79]],["C",[39.9,83.3,36.8,85.5]],["C",[33.75,87.65,28.8,87.65]],["C",[24,87.6,20.95,85.5]],["C",[17.85,83.35,16.4,79.85]],["C",[14.9,76.4,14.9,72.3]],["L",[52.9,72.3]],["C",[53.55,66.45,52.15,61]],["C",[50.8,55.65,47.5,51.35]],["C",[44.3,47.1,39.45,44.6]],["C",[34.6,42.1,28.45,42.1]],["C",[20.75,42.15,15.2,45.9]],["M",[39.65,58.05]],["C",[41.25,61.1,41.5,64.8]],["L",[14.9,64.8]],["C",[15.1,60.85,16.8,57.8]],["C",[18.5,54.7,21.55,52.9]],["C",[24.5,51.1,28.45,51.05]],["C",[32.35,51.1,35.2,53]],["C",[38.05,54.9,39.65,58.05]]]);
		this.motifs.set("f",[["M",[28.35,23.95]],["L",[23.7,23.8]],["C",[19.9,23.7,16.7,24.9]],["C",[13.5,26,11.45,29.35]],["C",[9.45,32.7,9.4,39.2]],["L",[9.4,43.5]],["L",[0.95,43.5]],["L",[0.95,52]],["L",[9.4,52]],["L",[9.4,95.2]],["L",[20.8,95.2]],["L",[20.8,52]],["L",[30.5,52]],["L",[30.5,43.5]],["L",[20.8,43.5]],["L",[20.8,38.2]],["C",[20.85,35.05,22.4,33.85]],["C",[24,32.75,26.4,32.8]],["L",[29.35,32.95]],["L",[31.7,33.4]],["L",[31.7,24.5]],["L",[28.35,23.95]]]);
		this.motifs.set("g",[["M",[42.45,43.5]],["L",[42.45,50.55]],["L",[42.25,50.55]],["C",[40,46.25,35.95,44.15]],["C",[31.9,42.1,26.9,42.1]],["C",[19.55,42.15,14.3,45.7]],["C",[9.1,49.25,6.3,55.05]],["C",[3.55,60.9,3.5,68]],["C",[3.5,75.45,5.9,81.65]],["C",[8.3,87.8,13.45,91.45]],["C",[18.55,95.1,26.7,95.2]],["C",[31.6,95.15,35.7,92.8]],["C",[39.75,90.4,42.25,86.1]],["L",[42.45,86.1]],["L",[42.45,94]],["C",[42.5,100.4,39.2,103.8]],["C",[36,107.15,29.1,107.2]],["L",[23.65,106.65]],["C",[21.05,106.15,19.25,104.5]],["C",[17.45,102.8,16.7,99.6]],["L",[5.3,99.6]],["C",[5.9,105.6,9.4,109.15]],["C",[12.95,112.7,18,114.25]],["C",[23.1,115.75,28.4,115.7]],["C",[40.7,115.7,47.2,109.9]],["C",[53.75,104.15,53.8,92.5]],["L",[53.8,43.5]],["L",[42.45,43.5]],["M",[28.5,51.05]],["C",[33.45,51.1,36.5,53.5]],["C",[39.6,55.9,41,59.8]],["C",[42.45,63.65,42.45,68.2]],["C",[42.5,72.7,41.05,76.8]],["C",[39.7,80.9,36.6,83.5]],["C",[33.55,86.1,28.5,86.2]],["C",[23.8,86.1,20.75,83.7]],["C",[17.7,81.2,16.3,77.35]],["C",[14.9,73.4,14.9,69.1]],["C",[14.85,64.7,16.15,60.6]],["C",[17.5,56.5,20.5,53.8]],["C",[23.5,51.15,28.5,51.05]]]);
		this.motifs.set("h",[["M",[6,23.8]],["L",[6,95.2]],["L",[17.4,95.2]],["L",[17.4,64.7]],["C",[17.4,60.85,18.95,57.75]],["C",[20.45,54.65,23.25,52.9]],["C",[26.05,51.1,29.9,51.05]],["C",[34.9,51,37.4,53.85]],["C",[39.85,56.65,40,62.7]],["L",[40,95.2]],["L",[51.35,95.2]],["L",[51.35,59.65]],["C",[51.25,50.95,46.45,46.5]],["C",[41.55,42.1,33.1,42.1]],["C",[27.95,42.15,23.85,44.4]],["C",[19.75,46.65,17.6,50.3]],["L",[17.4,50.3]],["L",[17.4,23.8]],["L",[6,23.8]]]);
		this.motifs.set("i",[["M",[6.3,34.6]],["L",[17.7,34.6]],["L",[17.7,23.8]],["L",[6.3,23.8]],["L",[6.3,34.6]],["M",[6.3,43.5]],["L",[6.3,95.2]],["L",[17.7,95.2]],["L",[17.7,43.5]],["L",[6.3,43.5]]]);
		this.motifs.set("j",[["M",[6.3,34.6]],["L",[17.7,34.6]],["L",[17.7,23.8]],["L",[6.3,23.8]],["L",[6.3,34.6]],["M",[6.3,43.5]],["L",[6.3,99.1]],["C",[6.4,102.95,5.55,104.8]],["C",[4.75,106.7,1.7,106.7]],["L",[-0.1,106.65]],["L",[-2.2,106.35]],["L",[-2.2,115.3]],["L",[0.1,115.55]],["L",[2.9,115.7]],["C",[10.85,115.65,14.3,111.5]],["C",[17.75,107.4,17.7,99.65]],["L",[17.7,43.5]],["L",[6.3,43.5]]]);
		this.motifs.set("k",[["M",[6.3,23.8]],["L",[6.3,95.2]],["L",[17.7,95.2]],["L",[17.7,76.7]],["L",[24.45,70.1]],["L",[40.3,95.2]],["L",[54.15,95.2]],["L",[32.45,62.5]],["L",[52.3,43.5]],["L",[38.3,43.5]],["L",[17.7,64.4]],["L",[17.7,23.8]],["L",[6.3,23.8]]]);
		this.motifs.set("l",[["M",[6.3,23.8]],["L",[6.3,95.2]],["L",[17.7,95.2]],["L",[17.7,23.8]],["L",[6.3,23.8]]]);
		this.motifs.set("m",[["M",[54.2,44.35]],["C",[50.3,46.65,47.45,50.65]],["C",[45.65,46.25,41.75,44.15]],["C",[37.8,42.1,33,42.1]],["C",[26.95,42.1,23.25,44.45]],["C",[19.55,46.75,17.1,50.65]],["L",[16.8,50.65]],["L",[16.8,43.5]],["L",[6,43.5]],["L",[6,95.2]],["L",[17.4,95.2]],["L",[17.4,64.5]],["C",[17.45,60.15,19,57.15]],["C",[20.55,54.2,23.15,52.6]],["C",[25.7,51.05,28.7,51.05]],["C",[33.8,51.05,35.85,53.85]],["C",[37.9,56.65,37.8,61.95]],["L",[37.8,95.2]],["L",[49.15,95.2]],["L",[49.15,64.9]],["C",[49.1,58.3,51.75,54.7]],["C",[54.45,51.1,60.15,51.05]],["C",[64.55,51.1,66.55,52.8]],["C",[68.6,54.6,69.15,57.7]],["C",[69.7,60.85,69.6,65]],["L",[69.6,95.2]],["L",[80.95,95.2]],["L",[80.95,59.45]],["C",[80.9,50.15,76.4,46.05]],["C",[71.9,42,63.65,42.1]],["C",[58.1,42.1,54.2,44.35]]]);
		this.motifs.set("n",[["M",[6,43.5]],["L",[6,95.2]],["L",[17.4,95.2]],["L",[17.4,64.7]],["C",[17.4,60.85,18.95,57.75]],["C",[20.45,54.65,23.25,52.9]],["C",[26.05,51.1,29.9,51.05]],["C",[34.9,51,37.4,53.85]],["C",[39.85,56.65,40,62.7]],["L",[40,95.2]],["L",[51.35,95.2]],["L",[51.35,59.65]],["C",[51.25,50.95,46.45,46.5]],["C",[41.55,42.1,33.1,42.1]],["C",[27.95,42.1,23.8,44.5]],["C",[19.6,46.95,17,51.25]],["L",[16.8,51.05]],["L",[16.8,43.5]],["L",[6,43.5]]]);
		this.motifs.set("o",[["M",[15.6,45.65]],["C",[9.7,49.1,6.7,55.2]],["C",[3.65,61.3,3.6,69.25]],["C",[3.65,77.35,6.7,83.5]],["C",[9.7,89.6,15.6,93.05]],["C",[21.4,96.55,29.75,96.6]],["C",[38.05,96.55,43.85,93.05]],["C",[49.7,89.6,52.75,83.5]],["C",[55.75,77.35,55.8,69.25]],["C",[55.75,61.3,52.75,55.2]],["C",[49.7,49.1,43.85,45.65]],["C",[38.05,42.1,29.75,42.1]],["C",[21.4,42.1,15.6,45.65]],["M",[29.75,51.05]],["C",[34.8,51.15,38.1,53.8]],["C",[41.3,56.5,42.85,60.6]],["C",[44.45,64.75,44.45,69.25]],["C",[44.45,73.9,42.85,78.05]],["C",[41.3,82.2,38.1,84.9]],["C",[34.8,87.55,29.75,87.65]],["C",[24.6,87.55,21.35,84.9]],["C",[18.1,82.2,16.55,78.05]],["C",[15,73.9,15,69.25]],["C",[15,64.75,16.55,60.6]],["C",[18.1,56.5,21.35,53.8]],["C",[24.6,51.15,29.75,51.05]]]);
		this.motifs.set("p",[["M",[6.3,43.5]],["L",[6.3,114.3]],["L",[17.7,114.3]],["L",[17.7,88.5]],["L",[17.85,88.5]],["C",[19.75,91.4,22.5,93.15]],["C",[25.3,94.95,28.55,95.8]],["C",[31.85,96.6,35.2,96.6]],["C",[42.8,96.5,47.75,92.7]],["C",[52.7,88.9,55.1,82.8]],["C",[57.45,76.7,57.45,69.6]],["C",[57.45,61.95,54.85,55.75]],["C",[52.15,49.55,46.8,45.85]],["C",[41.45,42.15,33.3,42.1]],["C",[28.25,42.05,24,44.1]],["C",[19.8,46.1,17.3,50.45]],["L",[17.1,50.45]],["L",[17.1,43.5]],["L",[6.3,43.5]],["M",[31.8,51.05]],["C",[36.45,51.15,39.7,53.7]],["C",[42.85,56.3,44.5,60.45]],["C",[46.1,64.6,46.1,69.4]],["C",[46.15,74,44.7,78.1]],["C",[43.25,82.25,40.15,84.9]],["C",[36.95,87.55,31.8,87.65]],["C",[27.15,87.6,23.95,85.25]],["C",[20.7,82.85,19,78.75]],["C",[17.3,74.65,17.3,69.4]],["C",[17.3,61,20.95,56.1]],["C",[24.55,51.15,31.8,51.05]]]);
		this.motifs.set("q",[["M",[43.9,43.5]],["L",[43.9,50.45]],["L",[43.7,50.45]],["C",[41.2,46.1,36.95,44.1]],["C",[32.7,42.05,27.7,42.1]],["C",[19.55,42.15,14.2,45.85]],["C",[8.85,49.55,6.15,55.75]],["C",[3.5,61.95,3.5,69.6]],["C",[3.5,76.7,5.9,82.8]],["C",[8.3,88.9,13.25,92.7]],["C",[18.15,96.5,25.8,96.6]],["L",[32.4,95.8]],["C",[35.7,94.95,38.5,93.15]],["C",[41.25,91.4,43.1,88.5]],["L",[43.3,88.5]],["L",[43.3,114.3]],["L",[54.7,114.3]],["L",[54.7,43.5]],["L",[43.9,43.5]],["M",[29.2,51.05]],["C",[36.35,51.15,40.05,56.05]],["C",[43.7,60.85,43.7,69.4]],["C",[43.7,74.85,42.15,78.95]],["C",[40.6,83.05,37.35,85.3]],["C",[34.15,87.6,29.2,87.65]],["C",[24,87.55,20.85,84.9]],["C",[17.7,82.25,16.3,78.1]],["C",[14.85,74,14.9,69.4]],["C",[14.9,64.6,16.5,60.45]],["C",[18.1,56.3,21.3,53.7]],["C",[24.5,51.15,29.2,51.05]]]);
		this.motifs.set("r",[["M",[6,43.5]],["L",[6,95.2]],["L",[17.4,95.2]],["L",[17.4,70.6]],["C",[17.45,64.9,19.3,60.9]],["C",[21.15,56.95,24.25,54.9]],["C",[27.45,52.85,31.4,52.85]],["L",[33.85,53.05]],["L",[36.3,53.35]],["L",[36.3,42.35]],["L",[34.7,42.15]],["L",[32,42.1]],["C",[28.4,42.1,25.25,43.85]],["C",[22.05,45.5,19.8,48.1]],["C",[17.6,50.65,16.9,53.45]],["L",[16.7,53.45]],["L",[16.7,43.5]],["L",[6,43.5]]]);
		this.motifs.set("s",[["M",[11.55,45.25]],["C",[8.35,46.9,6.35,49.8]],["C",[4.35,52.65,4.3,56.85]],["C",[4.4,62.1,6.75,65.1]],["C",[9.1,68.15,12.85,69.75]],["C",[16.6,71.35,20.9,72.2]],["L",[28.9,73.95]],["C",[32.65,74.8,35.1,76.35]],["C",[37.55,77.85,37.8,80.8]],["C",[37.85,83.75,35.9,85.25]],["C",[33.95,86.7,31.25,87.2]],["L",[26.25,87.65]],["C",[21.65,87.7,18.35,85.65]],["C",[15.15,83.55,14.6,78.65]],["L",[3.2,78.65]],["C",[3.35,84.7,6.35,88.7]],["C",[9.35,92.7,14.45,94.65]],["C",[19.55,96.6,26.05,96.6]],["L",[34.25,95.75]],["C",[38.3,94.8,41.65,92.85]],["C",[45,90.85,47.05,87.65]],["C",[49.1,84.4,49.15,79.8]],["C",[49.05,74.8,46.7,71.8]],["C",[44.3,68.85,40.55,67.2]],["C",[36.7,65.6,32.5,64.75]],["L",[24.4,62.9]],["C",[20.55,62.1,18.15,60.6]],["C",[15.75,59.1,15.65,56.4]],["C",[15.75,54.15,17.4,52.95]],["C",[19,51.85,21.2,51.45]],["L",[25.1,51.05]],["C",[28.9,50.95,31.85,52.5]],["C",[34.75,54,35.6,58]],["L",[47.45,58]],["C",[46.75,52.25,43.6,48.7]],["C",[40.55,45.25,35.9,43.65]],["C",[31.25,42.1,25.9,42.1]],["L",[18.55,42.8]],["C",[14.8,43.55,11.55,45.25]]]);
		this.motifs.set("t",[["M",[0.85,43.5]],["L",[0.85,52]],["L",[9.4,52]],["L",[9.4,82.5]],["C",[9.45,86.8,10.6,89.75]],["C",[11.7,92.65,14.75,94.15]],["C",[17.8,95.7,23.7,95.7]],["L",[27.4,95.45]],["L",[31.1,95.1]],["L",[31.1,86.3]],["L",[28.7,86.65]],["L",[26.3,86.7]],["C",[23.8,86.7,22.6,85.9]],["C",[21.45,85.1,21.1,83.55]],["C",[20.75,81.95,20.8,79.6]],["L",[20.8,52]],["L",[31.1,52]],["L",[31.1,43.5]],["L",[20.8,43.5]],["L",[20.8,28]],["L",[9.4,28]],["L",[9.4,43.5]],["L",[0.85,43.5]]]);
		this.motifs.set("u",[["M",[6,43.5]],["L",[6,76.3]],["C",[5.95,86.45,10.6,91.55]],["C",[15.25,96.6,25.3,96.6]],["C",[29.7,96.55,33.75,94.25]],["C",[37.8,92,40,88]],["L",[40.2,88]],["L",[40.2,95.2]],["L",[51.35,95.2]],["L",[51.35,43.5]],["L",[40,43.5]],["L",[40,73.45]],["C",[40.05,77.55,38.8,80.75]],["C",[37.6,83.9,34.8,85.8]],["C",[32.05,87.6,27.3,87.65]],["C",[22.6,87.75,20,84.85]],["C",[17.45,81.95,17.4,75.25]],["L",[17.4,43.5]],["L",[6,43.5]]]);
		this.motifs.set("v",[["M",[0.9,43.5]],["L",[19.7,95.2]],["L",[32.45,95.2]],["L",[51,43.5]],["L",[39.15,43.5]],["L",[26.55,83.2]],["L",[26.35,83.2]],["L",[13.3,43.5]],["L",[0.9,43.5]]]);
		this.motifs.set("w",[["M",[64.9,43.5]],["L",[54.4,82.1]],["L",[54.2,82.1]],["L",[44.9,43.5]],["L",[33.4,43.5]],["L",[23.7,82.1]],["L",[23.5,82.1]],["L",[13.4,43.5]],["L",[1.3,43.5]],["L",[17.3,95.2]],["L",[29.3,95.2]],["L",[38.8,56.75]],["L",[39,56.75]],["L",[48.6,95.2]],["L",[60.3,95.2]],["L",[76.5,43.5]],["L",[64.9,43.5]]]);
		this.motifs.set("x",[["M",[2,43.5]],["L",[19.9,67.95]],["L",[0.4,95.2]],["L",[13.8,95.2]],["L",[26.5,76.1]],["L",[39.6,95.2]],["L",[53.3,95.2]],["L",[33.5,67.35]],["L",[51.1,43.5]],["L",[37.9,43.5]],["L",[26.6,59.35]],["L",[15.8,43.5]],["L",[2,43.5]]]);
		this.motifs.set("y",[["M",[0.3,43.5]],["L",[19.9,95]],["L",[18.6,99]],["L",[17.1,102.8]],["C",[16.2,104.45,14.7,105.3]],["C",[13.25,106.2,10.6,106.2]],["L",[7.9,105.95]],["L",[5.2,105.5]],["L",[5.2,115.1]],["L",[9.15,115.55]],["L",[13.1,115.7]],["C",[18.95,115.6,22.3,113.15]],["C",[25.7,110.75,27.65,106.7]],["L",[31.4,98]],["L",[51.5,43.5]],["L",[39.6,43.5]],["L",[26.5,82.1]],["L",[26.3,82.1]],["L",[12.8,43.5]],["L",[0.3,43.5]]]);
		this.motifs.set("z",[["M",[2.2,95.2]],["L",[47.7,95.2]],["L",[47.7,86.2]],["L",[16.6,86.2]],["L",[46.2,51.5]],["L",[46.2,43.5]],["L",[4.2,43.5]],["L",[4.2,52.5]],["L",[30.8,52.5]],["L",[2.2,87.2]],["L",[2.2,95.2]]]);
	}
	,initializeMotifsNumbers: function() {
		this.motifs.set("0",[["M",[47.45,36.05]],["C",[44.8,30.65,40.1,27.3]],["C",[35.3,23.9,27.85,23.8]],["C",[20.3,23.9,15.55,27.3]],["C",[10.8,30.65,8.15,36.05]],["C",[5.55,41.5,4.6,47.85]],["C",[3.55,54.15,3.6,60.2]],["C",[3.55,66.3,4.6,72.6]],["C",[5.55,78.95,8.15,84.35]],["C",[10.8,89.8,15.55,93.15]],["C",[20.3,96.5,27.85,96.6]],["C",[35.3,96.5,40.1,93.15]],["C",[44.8,89.8,47.45,84.35]],["C",[50.05,78.95,51.05,72.6]],["C",[52.05,66.3,52,60.2]],["C",[52.05,54.15,51.05,47.85]],["C",[50.05,41.5,47.45,36.05]],["M",[39.55,46.75]],["C",[40.65,52.8,40.65,60.2]],["C",[40.65,67.6,39.55,73.65]],["C",[38.4,79.7,35.6,83.4]],["C",[32.75,87,27.85,87.1]],["C",[22.85,87,20,83.4]],["C",[17.25,79.7,16.05,73.65]],["C",[14.95,67.6,15,60.2]],["C",[14.95,52.8,16.05,46.75]],["C",[17.25,40.7,20,37.05]],["C",[22.85,33.45,27.85,33.35]],["C",[32.75,33.45,35.6,37.05]],["C",[38.4,40.7,39.55,46.75]]]);
		this.motifs.set("1",[["M",[5.3,45.8]],["L",[22.5,45.8]],["L",[22.5,95.2]],["L",[35,95.2]],["L",[35,25.2]],["L",[25.75,25.2]],["C",[24.8,29.4,21.8,31.95]],["C",[18.8,34.55,14.5,35.75]],["C",[10.15,36.85,5.3,36.8]],["L",[5.3,45.8]]]);
		this.motifs.set("2",[["M",[46.95,31.2]],["C",[44.4,27.95,40.05,25.9]],["C",[35.7,23.85,29.3,23.8]],["C",[21.5,23.9,16.1,27.4]],["C",[10.8,30.85,8,36.95]],["C",[5.2,43,5.2,50.8]],["L",[16.6,50.8]],["C",[16.7,45.9,17.8,41.95]],["C",[19,37.95,21.6,35.7]],["C",[24.1,33.4,28.6,33.35]],["C",[33.5,33.45,36.1,35.45]],["C",[38.65,37.45,39.6,40.25]],["C",[40.55,43.15,40.45,45.75]],["C",[40.3,49.8,38.35,52.95]],["C",[36.4,56.2,33.2,58.8]],["C",[30.1,61.45,26.4,63.85]],["L",[19.3,68.7]],["C",[12.2,73.4,8.15,80]],["C",[4.05,86.6,3.9,95.2]],["L",[51.7,95.2]],["L",[51.7,85]],["L",[17.6,85]],["C",[18.65,81.9,21.55,79.35]],["C",[24.35,76.7,28.2,74.2]],["L",[36.25,68.95]],["C",[40.3,66.15,43.8,62.8]],["C",[47.35,59.4,49.55,55.1]],["C",[51.75,50.85,51.8,45.3]],["C",[51.8,41.9,50.7,38.15]],["C",[49.55,34.45,46.95,31.2]]]);
		this.motifs.set("3",[["M",[46.4,32.15]],["C",[43.2,28,38.2,25.9]],["C",[33.15,23.8,27.6,23.8]],["C",[20.5,23.85,15.45,27]],["C",[10.35,30.05,7.5,35.4]],["C",[4.75,40.75,4.4,47.6]],["L",[15.75,47.6]],["C",[15.65,43.95,16.95,40.7]],["C",[18.2,37.5,20.8,35.45]],["C",[23.45,33.4,27.4,33.35]],["C",[32.25,33.4,35.25,36.05]],["C",[38.25,38.75,38.35,43.2]],["C",[38.3,47.5,36,49.95]],["C",[33.75,52.4,30.2,53.4]],["C",[26.7,54.4,22.85,54.2]],["L",[22.8,62.7]],["L",[31.55,63.15]],["C",[35.7,63.9,38.4,66.6]],["C",[41,69.2,41.1,74.6]],["C",[41.05,78.6,39.3,81.4]],["C",[37.6,84.15,34.55,85.65]],["C",[31.55,87.1,27.7,87.1]],["C",[23.25,87.05,20.25,85.15]],["C",[17.3,83.2,15.8,79.8]],["C",[14.35,76.5,14.5,72.2]],["L",[3.15,72.2]],["C",[3.25,79.55,6.05,85]],["C",[8.8,90.45,14.2,93.55]],["C",[19.65,96.55,27.7,96.6]],["C",[34.5,96.55,40.1,94]],["C",[45.7,91.4,49,86.6]],["C",[52.4,81.8,52.5,75.2]],["C",[52.45,68.35,49.1,63.65]],["C",[45.8,59,39.8,57.7]],["L",[39.8,57.5]],["C",[44.8,55.65,47.25,51.75]],["C",[49.7,47.85,49.7,42.5]],["C",[49.6,36.3,46.4,32.15]]]);
		this.motifs.set("4",[["M",[32.4,95.2]],["L",[43.2,95.2]],["L",[43.2,78.6]],["L",[52.2,78.6]],["L",[52.2,69.6]],["L",[43.2,69.6]],["L",[43.2,25.2]],["L",[32.4,25.2]],["L",[2.45,67.3]],["L",[2.45,78.6]],["L",[32.4,78.6]],["L",[32.4,95.2]],["M",[32.4,38.8]],["L",[32.4,69.6]],["L",[11.25,69.6]],["L",[32.25,38.8]],["L",[32.4,38.8]]]);
		this.motifs.set("5",[["M",[48.5,25.2]],["L",[12.3,25.2]],["L",[4.85,63.4]],["L",[16.2,63.4]],["C",[17.65,59.8,20.7,58.4]],["C",[23.85,56.95,27.5,57]],["C",[32.1,57.05,35.05,59.1]],["C",[38,61.1,39.4,64.45]],["C",[40.8,67.75,40.8,71.65]],["C",[40.85,75.95,39.6,79.45]],["C",[38.4,82.95,35.5,85]],["C",[32.6,87.05,27.8,87.1]],["C",[22.2,87.05,18.85,84]],["C",[15.5,80.95,14.9,75.3]],["L",[3.5,75.3]],["C",[3.8,82.3,7.1,87.05]],["C",[10.35,91.8,15.75,94.15]],["C",[21.2,96.6,28.05,96.6]],["C",[34.4,96.55,39.05,94.25]],["C",[43.65,92,46.55,88.25]],["C",[49.45,84.5,50.85,80.1]],["C",[52.2,75.7,52.2,71.45]],["C",[52.2,64.7,49.6,59.4]],["C",[47,54.15,42.2,51.1]],["C",[37.3,48.1,30.3,48.05]],["C",[26.7,48.05,23.25,49.4]],["C",[19.8,50.75,17.4,53.3]],["L",[17.2,53.1]],["L",[20.8,35.4]],["L",[48.5,35.4]],["L",[48.5,25.2]]]);
		this.motifs.set("6",[["M",[47.6,32.9]],["C",[44.75,28.65,40.1,26.25]],["C",[35.4,23.85,29.8,23.8]],["C",[22.4,23.9,17.35,27.15]],["C",[12.25,30.35,9.2,35.7]],["C",[6.1,40.95,4.8,47.3]],["C",[3.4,53.65,3.4,60]],["C",[3.3,70.3,5.45,78.55]],["C",[7.55,86.8,13.15,91.65]],["C",[18.7,96.5,28.9,96.6]],["C",[35.95,96.55,41.15,93.45]],["C",[46.4,90.3,49.25,84.95]],["C",[52.15,79.6,52.2,72.7]],["C",[52.15,65.9,49.55,60.65]],["C",[46.9,55.35,42.05,52.35]],["C",[37.1,49.25,30.15,49.2]],["C",[25.4,49.2,21.4,51.3]],["C",[17.45,53.35,15.05,57.5]],["L",[14.8,57.3]],["C",[15.05,53.75,15.65,49.7]],["C",[16.2,45.6,17.7,41.9]],["C",[19.15,38.15,21.9,35.8]],["C",[24.7,33.4,29.3,33.35]],["C",[33.8,33.4,36.45,35.95]],["C",[39.1,38.6,39.5,42.9]],["L",[50.9,42.9]],["C",[50.5,37.2,47.6,32.9]],["M",[28.5,58.2]],["C",[32.6,58.25,35.35,60.25]],["C",[38.1,62.2,39.45,65.45]],["C",[40.8,68.7,40.8,72.5]],["C",[40.8,76.3,39.45,79.6]],["C",[38.1,82.95,35.35,85]],["C",[32.6,87.05,28.5,87.1]],["C",[24.35,87.05,21.6,85]],["C",[18.75,82.95,17.35,79.65]],["C",[15.9,76.35,15.9,72.5]],["C",[15.9,68.6,17.35,65.35]],["C",[18.75,62.15,21.6,60.2]],["C",[24.35,58.25,28.5,58.2]]]);
		this.motifs.set("7",[["M",[51.35,25.2]],["L",[3.5,25.2]],["L",[3.5,35.4]],["L",[39.8,35.4]],["C",[32.5,43.55,26.7,53.15]],["C",[20.9,62.85,17.3,73.45]],["C",[13.6,84.1,12.8,95.2]],["L",[25.3,95.2]],["C",[26.2,82.6,29.6,71.9]],["C",[33,61.25,38.55,52.1]],["C",[44.05,42.9,51.35,34.7]],["L",[51.35,25.2]]]);
		this.motifs.set("8",[["M",[43.95,28.9]],["C",[38.3,23.9,27.85,23.8]],["C",[17.35,23.9,11.65,28.9]],["C",[6.05,33.9,6,42.9]],["C",[6.05,48.05,8.6,51.75]],["C",[11.15,55.45,15.9,57.3]],["L",[15.9,57.5]],["C",[10,59.05,6.6,63.5]],["C",[3.15,67.95,3.15,74.65]],["C",[3.15,81.55,6.35,86.4]],["C",[9.55,91.35,15.1,94]],["C",[20.65,96.55,27.85,96.6]],["C",[34.95,96.55,40.55,94]],["C",[46.05,91.35,49.25,86.4]],["C",[52.45,81.55,52.5,74.65]],["C",[52.45,67.95,49,63.5]],["C",[45.6,59.05,39.7,57.5]],["L",[39.7,57.3]],["C",[44.5,55.45,47,51.75]],["C",[49.55,48.05,49.6,42.9]],["C",[49.55,33.9,43.95,28.9]],["M",[27.85,32.8]],["C",[32.5,32.8,35.6,35.6]],["C",[38.7,38.3,38.8,43.5]],["C",[38.7,48.45,35.7,51.1]],["C",[32.6,53.8,27.85,53.8]],["C",[23,53.8,19.9,51.1]],["C",[16.9,48.45,16.8,43.5]],["C",[16.9,38.3,20,35.6]],["C",[23.1,32.8,27.85,32.8]],["M",[37.3,65.55]],["C",[41,68.8,41.1,74.6]],["C",[41,80.8,37.3,84.2]],["C",[33.65,87.6,27.85,87.65]],["C",[21.95,87.6,18.3,84.2]],["C",[14.6,80.85,14.5,74.65]],["C",[14.6,68.8,18.3,65.55]],["C",[21.95,62.35,27.85,62.3]],["C",[33.65,62.35,37.3,65.55]]]);
		this.motifs.set("9",[["M",[42.7,28.8]],["C",[37.3,23.9,27.5,23.8]],["C",[19.8,23.85,14.45,27]],["C",[9.1,30.1,6.25,35.5]],["C",[3.4,40.85,3.4,47.7]],["C",[3.45,54.85,6.2,60.2]],["C",[8.95,65.45,13.9,68.35]],["C",[18.85,71.25,25.5,71.25]],["C",[30.35,71.25,34.35,69.1]],["C",[38.3,66.95,40.6,62.9]],["L",[40.8,63.05]],["C",[40.6,66.65,40,70.75]],["C",[39.4,74.85,37.95,78.55]],["C",[36.45,82.25,33.7,84.65]],["C",[30.9,87.05,26.3,87.1]],["C",[21.85,87.05,19.15,84.45]],["C",[16.45,81.8,16.05,77.5]],["L",[4.7,77.5]],["C",[5.1,83.25,7.95,87.55]],["C",[10.85,91.8,15.55,94.15]],["C",[20.15,96.55,25.8,96.6]],["C",[33.2,96.5,38.3,93.3]],["C",[43.35,90.05,46.45,84.75]],["C",[49.5,79.5,50.85,73.15]],["C",[52.2,66.8,52.2,60.45]],["C",[52.3,50.15,50.2,41.9]],["C",[48.1,33.65,42.7,28.8]],["M",[16.1,40.5]],["C",[17.45,37.3,20.15,35.35]],["C",[22.85,33.4,27,33.35]],["C",[31.25,33.4,34.1,35.4]],["C",[36.9,37.35,38.3,40.55]],["C",[39.7,43.8,39.7,47.6]],["C",[39.7,51.5,38.3,54.8]],["C",[36.9,58.15,34.1,60.2]],["C",[31.25,62.25,27,62.3]],["C",[22.85,62.25,20.15,60.2]],["C",[17.45,58.1,16.1,54.75]],["C",[14.8,51.45,14.8,47.6]],["C",[14.8,43.8,16.1,40.5]]]);
	}
	,initializeMotifsPunctuation: function() {
		this.motifs.set(" ",[]);
		this.motifs.set("!",[["M",[7.7,44.4]],["L",[11.05,75.35]],["L",[16.9,75.35]],["L",[20.2,44.4]],["L",[20.2,23.8]],["L",[7.7,23.8]],["L",[7.7,44.4]],["M",[7.25,95.2]],["L",[20.6,95.2]],["L",[20.6,82.7]],["L",[7.25,82.7]],["L",[7.25,95.2]]]);
		this.motifs.set("\"",[["M",[25.9,23.8]],["L",[25.9,52.05]],["L",[36.1,52.05]],["L",[36.1,23.8]],["L",[25.9,23.8]],["M",[8.3,23.8]],["L",[8.3,52.05]],["L",[18.5,52.05]],["L",[18.5,23.8]],["L",[8.3,23.8]]]);
		this.motifs.set("#",[["M",[46.8,25.2]],["L",[38.65,25.2]],["L",[35.8,46.2]],["L",[24.65,46.2]],["L",[27.7,25.2]],["L",[19.6,25.2]],["L",[16.7,46.2]],["L",[6.3,46.2]],["L",[6.3,53.7]],["L",[15.65,53.7]],["L",[13.85,66.7]],["L",[3.35,66.7]],["L",[3.35,74.2]],["L",[12.8,74.2]],["L",[9.85,95.2]],["L",[17.85,95.2]],["L",[20.9,74.2]],["L",[31.9,74.2]],["L",[29,95.2]],["L",[36.95,95.2]],["L",[40,74.2]],["L",[49.45,74.2]],["L",[49.45,66.7]],["L",[40.95,66.7]],["L",[42.75,53.7]],["L",[52.4,53.7]],["L",[52.4,46.2]],["L",[43.8,46.2]],["L",[46.8,25.2]],["M",[34.75,53.7]],["L",[32.95,66.7]],["L",[21.9,66.7]],["L",[23.7,53.7]],["L",[34.75,53.7]]]);
		this.motifs.set("$",[["M",[41.2,24.2]],["C",[36.3,22.1,30.2,22.1]],["L",[30.2,14.3]],["L",[25.9,14.3]],["L",[25.9,22.1]],["C",[19.85,22.1,14.75,24.35]],["C",[9.6,26.6,6.45,31]],["C",[3.3,35.35,3.2,41.7]],["C",[3.3,48.9,6.7,53.2]],["C",[10,57.55,15.2,59.9]],["C",[20.3,62.3,25.9,63.7]],["L",[25.9,87.9]],["C",[19.1,87.65,16,83.9]],["C",[13,80.15,13.1,73.5]],["L",[1.7,73.5]],["C",[1.65,81,4.7,86.1]],["C",[7.7,91.3,13.2,94.05]],["C",[18.65,96.75,25.9,96.9]],["L",[25.9,104.7]],["L",[30.2,104.7]],["L",[30.2,96.9]],["C",[36.9,96.6,42.3,94.15]],["C",[47.6,91.7,50.75,86.8]],["C",[53.85,81.9,53.9,74.4]],["C",[53.8,67.2,50.45,62.9]],["C",[47.1,58.6,41.75,56.15]],["C",[36.4,53.75,30.2,52.2]],["L",[30.2,31.1]],["C",[35.5,31.15,38,33.8]],["C",[40.55,36.55,40.7,41.6]],["L",[52.1,41.6]],["C",[52,35,49.05,30.7]],["C",[46.15,26.35,41.2,24.2]],["M",[17.55,33.4]],["C",[20.45,31.05,25.9,31.1]],["L",[25.9,51.1]],["C",[23.05,50.4,20.45,49.25]],["C",[17.9,48.15,16.25,46.15]],["C",[14.65,44.15,14.6,40.9]],["C",[14.65,35.7,17.55,33.4]],["M",[36.15,66.65]],["C",[38.95,67.85,40.7,70.1]],["C",[42.5,72.3,42.55,76]],["C",[42.45,81.95,39.05,84.8]],["C",[35.7,87.6,30.2,87.9]],["L",[30.2,64.65]],["C",[33.35,65.35,36.15,66.65]]]);
		this.motifs.set("%",[["M",[82.05,83.55]],["C",[81.25,86.55,79.55,88.3]],["C",[77.8,90.05,75,90.1]],["C",[72.2,90.05,70.5,88.3]],["C",[68.85,86.55,68.1,83.55]],["C",[67.4,80.5,67.4,76.7]],["C",[67.35,73.35,67.95,70.25]],["C",[68.6,67.2,70.25,65.3]],["C",[71.9,63.35,75,63.3]],["C",[78.1,63.35,79.8,65.3]],["C",[81.5,67.2,82.2,70.25]],["C",[82.85,73.35,82.8,76.7]],["C",[82.8,80.5,82.05,83.55]],["M",[84.6,59.6]],["C",[80.95,56.85,75.1,56.8]],["C",[69.25,56.85,65.6,59.6]],["C",[61.85,62.3,60.1,66.8]],["C",[58.4,71.25,58.4,76.7]],["C",[58.4,82.25,60.05,86.7]],["C",[61.7,91.2,65.4,93.9]],["C",[69.1,96.55,75.1,96.6]],["C",[81.1,96.55,84.8,93.9]],["C",[88.5,91.2,90.15,86.7]],["C",[91.8,82.25,91.8,76.7]],["C",[91.8,71.25,90.1,66.8]],["C",[88.35,62.3,84.6,59.6]],["M",[64.9,22.85]],["L",[26.05,97.6]],["L",[33.8,97.6]],["L",[72.45,22.85]],["L",[64.9,22.85]],["M",[9.9,33.75]],["C",[8.2,38.2,8.2,43.75]],["C",[8.2,49.25,9.85,53.75]],["C",[11.5,58.2,15.2,60.85]],["C",[18.9,63.55,24.9,63.6]],["C",[30.9,63.55,34.6,60.85]],["C",[38.3,58.2,39.95,53.75]],["C",[41.6,49.25,41.6,43.75]],["C",[41.6,38.2,39.9,33.75]],["C",[38.15,29.3,34.4,26.6]],["C",[30.75,23.85,24.9,23.8]],["C",[19.05,23.85,15.4,26.6]],["C",[11.65,29.3,9.9,33.75]],["M",[17.75,37.25]],["C",[18.4,34.2,20.05,32.3]],["C",[21.75,30.35,24.8,30.3]],["C",[27.9,30.35,29.6,32.3]],["C",[31.3,34.2,32,37.25]],["C",[32.65,40.3,32.6,43.75]],["C",[32.6,47.5,31.85,50.5]],["C",[31.05,53.55,29.35,55.3]],["C",[27.6,57.05,24.8,57.1]],["C",[22,57.05,20.3,55.3]],["C",[18.65,53.55,17.9,50.5]],["C",[17.2,47.5,17.2,43.75]],["C",[17.15,40.3,17.75,37.25]]]);
		this.motifs.set("&",[["M",[45.1,29.7]],["C",[42.65,25.9,38.6,24]],["C",[34.55,22.1,29.9,22.1]],["C",[25,22.15,21.05,24.2]],["C",[17.1,26.3,14.8,30.1]],["C",[12.45,33.9,12.4,39.1]],["C",[12.5,43.7,14.6,47.45]],["C",[16.75,51.2,19.65,54.7]],["C",[15.45,56.8,11.7,59.7]],["C",[8,62.65,5.65,66.5]],["C",[3.3,70.4,3.2,75.4]],["C",[3.25,82.15,6.15,86.9]],["C",[9,91.6,14.05,94.1]],["C",[19.1,96.6,25.7,96.6]],["C",[31.9,96.6,36.8,94.35]],["C",[41.75,92.1,45.7,87.25]],["L",[52.2,95.2]],["L",[66.2,95.2]],["L",[52.5,78.6]],["C",[54.9,74.8,56.25,70.3]],["C",[57.55,65.8,58.1,61.1]],["L",[48.1,61.1]],["C",[47.7,64.55,47.1,66.8]],["L",[45.9,70.7]],["L",[34.8,57.3]],["C",[38.3,55.45,41.2,52.8]],["C",[44.15,50.25,45.9,46.8]],["C",[47.65,43.4,47.7,39.2]],["C",[47.6,33.5,45.1,29.7]],["M",[22.6,38.5]],["C",[22.7,34.85,24.85,32.75]],["C",[26.95,30.65,30.2,30.6]],["C",[33.55,30.65,35.5,32.95]],["C",[37.45,35.2,37.5,38.8]],["C",[37.4,43,34.9,45.65]],["C",[32.45,48.35,29.1,50.4]],["L",[26.25,46.75]],["C",[24.75,44.9,23.75,42.85]],["C",[22.65,40.85,22.6,38.5]],["M",[25.6,62.25]],["L",[39.6,79.6]],["L",[36.95,83]],["C",[35.4,84.85,32.8,86.2]],["C",[30.2,87.6,26.1,87.65]],["C",[21.05,87.6,17.85,84.5]],["C",[14.7,81.45,14.6,75.6]],["C",[14.7,71.4,16.5,69]],["C",[18.35,66.5,20.9,65]],["C",[23.4,63.45,25.6,62.25]]]);
		this.motifs.set("'",[["M",[8.8,23.8]],["L",[8.8,52.05]],["L",[19,52.05]],["L",[19,23.8]],["L",[8.8,23.8]]]);
		this.motifs.set("(",[["M",[8.7,44.35]],["C",[5,56.1,4.95,68.2]],["C",[5,77.7,6.9,85.85]],["C",[8.8,93.95,12,100.95]],["C",[15.3,108,19.3,114.3]],["L",[28.6,114.3]],["C",[22.3,103.65,19.3,92.15]],["C",[16.3,80.7,16.3,68.2]],["C",[16.3,55.7,19.45,44.25]],["C",[22.6,32.8,28.6,22.1]],["L",[19.3,22.1]],["C",[12.45,32.65,8.7,44.35]]]);
		this.motifs.set(")",[["M",[8.55,22.1]],["L",[-0.8,22.1]],["C",[5.5,32.8,8.55,44.3]],["C",[11.5,55.8,11.5,68.3]],["C",[11.5,80.8,8.4,92.2]],["C",[5.2,103.65,-0.8,114.3]],["L",[8.55,114.3]],["C",[15.4,103.8,19.15,92.1]],["C",[22.85,80.45,22.9,68.3]],["C",[22.85,58.75,20.95,50.65]],["C",[19.05,42.55,15.8,35.55]],["C",[12.55,28.45,8.55,22.1]]]);
		this.motifs.set("*",[["M",[4.1,31.55]],["L",[1.9,38]],["L",[13,41.85]],["L",[6,51.2]],["L",[11.6,55.1]],["L",[18.4,45.3]],["L",[25.5,55.1]],["L",[30.8,51.2]],["L",[23.85,41.85]],["L",[35.2,38]],["L",[32.8,31.55]],["L",[21.9,35.85]],["L",[21.9,23.8]],["L",[15.1,23.8]],["L",[15.1,35.85]],["L",[4.1,31.55]]]);
		this.motifs.set("+",[["M",[24.9,44.55]],["L",[24.9,64.8]],["L",[4.8,64.8]],["L",[4.8,75]],["L",[24.9,75]],["L",[24.9,95.2]],["L",[35.1,95.2]],["L",[35.1,75]],["L",[55.2,75]],["L",[55.2,64.8]],["L",[35.1,64.8]],["L",[35.1,44.55]],["L",[24.9,44.55]]]);
		this.motifs.set(",",[["M",[6.9,95.2]],["L",[13.75,95.2]],["C",[13.85,98.5,12.2,101.25]],["C",[10.6,104,7.3,104.9]],["L",[7.3,111]],["C",[13.35,109.75,17,105.55]],["C",[20.6,101.4,20.8,95.2]],["L",[20.8,81.7]],["L",[6.9,81.7]],["L",[6.9,95.2]]]);
		this.motifs.set("-",[["M",[4.9,73.35]],["L",[34,73.35]],["L",[34,62.6]],["L",[4.9,62.6]],["L",[4.9,73.35]]]);
		this.motifs.set(".",[["M",[6.9,95.2]],["L",[20.8,95.2]],["L",[20.8,81.7]],["L",[6.9,81.7]],["L",[6.9,95.2]]]);
		this.motifs.set("/",[["M",[26.5,22.1]],["L",[-2.2,96.9]],["L",[8.7,96.9]],["L",[37.4,22.1]],["L",[26.5,22.1]]]);
		this.motifs.set(":",[["M",[6.9,44.6]],["L",[6.9,58.1]],["L",[20.8,58.1]],["L",[20.8,44.6]],["L",[6.9,44.6]],["M",[6.9,95.2]],["L",[20.8,95.2]],["L",[20.8,81.7]],["L",[6.9,81.7]],["L",[6.9,95.2]]]);
		this.motifs.set(");",[["M",[6.9,44.6]],["L",[6.9,58.1]],["L",[20.8,58.1]],["L",[20.8,44.6]],["L",[6.9,44.6]],["M",[6.9,95.2]],["L",[13.75,95.2]],["C",[13.85,98.5,12.2,101.25]],["C",[10.6,104,7.3,104.9]],["L",[7.3,111]],["C",[13.35,109.75,17,105.55]],["C",[20.6,101.4,20.8,95.2]],["L",[20.8,81.7]],["L",[6.9,81.7]],["L",[6.9,95.2]]]);
		this.motifs.set("<",[["M",[4.6,73.5]],["L",[55.35,96.05]],["L",[55.35,85.85]],["L",[17.95,69.9]],["L",[55.35,54.05]],["L",[55.35,43.85]],["L",[4.6,66.35]],["L",[4.6,73.5]]]);
		this.motifs.set("=",[["M",[4.8,85.1]],["L",[55.2,85.1]],["L",[55.2,74.9]],["L",[4.8,74.9]],["L",[4.8,85.1]],["M",[4.8,64.95]],["L",[55.2,64.95]],["L",[55.2,54.7]],["L",[4.8,54.7]],["L",[4.8,64.95]]]);
		this.motifs.set(">",[["M",[4.6,96.05]],["L",[55.35,73.5]],["L",[55.35,66.35]],["L",[4.6,43.85]],["L",[4.6,54.05]],["L",[42,69.9]],["L",[4.6,85.85]],["L",[4.6,96.05]]]);
		this.motifs.set("?",[["M",[47.75,31.35]],["C",[44.85,26.85,39.95,24.5]],["C",[35.05,22.1,28.9,22.1]],["C",[21.55,22.15,16.15,25.2]],["C",[10.75,28.2,7.85,33.7]],["C",[4.95,39.15,4.95,46.5]],["L",[16.3,46.5]],["C",[16.3,39.7,19.3,35.7]],["C",[22.25,31.7,28.35,31.65]],["C",[30.25,31.6,32.5,32.7]],["C",[34.75,33.75,36.45,36.2]],["C",[38.1,38.7,38.2,42.7]],["C",[38.15,46.05,37.05,48.2]],["C",[35.95,50.4,34.1,52.05]],["L",[30.1,55.5]],["C",[27.45,57.75,25.75,60.25]],["C",[24,62.75,23.15,66.4]],["C",[22.3,70.05,22.3,75.8]],["L",[33.1,75.8]],["C",[33.1,71.1,34.25,68.15]],["C",[35.35,65.15,37.35,63.05]],["C",[39.3,60.95,41.9,58.9]],["L",[46.15,55.05]],["C",[48.1,53,49.35,50]],["C",[50.65,46.95,50.7,42.3]],["C",[50.65,35.85,47.75,31.35]],["M",[20.8,95.2]],["L",[34.2,95.2]],["L",[34.2,82.7]],["L",[20.8,82.7]],["L",[20.8,95.2]]]);
		this.motifs.set("@",[["M",[41.6,22.1]],["C",[34.1,22.15,27.5,24.9]],["C",[20.85,27.65,15.75,32.6]],["C",[10.7,37.5,7.8,44.05]],["C",[4.95,50.55,4.9,58.2]],["C",[5,69.7,9.95,78.4]],["C",[14.9,87.1,23.3,92]],["C",[31.7,96.8,42.1,96.9]],["C",[51.45,96.85,59.3,92.55]],["C",[67.1,88.3,72,80.5]],["L",[65,80.5]],["C",[60.9,85.2,55,87.8]],["C",[49.1,90.35,42.55,90.4]],["C",[34,90.35,27.3,86.5]],["C",[20.65,82.65,16.8,75.5]],["C",[13,68.4,12.9,58.6]],["C",[12.95,50.2,16.55,43.4]],["C",[20.15,36.65,26.6,32.65]],["C",[33.05,28.7,41.6,28.6]],["C",[48.95,28.65,55.05,31.55]],["C",[61.05,34.4,64.65,39.75]],["C",[68.2,45.1,68.3,52.6]],["C",[68.25,58.75,66.3,63.6]],["C",[64.4,68.5,61.45,71.3]],["C",[58.5,74.15,55.3,74.2]],["C",[54,74.15,53.6,73.15]],["C",[53.25,72.05,53.5,70.5]],["C",[53.75,68.9,54.3,67.3]],["L",[61.5,41]],["L",[54.5,41]],["L",[52.75,46.7]],["C",[50.85,42.9,47.95,41.2]],["C",[45.05,39.5,41.5,39.5]],["C",[36.55,39.55,32.5,41.75]],["C",[28.5,44,25.65,47.7]],["C",[22.7,51.4,21.15,56]],["C",[19.6,60.6,19.6,65.35]],["C",[19.65,69.7,21.55,73.3]],["C",[23.45,76.8,26.7,78.95]],["C",[30,81.05,34.2,81.1]],["C",[37.45,81,40.4,79.35]],["C",[43.3,77.7,45.4,75.4]],["L",[45.6,75.4]],["C",[45.8,78.3,47.45,79.75]],["C",[49.1,81.2,51.5,81.2]],["C",[54.65,81.2,58.6,79.4]],["C",[62.6,77.5,66.35,73.8]],["C",[70.05,70.15,72.55,64.55]],["C",[75,58.9,75.1,51.4]],["C",[75.05,44.9,72.35,39.6]],["C",[69.7,34.2,65.05,30.3]],["C",[60.35,26.4,54.35,24.25]],["C",[48.35,22.15,41.6,22.1]],["M",[30.2,71.05]],["C",[28.15,68.55,28.1,64.5]],["C",[28.1,60.65,29.8,56.65]],["C",[31.55,52.6,34.6,49.9]],["C",[37.7,47.1,41.9,47]],["C",[45.2,47.1,47.45,49.65]],["C",[49.7,52.2,49.8,55.8]],["C",[49.8,58.6,48.8,61.65]],["C",[47.75,64.75,45.9,67.4]],["C",[44.1,70.1,41.55,71.8]],["C",[39.05,73.5,36.1,73.55]],["C",[32.35,73.5,30.2,71.05]]]);
		this.motifs.set("[",[["M",[7.25,22.1]],["L",[7.25,114.3]],["L",[29.5,114.3]],["L",[29.5,105.3]],["L",[18,105.3]],["L",[18,31.1]],["L",[29.5,31.1]],["L",[29.5,22.1]],["L",[7.25,22.1]]]);
		this.motifs.set("\\",[["M",[37.4,96.9]],["L",[8.7,22.1]],["L",[-2.2,22.1]],["L",[26.5,96.9]],["L",[37.4,96.9]]]);
		this.motifs.set("]",[["M",[11.6,31.1]],["L",[11.6,105.3]],["L",[0.15,105.3]],["L",[0.15,114.3]],["L",[22.4,114.3]],["L",[22.4,22.1]],["L",[0.15,22.1]],["L",[0.15,31.1]],["L",[11.6,31.1]]]);
		this.motifs.set("^",[["M",[26.4,25.2]],["L",[8.4,61.7]],["L",[18.6,61.7]],["L",[30.05,37]],["L",[41.4,61.7]],["L",[51.6,61.7]],["L",[33.6,25.2]],["L",[26.4,25.2]]]);
		this.motifs.set("_",[["M",[50,102.7]],["L",[0,102.7]],["L",[0,107.7]],["L",[50,107.7]],["L",[50,102.7]]]);
		this.motifs.set("`",[["M",[10.55,22.1]],["L",[-2.9,22.1]],["L",[11.35,36.4]],["L",[19.65,36.4]],["L",[10.55,22.1]]]);
	}
	,initializeWidthsUppercase: function() {
		this.widths.set("A",67);
		this.widths.set("B",70);
		this.widths.set("C",72);
		this.widths.set("D",72);
		this.widths.set("E",63);
		this.widths.set("F",59);
		this.widths.set("G",76);
		this.widths.set("H",72);
		this.widths.set("I",28);
		this.widths.set("J",54);
		this.widths.set("K",69);
		this.widths.set("L",57);
		this.widths.set("M",89);
		this.widths.set("N",72);
		this.widths.set("O",76);
		this.widths.set("P",67);
		this.widths.set("Q",76);
		this.widths.set("R",70);
		this.widths.set("S",65);
		this.widths.set("T",59);
		this.widths.set("U",72);
		this.widths.set("V",61);
		this.widths.set("W",94);
		this.widths.set("X",65);
		this.widths.set("Y",65);
		this.widths.set("Z",63);
	}
	,initializeWidthsLowercase: function() {
		this.widths.set("a",56);
		this.widths.set("b",61);
		this.widths.set("c",56);
		this.widths.set("d",61);
		this.widths.set("e",56);
		this.widths.set("f",32);
		this.widths.set("g",59);
		this.widths.set("h",57);
		this.widths.set("i",24);
		this.widths.set("j",24);
		this.widths.set("k",54);
		this.widths.set("l",24);
		this.widths.set("m",87);
		this.widths.set("n",57);
		this.widths.set("o",59);
		this.widths.set("p",61);
		this.widths.set("q",61);
		this.widths.set("r",35);
		this.widths.set("s",52);
		this.widths.set("t",33);
		this.widths.set("u",57);
		this.widths.set("v",52);
		this.widths.set("w",78);
		this.widths.set("x",54);
		this.widths.set("y",52);
		this.widths.set("z",50);
	}
	,initializeWidthsNumbers: function() {
		this.widths.set("0",56);
		this.widths.set("1",56);
		this.widths.set("2",56);
		this.widths.set("3",56);
		this.widths.set("4",56);
		this.widths.set("5",56);
		this.widths.set("6",56);
		this.widths.set("7",56);
		this.widths.set("8",56);
		this.widths.set("9",56);
	}
	,initializeWidthsPunctuation: function() {
		this.widths.set(" ",28);
		this.widths.set("!",28);
		this.widths.set("\"",44);
		this.widths.set("#",56);
		this.widths.set("$",56);
		this.widths.set("%",100);
		this.widths.set("&",65);
		this.widths.set("'",28);
		this.widths.set("(",28);
		this.widths.set(")",28);
		this.widths.set("*",37);
		this.widths.set("+",60);
		this.widths.set(",",28);
		this.widths.set("-",39);
		this.widths.set(".",28);
		this.widths.set("/",35);
		this.widths.set(":",28);
		this.widths.set(");",28);
		this.widths.set("<",60);
		this.widths.set("=",60);
		this.widths.set(">",60);
		this.widths.set("?",56);
		this.widths.set("@",80);
		this.widths.set("[",30);
		this.widths.set("\\",35);
		this.widths.set("]",30);
		this.widths.set("^",60);
		this.widths.set("_",50);
		this.widths.set("`",24);
	}
	,__class__: net.badimon.five3D.typography.HelveticaMedium
});
var planes = {};
planes.IconGenerator = function() {
	THREE.Object3D.call(this);
};
planes.IconGenerator.__name__ = true;
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
	,__class__: planes.IconGenerator
});
planes.PlaneBase = function() {
	THREE.Object3D.call(this);
};
planes.PlaneBase.__name__ = true;
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
	,__class__: planes.PlaneBase
});
planes.ImgPlane = function() {
	this.selectIndex = 0;
	this._count = 0;
	this.vr = 0;
	this.vy = 0;
	this.vx = 0;
	planes.PlaneBase.call(this);
};
planes.ImgPlane.__name__ = true;
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
	,__class__: planes.ImgPlane
});
planes.PlaneFactory = function() {
	this.isActive = false;
	this._num = 0;
	this._count = 0;
	THREE.Object3D.call(this);
};
planes.PlaneFactory.__name__ = true;
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
	,__class__: planes.PlaneFactory
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
planes.RTTPlane.__name__ = true;
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
	,__class__: planes.RTTPlane
});
planes.rtt = {};
planes.rtt.RTTTexture = function() {
	this._type = 0;
	this._life = 0;
	this._vr = 0;
	this._count = 0;
};
planes.rtt.RTTTexture.__name__ = true;
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
	,__class__: planes.rtt.RTTTexture
};
planes.rtt.RTTTextures = function() {
};
planes.rtt.RTTTextures.__name__ = true;
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
planes.rtt.RTTTextures.prototype = {
	__class__: planes.rtt.RTTTextures
};
var sound = {};
sound.MyAudio = function() {
	this.globalVolume = 0.899;
	this.isStart = false;
	this._impulse = [];
};
sound.MyAudio.__name__ = true;
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
	,__class__: sound.MyAudio
};
var three = {};
three.Face = function() { };
three.Face.__name__ = true;
three.Face.prototype = {
	__class__: three.Face
};
three.IFog = function() { };
three.IFog.__name__ = true;
three.IFog.prototype = {
	__class__: three.IFog
};
three.Mapping = function() { };
three.Mapping.__name__ = true;
three.Renderer = function() { };
three.Renderer.__name__ = true;
three.Renderer.prototype = {
	__class__: three.Renderer
};
three._WebGLRenderer = {};
three._WebGLRenderer.RenderPrecision_Impl_ = function() { };
three._WebGLRenderer.RenderPrecision_Impl_.__name__ = true;
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
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Main3d.W = 1280;
Main3d.H = 800;
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
canvas.CanvasSrc.W = 200;
canvas.CanvasSrc.H = 50;
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
data.TextureData.emo2048 = new data.TextureData("emo2048.png",2048,2048);
data.TextureData.emo128 = new data.TextureData("emo128.png",2048,2048);
emoji.EmojiSpritePos.EMOJI_MAX1 = 845;
emoji.EmojiSpritePos.EMOJI_MAX2 = 200;
emoji.EmojiSpritePos.NUMX1 = 32;
emoji.EmojiSpritePos.NUMX2 = 16;
emoji.shader.CurlNoise.glsl = "\r\n//\r\n// Description : Array and textureless GLSL 2D/3D/4D simplex \r\n//               noise functions.\r\n//      Author : Ian McEwan, Ashima Arts.\r\n//  Maintainer : ijm\r\n//     Lastmod : 20110822 (ijm)\r\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r\n//               Distributed under the MIT License. See LICENSE file.\r\n//               https://github.com/ashima/webgl-noise\r\n// \r\n\r\nvec3 mod289(vec3 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x) {\r\n\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x) {\r\n\treturn mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r){\r\n\treturn 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nfloat snoise(vec3 v) { \r\n\r\n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n\t// First corner\r\n\tvec3 i  = floor(v + dot(v, C.yyy) );\r\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n\t// Other corners\r\n\tvec3 g = step(x0.yzx, x0.xyz);\r\n\tvec3 l = 1.0 - g;\r\n\tvec3 i1 = min( g.xyz, l.zxy );\r\n\tvec3 i2 = max( g.xyz, l.zxy );\r\n\r\n\t//   x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n\t//   x1 = x0 - i1  + 1.0 * C.xxx;\r\n\t//   x2 = x0 - i2  + 2.0 * C.xxx;\r\n\t//   x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n\tvec3 x1 = x0 - i1 + C.xxx;\r\n\tvec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n\tvec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n\t// Permutations\r\n\ti = mod289(i); \r\n\tvec4 p = permute( permute( permute( \r\n\t\t  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r\n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n\t// Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n\t// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n\tfloat n_ = 0.142857142857; // 1.0/7.0\r\n\tvec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r\n\r\n\tvec4 x_ = floor(j * ns.z);\r\n\tvec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n\tvec4 x = x_ *ns.x + ns.yyyy;\r\n\tvec4 y = y_ *ns.x + ns.yyyy;\r\n\tvec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n\tvec4 b0 = vec4( x.xy, y.xy );\r\n\tvec4 b1 = vec4( x.zw, y.zw );\r\n\r\n\t//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n\t//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\r\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\r\n\tvec4 sh = -step(h, vec4(0.0));\r\n\r\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n\tvec3 p0 = vec3(a0.xy,h.x);\r\n\tvec3 p1 = vec3(a0.zw,h.y);\r\n\tvec3 p2 = vec3(a1.xy,h.z);\r\n\tvec3 p3 = vec3(a1.zw,h.w);\r\n\r\n\t//Normalise gradients\r\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n\tp0 *= norm.x;\r\n\tp1 *= norm.y;\r\n\tp2 *= norm.z;\r\n\tp3 *= norm.w;\r\n\r\n\t// Mix final noise value\r\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n\tm = m * m;\r\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r\n\r\n}\r\n\r\nvec3 snoiseVec3( vec3 x ){\r\n\r\n\tfloat s  = snoise(vec3( x ));\r\n\tfloat s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\r\n\tfloat s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\r\n\tvec3 c = vec3( s , s1 , s2 );\r\n\treturn c;\r\n\r\n}\r\n\r\nvec3 curlNoise( vec3 p ){\r\n \r\n\tconst float e = .1;\r\n\tvec3 dx = vec3( e   , 0.0 , 0.0 );\r\n\tvec3 dy = vec3( 0.0 , e   , 0.0 );\r\n\tvec3 dz = vec3( 0.0 , 0.0 , e   );\r\n\r\n\tvec3 p_x0 = snoiseVec3( p - dx );\r\n\tvec3 p_x1 = snoiseVec3( p + dx );\r\n\tvec3 p_y0 = snoiseVec3( p - dy );\r\n\tvec3 p_y1 = snoiseVec3( p + dy );\r\n\tvec3 p_z0 = snoiseVec3( p - dz );\r\n\tvec3 p_z1 = snoiseVec3( p + dz );\r\n\r\n\tfloat x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\r\n\tfloat y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\r\n\tfloat z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\r\n\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( vec3( x , y , z ) * divisor );\r\n\r\n}\r\n\r\nvec3 curlNoise2( vec3 p ) {\r\n\r\n\tconst float e = .1;\r\n\r\n\tvec3 xNoisePotentialDerivatives = snoiseVec3( p );\r\n\tvec3 yNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 3., -3.,  1. ) );\r\n\tvec3 zNoisePotentialDerivatives = snoiseVec3( p + e * vec3( 2.,  4., -3. ) );\r\n\r\n\tvec3 noiseVelocity = vec3(\r\n\t\tzNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n\t\txNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n\t\tyNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n\t);\r\n\r\n\treturn normalize( noiseVelocity );\r\n\r\n}\r\n\r\nvec4 snoiseD(vec3 v) { //returns vec4(value, dx, dy, dz)\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n \r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n \r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n \r\n  vec3 x1 = x0 - i1 + C.xxx;\r\n  vec3 x2 = x0 - i2 + C.yyy;\r\n  vec3 x3 = x0 - D.yyy;\r\n \r\n  i = mod289(i);\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n \r\n  float n_ = 0.142857142857; // 1.0/7.0\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n \r\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r\n \r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );\r\n \r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n \r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n \r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n \r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n \r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n \r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n \r\n  vec4 values = vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ); //value of contributions from each corner (extrapolate the gradient)\r\n \r\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); //kernel function from each corner\r\n \r\n  vec4 m2 = m * m;\r\n  vec4 m3 = m * m * m;\r\n \r\n  vec4 temp = -6.0 * m2 * values;\r\n  float dx = temp[0] * x0.x + temp[1] * x1.x + temp[2] * x2.x + temp[3] * x3.x + m3[0] * p0.x + m3[1] * p1.x + m3[2] * p2.x + m3[3] * p3.x;\r\n  float dy = temp[0] * x0.y + temp[1] * x1.y + temp[2] * x2.y + temp[3] * x3.y + m3[0] * p0.y + m3[1] * p1.y + m3[2] * p2.y + m3[3] * p3.y;\r\n  float dz = temp[0] * x0.z + temp[1] * x1.z + temp[2] * x2.z + temp[3] * x3.z + m3[0] * p0.z + m3[1] * p1.z + m3[2] * p2.z + m3[3] * p3.z;\r\n \r\n  return vec4(dot(m3, values), dx, dy, dz) * 42.0;\r\n}\r\n\r\n\r\nvec3 curlNoise3 (vec3 p) {\r\n\r\n    vec3 xNoisePotentialDerivatives = snoiseD( p ).yzw; //yzw are the xyz derivatives\r\n    vec3 yNoisePotentialDerivatives = snoiseD(vec3( p.y - 19.1 , p.z + 33.4 , p.x + 47.2 )).zwy;\r\n    vec3 zNoisePotentialDerivatives = snoiseD(vec3( p.z + 74.2 , p.x - 124.5 , p.y + 99.4 )).wyz;\r\n    vec3 noiseVelocity = vec3(\r\n        zNoisePotentialDerivatives.y - yNoisePotentialDerivatives.z,\r\n        xNoisePotentialDerivatives.z - zNoisePotentialDerivatives.x,\r\n        yNoisePotentialDerivatives.x - xNoisePotentialDerivatives.y\r\n    );\r\n\t\r\n\tconst float e = .1;\r\n\tconst float divisor = 1.0 / ( 2.0 * e );\r\n\treturn normalize( noiseVelocity * divisor );\r\n\r\n}\r\n\t\r\n\t";
planes.IconGenerator.MAX = 10;
planes.rtt.RTTTexture.width = 512;
planes.rtt.RTTTexture.height = 1;
planes.rtt.RTTTexture.TYPE_0 = 0;
planes.rtt.RTTTexture.TYPE_1 = 1;
planes.rtt.RTTTexture.TYPE_2 = 2;
planes.rtt.RTTTexture.TYPE_3 = 3;
planes.rtt.RTTTextures.MAX = 20;
planes.rtt.RTTTextures._counter = 0;
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
Main.main();
})();
