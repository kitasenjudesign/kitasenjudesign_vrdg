package  
{
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import net.badimon.five3D.typography.AOTFProM;
	import net.badimon.five3D.typography.Typography3D;
	import net.badimon.five3D.typography.TypoTestGraphics;
	import net.badimon.five3D.typography.TypoTestGraphics2;
	/**
	 * ...
	 * @author nab
	 */
	public class Test extends MovieClip
	{
		
		public function Test() 
		{
			var font:Typography3D = new AOTFProM();// new HelveticaLight();
			
			var shape:Sprite = new Sprite();
			addChild(shape);

			var shape2:Sprite = new Sprite();
			addChild(shape2);
			
			TypoTestGraphics2.drawNormal( shape2, shape, font.motifs["語"]);

		}
		
	}

}