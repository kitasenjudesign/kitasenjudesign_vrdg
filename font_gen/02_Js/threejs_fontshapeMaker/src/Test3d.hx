package ;

import js.Browser;
import three.AmbientLight;
import three.DirectionalLight;
import three.Mesh;
import three.PerspectiveCamera;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;

/**
 * ...
 * @author watanabe
 */

class Test3d 
{	
	private var _scene:Scene;
	private var _camera:PerspectiveCamera;
	private var _renderer:WebGLRenderer;
	private var _mouseX:Float = 0;
	private var _mouseY:Float = 0;
	private var _amp:Float=400;
	private var _yy:Float = 400;
	private var _rad:Float = 0;
	
	public function new() {

	}
	
	public function init():Void
	{
		_renderer = new WebGLRenderer( {antialias:true});
		_scene = new Scene();
        _camera = new PerspectiveCamera(60, Browser.window.innerWidth / Browser.window.innerHeight, 10, 50000);
		_renderer.setClearColorHex(0x000000, 1);
        _renderer.setSize(Browser.window.innerWidth, Browser.window.innerHeight);
		var light:DirectionalLight = new DirectionalLight(0xffffff);
		light.position.set(100, 400, 500);
		var light2:AmbientLight = new AmbientLight(0x888888);
		_scene.add(light2);
		
		_scene.add(light);
		
        Browser.document.body.appendChild(_renderer.domElement);
				
		Browser.document.onmousemove = function(event){
			
            _mouseX = (event.clientX - Browser.window.innerWidth / 2) / Browser.window.innerWidth;
            _mouseY = (event.clientY - Browser.window.innerHeight / 2) / Browser.window.innerHeight;
        };
		
		_run();
		
		Browser.document.onmousewheel = function(e) {
			_amp += e.wheelDelta*0.5;
			if(_amp<100)_amp=100;
		}
					
		Browser.window.onresize = _onResize;
		_onResize(null);
	}
	
	public function add(m:Mesh):Void {
		_scene.add(m);
	}

	public function remove(m:Mesh):Void {
		_scene.remove(m);
	}

	
	private function _run():Void
	{
		Three.requestAnimationFrame( untyped _run);
		var date:Date = Date.now();

		_rad = _mouseX * 4 * Math.PI + Math.PI / 2;
		_yy = _amp * _mouseY * 2.2;
			
		_camera.position.x +=  (_amp * Math.cos(_rad) -_camera.position.x) / 4;
		_camera.position.y +=  ( (_yy ) - _camera.position.y ) / 4;
		_camera.position.z +=  (_amp * Math.sin(_rad) - _camera.position.z) / 4;
		_camera.lookAt( new Vector3(0, 0, 0) );

		
		_renderer.render(_scene, _camera);
	}
	
	function _onResize(object) 
	{
		
		_camera = new PerspectiveCamera( 60, Browser.window.innerWidth / Browser.window.innerHeight, 10, 50000);
		_renderer.setSize(Browser.window.innerWidth, Browser.window.innerHeight);	
		
	}
	
	
	
}