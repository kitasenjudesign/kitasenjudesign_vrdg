package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCut2  extends DeDeCutBase
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