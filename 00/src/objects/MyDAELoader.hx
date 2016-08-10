package objects ;
import camera.ExCamera;
import common.Path;
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
	private var _cubecamera:CubeCamera;
	
	private var _texture1:Texture;
	private var _texture2:Texture;
	private var _texture3:Texture;
	
	public var dae:Object3D;
	public static var geometry:Geometry;
	//public var material:MyShaderMaterial;
	public var baseGeo:Array<Vector3>;
	
	
	public function new() 
	{
		super();
	}

	public function load(callback:Void->Void):Void {
		
		_callback = callback;
		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		//loader.load( 'mae_face.dae', _onComplete );
		//loader.load( 'dede_160805_7c.dae', _onComplete );
		loader.load( Path.assets + 'face/dede_c4d.dae', _onComplete );

		//loader.load( 'de.dae', _onComplete );
		//loader.load( 'mae_face_hole.dae', _onComplete );
		
	}
	
	
	
	private function _onComplete(collada):Void 
	{
		
		dae = collada.scene;
		//dae.scale.x = dae.scale.y = dae.scale.z =150;
		//_texture1.minFilter = Three.NearestFilter;
		//_texture1.magFilter = Three.NearestFilter;
		
		//material = new MyShaderMaterial();// untyped dae.children[0].children[0].material;
	
		geometry = untyped dae.children[0].children[0].geometry;
		
		//add(new Mesh(geometry, new MeshBasicMaterial({color:0xff0000})));
		//add(new Mesh(geometry, material));
		
		this.scale.x = 150;
		this.scale.z = 150;
		this.scale.y = 150;
		
		//trace("max", max);
		//trace("min", min);
		
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
	
	/**
	 * 
	 */
	//public function update():Void {
		
		//material.update();
		
	//}
	
	
	
	
	
	
	
	
	/**
	 * changeMap
	 */
	public function changeMap(isWire:Bool):Void {
		
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