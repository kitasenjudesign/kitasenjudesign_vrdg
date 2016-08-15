package net.badimon.five3D.typography 
{
	/**
	 * ...
	 * @author nabe
	 */
	public class Strokes
	{

		public var list:Vector.<Array>
		public var isHit:Boolean = false;
		public var holes:Vector.<Strokes>;
		
		
		
		
		public function Strokes() 
		{
			holes = new Vector.<Strokes>;
			list = new Vector.<Array>;
		}
		
		public function push(a:Array):void {
			list.push(a);
		}
		
		
		public function getData(n:int):Array 
		{
			return list[n];
		}
		
		public function get length():int {
			return list.length;
		}
		
		
	}

}