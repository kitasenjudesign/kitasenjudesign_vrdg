package ;
import js.Browser;

/**
 * ...
 * @author nab
 */
class Main
{
	
	
	static function main() 
	{
		
		Browser.window.onload = _onLoad;
		
	}
	
	/**
	 * 
	 * @param	e
	 */
	static private function _onLoad(e):Void
	{
	
		
		var test:CanvasTest3d = new CanvasTest3d();
		test.init();
	}
	
	
}