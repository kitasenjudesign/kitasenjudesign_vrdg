package canvas.primitives;
import three.Mesh;
import three.MeshLambertMaterial;
import three.TorusGeometry;

/**
 * ...
 * @author nabe
 */
class Torus extends PrimitiveBase
{

	public function new() 
	{super();
	}
	
	override public function init():Void {var m:Mesh = new Mesh(new TorusGeometry(100, 30, 20, 20), new MeshLambertMaterial( { color:0xffffff } ));add(m);
	}
	
	//あとはチャネルロゴをいれる
	
}