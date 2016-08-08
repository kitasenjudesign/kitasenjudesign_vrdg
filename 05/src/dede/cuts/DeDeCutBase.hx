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
	private var _nextCounter:Int = 0;
	private var _isLine:Bool = false;
	
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
		
		_lines.countUp(1/30);
		_vrdg.countUp(1/30);
		
	}
	
	public function coundDown():Void {
		
		
		
	}
	
	/**
	 * @param	b
	 */
	public function setRotate(b:Bool):Void {
		
		_lines.setRotate(b);
		_vrdg.setRotate(b);
		
	}
	
	/**
	 * 
	 * @param	sec
	 */
	public function setRandomLine():Void {
	
		_isLine = !_isLine;
		MyPointCloud.cloud.setRandom(_isLine);
		
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