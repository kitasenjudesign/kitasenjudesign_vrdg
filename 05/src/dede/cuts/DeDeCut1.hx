package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCut1  extends DeDeCutBase
{

	public function new() 
	{
		super();
	}
	
	override public function start():Void {
				
		_lines.visible = true;
		
		//mongon wo kimeru
		_lines.setGeoMax(300,[false,true,false]);
		_lines.setSpeedX( DeDeLine.SPEEDX0 );
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		_cam.setZoom(2);
		
	}
	
	/**
	 * next
	 */
	override public function next():Void
	{
		//set dot type
		_lines.next();
	}	
	
	
	/**
	 * update
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {
		
		//_lines.up
		_lines.update(audio);
		
	}		
	
	
	
}