package canvas.primitives;

/**
 * ...
 * @author watanabe
 */
class VideoPlaneWalker extends VideoPlane
{


	public function new() 
	{
		super();
	}
	
	
	override public function init(o:Dynamic):Void {
		
		super.init(o);
		_initVideo("walker","walker.mov");
		
	}
	
	
	
}