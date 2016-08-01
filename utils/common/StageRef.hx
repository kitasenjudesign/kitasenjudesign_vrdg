package common;
import js.Browser;
import js.html.Element;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class StageRef
{

	public static inline var name:String = "webgl";
	public static var sheet:FadeSheet;
	public static var stageWidth(get, null)		:Int;
	public static var stageHeight(get, null)	:Int;
	
	public function new() 
	{
		//
	}
	

	public static function fadeIn():Void {
		
		if(sheet == null){	
			sheet = new FadeSheet(Browser.document.getElementById(name));
		}
		sheet.fadeIn();
		
	}
	
	
	public static function setCenter():Void {
		
		if (!Dat.bg) {
			
			var dom:Element = Browser.document.getElementById(name);
			var yy:Float = (Browser.window.innerHeight / 2 - StageRef.stageHeight / 2) + Config.canvasOffsetY;
			dom.style.position = "absolute";
			dom.style.top = Math.round(yy) + "px";
			
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