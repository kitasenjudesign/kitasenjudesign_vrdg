package objects ;
import sound.MyAudio;
import tween.easing.Cubic;
import tween.TweenMax;


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

	
	/**
	 * rotateZ
	 * @param	rotZ
	 */
	public function rotateZ(rotZ:Float):Void {
		
		if ( _twn != null ) {
			_twn.kill();
		}
		
		_twn = TweenMax.to(this.rotation, 0.5, {
			ease:Cubic.easeOut,
			z:rotZ
		});
		
		
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