package fbo;
import camera.ExCamera;
import common.Dat;
import emoji.Emoji;
import js.Browser;
import sound.MyAudio;
import three.BoxGeometry;
import three.Color;
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
	private var _emoji		:Emoji;
	private var _particles	:Points;
	private var _audio		:MyAudio;
	
	public function new() 
	{
		
	}
	
	
	/**
	 * init
	 */
	public function init():Void {
		Dat.init(_onInit2);
	}
	
	
	private function _onInit2():Void
	{
		_audio = new MyAudio();
		_audio.init(_onAudio);	
	}
	
	private function _onAudio():Void{
	
		_renderer = new WebGLRenderer(
			{
			/*preserveDrawingBuffer: true,*/ 
				antialias:false, 
				devicePixelRatio:1,
				logarithmicDepthBuffer: true
			}
		);
		Browser.document.body.appendChild( _renderer.domElement );
		_renderer.setSize(Browser.window.innerWidth,Browser.window.innerHeight);
		
		_scene = new Scene();
		_camera = new ExCamera(40, Browser.window.innerWidth / Browser.window.innerHeight, 1, 10000);
		_camera.init(_renderer.domElement);
		_camera.amp = 1000;
		
		//_renderer.shadowMapEnabled = true;
		_renderer.setClearColor(new Color(0x000000));
		
		
		_fbo = new Fbo();
		var num:Int = 128;
		_fbo.init(num, num);
		_particles = _fbo.getParticles();
		_scene.add(_particles);
		_scene.add(_fbo.getLine());
		//_scene.add(_fbo.getMesh());
		//_emoji = new Emoji();
		//_emoji.init();
		//_scene.add(_emoji);
		
		var mesh:Mesh = new Mesh(
			new BoxGeometry(50, 50, 50, 1, 1, 1), 
			new MeshBasicMaterial( { color:0xff0000, wireframe:true } )
		);
		//_scene.add(mesh);
		
		
		update();
	}
	
	/**
	 * 
	 */
	public function update():Void {
		
		if (_audio != null) {
			_audio.update();
		}		
		
		if (_fbo != null) {
			_fbo.update(_renderer);
		}
		if ( _emoji != null ) {
			_emoji.update();
		}
		
		_camera.radX += Math.PI / 180;
		_camera.update();
		_renderer.render(_scene, _camera);
		//_pp.render();	
		//Timer.delay(_run, Math.floor(1000 / 30));
		Three.requestAnimationFrame( untyped update);		

	}
	
}