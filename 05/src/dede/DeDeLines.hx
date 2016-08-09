package dede;
import common.MathUtil;
import dede.cuts.DeDeParam;
import dede.cuts.DeDeString;
import js.Browser;
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
	//private var _sec:Float = 0.001;
	private var _counter:Float = 0;
	private var _countUpNum:Int = 0;
	private var _twn:TweenMaxHaxe;
	private var _colRatio:Float = 0;
	
	
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
	
	public function reposition(ynum:Int,spaceY:Float=150, oy:Float=-150):Void {
		
		for(i in 0..._lines.length){
			var line:DeDeLine = _lines[i];
			line.position.y = i * spaceY + oy;
		}
		
	}
	
	//suuji kaunto up
	public function countUp(addX:Float):Void {
		
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			line.addSec(addX, true);
		}
		
		_countUpNum++;
		//dedemouse
		
		if( Boost.isBoost ){
			_flashBoost(addX);
		}else {
			if (_countUpNum % 6 == 0) {
				_flash(); 
			}
		}
		
		//_flash();
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
	public function changeType(data:DeDeParam):Void {
		
		//_sec = Math.random();
		
		//MyPointCloud.cloud.setRandom(data.isRandomLine);
		
		//全部同じ
		switch(data.sameType) {
			
			case DeDeParam.SAME_ALL:
				//Browser.window.alert("allsame!!");
				var type:Int = Math.floor(Math.random() * 6);
				for (i in 0..._lines.length) {
					var line:DeDeLine = _lines[i];
					line.reset( type, data,false );//
					line.setSec(data.startSec);
				}
				
			case DeDeParam.SAME_LINE:
				var oldType:Int = -1;
				for (i in 0..._lines.length) {
					var line:DeDeLine = _lines[i];
					var type:Int = MathUtil.getOtherInt(oldType, 6);
					line.reset( type, data, false );// txt, type, isRotate, font, speed, space, spaceX );
					type = oldType;
					line.setSec(data.startSec);
				}	
				
			case DeDeParam.SAME_DIFF:
				var type:Int = Math.floor(Math.random() * 6);
				for (i in 0..._lines.length) {
					var line:DeDeLine = _lines[i];
					line.reset( type, data, true );
					line.setSec(data.startSec);
				}					
				
		}
		
		_flash();
		
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
	
	private function _flashBoost(addX:Float):Void {
		
		//
		showOutline();
		BeyondCodeGeo.mat.opacity = addX;
		
	}
	//flash
	
	
	
	public function setDotType(type:Int,isRotate:Bool):Void {
		for (i in 0..._lines.length) {
			_lines[i].setDotType(type, isRotate);
		}
	}

	public function setSec(f:Float,boost:Bool=false):Void {
		for (i in 0..._lines.length) {
			_lines[i].setSec(f, boost);
		}
	}
	
	public function setRotate(b:Bool):Void {
		for (i in 0..._lines.length) {
			_lines[i].setRotate(b);
		}	
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
	
	//public function setSpeedX(spdX:Float):Void {
	//	for (i in 0..._lines.length) {
	//		_lines[i].setSpeedX(spdX);
	//	}
	//}
	
	
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
	
	/*
	public function next():Void {
		
		//tsu gi no typo
		
		
	}*/
	
	
	public function update(audio:MyAudio):Void {

		if (!visible) return;
		
		_counter++;
		//trace(_counter);
		
		//if ( _counter % 60 == 0 ) {
		//	countUp();
		//}
		
		for( i in 0..._lines.length ){
			_lines[i].update(audio);
		}
	}
	
}