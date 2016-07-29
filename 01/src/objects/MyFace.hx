package objects ;
import sound.MyAudio;


/**
 * ...
 * @author nab
 */
class MyFace extends MyFaceSplitA
{

	public static inline var MAT_DEFAULT:Int = 0;
	public static inline var MAT_DEPTH:Int = 1;
	
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