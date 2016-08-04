package faces.lines;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class ConnectLine
{

	private var _isTween:Bool = false;
	private var _v1:Vector3;
	private var _v2:Vector3;
	private var _start:Vector3;
	private var _goal:Vector3;
	private var _count:Int = 0;
	
	public function new(v1:Vector3,v2:Vector3) 
	{
		_v1 = v1;
		_v2 = v2;
		_count = Math.floor(Math.random() * 30);
	}

	/**
	 * 
	 * @param	start
	 * @param	goal
	 */
	public function update(start:Vector3,goal:Vector3):Void {
		//if (_isTween) return;
		//if ( _count < 15 ) return;
		//_count = 0;
		_start = start;
		_goal = goal;
		_v1.copy(_start);
		_v2.copy(_goal);
	}
	
	public function update2(start:Vector3,xx:Float,yy:Float,zz:Float,col:Float ):Void {
		
		_v1.copy(start);
		
		_v2.x = xx;
		_v2.y = yy;
		_v2.z = zz;
		
	}
	
	//mae face no position
	/*
	public function update(facePos:Vector3):Void {
		
		_count++;
		_v2.copy(facePos);
		_v1.x += (facePos.x - _v1.x) / 3;
		_v1.y += (facePos.y - _v1.y) / 3;
		_v1.z += (facePos.z - _v1.z) / 3;
		
	}*/
	
}