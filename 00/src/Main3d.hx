package ;

import camera.ExCamera;
import common.Dat;
import common.StageRef;
import common.TimeCounter;
import effect.PostProcessing2;
import faces.MaeFaces;
import js.Browser;
import objects.MyDAELoader;
import sound.MyAudio;
import three.DirectionalLight;
import three.Geometry;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;
/**
 * ...
 * @author nabe
 */

class Main3d
{
	
	public static var W:Int = 1280;// 1024;// 1280;
	public static var H:Int = 800;// 768;// 1920;
	
	
	private  var _scene			:Scene;
	private  var _camera		:ExCamera;
	private  var _renderer		:WebGLRenderer;
	//private var _container:Object3D;
	private var dae:MyDAELoader;
	private var _pp:PostProcessing2;
	private var _audio:MyAudio;
	
	private var _maeFaces:MaeFaces;
	
	
	public function new() 
	{
		//_init();
	}
	
	public function init() 
	{
		
		Dat.init(_onInit);
	}
	
	private function _onInit():Void {

		_audio = new MyAudio();
		_audio.init(_onAudio);
	
	}
	
	/**
	 * 
	 */
	private function _onAudio():Void{
		//_bure = new Bure();
		
		TimeCounter.start();
		
		W = StageRef.stageWidth;
		H = StageRef.stageHeight;
		
		_scene = new Scene();
		_camera = new ExCamera(45, W / H, 10, 5000);
		//_camera.bure = _bure;
		
		_camera.near = 5;
		_camera.far = 40000;
		
		var d:DirectionalLight = new DirectionalLight(0xffffff, 1);
		d.castShadow = true;
		_scene.add(d);
		d.position.set(0, 500, 20);
		
		//_renderer
		_renderer = new WebGLRenderer( { devicePixelRatio:1, preserveDrawingBuffer: true } );
		_renderer.domElement.id = "webgl";
		//_renderer.setPixelRatio(1);
		//_renderer.shadowMapEnabled = true;
		_renderer.setSize(W, H);
	
		_camera.init(_renderer.domElement);
		
        Browser.document.body.appendChild(_renderer.domElement);
		Browser.window.onresize = _onResize;
		_onResize(null);
		
		_camera.amp = 300;
		_camera.radX = 0;
		_camera.radY = 0;

		dae = new MyDAELoader();
		dae.load(_onLoadDAE);
		//_scene.add(dae);
		//Dat.gui.add(this, "goFullScreen");
		Dat.gui.add(_camera, "amp").listen();
		
	}
	
	private function _setPos():Void {
	
		
	}
	
	//body dake
	private function goFullScreen():Void {
		untyped Browser.document.body.webkitRequestFullscreen();
	}
	
	/**
	 * _onLoadDAE
	 */
	private function _onLoadDAE():Void
	{
		/*
		var mesh:Mesh = new Mesh(
			new BoxGeometry(30, 30, 30, 1, 1, 1), 
			new MeshBasicMaterial( { color:0xff0000,wireframe:true } )
		);
		_scene.add(mesh);
		*/
		
		var geo:Geometry = dae.geometry;
		_maeFaces = new MaeFaces();
		_maeFaces.init( geo );
		_scene.add(_maeFaces);
		
		StageRef.setCenter();
		_run();
	}
	
	private function fullscreen() 
	{
		_renderer.domElement.requestFullscreen();
	}
	
	function _onResize(e) 
	{
		
		W = StageRef.stageWidth;
		H = StageRef.stageHeight;
		
		_renderer.domElement.width = W;// + "px";
		_renderer.domElement.height = H;// + "px";		
		_renderer.setSize(W, H);
		_camera.aspect = W / H;// , 10, 50000);
		_camera.updateProjectionMatrix();
		
	}
	
	/**
	 * 	_run
	 */
	private function _run():Void
	{
		if (_audio != null) {
			_audio.update();
		}
		
		if (_maeFaces != null && _audio != null) {
			_maeFaces.update(_audio);
		}
		
		//_bure.update();
		_camera.update();
		_camera.lookAt(new Vector3());
		
		_renderer.render(_scene, _camera);
		
		Three.requestAnimationFrame( untyped _run);
	}

	
	
}