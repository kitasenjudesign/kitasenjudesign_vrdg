package dede.cuts;
import common.Dat;
import common.Key;
import js.Browser;
import sound.MyAudio;
import typo.StrokeUtil;

/**
 * ...
 * @author watanabe
 */
class DeDeCutOneLine  extends DeDeCutBase
{

	private var _type:Int = 0;
	private var _startSec:Float = 0;
	private var data:DeDeParam;
	
	public function new() 
	{
		super();
	}
	
	override public function start():Void {
				
		_lines.visible = true;
		
		//mongon wo kimeru
		_lines.setGeoMax(300, [false, true, false]);
		_lines.reposition(3);
		//_lines.setSpeedX( DeDeLine.SPEEDX0 );
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		//_cam.setZoom(2);
		_cam.setZoom(3.1);
		
		data = DeDeParam.getParam();
		data.txt = "DEDEMOUSE KTSNJDSGN ";
		data.font = StrokeUtil.FUTURA;
		data.speedX = DeDeLine.SPEEDX0;///////////////////////////////speedx
		data.spaceX = 20;
		data.startX = DeDeLine.WIDTH/2+330;
		data.space = 3;// + 7 * Math.random();
		data.startSec = 0;
		data.sameType = DeDeParam.SAME_LINE;
		//data.isRandomLine = false;
		//line.reset( type, data, false );//
		
		_lines.changeType( data );
		
		//Dat.gui.add(this, "_speedUp");
		Key.board.addEventListener(Key.keydown, _speedUp);
		
		next();
	}
	
	private function _speedUp(e):Void {
		
		var n:Int = Std.parseInt(e.keyCode);
		if(n==Dat.S){
			data.speedX = DeDeLine.SPEEDX0 * 2;
		}
	}
	
	/**
	 * next
	 */
	override public function next():Void
	{
		
		var isRotate:Bool = _nextCounter%5==4 ? true : false;
		
		if (_nextCounter == 0) {
			_lines.setSec(0, false);
		}else{
			_lines.setSec(Math.random(), true);			
		}
		_lines.setDotType( _type, isRotate );
		_nextCounter++;
		
		_type++;
		_type = _type % 6;
		//test
		//MyPointCloud.cloud.setRandomLine();
	}	
	
	
	/**
	 * update
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {
		
		//_lines.up
		_counter++;
		if ( audio.subFreqByteData[0] > 10 && _counter > 30 ) {
			_counter = 0;
			var addVal:Float = 1 / 30;
			_lines.countUp( addVal );// Math.random());
		}
		
		_lines.update(audio);
		
	}		
	
	
	
}