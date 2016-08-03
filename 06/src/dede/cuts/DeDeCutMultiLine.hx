package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCutMultiLine  extends DeDeCutBase
{

	public function new() 
	{
		super();
	}
	
	override public function start():Void {
				
		_lines.visible = true;
		
		
		_lines.setGeoMax(150,[true,true,true]);
		//_lines.setSpeedX( DeDeLine.SPEEDX1 );
		
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		_cam.setZoom(0.7);
		
	}
	
	/**
	 * next
	 */
	override public function next():Void
	{
		
		var data:DeDeParam = DeDeParam.getParam();
		data.speedX = -5;
		_lines.changeType(data);
		
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
			_lines.countUp( addVal );// Math.random());
		}
		
		_lines.update(audio);
		
	}		
	
	
	
}