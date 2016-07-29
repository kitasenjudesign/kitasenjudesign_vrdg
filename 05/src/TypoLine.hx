package;
import clock.DotDigit;
import haxe.Timer;
import js.Browser;
import sound.MyAudio;
import three.BoxGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import typo.Stroke;
import typo.StrokeUtil;

/**
 * ...
 * @author watanabe
 */
class TypoLine extends Object3D
{
	
	public static inline var SPACE:Float = 100;
	public static inline var VSPACE:Float = 150;
	
	private var _digits:Array<DotDigit>;
	private var letters:Array<Mesh>;
	private var digit:DotDigit;
	private var _scale:Float = 0.65;
	private var _space:Float = 0;
	private var _speed:Float = 10;
	private var _text:String = "BEYONDCODE";
	
	
	
	public function new() 
	{
		super();
	}
	
	
	/**
	 * init
	 */
	public function init():Void {
		
		//line goto ni speed to space
		var m:Mesh = new Mesh(
			new BoxGeometry(1024, 10, 10), 
			new MeshBasicMaterial( { color:Math.floor(Math.random() * 0xffffff) } ));
		m.position.y = 10 * (Math.random() - .5);
		//add(m);
		
		//_speed = 2;//////////////////////////// 1 + 8 * Math.random();
		//_space = 8 + 30 * Math.random();///////
		
		_digits = [];
		var nn:String = _text;
		var sp:Float = 0;
		
		//DotDigit seisei
		for (i in 0...nn.length) {
			var digit:DotDigit = new DotDigit();
			add(digit);
			
			var spc:Float = SPACE;
			digit.position.x = spc * i - spc * (nn.length-1)/2;
			digit.init();
			digit.setGeoMax(100);
			//digit.setStrokes(nn.substr(i,1),_scale,_space);
			//digit.setType(0);
			_digits.push(digit);
			
		}
		

	}

	
	public function setRandomSec(boost:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].setSec( Math.random(),boost );
		}		
	}
	
	/**
	 * setSec
	 */
	public function setSec(rr:Float,boost:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].setSec( rr,boost );
		}
	}
	
	public function addSec(dx:Float, boost:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].addSec( dx,boost );
		}		
	}
	
	
	public function update():Void
	{
		//this.position.y += 0.5;
		//if ( this.position.y > 150 * 3) {
			//this.position.y = -150 * 3;
			//reset(1);
			
		//}else{
			for (i in 0..._digits.length) {
				_digits[i].update(_speed);
			}
		//}
		
	}	
	
	//set text
	public function reset(speed:Float, space:Float, text:String, font:Int ):Void
	{

		_speed = speed;
		_space = space;
		
		if (text != "") {
			_text = text;
		}
		
		////////////////////type
		for (i in 0..._text.length) {
			_digits[i].setStrokes(_text.substr(i,1), _scale, _space, font);
		}		
		
		for (i in 0..._digits.length) {
			_digits[i].reset();
			_digits[i].update(2);
		}
		
	}
	
	/**
	 * setType
	 * @param	type
	 */
	public function setType(type:Int):Void
	{
		for (i in 0..._digits.length) {
			_digits[i].setType(type);
		}
	}
	
	public function setGeoMax(nn:Int) 
	{
		for (i in 0..._digits.length) {
			_digits[i].setGeoMax(nn);
		}		
	}
	
	
	
	public function setVisible(b:Bool) 
	{
		this.visible = b;
		for (i in 0..._digits.length) {
			_digits[i].setVisible(b);
		}				
	}
	
	/*
	public function setRandom(isRandom:Bool) 
	{
		for (i in 0..._digits.length) {
			_digits[i].isRandom = isRandom;
		}				
	}*/
	
}