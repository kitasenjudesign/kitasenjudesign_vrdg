package data;
import three.Vector2;

/**
 * ...
 * @author nabe
 */
class Paths
{

	
	private var _points:Array<Vector2>;
	
	public function new() 
	{
	}


	public function init(points:Array<Vector2>):Void {_points = points;
	}
	
	public function getPoints():Array<Vector2> {return _points;
	}
	
	/**
	 * 
	 * @param	ratio
	 */
	public function getPoint(r:Float):Vector2 {var n:Int = Math.floor(r * _points.length );	var index1:Int = n;var index2:Int = n+1;var p1:Vector2 = _points[ index1 ];var p2:Vector2 = index2>=_points.length ? _points[0] : _points[ index2 ];var p:Vector2 = null;if(p1!=null && p2!=null){	var xx:Float = r * p1.x + (1 - r) * p2.x;	var yy:Float = r * p1.y + (1 - r) * p2.y;	p = new Vector2(xx, yy);}else {	if (p1!=null) p = p1;	if (p2!=null) p = p2;}	return p;
	}
	
	
}