package objects ;
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
import three.Vector3;
/**
 * ...
 * @author nab
 */
class MyCATLoader extends Object3D
{
	
	private var _callback:Void->Void;
	private var _cubecamera:CubeCamera;
	
	public var dae:Object3D;
	public var geometry:Geometry;
	public var material:MeshPhongMaterial;
	public var baseGeo:Array<Vector3>;
	
	
	public function new() 
	{
		super();
	}

	public function load(callback:Void->Void):Void {
		
		_callback = callback;
		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		loader.load( 'cat/test_cat.dae', _onComplete );
		
	}
	
	
	
	private function _onComplete(ret):Void 
	{
		
		var dae:Dynamic = ret.scene;
		var mm:MeshBasicMaterial = new MeshBasicMaterial({
		
		//var mm:MeshPhongMaterial = new MeshPhongMaterial({
			map :			ImageUtils.loadTexture( "./cat/cat_diff.jpg"),
			//specularMap:	ImageUtils.loadTexture( "./cat/cat_norm.jpg"),
			//normalMap: 		ImageUtils.loadTexture( "./cat/cat_spec.jpg"),
			skinning : false,
			depthWrite: true,
			depthTest: true
		});
		mm.shading = Three.SmoothShading;
		mm.alphaTest = 0.9;
		//mm.shininess = 1;// shiness = 0;
		
		
		
		
		untyped __js__("
			dae.traverse( function(child){
				if( child instanceof THREE.Mesh){
					child.material = mm;
					//mm.specular.set(0,0,0);
				}
			}); ");
			
		
		
			
		dae.scale.set(100, 100, 100);
		//dae.rotation.x = - Math.PI / 2;
		add(cast dae);
		
		//dae = collada.scene;

		/*
		dae.traverse( function(child:Dynamic){
			if( Std.is( child ,Mesh) ){
				child.material = new MeshBasicMaterial({color:0xff0000,wireframe:true});
			}
		});*/

		//add(dae);	
		
		if (_callback != null) {
			_callback();
		}
		
		//dispatchEvent(new Event("COMPLETE", true, true));
	}
	
	
	
	
	
	
}