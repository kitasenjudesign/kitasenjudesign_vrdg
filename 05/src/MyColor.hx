package;
import three.Color;

/**
 * ...
 * @author watanabe
 */
class MyColor
{

	public static var r:Int = 0;
	public static var g:Int = 0;
	public static var b:Int = 0;
	
	private static var _rad:Float = 0;
	
	public function new() 
	{
		
	}
	
	public static function update():Void {
		_rad += Math.PI / 500;
		r = Math.floor( 128 + 128 * (Math.sin(_rad + 1.2)) );
		g = Math.floor( 128 + 128 * (Math.sin(_rad * 1.1)) );
		b = Math.floor( 128 + 128 * (Math.sin(_rad * 1.4 + 0.7)) );
	}
	
	public static function getColor():Color {
		var rgb:Int  = (r << 16 | g << 8 | b);
		return new Color(0xffffff);
		
	}
	
}