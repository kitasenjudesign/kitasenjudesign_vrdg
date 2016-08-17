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
	
	
	public  var scene			:Scene;
	public  var camera			:ExCamera;
	public  var renderer		:WebGLRenderer;
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
		renderer = new WebGLRenderer( { antialias:true, devicePixelRatio:1/*, preserveDrawingBuffer: true*/ } );
		renderer.domElement.id = StageRef.name;	
		Browser.document.body.appendChild(renderer.domElement);
		Dat.init(_onInit);
		
	}
	
	private function _onInit():Void {

		//bg nara nanimoshinai
		if (Dat.bg) return;		
		
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
		
		scene = new Scene();
		camera = new ExCamera(45, W / H, 10, 5000);
		//_camera.bure = _bure;
		
		camera.near = 5;
		camera.far = 40000;
		
		var d:DirectionalLight = new DirectionalLight(0xffffff, 1);
		//d.castShadow = true;
		scene.add(d);
		d.position.set(0, 500, 20);
		
		renderer.setSize(W, H);
		camera.init(renderer.domElement);
		
		Browser.window.onresize = _onResize;
		_onResize(null);
		
		camera.amp = 300;
		camera.radX = 0.001;
		camera.radY = 0.001;

		dae = new MyDAELoader();
		dae.load(_onLoadDAE);
		//_scene.add(dae);
		//Dat.gui.add(this, "goFullScreen");
		Dat.gui.add(camera, "amp").listen();
		Dat.gui.add(camera, "radX",0,2*Math.PI).step(0.001).listen();
		Dat.gui.add(camera, "radY",-Math.PI,Math.PI).step(0.001).listen();
		
		camera.radX = 0.000;
		camera.radY = 0.000;
		
		MyAudio.a.globalVolume = 0.0;
	}
	
	
	/**
	 * _onLoadDAE
	 */
	private function _onLoadDAE():Void
	{
		_maeFaces = new MaeFaces();
		_maeFaces.init(this);
		scene.add(_maeFaces);
		
		StageRef.setCenter();
		_run();
	}
	
	
	function _onResize(e) 
	{
		
		W = StageRef.stageWidth;
		H = StageRef.stageHeight;
		
		renderer.domElement.width = W;// + "px";
		renderer.domElement.height = H;// + "px";		
		renderer.setSize(W, H);
		camera.aspect = W / H;// , 10, 50000);
		camera.updateProjectionMatrix();
		
	}
	
	/**
	 * 	_run
	 */
	private function _run():Void
	{
		//_bure.update();
		camera.update();
		//camera.lookAt(new Vector3());		
		
		if (_audio != null) {
			_audio.update();
		}
		
		if (_maeFaces != null && _audio != null) {
			_maeFaces.update(_audio,camera);
		}
		
		
		
		renderer.render(scene, camera);
		
		Three.requestAnimationFrame( untyped _run);
	}

	
	
}