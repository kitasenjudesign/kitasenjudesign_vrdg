package objects ;
import sound.MyAudio;


/**
 * ...
 * @author nab
 */
class MyFaceSplitA extends MyFaceSingle
{
	
	
	public function new(idx:Int) 
	{
		super(idx);
	}
	
	
	public function updateSplitA(audio:MyAudio):Void {
		
		updateSingle(audio);
		
	}
	
	/**
	 * 
	 * @param	audio
	 */
	public function updateSplitB(audio:MyAudio):Void {
	
		//vr = Math.PI / 20;
		vr *= 0.99;
		updateSingle(audio);		
		this.rotation.y += vr;
	}
	
	
	
}