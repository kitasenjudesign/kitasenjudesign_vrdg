package common ;
import camera.ExCamera;
import js.Browser;
import sound.MyAudio;
import three.CubeCamera;
import three.Geometry;
import three.ImageUtils;
import three.Material;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshPhongMaterial;
import three.Object3D;
import three.Texture;
import three.Vector3;
/**
 * ...
 * @author nab
 */
class MyDAELoader extends Object3D
{
	
	private var _callback:Void->Void;
	
	public var dae:Object3D;
	//public var geometries:Array<Geometry>;
	public var meshes:Array<Mesh>;
	public var material:MeshBasicMaterial;
	
	public function new() 
	{
		super();
	}

	public function load(filename:String, callback:Void->Void):Void {
		
		//geometries = [];
		meshes = [];
		
		_callback = callback;		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		
		loader.load( filename, _onComplete );
		
	}
	
	
	/**
	 * _onComplete
	 * @param	collada
	 */
	private function _onComplete(collada):Void 
	{
		
		dae = collada.scene;
		dae.traverse( _getchild );
		
		//material = new MeshBasicMaterial({color:0xff0000);// MyShaderMaterial();// untyped dae.children[0].children[0].material;
		//geometry = untyped dae.children[0].children[0].geometry;
		
		//add(new Mesh(geometry, new MeshBasicMaterial({color:0xff0000})));
		//add(new Mesh(geometry, material));
		
		dae.scale.x = 50;
		dae.scale.z = 50;
		dae.scale.y = 50;
		
		if (_callback != null) {
			_callback();
		}
	}
	
	
//dae.traverse( _getchild );
	private function _getchild(child:Object3D):Void
	{
		//if ( child instanceof THREE.SkinnedMesh )//は
		//if( Std.is(child,SkinnedMesh) )//とかく
		
		if( Std.is(child,Mesh) ){
			var m:Mesh = cast child;
			m.material.side = Three.DoubleSide;
			meshes.push( cast child );
			//geometries.push( m.geometry );
		}
	}
	
	
	
	
}