package fbo;
import camera.ExCamera;
import common.Dat;
import common.StageRef;
import effect.PostProcessing2;
import emoji.Emoji;
import js.Browser;
import sound.MyAudio;
import three.BoxGeometry;
import three.Color;
import three.Line;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Points;
import three.Scene;
import three.WebGLRenderer;

/**
 * ...
 * @author watanabe
 */
class FboMain
{
	
	private var _renderer	:WebGLRenderer;
	private var _camera		:ExCamera;
	private var _scene		:Scene;
	private var _fbo		:Fbo;
	//private var _emoji		:Emoji;
	private var _particles	:Points;
	private var _audio		:MyAudio;
	private var _pp			:PostProcessing2;
	private var _line		:Line;
	
	public function new() 
	{
		//
	}
	
	
	/**
	 * init
	 */
	public function init():Void {
		
		_renderer = new WebGLRenderer(
			{
			/*preserveDrawingBuffer: true,*/ 
				antialias:false, 
				devicePixelRatio:1
				//logarithmicDepthBuffer: true
			}
		);
		_renderer.domElement.id = "webgl";
		Browser.document.body.appendChild( _renderer.domElement );		
		
		Dat.init(_onInit2);
	}
	
	
	/**
	 * _onInit2
	 */
	private function _onInit2():Void
	{
		_audio = new MyAudio();
		_audio.init(_onAudio);	
	}
	
	private function _onAudio():Void {
		
		StageRef.setCenter();
		
		_scene = new Scene();
		_camera = new ExCamera(40, Browser.window.innerWidth / Browser.window.innerHeight, 1, 10000);
		_camera.init(_renderer.domElement);
		_camera.amp = 1000;
		
		//_renderer.shadowMapEnabled = true;
		_renderer.setClearColor(new Color(0x000000));
		
		_pp = new PostProcessing2();
		_pp.init(_scene, _camera, _renderer);
		
		
		_fbo = new Fbo();
		var num:Int = 128;
		_fbo.init(num, num);
		_particles = _fbo.getParticles();
		_scene.add(_particles);
		_line = _fbo.getLine();
		_scene.add(_line);
		//_scene.add(_fbo.getMesh());
		//_emoji = new Emoji();
		//_emoji.init();
		//_scene.add(_emoji);
		
		var mesh:Mesh = new Mesh(
			new BoxGeometry(50, 50, 50, 1, 1, 1), 
			new MeshBasicMaterial( { color:0xff0000, wireframe:true } )
		);
		//_scene.add(mesh);
		
		Browser.window.onresize = _onResize;
		_onResize(null);
		
		Dat.gui.add(this, "change");
		
		update();
	}
	
	public function change():Void {
		
		_pp.change(false, true);
		_line.visible = Math.random() < 0.5 ? true : false;
		
	}
	
	/**
	 * update
	 */
	public function update():Void {
		
		if (_audio != null) {
			_audio.update();
		}		
		
		if (_fbo != null) {
			_fbo.update(_audio,_renderer);
		}
		
		_camera.radX += Math.PI / 720;// 180;
		_camera.update();
		
		_pp.update(_audio);
		
		Three.requestAnimationFrame( untyped update);		

		
				
	}

	public function _onResize(e):Void {
		
		var ww:Int = StageRef.stageWidth;
		var hh:Int = StageRef.stageHeight;
		_renderer.domElement.width = ww;// + "px";
		_renderer.domElement.height = hh;// + "px";		
		_renderer.setSize(ww, hh);
		_camera.aspect = ww / hh;// , 10, 50000);
		_camera.updateProjectionMatrix();
		_pp.resize(ww, hh);		
	}
	
	
}