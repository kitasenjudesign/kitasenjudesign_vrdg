package canvas.primitives;
import common.MyDAELoader;
import sound.MyAudio;
import three.BoxGeometry;
import three.Geometry;
import three.IcosahedronGeometry;
import three.Line;
import three.LineBasicMaterial;
import three.Material;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshFaceMaterial;
import three.MeshLambertMaterial;
import three.Object3D;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class Katoris extends PrimitiveBase
{

	private var _cubes	:Array<ExMesh>;
	private var _loader	:MyDAELoader;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	o
	 */
	override public function init(o:Dynamic):Void {
		_cubes = [];
		super.init(o);
		
		if(_loader==null){
			_loader = new MyDAELoader();
			_loader.load("dae/katori.dae", _onLoad);
		}
	}
	
	private function _onLoad():Void{
		
		var mm	:MeshBasicMaterial = new MeshBasicMaterial({color:0xffffff});
		var geo	:Geometry = _loader.meshes[0].geometry;//new BoxGeometry(130, 130, 130, 10, 10, 10 );
			
		//konnna 
		
		for (i in 0...23) {
			
			var cube:ExMesh = new ExMesh(geo,mm);	
			add(cube);
			
			cube.position.x = 800 * (Math.random() - 0.5);
			cube.position.y = 800 * (Math.random() - 0.5);
			cube.position.z = 800 * (Math.random() - 0.5);
			
			cube.amp = 460+600 * Math.random();
			cube.radX = 2 * Math.PI * Math.random();
			cube.radY = 2 * Math.PI * Math.random();
			
			var ss:Float = Math.random() * 0.6 + 0.8;
			cube.scale.set(ss, ss, ss);
			_cubes.push(cube);			
		}
		
	}
	
	
	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		if (_cubes.length == 0) return;
		
		for (i in 0..._cubes.length) {
			var aa:Float = a.freqByteData[0] / 255 * Math.PI/6 + Math.PI/20;
			//_cubes[i].amp -= a.freqByteData[0] / 255 + 1;
			_cubes[i].rotation.x += aa * _cubes[i].vx * 0.3;
			_cubes[i].rotation.y += aa * _cubes[i].vz * 0.3;			
			_cubes[i].rotation.z += aa * _cubes[i].vz * 0.3;

			_cubes[i].position.y += 0.5 + Math.abs( aa * _cubes[i].vy);
			//_cubes[i].update();
			if (_cubes[i].position.y > 400) {
				_cubes[i].position.y = -400;
			}
		}
		
		this.rotation.y += rotV.y*0.03+0.01;
		
		//super.update(a, rotV);
		
	}	
	
	
	
}