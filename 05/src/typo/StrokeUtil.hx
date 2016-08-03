package typo;
import net.badimon.five3D.typography.FuturaHeavy;
import net.badimon.five3D.typography.HelveticaMedium;
import net.badimon.five3D.typography.Typography3D;
import net.badimon.five3D.typography.VrdgRegular;
import three.Vector2;

/**
 * ...
 * @author nabe
 */
class StrokeUtil 
{

	public static inline var VRDG:Int = 0;
	public static inline var FUTURA:Int = 1;
	
	private static var _map:Map<String,Array<Stroke>>;
	private static var _fonts	:Array<Typography3D>;

	public function new() 
	{
		
	}
	
	public static function init():Void {
		_fonts = [];
		_fonts[0] = new VrdgRegular();
		_fonts[1] = new FuturaHeavy();
	}
	
	public static function getWidth(moji:String,fontIndex:Int):Float {
		
		return _fonts[fontIndex].getWidth(moji);
	}
	
	/**
	 * getStrokes
	 * @param	s
	 * @return
	 */
	public static function getStrokes(s:String,scale:Float,fontIndex:Int):Array<Stroke> {
		
		if ( s == " ") {
			return [];
		}
		
		var _font:Typography3D = _fonts[fontIndex];
		
		
		if (_map == null) {
			_map = new Map();
		}
		
		if (_map.get(s) != null) {
			//get
			return _map.get(fontIndex+"_"+s);
		}
		
		var allPoints:Array<Array<Vector2>> = [];
		//var font:HelveticaMedium = new HelveticaMedium();
		//var SPACE:Float = space;// +20 * Math.random();
		//var scale:Float = 2.8;		
		
		var bpoints:BePoints = new BePoints();
		var pp:Array<Array<Vector2>> = bpoints.getLetterPoints(s, true, scale, _font, true);
		var strokes:Array<Stroke> = bpoints.getStrokes(pp);
		
		//seg
		_map.set(fontIndex+"_"+s, strokes);

		return strokes;
		
	}
	
}