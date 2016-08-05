package canvas.primitives;
import canvas.primitives.data.EffectData;
import sound.MyAudio;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class PrimitiveBase extends Object3D
{

	public var data:EffectData;
	
	public function new() 
	{
		super();
	}
	
	public function init(o:Dynamic):Void {
		data = new EffectData(o);
	}

	public function start():Void {
	
	}
	
	
	public function update(a:MyAudio,rotV:Vector3):Void {
		rotation.x += rotV.x;
		rotation.y += rotV.y;
		rotation.z += rotV.z;
	}
	
	public function stop() 
	{
		
	}
	
}