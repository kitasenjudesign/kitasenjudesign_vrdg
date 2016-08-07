package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCutMultiLine  extends DeDeCutBase
{

	private var _lineType:Int = 0;
	
	public function new() 
	{
		super();
	}
	
	override public function start():Void {
		
		Tracer.debug("start");
		_reposThree();
		next();
	}
	
	private function _reposTwo():Void {
		
		_lines.visible = true;
		_lines.setGeoMax(150, [true, true, false]);
		_lines.reposition(2,150,-75+10);
		//_lines.setSpeedX( DeDeLine.SPEEDX1 );
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		_cam.setZoom(1.3);
		
		//next();		
		
	}	
	
	private function _reposThree():Void {
		
		_lines.visible = true;
		_lines.setGeoMax(150,[true,true,true]);
		_lines.reposition(3);
		//_lines.setSpeedX( DeDeLine.SPEEDX1 );
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		_cam.setZoom(0.85);
		
		//next();		
		
	}
	
	/**
	 * next
	 */
	override public function next():Void
	{
		
		_lineType++;
		switch(_lineType % 2) {
			case 0:
				_reposThree();
			case 1:
				_reposTwo();
			
		}		
		
		var data:DeDeParam = DeDeParam.getParam();
		data.speedX = -1;
		//data.spaceX = 
		_lines.changeType(data);
		
		
		//MyPointCloud.cloud.setRandomLine();
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