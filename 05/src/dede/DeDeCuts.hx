package dede;
import camera.DoubleCamera;
import common.Dat;
import common.Key;
import dede.cuts.DeDeCut0;
import dede.cuts.DeDeCut1;
import dede.cuts.DeDeCut2;
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
	private var _cut1		:DeDeCut1;
	private var _cut2		:DeDeCut2;
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
		_cut1 = new DeDeCut1();
		_cut2 = new DeDeCut2();
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
			_currentCut = _cuts[_cutIndex%_cuts.length];
			_currentCut.start();
			_cutIndex++;
		}
		
		
		if (Std.parseInt(e.keyCode) == Dat.RIGHT) {
			_currentCut.next();
		}
		if (Std.parseInt(e.keyCode) == Dat.UP) {
			//_currentCut.countUp();
		}
		if (Std.parseInt(e.keyCode) == Dat.DOWN) {
			//_currentCut.countDown();
		}		
		
		
		
		
		//_currentCut.onKeyDown( Std.parseInt(e.keyCode) );
		
	}
	
	public function update(audio:MyAudio):Void {
		
		if ( _currentCut != null ) {
			_currentCut.update(audio);
		}
		
	}
	
}