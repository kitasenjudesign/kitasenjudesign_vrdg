package dede.cuts;
import js.Browser;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCut0 extends DeDeCutBase
{

	private var _counter2:Int = 0;
	
	public function new() 
	{
		super();		
	}
	
	override public function start():Void {
				
		//_lines
		_lines.visible = false;
		_lines.setGeoMax(1);
		
		_vrdg.visible = true;
		_vrdg.setGeoMax(300);
		
		_cam.setZoom(2);
		
	}

	
	
	/**
	 * next
	 */
	override public function next():Void
	{
		Tracer.log("next");
			
		var data:DeDeParam = new DeDeParam();
		data.txt = "VRDGTH";
		data.speed = 2;// 2 + 2 * Math.random();
		data.space = 3 + 10 * Math.random();
		data.startSec = Math.random();
		
		//data.isRandomLine
		//data.type = Math.floor(Math.random() * 6);
		//data.spaceX = data.spaceX;
		//reset("VRDGTH", Math.floor(Math.random() * 4), false, 0, 0, 0, 50);
		//reset( Math.floor(Math.random() * 4), data);
		
		_vrdg.changeType( data );
		
	}	
	
	
	/**
	 * update
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {		
		//_lines.up
		
		_counter++;
		if ( audio.subFreqByteData[5] > 10 && _counter > 15 ) {
			_counter = 0;
			var addVal:Float = 1 / 30;
			_vrdg.countUp( addVal );// Math.random());
		}		
		
		_counter2++;
		if ( audio.subFreqByteData[5] > 10 && _counter2 > 60*4 ) {
			_counter2 = 0;
			next();
		}
		
		_vrdg.update(audio);
	}	
	
}