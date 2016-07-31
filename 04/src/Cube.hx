package ;
import haxe.macro.Expr.Var;
import three.Geometry;
import three.ImageUtils;
import three.Line;
import three.LineBasicMaterial;
import three.LineDashedMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.PlaneBufferGeometry;
import three.PlaneGeometry;
import three.Texture;
import three.Vector3;
import three.Vertex;

/**
 * ...
 * @author nab
 */
class Cube extends Object3D
{
	
	private var title	:CubeTitle;
	private var title2	:CubeTitle;
	var mate:LineBasicMaterial;
	public function new() 
	{
		super();
	}
	
	/**
	 * 
	 */
	public function init():Void {
		
		var w:Int = 1000;
		
		title = new CubeTitle();
		title.init(w);
		add(title);
		title2 = new CubeTitle();
		title2.init(w);
		title2.rotation.y = Math.PI;
		add(title2);
	
		
		mate = new LineBasicMaterial( { color:0xffffff } );
		mate.fog = false;
		var geo:Geometry = new Geometry();	
			geo.vertices.push(new Vertex(w, w, w));
			geo.vertices.push(new Vertex(w, -w, w));
			geo.vertices.push(new Vertex(-w, -w, w));
			geo.vertices.push(new Vertex( -w, w, w));
			geo.vertices.push(new Vertex( w, w, w));
		

		//var mateB:LineBasicMaterial = new LineBasicMaterial( { color:0x444444 } );			
		for(i in 0...4){
			
			var line:Line = new Line(geo, mate);
			add(line);
			line.rotation.x = i * Math.PI / 2;
		}
		
		/*
		var geoA:Geometry = new Geometry();
		geoA.vertices.push(new Vector3(w, 0, w));
		geoA.vertices.push(new Vector3( -w, 0, -w));
		
		var geoB:Geometry = new Geometry();
		geoB.vertices.push(new Vector3(w, 0, -w));
		geoB.vertices.push(new Vector3( -w, 0, w));
		
		
		var line1:Line = new Line(geoA, mate);
		line1.position.y = w;
		add(line1);
		var line1b:Line = new Line(geoB, mate);
		line1b.position.y = w;		
		add(line1b);
		
		
		var line2:Line = new Line(geoA, mate);
		line2.position.y = -w;		
		add(line2);
		var line2b:Line = new Line(geoB, mate);
		line2b.position.y = -w;		
		add(line2b);
		*/
		
		
	}
	
	public function setScale(size:Vector3):Void {
		
		this.scale.set(size.x/1000, size.y/1000, size.z/1000);
	}
	
	public function setWhite(b:Bool):Void
	{
		if (b) {
			mate.color.set(0x9999ff);
		}else {
			mate.color.set(0x666666);	
		}
	}
}