package ;

import camera.DoubleCamera;
import common.Dat;
import common.StageRef;
import dede.BlinkPlane;
import dede.Boost;
import dede.DeDeCuts;
import dede.DeDeLines;
import dede.VrdgLines;
import js.Browser;
import sound.DummyBars;
import sound.MyAudio;
import three.Scene;
import three.WebGLRenderer;
import typo.StrokeUtil;


/**
 * ...
 * @author watanabe
 */

class MainDeDe
{	
	public static inline var W:Float = 1024;
	
	public var _scene		:Scene;
	public var _camera		:DoubleCamera;
	public var _lines		:DeDeLines;
	public var _vrdg		:VrdgLines;
	
	private var _renderer	:WebGLRenderer;
	
	private var _points		:MyPointCloud;
	private var _cuts		:DeDeCuts;
	private var _audio		:MyAudio;
	private var _bg:BlinkPlane;
	private var _dummy:DummyBars;
	private var _oy:Float = 0;
	
	public function new() {
	}	
	
	public function init():Void
	{

		_renderer = new WebGLRenderer( { antialias:true, devicePixelRatio:1 } );
		_renderer.domElement.id = StageRef.name;
        Browser.document.body.appendChild(_renderer.domElement);
		
		StrokeUtil.init();
		Dat.init(_onInit);	
	}
	
	/**
	 * _onInit
	 */
	private function _onInit():Void{
		
		//_renderer.autoClear = false;

		_scene = new Scene();
		_camera = new DoubleCamera();
		_camera.init(_renderer.domElement);
		_renderer.setSize(StageRef.stageWidth, StageRef.stageHeight);
		

		_audio = new MyAudio();
		_audio.init( _init2 );
		
		_bg = new BlinkPlane();
		_bg.position.z = -40;
		_bg.scale.set(2, 2, 2);
		_scene.add(_bg);
		
		if( Dat.bg ){
			_bg.visible = true;
		}else {
			_bg.visible = false;
		}
		
		#if debug
		_dummy = new DummyBars();
		_dummy.init();
		_scene.add(_dummy);
		#end
		
		//
		StageRef.setCenter();
		if (Dat.bg) {
			_oy = 100;
			StageRef.setCenter(_oy);			
		}
		
		
		Browser.document.addEventListener("keydown", _onKeyDown);
		
		Dat.gui.add(_bg, "visible");
		
		
		//Dat.gui.add(this, "_oy", -500, 500);
		//Dat.gui.add(this."_setCenter");
	
	}
	
	
	
	private function _onKeyDown(e):Void {

		//Browser.window.alert("_onKeyDown");
		
		//mode wo kaeru
		if(Dat.bg){
			if (Std.parseInt(e.keyCode) == Dat.A) {
				//_bg.flash();
				_oy += 10;
				StageRef.setCenter(_oy);
			}
			if (Std.parseInt(e.keyCode) == Dat.Z) {
				//_bg.flash();
				_oy -= 10;
				StageRef.setCenter(_oy);
			}
		}
		
		
		if (Std.parseInt(e.keyCode) == Dat.RIGHT) {
			//_bg.flash();
		}
		if (Std.parseInt(e.keyCode) == Dat.O) {
			_camera.setCamType(DoubleCamera.TYPE_O);
		}
		if (Std.parseInt(e.keyCode) == Dat.P) {
			_camera.setCamType(DoubleCamera.TYPE_P);
		}
		
		
	}
	
	/**
	 * _init2
	 */
	private function _init2():Void{
		
		Browser.window.onresize = cast _onResize;
		_onResize(null);

		_points = new MyPointCloud();
		_points.init();
		_scene.add(_points);
				
		_lines = new DeDeLines();
		_lines.init();
		_scene.add(_lines);
				
		_vrdg = new VrdgLines();
		_vrdg.init();
		_scene.add(_vrdg);
		
		_cuts = new DeDeCuts();
		_cuts.init(this);
		
		_run();
		
	}
	

	/**
	 * 
	 */
	private function _run():Void
	{
		_audio.update();
	
		if(_dummy!=null){
			_dummy.update(_audio);
		}
		
		if(_bg.visible && Boost.isBoost){
			_bg.setLight(_audio);
		}
		
		MyColor.update();
		
		_points.update();
		
		_cuts.update(_audio);
		//if(_lines!=null) _lines.update(_audio);/////lines
		//if(_vrdg!=null) _vrdg.update(_audio);
		
		_points.connectRandomLine();

		_camera.update();
	
		_renderer.render(_scene, _camera.getCamera() );

		Three.requestAnimationFrame( untyped _run);
	}
	
	
	private function _onResize(object):Void
	{
		_camera.resize();
		_renderer.setSize(StageRef.stageWidth, StageRef.stageHeight);	
		
	}
	
	
	
}