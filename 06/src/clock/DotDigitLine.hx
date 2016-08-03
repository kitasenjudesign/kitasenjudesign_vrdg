package clock;
import common.ExVector3;
import js.Browser;
import three.BoxGeometry;
import three.Geometry;
import three.Line;
import three.LineBasicMaterial;
import three.LineSegments;
import three.Mesh;
import three.MeshBasicMaterial;
import three.Object3D;
import three.Vector3;
import typo.Stroke;

/**
 * ...
 * @author watanabe
 */
class DotDigitLine extends Object3D
{


	
	/**
	 * 
	 * @param	dots
	 */
	public static function update(dts:Array<Array<ExVector3>>,isRandom:Bool=false):Void
	{
		
		for( i in 0...dts.length){
			
			var okDots:Array<ExVector3> = [];
			var dots:Array<ExVector3> = dts[i];/////
			
			for (j in 0...dots.length) {
				if( dots[j].enabled ){
					okDots.push( dots[j] );
				}
			}
			
			//trace(okDots.length);
			
			if(okDots.length>0){
				for (j in 0...okDots.length) {
					
					var v:Array<Vector3> = MyPointCloud.cloud.getNextLine();
					
					if (!isRandom) {
						v[0].copy( okDots[j] );
						v[0].z = 0;
						v[1].copy( okDots[(j+1)%okDots.length] );					
						v[1].z = 0;
					}else{
						//v[0].copy( okDots[j] );
						v[0].copy( okDots[j] );
						v[0].z = 0;
						v[1].copy( okDots[okDots[j].rIndex%okDots.length] );
						//v[1].copy( okDots[j + 1] );					
						v[1].z = 0;

					}
						
				}
			}
			
		}		
		
		
	}	
	
	
}