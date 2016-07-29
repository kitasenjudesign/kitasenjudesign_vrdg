package common;
import js.Browser;
import js.html.Element;

/**
 * ...
 * @author watanabe
 */
class StageRef
{

	public static var stageWidth(get, null)		:Int;
	public static var stageHeight(get, null)	:Int;
	
	public function new() 
	{
		//
	}
	
	public static function setCenter():Void {
		
		if (!Dat.bg) {
			var dom:Element = Browser.document.getElementById("webgl");
			dom.style.position = "absolute";
			dom.style.top = (Browser.window.innerHeight / 2 - StageRef.stageHeight / 2) + "px";
		}
				
		
	}
	
	static public function get_stageWidth():Int
	{
		return Browser.window.innerWidth;
	}
	static public function get_stageHeight():Int
	{
		if ( Dat.bg ) {
			return Browser.window.innerHeight;
		}
		
		return Math.floor( Browser.window.innerWidth * 576 / 1920 );
	}		
	
	
}