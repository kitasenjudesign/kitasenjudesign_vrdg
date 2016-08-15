package net.badimon.five3D.typography 
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author nab
	 */
	public class TypoTestGraphics3 
	{
		
		public function TypoTestGraphics3() 
		{
			
		}

		public static function drawNormal(s:Sprite, motif:Array):void {

			var g:Graphics = s.graphics;
			g.clear();
			g.beginFill(0xff0000);
			
			var count:int = 0;
			var len:int = motif.length;
			
			
			for (var i:int = 0; i < len; i++) {
				
				var m:Array = motif[i];
				
				switch (m[0]){	
					case "M":
						var isHit:Boolean = s.hitTestPoint(m[1][0], m[1][1], true);
						//trace(count + "isHit = " + isHit);
						//count++;
						g.moveTo(m[1][0], m[1][1]);

						if(isHit) motif[i][0] = "H";//hole
						break;
					case "L":
						g.lineTo(m[1][0], m[1][1]);
						break;		
					case "C":
						g.curveTo(m[1][0], m[1][1], m[1][2], m[1][3]);
						break;
						
				}
			}
			
		}
		
	}

}