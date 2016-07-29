package camera;
import common.StageRef;
import js.Browser;
import three.Camera;
import three.OrthographicCamera;
import three.PerspectiveCamera;

/**
 * ...
 * @author watanabe
 */
class DoubleCamera
{

	public static inline var TYPE_O:Int = 0;
	public static inline var TYPE_P:Int = 1;
	
	public static inline var WW:Float = 1920;
	public static inline var HH:Float = 576;
	
	private var _type:Int = 0;
	
	public var oCamera:OCamera;
	public var pCamera:ExCamera;
		
	public function new() 
	{
		
	}
	
	
	public function init(domElement:Dynamic):Void {
		
		oCamera = new OCamera( -WW, WW, HH, -HH, 0.1, 1000 );
		oCamera.init( domElement );
		oCamera.position.x = 0;
		oCamera.position.y = 0;
		oCamera.position.z = 800;

		
		//_camera = new ExCamera(20, W / H, 10, 50000);
		pCamera = new ExCamera(
			30, StageRef.stageWidth / StageRef.stageHeight, 10, 10000
		);
		pCamera.init( domElement );
		pCamera.amp = 800;
		
	}
	
	
	public function setZoom(zz:Float):Void {
		
		oCamera.setZoom(zz);
		
	}
	
	
	public function getWidth():Float {
		return oCamera.getWidth();
	}
	
	
	
	public function setCamType(typ:Int):Void {
		_type = typ;
	}
	
	public function getCamType():Int {
		return _type;
	}
	
	public function update():Void {
		
		switch(_type) {
			case TYPE_O:
				
				//o
			case TYPE_P:
				//pcamera
				pCamera.update();				
		}
	}
	
	
	public function getCamera():Camera {
		
		return _type==TYPE_O ? oCamera : pCamera;
	}
	
	/**
	 * resize
	 */
	public function resize():Void
	{
		if(_type == TYPE_O){
			oCamera.setZoom(2);
		}else{
			pCamera.resize();
		}
	}
	
}