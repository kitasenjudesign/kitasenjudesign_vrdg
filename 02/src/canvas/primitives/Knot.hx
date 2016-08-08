package canvas.primitives;
import three.Mesh;
import three.MeshLambertMaterial;
import three.MeshPhongMaterial;
import three.OctahedronGeometry;
import three.TorusKnotGeometry;

/**
 * ...
 * @author watanabe
 */
class Knot extends PrimitiveBase
{

	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 * @param	o
	 */
	override public function init(o:Dynamic):Void {
		
		super.init(o);
		/*var light:DirectionalLight = new DirectionalLight(0xffffff, 0.1);light.position.set( -10, 5, 3);add(light);*/
		var mesh:Mesh = new Mesh( 	
		//new SphereGeometry(100, 8, 8),	
		new TorusKnotGeometry(50, 18, 60, 10, 2, 3),	
		new MeshPhongMaterial( { color:0xff8833 } ));
		add(mesh);
		
	}
	
}