package ;
import common.Dat;
import common.StageRef;
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
	private var _audio	:MyAudio;
	private var _isWhite:Bool = false;
	private var _pp		:PostProcessing2;
	private var _isPP:Bool=false;
	
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void
	{
		super.init();
		Dat.init(initA);
		
	}
	
	private function initA():Void {
		
		//bg nara nanimoshinai
		if (Dat.bg) return;
		
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
		_scene.fog = new Fog(0x000000, 1000, 10000);
		_run();
		
		Dat.gui.add(_camera, "amp").listen();
		Dat.gui.add(this, "_isPP").listen();
		
		_onResize(null);
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
		
		if (_isPP) {
			_pp.render();
		}else{
			_renderer.render(_scene, _camera);
		}	
		
		Three.requestAnimationFrame( untyped _run);	
		//Timer.delay(_run, Math.floor( 1000 / 30 ) );
	}
	
	
	override private function _onResize(object:Dynamic):Void
	{
		super._onResize(object);
		
		/*
		var W:Int = StageRef.stageWidth;
		var H:Int = StageRef.stageHeight;
		_renderer.domElement.width = W;// + "px";
		_renderer.domElement.height = H;// + "px";		
		_renderer.setSize(W, H);
		_camera.aspect = W / H;// , 10, 50000);
		_camera.updateProjectionMatrix();		
		*/
		if(_pp!=null){
			_pp.resize( StageRef.stageWidth, StageRef.stageHeight);
		}
		//_camera = new PerspectiveCamera( 50, Browser.window.innerWidth / Browser.window.innerHeight, 10, 50000);
		//_renderer.setSize(Browser.window.innerWidth, Browser.window.innerHeight);	
		
	}	


	
	
}