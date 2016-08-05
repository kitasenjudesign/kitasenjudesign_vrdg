package canvas.primitives;
import canvas.primitives.font.FontTest;
import net.badimon.five3D.typography.HelveticaMedium;
import three.ExtrudeGeometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshLambertMaterial;
import three.Shape;
import three.ShapeGeometry;

/**
 * ...
 * @author watanabe
 */
class Two extends PrimitiveBase
{

	
	
	public function new() 
	{
		super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		var s:String = "3";
		
		for(i in 0...s.length){
			
			var shape:Shape = new Shape();
			FontTest.getLetterPoints(shape, s.substr(i, 1), true, 4, new HelveticaMedium());
			//shapes.push(shape);
			//var geo:ExtrudeGeometry = new ExtrudeGeometry(untyped shape, {amount:1});
			//var geo:ShapeGeometry = new ShapeGeometry(untyped shape, { } );
			var geo:ExtrudeGeometry = new ExtrudeGeometry(untyped shape, { amount:30,bevelEnabled:false } );

			var mesh:Mesh = new Mesh(
				geo, 
				new MeshLambertMaterial( { color:0xffffff/*, side:Three.DoubleSide*/ } )
			);
			mesh.position.x = i * 60 - (s.length-1)*60/2;
			add(mesh);
			
		}
		
	}
	
	
}