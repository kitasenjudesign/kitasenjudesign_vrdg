package planes.rtt;

import camera.ExCamera;
import createjs.easeljs.Point;
import data.LogoPaths;
import data.Paths;
import data.TextureData;
import objects.MyDAELoader;
import three.AmbientLight;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.OrthographicCamera;
import three.PlaneGeometry;
import three.Scene;
import three.Texture;
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
	private var _camera:OrthographicCamera;
	private var _paths:Array<Paths>;
	private var _dae:MyDAELoader;
	private var _mesh:Mesh;
	private var _light:AmbientLight;
	var _count:Int=0;
	
	public function new() 
	{
	}
	
	public function init():Void {
	_scene = new Scene();//left,right,top,bottom_camera = new OrthographicCamera(	-RTTPlane.width / 2, 	RTTPlane.width / 2, 	RTTPlane.height / 2,	-RTTPlane.height / 2);_camera.position.z = 500;_camera.lookAt(new Vector3());		_dae = new MyDAELoader();_dae.load(_onInit);_light = new AmbientLight(0xffffff);_scene.add(_light);/*var cube:Mesh = new Mesh(	new BoxGeometry(20, 20, 20),	new MeshBasicMaterial( { color:0x00ff00, wireframe:true } ));_scene.add(cube);*/
	}
	
	function _onInit() 
	{/*_mesh = new Mesh(_dae.geometry, _dae.material);_mesh.scale.set(100, 100, 100);_scene.add(_mesh);*/var data:TextureData = TextureData.getRandom();var texture:Texture = data.texture;_mesh = new Mesh(	new PlaneGeometry(data.width, data.height, 1, 1),	new MeshBasicMaterial( { map:texture,depthTest:false,transparent:true,side:Three.DoubleSide } ));_scene.add(_mesh);
	}
	
	public function update(renderer:WebGLRenderer,renderTarget:WebGLRenderTarget):Void {
_count++;if (_mesh != null) {	//_mesh.rotation.y += Math.PI / 120;	_mesh.rotation.z += Math.PI / 150;	//_mesh.position.y = 200 * Math.sin(_count / 30);}//renderer.autoClearColor = false;untyped renderer.render(_scene, _camera, renderTarget);//renderer.autoClearColor = true;
	}
	
}