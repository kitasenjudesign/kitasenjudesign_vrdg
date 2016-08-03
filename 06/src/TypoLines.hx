package;
import clock.DotDigit;
import clock.DotDigitLine;
import common.Dat;
import haxe.Timer;
import js.Browser;
import sound.MyAudio;
import three.Mesh;
import three.Object3D;
import typo.Stroke;
import typo.StrokeUtil;

/**
 * ...
 * @author watanabe
 */
class TypoLines extends Object3D
{

	public static inline var MODE_1:Int = 0;
	public static inline var MODE_ALL:Int = 1;
	
	private var _digits:Array<DotDigit>;
	public var lines:Array<TypoLine>;
	private var _cloud:MyPointCloud;
	public static var instance:TypoLines;
	//static ni oku
	
	public function new() 
	{
		super();
	}
	
	/**
	 * init
	 */
	public function init():Void {
		
		instance = this;
		
		_cloud = new MyPointCloud();
		_cloud.init();
		
		lines = [];
		var num:Int = 20;
		
		for(i in 0...num){
			var line:TypoLine = new TypoLine();
			//line.position.y = i * 150 - (num - 1) * 150 / 2;
			
			line.init();
			//line.setGeoMax(100);
			
			add(line);
			lines.push(line);
		}
		
		add(_cloud);		
		
		reset(3, 2, "BEYONDCODE");
		setType(0);
		
	}
	
	
	/**
	 * setType
	 * @param	type
	 */
	public function setType(type:Int):Void {
		
		for (i in 0...lines.length) {
			//lines[i].setText(s);
			lines[i].setType(type);
		}
		
	}
	
	
	//MOJI CUT
	
	public function reset(speed:Float,space:Float,text:String):Void {
		trace("reset");
		var isRandom:Bool = Math.random() < 0.5 ? true : false;
		for (i in 0...lines.length) {
			if (lines[i].visible) {
				//lines[i].setRandom(isRandom);
				lines[i].reset(speed, space, text);
			}
		}
		
	}
	
	/**
	 * setSec
	 * @param	sec
	 */
	public function setSec(rr:Float,boost:Bool):Void {
		for(i in 0...lines.length){
			lines[i].setSec(rr,boost);
		}
	}
	
	public function addSec(rr:Float, boost:Bool):Void {
		for(i in 0...lines.length){
			lines[i].addSec(rr,boost);
		}
	}	
	
	
	public function update():Void {
		
		_cloud.update();
		
		
		//lines
		for (i in 0...lines.length) {
			if(lines[i].visible){
				lines[i].update();
			}
		}
		
	}
	
	///
	public function setViewMode(mode:Int):Void {
		
		MyPointCloud.cloud.reset();
		
		switch(mode) {
			case MODE_1:
				
				for (i in 0...lines.length) {
					if (i <= 1) {
						lines[i].setVisible(true);// = true;
						lines[i].setGeoMax(500);
					}else {
						lines[i].setVisible(false);					
					}
				}
				
			case MODE_ALL:
				for (i in 0...lines.length) {
					lines[i].setVisible(true);
					lines[i].setGeoMax(100);
				}
			
		}
		
	}


	/*
	public static function getLine():DotDigitLine {
		
		var line:DotDigitLine = new DotDigitLine();
		line.visible = false;
		//line.init();
		
		instance.add(line);
		return line;
	}*/
	
	
	
}