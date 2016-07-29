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
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class Cubes extends PrimitiveBase
{

	private var _cubes:Array<ExMesh>;
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void {
		
		var materials:Array<Material> = 
			[	new MeshLambertMaterial( { color: 0x22ff33 } ),	
				new MeshLambertMaterial( { color: 0x44ff00 } ),	
				new MeshLambertMaterial( { color: 0x11ffff } ),	
				new MeshLambertMaterial( { color: 0x3300ff } ),	
				new MeshLambertMaterial( { color: 0xff0033 } ),	
				new MeshLambertMaterial( { color: 0xff8800 } )
			];
				
		var mm	:MeshFaceMaterial = new MeshFaceMaterial(materials);
		var geo	:BoxGeometry = new BoxGeometry(130, 130, 130, 10, 10, 10 );
			
		_cubes = [];
		for (i in 0...16) {
			
			var cube:ExMesh = new ExMesh(geo,mm);	
			add(cube);
			
			cube.position.x = 800 * (Math.random() - 0.5);
			cube.position.y = 800 * (Math.random() - 0.5);
			cube.position.z = 800 * (Math.random() - 0.5);
			
			cube.amp = 400+600 * Math.random();
			cube.radX = 2 * Math.PI * Math.random();
			cube.radY = 2 * Math.PI * Math.random();
			
			var ss:Float = Math.random() * 0.4 + 0.8;
			cube.scale.set(ss, ss, ss);
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
	
	
	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		for (i in 0..._cubes.length) {
			var aa:Float = a.freqByteData[0] / 255 * Math.PI/5 + Math.PI/10;
			//_cubes[i].amp -= a.freqByteData[0] / 255 + 1;
			_cubes[i].rotation.x += aa * _cubes[i].vx;
			_cubes[i].rotation.y += aa * _cubes[i].vz;			
			_cubes[i].rotation.z += aa * _cubes[i].vz;

			_cubes[i].position.y -= 10 + Math.abs( aa * _cubes[i].vy);
			//_cubes[i].update();
			if (_cubes[i].position.y < -400) {
				_cubes[i].position.y = 400;
			}
		}
		
		this.rotation.y += rotV.y*0.5;
		
		//super.update(a, rotV);
		
	}	
	
	
	
}