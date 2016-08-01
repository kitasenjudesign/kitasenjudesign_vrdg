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
		common.Dat.init($bind(this,this._onInit2));
	}
	,_onInit2: function() {
		this._audio = new sound.MyAudio();
		this._audio.init($bind(this,this._onAudio));
	}
	,_onAudio: function() {
		this._bure = new Bure();
		this._scene = new THREE.Scene();
		this._camera = new camera.ExCamera(35,Main3d.W / Main3d.H,10,common.Dat.bg?20000:2000);
		this._camera.bure = this._bure;
		var light = new THREE.AmbientLight(10066329);
		this._scene.add(light);
		var d = new THREE.DirectionalLight(16777215,1);
		d.castShadow = true;
		this._scene.add(d);
		d.position.set(0,500,20);
		this._renderer = new THREE.WebGLRenderer({ antialias : true, devicePixelRatio : 1});
		this._renderer.domElement.id = "webgl";
		this._renderer.domElement.width = common.StageRef.get_stageWidth();
		this._renderer.domElement.height = common.StageRef.get_stageHeight();
		this._camera.init(this._renderer.domElement);
		window.document.body.appendChild(this._renderer.domElement);
		common.StageRef.setCenter();
		this._pp = new effect.PostProcessing2();
		this._pp.init(this._scene,this._camera,this._renderer,$bind(this,this._onLoadDAE0));
	}
	,_onLoadDAE0: function() {
		this._cubeCamera = new THREE.CubeCamera(1,2000,256);
		this._cubeCamera.renderTarget.minFilter = 1008;
		this._scene.add(this._cubeCamera);
		window.onresize = $bind(this,this._onResize);
		this._onResize(null);
		this._camera.radY = 0;
		this.dae = new objects.MyDAELoader();
		this.dae.load($bind(this,this._onLoadDAE),this._cubeCamera);
		common.Dat.gui.add(this._camera,"amp").listen();
		common.Dat.gui.add(this,"_change");
	}
	,_change: function() {
	}
	,goFullScreen: function() {
		window.document.body.webkitRequestFullscreen();
	}
	,_onLoadDAE: function() {
		console.log("onLoadDAE");
		this._world = new objects.MyWorld();
		this._world.init(this.dae,this._cubeCamera,this._camera,this._pp);
		this._scene.add(this._world);
		this._run();
	}
	,fullscreen: function() {
		this._renderer.domElement.requestFullscreen();
	}
	,_onResize: function(e) {
		Main3d.W = common.StageRef.get_stageWidth();
		Main3d.H = common.StageRef.get_stageHeight();
		this._renderer.domElement.width = Main3d.W;
		this._renderer.domElement.height = Main3d.H;
		this._renderer.setSize(Main3d.W,Main3d.H);
		this._camera.aspect = Main3d.W / Main3d.H;
		this._camera.updateProjectionMatrix();
		this._pp.resize(Main3d.W,Main3d.H);
	}
	,_run: function() {
		if(this._audio != null) this._audio.update();
		this._bure.update();
		this._camera.update();
		this._camera.lookAt(new THREE.Vector3(this._bure.look.x,this._bure.look.y,this._bure.look.z));
		this._world.update(this._audio);
		this._world.faceVisible(false);
		this._world.faceVisible(true);
		if(common.Dat.bg) this._renderer.render(this._scene,this._camera); else {
			this._pp.update(this._audio);
			this._pp.render();
		}
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
		this.amp += e.detail * 0.5;
		if(this.amp > 118000) this.amp = 118000;
		if(this.amp < 100) this.amp = 100;
	}
	,onMouseWheel: function(e) {
		this.amp += e.wheelDelta * 0.5;
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
		this._camera.position.x += (x + this.bure.cam.x - this._camera.position.x) * spd;
		this._camera.position.y += (y + this.bure.cam.y - this._camera.position.y) * spd;
		this._camera.position.z += (z + this.bure.cam.z - this._camera.position.z) * spd;
		var t = this.target.clone();
		t.y += this.tgtOffsetY;
		this.target2 = t;
		this._camera.lookAt(t);
	}
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
var effect = {};
effect.PostProcessing2 = function() {
	this.strength = 0;
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
		this.color = new effect.pass.XLoopPass();
		this._composer.addPass(this.color);
		this._composer.addPass(this._copyPass);
		this._copyPass.clear = true;
		this._copyPass.renderToScreen = true;
		if(this._callback != null) this._callback();
	}
	,change: function(isColor,isDisplace) {
		this.color.setTexture(isColor,isDisplace);
	}
	,render: function() {
		this._composer.render();
	}
	,update: function(audio) {
		this.color.update(audio);
	}
	,resize: function(w,h) {
		this._composer.setSize(w,h);
	}
};
effect.pass = {};
effect.pass.DisplacementPass = function() {
	this._fragment = "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D disTexture;\r\n\t\t\t\t\tuniform sampler2D colTexture;\r\n\t\t\t\t\tuniform float strengthX;\r\n\t\t\t\t\tuniform float strengthY;\r\n\t\t\t\t\tuniform float counter;\r\n\t\t\t\t\tuniform float isDisplace;\r\n\t\t\t\t\tuniform float isColor;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//dispace\r\n\t\t\t\t\t\tvec4 texel = vec4(0.0);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tif(isDisplace == 1.0){\r\n\t\t\t\t\t\t\tvec4 col = texture2D( disTexture, vUv);\r\n\t\t\t\t\t\t\tfloat f1 = strengthX * sin(counter*0.17);// pow(counter, 2.0 + 3.0 * col.x);//sin(counter * 3.9) * 0.23;\r\n\t\t\t\t\t\t\tfloat f2 = strengthY * sin(counter*0.22);// pow(counter, 2.0 + 3.0 * col.x) * 0.001;// pow(counter, 2.0 + 3.0 * col.y);//cos(counter * 3.7) * 0.23;\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\tvec2 axis = vec2( \r\n\t\t\t\t\t\t\t\tvUv.x + (col.y-0.5)*f1, vUv.y + (col.z-0.5)*f2\r\n\t\t\t\t\t\t\t);\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\ttexel = texture2D( tDiffuse, axis );\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\ttexel = texture2D( tDiffuse, vUv );\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec4 texel = texture2D( colTexture, axis );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//vec3 luma = vec3( 0.299, 0.587, 0.114 );\r\n\t\t\t\t\t\t//float v = dot( texel.xyz, luma );//akarusa\r\n\t\t\t\t\t\t//vec2 axis = vec2( 0.5,v );\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//position\r\n\t\t\t\t\t\tvec4 out1 = vec4(0.0);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tif( isColor == 1.0){\r\n\t\t\t\t\t\t\tvec2 pp = vec2( 0.5, fract( texel.x + counter ) );\r\n\t\t\t\t\t\t\tif ( pp.y < 0.5) {\r\n\t\t\t\t\t\t\t\tpp.y = pp.y * 2.0;\r\n\t\t\t\t\t\t\t\tout1 = texture2D( colTexture, pp );\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\t\tpp.y = (1.0 - (pp.y - 0.5) * 2.0);\t\t\t\t\r\n\t\t\t\t\t\t\t\tout1 = texture2D( colTexture, pp );\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tif ( texel.x == 0.0 ) {\r\n\t\t\t\t\t\t\t\tout1 = vec4(0.0, 0.0, 0.0, 1.0);\r\n\t\t\t\t\t\t\t}\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\tout1 = texel;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\tif ( texel.x == 0.0 || mod( floor( texel.x * 1000.0 + counter ),2.0) == 0.0 ) {\r\n\t\t\t\t\t\t\ttexel.x = 0.0;\r\n\t\t\t\t\t\t\ttexel.y = 0.0;\r\n\t\t\t\t\t\t\ttexel.z = 0.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\ttexel.x = out1.x;//1.0;\r\n\t\t\t\t\t\t\ttexel.y = out1.y;//1.0;\r\n\t\t\t\t\t\t\ttexel.z = out1.z;//1.0;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}*/\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t\ttexel.x = out1.x;//1.0;\r\n\t\t\t\t\t\t\ttexel.y = out1.y;//1.0;\r\n\t\t\t\t\t\t\ttexel.z = out1.z;//1.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t*/\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = out1;\r\n\t\t\t\t\t\t//gl_FragColor =  out1;// texel;\r\n\t\t\t\t\t}\r\n\t";
	this._vertex = "\r\n\t\tvarying vec2 vUv;\r\n\t\tvoid main() {\r\n\t\t\tvUv = uv;\r\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}\t\t\r\n\t";
	this._textures = [];
	var _g = 1;
	while(_g < 11) {
		var i = _g++;
		this._textures.push(THREE.ImageUtils.loadTexture("displace" + i + ".png"));
	}
	this._colors = [THREE.ImageUtils.loadTexture("grade.png"),THREE.ImageUtils.loadTexture("grade2.png"),THREE.ImageUtils.loadTexture("grade3.png"),THREE.ImageUtils.loadTexture("grade4.png")];
	THREE.ShaderPass.call(this,{ uniforms : { tDiffuse : { type : "t", value : null}, isDisplace : { type : "f", value : 1}, isColor : { type : "f", value : 1}, disTexture : { type : "t", value : this._textures[0]}, colTexture : { type : "t", value : this._colors[3]}, strengthX : { type : "f", value : 0}, strengthY : { type : "f", value : 0}, counter : { type : "f", value : 0}}, vertexShader : this._vertex, fragmentShader : this._fragment});
};
effect.pass.DisplacementPass.__super__ = THREE.ShaderPass;
effect.pass.DisplacementPass.prototype = $extend(THREE.ShaderPass.prototype,{
	update: function(audio) {
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
effect.pass.XLoopPass = function() {
	this._fragment = "\r\n\t\t\t\t\tuniform sampler2D tDiffuse;\r\n\t\t\t\t\tuniform sampler2D disTexture;\r\n\t\t\t\t\tuniform sampler2D colTexture;\r\n\t\t\t\t\tuniform float strengthX;\r\n\t\t\t\t\tuniform float strengthY;\r\n\t\t\t\t\tuniform float counter;\r\n\t\t\t\t\tuniform float isDisplace;\r\n\t\t\t\t\tuniform float isColor;\r\n\t\t\t\t\tvarying vec2 vUv;\r\n\t\t\t\t\t\r\n\t\t\t\t\tfloat yama(float rr, float beki) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tfloat hoge = 0.5 + 0.5 * sin(rr * 3.14 - 3.14 * 0.5);\r\n\t\t\t\t\t\t//out = pow(out, beki);\r\n\t\t\t\t\t\treturn hoge;// out;\r\n\t\t\t\t\t\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tfloat yama2(float rr, float beki) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tfloat hoge = rr * 2.0;\r\n\t\t\t\t\t\tif ( hoge < 1.0) {\r\n\t\t\t\t\t\t\thoge = pow(hoge, 1./beki) * 0.5;\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\thoge = pow(hoge-1.0, beki) * 0.5 + 0.5;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t//out = pow(out, beki);\r\n\t\t\t\t\t\treturn hoge;// out;\r\n\t\t\t\t\t\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\tvoid main() {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//dispace\r\n\t\t\t\t\t\tvec4 texel = vec4(0.0);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//0.4-0.6 no hani wo kurikaesu\r\n\t\t\t\t\t\tfloat minX = 0.45;\r\n\t\t\t\t\t\tfloat maxX = 0.55;\r\n\t\t\t\t\t\tfloat amp = maxX - minX;\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//float xx = clamp( vUv.x, minX, maxX );\r\n\t\t\t\t\t\t//xx = (xx - minX) / len;//0-1\r\n\t\t\t\t\t\t\r\n\t\t\t\t\tfloat nn = 10. * sin( counter * 0.07 );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\tfloat xx = minX + amp * (0.5 + 0.5 * sin(yama2(vUv.x, 2.0) * nn * 3.14 - 3.14 * 0.5));\r\n\t\t\t\t\tfloat minA = 0.3;// 1;\r\n\t\t\t\t\tfloat maxA = 0.7;// 9;\r\n\t\t\t\t\t\r\n\t\t\t\t\tif (vUv.x < minA) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\txx = xx * pow(vUv.x / minA, 0.2);\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t}else if (vUv.x > maxA) {\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\txx = mix(xx, vUv.x, pow((vUv.x - maxA) / (1.0 - maxA), 7.0));\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\t\t\t\t\tfloat yy = vUv.y + 0.05 * sin(vUv.x * 6.0 * 3.14);\r\n\t\t\t\t\t\r\n\t\t\t\t\txx = mix(vUv.x, xx, 0.5+0.5*sin(counter * 0.1) );\r\n\t\t\t\t\tyy = mix(vUv.y, yy, 0.5+0.5*sin(counter * 0.1) );\r\n\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t//xx = 0.5+0.5*sin( 2.*3.14*vUv.x -3.14/2.0);\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t//xx = 0.5 + 0.5 * sin(xx * 2.0 * 3.14 * 5.0);\r\n\t\t\t\t\t\t//vUv.x\r\n\t\t\t\t\t\t\r\n\t\t\t\t\tvec2 axis = vec2( xx, yy );\r\n\t\t\t\t\ttexel = texture2D( tDiffuse, axis );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\r\n\t\t\t\t\t\tfloat v = dot( texel.xyz, luma );//akarusa\r\n\t\t\t\t\t\tv = fract( v*20.0 + counter * 0.01 ) * 2.0;\r\n\t\t\t\t\t\tif (v > 1.0) {\r\n\t\t\t\t\t\t\tv = 1.0 - (v - 1.0);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\taxis = vec2( 0.5,v );\t\t\t\t\t\t\r\n\t\t\t\t\t\tvec4 out1 = texture2D( colTexture, axis );\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t//position\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tif ( texel.x == 0.0 ) {\r\n\t\t\t\t\t\t\tout1.x = 0.0;\r\n\t\t\t\t\t\t\tout1.y = 0.0;\r\n\t\t\t\t\t\t\tout1.z = 0.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\tif ( texel.x == 0.0 || mod( floor( texel.x * 1000.0 + counter ),2.0) == 0.0 ) {\r\n\t\t\t\t\t\t\tout1.x = 0.0;\r\n\t\t\t\t\t\t\tout1.y = 0.0;\r\n\t\t\t\t\t\t\tout1.z = 0.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}else {\r\n\t\t\t\t\t\t\tout1.x = out1.x;// 1.0;\r\n\t\t\t\t\t\t\tout1.y = out1.y;// 1.0;\r\n\t\t\t\t\t\t\tout1.z = out1.z;// 1.0;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}*/\r\n\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t\ttexel.x = out1.x;//1.0;\r\n\t\t\t\t\t\t\ttexel.y = out1.y;//1.0;\r\n\t\t\t\t\t\t\ttexel.z = out1.z;//1.0;\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t*/\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\tgl_FragColor = out1;\r\n\t\t\t\t\t\t//gl_FragColor =  out1;// texel;\r\n\t\t\t\t\t}\r\n\t";
	this._vertex = "\r\n\t\tvarying vec2 vUv;\r\n\t\tvoid main() {\r\n\t\t\tvUv = uv;\r\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\t\t}\t\t\r\n\t";
	this._textures = [];
	var _g = 1;
	while(_g < 11) {
		var i = _g++;
		this._textures.push(THREE.ImageUtils.loadTexture("displace" + i + ".png"));
	}
	this._colors = [THREE.ImageUtils.loadTexture("grade.png"),THREE.ImageUtils.loadTexture("grade2.png"),THREE.ImageUtils.loadTexture("grade3.png"),THREE.ImageUtils.loadTexture("grade4.png")];
	THREE.ShaderPass.call(this,{ uniforms : { tDiffuse : { type : "t", value : null}, isDisplace : { type : "f", value : 1}, isColor : { type : "f", value : 1}, disTexture : { type : "t", value : this._textures[0]}, colTexture : { type : "t", value : this._colors[3]}, strengthX : { type : "f", value : 0}, strengthY : { type : "f", value : 0}, counter : { type : "f", value : 0}}, vertexShader : this._vertex, fragmentShader : this._fragment});
};
effect.pass.XLoopPass.__super__ = THREE.ShaderPass;
effect.pass.XLoopPass.prototype = $extend(THREE.ShaderPass.prototype,{
	update: function(audio) {
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
objects.MyCATLoader = function() {
	THREE.Object3D.call(this);
};
objects.MyCATLoader.__super__ = THREE.Object3D;
objects.MyCATLoader.prototype = $extend(THREE.Object3D.prototype,{
	load: function(callback) {
		this._callback = callback;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load("cat/test_cat.dae",$bind(this,this._onComplete));
	}
	,_onComplete: function(ret) {
		var dae = ret.scene;
		var mm = new THREE.MeshBasicMaterial({ map : THREE.ImageUtils.loadTexture("./cat/cat_diff.jpg"), skinning : false, depthWrite : true, depthTest : true});
		mm.shading = 2;
		mm.alphaTest = 0.9;
		
			dae.traverse( function(child){
				if( child instanceof THREE.Mesh){
					child.material = mm;
					//mm.specular.set(0,0,0);
				}
			}); ;
		dae.scale.set(100,100,100);
		this.add(dae);
		if(this._callback != null) this._callback();
	}
});
objects.MyDAELoader = function() {
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
objects.MyDAELoader.prototype = {
	load: function(callback,cube) {
		this._cubecamera = cube;
		this._callback = callback;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load("mae_face.dae",$bind(this,this._onComplete));
	}
	,_onComplete: function(collada) {
		this.dae = collada.scene;
		this.dae.scale.x = this.dae.scale.y = this.dae.scale.z = 150;
		this._texture1 = THREE.ImageUtils.loadTexture("mae_face.png");
		this._texture1.minFilter = 1003;
		this._texture1.magFilter = 1003;
		this._texture2 = THREE.ImageUtils.loadTexture("mae_faceD.png");
		this._texture2.minFilter = 1003;
		this._texture2.magFilter = 1003;
		this._texture3 = THREE.ImageUtils.loadTexture("mae_faceE.png");
		this._texture3.minFilter = 1003;
		this._texture3.magFilter = 1003;
		this.material = new THREE.MeshPhongMaterial({ map : this._texture1});
		this.material.reflectivity = 0.1;
		this.material.refractionRatio = 0.2;
		this.material.side = 2;
		this.material.shading = 2;
		this.material.normalMap = THREE.ImageUtils.loadTexture("maenyan_normal.jpg");
		this.material.shininess = 2;
		this.geometry = this.dae.children[0].children[0].geometry;
		this.geometry.verticesNeedUpdate = true;
		this.baseGeo = [];
		var max = new THREE.Vector3();
		var min = new THREE.Vector3();
		var _g1 = 0;
		var _g = this.geometry.vertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			var vv = this.geometry.vertices[i].clone();
			this.baseGeo.push(vv);
			max.x = Math.max(vv.x,max.x);
			max.y = Math.max(vv.y,max.y);
			max.z = Math.max(vv.z,max.z);
			min.x = Math.min(vv.x,min.x);
			min.y = Math.min(vv.y,min.y);
			min.z = Math.min(vv.z,min.z);
		}
		if(this._callback != null) this._callback();
	}
	,changeMap: function(isWire) {
		if(!isWire) this.material.map = this._texture1; else if(Math.random() < 0.5) this.material.map = this._texture2; else this.material.map = this._texture3;
	}
};
objects.MyFaceSingle = function(idx) {
	this._mode = "";
	this.index = 0;
	this.isActive = true;
	this.isSplit = false;
	this.borderHeight = 0;
	this.border = 0;
	this._bottom = false;
	this._idxNoiseSpeed = 0;
	this._idxSpeedNoise = 0;
	this._idxSphereNoise = 0;
	this._idxNejireNoise = 0;
	this._idxNejireY = 0;
	this._idxNejireX = 0;
	this.music = "";
	this.vr = 0;
	this._scale = 1;
	this._zengoRatio = 0;
	this._yokoSpeed = 0;
	this._yokoRatio = 0;
	this._noiseSpeed = 0.1;
	this._noise = 0.8;
	this._nejireY = 0;
	this._nejireX = 0.5;
	this._sphere = 0.1;
	this._speed = 0.01;
	this._count = 0;
	this.index = idx;
	THREE.Object3D.call(this);
};
objects.MyFaceSingle.__super__ = THREE.Object3D;
objects.MyFaceSingle.prototype = $extend(THREE.Object3D.prototype,{
	init: function(d,cubecam) {
		if(common.Dat.bg) return;
		this._daeLoader = d;
		this._idxNejireX = Math.floor(Math.random() * 20);
		this._idxNejireY = Math.floor(Math.random() * 20);
		this._idxNejireNoise = Math.floor(Math.random() * 20);
		this._idxSphereNoise = Math.floor(Math.random() * 20);
		this._idxNoiseSpeed = Math.floor(Math.random() * 20);
		this._idxSpeedNoise = Math.floor(Math.random() * 20);
		this.dae = new THREE.Mesh(this._daeLoader.geometry.clone(),new THREE.MeshDepthMaterial());
		this.dae.rotation.y = Math.PI / 2;
		if(this.index == 0) this.dae.castShadow = true;
		this.dae.scale.set(170,170,170);
		this.add(this.dae);
		this._base = d.baseGeo;
		this.vr = (Math.random() - 0.5) * Math.PI / 140;
	}
	,updateMaterial: function(matMode) {
		if(common.Dat.bg) return;
		switch(matMode) {
		case 0:
			this.dae.material = this._daeLoader.material;
			break;
		case 1:
			this.dae.material = new THREE.MeshDepthMaterial();
			break;
		}
	}
	,_getNoise: function(xx,yy,zz) {
		var f = noise.perlin3;
		var n = f(xx,yy,zz);
		return n;
	}
	,updateSingle: function(audio) {
		if(common.Dat.bg) return;
		if(this.dae == null) return;
		this._audio = audio;
		var g = this.dae.geometry;
		g.verticesNeedUpdate = true;
		this._count += this._speed;
		if(this._audio != null && this._audio.isStart) {
			this._audio.update();
			if(this._audio.freqByteData.length > 19) {
				this._nejireX = Math.pow(this._audio.freqByteData[16] / 255,1.5) * 10;
				this._nejireY = Math.pow(this._audio.freqByteData[18] / 255,2) * Math.PI * 2;
				this._noise = Math.pow(this._audio.freqByteData[12] / 255,1) * 4.5;
				this._speed = Math.pow(this._audio.freqByteData[8] / 255,2) * 0.5;
				this._sphere = Math.pow(this._audio.freqByteData[4] / 255,5);
				this._noiseSpeed = 0.1 + Math.pow(this._audio.freqByteData[19] / 255,4) * 0.05;
				this._scale = 1 + Math.pow(this._audio.freqByteData[1] / 255,3) * 0.4;
				this._yokoRatio = Math.pow(this._audio.freqByteData[5] / 255,2);
				this._yokoSpeed = Math.pow(this._audio.freqByteData[13] / 255,2) * 4;
				this._zengoRatio = Math.pow(this._audio.freqByteData[19] / 255,2);
			}
		} else return;
		var _g1 = 0;
		var _g = g.vertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			var vv = this._base[i];
			var a = Math.sqrt(vv.x * vv.x + vv.y * vv.y + vv.z * vv.z);
			var radX = -Math.atan2(vv.z,vv.x) + vv.y * Math.sin(this._count) * this._nejireX;
			var radY = Math.asin(vv.y / a);
			var amp = (1 - this._sphere) * a + this._sphere;
			amp += Math.sin(this._count * 0.7) * this._getNoise(vv.x,vv.y + this._count * this._noiseSpeed,vv.z) * this._noise;
			var yoko = Math.sin(0.5 * (vv.y * 2 * Math.PI) + this._count * this._yokoSpeed) * this._yokoRatio;
			var zengo = Math.cos(0.5 * (vv.y * 2 * Math.PI) + this._count * 3) * 0.2 * this._zengoRatio;
			var tgtX = amp * Math.sin(radX) * Math.cos(radY) + zengo;
			var tgtY = amp * Math.sin(radY);
			var tgtZ = amp * Math.cos(radX) * Math.cos(radY) + yoko;
			g.vertices[i].x += (tgtX - g.vertices[i].x) / 2;
			g.vertices[i].y += (tgtY - g.vertices[i].y) / 2;
			g.vertices[i].z += (tgtZ - g.vertices[i].z) / 2;
			if(this.isSplit) this._splitSpirit(g.vertices[i],tgtX,tgtY,tgtZ);
		}
		if(this._audio != null && this._audio.freqByteData.length > 15) {
		}
	}
	,_splitSpirit: function(vv,tgtX,tgtY,tgtZ) {
		var border1 = this.border + this.borderHeight / 2;
		var border2 = this.border - this.borderHeight / 2;
		if(tgtY > border1) this._splitSpirit2(border1,vv,tgtX,tgtY,tgtZ); else if(tgtY < border2) this._splitSpirit2(border2,vv,tgtX,tgtY,tgtZ);
	}
	,_splitSpirit2: function(th,vv,tgtX,tgtY,tgtZ) {
		var dy = tgtY - th;
		var dist = Math.abs(dy);
		var ratio = dist / 0.4;
		if(ratio > 1) ratio = 1;
		ratio = 1 - ratio;
		ratio = Math.pow(ratio,0.1);
		vv.x = tgtX * ratio;
		vv.z = tgtZ * ratio;
		vv.y = th - dy / 100;
	}
	,setMode: function(mode) {
		this._mode = mode;
		var _g = this._mode;
		switch(_g) {
		case "single":
			this.isSplit = false;
			break;
		case "split":
			this.isSplit = true;
			break;
		case "split2":
			this.isSplit = true;
			break;
		}
	}
});
objects.MyFaceSplitA = function(idx) {
	objects.MyFaceSingle.call(this,idx);
};
objects.MyFaceSplitA.__super__ = objects.MyFaceSingle;
objects.MyFaceSplitA.prototype = $extend(objects.MyFaceSingle.prototype,{
	updateSplitA: function(audio) {
		this.updateSingle(audio);
	}
	,updateSplitB: function(audio) {
		this.vr *= 0.99;
		this.updateSingle(audio);
		this.rotation.y += this.vr;
	}
});
objects.MyFace = function(idx) {
	this.baseY = 0;
	objects.MyFaceSplitA.call(this,idx);
};
objects.MyFace.__super__ = objects.MyFaceSplitA;
objects.MyFace.prototype = $extend(objects.MyFaceSplitA.prototype,{
	update: function(audio) {
		var _g = this._mode;
		switch(_g) {
		case "single":
			this.updateSingle(audio);
			break;
		case "split":
			this.updateSplitA(audio);
			break;
		case "split2":
			this.updateSplitB(audio);
			break;
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
	if(!common.Dat.bg) return;
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
		if(!common.Dat.bg) return false;
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
		if(!common.Dat.bg) return;
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
objects.MyWorld = function() {
	this._tgtBorder = 0;
	this._counter = 0;
	this.faces = [];
	this.border = 0;
	this._mode = "single";
	THREE.Object3D.call(this);
};
objects.MyWorld.__super__ = THREE.Object3D;
objects.MyWorld.prototype = $extend(THREE.Object3D.prototype,{
	init: function(dae,cubeCam,cam,pp) {
		this._pp = pp;
		this._camera = cam;
		this._dae = dae;
		this.death = new THREE.Mesh(new THREE.SphereGeometry(15,10,10),new THREE.MeshBasicMaterial({ color : 0}));
		this.sphere = new objects.MySphere();
		if(common.Dat.bg) this.add(this.sphere);
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			var face = new objects.MyFace(i);
			face.init(dae,cubeCam);
			face.border = objects.MyDAELoader.getPosY(i / 4);
			face.borderHeight = 0.5;
			this.add(face);
			this.faces.push(face);
		}
		common.Key.board.addEventListener("keydown",$bind(this,this._KeyDownFunc));
		common.Dat.gui.add(this,"changeMode1");
		common.Dat.gui.add(this,"changeMode2");
		common.Dat.gui.add(this,"changeMode3");
		this.changeMode1();
	}
	,_KeyDownFunc: function(e) {
		var _g = Std.parseInt(e.keyCode);
		switch(_g) {
		case 81:
			this._nextSingle();
			break;
		case 39:
			this._nextSingle();
			this._updateMaterial();
			break;
		case 87:
			this.changeMode2();
			this.sphere.changeBg();
			this.sphere.power = 0.5 + 0.3 * Math.random();
			this._impulese();
			break;
		case 69:
			this.changeMode3();
			this.sphere.power = 0.4 + 0.2 * Math.random();
			this.sphere.changeBg();
			this._impulese();
			break;
		}
	}
	,_updateMaterial: function() {
		var isColor;
		if(Math.random() < 0.5) isColor = true; else isColor = false;
		var isDisplace;
		if(Math.random() < 0.5) isDisplace = true; else isDisplace = false;
		this._pp.change(isColor,isDisplace);
		var mat = 0;
		if(isColor) mat = 1; else mat = 0;
		var _g1 = 0;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.faces[i].updateMaterial(mat);
		}
	}
	,_nextSingle: function() {
		this.changeMode1();
		this._dae.changeMap(this.sphere.changeBg());
		this.sphere.power = 0.7 + 0.3 * Math.random();
		this._impulese();
	}
	,_impulese: function() {
		this._camera.amp = 600 + 500 * Math.random();
		if(this._audio != null) this._audio.setImpulse();
	}
	,update: function(audio) {
		this._audio = audio;
		if(this._audio == null || !this._audio.isStart) return;
		this._counter += 0.01;
		this.position.y = Math.cos(this._counter * Math.PI) * 5;
		if(this.sphere != null) this.sphere.update(audio);
		var _g1 = 0;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.faces[i].isActive) this.faces[i].update(audio);
		}
		var _g2 = this._mode;
		switch(_g2) {
		case "split":
			this._updateSplit1(audio);
			break;
		case "split2":
			this._updateSplit2(audio);
			break;
		}
	}
	,_updateSplit1: function(audio) {
		if(audio.freqByteData[4] / 255 > 0.2) {
			this._tgtBorder = 0.25 + 0.5 * Math.random();
			this.border += (this._tgtBorder - this.border) / 4;
		}
		var r = 0.3;
		this.border = this.border % 1;
		this.faces[0].border = objects.MyDAELoader.getPosY(1);
		this.faces[1].border = objects.MyDAELoader.getPosY(0);
		this.faces[0].borderHeight = objects.MyDAELoader.getHeight(this.border * 2 - r);
		this.faces[1].borderHeight = objects.MyDAELoader.getHeight((1 - this.border) * 2 - r);
		if(audio.subFreqByteData[9] / 255 > 0.2) {
			this.faces[0].rotation.y = 2 * Math.random() * Math.PI;
			this.faces[1].rotation.y = 2 * Math.random() * Math.PI;
			this.faces[0].rotation.y = 2 * Math.random() * Math.PI;
			this.faces[1].rotation.y = 2 * Math.random() * Math.PI;
			this.faces[0].position.y = 50 * (Math.random() - 0.5);
			this.faces[1].position.y = 50 * (Math.random() - 0.5);
			this.faces[1].position.x = 300 * (Math.random() - 0.5);
		}
	}
	,_updateSplit2: function(audio) {
		if(audio.subFreqByteData[0] / 255 > 0.4) {
			var _g1 = 0;
			var _g = this.faces.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.faces[i].vr += audio.subFreqByteData[i] / 10;
			}
		}
		if(audio.subFreqByteData[7] / 255 > 0.4) {
			var _g11 = 0;
			var _g2 = this.faces.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this.faces[i1].vr += audio.subFreqByteData[i1] / 10;
			}
		}
		var _g12 = 0;
		var _g3 = this.faces.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			var nn = i2 / 5 + this._counter;
			nn = nn % 1;
			this.faces[i2].border = objects.MyDAELoader.getPosY(nn);
			this.faces[i2].borderHeight = 0.3125;
		}
	}
	,faceVisible: function(b) {
		var _g1 = 0;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.faces[i].visible = b;
		}
	}
	,changeMode1: function() {
		this._mode = "single";
		this.add(this.faces[0]);
		this.faces[0].isActive = true;
		this.faces[0].setMode("single");
		this.faces[0].position.set(0,0,0);
		var _g1 = 1;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.remove(this.faces[i]);
			this.faces[i].isActive = false;
		}
	}
	,changeMode2: function() {
		this._mode = "split";
		this.add(this.faces[0]);
		this.add(this.faces[1]);
		this.faces[0].isActive = true;
		this.faces[1].isActive = true;
		this.faces[0].setMode("split");
		this.faces[1].setMode("split");
		var _g1 = 2;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.remove(this.faces[i]);
			this.faces[i].isActive = false;
		}
	}
	,changeMode3: function() {
		this._mode = "split2";
		var _g1 = 0;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.add(this.faces[i]);
			this.faces[i].isActive = true;
			this.faces[i].setMode("split2");
			this.faces[i].border = objects.MyDAELoader.getPosY(i / 5);
			this.faces[i].borderHeight = 0.25;
			this.faces[i].baseY = 0;
			this.faces[i].rotation.y = 0;
			this.faces[i].position.y = 0;
		}
	}
	,changeMode4: function() {
		this._mode = "split3";
		this.add(this.faces[0]);
		this.faces[0].isActive = true;
		this.faces[0].setMode("single");
		this.faces[0].position.set(0,0,0);
		var _g1 = 1;
		var _g = this.faces.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.add(this.faces[i]);
			this.faces[i].isActive = true;
		}
	}
});
var sound = {};
sound.DummyBars = function() {
	THREE.Object3D.call(this);
};
sound.DummyBars.__super__ = THREE.Object3D;
sound.DummyBars.prototype = $extend(THREE.Object3D.prototype,{
	init: function() {
		this._lines = [];
		var m = new THREE.LineBasicMaterial({ color : 16711680});
		var _g = 0;
		while(_g < 64) {
			var i = _g++;
			var g = new THREE.Geometry();
			g.vertices.push(new THREE.Vector3(0,0,0));
			g.vertices.push(new THREE.Vector3(100,0,0));
			var line = new THREE.Line(g,m);
			line.position.y = i * 10;
			line.position.z = 1400;
			this.add(line);
			this._lines.push(line);
		}
	}
	,update: function(audio) {
		if(audio != null && audio.isStart) {
			var _g1 = 0;
			var _g = this._lines.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._lines[i].scale.set(audio.freqByteData[i] / 255 * 2,1,1);
			}
		}
	}
});
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
objects.MyDAELoader.MAX_Y = 1.36578;
objects.MyDAELoader.MIN_Y = -1.13318;
objects.MyFace.MAT_DEFAULT = 0;
objects.MyFace.MAT_DEPTH = 1;
objects.MyWorld.MODE_SINGLE = "single";
objects.MyWorld.MODE_SPLIT = "split";
objects.MyWorld.MODE_SPLIT2 = "split2";
objects.MyWorld.MODE_SPLIT3 = "split3";
sound.MyAudio.FFTSIZE = 64;
three._WebGLRenderer.RenderPrecision_Impl_.highp = "highp";
three._WebGLRenderer.RenderPrecision_Impl_.mediump = "mediump";
three._WebGLRenderer.RenderPrecision_Impl_.lowp = "lowp";
Main.main();
})();

//# sourceMappingURL=haxe.js.map