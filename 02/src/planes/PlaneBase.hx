package planes;
import sound.MyAudio;
import three.Object3D;

/**
 * ...
 * @author watanabe
 */
class PlaneBase extends Object3D
{
private var _callback:PlaneBase->Void;

	
	public function new() 
	{super();
	}
	
	public function init(callback:PlaneBase->Void):Void {//
	}
	

	public function setIcon(idx:Int):Void {
	//shader.setIconIndex( idx );//selectIndex = idx;
	}	
	
	
	public function update(audio:MyAudio):Void {//
	}
	
	public function kill() 
	{
	}
	
	
	
}