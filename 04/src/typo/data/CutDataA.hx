package typo.data;
import sound.MyAudio;
import three.Vector3;
import tween.TweenMax;
import typo.Dots;

/**
 * ...
 * @author watanabe
 */
class CutDataA extends CutData
{


	private var _idxA1:Int = 0;
	private var _idxB1:Int = 0;
	private var _idxC1:Int = 0;
	
	private var _idxA2:Int = 0;
	private var _idxB2:Int = 0;
	private var _idxC2:Int = 0;
	
	
	
	public function new() 
	{
		super();
	}
	
	override public function init(dots:Dots):Void {
				
		name = "cutA";
		limA = 150;
		limB = 200;
		limC = 300;
		forceA = 1 / 60;
		forceB = 1 / 100;
		forceC = 1 / 100;
		
		limitLoop = true;
		
		_idxA1 = Math.floor( Math.random() * 15);
		_idxB1 = Math.floor( Math.random() * 15 );
		_idxC1 = Math.floor( Math.random() * 15 );
		
		_idxA2 = Math.floor( Math.random() * 15 );
		_idxB2 = Math.floor( Math.random() * 15 );
		_idxC2 = Math.floor( Math.random() * 15 );
		
		numRatio = 1;
		
		super.init(dots);
	}
	
	/**
	 * 
	 * @param	a
	 */
	override public function update(a:MyAudio):Void {
	
		forceA = Math.pow( a.freqByteData[_idxA1] / 255, 5) * 1.5 + 1 / 100;
		forceB = Math.pow( a.freqByteData[_idxB1] / 255, 5) * 1 + 1 / 100;
		forceC = Math.pow( a.freqByteData[_idxC1] / 255, 4) * 1.4 + 1 / 100;
		
		limA = Math.pow( a.freqByteData[_idxA2]/255, 2)*1200 + 150;
		limB = Math.pow( a.freqByteData[_idxB2]/255, 2)*500 + 350;
		limC = Math.pow( a.freqByteData[_idxC2]/255, 2)*500 + 550;		
		
		/*
		forceA = Math.pow( a.freqByteData[1] / 255, 5) * 1.5 + 1 / 100;
		forceB = Math.pow( a.freqByteData[13] / 255, 5) * 1 + 1 / 100;
		forceC = Math.pow( a.freqByteData[8] / 255, 4) * 1.4 + 1 / 100;
		
		limA = Math.pow( a.freqByteData[3]/255, 2)*1200 + 150;
		limB = Math.pow( a.freqByteData[10]/255, 2)*500 + 350;
		limC = Math.pow( a.freqByteData[5]/255, 2)*500 + 550;
		*/
		
		
		var ff:Float = Math.pow( a.freqByteData[3] / 255, 2);
		limV = ff * 200 + 40 + offsetV;
		for (i in 0..._dots.dots.length) {
			_dots.dots[i].vx *= ff * 0.5 + 1;// +addV.x;
			_dots.dots[i].vy *= ff * 0.5 + 1;// +addV.y;			
			_dots.dots[i].vz *= ff * 0.5 + 1;// +addV.z;
		}		

		
		
		super.update(a);
		
	}
	
	
}