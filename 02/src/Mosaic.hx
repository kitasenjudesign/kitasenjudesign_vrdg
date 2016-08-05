package;
import camera.ExCamera;
import canvas.CanvasSrc;
import emoji.Emojis;
import sound.MyAudio;
import three.Object3D;
import three.Scene;
import three.WebGLRenderer;

/**
 * ...
 * @author nabe
 */
class Mosaic extends Object3D
{

	//public static var MODE_MOSAIC:String = "MODE_MOSAIC";
	//public static var MODE_SLITTER:String = "MODE_SLITTER";
	
	//private var _mode:String = MODE_MOSAIC;
	
	private var _emoji	:Emojis;
	private var _renderer:WebGLRenderer;
	private var _scene	:Scene;
	private var _camera:ExCamera;

	private var _isAutoClear:Bool = false;
	public static var forceClear:Bool = false;
	
	
	public function new() 
	{
		super();
	}
	
	
	public function init(scene:Scene,camera:ExCamera, renderer:WebGLRenderer):Void {
		
		_scene = scene;
		_renderer = renderer;
		_camera = camera;
		
		_emoji = new Emojis();		
		_emoji.init( _scene, camera, CanvasSrc.W, CanvasSrc.H );
	
		showMosaic();
		
		//Browser.document.addEventListener("keydown", _onKeyDown);
		
	}
	
	/*
	private function _onKeyDown(e):Void {
	
		if ( Std.parseInt( e.keyCode ) == Dat.C ) {
			if (_mode == MODE_MOSAIC) {
				showSlitter();
			}else {
				showMosaic();
			}
		}
		
	}
	*/
	
	/**
	 * 
	 * @return
	 */
	public function showMosaic():Void {
		//_mode = MODE_MOSAIC;
		
		_emoji.particles.visible = true;
		//_sliter.visible = false;
		
		_isAutoClear = true;
		
		_emoji.isActive = true;
		//_sliter.isActive = false;
		
	}
	

	/**
	 * 
	 * @param	render
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		
		if(_emoji.particles.visible){
			_emoji.update(audio);
		}
		
		_renderer.autoClearColor = _isAutoClear;
		//_renderer.autoClearDepth = true;
		//_renderer.autoClearStencil = true;		
		
		if (forceClear)_renderer.autoClearColor = true;
		
		_renderer.render(_scene, _camera);
		
		forceClear = false;
	}
	
}