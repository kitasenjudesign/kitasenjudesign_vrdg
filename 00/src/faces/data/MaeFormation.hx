package faces.data;
import camera.ExCamera;
import faces.MaeFace;
import faces.MaeLines;
import three.Fog;
import three.Scene;

/**
 * ...
 * @author watanabe
 */
class MaeFormation
{
	

	public static inline var FORM_H1:Int = 0;// = "FORMATION0";
	public static inline var FORM_H3:Int = 1;
	
	public static inline var FORM_VP:Int = 2;// = "FORMATION2";
	public static inline var FORM_V:Int = 3;// String = "FORMATION3";
	
	public static inline var num:Int = 4;
	
	private var _currentIndex:Int = 0;
	private var _width:Float = 0;
	private var _height:Float = 0;
	private var _camera:ExCamera;
	private var _lines:MaeLines;
	private var _fog:Fog;
	private var _scene:Scene;
	
	private var _formH1:MaeFormH1;
	private var _formH3:MaeFormH3;
	private var _formVp:MaeFormVpers;
	private var _formV:MaeFormV;
	
	private var _forms:Array<MaeFormBase>;
	private var _faces:Array<MaeFace>;
	
	public function new() 
	{
		
	}

	public function init(main:Main3d,lines:MaeLines) 
	{
		//_fog = new Fog(0x000000, 1, 500);
		//_scene = main.scene;
		//_scene.fog = _fog;
		_camera = main.camera;
		_lines = lines;
		
		_formH1 = new MaeFormH1();
		_formH3 = new MaeFormH3();
		_formVp = new MaeFormVpers();
		_formV = new MaeFormV();
		
		_forms = [
			_formH1,_formH3,_formVp,_formV
		];
		
		for (i in 0..._forms.length) {
			_forms[i].init( _camera, _lines );
		}
	}
	

	public function setFormation(n:Int,faces:Array<MaeFace>):Void {
		
		_faces = faces;
		_currentIndex = n % _forms.length;
		_forms[_currentIndex].setFormation(faces);
		
	}
	
	//3 line
	/**
	 * update
	 */
	public function update():Void {
		
		_forms[_currentIndex].update();
		
	}
	
	
	

	
	
	
	
	
	
}