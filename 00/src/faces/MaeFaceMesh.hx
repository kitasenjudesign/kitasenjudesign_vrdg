package faces;
import objects.MyDAELoader;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;

/**
 * ...
 * @author watanabe
 */
class MaeFaceMesh extends Mesh
{

	public static inline var ROT_MODE_A:Int = 0;
	public static inline var ROT_MODE_B:Int = 1;
	public static inline var ROT_MODE_C:Int = 2;	
	private var _rotMode	:Int = 0;	
	
	private var _material:MaeShaderMaterial;
	private var _geometry:Geometry;	//_geometry = g;
			
	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	
	
	
	public function new() 
	{
		_geometry = MyDAELoader.geometry;
		_material = new MaeShaderMaterial();	
		super(_geometry, _material);
		
		scale.set(10, 10, 10);

	}
	
	public function setColor(b:Bool):Void
	{
		_material.setColor(b);	
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
	}
	
	public function addForce(f:Float) 
	{
		
		_vx += 0.1 * ( Math.random() - 0.5 );
		_vy += 0.1 * ( Math.random() - 0.5 );
		_vz += 0.1 * ( Math.random() - 0.5 );
		
	}	
	
	public function update(audio:MyAudio, lifeRatio:Float):Void {
	
		_material.update(audio, lifeRatio);
		
		//this.position.z = -lifeRatio * 100;
		/*
		this.scale.set( 
			lifeRatio * 10,
			lifeRatio * 10,
			lifeRatio * 10			
		);*/
		
		switch(_rotMode) {
			case ROT_MODE_A:
				this.rotation.y += _vx;// _speedRotX;
			case ROT_MODE_B:
				this.rotation.y += _vy;
				_vy *= 0.96;
			case ROT_MODE_C:
				this.rotation.x += _vx * 1.2;
				this.rotation.y += _vy;
				this.rotation.z += _vz;
				
		}
		
		_vx *= 0.98;
		_vy *= 0.96;
		_vz *= 0.96;		
		
	}
	
	
	
}