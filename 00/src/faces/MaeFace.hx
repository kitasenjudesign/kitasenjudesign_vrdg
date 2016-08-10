package faces;

import faces.lines.MaeFaceLine;
import faces.MaeGauge;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.Object3D;
import three.Vector3;
import tween.TweenMax;

/**
 * ...
 * @author watanabe
 */
class MaeFace extends Object3D
{
	
	public static inline var MAT_NORMAL:Int = 0;
	public static inline var MAT_COLOR:Int = 1;	
	public static inline var MAT_WIRE_WHITE:Int = 2;
	public static inline var MAT_WIRE_COLOR:Int = 3;
	public static inline var MAT_COLOR_RED:Int = 4;	
	
	
	//private var _geometry	:Geometry;
	//private var _material	:MaeShaderMaterial;
	private var _face		:MaeFaceMesh;
	private var _gauge		:MaeGauge;
	private var _plate		:MaePlate;
	private var _bg			:MaeBg;
	
	private var _life		:Int = 0;
	private var _lifeRatio	:Float = 0;
	private var _line		:MaeFaceLine;
	private var _isFirst	:Bool = true;
	
	//
	public var randomIndex:Array<Int>;	
	public var enabled		:Bool = false;
	
	
	
	
	
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
		
		_gauge = new MaeGauge(30, 2);
		_gauge.init(randomIndex);
		_gauge.position.x = 0;
		_gauge.position.y = -16.5;
		add(_gauge);
		
		_plate = new MaePlate();
		_plate.init();
		_plate.position.x = 0;
		_plate.position.y = 17;
		_plate.position.z = -1;
		add(_plate);
		
		_bg = new MaeBg();
		_bg.position.z = 0;
		add(_bg);
		
		_face.visible = true;
		_gauge.visible = true;
		_plate.visible = true;
		show();
		//
		_line = new MaeFaceLine();
	}
	
	/**
	 * init
	 */
	public function init():Void {
		
	}
	
	public function show():Void {
		
		if (!_isFirst) return;
		_isFirst = false;
		
		_face.show();
		_face.visible = true;
		_gauge.visible = true;
		_plate.visible = true;		
		
	}	
	

	
	/**
	 * setHoge
	 */
	public function addForce(idx:Int, f:Float):Void {
		
		//_material.setWireframe( Math.random() < 0.5 ? true : false);
		//_force = f;
		if (!enabled) {
			show();
			_bg.flash();
			_life = 0;
			enabled = true;/////////////////////////enabled = true;
			//_face.show();
			_face.addForce(idx,f);
		}	
		
	}
	
	
	
	
	
	
	//public function setRotMode	
	
	public function setRotMode(mode:Int):Void {
		
		_face.setRotMode(mode);
		
	}
	
	public function setMaterial(type:Int):Void
	{
		
		switch(type) {
			case MAT_NORMAL:
				_face.setWireframe(false);
				_face.setColor(false);
				
			case MAT_COLOR:
				_face.setWireframe(false);
				_face.setColor(true,MaeShaderMaterial.MAT_COLOR_RANDOM);
				
			case MAT_WIRE_WHITE:
				_face.setWireframe(true);
				_face.setColor(false);		
				
			case MAT_WIRE_COLOR:
				_face.setWireframe(true);
				_face.setColor(true,MaeShaderMaterial.MAT_COLOR_RANDOM);	
				
			case MAT_COLOR_RED:
				_face.setWireframe(false);
				_face.setColor(true,MaeShaderMaterial.MAT_COLOR_RED);
				
				
		}
		
		//_material
		
		
		//setWireframe
		
	}
	
	
	public function updatePlate(id:Int=-1):Void {
		
		_plate.updateText(id);
		
	}
	
	public function addLineVertex(v1:Vector3,v2:Vector3) 
	{
		_line.addVertex(v1,v2);
	}
	
	
	public function connectLine(idx:Int, v1:Vector3, col:Float):Void
	{
		var p1:Vector3 = position;
		if(idx==0)_line.lines[0].update2(v1, p1.x-15, p1.y-17.5, p1.z, col);
		if(idx==1)_line.lines[1].update2(v1, p1.x-15, p1.y-16.5, p1.z, col);
		if(idx==2)_line.lines[2].update2(v1, p1.x-15, p1.y-15.5, p1.z, col);	
		
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
	
	
	/**
	 * update
	 * @param	audio
	 */
	public function update(audio:MyAudio):Void {
		//update
		if( _life++ > 15){
			enabled = false;
		}else {
			enabled = true;
		}
		_calcLifeRatio();
		//ad_line.update(this.position);
		_face.update(audio, _lifeRatio);
		_gauge.update(audio, _lifeRatio);
		
	}
	
	public function updateGauge(idx:Int,ff:Float):Void {
		
		
		_gauge.setGauge(idx, ff);
		
	}
	
	
	
}