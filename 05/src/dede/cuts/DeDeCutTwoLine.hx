package dede.cuts;
import sound.MyAudio;

/**
 * ...
 * @author watanabe
 */
class DeDeCutTwoLine  extends DeDeCutMultiLine
{

	public function new() 
	{
		super();
	}
	
	override public function start():Void {
				
		_reposTwo();
		
	}
	
	/*
	private function _reposTwo():Void {
		
		_lines.visible = true;
		_lines.setGeoMax(150, [true, true, false]);
		_lines.reposition(2,150,-75-10);
		//_lines.setSpeedX( DeDeLine.SPEEDX1 );
		
		_vrdg.visible = false;
		_vrdg.setGeoMax(1);
		
		_cam.setZoom(1.3);
		
		next();		
		
	}*/
	
	
	
	
}