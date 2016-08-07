package dede;
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
	private var _typeCounter:Int = 0;
	
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
		var types:Array<Int> = [0, 3, 2, 4, 1, 5];
		_typeCounter++;
		var type:Int = types[_typeCounter % types.length];
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