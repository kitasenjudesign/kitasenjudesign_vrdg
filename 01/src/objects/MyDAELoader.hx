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
class MyDAELoader
{
	
	private var _callback:Void->Void;
	private var _cubecamera:CubeCamera;
	
	private var _texture1:Texture;
	private var _texture2:Texture;
	private var _texture3:Texture;
	
	public var dae:Object3D;
	public var geometry:Geometry;
	public var material:MeshPhongMaterial;
	public var baseGeo:Array<Vector3>;
	public var baseAmp:Array<Float>;
	public var baseRadX:Array<Float>;
	public var baseRadY:Array<Float>;
	
	
	
	
	public function new() 
	{
		
	}

	public function load(callback:Void->Void,cube:CubeCamera):Void {
		
		_cubecamera = cube;
		_callback = callback;
		
		var loader = untyped __js__("new THREE.ColladaLoader()");
		loader.options.convertUpAxis = true;		
		//loader.load( 'mae_face.dae', _onComplete );

		//loader.load( 'dede_160806_2high.dae', _onComplete );
		loader.load( Path.assets+ 'face/dede_c4d.dae', _onComplete );

		//loader.load( 'dede_160805_7b.dae', _onComplete );
		//loader.load( 'mae_face_hole.dae', _onComplete );
		
		
	}
	
	
	
	private function _onComplete(collada):Void 
	{
		
		dae = collada.scene;
		dae.scale.x = dae.scale.y = dae.scale.z =150;
	
		//material = untyped dae.children[0].children[0].material;
		
		_texture1 = ImageUtils.loadTexture( Path.assets + "face/dede_face_diff.png");// mae_face.png");
		_texture1.minFilter = Three.NearestFilter;
		_texture1.magFilter = Three.NearestFilter;
		
		_texture2 = ImageUtils.loadTexture( Path.assets + "face/dede_face_diff.png");
		_texture2.minFilter = Three.NearestFilter;
		_texture2.magFilter = Three.NearestFilter;		
		
		_texture3 = ImageUtils.loadTexture( Path.assets + "face/dede_face_diff.png");
		_texture3.minFilter = Three.NearestFilter;
		_texture3.magFilter = Three.NearestFilter;		
		
		
		material = new MeshPhongMaterial({map:_texture1});// untyped dae.children[0].children[0].material;
		
			//material.envMap = _m.envMap;
			material.reflectivity = 0.1;
			material.refractionRatio = 0.2;
			material.side = Three.DoubleSide;
			material.shading = Three.SmoothShading;
			//material.normalMap = ImageUtils.loadTexture("maenyan_normal.jpg");
			//material.shading = Three.FlatShading;
			
			material.shininess = 2;
	
		
		geometry = untyped dae.children[0].children[0].geometry;
		geometry.verticesNeedUpdate = true;
		
		baseGeo = [];
		baseAmp = [];
		baseRadX = [];
		baseRadY = [];
		
		//	var radX:Float = -Math.atan2(vv.z, vv.x) + vv.y * Math.sin(_count) * _nejireX;//横方向の角度
		//	var radY:Float = Math.asin(vv.y / a);// + _nejireY;// * Math.sin(_count * 0.8);//縦方向の角度

		
		var max:Vector3 = new Vector3();
		var min:Vector3 = new Vector3();
		
		for (i in 0...geometry.vertices.length) {
			var vv:Vector3 = geometry.vertices[i].clone();
			var a:Float = vv.length();
			baseGeo.push( vv );
			baseAmp.push( a );
			baseRadX.push( -Math.atan2(vv.z, vv.x) );
			baseRadY.push( Math.asin(vv.y / a) );
			
			max.x = Math.max(vv.x,max.x);
			max.y = Math.max(vv.y,max.y); 
			max.z = Math.max(vv.z,max.z); 
			min.x = Math.min(vv.x,min.x);
			min.y = Math.min(vv.y,min.y);
			min.z = Math.min(vv.z,min.z);
			
		}
		
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
	 * changeMap
	 */
	public function changeMap(isWire:Bool):Void {
		
		//2shurui
		if(!isWire){
			material.map = _texture1;
		}else {
			material.map = Math.random() < 0.5 ? _texture2 : _texture3;
		}
		
	}
	
	
	/*
	public static inline var MAX_Y:Float = 1.36578;
	public static inline var MIN_Y:Float = -1.13318;
	
	public static function getPosY(ratio:Float):Float {
	
		ratio = 1 - ratio;
		var maxY:Float = MAX_Y;
		var minY:Float = -MIN_Y;
		
		return minY + (maxY - minY) * ratio;
	
	}
	
	public static function getRatioY(posY:Float):Float {
		
		var maxY:Float = MAX_Y;
		var minY:Float = MIN_Y;
		return (posY - minY) / (maxY - minY);
		
	}
	
	public static function getHeight(ratio:Float):Float {
	
		return (MAX_Y - MIN_Y) * ratio;
		
	}*/
	
	public static inline var MAX_Y:Float = 1.36578;
	public static inline var MIN_Y:Float = -1.13318;	
	
	public static function getPosY(ratio:Float):Float {
	
		ratio = 1 - ratio;
		var maxY:Float = MAX_Y;
		var minY:Float = MIN_Y;
		
		return minY + (maxY - minY) * ratio;
	
	}
	
	public static function getRatioY(posY:Float):Float {
		
		var maxY:Float = MAX_Y;
		var minY:Float = MIN_Y;
		return (posY - minY) / (maxY - minY);
		
	}
	
	public static function getHeight(ratio:Float):Float {
	
		return (MAX_Y - MIN_Y) * ratio;
		
	}	
	
	
	
}