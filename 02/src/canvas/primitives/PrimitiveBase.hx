package canvas.primitives;
import sound.MyAudio;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class PrimitiveBase extends Object3D
{

	
	
	public function new() 
	{
		super();
	}
	
	public function init():Void {
	
	}

	public function start():Void {
	
	}
	
	
	public function update(a:MyAudio,rotV:Vector3):Void {
		rotation.x += rotV.x;
		rotation.y += rotV.y;
		rotation.z += rotV.z;
	}
	
}