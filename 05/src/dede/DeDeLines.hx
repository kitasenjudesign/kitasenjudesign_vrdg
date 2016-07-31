package dede;
import dede.cuts.DeDeString;
import sound.MyAudio;
import three.LineBasicMaterial;
import three.Object3D;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class DeDeLines extends Object3D
{

	//private var _line:DeDeLine;
	private var _lines:Array<DeDeLine>;
	private var _sec:Float = 0.001;
	private var _counter:Float = 0;
	private var _twn:TweenMaxHaxe;
	private var _colRatio:Float=0;
	
	//public var enabled:Bool = true;
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		_lines = [];
		
		var oy:Float = -150;
		
		for(i in 0...3){
			var line:DeDeLine = new DeDeLine();
			line.init();
			line.position.y = i * 150 + oy;
			add(line);
			_lines.push(line);
		}
	}
	
	
	//suuji kaunto up
	public function countUp():Void {
		
		//_lines.addSec(0.05, true);	
		_sec += 1/30;
		_sec = _sec % 1;
		//Tracer.log("countup " + _sec);
		
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			line.addSec(1/30, true);
		}
		
		_flash();
		//}
		
		//if (_isFlash) _flash();
		
	}		
	
	
	/*
		public static inline var TYPE_DOT_MONOSPACE:Int = 0;	
		public static inline var TYPE_DOT_CONTINUE:Int = 1;
		
		public static inline var TYPE_LINE_MONOSPACE:Int = 2;
		public static inline var TYPE_LINE_CONTINUE:Int = 3;
		
		public static inline var TYPE_RANDOM_MONOSPACE:Int = 4;
		public static inline var TYPE_RANDOM_CONTINUE:Int = 5;	
	*/
		
	
	/**
	 * _changeType
	 */
	private function _changeType():Void {
		
		_sec = Math.random();
		
		//var txt:String = "DEDEMOUSEDEDEMOUSE";
		
		var data:DeDeString = DeDeString.getData();
		
		var txt:String 		= data.text;
		var font:Int 		= data.font;
		var spaceX:Float 	= data.spaceX;
		
		var isAllSame:Bool = Math.random() < 0.5 ? true : false;
		var isRandomLine:Bool = Math.random() < 0.2 ? true : false;
		var isRotate:Bool = Math.random() < 0.2 ? true : false;
		if ( isRandomLine ) {
			isRotate = Math.random()<0.7 ? true : false;
		}
		var isRandomStartSec:Bool = Math.random() < 0.5 ? true : false;
		var startSec:Float = Math.random();
		
		MyPointCloud.cloud.setRandom(isRandomLine);
		
		var speed:Float = 2 + 2 * Math.random();
		var space:Float = 3 + 7 * Math.random();// + 18 * Math.random();

		
		//全部同じ
		if ( isAllSame ) {
			
			for (i in 0..._lines.length) {
				var line:DeDeLine = _lines[i];
				var type:Int = Math.floor(Math.random() * 6);
				if (isRandomLine) {
					type = Math.floor(Math.random() * 2);
				}
				line.reset( txt, type, isRotate, font, speed, space, spaceX );
				line.setSec(startSec);
			}
			
		}else{
		
			var type:Int = Math.floor(Math.random() * 6);
			if (isRandomLine) {
				type = Math.floor(Math.random() * 2);
			}			
			
			for (i in 0..._lines.length) {
				var line:DeDeLine = _lines[i];
				line.reset( txt, type, isRotate, font, speed, space, spaceX );
				var startSec:Float = Math.random();
				if (isRandomStartSec) {
					line.setRandomSec();
				}else{
					line.setSec(startSec);
				}
			}
			
		}
		
	}
	
	
	private function _flash():Void
	{
		//_tweening = true;		
		showOutline();
		_colRatio = 1;
		if (_twn != null) {
			_twn.kill();
		}
		
		showOutline();
		BeyondCodeGeo.mat.opacity = 1;
		_twn = TweenMax.to(BeyondCodeGeo.mat, 0.9, {
			opacity:0,
			//_colRatio:0,
			//onUpdate:_onFlash,
			onComplete:hideOutline
		});
	}
	
	public function setGeoMax(n:Int,enables:Array<Bool>=null):Void {
			
		var ok:Bool = false;
		if (enables == null) {
			ok = true;
		}
		
		for (i in 0..._lines.length) {
			if ( ok || enables[i] ) {
				_lines[i].resetGeoMax(n);
				_lines[i].visible = true;				
			}else{
				_lines[i].resetGeoMax(1);
				_lines[i].visible = false;
			}
		}
		
	}
	
	public function setSpeedX(spdX:Float):Void {
		for (i in 0..._lines.length) {
			_lines[i].setSpeedX(spdX);
		}
	}
	
	
	public function showOutline():Void {
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			line.showOutline();
		}		
	}
	
	public function hideOutline():Void {
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			line.hideOutline();
		}		
	}
	
	
	public function _onFlash():Void
	{
		var lineMat:LineBasicMaterial = BeyondCodeGeo.mat;
		if(lineMat!=null){
			lineMat.color.setHSL(0, 0, _colRatio);		
		}
	}	
	
	public function next():Void {
		
		_changeType();
		
	}
	
	
	public function update(audio:MyAudio):Void {

		if (!visible) return;
		
		_counter++;
		//trace(_counter);
		
		if ( _counter % 60 == 0 ) {
			countUp();
		}
		
		for( i in 0..._lines.length ){
			_lines[i].update(audio);
		}
	}
	
}