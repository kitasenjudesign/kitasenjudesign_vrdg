package camera;
import common.Dat;
import js.Browser;

/**
 * ...
 * @author nabe
 */
class CamAngle
{

	public function new() 
	{
		
	}
	
	public function init():Void {
	
		Browser.document.addEventListener("keydown", _onKeyDown);
		
	}
	
	private function _onKeyDown(e):Void {
	
		switch(Std.parseInt(e.keyCode)) {
			case Dat.UP
			
			
			case Dat.DOWN
			
			
		}
		
		
	}
	
}