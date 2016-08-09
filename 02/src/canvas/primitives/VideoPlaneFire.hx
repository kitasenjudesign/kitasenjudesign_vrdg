package canvas.primitives;

/**
 * ...
 * @author watanabe
 */
class VideoPlaneFire extends VideoPlane
{


	public function new() 
	{
		super();
	}
	
	
	override public function init(o:Dynamic):Void {
		
		super.init(o);
		_initVideo("fireworks","fireworks.mov");
		
		
	}
	
	
	
}