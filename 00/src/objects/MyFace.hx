package objects ;
import sound.MyAudio;


/**
 * ...
 * @author nab
 */
class MyFace extends MyFaceSplitA
{
	
	public var baseY:Float = 0;
	
	
	
	public function new(idx:Int) 
	{
		super(idx);
	}

	public function update(audio:MyAudio):Void {
		
		switch( _mode ) {
			case MyWorld.MODE_SINGLE:
				updateSingle(audio);
			
			case MyWorld.MODE_SPLIT:
				updateSplitA(audio);
			
			case MyWorld.MODE_SPLIT2:
				updateSplitB(audio);
		}
		
		
	}
	

	
	
	
}