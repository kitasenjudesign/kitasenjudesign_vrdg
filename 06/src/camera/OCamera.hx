package camera;

import common.Dat;
import common.StageRef;
import js.Browser;
import js.html.Element;
import three.OrthographicCamera;
import three.PerspectiveCamera;
import three.Quaternion;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class OCamera extends OrthographicCamera
{

	//public static inline var W:Float = 1300;// 0;// 0;
	private var _zoom:Float = 0.999;
	
	public function new(left:Float, right:Float, top:Float, bottom:Float, ?near:Float, ?far:Float) 
	{
		// function new(left:Float, right:Float, top:Float, bottom:Float, ?near:Float, ?far:Float) : Void;
		super( left, right, top, bottom, near, far );
	}
	
	/**
	 * 
	 * @param	dom
	 */
	public function init(dom:Dynamic):Void{
        
       // dom.onmousewheel = _onMouseWheel;
		Dat.gui.add(this, "_zoom").listen();
		dom.addEventListener("mousewheel", _onMouseWheel);
    }	
	
	private function _onMouseWheel(e):Void {

		var tgt:Float = _zoom + e.wheelDelta * 0.01;
		if (tgt < 0.2) tgt = 0.2;
		if (tgt > 50) tgt = 50;
		setZoom( tgt );
       
    }

	
	
	
	
	
	
	public function setZoom(zz:Float):Void {
		
		
		_zoom = zz;
		setWidth();
		
	}
	
	public function getWidth():Float {
		return StageRef.stageWidth / _zoom;
	}
	
	public function setWidth():Void {
		
		var aspect:Float = StageRef.stageWidth / StageRef.stageHeight;
		var ww:Float  = getWidth();// Main.W / _zoom;
		var hh:Float = ww / aspect;
		
		left = -ww / 2;
		right = ww / 2;
		top = hh / 2; // aspect;
		bottom = -hh / 2; // aspect;
		
		//_camera.aspect = StageRef.stageWidth / StageRef.stageHeight;
		updateProjectionMatrix();		
		
		
	}
	
	
	
	
	
	
}