package objects ;

import three.Geometry;
import three.ImageUtils;
import three.Material;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector3;
/**
 * ...
 * @author nab
 */
class WhiteLoader extends Object3D
{
	
	private var _callback:Void->Void;
	
	
	public function new() 
	{
		super();
	}

	public function load(filename:String,callback:Void->Void):Void {
		
		_callback = callback;
		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		loader.load( filename, _onComplete );
		
	}
	
	
	/**
	 * 
	 * @param	collada
	 */
	private function _onComplete(collada):Void 
	{
		trace(collada);
		
		var dae:Object3D = cast collada.scene;
		//dae.scale.x = dae.scale.y = dae.scale.z =170;
		
		untyped __js__("
			dae.traverse( function(child){
				if ( child instanceof THREE.Mesh) {
					console.log(child);
					child.material = new THREE.MeshBasicMaterial({map:child.material.map,side:THREE.FrontSide});
					//hoge.mesh = child;
					//alert('hoge ' + child);
					//mm.specular.set(0,0,0);
				}
			}); ");
		add(dae);
		
		var fuga:Object3D = dae.clone();
		
		
		if (_callback != null) {
			_callback();
		}
		
		//dispatchEvent(new Event("COMPLETE", true, true));
	}
	
	
	
	
	
}