package clock;
import three.Color;
import three.Face;
import three.Face3;
import three.Geometry;
import three.GeometryUtils;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vertex;

/**
 * ...
 * @author nab
 */
class Digit extends Object3D
{

	private var digits	:Array<Mesh>;
	private var m		:MeshBasicMaterial;
	private var mesh	:Mesh;
	private var _g		:Geometry;
	
	public function new() 
	{
		super();
	}
	
	public function init(letters:Array<Mesh>):Void {

		digits = [];
		var g:Geometry = new Geometry();
		_g = g;
		for (i in 0...letters.length) {
			var d:Object3D = letters[i].clone();
			digits.push(cast d);
			if (i == 1) {
				d.position.x = 8;
			}
			d.position.y = i * 200;
			//add(d);
			GeometryUtils.merge(g, cast d);
		}
		
		//_setRandomColor();
		
		m = new MeshBasicMaterial( { color:0xffffff,overdraw:true,vertexColors: Three.VertexColors,side:Three.DoubleSide } );
		//m.side = Three.DoubleSide;
		mesh = new Mesh(g, m);
		add(mesh);
		//GeometryUtil
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	private function _setRandomColor():Void {
		
		for (i in 0..._g.faces.length) {
			var f:Face  = _g.faces[ i ];
			var n:Int = Std.is( f, Face3 ) ? 3 : 4;
			for(j in 0...n){
				var color:Color = new Color( Math.floor(Math.random()*0xffffff) );
                f.vertexColors[ j ] = color;//色ぶっこみ！
            }
		}
		
	}
	
	public function setColor(col:Int):Void {
		m.color = new Color( col );
		
		_g.verticesNeedUpdate = true;
		_g.elementsNeedUpdate = true;
		_g.colorsNeedUpdate = true;
//		_setRandomColor();
		
		//mesh.updateMatrix();
		//mesh.up
	}
	
	
	public function setNo(n:Int):Void {
		
		this.position.y += ( -(n * 200) - this.position.y) / 7;
		
	}
	
}