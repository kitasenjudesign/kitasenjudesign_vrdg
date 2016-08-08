package objects ;
import camera.ExCamera;
import js.Browser;
import sound.MyAudio;
import three.CubeCamera;
import three.Geometry;
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
class MyDAELoader2
{
	
	private var _callback:Void->Void;
	private var _cubecamera:CubeCamera;
	
	public var dae:Object3D;
	public var geometry:Geometry;
	public var material:MeshPhongMaterial;
	public var baseGeo:Array<Vector3>;
	
	
	public function new() 
	{
		
	}

	public function load(callback:Void->Void,cube:CubeCamera):Void {
		
		_cubecamera = cube;
		_callback = callback;
		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		loader.load( 'face/mae_face.dae', _onComplete );
		
	}
	
	
	
	private function _onComplete(collada):Void 
	{
		
		dae = collada.scene;
		dae.scale.x = dae.scale.y = dae.scale.z =150;
	
		material = untyped dae.children[0].children[0].material;
			//material.envMap = _m.envMap;
			material.reflectivity = 0.2;
			material.refractionRatio = 0.3;
			material.side = Three.DoubleSide;
			material.shading = Three.SmoothShading;
			material.shininess = 2;
	
		
		geometry = untyped dae.children[0].children[0].geometry;
			geometry.verticesNeedUpdate = true;
		
		baseGeo = [];
		
		var max:Vector3 = new Vector3();
		var min:Vector3 = new Vector3();
		
		for (i in 0...geometry.vertices.length) {
			var vv:Vector3 = geometry.vertices[i].clone();
			baseGeo.push( vv );
			max.x = Math.max(vv.x,max.x);
			max.y = Math.max(vv.y,max.y); 
			max.z = Math.max(vv.z,max.z); 
			min.x = Math.min(vv.x,min.x);
			min.y = Math.min(vv.y,min.y);
			min.z = Math.min(vv.z,min.z);
			
		}
		
		trace("max", max);
		trace("min", min);
		/*
				XHR finished loading: GET "http://localhost:2000/mae_face.dae".load @ ColladaLoader.js:110objects.MyDAELoader.load @ MyDAELoader.hx:41Main3d.init @ Main3d.hx:129Main._init @ Main.hx:26
		Boot.hx:45 MyDAELoader.hx:82: max,{
			x : 0.991835, 
			y : 1.36578, 
			z : 0.972437
		}
		Boot.hx:45 MyDAELoader.hx:83: min,{
			x : -1.00449, 
			y : -1.13318, 
			z : -1.4613
		}*/
		
		//material
		//dae = new Mesh(g, m);
		//dae.scale.x = dae.scale.y = dae.scale.z = 170;
		//dae.rotation.y = Math.PI / 2;
		
		if (_callback != null) {
			_callback();
		}
		
		//dispatchEvent(new Event("COMPLETE", true, true));
	}
	
	public static function getPosY(ratio:Float):Float {
	
		ratio = 1 - ratio;
		var maxY:Float = 1.36578;
		var minY:Float = -1.13318;
		
		return minY + (maxY - minY) * ratio;
	
	}
	
	public static function getRatioY(posY:Float):Float {
		
		var maxY:Float = 1.36578;
		var minY:Float = -1.13318;
		return (posY - minY) / (maxY - minY);
		
	}
	
	public static function getHeight(ratio:Float):Float {
	
		return (1.36578 + 1.13318) * ratio;
		
	}
	
	
	
}