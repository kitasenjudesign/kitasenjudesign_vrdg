package dede;
import camera.DoubleCamera;
import common.Dat;
import common.Key;
import dede.cuts.DeDeCut0;
import dede.cuts.DeDeCutOneLine;
import dede.cuts.DeDeCutMultiLine;
import dede.cuts.DeDeCutBase;
import dede.VrdgLine;
import js.Browser;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCuts
{

	private var _cut0		:DeDeCut0;
	private var _cut1		:DeDeCutOneLine;
	private var _cut2		:DeDeCutMultiLine;
	private var _cuts		:Array<DeDeCutBase>;
	private var _cutIndex	:Int = 0;
	private var _currentCut	:DeDeCutBase;
	private var _camera		:DoubleCamera;
	private var _lines		:DeDeLines;
	private var _vrdg:VrdgLine;
	
	public function new() 
	{
		
	}
	
	/**
	 * 
	 * @param	main
	 */
	public function init(main:MainDeDe):Void {
		
		//Browser.window.alert("unko");
		
		_cut0 = new DeDeCut0();
		_cut1 = new DeDeCutOneLine();
		_cut2 = new DeDeCutMultiLine();
		_cut0.init(main);
		_cut1.init(main);
		_cut2.init(main);
		
		_cutIndex = 0;	
		_cuts = [
			_cut0,_cut1,_cut2
		];
		
		//start
		_currentCut = _cut0;	
		_cut0.start();
		
		Key.board.addEventListener("keydown", _onKeyDown);
		
	}
	
	/**
	 * _onKeyDown
	 * @param	e
	 */
	private function _onKeyDown(e):Void {

		Tracer.log("_onKeyDown");
		
		//mode wo kaeru
		if (Std.parseInt(e.keyCode) == Dat.C) {
			
			_cutIndex++;
			_currentCut = _cuts[_cutIndex%_cuts.length];
			_currentCut.start();
			
		}
		
		
		if (Std.parseInt(e.keyCode) == Dat.RIGHT) {
			_currentCut.next();
		}
		if (Std.parseInt(e.keyCode) == Dat.UP) {
			_currentCut.countUp();
		}
		if (Std.parseInt(e.keyCode) == Dat.LEFT) {
			//_currentCut.countDown();
			_currentCut.setRandomLine();
		}		
		
		
		
		
		//_currentCut.onKeyDown( Std.parseInt(e.keyCode) );
		
	}
	
	public function update(audio:MyAudio):Void {
		
		if ( _currentCut != null ) {
			_currentCut.update(audio);
		}
		
	}
	
}