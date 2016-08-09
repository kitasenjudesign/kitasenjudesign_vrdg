package emoji;
import common.Dat;
import data.TextureData;
import sound.MyAudio;
import three.Vector2;

/**
 * ...
 * @author nabe
 */
class EmojiSpritePos
{

	//233
	//public static var EMOJI_MAX1:Int = 845;
	//public static var EMOJI_MAX2:Int = 200;
	
	//public static var NUMX1:Int = 32;
	//public static var NUMX2:Int = 16;
	
	
	private var _max:Int = 845;
	
	private	var animationFrameLength:Int = 32;
	
	public var startIndex	:Int = 0;
	public var endIndex		:Int = 0;
	public var counterIndex:Int = 0;
	public var counter:Float = 0;
	public var currentIndex:Int = 0;
	public var range		:Int = 100;
	
	private var _maxRange		:Int = 0;	
	private var _nn:Float = 0;
	private var _isSoundReact:Bool = false;
	private var _randomIndecies:Array<Int> = [];
	var _isRandomIdx:Bool=false;
	/**
	 * 
	 */
	public function new(data:TextureData) 
	{
		//EmojiSpritePos.EMOJI_MAX1,EmojiSpritePos.NUMX1)
		_max = data.max;
		_maxRange = _max;
		animationFrameLength = data.xnum;
		
		_randomIndecies = [];
		for (i in 0..._max) {
			_randomIndecies[i] = i;
		}
		for (i in 0..._max) {
			
			var idx1:Int = Math.floor( Math.random() * _max);
			var idx2:Int = Math.floor( Math.random() * _max);
			var tmp:Int = _randomIndecies[idx1];
			_randomIndecies[idx1] = _randomIndecies[idx2];
			_randomIndecies[idx2] = tmp;
			
		}
		
		startIndex	= 0;
		endIndex	= 50;// _max - 1;
		
	
	}
	public function init():Void {
		
		Dat.gui.add(this, "startIndex", 0, _max - 1 ).listen();
		Dat.gui.add(this, "range", 0, _max - 1).listen();
		Dat.gui.add(this, "counterIndex", 0, 844).listen();
		
	}

	
	/**
	 * getIconPos
	 * @param	light
	 * @return
	 */	
	public function getIconPos(light:Float):Vector2 {
		
		endIndex = startIndex + range;
		
		var ratio:Float = light / 255;
		var num:Int = endIndex - startIndex;
		var no:Int = Math.floor( (endIndex - startIndex) * ratio + Math.floor(counter) );
		no = no % num;
		
		var index:Int = Math.floor( startIndex + no );
		index = (index+counterIndex) % _max;
		
		if(_isRandomIdx){
			index = _getRandomIndex(index);
		}
			
		var xx:Int = (index) % animationFrameLength;
		var yy:Int = animationFrameLength - 1 - Math.floor( index / animationFrameLength );		
		
		return new Vector2(xx / animationFrameLength, yy / animationFrameLength);
	}
	
	private function _getRandomIndex(idx:Int):Int {
		return _randomIndecies[idx];
	}
	
	public function setRandomIndex(b:Bool):Void {
		_isRandomIdx = b;
	}
	//public function cou
	public function setCounterIndex(ratio:Float):Void {
		
		counterIndex = Math.floor( _max * ratio );
		
	}
	
	
	public function getIconPosByIndex(index:Int) {
		var xx:Int = (index) % animationFrameLength;
		var yy:Int = animationFrameLength - 1 - Math.floor( index / animationFrameLength );		
		
		return new Vector2(xx / animationFrameLength, yy / animationFrameLength);		
	}
	
	/**
	 * setRange
	 */
	public function setRange(startIdxRatio:Float,rangeRatio:Float):Void {

		startIndex	= Math.floor( startIdxRatio * _max);
		_maxRange	= Math.floor( rangeRatio * _max );

		if (Math.random() < 0.2) {
			_maxRange = 5;
		}
		
		_isSoundReact = Math.random() < 0.5 ? true : false;
		
	}
	
	/**
	 * update 
	 * @param	audio
	 */
	public function update(audio:MyAudio) 
	{
		
		if (audio == null) return;
		if (!audio.isStart) return;
		
		//if( audio.subFreqByteData[3]/255>0.2){
		//	_nn += audio.subFreqByteData[3] / 255;
		//}
		
		if(_isSoundReact){
			range = _maxRange;// 1 + Math.floor( audio.freqByteData[8] / 255 * _maxRange );
		}else {
			range = 5 + Math.floor( audio.freqByteData[6] / 255 * _maxRange );
		}
		
		//target
		if (range > _max - 1) {
			range = _max - 1;	
		}
		
		/*
		startIndex = Math.floor( _nn );
		startIndex = startIndex % ( _max - 1 );
		*/
		
		//startIndex += 1; Math.round( audio.subFreqByteData[0] / 255 );
		//range = (_max - 1 ) * audio.freqByteData[0] / 255;
		
		//Dat.gui.add(this, "startIndex", 0, _max - 1 ).listen();
		//Dat.gui.add(this, "range", 0, _max - 1).listen();
		
	}
	
	
}