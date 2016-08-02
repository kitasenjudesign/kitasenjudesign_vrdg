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
	
	/*
	override public function next():Void {
		
		//super.next();
		var data:DeDeParam = new DeDeParam();
		data.txt = "VRDGTH";
		data.speed = 2+2*Math.random();
		data.space = 3 + 10 * Math.random();
		data.startSec = Math.random();
		
		//data.isRandomLine
		//data.type = Math.floor(Math.random() * 6);
		//data.spaceX = data.spaceX;
		//reset("VRDGTH", Math.floor(Math.random() * 4), false, 0, 0, 0, 50);
		//reset( Math.floor(Math.random() * 4), data);
		
		changeType( data );
	}*/
	
	//suuji kaunto up
	/*
	override private function _countUp():Void {
		//
		//if (_isRandomSec) {
			
			//_lines.addSec(0.05, true);
			
		//}else{
			//trace("count up");
		trace("flash");
		
		var isRandomLine:Bool = Math.random() < 0.5 ? true : false;
		MyPointCloud.cloud.setRandom(isRandomLine);
		
		for (i in 0..._lines.length) {
			var line:DeDeLine = _lines[i];
			_counter = 0;
			_sec += 0.05;
			_sec = _sec % 1;
			line.setSec(_sec, true);
			
			///type
			var type:Int = Math.floor(Math.random() * 6);
			if (isRandomLine) {
				type = Math.floor(Math.random() * 2);
			}
			
			var isRotate:Bool = false;
			if (isRandomLine) {
				isRotate = Math.random() < 0.5 ? true : false;
			}
			
			line.setDotType( type,isRotate );
		}
		//}
		
		//if (_isFlash) _flash();
		_flash();
	}*/
	
	
	
	
	override public function update(audio:MyAudio):Void {

		if (!visible) return;
		
		for( i in 0..._lines.length ){
			_lines[i].update(audio);
		}
	}
	
}