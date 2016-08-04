package ;

import camera.ExCamera;
import common.Dat;
import common.StageRef;
import effect.PostProcessing2;
import js.Browser;
import objects.MyDAELoader;
import objects.MySphere;
import objects.MyWorld;
import sound.DummyBars;
import sound.MyAudio;
import three.AmbientLight;
import three.CubeCamera;
import three.DirectionalLight;
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
	private var _cubeCamera	:CubeCamera;
	private var dae:MyDAELoader;
	private var _bure:Bure;
	private var _sphere:MySphere;
	private var _pp:PostProcessing2;
	private var _audio:MyAudio;
	private var _world:MyWorld;
	
	
	public function new() 
	{
		//_init();
	}
	
	public function init():Void
	{
		_renderer = new WebGLRenderer( { antialias:true, devicePixelRatio:1/*, preserveDrawingBuffer: true*/ } );
		_renderer.domElement.id = StageRef.name;// "webgl";
		Browser.document.body.appendChild(_renderer.domElement);
		
		Dat.init(_onInit2);
	}
	
	function _onInit2() 
	{
		_audio = new MyAudio();
		_audio.init(_onAudio);		
	}
	
	private function _onAudio():Void{
		_bure = new Bure();
		
		_scene = new Scene();
		_camera = new ExCamera(35, W / H, 10, Dat.bg ? 20000 : 2000);
		_camera.bure = _bure;
		
		
		var light:AmbientLight = new AmbientLight(0x999999);//new AmbientLight(0xaaaaaa);
		_scene.add(light);
		
		var d:DirectionalLight = new DirectionalLight(0xffffff, 1);
		d.castShadow = true;
		_scene.add(d);
		d.position.set(0, 500, 20);
		
		_renderer.domElement.width = StageRef.stageWidth;// + "px";
		_renderer.domElement.height = StageRef.stageHeight;// + "px";
		
		_camera.init(_renderer.domElement);
		
		StageRef.setCenter();
		
		_pp = new PostProcessing2();
		_pp.init(_scene, _camera, _renderer,_onLoadDAE0);
		
	}
	
	private function _onLoadDAE0():Void{
		
		//texture.needsUpdate=true;
		_cubeCamera = new CubeCamera(1, 2000, 256 );
		_cubeCamera.renderTarget.minFilter = Three.LinearMipMapLinearFilter;
		_scene.add( _cubeCamera );
		//_scene.overrideMaterial = new MeshDepthMaterial();
		
		
		_camera.radY = 0;

		dae = new MyDAELoader();
		dae.load(_onLoadDAE, _cubeCamera);
		//_scene.add(dae.dae);
		
		Dat.gui.add(_camera, "amp").listen();
		//Dat.gui.add(_pp, "flash");
		//Dat.gui.add(this, "_change");
		
		Browser.window.onresize = _onResize;
		_onResize(null);
		
	}

	
	private function _onLoadDAE():Void
	{
		_world = new MyWorld();
		_world.init(dae, _cubeCamera, _camera, _pp);
		_scene.add(_world);
		_run();
	}
	
	
	private function _onResize(e):Void
	{
		
		W = StageRef.stageWidth;
		H = StageRef.stageHeight;
		_renderer.domElement.width = W;// + "px";
		_renderer.domElement.height = H;// + "px";		
		_renderer.setSize(W, H);
		_camera.aspect = W / H;// , 10, 50000);
		_camera.updateProjectionMatrix();
		_pp.resize(W, H);
		
	}
	
	/**
	 * 
	 */
	private function _run():Void
	{
		if (_audio != null) {
			_audio.update();
		}
		
		_bure.update();
		_camera.update();
		_camera.lookAt(new Vector3(_bure.look.x, _bure.look.y, _bure.look.z));
		
		_world.update(_audio);
		_world.faceVisible(false);
		
		_world.faceVisible(true);
		//_dummy.update(_audio);
			
		if ( Dat.bg ) {
			_renderer.render(_scene, _camera);
		}else{
			_pp.update( _audio );
		}
		//_renderer.render(_scene, _camera);
		
		
		//Timer.delay(_run, Math.floor(1000 / 30));
		Three.requestAnimationFrame( untyped _run);
	}

	
	
}