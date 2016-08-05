package canvas.primitives;
import three.BoxGeometry;
import three.Geometry;
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
class Cube extends PrimitiveBase
{

	public function new() 
	{super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		var materials:Array<Material> = 
			[	new MeshLambertMaterial( { color: 0x22ff33 } ),	
				new MeshLambertMaterial( { color: 0x44ff00 } ),	
				new MeshLambertMaterial( { color: 0x11ffff } ),	
				new MeshLambertMaterial( { color: 0x3300ff } ),	
				new MeshLambertMaterial( { color: 0xff0033 } ),	
				new MeshLambertMaterial( { color: 0xff8800 } )
			];
				
		var cube:Mesh = new Mesh(		
			new BoxGeometry( 130, 130, 130, 10, 10, 10 ),
			new MeshFaceMaterial(materials)		
		);
		
		add(cube);
		
		
		var w:Float = 130.3 / 2;
		var g:Geometry = new Geometry(); 
		g.vertices.push(new Vector3(w, w, w));
		g.vertices.push(new Vector3( -w, w, w));
		g.vertices.push(new Vector3( -w, w, -w));
		g.vertices.push(new Vector3( w, w, -w));
		g.vertices.push(new Vector3(w, w, w));
		g.vertices.push(new Vector3(w, -w, w));
		g.vertices.push(new Vector3( -w, -w, w));
		g.vertices.push(new Vector3( -w, -w, -w));
		g.vertices.push(new Vector3(w, -w, -w)); 
		g.vertices.push(new Vector3(w, -w, w)); 
		
		var g2:Geometry = new Geometry(); 
		g2.vertices.push(new Vector3( -w, w, w)); 
		g2.vertices.push(new Vector3( -w, -w, w));	
		
		var g3:Geometry = new Geometry(); 
		g3.vertices.push(new Vector3(w, w, -w)); 
		g3.vertices.push(new Vector3(w, -w, -w));	
		
		var g4:Geometry = new Geometry();
		g4.vertices.push(new Vector3( -w, w, -w)); 
		g4.vertices.push(new Vector3( -w, -w, -w));
			

		var line:LineBasicMaterial = new LineBasicMaterial( { color:0xffffff,linewidth:2 } );
		var mesh1:Line = new Line(	g,	line); add(mesh1);
		var mesh2:Line = new Line(	g2,	line); add(mesh2);
		var mesh3:Line = new Line(	g3,	line); add(mesh3);
		var mesh4:Line = new Line(	g4,	line);add(mesh4);		
		
	}
	
	
	
}