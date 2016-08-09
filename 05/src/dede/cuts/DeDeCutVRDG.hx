package dede.cuts;
import js.Browser;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCutVRDG extends DeDeCutBase
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
		
		_cam.setZoom( 2 );// * 70 / 100);
		
		next();
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
		data.space = 30 + 30 * Math.random();// 10 + 60 * Math.random();// 3 + 17 * Math.random();

		if (_nextCounter % 2 == 0) {
			data.space = 60;
		}
		
		
			
		if (_nextCounter % 4 == 0) {
			data.startSec = 0;
		}else{
			data.startSec = Math.random();
		}
		//data.isRandomLine
		//data.type = Math.floor(Math.random() * 6);
		//data.spaceX = data.spaceX;
		//reset("VRDGTH", Math.floor(Math.random() * 4), false, 0, 0, 0, 50);
		//reset( Math.floor(Math.random() * 4), data);
		
		if(_nextCounter%10==5){
			data.isRotate = true;
			MyPointCloud.cloud.setRandom(true);			
		}else if ( _nextCounter % 10 == 9) {
			data.isRotate = true;
			MyPointCloud.cloud.setRandom(true);						
		}else {
			data.isRotate = false;
			MyPointCloud.cloud.setRandom(false);			
		}
		
		_nextCounter++;
		
		_vrdg.changeType( data );//
		
		
	}	
	
	
	/**
	 * update
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {		
		//_lines.up
		
		_counter++;
		if ( _counter % 60 == 0 ) {
			_counter = 0;
			var addVal:Float = 1 / 30;
			_vrdg.countUp( addVal );// Math.random());
		}		
		
		_counter2++;
		if ( _counter2 % (60*12) == 0 ) {
			//_counter2 = 0;
			next();
		}
		
		_vrdg.update(audio);
	}	
	
}