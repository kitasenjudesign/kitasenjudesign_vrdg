package objects ;
import common.Dat;
import sound.MyAudio;
import three.MeshDepthMaterial;
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
	//public static inline var MAT_DEPTH_WIRE:Int = 2;
	
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
	
	public function updateMaterial(matMode:Int,isWire:Bool=false):Void {
		
		if (Dat.bg) return;
		
		switch( matMode ) {
			case MyFace.MAT_DEFAULT:
				dae.material = cast _daeLoader.material;
				
			case MyFace.MAT_DEPTH:
				dae.material = cast new MeshDepthMaterial();
				
		}
		
		untyped dae.material.wireframe = isWire;
		
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
	
	
	
	/**
	 * 
	 * @param	mode
	 */
	public function setMode(mode:String):Void {
	
		_mode = mode;
		//_daeLoader.changeMap();
		
		switch(_mode) {
			case MyWorld.MODE_SINGLE:
				isSplit = false;
				
			case MyWorld.MODE_SPLIT:
				isSplit = true;
			
			case MyWorld.MODE_SPLIT2:
				isSplit = true;
			
		}
		
	}	
	

	
	
	
}