package typo;
import haxe.Timer;
import three.Material;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.Vector3;

/**
 * ...
 * @author watanabe
 */
class PlaneBufferTest extends Object3D
{

	private var SEGX:Int = 3;
	private var SEGY:Int = 3;
	private var _geo:PlaneBufferGeometry;
	private var _mate:Material;
	private var _position:Array<Float>;
	var _time:Int = 0;
	public function new() 
	{
		super();
	}
	
	public function init():Void {
		
		_geo = new PlaneBufferGeometry(300, 300, SEGX, SEGY);
		_position = _geo.attributes.position.array;
		
		add(new Mesh(cast _geo, new MeshBasicMaterial( { wireframe:true,color:0xffffff } )));
		update();
	}
	
	public function update():Void{
	 
		_geo.attributes.position.needsUpdate = true;
		
		_time++;
		for (i in 0...SEGX+1) {
			for (j in 0...SEGY+1) {
				//(i,j)のvertexを得る
				var index:Int = j * (SEGX + 1) + i % (SEGX + 1);
				
				//_position[index*3]   = newX; //---新たに加える頂点のx座標
				//_position[index*3+1] = newY; //---新たに加える頂点のy座標
				_position[index * 3 + 2] = 100 * Math.sin( -i/2 + _time/10 ); //---新たに加える頂点のz座標

			}
		}
		
		Timer.delay(update, 33);
	}

}