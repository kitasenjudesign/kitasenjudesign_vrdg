package dede;
import clock.DotDigit;
import dede.cuts.DeDeParam;
import sound.MyAudio;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import typo.StrokeUtil;

/**
 * ...
 * @author watanabe
 */
class DeDeLine extends Object3D
{
	
	public static inline var SPEEDX0:Float = -0.5;
	public static inline var SPEEDX1:Float = -2;
	public static inline var WIDTH:Float = 2400;
	public static inline var SPACE_R:Float = 0.65 * 2;
	public static inline var SCALE:Float = 0.65;

	private var _digits:Array<DeDeDigit>;
	private var _width:Float = 0;
	private var _textIndex:Int = 0;
	private var _sec:Int = 0;
	private var _data:DeDeParam;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 */
	public function init():Void {
		
		_digits = [];
		var num:Int = 20;
		_width = WIDTH;// num * SPACE;
		
		for (i in 0...num) {
			var digit:DeDeDigit = new DeDeDigit();
			add(digit);			
			//digit.position.x = _spaceX * i - _spaceX * (num-1)/2;
			digit.init();
			digit.setGeoMax(240);
			//digit.setStrokes(nn.substr(i,1),_scale,_space);
			//digit.setType(0);
			_digits.push(digit);
		}		
		
		//
		//reset("A", 0, false, 0, 2 + 2 * Math.random(), 3 + 18 * Math.random(),_spaceX);
		reset(0, DeDeParam.getParam(), false);
	}
	
	
	public function resetGeoMax(n:Int):Void {
		for (i in 0..._digits.length) {
			_digits[i].setGeoMax(n);
		}
	}
	
	public function resetRandom():Void {
		
	}
	
	public function reset(
		type:Int, data:DeDeParam, isTypeRandom:Bool = false
	):Void
	{
		//
		_data = data;
		_textIndex = 0;
		
		var ox:Float = -_width / 2 + data.startX;// _digits[0].position.x;
		for (i in 0..._digits.length) {
			
			var t:String = _getNextText();//txt.substr(i % txt.length, 1);
			//trace(i+" "+t);
			var ww:Float = StrokeUtil.getWidth(t,data.font) * SPACE_R;
			_digits[i].position.x = ox + ww/2;// - _width / 2;
			_digits[i].setStrokes(t, SCALE, _data.space, _data.font);//////////////////////////
			_digits[i].reset();
			if (isTypeRandom) {
				type = Math.floor(Math.random() * 6);
			}
			_digits[i].setType( type,data.isRotate );
			_digits[i].update(2);
			ox += (ww + data.spaceX);
			
		}
		
		//update();
		_updateLimit();
	}	

	
	public function setDotType(type:Int, isRotate:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].setType( type, isRotate );
		}
	}
	
	public function setRotate(b:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].setRotate( b );
		}		
	}
	
	/**
	 * setSec,,,
	 */
	public function setSec(r:Float,boost:Bool=false):Void {
		//
		for (i in 0..._digits.length) {
			_digits[i].setSec( r,boost );
		}
	}	
	public function setRandomSec():Void {
		//
		for (i in 0..._digits.length) {
			_digits[i].setSec( Math.random() );
		}
		
	}
	
	
	public function addSec(dx:Float, boost:Bool):Void {
		for (i in 0..._digits.length) {
			_digits[i].addSec( dx,boost );
		}		
	}
	
	//public function setSpeedX(spdX:Float):Void {
	//	_speedX = spdX;
	//}
	//public function updateData(data:Da
	
	public function update(audio:MyAudio):Void {
		
		if (!visible) return;
		
		for (i in 0..._digits.length) {
			_digits[i].position.x += _data.speedX;
			_digits[i].update(4);
		}
		_updateLimit();
	
	}
	
	public function showOutline():Void
	{
		for (i in 0..._digits.length) {
			if(_digits[i].outline!=null){
				_digits[i].outline.visible = true;
			}
		}
	}

	public function hideOutline():Void
	{
		for (i in 0..._digits.length) {
			if(_digits[i].outline!=null){
				_digits[i].outline.visible = false;
			}
		}
	}	
	
	
	
	
	/**
	 * _updateLimit
	 */
	private function _updateLimit():Void {
		
		
		for (i in 0..._digits.length) {
			if ( _digits[i].position.x < -_width / 2) {
				
				var idx:Int = _getMaxPosIndex();

				//reset suru
				_digits[i].setStrokes(_getNextText(), SCALE, _data.space, _data.font);//////////////////////////
								
				var ww:Float = StrokeUtil.getWidth( _digits[idx].getMoji(), _data.font);
				var pos:Float = _digits[idx].position.x + ww * SPACE_R / 2 + _data.spaceX;
				var ww2:Float = StrokeUtil.getWidth( _digits[i].getMoji(),_data.font );
				_digits[i].position.x = pos + ww2 * SPACE_R / 2;
				//
				//_digits[i].setStrokes(
				
			}
		}
		
	}
	
	private function _getMaxPosIndex():Int {
		
		var mm:Float = -99999999;
		var idx:Int = 0;
		for (i in 0..._digits.length) {
			if (_digits[i].position.x > mm ) {//max wo shutoku
				mm = _digits[i].position.x;
				idx = i;
			}
		}
		return idx;
		
	}
	
	private function _getNextText():String {
		
		var out:String = _data.txt.substr(_textIndex%_data.txt.length, 1);
		_textIndex++;
		return out;
		
	}
	
	
}