package faces;
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
	
	private var _currentForm:Int = 1;
	private var _offsetY:Float = 0;
	private var _faces:Array<MaeFace> = [];
	private var _lines:MaeLines;
	private var _formation:MaeFormation;
	private var _main:Main3d;
	
	
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
	}
	
	
	
	private function _keyDownFunc(e):Void 
	{
		Tracer.log("_keyDownFunc ");
		
		switch( Std.parseInt( e.keyCode ) ) {
			
			case Dat.RIGHT:
				_setFormation(Math.floor(Math.random() * 3));//

			case Dat.UP:
				_setMaterial();//
				
		}
	}
	
	
	private function _setFormation(type:Int):Void {
		
		_formation.setFormation(type,_faces);
		
	}
	
	/**
	 * 	_setMaterial
	 */
	private function _setMaterial():Void {
		
		var type:Int = Math.floor( Math.random() * 4 ); //Math.random() < 0.5 ? 0 : 1;
		var mode:Int = Math.floor( Math.random() * 4 );
		
		for (i in 0..._faces.length) {
			_faces[i].setMaterial( type );
			_faces[i].setRotMode( mode );
		}
		
	}
	
	
	/**
	 * update,audio
	 */
	public function update(audio:MyAudio):Void {
		
		for (i in 0..._faces.length) {
			
			_faces[i].update(audio);
			
		}
		_formation.update(_faces);
		_lines.update(audio);
		
	}
	
	
	
}