package  
{
	import flash.display.Graphics;
	import flash.geom.Point;
	import net.badimon.five3D.typography.Typography3D;
	import typo.display.Bezje2D;
	/**
	 * ...
	 * @author nab
	 */
	public class TypoGenUtil 
	{
		static public const SPACE:Number=5;
		private var _currentX:Number=0;
		private var _currentY:Number=0;
		private var _points:Array = [[]];
		private var _count:int = -1;
		
		public function TypoGenUtil() 
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
			g:Graphics,
			moji:String,
			isCentering:Boolean = false,
			scale:Number = 1,
			letter:Typography3D = null,
			isLineSplit:Boolean = true
		):void {

			g.lineStyle(0, 0);
			
			g.beginFill(0);

			var motif:Array = letter.motifs[moji];
			var ox:Number = 0;
			var oy:Number = 0;
			var s:Number = scale;
			
			if (isCentering) {
				ox = -letter.widths[moji] / 2;
				oy = -letter.height/2
			}
			
			
			var len:int = motif.length;
			for (var i:int = 0; i < len;i++){
				switch (motif[i][0]){
				case "M":
					_currentX = s * (motif[i][1][0] + ox);
					_currentY = s * (motif[i][1][1] + oy);
					_count++;
					_points[_count] = [new Point(_currentX, _currentY)];
					
					g.moveTo(_currentX, _currentY);
					break;
				case "L":
					
					if(isLineSplit){
						lineTo(g, s * (motif[i][1][0] + ox), s * (motif[i][1][1] + oy));
					}else {
						_currentX = s * (motif[i][1][0] + ox);
						_currentY = s * (motif[i][1][1] + oy);
						_points[_count].push( new Point(_currentX, _currentY) );
						g.lineTo(_currentX,_currentY);
					}
					break;
				case "C":
					//g.curveTo(s*(motif[i][1][0]+ox), s*(motif[i][1][1]+oy), s*(motif[i][1][2]+ox), s*(motif[i][1][3]+oy));
					curveTo(g,
						s * (motif[i][1][0] + ox),
						s * (motif[i][1][1] + oy),
						s * (motif[i][1][2] + ox),
						s * (motif[i][1][3] + oy)
					);
					
					break;
				}
			}
			
		}
		
		
		
		public function lineTo(g:Graphics, xx:Number, yy:Number):void {
			
			//ここに分割処理を入れる
			var dx:Number = xx-_currentX;
			var dy:Number = yy-_currentY;
			var dist:Number = Math.sqrt( dx * dx + dy * dy);
			var numBunkatsu:Number = Math.floor( dist / SPACE );
			if (numBunkatsu <= 1) numBunkatsu=1
			
			
			for (var i:int = 0; i < numBunkatsu; i++) {
				
				var rate:Number = i / (numBunkatsu);
				var pp:Point = new Point(_currentX + rate * dx, _currentY + rate * dy);
				g.lineTo( pp.x, pp.y );
				_points[_count].push( pp );
				
			}
			
			_currentX = xx;
			_currentY = yy;
			
			
		}
		
		
		/**
		 * pointに分割する
		 * @param	g
		 * @param	cx
		 * @param	cy
		 * @param	xx
		 * @param	yy
		 */
		public function curveTo(g:Graphics,cx:Number,cy:Number, xx:Number, yy:Number):void {
			
			var bezje:Bezje2D = new Bezje2D( new Point(_currentX, _currentY),
			                                 new Point(xx, yy),
			                                 new Point(cx, cy));
			
			//分割数
			var sn:Number = Math.floor(bezje.length/SPACE);
			if (sn <= 1) sn = 1;
			//率差分
			var kd:Number = 1.0/sn;
			
			for( var k:Number=kd; k<1.0 ; k+=kd ){
				
				//長さからt値を得る
				var t:Number = bezje.length2T( bezje.length*k );
				//プロット
				var pp:Point = bezje.f(t);//ポイント
				g.lineTo(pp.x, pp.y);
				_points[_count].push( pp );

			}
			
			_currentX = xx;
			_currentY = yy;
			
		}		
		
		public function get points():Array 
		{
			return _points;
		}
	}

}