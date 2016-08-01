package faces.data;
import faces.MaeFace;
import faces.MaeLines;

/**
 * ...
 * @author watanabe
 */
class MaeFormation
{

	public static inline var FORMATION0:Int = 0;
	public static inline var FORMATION1:Int = 1;
	public static inline var FORMATION2:Int = 2;
	
	
	public function new() 
	{
		
	}
	
	public static function setFormation(n:Int,faces:Array<MaeFace>):Void {
		
		switch(n) {
			case FORMATION0:
				_setForm0(faces);
				
			case FORMATION1:
				_setForm1(faces);
				
			case FORMATION2:
				//_setForm2(faces);
		}
		
	}
	
		
	
	static private function _setForm0(faces:Array<MaeFace>):Void
	{
		Tracer.log("_setForm0");
		var ww:Int = 20;
		var hh:Int = 3;
		var len:Int = faces.length;
		for (i in 0...len) {
			var ff:MaeFace = faces[i];
			var xx:Float = i % ww - (ww-1)/2;
			var yy:Float = Math.floor(i / ww) - (hh - 1) / 2;
			
			ff.enabled = true;
			ff.visible = true;
			ff.position.x = xx * 50;
			ff.position.y = yy * 50;	
			ff.position.z = 0;
			
		}
	}
	
	
	static private function _setForm1(faces:Array<MaeFace>):Void
	{
		Tracer.log("_setForm1");		
		var ww:Int = 20;
		var hh:Int = 3;
		var len:Int = faces.length;
		for (i in 0...len) {
			var ff:MaeFace = faces[i];
			if(i<20){
				var xx:Float = i % ww - (ww-1)/2;
				var yy:Float = Math.floor(i / ww) - (hh - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * 50;
				ff.position.y = 5;
				ff.position.z = 230;
			}else {
				ff.visible = false;
				ff.enabled = false;
			}
		}
	}
	
	
	static private function _setForm2(faces:Array<MaeFace>):Void
	{
		var ww:Int = 20;
		var hh:Int = 3;
		var len:Int = faces.length;
		for (i in 0...len) {
			var ff:MaeFace = faces[i];
			if(i<20){
				var xx:Float = i % ww - (ww-1)/2;
				var yy:Float = Math.floor(i / ww) - (hh - 1) / 2;
				ff.enabled = true;
				ff.position.x = xx * 50;
				ff.position.y = 0;
				ff.position.z = 500;				

			}else {
				ff.visible = false;
			}
		}
	}	
	
}