package typo.data;
import sound.MyAudio;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class CutDataB extends CutData
{

	
	public function new() 
	{
		super();
	}
	
	override public function init(dots:Dots):Void {
		
		
		name = "cutB";
		limA = 270;
		limB = 380;
		limC = 500;
		forceA = 0.41;
		forceB = 0.48;
		forceC = 1 / 200;		
		
		//camType = CutData.CAM_FOLLOW;
		//camType = CutData.CAMTYPE_ZERO;
		
		size.set(2000, 2000, 2000);
		
		//B dake sukunai
		numRatio = 1;// 0.4 * Math.random() + 0.1;
		
		super.init(dots);
		
		
	}
	
	override public function update(a:MyAudio):Void {
		
		super.update(a);
		
	}
	
}