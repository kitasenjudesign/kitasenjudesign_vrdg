package dede.cuts;
import camera.DoubleCamera;
import dede.DeDeLines;
import dede.VrdgLine;
import js.Browser;
import sound.MyAudio;
import three.Scene;

/**
 * ...
 * @author watanabe
 */
class DeDeCutBase
{
	private var _counter:Int = 0;
	private var _cam:DoubleCamera;
	private var _lines:DeDeLines;
	private var _vrdg:VrdgLines;
	private var _scene:Scene;
	
	public function new() 
	{
		
	}
	
	/**
	 * 
	 * @param	main
	 */
	public function init(main:MainDeDe):Void {
		
		//Tracer.
		_cam = main._camera;
		_lines = main._lines;
		_vrdg = main._vrdg;
		_scene = main._scene;
		
		//Browser.window.alert( ">>>" + main._lines );
		
	}
	
	public function start():Void {
		
		
	}
	
	public function countUp():Void {
		
		
	}
	
	public function coundDown():Void {
	
		
	}
	
	public function next():Void
	{
		
	}
	
	
	/**
	 * 
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		
		
	}
	
	
}