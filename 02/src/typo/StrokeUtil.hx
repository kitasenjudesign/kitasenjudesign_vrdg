package typo;
import net.badimon.five3D.typography.HelveticaMedium;
import three.Vector2;

/**
 * ...
 * @author nabe
 */
class StrokeUtil 
{

	private static var _map:Map<String,Array<Stroke>>;
	
	public function new() 
	{
	}
	
	/**
	 * 
	 * @param	s
	 * @return
	 */
	public static function getStrokes(s:String):Array<Stroke> {if (_map == null) {	_map = new Map();}if (_map.get(s) != null) {	return _map.get(s);}var allPoints:Array<Array<Vector2>> = [];var font:HelveticaMedium = new HelveticaMedium();var SPACE:Float = 45;var scale:Float = 2.8;		var bpoints:BePoints = new BePoints();var pp:Array<Array<Vector2>> = bpoints.getLetterPoints(s, true, scale, font, true);var strokes:Array<Stroke> = bpoints.getStrokes(pp);_map.set(s, strokes);
return strokes;
	}
	
}