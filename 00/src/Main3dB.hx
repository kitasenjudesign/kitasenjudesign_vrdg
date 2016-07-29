package C:\Users\nabe\Documents\private\moji\src ;

import js.Browser;
import js.Lib;
import C:\Users\nabe\Documents\private\moji\src\neymar.CharaMe;
import C:\Users\nabe\Documents\private\moji\src\neymar.DotMaterial;
import C:\Users\nabe\Documents\private\moji\src\neymar.PointMe;
import three.AmbientLight;
import three.AnimationHandler;
import three.BoxGeometry;
import three.Clock;
import three.DirectionalLight;
import three.Face;
import three.Mesh;
import three.MeshBasicMaterial;
import three.PerspectiveCamera;
import three.PlaneGeometry;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;
/**
 * ...
 * @author nabe
 */

class Main3dB
{
	
	private  var _scene		:Scene;
	private  var _camera		:PerspectiveCamera;
	private  var _chara		:CharaMe;
	private  var _renderer	:WebGLRenderer;
	private  var _clock		:Clock;
	private  var _count		:Int = 0;
	private  var _mouseX		:Float = 0;
	private  var _mouseY		:Float = 0;
	private  var _amp			:Float = 50;
	private	 var _time		:Float = 0.8;
	var _down:Bool=false;
	
	private var rad:Float = 0;
	private var yy:Float = 0;
	
	public function new() 
	{
		//_init();
	}
	
	public function init() 
	{
		
		var o = { hoge:"fuga" };
		trace(o.hoge);
		
		_clock = new Clock();
		
		_scene = new Scene();
		_camera = new PerspectiveCamera(60, StageRef.stageWidth / StageRef.stageHeight, 10, 50000);
		
		_camera.near = 5;
		_camera.far = 40000;
		
		var light:DirectionalLight = new DirectionalLight(0xffffff);
		light.position.set(200, 200, 200);
		_scene.add(light);
		
		//_renderer
		_renderer = new WebGLRenderer();
		_renderer.setSize(StageRef.stageWidth, StageRef.stageHeight);
		_renderer.setClearColorHex(0x000000, 1);
        Browser.document.body.appendChild(_renderer.domElement);
		_renderer.domElement.onmousedown = function(e){
			_down = true;
		}
		_renderer.domElement.onmouseup = function(e) {
			_down = false;
		}
		
		_renderer.domElement.onmousemove = function(e){
			_mouseX = e.clientX;
			_mouseY = e.clientY;
		}		 
		_renderer.domElement.onmousewheel = function(e){
			_amp += e.wheelDelta * 100;
			if (_amp < 50) _amp = 50;
		}
		
		
		/*
		_chara = new CharaMe();
		_scene.add( _chara ); 
		_chara.init(function() { trace("hoge"); } );
		_chara.position.z = 100;
		*/
		var ground:Mesh = new Mesh( new PlaneGeometry(1000, 1000, 10, 10) , new MeshBasicMaterial( { color:0xffffff, wireframe:true } ));
		ground.rotation.x = Math.PI / 2;
		_scene.add(ground);
		
		
		var gui:Dynamic = untyped __js__("new dat.GUI({ autoPlace: false })");
		gui.add(this, "_anime1");
		gui.add(this, "_anime2");
		gui.add(this, "_anime3");
		gui.add(this, "_time",0.1,1);
		if(this._chara!=null)gui.add(this._chara,"tweenTime", 0, 2);
		Browser.document.body.appendChild(gui.domElement);

		gui.domElement.style.position = "absolute";
		gui.domElement.style.right = "0px";
		gui.domElement.style.top = "0px";
		gui.domElement.style.zIndex = "8888888";
		
		_run();

		
		// this material causes a mesh to use colors assigned to faces
		/*
		var cubeMaterial:MeshBasicMaterial = new MeshBasicMaterial( { color: 0xffffff, vertexColors: Three.FaceColors } );
		var cubeGeometry:BoxGeometry = new BoxGeometry( 80, 80, 80, 3, 3, 3 );
		for ( i in 0...cubeGeometry.faces.length ) {
			var face:Face  = cubeGeometry.faces[ i ];	
			face.color.setRGB( Math.random(), Math.random(), Math.random() );		
		}
		*/
		
		/*
		var cube:Mesh = new Mesh( 
			new BoxGeometry(50, 50, 50),
			new DotMaterial()
		);
		cube.position.set(0, 0, 0);
		_scene.add(cube);
		*/
		
		var p:PointMe = new PointMe();
		p.init(null);
		_scene.add(p);
		
		
	}

	
	
	private function _anime1() 
	{
		_chara.play(0);
	}
	private function _anime2() 
	{
		_chara.play(1);
	}
	private function _anime3() 
	{
		_chara.play(2);
	}
	
	
	
	private function _run():Void
	{
		var delta:Float = _clock.getDelta();
		AnimationHandler.update( delta*_time );
		
		if(_down){
			rad = _mouseX / StageRef.stageWidth * Math.PI * 2;
			yy = (_mouseY / StageRef.stageHeight - 0.5) * 1000;
		}

			_camera.position.x = _amp * Math.cos(rad);
			_camera.position.y = yy;
			_camera.position.z = _amp * Math.sin(rad);
			_camera.lookAt(new Vector3());
		
		_renderer.render(_scene, _camera, null, false);
		
		Three.requestAnimationFrame( untyped _run);
		
	}

	
	
}