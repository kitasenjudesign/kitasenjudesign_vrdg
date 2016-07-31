package ;
import common.Dat;
import effect.PostProcessing2;
import js.Browser;
import logo.Logos;
import sound.MyAudio;
import three.Color;
import three.DirectionalLight;
import three.Fog;
import three.Mesh;
import typo.Dots;

/**
 * ...
 * @author nab
 */
class CanvasTest3d extends Test3d
{

	private var _dots	:Dots;
	private var _ground	:Mesh;
	private var _light	:DirectionalLight;
	private var _audio	:MyAudio;
	private var _isWhite:Bool = false;
	private var _pp		:PostProcessing2;
	
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void
	{
		super.init();
		Dat.init();
		Logos.init(initB);
	}
	
	private function initB():Void {
	
		Logos.init2();
		_audio = new MyAudio();
		_audio.init(initC);		
		
	}
	
	private function initC():Void {
		
		_pp = new PostProcessing2();
		_pp.init(_scene,_camera,_renderer);
		
		
		_dots = new Dots();
		_dots.init(1280, 720);
		_scene.add(_dots);
		_scene.fog = new Fog(0x000000, 1000, 7000);
		_run();
		
		Dat.gui.add(_camera, "amp").listen();

		Browser.document.addEventListener("keydown", _onKeyDown);
	}
	
	
	private function _onKeyDown(e):Void {
	
		trace("keydown");
		switch(Std.parseInt(e.keyCode)) {
			case Dat.LEFT:
				_pp.changeTexture();
				
			case Dat.RIGHT:
				_pp.changeTexture();
				
			case Dat.B:
				_isWhite = !_isWhite;
				if (_isWhite) {
					_renderer.setClearColor(new Color(0x0000ff));
					_dots.setWhite(true);
				}else{
					_renderer.setClearColor(new Color(0));					
					_dots.setWhite(false);					
				}		
			
		}
	}
	
	
	/**
	 * 
	 */
	override private function _run():Void {

		if (_audio != null) {
			_audio.update();
		}
		
		if (_dots != null) {
			_dots.update(_audio,_camera);
		}
		
		if (_camera != null) {
			_camera.update();
		}
		
		//_renderer.render(_scene, _camera);
		_pp.render();
		
		Three.requestAnimationFrame( untyped _run);	
		//Timer.delay(_run, Math.floor( 1000 / 30 ) );
	}

	
	
}