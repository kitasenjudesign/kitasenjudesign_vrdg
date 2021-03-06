package ;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class Bure
{
private var amp:Float = 20;

	public var look:Vector3;
	public var lookTgt:Vector3;
	public var cam:Vector3;
	public var camTgt:Vector3;
	
	public function new() 
	{
		
		look = new Vector3();
		lookTgt = new Vector3();
		cam = new Vector3();
		camTgt = new Vector3();
		
	}
	
	public function update():Void {
		
		if (Math.random() < 0.04) {
			
			lookTgt.x = amp/2 * (Math.random() - 0.5);
			lookTgt.y = amp/2 * (Math.random() - 0.5);			
			lookTgt.z = amp * (Math.random() - 0.5);
			
		}
		
		if (Math.random() < 0.05) {
			
			camTgt.x = amp/2 * (Math.random() - 0.5);
			camTgt.y = amp/2 * (Math.random() - 0.5);
			camTgt.z = amp * (Math.random() - 0.5);
			
		}
		
		look.x += (lookTgt.x - look.x) / 22;
		look.y += (lookTgt.y - look.y) / 22;
		look.z += (lookTgt.z - look.z) / 22;
		
		cam.x += (camTgt.x - cam.x) / 24;
		cam.y += (camTgt.y - cam.y) / 24;
		cam.z += (camTgt.z - cam.z) / 24;
		
		
	}
	
}