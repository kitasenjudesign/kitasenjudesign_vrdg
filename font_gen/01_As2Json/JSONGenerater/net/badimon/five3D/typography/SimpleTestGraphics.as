package net.badimon.five3D.typography 
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author nab
	 */
	public class SimpleTestGraphics
	{
		
		public function SimpleTestGraphics() 
		{
			
		}

		public static function drawNormal(s:Sprite, motif:Array):void {

			
			var len:int = motif.length;
			var out:Array = [];
			var count:int = 0;
			
			for (var i:int = 0; i < len; i++) {
				
				var m:Array = motif[i];
				switch (m[0]){
					case "M":
						trace("_M");
						var g:Graphics = s.graphics;
						g.endFill();
						g.beginFill(0xff0000);

						g.moveTo(m[1][0], m[1][1]);
						break;
					case "H":
						trace("_H");
						var g:Graphics = s.graphics;
						g.endFill();
						g.beginFill(0x00ff00);

						/*
						var tf:TextField = new TextField();
						s.addChild(tf);
						tf.text = String( count );
						tf.textColor = 0xffffff;
						tf.x = m[1][0];
						tf.y = m[1][1];
						count++;
						*/
						g.moveTo(m[1][0], m[1][1]);
						break;
						
					case "L":
						trace("L");
						g.lineTo(m[1][0], m[1][1]);
						break;
						
					case "C":
						trace("C");
						g.curveTo(m[1][0], m[1][1], m[1][2], m[1][3]);
						break;
						
				}
				
			}
		}
		
	}

}