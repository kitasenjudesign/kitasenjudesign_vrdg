package faces;

import faces.MaeGauge;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.Object3D;

/**
 * ...
 * @author watanabe
 */
class MaeFace extends Object3D
{
	
	public static inline var ROT_MODE_A:Int = 0;
	public static inline var ROT_MODE_B:Int = 1;
	public static inline var ROT_MODE_C:Int = 2;
	
	
	private var _rotMode	:Int = 0;
	
	private var _geometry	:Geometry;
	private var _material	:MaeShaderMaterial;
	private var _face		:Mesh;
	private var _gauge		:MaeGauge;
	private var _plate		:MaePlate;
	private var _bg			:MaeBg;
	
	private var _life		:Int = 0;
	private var _lifeRatio	:Float = 0;

	private var _vx:Float = 0;
	private var _vy:Float = 0;
	private var _vz:Float = 0;
	
	//
	public var randomIndex:Array<Int>;	
	public var enabled		:Bool = true;
	
	
	
	
	/**
	 * new
	 * @param	g
	 */
	public function new(g:Geometry) 
	{
		super();
		
		randomIndex = [];
		for (i in 0...16) {
			randomIndex.push( 
				Math.floor( Math.random() * 20 ) 
			);
		}		
		_material = new MaeShaderMaterial();
		_geometry = g;
		
		_face = new Mesh(_geometry, _material);
		_face.scale.set(10, 10, 10);
		//_face.scale.set(0.1, 0.1, 0.1);
		
		add( _face );
		
		_gauge = new MaeGauge(20, 5);
		_gauge.init(randomIndex);
		_gauge.position.x = 5;
		_gauge.position.y = -20;
		add(_gauge);
		
		_plate = new MaePlate();
		_plate.init(10);
		_plate.position.x = -15;
		_plate.position.y = -22;
		_plate.position.z = -1;
		add(_plate);
		
		_bg = new MaeBg();
		_bg.position.z = 0;
		
		add(_bg);
		
		//yokoni nagarete iku
	}
	
	/**
	 * init
	 */
	public function init():Void {
		
		
		
		
	}
	
	/**
	 * setHoge
	 */
	public function addForce(f:Float):Void {
		
		//_material.setWireframe( Math.random() < 0.5 ? true : false);
		
		//_force = f;
		if(!enabled){
			
			_bg.flash();
			_life = 0;
			enabled = true;/////////////////////////enabled = true;
			_vx += 0.3 * ( Math.random() - 0.5 );
			_vy += 0.3 * ( Math.random() - 0.5 );
			_vz += 0.3 * ( Math.random() - 0.5 );
			
		}	
		
	}
	
	
	
	/**
	 * update
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		//update
		if( _life++ > 15){
			enabled = false;
		}
		_calcLifeRatio();
		_updateRot();
		//_face.rotation.x += _vx;
		_face.rotation.y += _vy;
		//_face.rotation.z += _vz;
		
		_vx *= 0.97;
		_vy *= 0.97;
		_vz *= 0.97;
		//_updateRot();
		
		_material.update(audio, _lifeRatio);
		_gauge.update(audio, _lifeRatio);
		
	}
	
	
	//public function setRotMode
	
	
	private function _updateRot():Void {
		
		switch(_rotMode) {
			case ROT_MODE_A:
				this.rotation.y += _speedRotX;
			case ROT_MODE_B:
				this.rotation.y += _vy;
				_vy *= 0.96;
			case ROT_MODE_C:
				this.rotation.x += _vx * 1.2;
				this.rotation.y += _vy;
				this.rotation.z += _vz;
				_vx *= 0.98;
				_vy *= 0.96;
				_vz *= 0.96;
		}
		
	}
	
	
	public function setMaterial(type:Int):Void
	{
		
		_material.setWireframe(type == 0);
		
	}
	
	/**
	 * 
	 * @return
	 */
	private function _calcLifeRatio():Void {
		
		var nn:Float = _life / 20;
		if ( nn > 1) {
			nn = 1;
		}
		_lifeRatio = 1 - nn;
		
	}
	
	
	
	
}