package ;

import camera.ExCamera;
import common.StageRef;
import haxe.Timer;
import js.Browser;
import three.Line;
import three.Mesh;
import three.MeshBasicMaterial;
import three.PerspectiveCamera;
import three.Scene;
import three.Shape;
import three.ShapeGeometry;
import three.utils.Stats;
import three.Vector3;
import three.WebGLRenderer;

/**
 * ...
 * @author watanabe
 */

class Test3d 
{	
	private var _scene:Scene;
	private var _camera:ExCamera;
	private var _renderer:WebGLRenderer;
	private var _mouseX:Float = 0;
	private var _mouseY:Float = 0;
	private var _amp:Float=3500;
	private var _yy:Float = 400;
	private var _rad:Float = 0;
	private var _stats:Stats;
	
	public function new() {

	}
	
	public function init():Void
	{
		
		_renderer = new WebGLRenderer( { antialias:false,devicePixelRatio:1, } );
		
		_renderer.shadowMapEnabled = false;
		_scene = new Scene();
        
		//_renderer.setClearColor(0x000000, 1);
        _renderer.setSize(1280, 720);
		Browser.document.body.appendChild(_renderer.domElement);
        _renderer.domElement.id = "webgl";
		
		StageRef.setCenter();
		
		_camera = new ExCamera(60, 1280/720, 10, 10000);
		_camera.init(_renderer.domElement);
		
		
		
		
		Browser.window.onresize = _onResize;
		_onResize(null);
	}
	
	
	private function _run():Void
	{
		
		if (_camera != null) {
			_camera.update();
		}
		_renderer.render(_scene, _camera);
		
		Three.requestAnimationFrame( untyped _run);
		//Timer.delay(_run, Math.floor(1000 / 48));// 33);
	}
	
	private function _onResize(object:Dynamic):Void
	{
		
		var W:Int = StageRef.stageWidth;
		var H:Int = StageRef.stageHeight;
		_renderer.domElement.width = W;// + "px";
		_renderer.domElement.height = H;// + "px";		
		_renderer.setSize(W, H);
		_camera.aspect = W / H;// , 10, 50000);
		_camera.updateProjectionMatrix();		
		
		
		//_camera = new PerspectiveCamera( 50, Browser.window.innerWidth / Browser.window.innerHeight, 10, 50000);
		//_renderer.setSize(Browser.window.innerWidth, Browser.window.innerHeight);	
		
	}
	
	
	
}