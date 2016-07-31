package com.neymarshot.intro.logo;
import three.Geometry;
import three.Mesh;
import three.MeshBasicMaterial;
import tween.easing.Sine;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class Logo extends Mesh
{

	private var _baseX:Float = 0;
	private var _baseY:Float = 0;
	private var _baseZ:Float = 0;
	
	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	
	private var _material:MeshBasicMaterial;
	private var _count:Int=0;
	
	
	public function new(gg:Geometry,mm:MeshBasicMaterial) 
	{
		_material = mm;
		super(gg, mm);
	}
	
	
	public function init(xx:Float,yy:Float,zz:Float):Void {
	
		_baseX = position.x = xx;
		_baseY = position.y = yy;
		_baseZ = position.z = zz;
	
	}
	
	/**
	 * 
	 */
	public function update(isRandom:Bool=false):Void {
		
		var dx:Float = (_baseX - position.x);
		var dy:Float = (_baseY - position.y);
		var dz:Float = (_baseZ - position.z);
		
		//trace(dx, dy);
		var ax:Float = 0.5 * dx;
		var ay:Float = 0.5 * dy;
		var az:Float = 0.5 * dz;
		
		_vx += ax;
		_vy += ay;
		_vz += az;
		
		/*
		_vx *= (Params.params.masatsuX + _masatsuX);//まさつ
		_vy *= (Params.params.masatsuY + _masatsuY);  		
		_vx2 += (_vx - _vx2) / 4;
		_vy2 += (_vy - _vy2) / 4;
		*/
		
		_vx *= 0.8;
		_vy *= 0.8;
		_vz *= 0.8;
		
		if(!isRandom){
			
			//position.x += _vx;//_vx;
			//position.y += _vy; //_vy;
			//position.z += _vz; //_vz;
			
			//if (Math.random() < 0.2) {
				position.x += (_baseX - position.x) / 1.3;
				position.y += (_baseY - position.y) / 1.3;
				position.z += (_baseZ - position.z) / 1.3;
				
			//}
			_material.color.setRGB(1, 1, 1);
		}else{
			/*
			if(_count++%2==0){
				_material.color.setRGB(
					0.5 * Math.random() + 0.5,
					0.4 * Math.random() + 0.6,
					0.2 * Math.random() + 0.8);
			}else {
				_material.color.setRGB(1, 1, 1);
			}*/
			//Math.floor( 0xffffff * Math.random() );
			
			position.x = _baseX + 200 * (Math.random() - 0.5);
			position.y = _baseY + 200 * (Math.random() - 0.5);
			position.z = _baseZ + 50 + 400 * (Math.random());
			
		}
	}
	
	public function hide(time:Float) 
	{
		TweenMax.to(this.position, time, {
			ease:Sine.easeIn,
			x:position.x*2,
			y:position.y+500*(Math.random()-0.5),
			z:position.z+300*(Math.random())
		});
	}
	
	
	
	
	
}