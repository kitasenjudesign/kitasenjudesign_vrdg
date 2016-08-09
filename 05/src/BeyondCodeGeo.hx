package;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector2;
import three.Vector3;
import tween.TweenMax;
import typo.Stroke;
import typo.StrokeUtil;

/**
 * ...
 * @author watanabe
 */
class BeyondCodeGeo
{
	
	private static var _mojiGeo:Map<String,Array<Geometry>>;
	private static var _renderOrder:Int = 0;
	public static var mat	:LineBasicMaterial;// = new LineBasicMaterial( { color:0xffffff } );
	public static var mat2	:MeshBasicMaterial;
	public function new() 
	{
		
	}
	
	
	public static function getFillMesh(nn:String, font:Int):Object3D {
		
		if (mat == null) {
			mat = new LineBasicMaterial( { color:0xffffff } );
			mat.transparent = true;
			//mat.blending = Three.AdditiveBlending;
			//mat.color.setHSL(0, 0, 0);
		}
		
		var o:Object3D = new Object3D();
		var geos:Array<Geometry> = getGeo(nn, font);
		for (i in 0...geos.length) {
			var line:Line = new Line(geos[i], mat);
			line.renderOrder = _renderOrder;
			_renderOrder++;
			o.add(line);
		}
		
		return o;		
		
	}
	
	
	/**
	 * 
	 * @param	nn
	 * @param	font
	 * @return
	 */
	public static function getMesh(nn:String,font:Int):Object3D {
		
		if (mat == null) {
			mat = new LineBasicMaterial( { color:0xffffff } );
			mat.transparent = true;
			//mat.blending = Three.AdditiveBlending;
			//mat.color.setHSL(0, 0, 0);
		}
		
		var o:Object3D = new Object3D();
		var geos:Array<Geometry> = getGeo(nn, font);
		for (i in 0...geos.length) {
			var line:Line = new Line(geos[i], mat);
			line.renderOrder = _renderOrder;
			_renderOrder++;
			o.add(line);
		}
		
		return o;
		
	}
	
	

	
	/**
	 * 
	 * @param	nn
	 * @return
	 */
	public static function getGeo(nn:String,font:Int):Array<Geometry> {

		if (_mojiGeo == null) {
			_mojiGeo=new Map<String,Array<Geometry>>();
		}
		
		var name:String = font +"_" + nn;
		
		if (_mojiGeo.get(name) != null) {
			return _mojiGeo.get(name);
		}
		
		_mojiGeo.set(name, _getGeo(nn,font));
		
		return _mojiGeo.get(name);
		
	}
	
	private static function _getGeo(nn:String,font:Int):Array<Geometry>{
		var geos:Array<Geometry> = [];
			
			var strokes:Array<Stroke> = StrokeUtil.getStrokes(nn, 0.65,font);
			for (j in 0...strokes.length) {
				
				var vv:Array<Vector2> = strokes[j].getPoints();
				var g:Geometry = new Geometry();
				for (i in 0...vv.length) {
					g.vertices.push(new Vector3(
						vv[i].x*2,
						-vv[i].y*2,
						0
					));
				}
				g.vertices.push(new Vector3(
					vv[0].x*2,
					-vv[0].y*2,
					0
				));
				
				geos.push(g);
				
			}
		
		return geos;		
	
	}
	
	
}

