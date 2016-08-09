package dede;
import clock.DotDigit;
import common.Dat;
import dede.cuts.DeDeParam;
import sound.MyAudio;
import three.LineBasicMaterial;
import three.Object3D;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * VrdgLines
 * @author watanabe
 */
class VrdgLines extends DeDeLines
{
	
	private var _vrdg:VrdgLine;
	private var _typeCounter:Int = -1;
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void {
		_lines = [];
		
		_vrdg = new VrdgLine();
		_vrdg.init();
		add( _vrdg );
		_lines.push( _vrdg );
		
		//Dat.gui.add(this, "_sec").listen();
		
	}
	
	/**
	 * _changeType
	 */
	override public function changeType(data:DeDeParam):Void {
		
		//_sec = Math.random();
		
		//MyPointCloud.cloud.setRandom(data.isRandomLine);
		
		//全部同じ
		/*
	public static inline var TYPE_DOT_MONOSPACE:Int = 0;	
	public static inline var TYPE_DOT_CONTINUE:Int = 1;
	
	public static inline var TYPE_LINE_MONOSPACE:Int = 2;
	public static inline var TYPE_LINE_CONTINUE:Int = 3;
	
	public static inline var TYPE_RANDOM_MONOSPACE:Int = 4;
	public static inline var TYPE_RANDOM_CONTINUE:Int = 5;		
		*/
	
		var types:Array<Int> = [
			//0, 3, 2, 4, 1, 5
			DotDigit.TYPE_DOT_MONOSPACE,
			DotDigit.TYPE_LINE_CONTINUE,
			DotDigit.TYPE_DOT_CONTINUE,					
			DotDigit.TYPE_LINE_MONOSPACE,
			DotDigit.TYPE_RANDOM_MONOSPACE,
			DotDigit.TYPE_DOT_MONOSPACE,	
			//DotDigit.TYPE_RANDOM_CONTINUE
			DotDigit.TYPE_LINE_MONOSPACE
		];
		_typeCounter++;
		var type:Int = types[_typeCounter % types.length];
		
		if (type == DotDigit.TYPE_LINE_MONOSPACE) {
			if ( _typeCounter % types.length == 6) {
				data.startSec = 0;
				if ( _typeCounter >= 8) {
					data.startSec = Math.random();					
				}				
			}else {
				data.startSec = 0.8; 	
			}
		}
		
		
		for (i in 0..._lines.length) {
			
			var line:DeDeLine = _lines[i];
			line.reset( type, data,false );//
			line.setSec(data.startSec);
			
		}
				
		
		_flash();
		
	}	
	
	override public function countUp(addX:Float):Void {
		
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			line.addSec(addX, true);
		}
		
		
		if (_countUpNum % 3 == 0) {
			_flash(); 
		}
		_countUpNum++;
		//_flash();
		//}
		
		//if (_isFlash) _flash();
		
	}		
	
	
	override public function update(audio:MyAudio):Void {

		if (!visible) return;
		
		for( i in 0..._lines.length ){
			_lines[i].update(audio);
		}
	}
	
}