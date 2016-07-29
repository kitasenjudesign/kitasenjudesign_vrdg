package canvas.primitives;
import sound.MyAudio;
import three.Geometry;
import three.Mesh;
import three.MeshLambertMaterial;
import three.MeshPhongMaterial;
import three.OctahedronGeometry;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class Octa extends PrimitiveBase
{

	private var _cubes:Array<ExMesh>;
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void {
		/*var light:DirectionalLight = new DirectionalLight(0xffffff, 0.1);light.position.set( -10, 5, 3);add(light);*/
		
		var geo:Geometry = new OctahedronGeometry(60);
		var m:MeshPhongMaterial = new MeshPhongMaterial( { color:0x888888, shading:Three.FlatShading } );
		
		_cubes = [];
		var space:Float = 150;
		var ww:Float = space * 2;
		var hh:Float = space * 0;
		
		for (i in 0...3) {
			//for(j in 0...1){
				var mesh:ExMesh = new ExMesh(
					geo, 
					new MeshPhongMaterial( { color:Math.floor(0xffffff*Math.random()), shading:Three.FlatShading } )
				);
				add(mesh);
				var amp:Float = 80;
				mesh.position.x = amp * Math.cos( i/3 * 2 * Math.PI);
				mesh.position.z = amp * Math.sin( i/3 * 2 * Math.PI);
				
				_cubes.push(mesh);
			//}
		}
		
	}
	

	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		for (i in 0..._cubes.length) {
			var aa:Float = a.freqByteData[0] / 255 * Math.PI/25 + Math.PI/20;
			//_cubes[i].amp -= a.freqByteData[0] / 255 + 1;
			_cubes[i].rotation.x += aa * _cubes[i].vx/7;
			_cubes[i].rotation.y += aa * _cubes[i].vy;			
			_cubes[i].rotation.z += aa * _cubes[i].vz/7;

		}
		
		
		this.rotation.y += rotV.y * 0.5 + 0.01;
		
		//super.update(a, rotV);
		
	}		
	
}