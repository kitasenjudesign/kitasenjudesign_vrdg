package canvas.primitives;
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
import three.SphereGeometry;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class Spheres extends PrimitiveBase
{

	private var _cubes:Array<Mesh>;
	private var mm:MeshBasicMaterial;// MeshLambertMaterial;
	
	public function new() 
	{
		super();
	}
	
	override public function init(o:Dynamic):Void {
		super.init(o);
		
		mm = new MeshBasicMaterial( { color:0xbbbbbb } );
		
		var geo	:SphereGeometry = new SphereGeometry(85,10,10);// 130, 130, 130, 10, 10, 10 )
			
		_cubes = [];
		for(i in 0...12){
			var cube:Mesh = new Mesh(geo,mm);	
			add(cube);
			cube.position.x = 800 * (Math.random() - 0.5);
			cube.position.y = 800 * (Math.random() - 0.5);
			cube.position.z = 800 * (Math.random() - 0.5);
			cube.rotation.x = 2 * Math.random() * Math.PI;
			cube.rotation.y = 2 * Math.random() * Math.PI;
			cube.rotation.z = 2 * Math.random() * Math.PI;
			
			_cubes.push(cube);			
		}
		
		/*
			//new MeshBasicMaterial({color:0xff0000}));add(cube);var w:Float = 100.1 / 2;
			var g:Geometry = new Geometry(); g.vertices.push(new Vector3(w, w, w));
			g.vertices.push(new Vector3( -w, w, w)); g.vertices.push(new Vector3( -w, w, -w)); g.vertices.push(new Vector3( w, w, -w)); g.vertices.push(new Vector3(w, w, w)); g.vertices.push(new Vector3(w, -w, w)); g.vertices.push(new Vector3( -w, -w, w)); g.vertices.push(new Vector3( -w, -w, -w)); g.vertices.push(new Vector3(w, -w, -w)); g.vertices.push(new Vector3(w, -w, w)); var g2:Geometry = new Geometry(); g2.vertices.push(new Vector3( -w, w, w)); g2.vertices.push(new Vector3( -w, -w, w));	var g3:Geometry = new Geometry(); g3.vertices.push(new Vector3(w, w, -w)); g3.vertices.push(new Vector3(w, -w, -w));	var g4:Geometry = new Geometry(); g4.vertices.push(new Vector3( -w, w, -w)); g4.vertices.push(new Vector3( -w, -w, -w));
			

		var line:LineBasicMaterial = new LineBasicMaterial( { color:0xffffff } );
		var mesh1:Line = new Line(	g,	line); add(mesh1);
		var mesh2:Line = new Line(	g2,	line); add(mesh2);
		var mesh3:Line = new Line(	g3,	line); add(mesh3);
		var mesh4:Line = new Line(	g4,	line);add(mesh4);		
		*/
	}
	
	/**
	 * start
	 */
	override public function start():Void {
	
		if(Math.random()<0.6){
			mm.wireframe = true;
			mm.wireframeLinewidth = 2;
		}else {
			mm.wireframe = false;			
		}
		
	}		
	
	/**
	 * 
	 * @param	a
	 */
	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		super.update(a, rotV);
		
	}	
	
	
	
	
}