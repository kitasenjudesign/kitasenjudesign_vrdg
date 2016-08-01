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
	
	private var _currentForm:Int = 1;
	private var _offsetY:Float = 0;
	private var _faces:Array<MaeFace> = [];
	private var _lines:MaeLines;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * init
	 * @param	geo
	 * pattern ya layout
	 */ 
	public function init():Void {
		
		Tracer.log("init");
		//Tracer
		_faces = [];
		
		//60
		var ww:Int = 20;
		var hh:Int = 3;
		for (i in 0...60) {
			
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
		
		_setFormation(0);
		
		_lines = new MaeLines();
		_lines.init(_faces);
		add(_lines);
		
		Key.board.addEventListener("keydown" , _keyDownFunc);
	}
	
	
	
	private function _keyDownFunc(e):Void 
	{
		
		switch( Std.parseInt( e.keyCode ) ) {
			case Dat.RIGHT:
				_setMaterial();
				_setFormation(Math.floor(Math.random() * 2));
		}
	}
	
	
	private function _setFormation(type:Int):Void {
		
		MaeFormation.setFormation(type,_faces);
		
	}
	
	
	/**
	 * 
	 */
	private function _setPos():Void {
		
		
		
	}
	
	private function _setMaterial():Void {
		
		var type:Int = Math.random() < 0.5 ? 0 : 1;
		var mode:Int = Math.floor( Math.random() * 3 );
		
		for (i in 0..._faces.length) {
			_faces[i].setMaterial(type);
			_faces[i].setRotMode( mode );
		}
		
	}
	
	
	
	
	/**
	 * update,audio
	 */
	public function update(audio:MyAudio):Void {
		
		for (i in 0..._faces.length) {
			
			_faces[i].update(audio);
			_faces[i].position.x -= 0.25;
			if ( _faces[i].position.x < -500) {
				_faces[i].position.x = 500;
			}			
			
		}
		_lines.update(audio);
		
		
	}
	
	
	
	
	/*
	private function _updateH(a:MyAudio):Void {
		for ( i in 0...worlds.length) {
		
			worlds[i].position.x -= speedX;
			if ( worlds[i].position.x < -spaceX2 * 3 ) {
				
				worlds[i].position.x = spaceX2 * 3;//xx
				worlds[i].reset();//parameter wo kaeru
				
			}
			
			worlds[i].update(a);
		}
	}*/
	
	
	
}