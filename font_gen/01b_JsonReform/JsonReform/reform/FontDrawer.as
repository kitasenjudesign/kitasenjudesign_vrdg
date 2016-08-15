package reform 
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author nabe
	 */
	public class FontDrawer extends Sprite
	{
		
		private var _tfs:Array = [];
		
		
		public function FontDrawer() 
		{
			
		}
		
		private function _removeTfs():void {
		
			for each(var tf:TextField in _tfs) {
				removeChild(tf);
			}
			_tfs = [];
		}
		
		private function _addTf(i:int,xx:Number,yy:Number,color:Number):void {
			
			var tf:TextField = new TextField();
			tf.text = String(i);
			tf.textColor = color;
			addChild(tf);
			tf.scaleX = 0.5;
			tf.scaleY = 0.5;
			_tfs.push(tf);
			tf.x = xx;
			tf.y = yy;
			
			
		}
		
		
		
		public function draw(a:Array):void {
			
			/*
			"0":
				[
					54.3,
					"M,48.8,80.9",
					"L,48.8,50.9",
					"C,48.7,44.1,45.8,39.4",
					"C,42.8,34.6,37.9,32.2","C,33.1,29.7,27.2,29.7","C,21.3,29.7,16.4,32.2","C,11.5,34.6,8.5,39.4","C,5.6,44.1,5.5,50.9","L,5.5,80.9","C,5.6,87.7,8.5,92.4","C,11.5,97.1,16.4,99.6","C,21.3,102.1,27.2,102.1","C,33.1,102.1,37.9,99.6","C,42.8,97.1,45.8,92.4","C,48.7,87.7,48.8,80.9","H,35.8,80.8","C,35.7,85.3,33.4,87.8","C,31.1,90.3,27.2,90.3","C,23.3,90.3,20.9,87.8","C,18.6,85.3,18.5,80.8","L,18.5,51.1","C,18.6,46.5,20.9,44","C,23.3,41.5,27.2,41.4","C,31.1,41.5,33.4,44","C,35.7,46.5,35.8,51.1","L,35.8,80.8"],

			*/

			var g:Graphics = this.graphics;
			g.clear();
			g.lineStyle(0, 0);
			
			_removeTfs();
			
			for (var i:int = 1; i < a.length; i++) {
				
				var s:String = a[i];
				var ary:Array = s.split(",");
				
				switch( ary[0] ) {
					case "M":
						g.beginFill(0xff0000, 0.3);
						g.moveTo(Number( ary[1] ), Number( ary[2] ));
						_addTf(i, Number( ary[1] ), Number( ary[2] ), 0xff0000);
						break;
					case "H":
						g.beginFill(0x00ff00, 0.3);
						g.moveTo(Number( ary[1] ), Number( ary[2] ));						
						_addTf(i, Number( ary[1] ), Number( ary[2] ), 0x00ff00);
						break;
					case "L":
						g.lineTo(Number( ary[1] ), Number( ary[2] ));
						break;
					case "C":
						g.curveTo(
							Number( ary[1] ), Number( ary[2] ),
							Number( ary[3] ), Number( ary[4] )							
						);						
						break;					
				}
				
			}
			
		}
		
	}

}