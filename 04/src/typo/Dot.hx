package typo;
import createjs.easeljs.Bitmap;
import createjs.easeljs.Container;
import createjs.easeljs.Graphics;
import createjs.easeljs.MovieClip;
import createjs.easeljs.Rectangle;
import createjs.easeljs.Shape;
import createjs.tweenjs.Tween;
import js.Browser;
import js.html.ImageElement;
import three.Object3D;
import three.Vector3;
import typo.data.CutData;

/**
 * ...
 * @author nab
 */
class Dot extends Object3D
{
	
	public var vx:Float = 0;
	public var vy:Float = 0;
	public var vz:Float = 0;
	
	public var isActive:Bool = false;
	
	private var _shape:Shape;
	private var _addV:Vector3;
	private var _flag:Bool=false;
	//public var r:Float = 0;
	//private var _tgtR:Float = 0;
	private var _sw:Float = 0;
	private var _sh:Float = 0;
	private var plane:TypoCanvasPlane;
	private var _target:Vector3;
	
	private var _count:Int = 0;
	private var _countLim:Int = 0;// Math.floor(100 * Math.random() + 100);
	private static var _order:Int = 1;
	private var _data:CutData;

	public function new() 
	{
		super();
		
		_target = new Vector3();
		plane = new TypoCanvasPlane();
		plane.init();
		plane.rotation.y = Math.PI / 2;
		add(plane);		
	}
	
	public function init(data:CutData):Void {
	
		_data = data;
		
		vx = 7 * (Math.random() - 0.5);
		vy = 7 * (Math.random() - 0.5);
		vz = 7 * (Math.random() - 0.5);
		
		this.renderOrder = _order++;
		
		position.x = 0;
		position.y = 0;
		position.z = 0;
		
		if (_data.maxLife == -1) {
			_countLim = -1;
		}else{
			_countLim = _order + _data.maxLife;
		}
	}
	

	
	public function getAbsV():Float {
		
		return Math.sqrt(vx * vx + vy * vy + vz*vz);
	}
	
	public function normalizeV(n:Float) 
	{
		var v:Vector3 = new Vector3(vx, vy, vz);
		vx = v.normalize().x * n;
		vy = v.normalize().y * n;
		vz = v.normalize().z * n;
		
	}
	
	
	public function look():Void
	{
		
		_target.x += (position.x + 8*vx - _target.x) / 12;
		_target.y += (position.y + 8*vy - _target.y) / 12;
		_target.z += (position.z + 8*vz - _target.z) / 12;
				
		this.lookAt( _target );
		
	}
	
	public function update(pos:Vector3) 
	{
		_count++;
		if (_countLim!=-1 && _count > _countLim) {
			//reset(pos);
		}
		
		if (plane != null) {
			plane.update();
		}
	}
	
	public function hide():Void {
		
	}
	
	public function setActive(bb:Bool) 
	{
		isActive = bb;
		visible = bb;
	}
	
	public function reset(pos:Vector3) 
	{
		_count = 0;
		
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		
		this.position.x = pos.x;
		this.position.y = pos.y;
		this.position.z = pos.z;

	}
	
	public function changeMat(isWhite:Bool) 
	{
		//hoge0001
		if (isWhite) {
			plane.changeMat(true);			
		}else{
			plane.changeMat(false);
		}
	}
	
	
}