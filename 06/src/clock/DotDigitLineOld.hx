package clock;
import js.Browser;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import typo.Stroke;

/**
 * ...
 * @author watanabe
 */
class DotDigitLineOld extends Object3D
{

	public var lines:Array<Line>;
	private static var lineMate:LineBasicMaterial;
	
	public function new() 
	{
		super();
	}
	
	/**
	 * init
	 */
	public function init(strokes:Array<Stroke>,space:Float):Void {
		
		if (lines != null) {
			//trace("lines remove!!=================" + lines.length);
			for ( i in 0...lines.length) {
				var line:Line = lines[i];
				line.geometry.dispose();
				remove(line);
				trace("remove");
			}
		}
		
		_makeMat();
		
		lines = [];		
		for ( i in 0...strokes.length) {
			trace("new line >>>> " + strokes.length);
			//syyji
			var lineGeo:Geometry = getGeometry( strokes[i].getNum(space)+1 );
				//MyPointCloud.cloud._cloud.geometry.clone();//_cloud.geometry.clone();
			var line:Line = new Line(lineGeo, lineMate );
				line.frustumCulled = false;
				add(line);
				
			lines.push(line);
			
		}
		
	}
	
	
	private function _makeMat():Void {
		if ( lineMate == null ) {
			lineMate = new LineBasicMaterial(
				{ color:0xffffff, linewidth:2 }
			);
			lineMate.blending = Three.AdditiveBlending;
			//_flag = true;
		}		
	}
	
	
	private function getGeometry(num:Int):Geometry {
		
		var g:Geometry = new Geometry();
		for (i in 0...num) {
			g.vertices.push( cast new ExVector3(0, 0, 0) );
		}
		return g;
	}
	
	/**
	 * 
	 * @param	dots
	 */
	public function update(dts:Array<Array<ExVector3>>):Void
	{
		//if (_flag) {
		//	lineMate.color = MyColor.getColor();
		//}
		
		//全部のLineに対して。
		for( i in 0...lines.length){
			
			var line:Line = lines[i];
			line.geometry.verticesNeedUpdate = true;

			var okDots:Array<ExVector3> = [];
			var dots:Array<ExVector3> = dts[i];
			
			for (j in 0...dots.length) {
				if( dots[j].enabled ){
					okDots.push( dots[j] );
				}
			}
			
			if(okDots.length>0){
				for (j in 0...line.geometry.vertices.length) {
					
					if(j<okDots.length){
						line.geometry.vertices[j].copy( okDots[j] );
					}else {
						line.geometry.vertices[j].copy( okDots[0] );					
					}
					
				}
				line.position.z = 0;
			}else {
				line.position.z = 0;// Z_MAX;
			}
			
		}		
		
		
	}	
	
	
}