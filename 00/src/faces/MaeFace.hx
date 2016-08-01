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
	
	
	//private var _geometry	:Geometry;
	//private var _material	:MaeShaderMaterial;
	private var _face		:MaeFaceMesh;
	private var _gauge		:MaeGauge;
	private var _plate		:MaePlate;
	private var _bg			:MaeBg;
	
	private var _life		:Int = 0;
	private var _lifeRatio	:Float = 0;

	//
	public var randomIndex:Array<Int>;	
	public var enabled		:Bool = true;
	
	
	
	
	/**
	 * new
	 * @param	g
	 */
	public function new() 
	{
		super();
		
		randomIndex = [];
		for (i in 0...16) {
			randomIndex.push( 
				Math.floor( Math.random() * 20 ) 
			);
		}		
		//_material = new MaeShaderMaterial();
		//_geometry = g;
		//visible = Math.random()<0.5 ? false : true;
		
		_face = new MaeFaceMesh();
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
			_face.addForce(f);
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
		
		_face.update(audio, _lifeRatio);
		_gauge.update(audio, _lifeRatio);
		
	}
	
	
	//public function setRotMode	
	
	public function setRotMode(mode:Int):Void {
		
		_face.setRotMode(mode);
		
	}
	
	public function setMaterial(type:Int):Void
	{
		//_material
		_face.setWireframe(type == 0);
		
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