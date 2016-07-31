package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCut0 extends DeDeCutBase
{

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
		_vrdg.next();
	}	
	
	
	/**
	 * update
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {		
		//_lines.up
		_vrdg.update(audio);
	}	
	
}