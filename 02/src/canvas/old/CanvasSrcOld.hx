package canvas.old;
import camera.ExCamera;
import haxe.Timer;
import js.Browser;
import js.html.Element;
import js.html.ImageData;
import three.BoxGeometry;
import three.CanvasRenderer;
import three.Color;
import three.Material;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshFaceMaterial;
import three.PerspectiveCamera;
import three.PlaneGeometry;
import three.Scene;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class CanvasSrcOld
{
	
	public static var W:Int = 120; 
	public static var H:Int = 90;

	private var _camera:ExCamera;
	private var _renderer:CanvasRenderer;
	private var _scene:Scene;
	private var _cube:Mesh;
	private var _cubes:Array<Mesh> = [];
	private var _canvas:CanvasData;
	
	public function new() 
	{
	}

	/**
	 * init
	 */
	public function init():Void {
	_renderer = new CanvasRenderer( { devicePixelRatio:1 } );_renderer.autoClear = false;
        _renderer.setSize(Math.floor( CanvasSrc.W ) ,Math.floor( CanvasSrc.H ));_renderer.domElement.style.zIndex = "100000";_renderer.domElement.style.position = "absolute";_renderer.domElement.style.top = "0";_renderer.domElement.style.left = "0";_renderer.setClearColor(new Color(0x000000));
        Browser.document.body.appendChild(_renderer.domElement);
_camera = new ExCamera(60, W / H, 2, 2000);_camera.init(_renderer.domElement);var materials:Array<Material> = [	new MeshBasicMaterial({color: 0x22ff33,overdraw:0.5}),	new MeshBasicMaterial({color: 0x44ff00,overdraw:0.5}),	new MeshBasicMaterial({color: 0x11ffff,overdraw:0.5}),	new MeshBasicMaterial({color: 0x3300ff,overdraw:0.5}),	new MeshBasicMaterial({color: 0xff0033,overdraw:0.5}),	new MeshBasicMaterial({color: 0xff8800,overdraw:0.5})];_scene = new Scene();for(i in 0...1){	var cube:Mesh = new Mesh(		new BoxGeometry(40, 40,40, 1, 1, 1), 		new MeshFaceMaterial(materials)	//new MeshBasicMaterial({color:0xffffff,overdraw:0.5})	);	cube.rotation.set(		Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI	);	_scene.add(cube);	_cubes.push(cube);	}_canvas = new CanvasData();_canvas.init( this );//update();
	}
	
	/**
	 * update
	 */
	public function update():Void {for (i in 0...1) {	_cubes[i].scale.x += 0.2;	_cubes[i].scale.y += 0.2;	_cubes[i].scale.z += 0.2;	_cubes[i].rotation.x += Math.PI / 14;	_cubes[i].rotation.y += Math.PI / 18;	_cubes[i].rotation.z += Math.PI / 27;		if (_cubes[i].scale.x > 7) {				_cubes[i].scale.set(0.7, 0.7, 0.7);		_cubes[i].rotation.x = Math.PI * 2 *Math.PI;		_cubes[i].rotation.y = Math.PI * 2 *Math.PI;		_cubes[i].rotation.z = Math.PI * 2 * Math.PI;							}}_canvas.update();
_camera.radX += Math.PI / 200;_camera.update();_renderer.render(_scene, _camera);//Timer.delay(update, Math.floor(1000 / 30));
	}
	
	public function getPixel(xx:Int, yy:Int):Float {return _canvas.getPixel(xx, yy);
	}
	
	public function getElement():Element {return _renderer.domElement;
	}
	
}