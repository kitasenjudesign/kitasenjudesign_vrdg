package faces;
import camera.ExCamera;
import common.Config;
import common.Dat;
import common.Key;
import faces.data.MaeFormation;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.Object3D;

/**
 * ...
 * @author watanabe
 */
class MaeFaces extends Object3D
{

	//public static inline var FORMATION1:Int = 1;
	//public static inline var FORMATION2:Int = 2;
	//public static inline var FORMATION3:Int = 3;
	
	public static inline var MAX:Int = 150;
	
	private var _currentForm:Int = 0;
	private var _offsetY:Float = 0;
	private var _faces:Array<MaeFace> = [];
	private var _lines:MaeLines;
	private var _formation:MaeFormation;
	private var _main:Main3d;
	private var _matType:Int =0;
	
	
	public function new() 
	{
		super();
	}
	
	/**
	 * init
	 * @param	geo
	 * pattern ya layout
	 */ 
	public function init(main3d:Main3d):Void {
		
		Tracer.log("init");
		//Tracer
		_main = main3d;
		_faces = [];
		
		//60
		var ww:Int = 20;
		var hh:Int = 3;
		for (i in 0...MAX) {
			
			var xx:Float = i % ww - (ww-1)/2;
			var yy:Float = Math.floor(i / ww) - (hh - 1) / 2;
			var ff:MaeFace = new MaeFace();
			ff.enabled = true;
			ff.position.x = xx * 50;
			ff.position.y = yy * 50;
			ff.position.z = 0;// (Math.random() < 0.5) ? 0 : 100;// * (Math.random() - 0.5);
			/*
			ff.position.x = xx * 50;
			ff.position.y = 0;
			ff.position.z = yy * 50;//(Math.random() < 0.5) ? 0 : 100;// * (Math.random() - 0.5);
			*/
			_faces.push(ff);			
			add(ff);
			
		}	
		
		_lines = new MaeLines();
		_lines.init(_faces);
		add(_lines);		
		
		_formation = new MaeFormation();
		_formation.init(_main, _lines);
		_formation.setFormation(0,_faces);
		
		
		
		Key.board.addEventListener("keydown" , _keyDownFunc);
		
		MyAudio.a.globalVolume = 0;
	}
	
	
	
	private function _keyDownFunc(e):Void 
	{
		Tracer.log("_keyDownFunc ");
		
		switch( Std.parseInt( e.keyCode ) ) {
			
			case Dat.SPACE:
				MyAudio.a.tweenVol(Config.globalVol);
			
			case Dat.RIGHT:
				//nextFormation
				_currentForm++;
				_formation.setFormation(_currentForm,_faces);

			case Dat.LEFT:

				_currentForm--;
				if (_currentForm < 0)_currentForm = MaeFormation.num-1;
				_formation.setFormation(_currentForm,_faces);
				
			case Dat.UP:
				_setMaterial();//
				
			case Dat.DOWN:
				_resetMaterial();
				
		}
	}
	
	//formation shidai de 
	
	
	/**
	 * 	_setMaterial
	 */
	private function _setMaterial():Void {
		
		var mats:Array<Int> = [
			MaeFace.MAT_COLOR,
			//MaeFace.MAT_WIRE_COLOR,
			//MaeFace.MAT_WIRE_WHITE,
			MaeFace.MAT_COLOR_RED
		];
		var type:Int = mats[_matType % mats.length];
		_matType++;
		
		for (i in 0..._faces.length) {
			_faces[i].setMaterial( type );
		}
		
	}
	
	public function _resetMaterial():Void {
		
		for (i in 0..._faces.length) {
			_faces[i].setMaterial( MaeFace.MAT_NORMAL );
		}		
		
	}
	
	
	/**
	 * update,audio
	 */
	public function update(audio:MyAudio,camera:ExCamera):Void {
		
		for (i in 0..._faces.length) {
			
			_faces[i].update(audio);
			
		}
		_formation.update();
		_lines.update(audio,camera);
		
	}
	
	
	
	
	
	
	
	
}