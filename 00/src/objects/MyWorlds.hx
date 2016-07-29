package objects;
import sound.MyAudio;
import three.Object3D;
import three.Scene;

/**
 * ...
 * @author nabe
 */
class MyWorlds
{

	public var worlds	:Array<MyWorld>;
	
	public function new() 
	{
		//super();
		
	}
	
	//
	public function init(scene:Scene, dae:MyDAELoader):Void {
		
		/*
		worlds = [];
		
		var world:MyWorld = new MyWorld();
		world.init( dae );
		scene.add(world);
		worlds.push(world);
		*/		
		
		
	}
	
	public function update(audio:MyAudio):Void {
	
		for ( i in 0...worlds.length) {
		
			worlds[i].update(audio);
			
		}
		
	}
	
}