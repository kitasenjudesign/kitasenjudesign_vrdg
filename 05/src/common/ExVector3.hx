package common;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class ExVector3 extends Vector3
{

	public var enabled:Bool = true;
	public var r:Float = 0;
	public var sr:Float = 0;
	public var pos:Float = 0;
	public var rIndex:Int = 0;
	public var connect:Bool = false;
	/*
	public var ox:Float = 0;
	public var oy:Float = 0;
	public var oz:Float = 0;

	public var vx:Float = 0;
	public var vy:Float = 0;
	public var vz:Float = 0;
	*/
	
	public function new(xx:Float,yy:Float,zz:Float) 
	{
		super(xx, yy, zz);
	}
	/*
	public function update() 
	{
		ox += vx;
		oy += vy;
		vx *= 0.99;
		vy *= 0.99;
	}*/
	
}