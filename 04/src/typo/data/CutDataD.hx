package typo.data;
import camera.ExCamera;
import sound.MyAudio;
import three.Vector3;
import typo.Dot;
import typo.Dots;

/**
 * ...
 * @author watanabe
 */
class CutDataD extends CutData
{

	public function new() 
	{
		super();
	}
	
	override public function init(dd:Dots):Void {
		
		name = "cutD";
		
		limA = 150;
		limB = 200;
		limC = 300;
		forceA = 1;
		forceB = 2;
		forceC = 0.0457;		
		
		maxLife = 10;
		
		//camMode = ExCamera.MODE_ZERO;
		//camType = CutData.CAMTYPE_FOLLOW;
		
		super.init(dd);
	}
	
	/**
	 * 
	 * @param	a
	 * @param	dots
	 */
	override public function update(a:MyAudio):Void {
		
		_frame++;
		var ff:Float = Math.pow( a.freqByteData[9] / 255, 3);
		limV = ff * 50 + 40;
		for (i in 0..._dots.dots.length) {
			
			_dots.dots[i].vx *= ff*0.5 + 1;
			_dots.dots[i].vy *= ff*0.5 + 1;			
			_dots.dots[i].vz *= ff*0.5 + 1;
			
		}	
		
		
		super.update(a);
		//dots.camera.radX += Math.PI / 1000;
		
		
	}
	
}