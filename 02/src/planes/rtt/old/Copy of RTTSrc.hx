package planes.rtt;

import camera.ExCamera;
import createjs.easeljs.Point;
import data.LogoPaths;
import data.Paths;
import objects.MyDAELoader;
import three.AmbientLight;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;
import three.WebGLRenderTarget;

/**
 * ...
 * @author nabe
 */
class RTTSrc
{

	private var _scene:Scene;
	private var _camera:ExCamera;
	private var _paths:Array<Paths>;
	private var _dae:MyDAELoader;
	private var _mesh:Mesh;
	private var _light:AmbientLight;
	var _count:Int=0;
	
	public function new() 
	{
	}
	
	public function init():Void {
	_scene = new Scene();_camera = new ExCamera(10, RTTPlane.width / RTTPlane.height, 1, 10000);_camera.position.z = 300;_camera.lookAt(new Vector3());		_dae = new MyDAELoader();_dae.load(_onInit);_light = new AmbientLight(0xffffff);_scene.add(_light);var cube:Mesh = new Mesh(	new BoxGeometry(20, 20, 20),	new MeshBasicMaterial( { color:0x00ff00, wireframe:true } ));_scene.add(cube);
	}
	
	function _onInit() 
	{_mesh = new Mesh(_dae.geometry, _dae.material);_mesh.scale.set(200, 200, 200);_scene.add(_mesh);
	}
	
	public function update(renderer:WebGLRenderer,renderTarget:WebGLRenderTarget):Void {
_count++;if (_mesh != null) {	//_mesh.rotation.y += Math.PI / 30;	_mesh.position.y = 100 * Math.sin(_count / 100);}//renderer.autoClearColor = false;untyped renderer.render(_scene, _camera, renderTarget);//renderer.autoClearColor = true;
	}
	
}