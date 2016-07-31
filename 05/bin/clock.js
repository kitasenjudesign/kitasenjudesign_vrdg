(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BeyondCodeGeo = function() {
};
BeyondCodeGeo.getMesh = function(nn,font) {
	if(BeyondCodeGeo.mat == null) {
		BeyondCodeGeo.mat = new THREE.LineBasicMaterial({ color : 16777215});
		BeyondCodeGeo.mat.transparent = true;
	}
	var o = new THREE.Object3D();
	var geos = BeyondCodeGeo.getGeo(nn,font);
	var _g1 = 0;
	var _g = geos.length;
	while(_g1 < _g) {
		var i = _g1++;
		var line = new THREE.Line(geos[i],BeyondCodeGeo.mat);
		o.add(line);
	}
	return o;
};
BeyondCodeGeo.getGeo = function(nn,font) {
	if(BeyondCodeGeo._mojiGeo == null) BeyondCodeGeo._mojiGeo = new haxe.ds.StringMap();
	var name = font + "_" + nn;
	if(BeyondCodeGeo._mojiGeo.get(name) != null) return BeyondCodeGeo._mojiGeo.get(name);
	var value = BeyondCodeGeo._getGeo(nn,font);
	BeyondCodeGeo._mojiGeo.set(name,value);
	return BeyondCodeGeo._mojiGeo.get(name);
};
BeyondCodeGeo._getGeo = function(nn,font) {
	var geos = [];
	var strokes = typo.StrokeUtil.getStrokes(nn,0.65,font);
	var _g1 = 0;
	var _g = strokes.length;
	while(_g1 < _g) {
		var j = _g1++;
		var vv = strokes[j].getPoints();
		var g = new THREE.Geometry();
		var _g3 = 0;
		var _g2 = vv.length;
		while(_g3 < _g2) {
			var i = _g3++;
			g.vertices.push(new THREE.Vector3(vv[i].x * 2,-vv[i].y * 2,0));
		}
		g.vertices.push(new THREE.Vector3(vv[0].x * 2,-vv[0].y * 2,0));
		geos.push(g);
	}
	return geos;
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
var Main = function() {
	window.onload = $bind(this,this.initialize);
};
Main.main = function() {
	new Main();
};
Main.prototype = {
	initialize: function(e) {
		this._mainD = new MainDeDe();
		this._mainD.init();
	}
};
var MainDeDe = function() {
};
MainDeDe.prototype = {
	init: function() {
		typo.StrokeUtil.init();
		common.Dat.init($bind(this,this._onInit));
	}
	,_onInit: function() {
		this._renderer = new THREE.WebGLRenderer({ antialias : true, devicePixelRatio : 1});
		this._scene = new THREE.Scene();
		this._camera = new camera.DoubleCamera();
		this._camera.init(this._renderer.domElement);
		this._renderer.setSize(common.StageRef.get_stageWidth(),common.StageRef.get_stageHeight());
		this._renderer.domElement.id = "webgl";
		window.document.body.appendChild(this._renderer.domElement);
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this._init2));
		common.StageRef.setCenter();
		window.document.addEventListener("keydown",$bind(this,this._onKeyDown));
	}
	,_onKeyDown: function(e) {
		if(Std.parseInt(e.keyCode) == 79) this._camera.setCamType(0);
		if(Std.parseInt(e.keyCode) == 80) this._camera.setCamType(1);
	}
	,_init2: function() {
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
		this._points = new MyPointCloud();
		this._points.init();
		this._scene.add(this._points);
		this._lines = new dede.DeDeLines();
		this._lines.init();
		this._scene.add(this._lines);
		this._vrdg = new dede.VrdgLines();
		this._vrdg.init();
		this._scene.add(this._vrdg);
		this._cuts = new dede.DeDeCuts();
		this._cuts.init(this);
		this._run();
	}
	,_run: function() {
		this._audio.update();
		MyColor.update();
		this._points.update();
		this._cuts.update(this._audio);
		this._points.connectRandomLine();
		this._camera.update();
		this._renderer.render(this._scene,this._camera.getCamera());
		window.requestAnimationFrame($bind(this,this._run));
	}
	,_onResize: function(object) {
		this._camera.resize();
		this._renderer.setSize(common.StageRef.get_stageWidth(),common.StageRef.get_stageHeight());
	}
};
var IMap = function() { };
var MyColor = function() {
};
MyColor.update = function() {
	MyColor._rad += Math.PI / 500;
	MyColor.r = Math.floor(128 + 128 * Math.sin(MyColor._rad + 1.2));
	MyColor.g = Math.floor(128 + 128 * Math.sin(MyColor._rad * 1.1));
	MyColor.b = Math.floor(128 + 128 * Math.sin(MyColor._rad * 1.4 + 0.7));
};
MyColor.getColor = function() {
	var rgb = MyColor.r << 16 | MyColor.g << 8 | MyColor.b;
	return new THREE.Color(16777215);
};
var MyPointCloud = function() {
	this._isRandom = false;
	this._countL = 0;
	this._count = 0;
	THREE.Object3D.call(this);
};
MyPointCloud.__super__ = THREE.Object3D;
MyPointCloud.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		MyPointCloud.cloud = this;
		this._mat = new THREE.PointCloudMaterial({ color : 16777215, size : 15});
		this._mat.depthTest = false;
		var g1 = new THREE.Geometry();
		var _g = 0;
		while(_g < 15000) {
			var i = _g++;
			var v = new common.ExVector3(0,0,0);
			v.rIndex = Math.floor(i + 100 * Math.random()) % 15000;
			v.r = 1;
			v.z = 3000;
			g1.vertices.push(v);
		}
		var g2 = new THREE.Geometry();
		var _g1 = 0;
		var _g2 = 30000;
		while(_g1 < _g2) {
			var i1 = _g1++;
			g2.vertices.push(new THREE.Vector3());
		}
		this._count = -1;
		this._countL = -2;
		this._cloud = new THREE.PointCloud(g1,this._mat);
		this._cloud.renderOrder = 10;
		this.add(this._cloud);
		this._lineMat = new THREE.LineBasicMaterial({ color : 16777215, transparent : true, opacity : 0.7});
		this._line = new THREE.LineSegments(g2,this._lineMat);
		this._line.frustumCulled = false;
		this._cloud.renderOrder = 9;
		this._line.position.z = 0.5;
		this.add(this._line);
	}
	,getNextPoint: function() {
		this._count++;
		return this._cloud.geometry.vertices[this._count % 15000];
	}
	,getNextLine: function() {
		this._countL += 2;
		return [this._line.geometry.vertices[this._countL % 30000],this._line.geometry.vertices[(this._countL + 1) % 30000]];
	}
	,update: function() {
		this._mat.color = MyColor.getColor();
		this.reset();
	}
	,reset: function() {
		this._count = -1;
		this._countL = -2;
		this._cloud.geometry.verticesNeedUpdate = true;
		this._line.geometry.verticesNeedUpdate = true;
		var len1 = this._cloud.geometry.vertices.length;
		var len2 = this._line.geometry.vertices.length;
		var _g = 0;
		while(_g < len1) {
			var i = _g++;
			var v = this._cloud.geometry.vertices[i];
			v.z = 3000;
			v.enabled = false;
		}
		var _g1 = 0;
		while(_g1 < len2) {
			var i1 = _g1++;
			var v1 = this._line.geometry.vertices[i1];
			v1.z = 3000;
		}
	}
	,setRandom: function(b) {
		this._isRandom = b;
		if(this._isRandom) {
			this._lineMat.opacity = 0.6;
			this._lineMat.transparent = true;
		} else {
			this._lineMat.opacity = 1;
			this._lineMat.transparent = false;
		}
	}
	,connectRandomLine: function() {
		if(!this._isRandom) return;
		var len1 = this._cloud.geometry.vertices.length;
		var okDots = [];
		var _g = 0;
		while(_g < len1) {
			var i = _g++;
			var v = this._cloud.geometry.vertices[i];
			if(v.enabled) okDots.push(v);
		}
		var _g1 = 0;
		var _g2 = okDots.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			var lines = this.getNextLine();
			var vv = this._cloud.geometry.vertices[okDots[i1].rIndex];
			if(vv.enabled) {
				lines[0].copy(okDots[i1]);
				lines[1].copy(vv);
			} else {
				lines[0].copy(okDots[(i1 + 33) % okDots.length]);
				lines[1].copy(okDots[(i1 + 6555) % okDots.length]);
			}
		}
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
camera.DoubleCamera = function() {
	this._type = 0;
};
camera.DoubleCamera.prototype = {
	init: function(domElement) {
		this.oCamera = new camera.OCamera(-1920,1920,576,-576,0.1,1000);
		this.oCamera.init(domElement);
		this.oCamera.position.x = 0;
		this.oCamera.position.y = 0;
		this.oCamera.position.z = 800;
		this.pCamera = new camera.ExCamera(30,common.StageRef.get_stageWidth() / common.StageRef.get_stageHeight(),10,10000);
		this.pCamera.init(domElement);
		this.pCamera.amp = 800;
	}
	,setZoom: function(zz) {
		this.oCamera.setZoom(zz);
	}
	,getWidth: function() {
		return this.oCamera.getWidth();
	}
	,setCamType: function(typ) {
		this._type = typ;
	}
	,getCamType: function() {
		return this._type;
	}
	,update: function() {
		var _g = this._type;
		switch(_g) {
		case 0:
			break;
		case 1:
			this.pCamera.update();
			break;
		}
	}
	,getCamera: function() {
		if(this._type == 0) return this.oCamera; else return this.pCamera;
	}
	,resize: function() {
		if(this._type == 0) this.oCamera.setZoom(2); else this.pCamera.resize();
	}
};
camera.ExCamera = function(fov,aspect,near,far) {
	this.tgtOffsetY = 0;
	this.isActive = false;
	this.radY = 0;
	this.radX = 0;
	this.amp = 400.0;
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
		dom.ontouchstart = $bind(this,this.onMouseDown);
		dom.ontouchend = $bind(this,this.onMouseUp);
		dom.ontouchmove = $bind(this,this.onMouseMove);
		dom.onmousedown = $bind(this,this.onMouseDown);
		dom.onmouseup = $bind(this,this.onMouseUp);
		dom.onmousemove = $bind(this,this.onMouseMove);
		dom.addEventListener("mousewheel",$bind(this,this.onMouseWheel));
		window.addEventListener("DOMMouseScroll",$bind(this,this.onMouseWheelFF));
		this._dom = dom;
	}
	,_onResize: function() {
	}
	,onMouseWheelFF: function(e) {
		this.amp += e.detail;
		if(this.amp > 6000) this.amp = 6000;
		if(this.amp < 100) this.amp = 100;
	}
	,onMouseWheel: function(e) {
		this.amp += e.wheelDelta * 0.5;
		if(this.amp > 6000) this.amp = 6000;
		if(this.amp < 100) this.amp = 100;
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
});
camera.OCamera = function(left,right,top,bottom,near,far) {
	this._zoom = 0.999;
	THREE.OrthographicCamera.call(this,left,right,top,bottom,near,far);
};
camera.OCamera.__super__ = THREE.OrthographicCamera;
camera.OCamera.prototype = $extend(THREE.OrthographicCamera.prototype,{
	init: function(dom) {
		common.Dat.gui.add(this,"_zoom").listen();
		dom.addEventListener("mousewheel",$bind(this,this._onMouseWheel));
	}
	,_onMouseWheel: function(e) {
		var tgt = this._zoom + e.wheelDelta * 0.01;
		if(tgt < 0.2) tgt = 0.2;
		if(tgt > 50) tgt = 50;
		this.setZoom(tgt);
	}
	,setZoom: function(zz) {
		this._zoom = zz;
		this.setWidth();
	}
	,getWidth: function() {
		return common.StageRef.get_stageWidth() / this._zoom;
	}
	,setWidth: function() {
		var aspect = common.StageRef.get_stageWidth() / common.StageRef.get_stageHeight();
		var ww = this.getWidth();
		var hh = ww / aspect;
		this.left = -ww / 2;
		this.right = ww / 2;
		this.top = hh / 2;
		this.bottom = -hh / 2;
		this.updateProjectionMatrix();
	}
});
var clock = {};
clock.DotDigit = function() {
	this._font = 0;
	this._moji = "";
	this._numDots = 0;
	this._space = 10;
	this.power = 0;
	this._renzoku = false;
	this._random = false;
	this._isLine = true;
	this._sec = 0;
	this._vertexCounter = 0;
	this._speed = 0.001;
	this._counter = 100;
	this.hq = false;
	this._rotSpeed = 0.002;
	this._vz = 0;
	this._vy = 0;
	this._vx = 0;
	this._geoMax = 100;
	THREE.Object3D.call(this);
};
clock.DotDigit.__super__ = THREE.Object3D;
clock.DotDigit.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
	}
	,setGeoMax: function(num) {
		this._geoMax = num;
		this._factory = [];
		var _g1 = 0;
		var _g = this._geoMax;
		while(_g1 < _g) {
			var i = _g1++;
			var v = MyPointCloud.cloud.getNextPoint();
			v.enabled = false;
			this._factory.push(v);
		}
	}
	,setStrokes: function(str,scale,space,font) {
		this._space = space;
		this._strokes = typo.StrokeUtil.getStrokes(str,scale,font);
		this._dots = [];
		this._numDots = 0;
		var _g1 = 0;
		var _g = this._strokes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var n = this._strokes[i].getNum(this._space);
			this._dots[i] = [];
			var _g2 = 0;
			while(_g2 < n) {
				var j = _g2++;
				var v = this._factory[this._numDots % this._factory.length];
				v.sr = j / n;
				v.r = this._counter;
				v.enabled = false;
				this._numDots++;
				this._dots[i].push(v);
			}
		}
		if(this._numDots >= this._geoMax) console.log("====koeteru==== ");
		if(this._moji != str || font != this._font) {
			if(this._outline != null) this.remove(this._outline);
			this._outline = BeyondCodeGeo.getMesh(str,font);
			this._outline.position.z = -1;
			this.add(this._outline);
		}
		this._font = font;
		this._moji = str;
		this.update(2);
	}
	,setType: function(tp) {
		switch(tp) {
		case 0:
			this._isLine = false;
			this._renzoku = false;
			this._random = false;
			break;
		case 1:
			this._isLine = false;
			this._renzoku = true;
			this._random = false;
			break;
		case 2:
			this._isLine = true;
			this._renzoku = false;
			this._random = false;
			break;
		case 3:
			this._isLine = true;
			this._renzoku = true;
			this._random = false;
			break;
		case 4:
			this._isLine = false;
			this._renzoku = false;
			this._random = true;
			break;
		case 5:
			this._isLine = false;
			this._renzoku = true;
			this._random = true;
			break;
		}
	}
	,setSpeed: function(spd) {
		this._rotSpeed = spd;
	}
	,setSec: function(rr,boost) {
		this._sec = rr % 1;
		if(boost) this._counter += this._rotSpeed * 80;
		this._vx += 20 * (Math.random() - 0.5);
		this._vy += 20 * (Math.random() - 0.5);
		this._vz += 20 * (Math.random() - 0.5);
	}
	,addSec: function(rr,boost) {
		this._sec += rr;
		this._sec = Math.abs(this._sec) % 1;
		if(boost) this._counter += this._rotSpeed * 160;
		this._vx += 20 * (Math.random() - 0.5);
		this._vy += 20 * (Math.random() - 0.5);
		this._vz += 20 * (Math.random() - 0.5);
	}
	,update: function(speed) {
		this._vx *= 0.93;
		this._vy *= 0.93;
		this._vz *= 0.93;
		var rr = this._sec * 2;
		if(rr > 1) {
			rr = 1 - rr / 2;
			this._speed = -0.001;
		} else {
			rr = rr / 2;
			this._speed = 0.001;
		}
		this._counter += this._rotSpeed;
		var _g1 = 0;
		var _g = this._strokes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var s = this._strokes[i];
			var dots = this._dots[i];
			var cnt = 0;
			var _g3 = 0;
			var _g2 = dots.length;
			while(_g3 < _g2) {
				var j = _g3++;
				var dotLen = 0;
				var maxNum = 0;
				dotLen = Math.floor(dots.length * rr);
				maxNum = Math.floor(dots.length);
				var mm = dots[j];
				var ratio = 0;
				if(j < dotLen && dotLen != 0) {
					var nn;
					if(this._renzoku) nn = maxNum; else nn = dotLen;
					ratio = j / nn + rr + this._counter;
					mm.enabled = true;
				} else {
					ratio = 1 + rr + this._counter;
					if(this._renzoku) ratio = rr + this._counter;
					if(cnt++ < 2) mm.enabled = true; else mm.enabled = false;
				}
				var spd2;
				if(speed == 1) spd2 = 1; else spd2 = speed * 3;
				mm.r += (ratio - mm.r) / spd2;
				var pp;
				if(this.hq) pp = s.getPosition(mm.r % 1); else pp = s.getPositionHS(mm.r % 1);
				var v = new THREE.Vector3(pp.x * 2,-pp.y * 2,0);
				var tx = v.x + this.position.x + this.parent.position.x;
				var ty = v.y + this.position.y + this.parent.position.y;
				mm.x = tx;
				mm.y = ty;
				mm.z = v.z;
			}
		}
		if(this._isLine) clock.DotDigitLine.update(this._dots); else if(this._random) clock.DotDigitLine.update(this._dots,true);
	}
	,reset: function() {
		var _g1 = 0;
		var _g = this._dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0;
			var _g2 = this._dots[i].length;
			while(_g3 < _g2) {
				var j = _g3++;
				this._dots[i][j].z = 3000;
				this._dots[i][j].enabled = false;
			}
		}
	}
	,setVisible: function(b) {
		this.visible = b;
	}
	,getSec: function() {
		return this._sec;
	}
	,getMoji: function() {
		return this._moji;
	}
});
clock.DotDigitLine = function() {
	THREE.Object3D.call(this);
};
clock.DotDigitLine.update = function(dts,isRandom) {
	if(isRandom == null) isRandom = false;
	var _g1 = 0;
	var _g = dts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var okDots = [];
		var dots = dts[i];
		var _g3 = 0;
		var _g2 = dots.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(dots[j].enabled) okDots.push(dots[j]);
		}
		if(okDots.length > 0) {
			var _g31 = 0;
			var _g21 = okDots.length;
			while(_g31 < _g21) {
				var j1 = _g31++;
				var v = MyPointCloud.cloud.getNextLine();
				if(!isRandom) {
					v[0].copy(okDots[j1]);
					v[0].z = 0;
					v[1].copy(okDots[(j1 + 1) % okDots.length]);
					v[1].z = 0;
				} else {
					v[0].copy(okDots[j1]);
					v[0].z = 0;
					v[1].copy(okDots[okDots[j1].rIndex % okDots.length]);
					v[1].z = 0;
				}
			}
		}
	}
};
clock.DotDigitLine.__super__ = THREE.Object3D;
clock.DotDigitLine.prototype = $extend(THREE.Object3D.prototype,{
});
var common = {};
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
		if(this._callback != null) this._callback();
	}
};
common.Dat = function() {
};
common.Dat.init = function(callback) {
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
		window.location.href = "../../01/bin/";
		break;
	case 50:
		window.location.href = "../../02/bin/";
		break;
	case 51:
		window.location.href = "../../03/bin/";
		break;
	case 52:
		window.location.href = "../../04/bin/";
		break;
	case 53:
		window.location.href = "../../05/bin/";
		break;
	case 54:
		window.location.href = "../../06/bin/";
		break;
	}
};
common.Dat.show = function() {
	common.Dat.gui.domElement.style.display = "block";
};
common.Dat.hide = function() {
	common.Dat.gui.domElement.style.display = "none";
};
common.ExVector3 = function(xx,yy,zz) {
	this.rIndex = 0;
	this.pos = 0;
	this.sr = 0;
	this.r = 0;
	this.enabled = true;
	THREE.Vector3.call(this,xx,yy,zz);
};
common.ExVector3.__super__ = THREE.Vector3;
common.ExVector3.prototype = $extend(THREE.Vector3.prototype,{
});
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
		this._dispatch(n);
	}
	,_dispatch: function(n) {
		if(!common.Dat.bg) this._socket.send(n);
		this.dispatchEvent({ type : "keydown", keyCode : n});
	}
});
common.StageRef = function() {
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
var dede = {};
dede.DeDeCuts = function() {
	this._cutIndex = 0;
};
dede.DeDeCuts.prototype = {
	init: function(main) {
		this._cut0 = new dede.cuts.DeDeCut0();
		this._cut1 = new dede.cuts.DeDeCut1();
		this._cut2 = new dede.cuts.DeDeCut2();
		this._cut0.init(main);
		this._cut1.init(main);
		this._cut2.init(main);
		this._cutIndex = 0;
		this._cuts = [this._cut0,this._cut1,this._cut2];
		this._currentCut = this._cut0;
		this._cut0.start();
		common.Key.board.addEventListener("keydown",$bind(this,this._onKeyDown));
	}
	,_onKeyDown: function(e) {
		Tracer.log("_onKeyDown");
		if(Std.parseInt(e.keyCode) == 67) {
			this._cutIndex++;
			this._currentCut = this._cuts[this._cutIndex % this._cuts.length];
			this._currentCut.start();
		}
		if(Std.parseInt(e.keyCode) == 39) this._currentCut.next();
		if(Std.parseInt(e.keyCode) == 38) {
		}
		if(Std.parseInt(e.keyCode) == 40) {
		}
	}
	,update: function(audio) {
		if(this._currentCut != null) this._currentCut.update(audio);
	}
};
dede.DeDeDigit = function() {
	this.isRotate = false;
	this._moji = "";
	this._numDots = 0;
	this._space = 10;
	this.power = 0;
	this._renzoku = false;
	this._random = false;
	this._isLine = true;
	this._sec = 0;
	this._vertexCounter = 0;
	this._speed = 0.001;
	this._counter = 100;
	this.hq = false;
	this._rotSpeed = 0.002;
	this._vz = 0;
	this._vy = 0;
	this._vx = 0;
	this._geoMax = 100;
	THREE.Object3D.call(this);
};
dede.DeDeDigit.__super__ = THREE.Object3D;
dede.DeDeDigit.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
	}
	,setGeoMax: function(num) {
		this._geoMax = num;
		this._factory = [];
		var _g1 = 0;
		var _g = this._geoMax;
		while(_g1 < _g) {
			var i = _g1++;
			var v = MyPointCloud.cloud.getNextPoint();
			v.enabled = false;
			this._factory.push(v);
		}
	}
	,setStrokes: function(str,scale,space,font) {
		this._font = font;
		this._space = space;
		this._strokes = typo.StrokeUtil.getStrokes(str,scale,font);
		this._dots = [];
		this._numDots = 0;
		var _g1 = 0;
		var _g = this._strokes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var n = this._strokes[i].getNum(this._space);
			this._dots[i] = [];
			var _g2 = 0;
			while(_g2 < n) {
				var j = _g2++;
				var v = this._factory[this._numDots % this._factory.length];
				v.sr = j / n;
				v.r = this._counter;
				v.enabled = false;
				this._numDots++;
				this._dots[i].push(v);
			}
		}
		if(this._numDots >= this._geoMax) console.log("====koeteru==== ");
		if(this.outline != null) this.remove(this.outline);
		this.outline = BeyondCodeGeo.getMesh(str,this._font);
		this.outline.position.z = 0;
		this.add(this.outline);
		this._moji = str;
		this.update(2);
	}
	,setType: function(tp,isRot) {
		this.isRotate = isRot;
		switch(tp) {
		case 0:
			this._isLine = false;
			this._renzoku = false;
			this._random = false;
			break;
		case 1:
			this._isLine = false;
			this._renzoku = true;
			this._random = false;
			break;
		case 2:
			this._isLine = true;
			this._renzoku = false;
			this._random = false;
			break;
		case 3:
			this._isLine = true;
			this._renzoku = true;
			this._random = false;
			break;
		case 4:
			this._isLine = false;
			this._renzoku = false;
			this._random = true;
			break;
		case 5:
			this._isLine = false;
			this._renzoku = true;
			this._random = true;
			break;
		}
	}
	,setSpeed: function(spd) {
		this._rotSpeed = spd;
	}
	,setSec: function(rr) {
		this._sec = rr % 1;
	}
	,addSec: function(rr,boost) {
		this._sec += rr;
		this._sec = Math.abs(this._sec) % 1;
		if(boost) this._counter += this._rotSpeed * 140;
		this._vx += Math.random() - 0.5;
		this._vy += Math.random() - 0.5;
		this._vz += Math.random() - 0.5;
	}
	,update: function(speed) {
		if(this.isRotate) {
			this.rotation.x += this._vx;
			this.rotation.y += this._vy;
			this.rotation.z += this._vz;
			this.rotation.x = this.rotation.x % (Math.PI * 2);
			this.rotation.y = this.rotation.y % (Math.PI * 2);
			this.rotation.z = this.rotation.z % (Math.PI * 2);
			this._vx *= 0.93;
			this._vy *= 0.93;
			this._vz *= 0.93;
		} else {
			this.rotation.x += (0 - this.rotation.x) / 14;
			this.rotation.y += (0 - this.rotation.y) / 14;
			this.rotation.z += (0 - this.rotation.z) / 14;
		}
		var rr = this._sec * 2;
		if(rr > 1) {
			rr = 1 - rr / 2;
			this._speed = -0.001;
		} else {
			rr = rr / 2;
			this._speed = 0.001;
		}
		this._counter += this._rotSpeed;
		var _g1 = 0;
		var _g = this._strokes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var s = this._strokes[i];
			var dots = this._dots[i];
			var cnt = 0;
			var _g3 = 0;
			var _g2 = dots.length;
			while(_g3 < _g2) {
				var j = _g3++;
				var dotLen = 0;
				var maxNum = 0;
				dotLen = Math.floor(dots.length * rr);
				maxNum = Math.floor(dots.length);
				var mm = dots[j];
				var ratio = 0;
				if(j < dotLen && dotLen != 0) {
					var nn;
					if(this._renzoku) nn = maxNum; else nn = dotLen;
					ratio = j / nn + rr + this._counter;
					mm.enabled = true;
				} else {
					ratio = 1 + rr + this._counter;
					if(this._renzoku) ratio = rr + this._counter;
					if(cnt++ < 2) mm.enabled = true; else mm.enabled = false;
				}
				var spd2;
				if(speed == 1) spd2 = 1; else spd2 = speed * 3;
				mm.r += (ratio - mm.r) / spd2;
				var pp;
				if(this.hq) pp = s.getPosition(mm.r % 1); else pp = s.getPositionHS(mm.r % 1);
				var v = new THREE.Vector3(pp.x * 2,-pp.y * 2,0);
				var isMtx = false;
				if(isMtx) {
					var gp = this.localToWorld(v);
					mm.x = gp.x;
					mm.y = gp.y;
					mm.z = gp.z;
				} else {
					v.applyQuaternion(this.quaternion);
					var tx = v.x + this.position.x + this.parent.position.x;
					var ty = v.y + this.position.y + this.parent.position.y;
					mm.x = tx;
					mm.y = ty;
					mm.z = v.z;
				}
			}
		}
		if(this._isLine) dede.DeDeDigitLine.update(this._dots); else if(this._random) dede.DeDeDigitLine.update(this._dots,true);
	}
	,reset: function() {
		var _g1 = 0;
		var _g = this._dots.length;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0;
			var _g2 = this._dots[i].length;
			while(_g3 < _g2) {
				var j = _g3++;
				this._dots[i][j].z = 3000;
				this._dots[i][j].enabled = false;
			}
		}
	}
	,setVisible: function(b) {
		this.visible = b;
	}
	,getSec: function() {
		return this._sec;
	}
	,getMoji: function() {
		return this._moji;
	}
});
dede.DeDeDigitLine = function() { };
dede.DeDeDigitLine.update = function(dts,isRandom) {
	if(isRandom == null) isRandom = false;
	var _g1 = 0;
	var _g = dts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var okDots = [];
		var dots = dts[i];
		var _g3 = 0;
		var _g2 = dots.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(dots[j].enabled) okDots.push(dots[j]);
		}
		if(okDots.length > 0) {
			var _g31 = 0;
			var _g21 = okDots.length;
			while(_g31 < _g21) {
				var j1 = _g31++;
				var v = MyPointCloud.cloud.getNextLine();
				if(!isRandom) {
					v[0].copy(okDots[j1]);
					v[1].copy(okDots[(j1 + 1) % okDots.length]);
				} else {
					v[0].copy(okDots[j1]);
					v[1].copy(okDots[okDots[j1].rIndex % okDots.length]);
				}
			}
		}
	}
};
dede.DeDeLine = function() {
	this._speedX = -2;
	this._sec = 0;
	this._textIndex = 0;
	this._font = 0;
	this._width = 0;
	this._spaceX = 50;
	THREE.Object3D.call(this);
};
dede.DeDeLine.__super__ = THREE.Object3D;
dede.DeDeLine.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._digits = [];
		var num = 20;
		this._width = 2400;
		var _g = 0;
		while(_g < num) {
			var i = _g++;
			var digit = new dede.DeDeDigit();
			this.add(digit);
			digit.position.x = this._spaceX * i - this._spaceX * (num - 1) / 2;
			digit.init();
			digit.setGeoMax(240);
			this._digits.push(digit);
		}
		this.reset("A",0,false,0,2 + 2 * Math.random(),3 + 18 * Math.random(),this._spaceX);
	}
	,resetGeoMax: function(n) {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].setGeoMax(n);
		}
	}
	,reset: function(txt,type,isRotate,font,speed,space,spaceX) {
		this._spaceX = spaceX;
		this._speed = speed;
		this._space = space;
		this._font = font;
		this._text = txt;
		this._textIndex = 0;
		var ox = -this._width / 2;
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			var t = this._getNextText();
			var ww = typo.StrokeUtil.getWidth(t,font) * 1.3;
			this._digits[i].position.x = ox + ww / 2;
			this._digits[i].setStrokes(t,0.65,this._space,this._font);
			this._digits[i].reset();
			this._digits[i].setType(type,isRotate);
			this._digits[i].update(2);
			ox += ww + this._spaceX;
		}
		this._updateLimit();
	}
	,setDotType: function(type,isRotate) {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].setType(type,isRotate);
		}
	}
	,setSec: function(r) {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].setSec(r);
		}
	}
	,setRandomSec: function() {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].setSec(Math.random());
		}
	}
	,addSec: function(dx,boost) {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].addSec(dx,boost);
		}
	}
	,setSpeedX: function(spdX) {
		this._speedX = spdX;
	}
	,update: function(audio) {
		if(!this.visible) return;
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].position.x += this._speedX;
			this._digits[i].update(4);
		}
		this._updateLimit();
	}
	,showOutline: function() {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._digits[i].outline != null) this._digits[i].outline.visible = true;
		}
	}
	,hideOutline: function() {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._digits[i].outline != null) this._digits[i].outline.visible = false;
		}
	}
	,_updateLimit: function() {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._digits[i].position.x < -this._width / 2) {
				var idx = this._getMaxPosIndex();
				this._digits[i].setStrokes(this._getNextText(),0.65,this._space,this._font);
				var ww = typo.StrokeUtil.getWidth(this._digits[idx].getMoji(),this._font);
				var pos = this._digits[idx].position.x + ww * 1.3 / 2 + this._spaceX;
				var ww2 = typo.StrokeUtil.getWidth(this._digits[i].getMoji(),this._font);
				this._digits[i].position.x = pos + ww2 * 1.3 / 2;
			}
		}
	}
	,_getMaxPosIndex: function() {
		var mm = -99999999;
		var idx = 0;
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._digits[i].position.x > mm) {
				mm = this._digits[i].position.x;
				idx = i;
			}
		}
		return idx;
	}
	,_getNextText: function() {
		var out = HxOverrides.substr(this._text,this._textIndex % this._text.length,1);
		this._textIndex++;
		return out;
	}
});
dede.DeDeLines = function() {
	this._colRatio = 0;
	this._counter = 0;
	this._sec = 0.001;
	THREE.Object3D.call(this);
};
dede.DeDeLines.__super__ = THREE.Object3D;
dede.DeDeLines.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._lines = [];
		var oy = -150;
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			var line = new dede.DeDeLine();
			line.init();
			line.position.y = i * 150 + oy;
			this.add(line);
			this._lines.push(line);
		}
	}
	,countUp: function() {
		this._sec += 0.0333333333333333329;
		this._sec = this._sec % 1;
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			var line = this._lines[i];
			line.addSec(0.0333333333333333329,true);
		}
		this._flash();
	}
	,_changeType: function() {
		this._sec = Math.random();
		var data = dede.cuts.DeDeString.getData();
		var txt = data.text;
		var font = data.font;
		var spaceX = data.spaceX;
		var isAllSame;
		if(Math.random() < 0.5) isAllSame = true; else isAllSame = false;
		var isRandomLine;
		if(Math.random() < 0.2) isRandomLine = true; else isRandomLine = false;
		var isRotate;
		if(Math.random() < 0.2) isRotate = true; else isRotate = false;
		if(isRandomLine) if(Math.random() < 0.7) isRotate = true; else isRotate = false;
		var isRandomStartSec;
		if(Math.random() < 0.5) isRandomStartSec = true; else isRandomStartSec = false;
		var startSec = Math.random();
		MyPointCloud.cloud.setRandom(isRandomLine);
		var speed = 2 + 2 * Math.random();
		var space = 3 + 7 * Math.random();
		if(isAllSame) {
			var _g1 = 0;
			var _g = this._lines.length;
			while(_g1 < _g) {
				var i = _g1++;
				var line = this._lines[i];
				var type = Math.floor(Math.random() * 6);
				if(isRandomLine) type = Math.floor(Math.random() * 2);
				line.reset(txt,type,isRotate,font,speed,space,spaceX);
				line.setSec(startSec);
			}
		} else {
			var type1 = Math.floor(Math.random() * 6);
			if(isRandomLine) type1 = Math.floor(Math.random() * 2);
			var _g11 = 0;
			var _g2 = this._lines.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var line1 = this._lines[i1];
				line1.reset(txt,type1,isRotate,font,speed,space,spaceX);
				var startSec1 = Math.random();
				if(isRandomStartSec) line1.setRandomSec(); else line1.setSec(startSec1);
			}
		}
	}
	,_flash: function() {
		this.showOutline();
		this._colRatio = 1;
		if(this._twn != null) this._twn.kill();
		this.showOutline();
		BeyondCodeGeo.mat.opacity = 1;
		this._twn = TweenMax.to(BeyondCodeGeo.mat,0.9,{ opacity : 0, onComplete : $bind(this,this.hideOutline)});
	}
	,setGeoMax: function(n,enables) {
		var ok = false;
		if(enables == null) ok = true;
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(ok || enables[i]) {
				this._lines[i].resetGeoMax(n);
				this._lines[i].visible = true;
			} else {
				this._lines[i].resetGeoMax(1);
				this._lines[i].visible = false;
			}
		}
	}
	,setSpeedX: function(spdX) {
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._lines[i].setSpeedX(spdX);
		}
	}
	,showOutline: function() {
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			var line = this._lines[i];
			line.showOutline();
		}
	}
	,hideOutline: function() {
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			var line = this._lines[i];
			line.hideOutline();
		}
	}
	,_onFlash: function() {
		var lineMat = BeyondCodeGeo.mat;
		if(lineMat != null) lineMat.color.setHSL(0,0,this._colRatio);
	}
	,next: function() {
		this._changeType();
	}
	,update: function(audio) {
		if(!this.visible) return;
		this._counter++;
		if(this._counter % 60 == 0) this.countUp();
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._lines[i].update(audio);
		}
	}
});
dede.VrdgLine = function() {
	this._counter = 0;
	dede.DeDeLine.call(this);
};
dede.VrdgLine.__super__ = dede.DeDeLine;
dede.VrdgLine.prototype = $extend(dede.DeDeLine.prototype,{
	init: function() {
		this._digits = [];
		var space = 3;
		var nn = "vrdgh";
		var pos = [new THREE.Vector2(-145,0),new THREE.Vector2(-50,0),new THREE.Vector2(41.5,0),new THREE.Vector2(137,0),new THREE.Vector2(168,32)];
		var _g1 = 0;
		var _g = nn.length;
		while(_g1 < _g) {
			var i = _g1++;
			var digit = new dede.DeDeDigit();
			this.add(digit);
			digit.position.x = pos[i].x;
			digit.position.y = pos[i].y;
			digit.init();
			digit.setGeoMax(240);
			var ss = 0.65;
			digit.setStrokes(HxOverrides.substr(nn,i,1),ss,space,0);
			this._digits.push(digit);
		}
		this.reset("VRDGTH",Math.floor(Math.random() * 4),false,0,0,0,50);
	}
	,reset: function(txt,type,isRotate,font,speed,space,spaceX) {
		this._speed = 2 + 2 * Math.random();
		this._space = 3 + 18 * Math.random();
		this._spaceX = spaceX;
		this.setDotType(type,isRotate);
		var ox = -this._width / 2;
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].reset();
			this._digits[i].update(2);
		}
	}
	,update: function(audio) {
		var _g1 = 0;
		var _g = this._digits.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._digits[i].update(4);
		}
	}
});
dede.VrdgLines = function() {
	dede.DeDeLines.call(this);
};
dede.VrdgLines.__super__ = dede.DeDeLines;
dede.VrdgLines.prototype = $extend(dede.DeDeLines.prototype,{
	init: function() {
		this._lines = [];
		this._vrdg = new dede.VrdgLine();
		this._vrdg.init();
		this.add(this._vrdg);
		this._lines.push(this._vrdg);
		common.Dat.gui.add(this,"_sec").listen();
	}
	,update: function(audio) {
		if(!this.visible) return;
		this._counter++;
		if(this._counter % 60 == 0) this.countUp();
		if(this._counter % 600 == 0) this.next();
		var _g1 = 0;
		var _g = this._lines.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._lines[i].update(audio);
		}
	}
});
dede.cuts = {};
dede.cuts.DeDeCutBase = function() {
};
dede.cuts.DeDeCutBase.prototype = {
	init: function(main) {
		this._cam = main._camera;
		this._lines = main._lines;
		this._vrdg = main._vrdg;
		this._scene = main._scene;
	}
	,start: function() {
	}
	,countUp: function() {
	}
	,coundDown: function() {
	}
	,next: function() {
	}
	,update: function(audio) {
	}
};
dede.cuts.DeDeCut0 = function() {
	dede.cuts.DeDeCutBase.call(this);
};
dede.cuts.DeDeCut0.__super__ = dede.cuts.DeDeCutBase;
dede.cuts.DeDeCut0.prototype = $extend(dede.cuts.DeDeCutBase.prototype,{
	start: function() {
		this._lines.visible = false;
		this._lines.setGeoMax(1);
		this._vrdg.visible = true;
		this._vrdg.setGeoMax(300);
	}
	,next: function() {
		Tracer.log("next");
		this._vrdg.next();
	}
	,update: function(audio) {
		this._vrdg.update(audio);
	}
});
dede.cuts.DeDeCut1 = function() {
	dede.cuts.DeDeCutBase.call(this);
};
dede.cuts.DeDeCut1.__super__ = dede.cuts.DeDeCutBase;
dede.cuts.DeDeCut1.prototype = $extend(dede.cuts.DeDeCutBase.prototype,{
	start: function() {
		this._lines.visible = true;
		this._lines.setGeoMax(300,[false,true,false]);
		this._lines.setSpeedX(-0.5);
		this._vrdg.visible = false;
		this._vrdg.setGeoMax(1);
		this._cam.setZoom(2);
	}
	,next: function() {
		this._lines.next();
	}
	,update: function(audio) {
		this._lines.update(audio);
	}
});
dede.cuts.DeDeCut2 = function() {
	dede.cuts.DeDeCutBase.call(this);
};
dede.cuts.DeDeCut2.__super__ = dede.cuts.DeDeCutBase;
dede.cuts.DeDeCut2.prototype = $extend(dede.cuts.DeDeCutBase.prototype,{
	start: function() {
		this._lines.visible = true;
		this._lines.setGeoMax(150,[true,true,true]);
		this._lines.setSpeedX(-2);
		this._vrdg.visible = false;
		this._vrdg.setGeoMax(1);
		this._cam.setZoom(0.7);
	}
	,next: function() {
		this._lines.next();
	}
	,update: function(audio) {
		this._lines.update(audio);
	}
});
dede.cuts.DeDeString = function(o) {
	this.spaceX = 0;
	this.font = 0;
	this.text = "";
	this.text = o.text;
	this.font = o.font;
	this.spaceX = o.spaceX;
};
dede.cuts.DeDeString.getData = function() {
	var data = new dede.cuts.DeDeString(dede.cuts.DeDeString.texts[Math.floor(Math.random() * dede.cuts.DeDeString.texts.length)]);
	return data;
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
haxe.io = {};
haxe.io.Eof = function() { };
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var js = {};
js.Browser = function() { };
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
net.badimon.five3D.typography.Typography3D.prototype = {
	getMotif: function($char) {
		return this.motifs.get($char);
	}
	,getWidth: function($char) {
		return this.widths.get($char);
	}
	,getHeight: function($char) {
		return this.height;
	}
};
net.badimon.five3D.typography.FuturaHeavy = function() {
	net.badimon.five3D.typography.Typography3D.call(this);
	this.initializeMotifs();
	this.initializeWidths();
	this.height = 130;
};
net.badimon.five3D.typography.FuturaHeavy.__super__ = net.badimon.five3D.typography.Typography3D;
net.badimon.five3D.typography.FuturaHeavy.prototype = $extend(net.badimon.five3D.typography.Typography3D.prototype,{
	initializeMotifs: function() {
		this.motifs.set(" ",[]);
		this.motifs.set("!",[["M",[16.2,87.9]],["C",[12.4,88,9.9,90.5]],["C",[7.4,92.9,7.3,96.7]],["C",[7.4,100.5,9.9,103]],["C",[12.4,105.6,16.2,105.7]],["C",[20,105.6,22.5,103]],["C",[25,100.5,25.1,96.7]],["C",[25,92.9,22.5,90.5]],["C",[20,88,16.2,87.9]],["M",[9.1,82]],["L",[23.3,82]],["L",[23.3,28.3]],["L",[9.1,28.3]],["L",[9.1,82]]]);
		this.motifs.set("\"",[["M",[8.8,28.3]],["C",[9.7,44.7,10.6,61.1]],["L",[19,61.1]],["C",[19.9,44.7,20.8,28.3]],["L",[8.8,28.3]],["M",[28,28.3]],["C",[28.9,44.7,29.8,61.1]],["L",[38.2,61.1]],["C",[39.1,44.7,40,28.3]],["L",[28,28.3]]]);
		this.motifs.set("#",[["M",[21.1,31.1]],["L",[17.2,51.4]],["L",[5.5,51.4]],["L",[5.5,62.7]],["L",[15.1,62.7]],["L",[12.7,75.1]],["L",[1.4,75.1]],["L",[1.4,86.4]],["L",[10.5,86.4]],["C",[8.9,95,7.2,103.7]],["L",[17.8,103.7]],["C",[19.5,95,21.1,86.4]],["L",[31.2,86.4]],["C",[29.5,95,27.9,103.7]],["L",[38.5,103.7]],["C",[40.1,95,41.8,86.4]],["L",[53.6,86.4]],["L",[53.6,75.1]],["L",[44.2,75.1]],["C",[45.4,68.9,46.6,62.7]],["L",[56.4,62.7]],["L",[56.4,51.4]],["L",[48.4,51.4]],["L",[52.3,31.1]],["L",[41.8,31.1]],["L",[37.9,51.4]],["L",[27.8,51.4]],["L",[31.7,31.1]],["L",[21.1,31.1]],["M",[25.7,62.7]],["L",[36.1,62.7]],["C",[34.8,68.9,33.5,75.1]],["L",[23.3,75.1]],["C",[24.5,68.9,25.7,62.7]]]);
		this.motifs.set("$",[["M",[26.8,113.7]],["L",[34.1,113.7]],["L",[34.1,103.7]],["C",[39.9,102.5,43.9,99.1]],["C",[48,95.8,50.1,90.9]],["C",[52.3,85.9,52.3,80.2]],["C",[52.2,74.3,50.2,70.4]],["C",[48.1,66.6,44.9,64.1]],["C",[41.7,61.6,38,59.9]],["C",[34.4,58.2,31.2,56.7]],["C",[27.9,55.1,25.8,53.2]],["C",[23.7,51.2,23.7,48.2]],["C",[23.8,44.7,26.3,42.5]],["C",[28.8,40.3,32.2,40.3]],["C",[35.6,40.3,38.4,42.1]],["C",[41.3,43.7,43.3,46.4]],["C",[46.6,41.7,50,36.9]],["C",[46.8,33,43,31]],["C",[39.1,28.9,34.1,28.3]],["L",[34.1,18.9]],["L",[26.8,18.9]],["L",[26.8,28.2]],["C",[18.6,29.8,14.1,35.4]],["C",[9.6,41.1,9.6,49.5]],["C",[9.6,55.2,11.7,58.8]],["C",[13.7,62.5,16.9,64.9]],["C",[20.2,67.1,23.8,68.8]],["C",[27.4,70.5,30.6,72]],["C",[33.8,73.6,35.9,75.8]],["C",[37.9,78,38,81.4]],["C",[37.9,85.7,35.4,88.6]],["C",[32.7,91.4,28.3,91.5]],["C",[25,91.5,22.3,90]],["C",[19.7,88.4,17.7,86]],["C",[15.7,83.6,14.3,80.8]],["L",[5.4,89.4]],["C",[9,96.3,14,99.8]],["C",[19,103.4,26.8,104.2]],["L",[26.8,113.7]]]);
		this.motifs.set("%",[["M",[18.4,26.3]],["C",[13.2,26.4,9.2,28.7]],["C",[5.2,31,2.9,35]],["C",[0.5,39,0.5,44.2]],["C",[0.5,49.4,2.8,53.4]],["C",[5.2,57.4,9.2,59.6]],["C",[13.2,61.9,18.4,62]],["C",[23.6,61.9,27.6,59.6]],["C",[31.6,57.4,34,53.4]],["C",[36.3,49.4,36.3,44.2]],["C",[36.3,39,33.9,35]],["C",[31.6,31,27.6,28.7]],["C",[23.6,26.4,18.4,26.3]],["M",[18.4,34.4]],["C",[20.9,34.5,22.7,35.9]],["C",[24.5,37.4,25.4,39.6]],["C",[26.4,41.9,26.4,44.2]],["C",[26.4,46.5,25.4,48.7]],["C",[24.5,50.9,22.7,52.4]],["C",[20.9,53.8,18.4,53.9]],["C",[15.9,53.8,14.1,52.4]],["C",[12.3,50.9,11.4,48.7]],["C",[10.4,46.5,10.4,44.2]],["C",[10.4,41.9,11.4,39.6]],["C",[12.3,37.4,14.1,35.9]],["C",[15.9,34.5,18.4,34.4]],["M",[55.3,25.7]],["L",[14.8,103.3]],["C",[18.3,105.1,21.7,106.8]],["L",[62.1,29.1]],["C",[58.7,27.5,55.3,25.7]],["M",[58.7,70]],["C",[53.5,70.1,49.5,72.4]],["C",[45.5,74.7,43.2,78.7]],["C",[40.8,82.7,40.8,87.9]],["C",[40.8,93.1,43.1,97.1]],["C",[45.5,101.1,49.5,103.4]],["C",[53.5,105.7,58.7,105.7]],["C",[63.9,105.7,67.9,103.4]],["C",[71.9,101.1,74.3,97.1]],["C",[76.6,93.1,76.6,87.9]],["C",[76.6,82.7,74.2,78.7]],["C",[71.9,74.7,67.9,72.4]],["C",[63.9,70.1,58.7,70]],["M",[58.7,78.1]],["C",[61.2,78.2,63,79.6]],["C",[64.8,81.1,65.7,83.4]],["C",[66.7,85.6,66.7,87.9]],["C",[66.7,90.3,65.7,92.5]],["C",[64.8,94.7,63,96.2]],["C",[61.2,97.6,58.7,97.6]],["C",[56.2,97.6,54.4,96.2]],["C",[52.6,94.7,51.7,92.5]],["C",[50.7,90.3,50.7,87.9]],["C",[50.7,85.6,51.7,83.4]],["C",[52.6,81.1,54.4,79.6]],["C",[56.2,78.2,58.7,78.1]]]);
		this.motifs.set("&",[["M",[38.3,86]],["C",[36.8,87.6,35.1,89.1]],["C",[33.3,90.5,31.4,91.5]],["C",[29.4,92.5,27.1,92.5]],["C",[24.6,92.5,22.6,91]],["C",[20.5,89.5,19.3,87.2]],["C",[18.2,84.9,18.1,82.5]],["C",[18.2,79.7,19.4,77.5]],["C",[20.7,75.4,22.7,73.6]],["C",[24.6,71.9,26.6,70.4]],["L",[38.3,86]],["M",[28.3,49.5]],["C",[27.4,48.2,27,46.8]],["C",[26.5,45.4,26.5,43.9]],["C",[26.5,41,28.1,39]],["C",[29.7,36.9,32.7,36.8]],["C",[34.7,36.9,36,37.9]],["C",[37.3,39.1,37.9,40.8]],["C",[38.6,42.4,38.6,44.2]],["C",[38.6,46.9,37.5,48.9]],["C",[36.4,50.9,34.4,52.5]],["C",[33.2,53.5,31.9,54.6]],["L",[28.3,49.5]],["M",[53.1,103.7]],["L",[71,103.7]],["L",[58,86.5]],["C",[62.1,81.1,66.1,75.6]],["C",[61.5,71.3,56.8,67]],["L",[49.2,76.7]],["L",[38.7,63.2]],["C",[42,61.1,44.8,58.5]],["C",[47.6,55.8,49.3,52.5]],["C",[51.1,49.1,51.1,45]],["C",[51.1,39.3,48.5,35.1]],["C",[46,30.9,41.7,28.6]],["C",[37.3,26.4,31.8,26.3]],["C",[26.4,26.4,22,28.7]],["C",[17.7,31,15.2,35.2]],["C",[12.6,39.4,12.6,45.1]],["C",[12.6,49.6,14.4,53.5]],["C",[16,57.4,18.7,61.1]],["L",[14.2,64.2]],["C",[9.1,67.6,6.2,72.5]],["C",[3.4,77.5,3.3,83.8]],["C",[3.4,90.1,6.3,95.1]],["C",[9.1,100,14.1,102.8]],["C",[19,105.7,25.4,105.7]],["C",[31.7,105.6,37.1,102.9]],["C",[42.4,100.3,47,96.2]],["L",[53.1,103.7]]]);
		this.motifs.set("'",[["M",[8.8,28.3]],["C",[9.7,44.7,10.6,61.1]],["L",[19,61.1]],["C",[19.9,44.7,20.8,28.3]],["L",[8.8,28.3]]]);
		this.motifs.set("(",[["M",[17.5,20.5]],["C",[13.9,27.9,11.7,36.4]],["C",[9.5,45,8.4,53.8]],["C",[7.4,62.6,7.4,70.7]],["C",[7.4,79.1,8.4,88.1]],["C",[9.3,97.1,11.6,105.9]],["C",[13.8,114.7,17.5,122.1]],["C",[21.8,119.2,26.1,116.2]],["C",[23.1,109.6,21.3,102]],["C",[19.5,94.3,18.7,86.4]],["C",[17.9,78.5,17.9,71.3]],["C",[17.9,63.9,18.7,56.1]],["C",[19.5,48.3,21.3,40.7]],["C",[23.1,33.2,26.1,26.3]],["C",[21.8,23.4,17.5,20.5]]]);
		this.motifs.set(")",[["M",[1,26.3]],["C",[4,33.2,5.8,40.7]],["C",[7.6,48.3,8.4,56.1]],["C",[9.2,63.9,9.2,71.3]],["C",[9.2,78.5,8.4,86.4]],["C",[7.6,94.3,5.8,102]],["C",[4,109.6,1,116.2]],["L",[9.6,122.1]],["C",[13.3,114.7,15.5,105.9]],["C",[17.8,97.1,18.7,88.1]],["C",[19.7,79.1,19.7,70.7]],["C",[19.7,62.6,18.7,53.8]],["C",[17.6,45,15.4,36.4]],["C",[13.2,27.9,9.6,20.5]],["C",[5.3,23.4,1,26.3]]]);
		this.motifs.set("*",[["M",[16.6,28.3]],["C",[16.8,33.4,16.9,38.4]],["C",[12.9,35.8,8.9,33.2]],["C",[7.2,36.6,5.4,40]],["L",[13.4,44.9]],["L",[5.5,49.9]],["C",[7.3,53.3,9.1,56.7]],["L",[16.9,51.4]],["C",[16.8,56.4,16.6,61.3]],["L",[25.2,61.3]],["C",[25.1,56.4,25,51.4]],["C",[28.9,54,32.7,56.7]],["L",[36.3,49.9]],["L",[28.2,44.9]],["L",[36.3,40]],["L",[32.7,33.2]],["C",[28.9,35.8,25,38.4]],["C",[25.1,33.4,25.2,28.3]],["L",[16.6,28.3]]]);
		this.motifs.set("+",[["M",[23,52.5]],["L",[23,72.2]],["L",[3.3,72.2]],["L",[3.3,84]],["L",[23,84]],["L",[23,103.7]],["L",[34.8,103.7]],["L",[34.8,84]],["L",[54.5,84]],["L",[54.5,72.2]],["L",[34.8,72.2]],["L",[34.8,52.5]],["L",[23,52.5]]]);
		this.motifs.set(",",[["M",[13.5,88.1]],["C",[8.1,103.3,2.6,118.5]],["L",[11.9,119.6]],["C",[19.1,104.6,26.3,89.6]],["L",[13.5,88.1]]]);
		this.motifs.set("-",[["M",[4.3,65.9]],["L",[4.3,77.5]],["L",[28.7,77.5]],["L",[28.7,65.9]],["L",[4.3,65.9]]]);
		this.motifs.set(".",[["M",[14.5,87.9]],["C",[10.7,88,8.2,90.5]],["C",[5.7,92.9,5.6,96.7]],["C",[5.7,100.5,8.2,103]],["C",[10.7,105.6,14.5,105.7]],["C",[18.3,105.6,20.8,103]],["C",[23.3,100.5,23.4,96.7]],["C",[23.3,92.9,20.8,90.5]],["C",[18.3,88,14.5,87.9]]]);
		this.motifs.set("/",[["M",[40.5,18.9]],["L",[3.7,116.4]],["C",[8.5,118.2,13.4,119.9]],["C",[31.8,71.2,50.2,22.4]],["L",[40.5,18.9]]]);
		this.motifs.set("0",[["M",[28.9,26.3]],["C",[21.3,26.5,16.2,30.3]],["C",[11,34.1,7.8,40.1]],["C",[4.7,46.2,3.3,53.1]],["C",[1.9,59.9,1.9,66.1]],["C",[1.9,72.3,3.3,79.1]],["C",[4.7,85.9,7.9,92]],["C",[11.1,98,16.3,101.8]],["C",[21.4,105.6,28.9,105.7]],["C",[36.4,105.6,41.6,101.8]],["C",[46.7,98,49.9,92]],["C",[53.1,85.9,54.5,79.1]],["C",[55.9,72.3,55.9,66.1]],["C",[55.9,59.9,54.5,53.1]],["C",[53.1,46.2,50,40.1]],["C",[46.8,34.1,41.7,30.3]],["C",[36.5,26.5,28.9,26.3]],["M",[28.9,39.1]],["C",[32.8,39.2,35.3,42.2]],["C",[37.8,45.2,39.2,49.7]],["C",[40.5,54.1,41,58.5]],["C",[41.6,62.9,41.5,65.9]],["C",[41.5,68.2,41.2,71.6]],["C",[40.9,75,40.1,78.7]],["C",[39.3,82.3,37.9,85.6]],["C",[36.5,88.8,34.2,90.8]],["C",[32,92.9,28.9,92.9]],["C",[25.8,92.9,23.6,90.8]],["C",[21.4,88.8,20,85.6]],["C",[18.6,82.3,17.7,78.7]],["C",[16.9,75,16.6,71.6]],["C",[16.3,68.2,16.3,65.9]],["C",[16.3,62.9,16.8,58.5]],["C",[17.3,54.1,18.7,49.7]],["C",[20.1,45.2,22.6,42.2]],["C",[25,39.2,28.9,39.1]]]);
		this.motifs.set("1",[["M",[24.4,41.1]],["L",[24.4,103.7]],["L",[39.1,103.7]],["L",[39.1,28.3]],["L",[14.5,28.3]],["L",[14.5,41.1]],["L",[24.4,41.1]]]);
		this.motifs.set("2",[["M",[28.9,90.9]],["C",[34.4,84.5,40,78]],["C",[43.5,74,46.4,69.8]],["C",[49.4,65.6,51.2,60.9]],["C",[53,56.2,53.1,50.6]],["C",[53,43.7,49.8,38.2]],["C",[46.6,32.7,41.1,29.6]],["C",[35.5,26.4,28.6,26.3]],["C",[20.8,26.4,15.5,29.7]],["C",[10.2,33.1,7.2,38.9]],["C",[4.3,44.7,3.8,52]],["L",[19.4,52]],["C",[19.2,49.1,20.2,46.2]],["C",[21.1,43.2,23.3,41.2]],["C",[25.4,39.2,28.7,39.1]],["C",[31.8,39.2,33.9,41.1]],["C",[36.1,43,37.3,45.8]],["C",[38.4,48.5,38.4,51.3]],["C",[38.3,54.6,36.6,58.4]],["C",[34.8,62.2,32.2,66.1]],["C",[29.5,70,26.8,73.5]],["C",[24,77,22,79.6]],["L",[2.8,103.7]],["L",[53.6,103.7]],["L",[53.6,90.9]],["L",[28.9,90.9]]]);
		this.motifs.set("3",[["M",[19.9,48]],["C",[20,45.7,20.9,43.5]],["C",[21.9,41.4,23.7,40]],["C",[25.5,38.6,28.1,38.5]],["C",[30.8,38.6,32.8,39.9]],["C",[34.7,41.2,35.7,43.4]],["C",[36.7,45.6,36.7,48.1]],["C",[36.7,52.9,34.2,55.7]],["C",[31.8,58.5,27.1,58.5]],["L",[25.5,58.5]],["L",[25.5,69]],["L",[28.2,68.8]],["C",[31.5,68.6,33.9,70.4]],["C",[36.3,72.1,37.5,74.9]],["C",[38.8,77.7,38.8,80.8]],["C",[38.8,83.8,37.6,86.6]],["C",[36.5,89.3,34.3,91.1]],["C",[32,92.9,28.7,92.9]],["C",[25.4,92.9,23.1,91.4]],["C",[20.8,90,19.4,87.5]],["C",[18.1,85,17.9,81.9]],["L",[3.1,81.9]],["C",[3.6,88.7,6.9,94.1]],["C",[10.2,99.5,15.7,102.5]],["C",[21.1,105.7,28.1,105.7]],["C",[35.4,105.7,41,102.8]],["C",[46.7,99.9,49.9,94.5]],["C",[53.2,89.2,53.2,81.7]],["C",[53.2,78.2,52.2,74.5]],["C",[51.2,70.9,49.1,67.9]],["C",[47,64.9,43.5,63.3]],["C",[47.3,60.7,49,56.4]],["C",[50.7,52.1,50.7,47.6]],["C",[50.6,41.1,47.9,36.3]],["C",[45.3,31.6,40.4,29]],["C",[35.5,26.4,29,26.3]],["C",[22.2,26.4,17.3,29.1]],["C",[12.4,31.7,9.4,36.6]],["C",[6.5,41.5,5.9,48]],["L",[19.9,48]]]);
		this.motifs.set("4",[["M",[47.3,78.6]],["L",[47.3,26.9]],["L",[33.9,26.9]],["L",[0.3,83.8]],["L",[0.3,90.4]],["L",[33.5,90.4]],["L",[33.5,103.7]],["L",[47.3,103.7]],["L",[47.3,90.4]],["L",[55.3,90.4]],["L",[55.3,78.6]],["L",[47.3,78.6]],["M",[33.5,78.6]],["L",[17.4,78.6]],["L",[33.3,48.6]],["L",[33.5,48.6]],["L",[33.5,78.6]]]);
		this.motifs.set("5",[["M",[49.9,41.1]],["L",[49.9,28.3]],["L",[17.1,28.3]],["L",[9,67.9]],["L",[11.3,67.9]],["C",[13.7,65.7,16.9,64.4]],["C",[20.1,63,23.4,63]],["C",[27.6,63,30.9,65]],["C",[34.2,67.1,36.1,70.5]],["C",[38,73.8,38.1,78]],["C",[38.1,82,36.4,85.4]],["C",[34.8,88.7,31.7,90.8]],["C",[28.7,92.9,24.6,92.9]],["C",[19.4,92.8,14.9,90.1]],["C",[10.5,87.4,7.6,83.1]],["L",[3.2,95.7]],["C",[7.6,100.7,13.3,103.2]],["C",[18.9,105.7,25.6,105.7]],["C",[33.7,105.7,39.8,102.3]],["C",[46,98.9,49.5,92.8]],["C",[52.9,86.8,53,78.6]],["C",[52.9,71.4,50,65.5]],["C",[47,59.6,41.5,56.1]],["C",[36.1,52.5,28.7,52.4]],["L",[24.9,52.6]],["C",[26.2,46.9,27.5,41.1]],["L",[49.9,41.1]]]);
		this.motifs.set("6",[["M",[31.3,25.2]],["L",[11.3,54.9]],["C",[7.5,60.5,4.9,66.9]],["C",[2.2,73.3,2.1,80.1]],["C",[2.2,87.7,5.6,93.5]],["C",[9.1,99.2,15,102.5]],["C",[21,105.7,28.5,105.7]],["C",[36.3,105.7,42.3,102.3]],["C",[48.2,98.9,51.6,92.9]],["C",[55,86.9,55.1,79.1]],["C",[55,72.5,52.3,66.9]],["C",[49.6,61.2,44.6,57.7]],["C",[39.6,54.2,32.7,54.1]],["C",[31.1,54.1,29.6,54.4]],["C",[28.1,54.6,26.8,55.1]],["L",[26.6,54.9]],["C",[34.3,44,42.1,33]],["L",[31.3,25.2]],["M",[28.4,93.7]],["C",[24.7,93.7,22,91.6]],["C",[19.3,89.5,17.9,86.3]],["C",[16.4,83.2,16.4,79.7]],["C",[16.4,76.2,17.9,73.1]],["C",[19.3,69.8,22,67.8]],["C",[24.7,65.7,28.4,65.6]],["C",[32.1,65.7,34.8,67.8]],["C",[37.4,69.8,38.9,73.1]],["C",[40.3,76.2,40.3,79.7]],["C",[40.3,83.2,38.9,86.3]],["C",[37.4,89.5,34.8,91.6]],["C",[32.1,93.7,28.4,93.7]]]);
		this.motifs.set("7",[["M",[35.9,41.1]],["C",[20.4,70,4.8,98.8]],["C",[10.8,102.3,16.9,105.7]],["L",[58.2,28.3]],["L",[4.3,28.3]],["L",[4.3,41.1]],["L",[35.9,41.1]]]);
		this.motifs.set("8",[["M",[28.9,70.4]],["C",[32,70.5,34.1,72.2]],["C",[36.3,73.9,37.4,76.5]],["C",[38.5,79.2,38.5,82]],["C",[38.5,84.8,37.4,87.5]],["C",[36.3,90,34.1,91.8]],["C",[32,93.5,28.9,93.5]],["C",[25.8,93.5,23.7,91.8]],["C",[21.5,90,20.4,87.5]],["C",[19.3,84.8,19.3,82]],["C",[19.3,79.2,20.4,76.5]],["C",[21.5,73.9,23.7,72.2]],["C",[25.8,70.5,28.9,70.4]],["M",[16.7,64.4]],["C",[10.5,66.9,7.5,71.9]],["C",[4.5,77,4.5,83.6]],["C",[4.6,90.4,8,95.4]],["C",[11.4,100.4,16.9,103]],["C",[22.5,105.7,28.9,105.7]],["C",[35.4,105.7,40.9,103]],["C",[46.4,100.4,49.8,95.4]],["C",[53.2,90.4,53.3,83.6]],["C",[53.3,77,50.3,71.9]],["C",[47.3,66.9,41.1,64.4]],["C",[45.8,62,48.3,57.5]],["C",[50.9,53.1,51,47.8]],["C",[50.9,41.3,48,36.5]],["C",[45.1,31.7,40.1,29]],["C",[35.2,26.4,28.9,26.3]],["C",[22.6,26.4,17.6,29]],["C",[12.6,31.7,9.8,36.5]],["C",[6.8,41.3,6.8,47.8]],["C",[6.8,53.1,9.4,57.5]],["C",[12,62,16.7,64.4]],["M",[28.9,37.3]],["C",[31.6,37.4,33.6,38.9]],["C",[35.5,40.5,36.6,42.9]],["C",[37.6,45.3,37.6,47.8]],["C",[37.6,50.4,36.6,52.8]],["C",[35.5,55.2,33.6,56.8]],["C",[31.6,58.4,28.9,58.4]],["C",[26.1,58.4,24.2,56.8]],["C",[22.2,55.2,21.2,52.8]],["C",[20.2,50.4,20.2,47.8]],["C",[20.2,45.3,21.2,42.9]],["C",[22.2,40.5,24.2,38.9]],["C",[26.1,37.4,28.9,37.3]]]);
		this.motifs.set("9",[["M",[26.4,106.9]],["L",[46.4,77.2]],["C",[50.2,71.7,52.8,65.2]],["C",[55.5,58.8,55.6,52]],["C",[55.5,44.4,52.1,38.6]],["C",[48.6,32.9,42.7,29.6]],["C",[36.7,26.4,29.2,26.3]],["C",[21.4,26.4,15.4,29.8]],["C",[9.4,33.2,6.1,39.2]],["C",[2.6,45.2,2.6,53]],["C",[2.6,59.6,5.3,65.3]],["C",[8.1,71,13,74.4]],["C",[18.1,77.9,25,78]],["C",[26.6,78,28.1,77.7]],["C",[29.6,77.5,30.9,76.9]],["L",[31.1,77.1]],["C",[23.3,88.1,15.6,99]],["L",[26.4,106.9]],["M",[29.3,38.3]],["C",[33,38.4,35.7,40.5]],["C",[38.4,42.5,39.8,45.8]],["C",[41.3,48.9,41.3,52.5]],["C",[41.3,55.9,39.8,59.1]],["C",[38.4,62.3,35.7,64.4]],["C",[33,66.5,29.3,66.5]],["C",[25.6,66.5,22.9,64.4]],["C",[20.3,62.3,18.8,59.1]],["C",[17.4,55.9,17.4,52.5]],["C",[17.4,48.9,18.8,45.8]],["C",[20.3,42.5,22.9,40.5]],["C",[25.6,38.4,29.3,38.3]]]);
		this.motifs.set(":",[["M",[14.5,87.9]],["C",[10.7,88,8.2,90.5]],["C",[5.7,92.9,5.6,96.7]],["C",[5.7,100.5,8.2,103]],["C",[10.7,105.6,14.5,105.7]],["C",[18.3,105.6,20.8,103]],["C",[23.3,100.5,23.4,96.7]],["C",[23.3,92.9,20.8,90.5]],["C",[18.3,88,14.5,87.9]],["M",[14.5,51.9]],["C",[10.7,52,8.2,54.5]],["C",[5.7,56.9,5.6,60.7]],["C",[5.7,64.5,8.2,67.1]],["C",[10.7,69.6,14.5,69.7]],["C",[18.3,69.6,20.8,67.1]],["C",[23.3,64.5,23.4,60.7]],["C",[23.3,56.9,20.8,54.5]],["C",[18.3,52,14.5,51.9]]]);
		this.motifs.set(";",[["M",[12.5,88.1]],["L",[1.6,118.5]],["L",[10.9,119.6]],["C",[18.1,104.6,25.3,89.5]],["L",[12.5,88.1]],["M",[18.5,51.9]],["C",[14.7,52,12.2,54.5]],["C",[9.7,56.9,9.6,60.7]],["C",[9.7,64.5,12.2,67.1]],["C",[14.7,69.6,18.5,69.7]],["C",[22.3,69.6,24.8,67.1]],["C",[27.3,64.5,27.4,60.7]],["C",[27.3,56.9,24.8,54.5]],["C",[22.3,52,18.5,51.9]]]);
		this.motifs.set("<",[["M",[3.3,84]],["C",[28.9,93.2,54.5,102.3]],["L",[54.5,89.7]],["L",[22,78.2]],["L",[22,78]],["L",[54.5,66.5]],["L",[54.5,53.9]],["L",[3.3,72.1]],["L",[3.3,84]]]);
		this.motifs.set("=",[["M",[3.3,72.2]],["L",[54.5,72.2]],["L",[54.5,60.4]],["L",[3.3,60.4]],["L",[3.3,72.2]],["M",[3.3,95.8]],["L",[54.5,95.8]],["L",[54.5,84]],["L",[3.3,84]],["L",[3.3,95.8]]]);
		this.motifs.set(">",[["M",[54.5,72.1]],["C",[28.9,62.9,3.3,53.9]],["L",[3.3,66.5]],["L",[35.8,78]],["L",[35.8,78.2]],["L",[3.3,89.7]],["L",[3.3,102.3]],["C",[28.9,93.2,54.5,84]],["L",[54.5,72.1]]]);
		this.motifs.set("?",[["M",[14.8,78]],["L",[28.8,78]],["L",[29.6,68.4]],["C",[34.4,67.2,38,64.3]],["C",[41.7,61.3,43.7,57]],["C",[45.7,52.7,45.7,47.8]],["C",[45.7,41.6,42.9,36.8]],["C",[40.1,31.9,35.3,29.2]],["C",[30.4,26.4,24.2,26.3]],["C",[18.1,26.4,13.2,29.3]],["C",[8.3,32.1,5.6,37]],["C",[2.8,41.8,3,47.9]],["L",[17.6,47.9]],["L",[17.6,46.7]],["C",[17.6,44.7,18.4,42.8]],["C",[19.1,41,20.6,39.8]],["C",[22.1,38.6,24.3,38.5]],["C",[26.6,38.6,28.1,39.9]],["C",[29.7,41.3,30.4,43.3]],["C",[31.2,45.3,31.2,47.3]],["C",[31.2,50.9,29.4,53.4]],["C",[27.6,55.9,24.7,57.2]],["C",[21.8,58.5,18.4,58.5]],["L",[16.6,58.4]],["C",[15.7,58.3,14.8,58.1]],["L",[14.8,78]],["M",[22,87.9]],["C",[18.2,88,15.7,90.5]],["C",[13.2,92.9,13.1,96.7]],["C",[13.2,100.5,15.7,103]],["C",[18.2,105.6,22,105.7]],["C",[25.8,105.6,28.3,103]],["C",[30.8,100.5,30.9,96.7]],["C",[30.8,92.9,28.3,90.5]],["C",[25.8,88,22,87.9]]]);
		this.motifs.set("@",[["M",[59,66.5]],["C",[58.6,70.2,57.1,73.3]],["C",[55.7,76.3,52.8,78.1]],["C",[50,79.9,45.6,79.9]],["C",[41,79.8,38.7,76.8]],["C",[36.4,73.7,36.4,69.2]],["C",[36.4,65.3,37.8,62]],["C",[39.2,58.7,42,56.6]],["C",[44.7,54.5,48.8,54.4]],["C",[54.1,54.4,56.9,57.4]],["C",[59.7,60.4,59,66.5]],["M",[61.5,53]],["C",[58.5,49.1,55.3,47.4]],["C",[52,45.8,48.2,45.8]],["C",[41.9,45.9,37.4,49.3]],["C",[32.8,52.7,30.3,58.2]],["C",[27.8,63.6,27.8,69.8]],["C",[27.8,75.1,30.2,79.3]],["C",[32.5,83.5,36.3,86]],["C",[40.1,88.5,44.6,88.5]],["C",[49.1,88.5,52.4,86.7]],["C",[55.7,85,58.3,82.3]],["C",[58.7,85.2,60.1,86.8]],["C",[61.5,88.4,63.6,88.5]],["C",[67.3,88.7,71.3,86.6]],["C",[75.3,84.5,79,79.7]],["C",[82,75.7,83.6,70.2]],["C",[85.2,64.7,85.2,58.3]],["C",[85.2,51.2,82.2,45.4]],["C",[79.2,39.6,74,35.1]],["C",[69,30.6,63.1,28.4]],["C",[57.2,26.3,50.5,26.3]],["C",[39.7,26.4,31.2,31.6]],["C",[22.5,36.8,17.5,45.7]],["C",[12.4,54.6,12.3,66]],["C",[12.5,77.5,17.6,86.5]],["C",[22.8,95.4,31.5,100.5]],["C",[40.2,105.6,51.1,105.7]],["C",[57.6,105.7,62.4,104.8]],["C",[67,103.9,70.8,102.4]],["C",[74.5,100.8,78,98.8]],["L",[70.5,92.8]],["C",[67.7,94.9,63.2,96]],["C",[58.7,97.1,52.5,97.1]],["C",[43.8,97.1,36.7,93.2]],["C",[29.6,89.3,25.3,82.3]],["C",[21,75.3,20.9,66]],["C",[20.9,57.2,24.8,50.2]],["C",[28.6,43.2,35.2,39.1]],["C",[41.7,35,50.2,34.9]],["C",[57.9,35,63.9,38.1]],["C",[69.8,41.4,73.1,47.4]],["C",[76.6,53.4,76.6,61.9]],["C",[76.6,67.1,75,71.4]],["C",[73.4,75.8,71.1,78.5]],["C",[68.8,81.2,66.4,81.3]],["C",[64.7,81.3,64.4,79.8]],["C",[64,78.4,64.3,76.5]],["C",[64.6,74.5,65,72.7]],["C",[67.5,59.7,70,46.7]],["L",[62.9,46.7]],["L",[61.5,53]]]);
		this.motifs.set("A",[["M",[47,87.8]],["C",[49.9,95.8,52.8,103.7]],["L",[68.5,103.7]],["L",[39.9,26.3]],["L",[28.5,26.3]],["L",[-0.9,103.7]],["L",[14.6,103.7]],["C",[17.7,95.8,20.8,87.8]],["L",[47,87.8]],["M",[42.9,75.8]],["L",[25,75.8]],["L",[33.3,48.4]],["L",[33.5,48.4]],["L",[42.9,75.8]]]);
		this.motifs.set("B",[["M",[20.1,70.9]],["L",[22.5,70.9]],["C",[26.3,70.8,29.8,71.3]],["C",[33.3,71.9,35.5,74.1]],["C",[37.8,76.3,37.9,81.1]],["C",[37.8,85.9,35.8,88.2]],["C",[33.8,90.6,30.5,91.3]],["C",[27.2,92,23.2,91.9]],["L",[20.1,91.9]],["L",[20.1,70.9]],["M",[5.4,103.7]],["L",[28.5,103.7]],["C",[35.4,103.7,40.8,101.5]],["C",[46.2,99.2,49.4,94.4]],["C",[52.5,89.7,52.6,82.3]],["C",[52.6,78.1,51.2,74.1]],["C",[49.9,70.1,47,67.2]],["C",[44.1,64.3,39.7,63.4]],["C",[42,61.9,43.5,59.5]],["C",[44.9,57.1,45.6,54.4]],["C",[46.3,51.6,46.3,48.8]],["C",[46.2,41.4,43.6,36.9]],["C",[40.8,32.3,35.8,30.3]],["C",[30.7,28.3,23.7,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["M",[20.1,40.1]],["L",[22,40.1]],["C",[26.7,40,29.6,42.1]],["C",[32.5,44.2,32.6,49.8]],["C",[32.6,55.6,29.9,57.7]],["C",[27.3,59.8,21.9,59.7]],["L",[20.1,59.7]],["L",[20.1,40.1]]]);
		this.motifs.set("C",[["M",[55.8,30.7]],["C",[52,28.6,47.7,27.5]],["C",[43.5,26.3,39,26.3]],["C",[30.7,26.4,23.9,29.6]],["C",[17,32.8,12.1,38.4]],["C",[7.2,44.1,4.5,51.3]],["C",[1.9,58.6,1.8,66.6]],["C",[1.9,74.5,4.6,81.5]],["C",[7.3,88.5,12.3,94]],["C",[17.3,99.4,24,102.5]],["C",[30.7,105.7,38.7,105.7]],["C",[43.3,105.7,47.5,104.5]],["C",[51.7,103.2,55.8,101.2]],["L",[55.8,83.7]],["C",[52.6,87.3,48.2,89.5]],["C",[43.9,91.7,39.1,91.7]],["C",[32.2,91.6,27.3,87.9]],["C",[22.3,84.3,19.7,78.6]],["C",[17,72.8,17,66.3]],["C",[17,59.7,19.6,53.8]],["C",[22.2,47.9,27.1,44.2]],["C",[32.1,40.4,39.2,40.3]],["C",[44,40.3,48.3,42.4]],["C",[52.6,44.5,55.8,48.3]],["L",[55.8,30.7]]]);
		this.motifs.set("D",[["M",[5.4,103.7]],["L",[26.3,103.7]],["C",[37.2,103.6,45.3,98.7]],["C",[53.5,93.8,58.1,85.3]],["C",[62.7,76.8,62.8,66.1]],["C",[62.7,55.3,58.2,46.8]],["C",[53.7,38.3,45.5,33.4]],["C",[37.4,28.4,26.4,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["M",[20.1,41.1]],["L",[22.5,41.1]],["C",[35.1,41.1,41.3,47.4]],["C",[47.6,53.7,47.6,66]],["C",[47.7,73.5,45.1,79.1]],["C",[42.6,84.7,37.1,87.8]],["C",[31.5,90.9,22.5,90.9]],["L",[20.1,90.9]],["L",[20.1,41.1]]]);
		this.motifs.set("E",[["M",[44.4,41.1]],["L",[44.4,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[44.4,103.7]],["L",[44.4,90.9]],["L",[20.1,90.9]],["L",[20.1,70.5]],["L",[43.5,70.5]],["L",[43.5,57.7]],["L",[20.1,57.7]],["L",[20.1,41.1]],["L",[44.4,41.1]]]);
		this.motifs.set("F",[["M",[42.8,41.1]],["L",[42.8,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,70.5]],["L",[41.4,70.5]],["L",[41.4,57.7]],["L",[20.1,57.7]],["L",[20.1,41.1]],["L",[42.8,41.1]]]);
		this.motifs.set("G",[["M",[39.5,63.6]],["L",[39.5,75.6]],["L",[55.5,75.6]],["C",[55.3,80.2,53,84.1]],["C",[50.6,88,46.8,90.3]],["C",[43,92.7,38.3,92.7]],["C",[33,92.7,29,90.4]],["C",[25,88,22.3,84.2]],["C",[19.7,80.4,18.3,75.7]],["C",[17,71.1,17,66.3]],["C",[17,61.6,18.3,56.8]],["C",[19.6,52.1,22.3,48.2]],["C",[24.9,44.2,28.9,41.8]],["C",[32.9,39.4,38.2,39.3]],["C",[44.1,39.4,48.6,42.8]],["C",[53.1,46.1,55.4,51.3]],["L",[68.4,44.3]],["C",[64,35.7,56.2,31]],["C",[48.3,26.4,38.6,26.3]],["C",[30.1,26.4,23.3,29.6]],["C",[16.6,32.7,11.8,38.2]],["C",[6.9,43.8,4.4,51]],["C",[1.9,58.2,1.8,66.3]],["C",[1.9,74.2,4.3,81.3]],["C",[6.8,88.3,11.5,93.8]],["C",[16.2,99.3,22.8,102.5]],["C",[29.4,105.7,37.7,105.7]],["C",[46.5,105.7,52.9,102.5]],["C",[59.4,99.2,63.6,93.6]],["C",[67.9,88,70,80.8]],["C",[72,73.6,72,65.5]],["L",[72,63.6]],["L",[39.5,63.6]]]);
		this.motifs.set("H",[["M",[20.1,58]],["L",[20.1,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,70]],["L",[47.3,70]],["L",[47.3,103.7]],["L",[62,103.7]],["L",[62,28.3]],["L",[47.3,28.3]],["L",[47.3,58]],["L",[20.1,58]]]);
		this.motifs.set("I",[["M",[20.1,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,28.3]]]);
		this.motifs.set("J",[["M",[33.9,28.3]],["L",[19.2,28.3]],["L",[19.2,75.6]],["C",[19.2,77.5,19.2,80.4]],["C",[19.2,83.2,18.8,86]],["C",[18.3,88.8,16.9,90.7]],["C",[15.6,92.7,12.9,92.7]],["C",[11,92.6,9.4,91.1]],["C",[7.8,89.6,7.2,87.9]],["L",[-2.2,98.6]],["C",[0.6,101.6,4.5,103.6]],["C",[8.4,105.6,12.6,105.7]],["C",[17.7,105.7,22.1,103.6]],["C",[26.5,101.5,29.5,97.2]],["C",[32.5,92.7,33.3,88]],["C",[34,83.4,33.9,78.1]],["L",[33.9,28.3]]]);
		this.motifs.set("K",[["M",[20.3,60.1]],["L",[20.1,60.1]],["L",[20.1,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,69.8]],["L",[20.3,69.8]],["L",[44.4,103.7]],["L",[63.3,103.7]],["L",[33.1,63.1]],["L",[61.7,28.3]],["L",[43.6,28.3]],["C",[32,44.2,20.3,60.1]]]);
		this.motifs.set("L",[["M",[20.1,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[40.9,103.7]],["L",[40.9,90.9]],["L",[20.1,90.9]],["L",[20.1,28.3]]]);
		this.motifs.set("M",[["M",[67.7,103.7]],["L",[82.5,103.7]],["C",[76.9,65,71.2,26.3]],["L",[60.6,26.3]],["L",[42.8,76]],["C",[33.5,51.2,24.2,26.3]],["L",[13.8,26.3]],["L",[1.1,103.7]],["L",[15.9,103.7]],["C",[19.3,80.3,22.6,56.9]],["L",[22.8,56.9]],["L",[39.3,104.7]],["L",[44.4,104.7]],["L",[61.5,56.9]],["L",[61.7,56.9]],["C",[64.7,80.3,67.7,103.7]]]);
		this.motifs.set("N",[["M",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,52.5]],["L",[20.3,52.5]],["C",[40.2,78.9,60,105.2]],["L",[70.6,105.2]],["L",[70.6,28.3]],["L",[55.9,28.3]],["L",[55.9,79]],["L",[55.7,79]],["C",[35.8,52.7,16,26.3]],["L",[5.4,26.3]],["L",[5.4,103.7]]]);
		this.motifs.set("O",[["M",[39.1,105.7]],["C",[47.4,105.7,54.2,102.5]],["C",[61,99.4,66,93.9]],["C",[71,88.4,73.7,81.3]],["C",[76.4,74.1,76.4,65.9]],["C",[76.4,58,73.7,50.8]],["C",[71,43.7,66,38.2]],["C",[61,32.7,54.2,29.6]],["C",[47.4,26.4,39.1,26.3]],["C",[30.8,26.4,24,29.6]],["C",[17.2,32.7,12.2,38.2]],["C",[7.2,43.7,4.5,50.8]],["C",[1.9,58,1.8,65.9]],["C",[1.9,74.1,4.5,81.3]],["C",[7.2,88.4,12.2,93.9]],["C",[17.2,99.4,24,102.5]],["C",[30.8,105.7,39.1,105.7]],["M",[39.1,40.8]],["C",[45.6,40.9,50.6,44.4]],["C",[55.6,48,58.3,53.6]],["C",[61.2,59.1,61.2,65.3]],["C",[61.2,69.7,59.5,74.2]],["C",[57.9,78.7,54.9,82.5]],["C",[51.9,86.4,47.9,88.8]],["C",[43.8,91.2,39.1,91.2]],["C",[34.4,91.2,30.4,88.8]],["C",[26.4,86.4,23.3,82.5]],["C",[20.4,78.7,18.7,74.2]],["C",[17,69.7,17,65.3]],["C",[17,59.1,19.9,53.6]],["C",[22.7,48,27.6,44.4]],["C",[32.6,40.9,39.1,40.8]]]);
		this.motifs.set("P",[["M",[20.1,75.5]],["L",[27.4,75.5]],["C",[39,75.5,45.3,69.6]],["C",[51.5,63.7,51.5,51.7]],["C",[51.5,43.2,48.2,38]],["C",[45.1,32.9,39.2,30.6]],["C",[33.3,28.3,25.4,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,75.5]],["M",[20.1,40.5]],["L",[22.7,40.5]],["C",[26.9,40.5,29.9,41.3]],["C",[33.1,42.1,34.8,44.4]],["C",[36.5,46.8,36.5,51.6]],["C",[36.5,56.5,35,59]],["C",[33.4,61.6,30.5,62.5]],["C",[27.5,63.4,23.1,63.3]],["L",[20.1,63.3]],["L",[20.1,40.5]]]);
		this.motifs.set("Q",[["M",[77.8,105.4]],["C",[72.7,99.3,67.5,93.2]],["C",[71.9,87.6,74.1,80.6]],["C",[76.4,73.6,76.4,65.9]],["C",[76.4,58,73.7,50.8]],["C",[71,43.7,66,38.2]],["C",[61,32.7,54.2,29.6]],["C",[47.4,26.4,39.1,26.3]],["C",[30.8,26.4,24,29.6]],["C",[17.2,32.7,12.2,38.2]],["C",[7.2,43.7,4.5,50.8]],["C",[1.9,58,1.8,65.9]],["C",[1.9,74.1,4.5,81.3]],["C",[7.2,88.4,12.2,93.9]],["C",[17.2,99.4,24,102.5]],["C",[30.8,105.7,39.1,105.7]],["C",[44.3,105.7,49.2,104.5]],["C",[54,103.2,57.8,100.6]],["L",[63,106.9]],["L",[77.8,105.4]],["M",[49.8,73.5]],["L",[34.6,74.7]],["C",[40.8,81.9,47,89]],["C",[45.5,90,43.3,90.7]],["C",[41.2,91.5,39.1,91.5]],["C",[31.9,91.4,27,87.9]],["C",[22,84.4,19.5,78.8]],["C",[17,73.2,17,66.8]],["C",[17,61.9,18.5,57.2]],["C",[19.9,52.5,22.7,48.7]],["C",[25.5,44.9,29.6,42.6]],["C",[33.7,40.4,39.1,40.3]],["C",[44.1,40.4,48.1,42.5]],["C",[52.2,44.7,55.1,48.3]],["C",[58.1,52,59.6,56.5]],["C",[61.2,60.9,61.2,65.5]],["C",[61.2,69.5,60.1,73.7]],["C",[59,77.9,56.5,81.1]],["L",[49.8,73.5]]]);
		this.motifs.set("R",[["M",[35.1,71.9]],["C",[40.1,71,43.6,67.9]],["C",[47,64.8,48.7,60.4]],["C",[50.5,55.9,50.5,51]],["C",[50.4,43,47.3,38]],["C",[44.1,33,38.4,30.6]],["C",[32.8,28.3,25.3,28.3]],["L",[5.4,28.3]],["L",[5.4,103.7]],["L",[20.1,103.7]],["L",[20.1,73.3]],["L",[20.3,73.3]],["L",[38.6,103.7]],["L",[56.4,103.7]],["L",[35.1,71.9]],["M",[20.1,40.3]],["L",[22.1,40.3]],["C",[26,40.3,29.1,41.1]],["C",[32.2,42,34,44.4]],["C",[35.7,46.8,35.8,51.4]],["C",[35.7,56,34,58.5]],["C",[32.3,61,29.2,62.1]],["C",[26.1,63.1,22,63]],["L",[20.1,63]],["L",[20.1,40.3]]]);
		this.motifs.set("S",[["M",[47.8,34.7]],["C",[45.4,32.2,41.9,30.3]],["C",[38.4,28.4,34.5,27.4]],["C",[30.6,26.3,27.2,26.3]],["C",[20.8,26.4,15.9,29.4]],["C",[10.9,32.4,8.1,37.5]],["C",[5.3,42.6,5.2,48.9]],["C",[5.3,54.7,7.4,58.6]],["C",[9.6,62.5,13.3,65]],["C",[17.1,67.6,22,69.5]],["C",[25,70.6,28,72]],["C",[31,73.4,33,75.7]],["C",[35,78,35.1,81.8]],["C",[35.1,84.8,33.9,87.2]],["C",[32.8,89.7,30.6,91.2]],["C",[28.4,92.7,25.4,92.7]],["C",[22.2,92.7,19.5,91.2]],["C",[16.8,89.7,14.8,87.2]],["C",[12.8,84.7,11.8,81.7]],["L",[2.3,91]],["C",[6.2,97.7,12,101.6]],["C",[17.7,105.6,25.5,105.7]],["C",[33.3,105.7,38.8,102.4]],["C",[44.3,99.1,47.3,93.3]],["C",[50.2,87.6,50.3,79.9]],["C",[50.1,72.4,47.2,68]],["C",[44.2,63.6,39.8,61.1]],["C",[35.4,58.7,30.9,56.9]],["C",[26.5,55.2,23.5,53.1]],["C",[20.5,50.9,20.4,47.2]],["C",[20.5,44.7,21.7,42.8]],["C",[23,40.9,25.1,39.9]],["C",[27.2,38.7,29.6,38.7]],["C",[33.3,38.8,36,40.4]],["C",[38.8,42.1,40.9,44.9]],["C",[44.3,39.8,47.8,34.7]]]);
		this.motifs.set("T",[["M",[29.9,41.1]],["L",[45.1,41.1]],["L",[45.1,28.3]],["L",[0,28.3]],["L",[0,41.1]],["L",[15.2,41.1]],["L",[15.2,103.7]],["L",[29.9,103.7]],["L",[29.9,41.1]]]);
		this.motifs.set("U",[["M",[5,73.4]],["C",[4.9,82.7,7.8,90]],["C",[10.5,97.2,16.7,101.4]],["C",[22.9,105.6,33,105.7]],["C",[43.1,105.6,49.2,101.4]],["C",[55.4,97.2,58.2,90]],["C",[61,82.7,61,73.4]],["L",[61,28.3]],["L",[46.3,28.3]],["L",[46.3,70.5]],["C",[46.3,74.1,46,77.9]],["C",[45.6,81.8,44.3,85.2]],["C",[43.1,88.6,40.3,90.7]],["C",[37.6,92.9,33,92.9]],["C",[28.3,92.9,25.6,90.7]],["C",[22.9,88.6,21.6,85.2]],["C",[20.4,81.8,20,77.9]],["C",[19.6,74.1,19.7,70.5]],["L",[19.7,28.3]],["L",[5,28.3]],["L",[5,73.4]]]);
		this.motifs.set("V",[["M",[14.4,28.3]],["L",[-1.4,28.3]],["L",[27.4,105.7]],["L",[36,105.7]],["L",[65.3,28.3]],["L",[49.5,28.3]],["L",[32.7,79.1]],["L",[32.5,79.1]],["L",[14.4,28.3]]]);
		this.motifs.set("W",[["M",[14,28.3]],["L",[-1.4,28.3]],["C",[10.6,66.8,22.6,105.2]],["L",[33.4,105.2]],["L",[47.6,55.9]],["L",[47.8,55.9]],["L",[62.8,105.2]],["L",[73.6,105.2]],["L",[99.1,28.3]],["L",[83.7,28.3]],["C",[76.3,54,68.9,79.7]],["L",[68.7,79.7]],["C",[60.9,53.5,53.1,27.3]],["L",[44.4,27.3]],["C",[36.9,53.5,29.4,79.7]],["L",[29.2,79.7]],["L",[14,28.3]]]);
		this.motifs.set("X",[["M",[23.3,63.8]],["L",[-0.8,103.7]],["L",[16.4,103.7]],["L",[30.8,76.1]],["L",[46,103.7]],["L",[63.1,103.7]],["L",[39.9,63.8]],["L",[60.8,28.3]],["L",[43.4,28.3]],["C",[37.9,40,32.4,51.7]],["L",[20.4,28.3]],["L",[3,28.3]],["L",[23.3,63.8]]]);
		this.motifs.set("Y",[["M",[21.8,69.2]],["L",[21.8,103.7]],["L",[36.5,103.7]],["L",[36.5,69.2]],["L",[60.3,28.3]],["L",[43.1,28.3]],["L",[28.7,54.6]],["L",[15.5,28.3]],["L",[-1.6,28.3]],["L",[21.8,69.2]]]);
		this.motifs.set("Z",[["M",[23.9,90.9]],["L",[57,28.3]],["L",[5.6,28.3]],["L",[5.6,41.1]],["L",[33.7,41.1]],["L",[0.5,103.7]],["L",[55.2,103.7]],["L",[55.2,90.9]],["L",[23.9,90.9]]]);
		this.motifs.set("[",[["M",[15.1,28.3]],["L",[24.3,28.3]],["L",[24.3,19.2]],["L",[4.5,19.2]],["L",[4.5,112.8]],["L",[24.3,112.8]],["L",[24.3,103.7]],["L",[15.1,103.7]],["L",[15.1,28.3]]]);
		this.motifs.set("\\",[["M",[3,18.9]],["L",[39.8,103.7]],["L",[51,103.7]],["L",[14.2,18.9]],["L",[3,18.9]]]);
		this.motifs.set("]",[["M",[13.7,103.7]],["L",[4.5,103.7]],["L",[4.5,112.8]],["L",[24.3,112.8]],["L",[24.3,19.2]],["L",[4.5,19.2]],["L",[4.5,28.3]],["L",[13.7,28.3]],["L",[13.7,103.7]]]);
		this.motifs.set("^",[["M",[3.3,70.8]],["L",[16.2,70.8]],["L",[28.9,42.5]],["L",[41.6,70.8]],["L",[54.5,70.8]],["L",[35,28.3]],["L",[22.6,28.3]],["L",[3.3,70.8]]]);
		this.motifs.set("_",[["M",[50,115]],["L",[0,115]],["L",[0,122.5]],["L",[50,122.5]],["L",[50,115]]]);
		this.motifs.set("`",[["M",[7.9,32.5]],["L",[23,47.5]],["L",[30.1,43.1]],["L",[18.1,26.3]],["C",[13,29.5,7.9,32.5]]]);
		this.motifs.set("{",[["M",[6.8,73.7]],["C",[10.5,75.4,12.5,79.3]],["C",[14.3,83.2,14.3,88.8]],["L",[14.3,107]],["C",[14.4,111,15.9,114]],["C",[17.3,117,19.3,118.6]],["C",[21.2,120.2,22.8,120.2]],["L",[32,120.2]],["L",[32,111.1]],["L",[28,111.1]],["C",[25.8,111,25.3,109.3]],["C",[24.8,107.5,24.9,104.9]],["L",[24.9,87.2]],["C",[24.8,81.5,23.2,77.9]],["C",[21.6,74.2,19.9,72.4]],["C",[18.1,70.5,17.3,70.1]],["C",[18.1,69.7,19.9,67.8]],["C",[21.6,66,23.2,62.3]],["C",[24.8,58.7,24.9,52.9]],["L",[24.9,35.2]],["C",[24.8,32.7,25.3,30.9]],["C",[25.8,29.1,28,29]],["L",[32,29]],["L",[32,19.9]],["L",[22.8,19.9]],["C",[21.2,20,19.3,21.6]],["C",[17.3,23.2,15.9,26.1]],["C",[14.4,29.1,14.3,33.1]],["L",[14.3,51.3]],["C",[14.3,57,12.5,60.8]],["C",[10.5,64.8,6.8,66.4]],["L",[6.8,73.7]]]);
		this.motifs.set("|",[["M",[32.8,18.9]],["L",[21,18.9]],["L",[21,103.7]],["L",[32.8,103.7]],["L",[32.8,18.9]]]);
		this.motifs.set("}",[["M",[32.1,66.4]],["C",[28.4,64.8,26.5,60.8]],["C",[24.6,57,24.6,51.3]],["L",[24.6,33.1]],["C",[24.5,29.1,23,26.1]],["C",[21.6,23.2,19.6,21.6]],["C",[17.7,20,16.1,19.9]],["L",[6.9,19.9]],["L",[6.9,29]],["L",[10.9,29]],["C",[13.1,29.1,13.6,30.9]],["C",[14.1,32.7,14,35.2]],["L",[14,52.9]],["C",[14.1,58.7,15.7,62.3]],["C",[17.3,65.9,19,67.8]],["C",[20.8,69.7,21.6,70.1]],["C",[20.8,70.5,19,72.4]],["C",[17.3,74.2,15.7,77.8]],["C",[14.1,81.5,14,87.2]],["L",[14,104.9]],["C",[14.1,107.5,13.6,109.3]],["C",[13.1,111,10.9,111.1]],["L",[6.9,111.1]],["L",[6.9,120.2]],["L",[16.1,120.2]],["C",[17.7,120.2,19.6,118.6]],["C",[21.6,117,23,114]],["C",[24.5,111,24.6,107]],["L",[24.6,88.8]],["C",[24.6,83.2,26.5,79.3]],["C",[28.4,75.4,32.1,73.7]],["L",[32.1,66.4]]]);
		this.motifs.set("~",[["M",[44.6,67.4]],["C",[44.1,68.8,43.3,70.6]],["C",[42.5,72.4,41.4,73.8]],["C",[40.3,75.2,39.2,75.3]],["C",[37.1,75.2,34.5,73.7]],["C",[31.9,72.3,29.8,70.5]],["C",[27.2,68.5,24.3,67]],["C",[21.4,65.5,18.6,65.4]],["C",[15.9,65.5,13.7,67.1]],["C",[11.5,68.6,9.7,70.9]],["C",[7.8,73.2,6.3,75.6]],["C",[4.6,78.1,3.3,79.9]],["C",[8.3,84.3,13.2,88.7]],["C",[13.8,87.2,14.7,85.5]],["C",[15.6,83.7,16.6,82.4]],["C",[17.7,81.1,18.8,81]],["C",[20.8,81.2,23.2,82.8]],["C",[25.7,84.4,28.6,86.3]],["C",[30.9,87.9,33.5,89.3]],["C",[36.1,90.6,39.3,90.7]],["C",[42.9,90.6,45.8,88.2]],["C",[48.6,85.8,50.8,82.5]],["C",[52.9,79.3,54.5,76.4]],["L",[44.6,67.4]]]);
		this.motifs.set(" ",[]);
		this.motifs.set("ˆ",[["M",[3,41.7]],["C",[6,45,9,48.3]],["C",[14.5,43.1,20,37.9]],["C",[25.5,43.1,31,48.3]],["L",[37,41.7]],["L",[20,26.3]],["C",[11.5,34,3,41.7]]]);
		this.motifs.set("˜",[["M",[9.2,43.3]],["C",[9.7,41.7,10.6,40.5]],["C",[11.7,39.3,13.5,39.2]],["C",[14.9,39.2,16.7,39.9]],["C",[18.3,40.5,20.1,41.4]],["C",[21.9,42.2,23.7,42.9]],["C",[25.4,43.6,27,43.6]],["C",[30.8,43.5,33.3,41.4]],["C",[35.7,39.2,37.2,36]],["C",[38.6,32.8,39.1,29.5]],["L",[30.8,29.5]],["C",[30.1,31.2,29.1,32.4]],["C",[28.1,33.7,26.1,33.7]],["C",[24.9,33.7,23.2,33]],["L",[19.6,31.5]],["C",[17.7,30.7,15.7,30.1]],["C",[13.7,29.5,11.9,29.4]],["C",[8.5,29.5,6.2,31.7]],["C",[3.8,33.9,2.5,37.1]],["C",[1.3,40.3,1,43.3]],["L",[9.2,43.3]]]);
		this.motifs.set("–",[["M",[0,65.9]],["L",[0,77.5]],["L",[50,77.5]],["L",[50,65.9]],["L",[0,65.9]]]);
		this.motifs.set("—",[["M",[0,65.9]],["L",[0,77.5]],["L",[100,77.5]],["L",[100,65.9]],["L",[0,65.9]]]);
		this.motifs.set("‘",[["M",[15.9,57.8]],["C",[21.3,42.6,26.7,27.4]],["L",[17.4,26.3]],["C",[10.2,41.4,3,56.4]],["L",[15.9,57.8]]]);
		this.motifs.set("’",[["M",[13.9,26.3]],["C",[8.5,41.5,3,56.7]],["L",[12.3,57.8]],["C",[19.5,42.8,26.7,27.8]],["L",[13.9,26.3]]]);
		this.motifs.set("‚",[["M",[13.9,88.1]],["C",[8.5,103.3,3,118.5]],["L",[12.3,119.6]],["C",[19.5,104.6,26.7,89.6]],["L",[13.9,88.1]]]);
		this.motifs.set("“",[["M",[35,57.8]],["L",[45.8,27.4]],["L",[36.5,26.3]],["L",[22.1,56.4]],["L",[35,57.8]],["M",[15.9,57.8]],["C",[21.3,42.6,26.7,27.5]],["L",[17.4,26.3]],["C",[10.2,41.4,3,56.4]],["L",[15.9,57.8]]]);
		this.motifs.set("”",[["M",[13.9,26.3]],["C",[8.5,41.5,3,56.7]],["L",[12.3,57.8]],["L",[26.7,27.8]],["L",[13.9,26.3]],["M",[33,26.3]],["C",[27.6,41.5,22.1,56.7]],["L",[31.4,57.8]],["C",[38.6,42.8,45.8,27.8]],["L",[33,26.3]]]);
		this.motifs.set("„",[["M",[13.9,88.1]],["C",[8.5,103.3,3,118.5]],["L",[12.3,119.6]],["C",[19.5,104.6,26.7,89.6]],["L",[13.9,88.1]],["M",[33,88.1]],["C",[27.6,103.3,22.1,118.5]],["L",[31.4,119.6]],["L",[45.8,89.6]],["L",[33,88.1]]]);
		this.motifs.set("†",[["M",[22.3,18.9]],["L",[22.3,42.9]],["L",[6.1,42.9]],["L",[6.1,54.6]],["L",[22.3,54.6]],["L",[22.3,113.4]],["L",[35.4,113.4]],["L",[35.4,54.6]],["L",[51.6,54.6]],["L",[51.6,42.9]],["L",[35.4,42.9]],["L",[35.4,18.9]],["L",[22.3,18.9]]]);
		this.motifs.set("‡",[["M",[22.3,18.9]],["L",[22.3,40]],["L",[6.1,40]],["L",[6.1,51.6]],["L",[22.3,51.6]],["L",[22.3,64.9]],["L",[6.1,64.9]],["L",[6.1,76.5]],["L",[22.3,76.5]],["L",[22.3,113.3]],["L",[35.4,113.3]],["L",[35.4,76.5]],["L",[51.6,76.5]],["L",[51.6,64.9]],["L",[35.4,64.9]],["L",[35.4,51.6]],["L",[51.6,51.6]],["L",[51.6,40]],["L",[35.4,40]],["L",[35.4,18.9]],["L",[22.3,18.9]]]);
		this.motifs.set("•",[["M",[28.8,84.8]],["C",[34,84.8,38.3,82.3]],["C",[42.5,79.8,45.1,75.5]],["C",[47.7,71.3,47.7,66]],["C",[47.7,60.7,45.1,56.5]],["C",[42.6,52.2,38.4,49.7]],["C",[34.1,47.2,28.8,47.1]],["C",[23.5,47.2,19.2,49.7]],["C",[15,52.2,12.5,56.5]],["C",[10,60.7,10,66]],["C",[10.1,71.3,12.6,75.5]],["C",[15.1,79.8,19.3,82.3]],["C",[23.6,84.8,28.8,84.8]]]);
		this.motifs.set("…",[["M",[16.7,87.6]],["C",[12.9,87.7,10.4,90.2]],["C",[7.9,92.6,7.8,96.4]],["C",[7.9,100.2,10.4,102.7]],["C",[12.9,105.3,16.7,105.4]],["C",[20.5,105.3,23,102.7]],["C",[25.5,100.2,25.6,96.4]],["C",[25.5,92.6,23,90.2]],["C",[20.5,87.7,16.7,87.6]],["M",[50,87.9]],["C",[46.2,88,43.8,90.5]],["C",[41.2,92.9,41.1,96.7]],["C",[41.2,100.5,43.8,103]],["C",[46.2,105.6,50,105.7]],["C",[53.8,105.6,56.3,103]],["C",[58.8,100.5,58.9,96.7]],["C",[58.8,92.9,56.3,90.5]],["C",[53.8,88,50,87.9]],["M",[83.3,87.9]],["C",[79.5,88,77,90.5]],["C",[74.5,92.9,74.4,96.7]],["C",[74.5,100.5,77,103]],["C",[79.5,105.6,83.3,105.7]],["C",[87.1,105.6,89.6,103]],["C",[92.1,100.5,92.2,96.7]],["C",[92.1,92.9,89.6,90.5]],["C",[87.1,88,83.3,87.9]]]);
		this.motifs.set("‰",[["M",[20.2,26.3]],["C",[15,26.4,11,28.7]],["C",[7,31,4.7,35]],["C",[2.3,39,2.3,44.2]],["C",[2.3,49.4,4.6,53.4]],["C",[7,57.4,11,59.6]],["C",[15,61.9,20.2,62]],["C",[25.4,61.9,29.4,59.6]],["C",[33.4,57.4,35.7,53.4]],["C",[38,49.4,38.1,44.2]],["C",[38,39,35.7,35]],["C",[33.4,31,29.3,28.7]],["C",[25.3,26.4,20.2,26.3]],["M",[20.2,34.4]],["C",[22.7,34.5,24.5,35.9]],["C",[26.3,37.4,27.2,39.6]],["C",[28.2,41.9,28.2,44.2]],["C",[28.2,46.5,27.2,48.7]],["C",[26.3,50.9,24.5,52.4]],["C",[22.7,53.8,20.2,53.9]],["C",[17.7,53.8,15.9,52.4]],["C",[14.1,50.9,13.2,48.7]],["C",[12.2,46.5,12.2,44.2]],["C",[12.2,41.9,13.2,39.6]],["C",[14.1,37.4,15.9,35.9]],["C",[17.7,34.5,20.2,34.4]],["M",[57,25.7]],["L",[16.5,103.3]],["C",[19.9,105.1,23.4,106.8]],["L",[63.8,29.1]],["C",[60.4,27.5,57,25.7]],["M",[60.4,70]],["C",[55.2,70.1,51.2,72.4]],["C",[47.2,74.7,44.9,78.7]],["C",[42.5,82.7,42.5,87.9]],["C",[42.5,93.1,44.8,97.1]],["C",[47.2,101.1,51.2,103.4]],["C",[55.2,105.7,60.4,105.7]],["C",[65.6,105.7,69.6,103.4]],["C",[73.6,101.1,76,97.1]],["C",[78.3,93.1,78.3,87.9]],["C",[78.3,82.7,75.9,78.7]],["C",[73.6,74.7,69.6,72.4]],["C",[65.6,70.1,60.4,70]],["M",[60.4,78.1]],["C",[62.9,78.2,64.7,79.6]],["C",[66.5,81.1,67.4,83.4]],["C",[68.4,85.6,68.4,87.9]],["C",[68.4,90.3,67.4,92.5]],["C",[66.5,94.7,64.7,96.2]],["C",[62.9,97.6,60.4,97.6]],["C",[57.9,97.6,56.1,96.2]],["C",[54.3,94.7,53.4,92.5]],["C",[52.4,90.3,52.4,87.9]],["C",[52.4,85.6,53.4,83.4]],["C",[54.3,81.1,56.1,79.6]],["C",[57.9,78.2,60.4,78.1]],["M",[99.9,70]],["C",[94.7,70.1,90.7,72.4]],["C",[86.7,74.7,84.4,78.7]],["C",[82,82.7,82,87.9]],["C",[82,93.1,84.3,97.1]],["C",[86.7,101.1,90.7,103.4]],["C",[94.7,105.7,99.9,105.7]],["C",[105.1,105.7,109.1,103.4]],["C",[113.1,101.1,115.5,97.1]],["C",[117.8,93.1,117.8,87.9]],["C",[117.8,82.7,115.4,78.7]],["C",[113.1,74.7,109.1,72.4]],["C",[105.1,70.1,99.9,70]],["M",[99.9,78.1]],["C",[102.4,78.2,104.2,79.6]],["C",[106,81.1,106.9,83.4]],["C",[107.9,85.6,107.9,87.9]],["C",[107.9,90.3,106.9,92.5]],["C",[106,94.7,104.2,96.2]],["C",[102.4,97.6,99.9,97.6]],["C",[97.4,97.6,95.6,96.2]],["C",[93.8,94.7,92.9,92.5]],["C",[91.9,90.3,91.9,87.9]],["C",[91.9,85.6,92.9,83.4]],["C",[93.8,81.1,95.6,79.6]],["C",[97.4,78.2,99.9,78.1]]]);
		this.motifs.set("‹",[["M",[13.9,71.7]],["L",[26.3,53]],["L",[17.7,47.4]],["L",[1.8,71.7]],["L",[17.7,95.7]],["L",[26.4,89.9]],["L",[13.9,71.7]]]);
		this.motifs.set("›",[["M",[5,89.9]],["L",[13.7,95.7]],["L",[29.6,71.7]],["L",[13.7,47.4]],["C",[9.4,50.2,5.1,53]],["L",[17.5,71.7]],["L",[5,89.9]]]);
		this.motifs.set("™",[["M",[38.2,28.3]],["L",[4.2,28.3]],["L",[4.2,35.8]],["L",[16.9,35.8]],["L",[16.9,70.4]],["L",[25.5,70.4]],["L",[25.5,35.8]],["L",[38.2,35.8]],["L",[38.2,28.3]],["M",[95.8,28.3]],["L",[81,28.3]],["C",[75.9,42.1,70.8,55.8]],["L",[70.6,55.8]],["C",[65.7,42.1,60.8,28.3]],["L",[45.9,28.3]],["L",[45.9,70.4]],["L",[54.5,70.4]],["L",[54.5,36.9]],["L",[54.7,36.9]],["L",[66.5,70.4]],["L",[74.8,70.4]],["L",[87,36.9]],["L",[87.2,36.9]],["L",[87.2,70.4]],["L",[95.8,70.4]],["L",[95.8,28.3]]]);
	}
	,initializeWidths: function() {
		this.widths.set(" ",28.9);
		this.widths.set("!",32.5);
		this.widths.set("\"",48.8);
		this.widths.set("#",57.8);
		this.widths.set("$",57.8);
		this.widths.set("%",77.2);
		this.widths.set("&",70.2);
		this.widths.set("'",29.6);
		this.widths.set("(",27.1);
		this.widths.set(")",27.1);
		this.widths.set("*",41.7);
		this.widths.set("+",57.8);
		this.widths.set(",",28.9);
		this.widths.set("-",33);
		this.widths.set(".",28.9);
		this.widths.set("/",53.9);
		this.widths.set("0",57.8);
		this.widths.set("1",57.8);
		this.widths.set("2",57.8);
		this.widths.set("3",57.8);
		this.widths.set("4",57.8);
		this.widths.set("5",57.8);
		this.widths.set("6",57.8);
		this.widths.set("7",57.8);
		this.widths.set("8",57.8);
		this.widths.set("9",57.8);
		this.widths.set(":",28.9);
		this.widths.set(";",28.9);
		this.widths.set("<",57.8);
		this.widths.set("=",57.8);
		this.widths.set(">",57.8);
		this.widths.set("?",48.7);
		this.widths.set("@",97.5);
		this.widths.set("A",67.6);
		this.widths.set("B",55.3);
		this.widths.set("C",60.1);
		this.widths.set("D",64.6);
		this.widths.set("E",48.8);
		this.widths.set("F",46.3);
		this.widths.set("G",73.9);
		this.widths.set("H",67.4);
		this.widths.set("I",25.4);
		this.widths.set("J",38.9);
		this.widths.set("K",62);
		this.widths.set("L",40.2);
		this.widths.set("M",83.6);
		this.widths.set("N",75.9);
		this.widths.set("O",78.2);
		this.widths.set("P",52.8);
		this.widths.set("Q",78.2);
		this.widths.set("R",55.8);
		this.widths.set("S",52.6);
		this.widths.set("T",45.1);
		this.widths.set("U",66);
		this.widths.set("V",63.9);
		this.widths.set("W",97.7);
		this.widths.set("X",62.3);
		this.widths.set("Y",58.7);
		this.widths.set("Z",57.5);
		this.widths.set("[",28.8);
		this.widths.set("\\",53.9);
		this.widths.set("]",28.8);
		this.widths.set("^",57.8);
		this.widths.set("_",50);
		this.widths.set("`",38);
		this.widths.set("{",38.9);
		this.widths.set("|",53.8);
		this.widths.set("}",38.9);
		this.widths.set("~",57.8);
		this.widths.set(" ",28.9);
		this.widths.set("ˆ",40);
		this.widths.set("˜",40);
		this.widths.set("–",50);
		this.widths.set("—",100);
		this.widths.set("‘",29.6);
		this.widths.set("’",29.6);
		this.widths.set("‚",29.6);
		this.widths.set("“",48.8);
		this.widths.set("”",48.8);
		this.widths.set("„",48.8);
		this.widths.set("†",57.7);
		this.widths.set("‡",57.7);
		this.widths.set("•",57.7);
		this.widths.set("…",100);
		this.widths.set("‰",120);
		this.widths.set("‹",31.4);
		this.widths.set("›",31.4);
		this.widths.set("™",100);
	}
});
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
});
net.badimon.five3D.typography.VrdgRegular = function() {
	net.badimon.five3D.typography.Typography3D.call(this);
	this.initializeMotifs();
	this.initializeWidths();
	this.height = 120;
};
net.badimon.five3D.typography.VrdgRegular.__super__ = net.badimon.five3D.typography.Typography3D;
net.badimon.five3D.typography.VrdgRegular.prototype = $extend(net.badimon.five3D.typography.Typography3D.prototype,{
	initializeMotifs: function() {
		this.motifs.set("0",[["M",[36.2,100.2]],["C",[26.4,100.1,18.4,95.4]],["C",[10.5,90.7,5.8,82.9]],["C",[1.1,75,1,65.2]],["C",[1.1,55.4,5.8,47.5]],["C",[10.5,39.6,18.4,35]],["C",[26.4,30.3,36.2,30.2]],["C",[46,30.3,54,35]],["C",[62,39.6,66.7,47.5]],["C",[71.4,55.4,71.5,65.2]],["C",[71.4,75,66.7,82.9]],["C",[62,90.7,54,95.4]],["C",[46,100.1,36.2,100.2]],["M",[36.2,42]],["C",[29.7,42,24.6,45.1]],["C",[19.4,48.1,16.5,53.4]],["C",[13.4,58.6,13.4,65.2]],["C",[13.5,71.7,16.5,76.9]],["C",[19.6,82.1,24.7,85.2]],["C",[29.8,88.3,36.2,88.4]],["C",[42.6,88.3,47.8,85.2]],["C",[53,82.1,56.1,76.9]],["C",[59.1,71.7,59.2,65.2]],["C",[59.1,58.6,56.1,53.4]],["C",[53.1,48.1,47.9,45.1]],["C",[42.7,42,36.2,42]]]);
		this.motifs.set("1",[["M",[1,100.1]],["L",[1,30.1]],["L",[14.2,30.1]],["L",[14.2,100.1]],["L",[1,100.1]]]);
		this.motifs.set("2",[["M",[47.5,99.6]],["L",[1.6,99.6]],["L",[1.6,88.2]],["L",[27.5,62.7]],["C",[29.1,61.2,30.3,59.7]],["C",[31.5,58.2,32.4,56.7]],["C",[33.3,55.3,33.7,53.6]],["C",[34.1,52,34.1,50.1]],["C",[34.1,47.9,33.4,46.2]],["C",[32.7,44.5,31.3,43.2]],["C",[29.9,41.8,28.1,41.2]],["C",[26.4,40.6,24.2,40.6]],["C",[22,40.6,20.2,41.4]],["C",[18.5,42.1,17.1,43.6]],["C",[15.7,45.1,14.8,47]],["C",[14,49,13.7,51.3]],["L",[13.6,52.1]],["L",[1,50.2]],["L",[1.1,49.4]],["C",[1.4,47.3,2,45.3]],["C",[2.6,43.3,3.6,41.5]],["C",[4.5,39.7,5.8,38.1]],["C",[7,36.6,8.5,35.3]],["C",[10,33.9,11.8,32.9]],["C",[13.6,31.8,15.6,31.1]],["C",[17.7,30.4,19.9,30]],["C",[22.1,29.6,24.4,29.6]],["C",[26.7,29.6,28.8,29.9]],["C",[30.9,30.3,33,30.9]],["C",[35.1,31.5,36.9,32.5]],["C",[38.8,33.4,40.4,34.7]],["C",[42,36,43.3,37.6]],["C",[44.5,39.2,45.5,41.1]],["C",[46.5,43.1,46.9,45.2]],["C",[47.4,47.4,47.4,49.9]],["C",[47.4,51.6,47.2,53.1]],["C",[47,54.7,46.5,56.1]],["C",[46.1,57.5,45.6,58.9]],["C",[45,60.2,44.2,61.5]],["C",[43.5,62.8,42.6,64]],["C",[41.7,65.2,40.7,66.3]],["C",[39.7,67.4,38.7,68.6]],["C",[37.6,69.6,36.4,70.7]],["L",[18.6,87.7]],["L",[47.5,87.7]],["L",[47.5,99.6]]]);
		this.motifs.set("3",[["M",[25.6,99.9]],["C",[23.5,99.9,21.5,99.7]],["C",[19.5,99.5,17.6,99]],["C",[15.7,98.5,14,97.9]],["C",[12.2,97.1,10.6,96.2]],["C",[9,95.2,7.6,94]],["C",[6.3,92.8,5,91.2]],["C",[3.8,89.7,2.9,87.9]],["C",[1.9,86.1,1.2,84]],["L",[1,83.3]],["L",[12.8,79.6]],["L",[13,80.3]],["C",[13.6,82.1,14.6,83.7]],["C",[15.7,85.2,17.2,86.5]],["C",[18.8,87.8,20.8,88.4]],["C",[22.8,89,25.2,89]],["C",[26.3,89,27.3,88.9]],["C",[28.3,88.7,29.3,88.4]],["C",[30.4,88.1,31.3,87.6]],["C",[32.2,87.3,32.9,86.7]],["C",[33.7,86.1,34.4,85.4]],["C",[35,84.6,35.5,83.6]],["C",[36,82.7,36.2,81.5]],["C",[36.4,80.4,36.4,79]],["C",[36.4,77.6,36.1,76.3]],["C",[35.8,75.1,35.1,74.1]],["C",[34.4,73.1,33.5,72.3]],["C",[32.6,71.5,31.5,70.9]],["C",[30.4,70.3,29.2,69.9]],["C",[28,69.5,26.6,69.2]],["L",[23.9,68.8]],["L",[21.4,68.7]],["L",[17.8,68.7]],["L",[17.8,58.3]],["L",[21.5,58.3]],["L",[24,58.2]],["C",[25.2,58.1,26.3,57.9]],["C",[27.5,57.8,28.6,57.4]],["C",[29.6,57,30.6,56.5]],["C",[32.4,55.5,33.6,53.8]],["C",[34.1,52.9,34.4,51.8]],["C",[34.7,50.6,34.7,49.2]],["C",[34.7,48.2,34.5,47.4]],["C",[34.3,46.4,33.9,45.6]],["C",[33.5,44.8,33.1,44.1]],["C",[32.5,43.5,31.9,42.9]],["C",[31.3,42.4,30.5,41.9]],["C",[29.7,41.6,28.8,41.2]],["C",[27.9,40.9,27,40.8]],["C",[26.1,40.6,25.1,40.6]],["C",[23.2,40.6,21.7,41.2]],["C",[20.2,41.7,18.9,42.7]],["C",[17.7,43.8,16.8,45.2]],["C",[16,46.6,15.5,48.4]],["L",[15.3,49.1]],["L",[3.4,46.1]],["L",[3.6,45.4]],["C",[4.1,43.7,4.8,42.1]],["C",[5.6,40.6,6.5,39.1]],["C",[7.6,37.7,8.8,36.5]],["C",[10.1,35.3,11.5,34.2]],["C",[12.9,33.3,14.6,32.4]],["C",[16.2,31.6,18,31]],["C",[19.8,30.5,21.7,30.2]],["C",[23.6,29.9,25.6,29.9]],["C",[27.8,29.9,29.9,30.2]],["C",[32,30.5,33.9,31.1]],["C",[35.9,31.7,37.6,32.6]],["C",[39.3,33.5,40.8,34.6]],["C",[42.3,35.8,43.5,37.3]],["C",[44.7,38.7,45.5,40.4]],["C",[46.4,42.1,46.8,44.2]],["C",[47.2,46.2,47.2,48.5]],["C",[47.2,51.3,46.4,53.8]],["C",[45.6,56.2,43.9,58.3]],["C",[42.9,59.7,41.6,60.7]],["C",[40.3,61.9,38.8,62.6]],["L",[37.4,63.3]],["C",[38.1,63.6,38.8,63.8]],["C",[40.6,64.6,42.2,65.8]],["C",[43.8,66.9,45.1,68.3]],["C",[49,72.7,49,79.1]],["C",[49,81.6,48.5,84]],["C",[47.9,86.3,46.9,88.3]],["C",[45.9,90.2,44.6,91.8]],["C",[43.3,93.5,41.5,94.8]],["C",[39.9,96.1,38,97]],["C",[36.1,98,34,98.6]],["C",[31.9,99.3,29.8,99.6]],["C",[27.7,99.9,25.6,99.9]]]);
		this.motifs.set("A",[["M",[71.2,95.2]],["L",[39.8,29.9]],["L",[32,29.9]],["L",[1,95.2]],["C",[2.1,97.6,3.2,99.9]],["L",[69,99.9]],["C",[70.1,97.6,71.2,95.2]],["M",[22.7,84.8]],["L",[36.1,56.6]],["L",[49.6,84.8]],["L",[22.7,84.8]]]);
		this.motifs.set("B",[["M",[52.5,65.5]],["C",[52.4,64.5,52.6,63.1]],["C",[52.8,61.8,53.5,59.9]],["C",[54.3,57.8,54.8,55.7]],["C",[55.3,53.5,55.3,51.3]],["C",[55.3,49.3,54.4,45.8]],["C",[53.5,42.4,51.1,38.9]],["C",[48.6,35.4,44,33]],["C",[39.5,30.5,32.2,30.4]],["L",[1,30.4]],["L",[1,45.2]],["L",[31.9,45.2]],["C",[33.8,45.2,35.9,45.6]],["C",[38,45.9,39.4,46.9]],["C",[40.6,48.2,41.1,49.5]],["C",[41.7,50.9,41.8,52.2]],["C",[41.8,53.3,41.6,54.4]],["C",[41.4,55.6,40.7,56.8]],["C",[39.4,59.5,38.8,61.1]],["C",[38.3,62.7,38.2,63.7]],["C",[38,64.6,38,65.4]],["C",[38,66.3,38.4,68.1]],["C",[38.8,70,40.7,74.1]],["C",[41.4,75.4,41.6,76.5]],["C",[41.8,77.6,41.8,78.6]],["C",[41.7,80,41.1,81.3]],["C",[40.6,82.7,39.4,83.9]],["C",[38,85.1,35.9,85.4]],["C",[33.8,85.8,31.9,85.8]],["L",[1,85.8]],["L",[1,100.4]],["L",[32.2,100.4]],["C",[39.5,100.3,44,97.9]],["C",[48.6,95.4,51.1,91.9]],["C",[53.5,88.4,54.4,85]],["C",[55.3,81.5,55.3,79.5]],["C",[55.3,77.3,54.8,75.2]],["C",[54.3,73,53.5,70.9]],["C",[52.8,69,52.6,67.8]],["C",[52.4,66.5,52.5,65.5]]]);
		this.motifs.set("C",[["M",[36.4,99.8]],["C",[26.5,99.7,18.6,95]],["C",[10.5,90.3,5.8,82.4]],["C",[1.1,74.6,1,64.9]],["C",[1.1,55,5.8,47.1]],["C",[10.5,39.2,18.6,34.6]],["C",[26.5,29.9,36.4,29.8]],["C",[43.6,29.8,50.2,32.9]],["C",[56.9,35.9,63.4,42.2]],["L",[53.3,52.3]],["C",[48.8,47.8,44.6,45.8]],["C",[40.5,43.8,36.4,43.9]],["C",[30.6,43.9,25.9,46.7]],["C",[21.2,49.5,18.5,54.2]],["C",[15.7,59,15.7,64.9]],["C",[15.7,70.6,18.5,75.3]],["C",[21.2,80,25.9,82.8]],["C",[30.6,85.6,36.4,85.7]],["C",[40.5,85.7,44.6,83.8]],["C",[48.8,81.8,53.4,77.3]],["C",[58.4,82.3,63.5,87.3]],["C",[56.9,93.6,50.2,96.7]],["C",[43.6,99.8,36.4,99.8]]]);
		this.motifs.set("D",[["M",[1,99.8]],["L",[1,85.2]],["L",[20.1,85.2]],["C",[26.1,85.2,30.9,82.6]],["C",[35.7,79.9,38.6,75.4]],["C",[41.4,70.8,41.5,64.8]],["C",[41.4,58.7,38.6,54.2]],["C",[35.7,49.6,30.9,46.9]],["C",[26.1,44.3,20.1,44.3]],["L",[1,44.3]],["L",[1,29.8]],["L",[20.1,29.8]],["C",[30.3,29.9,38.6,34.4]],["C",[46.8,38.9,51.8,46.7]],["C",[56.6,54.6,56.8,64.8]],["C",[56.6,74.9,51.8,82.8]],["C",[46.8,90.6,38.6,95.2]],["C",[30.3,99.7,20.1,99.8]],["L",[1,99.8]]]);
		this.motifs.set("E",[["M",[55.2,44.8]],["L",[1,44.8]],["L",[1,30.3]],["L",[55.2,30.3]],["L",[55.2,44.8]],["M",[55.2,72.6]],["L",[1,72.6]],["L",[1,57.9]],["L",[55.2,57.9]],["L",[55.2,72.6]],["M",[55.2,100.3]],["L",[1,100.3]],["L",[1,85.7]],["L",[55.2,85.7]],["L",[55.2,100.3]]]);
		this.motifs.set("F",[["M",[67.8,44.3]],["L",[28.2,44.3]],["L",[28.2,57.4]],["L",[55.8,57.4]],["L",[55.8,72.1]],["L",[28.2,72.1]],["L",[28.2,99.8]],["L",[12.9,99.8]],["L",[12.9,72.1]],["L",[1,72.1]],["L",[1,57.4]],["L",[12.9,57.4]],["L",[12.9,29.8]],["L",[67.8,29.8]],["L",[67.8,44.3]]]);
		this.motifs.set("G",[["M",[36.2,100.4]],["C",[26.4,100.3,18.4,95.7]],["C",[10.5,91,5.8,83.1]],["C",[1.1,75.2,1,65.4]],["C",[1.1,55.6,5.9,47.7]],["C",[10.7,39.8,19.4,35.2]],["C",[28,30.5,39.4,30.4]],["L",[39.4,44.6]],["C",[30.2,44.7,24.5,48.4]],["C",[18.9,52.2,16.8,58.3]],["L",[71.5,58.3]],["L",[71.5,65.4]],["C",[71.4,75.2,66.6,83.1]],["C",[61.9,91,53.9,95.7]],["C",[45.9,100.3,36.2,100.4]],["M",[16.8,72.5]],["C",[19,78.7,24.2,82.5]],["C",[29.3,86.2,36.2,86.3]],["C",[43,86.2,48.1,82.5]],["C",[53.2,78.7,55.5,72.5]],["L",[16.8,72.5]]]);
		this.motifs.set("H",[["M",[44.9,99.9]],["L",[60.5,99.9]],["L",[60.5,57.4]],["L",[16.3,57.4]],["L",[16.3,29.9]],["L",[1,29.9]],["L",[1,99.9]],["L",[16.3,99.9]],["L",[16.3,71.8]],["L",[44.9,71.8]],["L",[44.9,99.9]],["M",[44.9,29.9]],["L",[44.9,44.6]],["L",[60.5,44.6]],["L",[60.5,29.9]],["L",[44.9,29.9]]]);
		this.motifs.set("I",[["M",[16.4,100]],["L",[1,100]],["L",[1,30]],["L",[16.4,30]],["L",[16.4,100]]]);
		this.motifs.set("J",[["M",[1,103.9]],["C",[5.6,103.8,7.6,102.4]],["C",[9.5,101.1,9.5,99]],["L",[9.5,29.6]],["L",[25.8,29.6]],["L",[25.8,99]],["C",[25.7,104.7,22.7,109.4]],["C",[19.5,114,14,116.7]],["C",[8.4,119.5,1,119.6]],["L",[1,103.9]]]);
		this.motifs.set("K",[["M",[37.5,60.9]],["C",[47.3,48.3,57.1,35.8]],["C",[56.5,33.1,56,30.4]],["L",[45.4,30.4]],["L",[15.2,69.1]],["L",[15.2,30.4]],["L",[1,30.4]],["L",[1,98.2]],["L",[7.3,99.3]],["C",[18,85.7,28.8,72.1]],["L",[51.1,100.4]],["L",[61.8,92]],["L",[37.5,60.9]]]);
		this.motifs.set("L",[["M",[55.1,100.1]],["L",[1,100.1]],["L",[1,30.1]],["L",[16.1,30.1]],["L",[16.1,85.5]],["L",[55.1,85.5]],["L",[55.1,100.1]]]);
		this.motifs.set("M",[["M",[16.2,100.4]],["L",[1,100.4]],["L",[1,30.4]],["L",[16.2,30.4]],["L",[16.2,100.4]],["M",[43.9,100.4]],["L",[28.7,100.4]],["L",[28.7,30.4]],["L",[43.9,30.4]],["L",[43.9,100.4]],["M",[71.6,100.4]],["L",[56.3,100.4]],["L",[56.3,30.4]],["L",[71.6,30.4]],["L",[71.6,100.4]]]);
		this.motifs.set("N",[["M",[63.4,100.8]],["L",[57,101.8]],["C",[36.5,79.9,16.1,58]],["L",[16.1,100]],["L",[1,100]],["L",[1,29.2]],["L",[7.5,28.3]],["L",[48.4,72.1]],["L",[48.4,30.2]],["L",[63.4,30.2]],["L",[63.4,100.8]]]);
		this.motifs.set("O",[["M",[36.2,100.3]],["C",[26.4,100.2,18.5,95.5]],["C",[10.5,90.8,5.8,83]],["C",[1.1,75,1,65.3]],["C",[1.1,55.5,5.8,47.6]],["C",[10.5,39.7,18.5,35.1]],["C",[26.4,30.4,36.2,30.3]],["C",[45.9,30.4,53.9,35.1]],["C",[61.9,39.7,66.6,47.6]],["C",[71.4,55.5,71.5,65.3]],["C",[71.4,75,66.6,83]],["C",[61.9,90.8,53.9,95.5]],["C",[45.9,100.2,36.2,100.3]],["M",[36.2,44.5]],["C",[30.4,44.5,25.8,47.3]],["C",[21.2,50.1,18.6,54.8]],["C",[15.8,59.5,15.8,65.3]],["C",[15.8,71.1,18.6,75.8]],["C",[21.2,80.5,25.8,83.3]],["C",[30.4,86,36.2,86.1]],["C",[42,86,46.7,83.3]],["C",[51.3,80.5,54,75.8]],["C",[56.7,71.1,56.8,65.3]],["C",[56.7,59.5,54,54.8]],["C",[51.3,50.1,46.7,47.3]],["C",[42,44.5,36.2,44.5]]]);
		this.motifs.set("P",[["M",[13,70.3]],["L",[13,58.2]],["L",[22.1,58.2]],["C",[25.5,58.1,27.8,55.9]],["C",[30.1,53.6,30.2,50.2]],["C",[30.1,46.8,27.8,44.5]],["C",[25.5,42.3,22.1,42.2]],["L",[13,42.2]],["L",[13,30.3]],["L",[22.1,30.3]],["C",[27.6,30.4,32.3,33]],["C",[37,35.6,39.8,40.1]],["C",[42.6,44.6,42.7,50.2]],["C",[42.6,55.7,39.8,60.3]],["C",[37,64.8,32.3,67.5]],["C",[27.6,70.2,22.1,70.3]],["L",[13,70.3]]]);
		this.motifs.set("Q",[["M",[75.9,114.8]],["L",[38.5,114.8]],["L",[38.5,100.6]],["L",[37.5,100.7]],["L",[36.6,100.7]],["C",[26.6,100.6,18.6,95.8]],["C",[10.5,91.1,5.8,83.1]],["C",[1.1,75.1,1,65.3]],["C",[1.1,55.3,5.8,47.3]],["C",[10.5,39.4,18.6,34.6]],["C",[26.6,29.9,36.6,29.8]],["C",[46.4,29.9,54.5,34.6]],["C",[62.5,39.4,67.3,47.3]],["C",[72.2,55.3,72.3,65.3]],["C",[72.2,74.7,67.8,82.4]],["C",[63.4,90.1,56,95]],["C",[48.5,99.9,39.2,100.6]],["L",[75.9,100.6]],["L",[75.9,114.8]],["M",[36.6,44.2]],["C",[30.7,44.2,26.1,47.1]],["C",[21.4,49.9,18.7,54.6]],["C",[15.9,59.4,15.9,65.3]],["C",[15.9,71.1,18.7,75.8]],["C",[21.4,80.6,26.1,83.4]],["C",[30.7,86.2,36.6,86.3]],["C",[42.5,86.2,47.2,83.4]],["C",[51.9,80.6,54.6,75.8]],["C",[57.4,71.1,57.5,65.3]],["C",[57.4,59.4,54.6,54.6]],["C",[51.9,49.9,47.2,47.1]],["C",[42.5,44.2,36.6,44.2]]]);
		this.motifs.set("R",[["M",[61.5,91.7]],["L",[50.6,100.4]],["C",[39.5,86.1,28.4,71.9]],["L",[7.2,99.3]],["L",[1,98.2]],["L",[1,30.4]],["L",[55.5,30.4]],["C",[56.2,33.3,56.9,36.1]],["L",[37.3,60.8]],["L",[61.5,91.7]],["M",[34.1,44.5]],["L",[14.8,44.5]],["L",[14.8,69.2]],["C",[24.5,56.8,34.1,44.5]]]);
		this.motifs.set("S",[["M",[1.2,88.2]],["C",[6.2,86,8.3,84.2]],["C",[10.5,82.4,10.5,79.6]],["C",[10.5,78.4,10.2,77.1]],["C",[9.9,75.8,9.3,74.6]],["C",[6.3,68.1,3.4,61.7]],["C",[2.1,59.3,1.6,56.7]],["C",[1,54.2,1,51.7]],["C",[0.9,44.6,5,39.6]],["C",[9,34.4,18,30.4]],["C",[20.8,36.4,23.6,42.4]],["C",[20.2,43.9,18.2,45.2]],["C",[16.1,46.4,15.2,47.9]],["C",[14.3,49.3,14.3,51.3]],["C",[14.3,52.4,14.5,53.6]],["C",[14.7,54.8,15.3,55.9]],["C",[18.3,62.5,21.3,69.1]],["C",[23.7,73.9,23.7,79.3]],["C",[23.7,86.3,19.6,91.3]],["C",[15.5,96.3,6.7,100.4]],["C",[3.9,94.3,1.2,88.2]]]);
		this.motifs.set("T",[["M",[66.4,70.8]],["L",[41.1,70.8]],["L",[41.1,100.1]],["L",[26.4,100.1]],["L",[26.4,70.8]],["L",[1,70.8]],["L",[1,56.8]],["L",[26.4,56.8]],["L",[26.4,30.1]],["L",[41.1,30.1]],["L",[41.1,56.8]],["L",[66.4,56.8]],["L",[66.4,70.8]]]);
		this.motifs.set("U",[["M",[32.7,100.4]],["C",[23.9,100.3,16.7,96.3]],["C",[9.6,92.3,5.4,84.9]],["C",[1.1,77.5,1,67.3]],["L",[1,30.4]],["L",[15.9,30.4]],["L",[15.9,67.3]],["C",[16,73.2,18.1,77.3]],["C",[20.2,81.5,24,83.7]],["C",[27.8,85.9,32.7,85.9]],["C",[37.5,85.9,41.3,83.7]],["C",[45.1,81.5,47.2,77.3]],["C",[49.4,73.2,49.4,67.3]],["L",[49.4,30.4]],["L",[64.5,30.4]],["L",[64.5,67.3]],["C",[64.4,77.5,60.2,84.9]],["C",[55.9,92.3,48.7,96.3]],["C",[41.5,100.3,32.7,100.4]]]);
		this.motifs.set("V",[["M",[73.7,30.2]],["L",[40.6,99.3]],["C",[37.6,99.8,34.7,100.3]],["L",[1,30.2]],["L",[17.4,30.2]],["L",[37.4,73.1]],["C",[47.3,51.6,57.2,30.2]],["L",[73.7,30.2]]]);
		this.motifs.set("W",[["M",[34.9,88.7]],["L",[17.2,30.3]],["L",[1,30.3]],["L",[25.2,100.3]],["L",[31.6,98.9]],["C",[33.3,93.8,34.9,88.7]],["M",[86.9,30.3]],["L",[70.7,30.3]],["C",[65.2,48.5,59.6,66.7]],["L",[47.7,30.3]],["L",[40.5,30.3]],["L",[36.9,41.4]],["L",[56.3,100.3]],["C",[59.5,99.6,62.7,98.9]],["L",[86.9,30.3]]]);
		this.motifs.set("X",[["M",[41.1,65]],["C",[52.6,50.3,64.1,35.7]],["C",[63.4,32.8,62.7,30]],["L",[51.5,30]],["C",[42,42,32.6,54.1]],["L",[13.6,30]],["L",[2.5,30]],["C",[1.8,32.8,1,35.7]],["C",[12.5,50.3,23.9,65]],["C",[12.5,79.6,1,94.2]],["C",[1.8,97.1,2.5,100]],["L",[13.6,100]],["L",[32.6,75.9]],["C",[42,87.9,51.5,100]],["L",[62.7,100]],["L",[64.1,94.2]],["C",[52.6,79.6,41.1,65]]]);
		this.motifs.set("Y",[["M",[62.5,30.5]],["L",[28.1,100.5]],["L",[14.6,100.5]],["C",[19.9,90,25.2,79.5]],["L",[1,30.5]],["L",[15,30.5]],["L",[31.8,65.8]],["L",[48.6,30.5]],["L",[62.5,30.5]]]);
		this.motifs.set("Z",[["M",[63.9,36.1]],["L",[25.7,85.5]],["L",[63.2,85.5]],["L",[63.2,100.1]],["L",[2.1,100.1]],["C",[1.6,97,1,94]],["L",[39,44.6]],["L",[3.1,44.6]],["L",[3.1,30.1]],["L",[62.9,30.1]],["C",[63.4,33.1,63.9,36.1]]]);
		this.motifs.set("a",[["M",[275.8,25.1]],["L",[275.9,25]],["C",[275.9,24.9,276,24.9]],["L",[279.3,24.9]],["L",[279.5,25]],["C",[279.6,25,279.6,25.1]],["L",[279.6,33.1]],["C",[279.6,33.2,279.6,33.2]],["C",[279.7,33.3,279.8,33.3]],["L",[286.7,33.3]],["L",[286.9,33.2]],["C",[286.9,33.2,286.9,33.1]],["L",[286.9,25.1]],["C",[286.9,25,287,25]],["L",[287.2,24.9]],["L",[290.5,24.9]],["C",[290.6,24.9,290.6,25]],["C",[290.7,25,290.7,25.1]],["L",[290.7,45.1]],["C",[290.7,45.2,290.6,45.3]],["C",[290.6,45.3,290.5,45.3]],["L",[287.2,45.3]],["C",[287.1,45.3,287,45.3]],["C",[286.9,45.2,286.9,45.1]],["L",[286.9,37.2]],["C",[286.9,37.1,286.9,37.1]],["L",[286.7,37]],["L",[279.8,37]],["L",[279.6,37.1]],["C",[279.6,37.1,279.6,37.2]],["L",[279.6,45.1]],["C",[279.6,45.2,279.5,45.3]],["C",[279.4,45.3,279.3,45.3]],["L",[276,45.3]],["C",[275.9,45.3,275.9,45.3]],["L",[275.8,45.1]],["L",[275.8,25.1]],["M",[273,33.8]],["C",[273,33.6,272.9,33.6]],["C",[272.9,33.5,272.8,33.5]],["L",[267.9,33.5]],["C",[267.8,33.5,267.8,33.4]],["C",[267.7,33.4,267.7,33.3]],["L",[267.7,28.1]],["C",[267.7,27.9,267.7,27.8]],["L",[267.5,27.8]],["L",[264.6,27.8]],["C",[264.5,27.8,264.4,27.8]],["C",[264.3,27.9,264.3,28.1]],["L",[264.3,33.3]],["C",[264.3,33.4,264.3,33.4]],["C",[264.2,33.5,264.1,33.5]],["L",[259.3,33.5]],["C",[259.2,33.5,259.2,33.6]],["C",[259.1,33.6,259.1,33.8]],["L",[259.1,36.6]],["C",[259.1,36.7,259.2,36.8]],["C",[259.2,36.8,259.3,36.8]],["L",[264.1,36.8]],["C",[264.2,36.8,264.3,36.9]],["C",[264.3,36.9,264.3,37]],["L",[264.3,42.1]],["C",[264.3,42.2,264.4,42.2]],["C",[264.5,42.3,264.6,42.3]],["L",[267.5,42.3]],["L",[267.7,42.2]],["C",[267.7,42.2,267.7,42.1]],["L",[267.7,37]],["C",[267.7,36.9,267.8,36.9]],["C",[267.8,36.8,267.9,36.8]],["L",[272.8,36.8]],["C",[272.9,36.8,272.9,36.8]],["L",[273,36.6]],["L",[273,33.8]],["M",[248.8,99.6]],["C",[239,99.5,231.1,94.9]],["C",[223.2,90.2,218.5,82.4]],["C",[213.8,74.6,213.7,64.9]],["C",[213.8,55.3,218.4,47.8]],["C",[223,40.1,231.1,35.5]],["C",[239.2,31,249.6,30.3]],["L",[249.6,40.5]],["C",[240.6,41.2,234.5,45.3]],["C",[228.4,49.4,225.8,56.7]],["C",[225.2,58.3,224.7,59.9]],["L",[283.6,59.9]],["L",[283.6,64.9]],["C",[283.5,74.6,278.9,82.4]],["C",[274.2,90.2,266.3,94.9]],["C",[258.5,99.5,248.8,99.6]],["M",[35.7,99.6]],["L",[32.3,99.6]],["L",[1,33]],["L",[1,31.8]],["L",[11.7,31.8]],["C",[22.8,55.9,33.9,79.9]],["C",[45,55.9,56.2,31.8]],["L",[67.2,31.8]],["L",[67.2,33]],["L",[35.7,99.6]],["M",[81.4,99.9]],["L",[78.4,99.4]],["L",[78.4,31.8]],["L",[132.3,31.8]],["L",[132.9,34.5]],["C",[122.2,48,111.5,61.6]],["L",[136.6,93.8]],["L",[129.1,99.6]],["L",[105.5,69.5]],["L",[81.4,99.9]],["M",[151.1,98.1]],["L",[151.1,88.3]],["L",[168,88.3]],["C",[175,88.2,180.5,85.2]],["C",[186,82.2,189.2,77]],["C",[192.3,71.7,192.4,64.9]],["C",[192.3,58.2,189.2,53]],["C",[186,47.8,180.5,44.8]],["C",[175,41.7,168,41.7]],["L",[151.1,41.7]],["L",[151.1,31.8]],["L",[168,31.8]],["C",[178,31.9,185.9,36.2]],["C",[193.8,40.6,198.4,48]],["C",[203,55.5,203.1,64.9]],["C",[203,74.3,198.4,81.8]],["C",[193.8,89.3,185.9,93.6]],["C",[178,98,168,98.1]],["L",[151.1,98.1]],["M",[88.4,41.7]],["L",[88.4,78]],["L",[116.4,41.7]],["L",[88.4,41.7]],["M",[224.5,69.9]],["C",[225.1,71.6,225.8,73.3]],["C",[227.5,78.2,231,81.8]],["C",[234.4,85.5,239,87.5]],["C",[243.6,89.6,248.8,89.6]],["C",[253.9,89.6,258.4,87.5]],["C",[262.9,85.5,266.4,81.9]],["C",[269.8,78.2,271.6,73.3]],["L",[272.8,69.9]],["L",[224.5,69.9]]]);
		this.motifs.set("d",[["M",[1,100.1]],["L",[1,89.8]],["L",[18.9,89.8]],["C",[26.3,89.7,32,86.5]],["C",[37.8,83.3,41.1,77.8]],["C",[44.4,72.2,44.5,65.1]],["C",[44.4,58,41.1,52.5]],["C",[37.8,47,32,43.8]],["C",[26.3,40.6,18.9,40.5]],["L",[1,40.5]],["L",[1,30.1]],["L",[18.9,30.1]],["C",[29.4,30.2,37.6,34.8]],["C",[45.9,39.4,50.8,47.3]],["C",[55.6,55.2,55.7,65.1]],["C",[55.6,75,50.8,82.9]],["C",[45.9,90.8,37.6,95.4]],["C",[29.4,100,18.9,100.1]],["L",[1,100.1]]]);
		this.motifs.set("g",[["M",[28.9,99.6]],["C",[19.1,99.5,11.2,94.8]],["C",[3.3,90.2,-1.5,82.3]],["C",[-6.2,74.5,-6.3,64.7]],["C",[-6.2,55,-1.5,47.4]],["C",[3.1,39.7,11.2,35.2]],["C",[19.4,30.5,29.8,29.9]],["L",[29.8,40]],["C",[20.8,40.5,14.6,44.7]],["C",[8.3,48.9,5.7,56.3]],["C",[5.2,58,4.6,59.6]],["L",[64.1,59.6]],["L",[64.1,64.7]],["C",[64,74.5,59.3,82.3]],["C",[54.6,90.2,46.6,94.8]],["C",[38.7,99.5,28.9,99.6]],["M",[4.6,69.6]],["C",[5.2,71.3,5.7,73.1]],["C",[7.6,78,11,81.7]],["C",[14.5,85.4,19.1,87.5]],["C",[23.7,89.6,28.9,89.6]],["C",[34.1,89.6,38.7,87.5]],["C",[43.3,85.5,46.7,81.8]],["C",[50.2,78.1,52.1,73.1]],["C",[52.6,71.3,53.2,69.6]],["L",[4.6,69.6]]]);
		this.motifs.set("h",[["M",[17.9,79.8]],["L",[18,79.6]],["C",[18,79.6,18.1,79.6]],["L",[21.6,79.6]],["C",[21.7,79.6,21.7,79.6]],["C",[21.8,79.7,21.8,79.8]],["L",[21.8,87.8]],["C",[21.8,87.9,21.8,87.9]],["C",[21.9,88,22,88]],["L",[28.9,88]],["C",[29.1,88,29.1,87.9]],["C",[29.1,87.9,29.1,87.8]],["L",[29.1,79.8]],["C",[29.1,79.7,29.2,79.6]],["C",[29.2,79.6,29.3,79.6]],["L",[32.8,79.6]],["C",[32.9,79.6,32.9,79.6]],["C",[33,79.7,33,79.8]],["L",[33,100]],["C",[33,100.1,32.9,100.2]],["C",[32.9,100.3,32.8,100.3]],["L",[29.3,100.3]],["C",[29.2,100.3,29.2,100.2]],["C",[29.1,100.1,29.1,100]],["L",[29.1,92.1]],["C",[29.1,92,29.1,91.9]],["C",[29.1,91.9,28.9,91.9]],["L",[22,91.9]],["L",[21.8,91.9]],["C",[21.8,92,21.8,92.1]],["L",[21.8,100]],["C",[21.8,100.1,21.7,100.2]],["C",[21.7,100.3,21.6,100.3]],["L",[18.1,100.3]],["C",[18,100.3,18,100.2]],["L",[17.9,100]],["L",[17.9,79.8]],["M",[15,88.5]],["C",[15,88.3,14.9,88.3]],["C",[14.9,88.3,14.8,88.3]],["L",[9.9,88.3]],["C",[9.8,88.3,9.8,88.2]],["C",[9.7,88.2,9.7,88.1]],["L",[9.7,82.9]],["C",[9.7,82.8,9.7,82.7]],["L",[9.5,82.6]],["L",[6.6,82.6]],["L",[6.4,82.7]],["C",[6.4,82.8,6.4,82.9]],["L",[6.4,88.1]],["C",[6.4,88.2,6.3,88.2]],["C",[6.3,88.3,6.2,88.3]],["L",[1.2,88.3]],["C",[1.1,88.3,1.1,88.3]],["C",[1,88.3,1,88.5]],["L",[1,91.5]],["C",[1,91.6,1.1,91.7]],["C",[1.1,91.7,1.2,91.7]],["L",[6.2,91.7]],["C",[6.3,91.7,6.3,91.7]],["C",[6.4,91.8,6.4,91.9]],["L",[6.4,97.1]],["C",[6.4,97.2,6.4,97.2]],["L",[6.6,97.3]],["L",[9.5,97.3]],["C",[9.6,97.3,9.7,97.2]],["C",[9.7,97.2,9.7,97.1]],["L",[9.7,91.9]],["C",[9.7,91.8,9.8,91.7]],["C",[9.8,91.7,9.9,91.7]],["L",[14.8,91.7]],["C",[14.9,91.7,14.9,91.7]],["L",[15,91.5]],["L",[15,88.5]]]);
		this.motifs.set("r",[["M",[4.1,100.2]],["L",[1,99.6]],["L",[1,30.1]],["L",[56.3,30.1]],["L",[57,33]],["L",[35,60.9]],["L",[60.7,93.7]],["L",[53,99.8]],["L",[28.7,68.9]],["L",[4.1,100.2]],["M",[11.2,40.2]],["L",[11.2,77.6]],["L",[40.1,40.2]],["L",[11.2,40.2]]]);
		this.motifs.set("t",[["M",[15,91.1]],["C",[15,90.9,14.9,90.9]],["C",[14.9,90.9,14.8,90.9]],["L",[9.9,90.9]],["C",[9.8,90.9,9.8,90.8]],["C",[9.7,90.8,9.7,90.7]],["L",[9.7,85.5]],["C",[9.7,85.4,9.7,85.3]],["L",[9.5,85.2]],["L",[6.6,85.2]],["L",[6.4,85.3]],["C",[6.4,85.4,6.4,85.5]],["L",[6.4,90.7]],["C",[6.4,90.8,6.3,90.8]],["C",[6.3,90.9,6.2,90.9]],["L",[1.2,90.9]],["C",[1.1,90.9,1.1,90.9]],["C",[1,90.9,1,91.1]],["L",[1,94.1]],["C",[1,94.1,1.1,94.2]],["C",[1.1,94.3,1.2,94.3]],["L",[6.2,94.3]],["C",[6.3,94.3,6.3,94.3]],["C",[6.4,94.4,6.4,94.5]],["L",[6.4,99.7]],["C",[6.4,99.8,6.4,99.8]],["L",[6.6,99.9]],["L",[9.5,99.9]],["C",[9.6,99.9,9.7,99.8]],["C",[9.7,99.8,9.7,99.7]],["L",[9.7,94.5]],["C",[9.7,94.4,9.8,94.3]],["C",[9.8,94.3,9.9,94.3]],["L",[14.8,94.3]],["C",[14.9,94.3,14.9,94.2]],["L",[15,94.1]],["L",[15,91.1]]]);
		this.motifs.set("u",[["M",[1,79.8]],["C",[1,79.7,1.1,79.6]],["C",[1.1,79.6,1.2,79.6]],["L",[4.7,79.6]],["C",[4.8,79.6,4.8,79.6]],["L",[4.9,79.8]],["L",[4.9,87.8]],["C",[4.9,87.9,4.9,87.9]],["C",[5,88,5.1,88]],["L",[12,88]],["C",[12.2,88,12.2,87.9]],["C",[12.2,87.9,12.2,87.8]],["L",[12.2,79.8]],["C",[12.2,79.7,12.3,79.6]],["C",[12.3,79.6,12.4,79.6]],["L",[15.9,79.6]],["C",[16,79.6,16,79.6]],["C",[16.1,79.7,16.1,79.8]],["L",[16.1,100]],["C",[16.1,100.1,16,100.2]],["C",[16,100.3,15.9,100.3]],["L",[12.4,100.3]],["C",[12.3,100.3,12.3,100.2]],["C",[12.2,100.1,12.2,100]],["L",[12.2,92.1]],["C",[12.2,92,12.2,91.9]],["C",[12.2,91.9,12,91.9]],["L",[5.1,91.9]],["C",[5,91.9,4.9,91.9]],["C",[4.9,92,4.9,92.1]],["L",[4.9,100]],["C",[4.9,100.1,4.8,100.2]],["C",[4.8,100.3,4.7,100.3]],["L",[1.2,100.3]],["C",[1.1,100.3,1.1,100.2]],["C",[1,100.1,1,100]],["L",[1,79.8]]]);
		this.motifs.set("v",[["M",[37,100]],["L",[33.4,100]],["L",[1,31.2]],["L",[1,30]],["L",[12.2,30]],["L",[35.2,79.8]],["C",[46.6,54.9,58.1,30]],["L",[69.3,30]],["L",[69.3,31.2]],["L",[37,100]]]);
		this.motifs.set("ウ",[["M",[81.9,49.1]],["C",[80.4,49.6,78.3,50]],["C",[76.1,50.3,72.8,50.3]],["L",[58.2,50.3]],["L",[58.2,43.6]],["C",[58.2,42,58.3,40.6]],["C",[58.3,39.2,58.5,37.6]],["C",[58.7,35.9,59,33.4]],["L",[40.3,33.4]],["C",[40.7,35.9,40.9,37.6]],["C",[41.1,39.2,41.2,40.6]],["C",[41.2,42,41.2,43.6]],["L",[41.2,50.3]],["L",[20.3,50.3]],["C",[17.4,50.3,14.8,50.2]],["C",[12.4,50.1,9.6,49.8]],["C",[9.9,51.8,10,54.5]],["C",[10.1,57.1,10.1,58.9]],["L",[10.1,76.2]],["C",[10.1,78.5,10,80.9]],["C",[9.8,83.4,9.6,85.6]],["L",[26.3,85.6]],["C",[26.1,83.9,26,81.6]],["C",[25.9,79.4,25.9,77.4]],["L",[25.9,64.6]],["L",[72,64.6]],["C",[71,71.5,69,77.4]],["C",[67,83.4,63.5,88.4]],["C",[59.4,93.9,54.1,97.7]],["C",[48.8,101.5,43.3,103.7]],["C",[39.7,105.2,35.4,106.4]],["C",[31,107.6,27.1,108.3]],["L",[39.6,122.9]],["C",[48.4,120.7,56.3,116.4]],["C",[64.2,112.1,70.6,105.9]],["C",[77,99.8,81.1,91.9]],["C",[84.5,85.4,86.6,78.9]],["C",[88.8,72.3,90.2,64.5]],["C",[90.4,63.5,90.8,61.9]],["C",[91.1,60.3,91.5,58.6]],["C",[91.9,56.9,92.4,55.5]],["C",[87.2,52.3,81.9,49.1]]]);
		this.motifs.set("ス",[["M",[75.4,40.5]],["C",[73.6,41.1,70.4,41.5]],["C",[67.2,42,63.4,42]],["L",[30,42]],["C",[28.5,42,26.2,41.9]],["L",[21.4,41.6]],["C",[19,41.4,17.2,41.2]],["L",[17.2,58.3]],["L",[22.9,57.9]],["C",[26.5,57.6,30,57.5]],["L",[61.1,57.5]],["C",[59.5,62.5,55.8,68.5]],["C",[52.1,74.5,47.1,80.2]],["C",[42.6,85.2,36.1,90.5]],["C",[29.7,95.9,22,100.5]],["C",[14.4,105.2,6.2,108.2]],["L",[18.8,121.4]],["C",[28.7,116.5,38.1,109.4]],["C",[47.6,102.3,55.5,94.1]],["C",[62.3,100.6,68.5,107.6]],["C",[74.6,114.6,79.4,121.5]],["L",[93.3,109.4]],["C",[90.5,105.8,86,101]],["C",[81.4,96.1,76.3,90.9]],["C",[71,85.7,66.1,81.4]],["C",[71,74.6,74.9,67.7]],["C",[78.7,60.7,81.2,55.1]],["C",[82.1,53.1,83.3,51]],["C",[84.6,48.9,85.3,47.8]],["C",[80.4,44.1,75.4,40.5]]]);
		this.motifs.set("デ",[["M",[99.4,41.8]],["C",[98.5,40.1,97.2,37.6]],["C",[95.8,35.2,94.3,32.7]],["C",[92.8,30.2,91.5,28.2]],["L",[82.1,32]],["C",[84.2,35,86.3,38.8]],["C",[88.4,42.6,90,45.8]],["L",[99.4,41.8]],["M",[61.2,54.3]],["C",[64.1,54.3,67,54.5]],["L",[72.8,54.7]],["L",[72.8,41.7]],["C",[74.1,44.1,75.3,46.4]],["L",[77.5,50.7]],["L",[87,46.7]],["C",[86.1,44.9,84.7,42.4]],["C",[83.4,40,81.9,37.4]],["C",[80.5,34.9,79.2,33]],["C",[74.5,34.9,69.8,36.8]],["C",[70.2,37.4,70.6,38.1]],["L",[71.4,39.4]],["C",[68.9,39.7,66.3,39.9]],["C",[63.7,40,61.2,40]],["L",[29.5,40]],["L",[23.7,39.8]],["C",[20.6,39.6,17.9,39.2]],["L",[17.9,54.7]],["L",[23.6,54.5]],["C",[26.8,54.3,29.5,54.3]],["L",[61.2,54.3]],["M",[16.6,65.8]],["L",[11.6,65.6]],["C",[8.9,65.4,6.5,65.1]],["L",[6.5,80.8]],["L",[11.5,80.6]],["C",[14.4,80.4,16.6,80.4]],["L",[42.7,80.4]],["C",[42.3,86.3,40.8,91.4]],["C",[39.2,96.6,36.3,101]],["C",[33.2,105.3,28.5,109]],["C",[23.7,112.8,18.6,114.7]],["L",[32.8,124.9]],["C",[37.4,122.6,41.4,119.4]],["C",[45.4,116.1,48.4,112.4]],["C",[51.4,108.7,53.1,105.2]],["C",[55.7,100.1,57.4,94]],["C",[59.2,87.9,59.7,80.4]],["L",[82.1,80.4]],["C",[84.4,80.4,87.2,80.5]],["L",[92,80.7]],["L",[92,65.1]],["C",[90.6,65.3,88.7,65.5]],["L",[85,65.7]],["C",[83.2,65.8,82.1,65.8]],["L",[16.6,65.8]]]);
		this.motifs.set("マ",[["M",[84.6,43.3]],["C",[82.7,44,79.8,44.3]],["C",[77,44.7,73.6,44.7]],["L",[20.5,44.7]],["L",[16.4,44.5]],["L",[11.8,44.1]],["C",[9.6,43.8,8.2,43.5]],["L",[8.2,60.5]],["L",[11.5,60.2]],["L",[16,59.8]],["L",[20.5,59.6]],["L",[70,59.6]],["C",[67.7,63.6,64.4,67.9]],["C",[61,72.3,56.8,76.8]],["C",[52.7,81.2,47.9,85.1]],["C",[43.4,81.2,39.3,77.9]],["C",[35.2,74.6,32,72.1]],["C",[25.6,77.3,19.2,82.5]],["C",[22.4,84.8,26.3,88.2]],["C",[30.2,91.4,33.9,95]],["C",[37.7,98.5,40.7,101.4]],["C",[44,104.9,47.8,108.9]],["C",[51.4,112.9,54.7,116.8]],["C",[58.1,120.7,60.3,123.8]],["L",[74.6,112.3]],["C",[71.6,108.8,67.8,104.7]],["C",[64,100.5,59.9,96.4]],["C",[66.4,90.8,72.5,84.2]],["C",[78.7,77.6,83.9,70.8]],["C",[89.1,64,92.7,58]],["C",[93.4,57,94.4,55.8]],["L",[96.6,53.3]],["C",[90.6,48.3,84.6,43.3]]]);
	}
	,initializeWidths: function() {
		this.widths.set("0",72.5);
		this.widths.set("1",15.2);
		this.widths.set("2",48.5);
		this.widths.set("3",50);
		this.widths.set("A",72.2);
		this.widths.set("B",56.3);
		this.widths.set("C",64.5);
		this.widths.set("D",57.8);
		this.widths.set("E",56.2);
		this.widths.set("F",68.8);
		this.widths.set("G",72.5);
		this.widths.set("H",61.5);
		this.widths.set("I",17.4);
		this.widths.set("J",26.8);
		this.widths.set("K",62.8);
		this.widths.set("L",56.1);
		this.widths.set("M",72.6);
		this.widths.set("N",64.4);
		this.widths.set("O",72.5);
		this.widths.set("P",43.7);
		this.widths.set("Q",76.9);
		this.widths.set("R",62.5);
		this.widths.set("S",24.7);
		this.widths.set("T",67.4);
		this.widths.set("U",65.5);
		this.widths.set("V",74.7);
		this.widths.set("W",87.9);
		this.widths.set("X",65.1);
		this.widths.set("Y",63.5);
		this.widths.set("Z",64.9);
		this.widths.set("a",291.7);
		this.widths.set("d",56.7);
		this.widths.set("g",60);
		this.widths.set("h",34);
		this.widths.set("r",61.7);
		this.widths.set("t",16);
		this.widths.set("u",17.1);
		this.widths.set("v",70.3);
		this.widths.set("ウ",100);
		this.widths.set("ス",100);
		this.widths.set("デ",100);
		this.widths.set("マ",100);
	}
	,getHeight: function($char) {
		if($char == "ウ" || $char == "ス" || $char == "デ" || $char == "マ") return 148;
		if($char == "h") return 180;
		return this.height;
	}
});
var sound = {};
sound.MyAudio = function() {
	this.globalVolume = 0.899;
	this.isStart = false;
	this._impulse = [];
};
sound.MyAudio.prototype = {
	init: function(callback) {
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
};
var three = {};
three.Face = function() { };
three.IFog = function() { };
three.Mapping = function() { };
three.Renderer = function() { };
three._WebGLRenderer = {};
three._WebGLRenderer.RenderPrecision_Impl_ = function() { };
var typo = {};
typo.Be2d = function(p0,p1,ctrl) {
	this._length = 0;
	this._point0 = p0;
	this._point1 = p1;
	this._control = ctrl;
	this.setPoints(this._point0,this._point1,ctrl);
};
typo.Be2d.prototype = {
	f: function(t) {
		var tp = 1.0 - t;
		return new THREE.Vector2(this._point0.x * tp * tp + 2 * this._control.x * t * tp + this._point1.x * t * t,this._point0.y * tp * tp + 2 * this._control.y * t * tp + this._point1.y * t * t);
	}
	,diff: function(t) {
		return new THREE.Vector2(2 * (t * (this._point0.x + this._point1.x - 2 * this._control.x) - this._point0.x + this._control.x),2 * (t * (this._point0.y + this._point1.y - 2 * this._control.y) - this._point0.y + this._control.y));
	}
	,integral: function(t) {
		return this.integralBezje(t) - this.INTG_0;
	}
	,getLength: function() {
		return this._length;
	}
	,integralInit: function() {
		var kx = this._point0.x + this._point1.x - 2 * this._control.x;
		var ky = this._point0.y + this._point1.y - 2 * this._control.y;
		var ax = -this._point0.x + this._control.x;
		var ay = -this._point0.y + this._control.y;
		this.XY = kx * kx + ky * ky;
		this.B = (ax * kx + ay * ky) / this.XY;
		this.C = (ax * ax + ay * ay) / this.XY - this.B * this.B;
		if(this.C > 1e-10) {
			this.CS = Math.sqrt(this.C);
			this.CS2 = 0.0;
		} else {
			this.C = 0;
			this.CS = this.CS2 = 1.0;
		}
		this.INTG_0 = this.integralBezje(0.0);
		this._length = this.integral(1.0);
	}
	,integralBezje: function(t) {
		var BT = this.B + t;
		var BTS = Math.sqrt(BT * BT + this.C);
		return Math.sqrt(this.XY) * (BTS * BT + this.C * Math.log((BT + BTS) / this.CS + this.CS2));
	}
	,length2T: function(len,d) {
		if(d == null) d = 0.1;
		if(len < 0 || len > this._length) return 0; else return this.seekL(len,d);
	}
	,seekL: function(len,d,t0,td) {
		if(td == null) td = 0.25;
		if(t0 == null) t0 = 0.5;
		if(d == null) d = 0.1;
		var lent0 = this.integral(t0);
		if(td <= 0.01) return t0;
		if(Math.abs(len - lent0) < d) return t0; else return this.seekL(len,d,lent0 < len?t0 + td:t0 - td,td / 2);
	}
	,setPoints: function(p0,p1,ctrl) {
		this._point0 = p0;
		this._point1 = p1;
		this._control = ctrl;
		this.integralInit();
	}
};
typo.BePoints = function() {
	this._count = -1;
	this._currentY = 0;
	this._currentX = 0;
	this.SPACE = 0.5;
};
typo.BePoints.prototype = {
	getStrokes: function(points) {
		var strokes = [];
		var _g1 = 0;
		var _g = points.length;
		while(_g1 < _g) {
			var i = _g1++;
			var s = new typo.Stroke();
			s.init(points[i]);
			strokes.push(s);
		}
		return strokes;
	}
	,getLetterPoints: function(moji,isCentering,scale,letter,isLineSplit) {
		if(isLineSplit == null) isLineSplit = true;
		if(scale == null) scale = 1;
		if(isCentering == null) isCentering = false;
		this._points = [[]];
		var motif = letter.motifs.get(moji);
		var ox = 0;
		var oy = 0;
		var s = scale;
		if(isCentering) {
			ox = -letter.widths.get(moji) / 2;
			if(moji == "1") ox += 5;
			oy = -letter.getHeight(moji) / 2;
		}
		var len = motif.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var _g1 = motif[i][0];
			switch(_g1) {
			case "M":
				this._currentX = s * (motif[i][1][0] + ox);
				this._currentY = s * (motif[i][1][1] + oy);
				this._count++;
				this._points[this._count] = [new THREE.Vector2(this._currentX,this._currentY)];
				break;
			case "L":
				if(isLineSplit) this.lineTo(s * (motif[i][1][0] + ox),s * (motif[i][1][1] + oy)); else {
					this._currentX = s * (motif[i][1][0] + ox);
					this._currentY = s * (motif[i][1][1] + oy);
					this._points[this._count].push(new THREE.Vector2(this._currentX,this._currentY));
				}
				break;
			case "C":
				this.curveTo(s * (motif[i][1][0] + ox),s * (motif[i][1][1] + oy),s * (motif[i][1][2] + ox),s * (motif[i][1][3] + oy));
				break;
			}
		}
		return this._points;
	}
	,lineTo: function(xx,yy) {
		var dx = xx - this._currentX;
		var dy = yy - this._currentY;
		var dist = Math.sqrt(dx * dx + dy * dy);
		var numBunkatsu = Math.floor(dist / this.SPACE);
		if(numBunkatsu <= 1) numBunkatsu = 1;
		var _g = 0;
		while(_g < numBunkatsu) {
			var i = _g++;
			var rate = i / numBunkatsu;
			var pp = new THREE.Vector2(this._currentX + rate * dx,this._currentY + rate * dy);
			this._points[this._count].push(pp);
		}
		this._currentX = xx;
		this._currentY = yy;
	}
	,curveTo: function(cx,cy,xx,yy) {
		var bezje = new typo.Be2d(new THREE.Vector2(this._currentX,this._currentY),new THREE.Vector2(xx,yy),new THREE.Vector2(cx,cy));
		var len = bezje.getLength();
		if(Math.isNaN(len)) {
			var _g = 0;
			while(_g < 10) {
				var i = _g++;
				this._points[this._count].push(bezje.f(i / 9));
			}
		} else {
			var sn = Math.floor(len / this.SPACE);
			if(sn <= 1) sn = 1;
			var kd = 1.0 / sn;
			var k = 0;
			var saisho = false;
			while(k < 1.0) {
				var t = bezje.length2T(bezje.getLength() * k);
				var pp = bezje.f(t);
				this._points[this._count].push(pp);
				k += kd;
			}
		}
		this._currentX = bezje.f(1).x;
		this._currentY = bezje.f(1).y;
	}
};
typo.Stroke = function() {
	this._currentDist = 0;
	this._distances = [];
	this._distance = 0;
	this._pointsHS = [];
	this._points = [];
	this.NUM = 300;
};
typo.Stroke.prototype = {
	Stroke: function() {
	}
	,init: function(points) {
		this._points = points;
		this._distance = 0;
		var _g1 = 0;
		var _g = this._points.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			var p1 = this._points[i];
			var p2 = this._points[i + 1];
			var dx = p2.x - p1.x;
			var dy = p2.y - p1.y;
			var d = Math.sqrt(dx * dx + dy * dy);
			this._distances[i] = this._distance;
			this._distance += d;
		}
		this._distances.push(this._distance);
		this._pointsHS = [];
		var _g11 = 0;
		var _g2 = this.NUM;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this._pointsHS.push(this.getPosition(i1 / (this.NUM - 1)));
		}
	}
	,getNextPosition: function(dx) {
		if(this._currentDist >= this._distance) this._currentDist = 0;
		this._currentDist += dx;
		return this.getPosition(this._currentDist / this._distance);
	}
	,getPositionHS: function(ratio) {
		return this._pointsHS[Math.floor((this._pointsHS.length - 1) * ratio)];
	}
	,getPosition: function(ratio) {
		if(ratio < 0) ratio = 0;
		if(ratio >= 1) ratio = 1;
		var tgtDist = this._distance * ratio;
		var dist = 0;
		var index = 0;
		while(true) {
			if(this._distances[index] >= tgtDist) break;
			index++;
		}
		var n = index;
		var r = (tgtDist - this._distances[n - 1]) / (this._distances[n] - this._distances[n - 1]);
		r = 1 - r;
		var index1 = n - 1;
		var index2 = n;
		var p1;
		if(index1 < 0) p1 = null; else p1 = this._points[index1];
		var p2 = this._points[index2];
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
	,getPoints: function() {
		return this._points;
	}
	,getDistance: function() {
		return this._distance;
	}
	,getNum: function(waru) {
		return Math.floor(this._distance / waru);
	}
};
typo.StrokeUtil = function() {
};
typo.StrokeUtil.init = function() {
	typo.StrokeUtil._fonts = [];
	typo.StrokeUtil._fonts[0] = new net.badimon.five3D.typography.VrdgRegular();
	typo.StrokeUtil._fonts[1] = new net.badimon.five3D.typography.FuturaHeavy();
};
typo.StrokeUtil.getWidth = function(moji,fontIndex) {
	return typo.StrokeUtil._fonts[fontIndex].getWidth(moji);
};
typo.StrokeUtil.getStrokes = function(s,scale,fontIndex) {
	if(s == " ") return [];
	var _font = typo.StrokeUtil._fonts[fontIndex];
	if(typo.StrokeUtil._map == null) typo.StrokeUtil._map = new haxe.ds.StringMap();
	if(typo.StrokeUtil._map.get(s) != null) return typo.StrokeUtil._map.get(fontIndex + "_" + s);
	var allPoints = [];
	var bpoints = new typo.BePoints();
	var pp = bpoints.getLetterPoints(s,true,scale,_font,true);
	var strokes = bpoints.getStrokes(pp);
	typo.StrokeUtil._map.set(fontIndex + "_" + s,strokes);
	return strokes;
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
MainDeDe.W = 1024;
MyColor.r = 0;
MyColor.g = 0;
MyColor.b = 0;
MyColor._rad = 0;
MyPointCloud.GEO_MAX = 15000;
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
camera.DoubleCamera.TYPE_O = 0;
camera.DoubleCamera.TYPE_P = 1;
camera.DoubleCamera.WW = 1920;
camera.DoubleCamera.HH = 576;
clock.DotDigit.Z_MAX = 3000;
clock.DotDigit.TYPE_DOT_MONOSPACE = 0;
clock.DotDigit.TYPE_DOT_CONTINUE = 1;
clock.DotDigit.TYPE_LINE_MONOSPACE = 2;
clock.DotDigit.TYPE_LINE_CONTINUE = 3;
clock.DotDigit.TYPE_RANDOM_MONOSPACE = 4;
clock.DotDigit.TYPE_RANDOM_CONTINUE = 5;
clock.DotDigit.NUM_TYPE = 4;
common.Config.canvasOffsetY = 0;
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
dede.DeDeDigit.Z_MAX = 3000;
dede.DeDeDigit.TYPE_DOT_MONOSPACE = 0;
dede.DeDeDigit.TYPE_DOT_CONTINUE = 1;
dede.DeDeDigit.TYPE_LINE_MONOSPACE = 2;
dede.DeDeDigit.TYPE_LINE_CONTINUE = 3;
dede.DeDeDigit.TYPE_RANDOM_MONOSPACE = 4;
dede.DeDeDigit.TYPE_RANDOM_CONTINUE = 5;
dede.DeDeDigit.NUM_TYPE = 4;
dede.DeDeLine.SPEEDX0 = -0.5;
dede.DeDeLine.SPEEDX1 = -2;
dede.DeDeLine.SPACE_R = 1.3;
dede.DeDeLine.SCALE = 0.65;
dede.cuts.DeDeString.texts = [{ text : "VRDG3", font : 0, spaceX : 50},{ text : "NIGHT VOICE ", font : 1, spaceX : 50},{ text : "DEDEMOUSE", font : 1, spaceX : 20},{ text : "DEDE", font : 1, spaceX : 50},{ text : "KITASENJUDESIGN", font : 1, spaceX : 50},{ text : "デデデデデデ", font : 0, spaceX : 10},{ text : "デデマウス", font : 0, spaceX : 50}];
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
typo.StrokeUtil.VRDG = 0;
typo.StrokeUtil.FUTURA = 1;
Main.main();
})();
