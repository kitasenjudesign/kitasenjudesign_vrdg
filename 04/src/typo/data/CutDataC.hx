package typo.data;
import sound.MyAudio;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class CutDataC extends CutData
{

	
	public function new() 
	{
		super();
	}
	
	override public function init(dots:Dots):Void {
		
		name = "cutC";
		
		limA = 150;
		limB = 200;
		limC = 300;
		forceA = 1;
		forceB = 2;
		forceC = 0.0457;		
		
		limitLoop = true;

		numRatio = 1;	
		
		super.init(dots);
		
	}
	
	override public function update(a:MyAudio):Void {
		
		forceA = Math.pow( a.freqByteData[1] / 255, 3) * 5 + 1;
		//forceB = Math.pow( a.freqByteData[13] / 255, 5) * 1 + 1 / 100;
		//forceC = Math.pow( a.freqByteData[8] / 255, 4) * 1.4 + 1 / 100;
		/*
		limA = Math.pow( a.freqByteData[3]/255, 2)*1200 + 150;
		limB = Math.pow( a.freqByteData[10]/255, 2)*500 + 350;
		limC = Math.pow( a.freqByteData[5]/255, 2)*500 + 550;
		*/
		var ff:Float = Math.pow( a.freqByteData[3] / 255, 4);
		limV = ff * 200 + 40;
		for (i in 0..._dots.dots.length) {
			if(Math.random()<0.9){
				_dots.dots[i].vx *= ff*(0.5+0.7*Math.random()) + 1;
				_dots.dots[i].vy *= ff*(0.5+0.7*Math.random()) + 1;			
				_dots.dots[i].vz *= ff*(0.5+0.7*Math.random()) + 1;
			}
		}
		
			
		
		super.update(a);
	}
	
	
}