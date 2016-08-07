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
class MaeFormationOld
{
	

	public static inline var FORMATION0:String = "FORMATION0";
	public static inline var FORMATION1:String = "FORMATION1";
	
	public static inline var FORMATION2:String = "FORMATION2";
	public static inline var FORMATION3:String = "FORMATION3";
	
	public static var FORMATIONS:Array<String> = [
		FORMATION0,
		FORMATION1,
		FORMATION2,
		FORMATION3		
	];	
	
	private var _currentForm:String = FORMATION0;
	private var _width:Float = 0;
	private var _height:Float = 0;
	private var _camera:ExCamera;
	private var _lines:MaeLines;
	private var _fog:Fog;
	private var _scene:Scene;
	
	
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
	}
	
	
	
	public function setFormation(n:Int,faces:Array<MaeFace>):Void {
		
		_currentForm = FORMATIONS[n%FORMATIONS.length];
		switch(_currentForm) {
			case FORMATION0:
				_setFormH0(faces);
				//_setFormH0debug(faces);
				
			case FORMATION1:
				_setFormH1(faces);
				
			case FORMATION2:
				_setFormA(faces);
				
			case FORMATION3:
				_setFormB(faces);
		}
		
	}
	
	private function _setFormH0debug(faces:Array<MaeFace>):Void
	{
		Tracer.log("_setForm1 " );
		
		_lines.startY = -150;
		_camera.amp = 500;
		_camera.setFOV(30);//
		
		var spaceX:Float = 35;
		var xnum:Int = 20;
		var ynum:Int = 3;
		_width = xnum * spaceX;

		
		var len:Int = faces.length;
		for (i in 0...len) {
			var ff:MaeFace = faces[i];
			if(i==0){
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = 0;
				ff.position.y = 8;
				ff.position.z = 230;
				ff.rotation.y = 0;
			}else {
				ff.visible = false;
				ff.enabled = false;
			}
		}
	}	
		
	//1 line
	private function _setFormH0(faces:Array<MaeFace>):Void
	{
		Tracer.log("_setForm1");
		
		_lines.startY = -150;
		_camera.amp = 400;
		_camera.setFOV(30);//
		
		var spaceX:Float = 35;
		var xnum:Int = 20;
		var ynum:Int = 3;
		_width = xnum * spaceX;

		
		var len:Int = faces.length;
		for (i in 0...len) {
			var ff:MaeFace = faces[i];	
			ff.setMaterial( MaeFaceMesh.ROT_MODE_X );
		
			if(i<20){
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = 8;
				ff.position.z = 230;
				ff.rotation.y = 0;
			}else {
				ff.visible = false;
				ff.enabled = false;
			}
		}
	}	
	
	
	//3 line
	private function _setFormH1(faces:Array<MaeFace>):Void
	{
		Tracer.log("_setForm1");
		
		_lines.startY = -150;
		_camera.amp = 300;
		_camera.setFOV(30);//
		
		var spaceX:Float = 50;
		var spaceY:Float = 50;
		var xnum:Int = 20;
		var ynum:Int = 3;
		var len:Int = faces.length;
		_width = xnum * spaceX;
		_height = ynum * spaceY;
		
		for (i in 0...len) {
			
			var ff:MaeFace = faces[i];
			if(i<60){
				
				var xx:Float = i % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(i / xnum) - (ynum - 1) / 2;
				ff.enabled = true;
				ff.visible = true;
				ff.position.x = xx * spaceX;
				ff.position.y = yy * spaceY;	
				ff.position.z = 0;
				ff.rotation.y = 0;
			}else {
				
				ff.enabled = false;
				ff.visible = false;				
				
			}
			
		}
	}
	

	
	private function _setFormA(faces:Array<MaeFace>):Void
	{
		//30zutsu
		_lines.startY = -90;
		_camera.amp = 255;
		_camera.setFOV(35);//
		
		var spaceX:Float = 60;
		var spaceY:Float = 60;
		var xnum:Int = 9;
		var ynum:Int = 8;
		var num:Int = xnum * ynum;
		_width = spaceX * xnum;
		_height = spaceY * (ynum);
		
		
		var len:Int = faces.length;
		var oz:Float = -200;
		
		for (i in 0...len) {
			var ff:MaeFace = faces[i];
			ff.enabled = true;
			ff.visible = true;
			
			if (i < num) {
				var idx:Int = i;
				var xx:Float = idx % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(idx / xnum) - (ynum - 1) / 2;
				
				ff.position.x = 200; 
				ff.position.y = yy * spaceX;
				ff.position.z = xx * spaceY + oz;
				ff.rotation.y = -Math.PI/2;
			}else if(i<num*2){
				var idx:Int = i - num;
				var xx:Float = idx % xnum - (xnum-1)/2;
				var yy:Float = Math.floor(idx / xnum) - (ynum - 1) / 2;
				
				ff.position.x = -200;
				ff.position.y = yy * spaceX;
				ff.position.z = xx * spaceY + oz;		
				ff.rotation.y = Math.PI/2;
			}else {
				ff.enabled = false;
				ff.visible = false;				
				
			}
			//30ko zutsu			
		}
	}	
	
	private function _setFormB(faces:Array<MaeFace>):Void
	{
		
		// tate ni susumu yatsu wo tsukuru
		
	}
	
	
	/**
	 * update
	 */
	public function update(faces:Array<MaeFace>):Void {
		
		switch(_currentForm) {
			case FORMATION0:
				_update0(faces);
			case FORMATION1:
				_update1(faces);
			case FORMATION2:
				_update2(faces);			
		}
		
	}
	
	
	private function _update0(faces:Array<MaeFace>):Void {
		
		for ( i in 0...faces.length) {
			faces[i].position.x -= 0.1;
			if ( faces[i].position.x < -_width/2) {
				faces[i].position.x = _width / 2;
				faces[i].updatePlate();
			}
		}

	}
	private function _update1(faces:Array<MaeFace>):Void {
		for ( i in 0...faces.length) {
			faces[i].position.x -= 0.5;
			if ( faces[i].position.x < -_width/2) {
				faces[i].position.x = _width / 2;
				faces[i].updatePlate();
			}			
		}		
	}
	
	private function _update2(faces:Array<MaeFace>):Void {
		//yy houkou
		for ( i in 0...faces.length) {
			faces[i].position.y += 0.25;
			if ( faces[i].position.y > _height/2) {
				faces[i].position.y = -_height / 2;
				faces[i].updatePlate();
			}						
		}		
	}
	
	
	
	
	
	
}