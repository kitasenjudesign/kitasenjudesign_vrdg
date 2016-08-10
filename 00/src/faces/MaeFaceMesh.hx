package faces;
import objects.MyDAELoader;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class MaeFaceMesh extends Mesh
{

	public static inline var ROT_MODE_X		:Int = 0;
	public static inline var ROT_MODE_X2	:Int = 1;
	public static inline var ROT_MODE_XYZ	:Int = 2;
	public static inline var ROT_MODE_NNM	:Int = 3;
	
	private var _d:Vector3;
	private var _isForceRandom:Bool = false;
	private var _isFirst:Bool = true;
	
	public static function getRandomRot():Int {
		
		return Math.floor( Math.random() * 4 );
		
	}
	
	private var _rotMode	:Int = 0;	
	
	private var _material:MaeShaderMaterial;
	private var _geometry:Geometry;	//_geometry = g;
			
	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	private var _speedRotX:Float = -0.02;
	
	private var isFirst:Bool = true;
	
	public function new() 
	{
		
		
		_geometry = MyDAELoader.geometry;
		_material = new MaeShaderMaterial();	
		super(_geometry, _material);
		
		_d = new Vector3(
			Math.random() < 0.5 ? 1 : -1,
			Math.random() < 0.5 ? 1 : -1,
			Math.random() < 0.5 ? 1 : -1
		);
		
		scale.set(10, 10, 10);
		//this.visible = false;
	}
	
	public function setColor(b:Bool,typ:Int=0):Void
	{
		_material.setColor(b, typ);
	}
	
	public function setWireframe(b:Bool):Void
	{
		_material.setWireframe(b);
	}
	
	
	public function setRotMode(n:Int):Void {
		
		_rotMode = n;
		this.rotation.set(0, 0, 0);
		_vx = 0;
		_vy = 0;
		_vz = 0;
		
		_isForceRandom = Math.random() < 0.5 ? true : false;
	}
	
	public function addForce(idx:Int, f:Float) 
	{
		
		
		if(!_isForceRandom){
		
			if (idx == 0) _vx += f * 0.5 * _d.x;// 1 * ( Math.random() - 0.5 );
			if (idx == 1) _vy += f * 0.5 * _d.y;// 1 * ( Math.random() - 0.5 );
			if (idx == 2) _vz += f * 0.5 * _d.z;// 1 * ( Math.random() - 0.5 );
			
		}else {
			
			if (idx == 0) _vx += 1 * ( Math.random() - 0.5 );
			if (idx == 1) _vy += 1 * ( Math.random() - 0.5 );
			if (idx == 2) _vz += 1 * ( Math.random() - 0.5 );
						
		}
	}	
	
	public function update(audio:MyAudio, lifeRatio:Float):Void {
	
		_material.update(audio, lifeRatio);
		//_material.setBrightness(lifeRatio);
		//this.position.z = -lifeRatio * 100;
		/*
		this.scale.set( 
			lifeRatio * 10,
			lifeRatio * 10,
			lifeRatio * 10			
		);*/
		
		if (_isFirst) {
		
			//scale.x = 0;// (0 - scale.x) / 4;
			//scale.y = 0;// (0 - scale.x) / 4;
			//scale.z = 0;// (0 - scale.x) / 4;
			
		}else if (lifeRatio == 0) {
			//scale.set(5, 5, 5);
			scale.x += (7 - scale.x) / 4;
			scale.y += (7 - scale.y) / 4;
			scale.z += (7 - scale.z) / 4;
			/*
			rotation.x += (0 - rotation.x) / 4;
			rotation.y += (0 - rotation.y) / 4;
			rotation.z += (0 - rotation.z) / 4;
			*/
		}else {
			scale.x += (10 - scale.x) / 4;
			scale.y += (10 - scale.y) / 4;
			scale.z += (10 - scale.z) / 4;
		}
		
		switch(_rotMode) {
			case ROT_MODE_X:
				this.rotation.y += _speedRotX;
			case ROT_MODE_X2:
				this.rotation.y += _vy;
				_vy *= 0.96;
			case ROT_MODE_XYZ:
				this.rotation.x += _vx * 1.2;
				this.rotation.y += _vy;
				this.rotation.z += _vz;
			case ROT_MODE_NNM:
				this.rotation.x += _vx*0.1;// * 1.2;
				this.rotation.y += _vx;
				this.rotation.z += _vx*0.1;// * 1.2;				
		}
		
		_vx *= 0.96;
		_vy *= 0.96;
		_vz *= 0.96;		
		
	}
	
	
	public function show():Void
	{
		_isFirst = false;
	}
	
	
	
}