package canvas.primitives;
import data.LogoPaths;
import data.Paths;
import sound.MyAudio;
import three.ExtrudeGeometry;
import three.Geometry;
import three.Mesh;
import three.MeshLambertMaterial;
import three.Shape;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author nabe
 */
class ChannelLogo extends PrimitiveBase
{

	private var _logos:Array<Mesh> = [];
	
	public function new() 
	{
		super();
	}
	
	override public function init():Void {
	
		
		LogoPaths.init();
		var paths:Array<Paths> = LogoPaths.getPaths();

		
		//shape.scaleX = 2;
		//shape.scaleY = 2;
		
		var geo:Geometry = new Geometry();
		for (i in 0...paths.length) {
			
			var p:Paths = paths[i];
			var list:Array<Vector2> = p.getPoints();
			var shape:Shape = new Shape();
			//shape.graphics.beginFill( Graphics.getRGB(255, 0, 0, 0.5) );
			//shape.graphics.beginStroke("#ff0000").setStrokeStyle(1);
					
				for (j in 0...list.length) {
					if (j == 0) {
						shape.moveTo( list[j].x, list[j].y );
					}else if (j == list.length - 1) {
						shape.lineTo( list[j].x, list[j].y );
						shape.lineTo( list[0].x, list[0].y );	
					}else{
						shape.lineTo( list[j].x, list[j].y );
					}
				}
			
			var g:ExtrudeGeometry = new ExtrudeGeometry(shape, { amount:20, bevelEnabled:false} );
			geo.merge(g);
			
		}
		
		_logos = [];
		var num:Int = 10;
		for(i in 0...num){
			var mesh:Mesh = new Mesh(geo, new MeshLambertMaterial( { color:0xff0000 } ));
				mesh.scale.set(0.6, 0.6, 0.6);
				mesh.position.y = (i - 4) * 100;
				mesh.rotation.y = Math.PI / 20 * i;
				add(mesh);
				_logos.push(mesh);
		}
		
		//Geometry
		
	}
	
	
	
	override public function update(a:MyAudio,rotV:Vector3):Void {
	
		for (i in 0..._logos.length) {
			_logos[i].rotation.y += Math.PI / 150 * i;
		}
		
	}
}