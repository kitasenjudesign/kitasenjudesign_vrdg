package faces.data;
import camera.ExCamera;
import faces.MaeLines;

/**
 * ...
 * @author watanabe
 */
class MaeFormBase
{

	private var _faces:Array<MaeFace>;
	private var _camera:ExCamera;
	private var _lines:MaeLines;
	
	private var _width:Float = 0;
	private var _height:Float = 0;
	
	private var _camIndex:Int = 0;
	
	public function new() 
	{
		
	}

	/**
	 * 
	 * @param	camera
	 * @param	lines
	 */
	public function init(camera:ExCamera,lines:MaeLines):Void {
		
		Tracer.log("init");
		_camera = camera;
		_lines = lines;
		
	}
	
	private function _setRot(mode:Int):Void {
		
		var len:Int = _faces.length;
		for (i in 0...len) {
			_faces[i].setRotMode(mode);
		}
		
	}
	
	public function setFormation(face:Array<MaeFace>):Void
	{
		_faces = face;
	}
	
	public function update():Void {
		
		//override 
		
	}
	
}