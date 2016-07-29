package typo.display 
{
	import flash.geom.Point;
	/**
	 * ...
	 * @author watanabe
	 */
	public class Stroke 
	{
		
		private var _points:Array = [];
		private var _distance:Number = 0;
		private var _currentDist:Number = 0;
		
		public function Stroke() 
		{
			
		}

		public function init(points:Array):void {
			
			_points = points;
			
			for (var i:int = 0; i < _points.length-1; i++) {
				var p1:Point = _points[i];
				var p2:Point = _points[i + 1];
				var dx:Number = p2.x - p1.x;
				var dy:Number = p2.y - p1.y;
				var d:Number = Math.sqrt(dx * dx + dy * dy);
				_distance += d;
			}

		}
		
		public function getNextPosition(dx:Number):Point {
			
			if (_currentDist >= _distance) _currentDist = 0;
			_currentDist += dx;
			return getPosition( _currentDist / _distance );
			
		}
		
		
		public function getPosition(ratio:Number):Point {
			
			if (ratio < 0) ratio = 0;
			if (ratio >= 1) ratio = 1;
			
			var n			:Number = ratio * (_points.length-1);
			var r			:Number = Math.ceil(n) - n;

			//線形補完
			var p1:Point = _points[ Math.floor( n ) ];
			var p2:Point = _points[ Math.floor( n ) + 1 ];
			var p:Point;
			
			if(p1 && p2){
				var xx:Number = r * p1.x + (1 - r) * p2.x;
				var yy:Number = r * p1.y + (1 - r) * p2.y;
				p = new Point(xx, yy);
			}else {
				if (p1) p = p1;
				if (p2) p = p2;
			}
			
			return p;
		}
		
		public function get distance():Number 
		{
			return _distance;
		}
		
		
		//public function get
		
		
	}

}