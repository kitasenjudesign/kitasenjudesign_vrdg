package typo;
import createjs.easeljs.Point;
import three.Vector2;

/**
 * ...
 * @author nab
 */
class Stroke
{
private var _points:Array<Vector2> = [];private var _distance:Float = 0;private var _distances:Array<Float> = [];private var _currentDist:Float = 0;public function Stroke() {	}
public function init(points:Array<Vector2>):Void {		_points = points;	_distance = 0;	//for (var i:int = 0; i < _points.length-1; i++) {	for(i in 0..._points.length-1){		var p1:Vector2 = _points[i];		var p2:Vector2 = _points[i + 1];		var dx:Float = p2.x - p1.x;		var dy:Float = p2.y - p1.y;		var d:Float = Math.sqrt(dx * dx + dy * dy);		_distances[i] = _distance;		_distance += d;	}	_distances.push(_distance);
}public function getNextPosition(dx:Float):Vector2 {		if (_currentDist >= _distance) _currentDist = 0;	_currentDist += dx;	return getPosition( _currentDist / _distance );	}public function getPosition(ratio:Float):Vector2 {		if (ratio < 0) ratio = 0;	if (ratio >= 1) ratio = 1;			var tgtDist:Float = _distance * ratio;	var dist:Float = 0;	var index:Int = 0;	while (true) {				if (_distances[index] >= tgtDist) {			//超えた			break;		}				index++;			}		var n			:Int = index;//超えたn	var r			:Float = (tgtDist - _distances[n-1]) / (_distances[n] - _distances[n-1]);//割合	r = 1 - r;		//trace( Math.floor( ratio * 1000 ) + " " + r );			var index1:Int = n - 1;	var index2:Int = n;		//var p1:Vector2 = index1<0 ? null : _points[ index1 ];	var p1:Vector2 = index1 < 0 ? null : _points[ index1 ];	var p2:Vector2 = _points[ index2 ];	var p:Vector2 = null;		if(p1!=null && p2!=null){		var xx:Float = r * p1.x + (1 - r) * p2.x;		var yy:Float = r * p1.y + (1 - r) * p2.y;		p = new Vector2(xx, yy);	}else {		if (p1!=null) p = p1;		if (p2!=null) p = p2;	}		return p;}public function getPoints():Array<Vector2> {	return _points;}public function getDistance():Float {	return _distance;}public function getNum():Int {	return Math.floor( _distance / 24 );}	
}