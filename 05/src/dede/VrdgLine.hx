package dede;
import dede.cuts.DeDeParam;
import sound.MyAudio;
import three.BoxGeometry;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector2;
import tween.TweenMax;
import tween.TweenMaxHaxe;

/**
 * ...
 * @author watanabe
 */
class VrdgLine extends DeDeLine
{
	var _counter:Float = 0;
	//public var enabled:Bool = false;
	
	public function new() 
	{
		super();
	}	
	
	override public function init():Void {
		
		_digits = [];
		var space:Float = 3;
		var nn:String = "vrdgh";
		
		var pos:Array<Vector2> = [
			new Vector2( -145, 0),
			new Vector2( -50, 0),
			new Vector2( 41.5, 0),
			new Vector2( 137, 0),
			new Vector2( 168, 32)	
		];
		
		for (i in 0...nn.length) {
			var digit:DeDeDigit = new DeDeDigit();
			add(digit);
			
			// haichi to scale
			
			digit.position.x = pos[i].x;
			digit.position.y = pos[i].y;
			
			digit.init();
			digit.setGeoMax(240);
			
			var ss:Float = 0.65;
	
			digit.setStrokes(nn.substr(i,1),ss,space,0);
			//digit.setType(0);
			_digits.push(digit);
		}		
		
		//var vrdg:Object3D = BeyondCodeGeo.getMesh("a",new LineBasicMaterial({color:0xff0000}));
		//add(vrdg);
		
		//_digits[i].setStrokes(t, SCALE, _space);
		var data:DeDeParam = new DeDeParam();
		data.txt = "VRDGTH";
		data.speed = 2+2*Math.random();
		data.space = 3+18*Math.random();
		//data.spaceX = data.spaceX;
		//reset("VRDGTH", Math.floor(Math.random() * 4), false, 0, 0, 0, 50);
		reset( Math.floor(Math.random() * 4), data);
	}
	
	/**
	 * 
	 * @param	txt
	 * @param	type
	 * @param	isRotate
	 */
	override public function reset(type:Int,data:DeDeParam,isTypeRandom:Bool=false):Void
	{
		/*
		_speed = 2+2*Math.random();
		_space = 3+18*Math.random();
		_spaceX = data.spaceX;
		*/
		
		
		setDotType( type, data.isRotate);
		
		var ox:Float = -_width / 2;// _digits[0].position.x;
		for (i in 0..._digits.length) {
		
			_digits[i].reset();
			//_digits[i].setType( type );
			_digits[i].update(2);
			
		}
		
	}	
	
	/**
	 * 
	 * @param	audio
	 */
	override public function update(audio:MyAudio):Void {
			
		for (i in 0..._digits.length) {
			_digits[i].update(4);
		}
	
	}	
	
}