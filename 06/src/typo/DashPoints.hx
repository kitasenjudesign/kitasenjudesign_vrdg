package typo;
import createjs.easeljs.Graphics;
import createjs.easeljs.Point;
import createjs.easeljs.Shape;
import net.badimon.five3D.typography.Typography3D;
import typo.DashLine;
import typo.DashLine;

/**
 * ...
 * @author nabe
 */
class DashPoints
{
	
	private var _currentX:Float;
	private var _currentY:Float;
	var _points:Array<Array<Point>>;

	public function new() 
	{
		
	}
	
		/**
		 * すべてをポイントで分割する
		 * @param	g
		 * @param	moji
		 * @param	isCentering
		 * @param	scale
		 * @param	letter
	*/
	public function getLetterPoints(
		moji:String,
		isCentering:Bool = false,
		scale:Float = 1,
		letter:Typography3D = null
	):Array<Array<Point>> {

		_points = [[]];
		
		var motif:Array<Dynamic> = letter.motifs.get(moji);
		//trace(motif);
		var ox:Float = 0;
		var oy:Float = 0;
		var s:Float = scale;
			
		if (isCentering) {
			ox = -letter.widths.get(moji) / 2;
			oy = -letter.getHeight() / 2;
		}
			
		var shape:Shape = new Shape();
		var count:Int = 0;
		var len:Int = motif.length;
		var dash:DashLine = null;
		for (i in 0...len){
			switch (motif[i][0]){
				case "M":
					
					if(dash!=null){
						_points[count] = dash.getPoints();
						count++;
					}
					
					dash = new DashLine(shape.graphics,5);
					dash.moveTo(s * (motif[i][1][0] + ox), s * (motif[i][1][1] + oy));
					
					
				case "L":
					dash.lineTo( s * (motif[i][1][0] + ox), s * (motif[i][1][1] + oy));

				case "C":
					//g.curveTo(s*(motif[i][1][0]+ox), s*(motif[i][1][1]+oy), s*(motif[i][1][2]+ox), s*(motif[i][1][3]+oy));
					dash.curveTo(
						s * (motif[i][1][0] + ox),
						s * (motif[i][1][1] + oy),
						s * (motif[i][1][2] + ox),
						s * (motif[i][1][3] + oy)
					);
					//break;
				}
			}
		
			if(dash!=null){
				_points[count] = dash.getPoints();
			}
			
			return _points;
	}
	
}