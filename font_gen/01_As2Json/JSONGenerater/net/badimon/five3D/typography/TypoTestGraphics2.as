package net.badimon.five3D.typography 
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author nab
	 */
	public class TypoTestGraphics2 
	{
		
		public function TypoTestGraphics2() 
		{
			
		}

		public static function drawNormal(parent:Sprite, s:Sprite, motif:Array):void {

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
						
						
						var tf:TextField = new TextField();
						parent.addChild(tf);
						tf.text = String( count );
						tf.textColor = (isHit) ? 0x0000ff : 0xffffff;
						tf.x = m[1][0];
						tf.y = m[1][1];
						parent.graphics.beginFill(tf.textColor);
						parent.graphics.drawRect(tf.x, tf.y, 2, 2);
						
						count++;
						
						break;
						
					case "L":
						
						g.lineTo(m[1][0], m[1][1]);
						break;
						
					case "C":
						
						g.curveTo(m[1][0], m[1][1], m[1][2], m[1][3]);
						break;
						
				}
				
				
			}
			
			
			//
			count = 0;
			for (i = 0; i < len; i++) {
				
				m = motif[i];
				
				switch (m[0]){
				
					case "M":
					case "H":

						isHit = s.hitTestPoint(m[1][0], m[1][1], true);
						trace(count + " isHit=" + isHit);//
						count++;
						
						break;
						
					case "L":
						
						break;
						
					case "C":
						
						break;
						
				}
				
			}
			
			
		}
		
	}

}