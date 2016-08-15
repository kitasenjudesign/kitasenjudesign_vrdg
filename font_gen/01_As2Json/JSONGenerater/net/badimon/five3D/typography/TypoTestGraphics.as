package net.badimon.five3D.typography 
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author nab
	 */
	public class TypoTestGraphics 
	{
		
		public function TypoTestGraphics() 
		{
			
		}

		public static function drawNormal(s:Sprite, motif:Array):void {

			var g:Graphics = s.graphics;
			g.clear();
			g.beginFill(0xff0000);
			
			var count:int = 0;
			var len:int = motif.length;
			
			//配列を使いやすいように変換
			var strokes:Vector.<Strokes>=new Vector.<Strokes>;
			var count:int = -1;
			for (var i:int = 0; i < len; i++) {
				var m:Array = motif[i];
				if (m[0] == "M") {
					count++;
					strokes[count] = new Strokes();// Vector.<Array>;
				}
				strokes[count].push( m );
			}
			
			
			len = strokes.length;
			var holeFlags:Vector.<Boolean> = new Vector.<Boolean>;
			
			for (i = 0; i < len; i++) {
				
			
				//自分以外をdraw
				for (var j:int = 0; j < len; j++) {
					if (i == j) continue;//自分はスルー

					g.clear();
					g.beginFill(0xff0000);
					
					var a:Strokes = strokes[j];
					if ( a.isHit ) continue;//holeの場合、次へ。
					
					//
					for (var k:int = 0; k < a.length; k++) {
						var m:Array = a.getData(k);
						switch (m[0]){	
							case "M":
								g.moveTo(m[1][0], m[1][1]);
								break;
							case "L":
								g.lineTo(m[1][0], m[1][1]);
								break;		
							case "C":
								g.curveTo(m[1][0], m[1][1], m[1][2], m[1][3]);
								break;
								
						}
					}
					
					//iがヒットしてるかどうか
					var b:Strokes = strokes[i];
					m = b.getData(0);
					var isHit:Boolean = s.hitTestPoint(m[1][0], m[1][1], true);
					//色塗った奴とヒットテスト
					if (isHit) {
						b.isHit = true;//bはhole
						b.getData(0)[0] = "H";//bはhole
						a.holes.push(b);
					}
				}
				
			}
			
			count = 0;
			for (i = 0; i < len; i++) {
				
				var ss:Strokes = strokes[i];
				if ( !ss.isHit ) {
					for (j = 0; j < ss.list.length; j++) {
						motif[count] = ss.list[j];
						count++;
					}
					for (j = 0; j < ss.holes.length; j++) {
						var holes:Strokes = ss.holes[j];
						for (k = 0; k < holes.list.length;k++){
							motif[count] = holes.list[k];
							count++;
						}
					}					
				}
				
			}
			
			
			
			
			//for(i = 0; i < len; i++) {
			//	a = strokes[i];
			//	if(holeFlags[i])a.getData(0)[0] = "H";//hole				
			//}
			
			//for (i = 0; i < motif.length; i++) {
			//	trace(motif[i]);
			//}
			
			/*
			for (var i:int = 0; i < len; i++) {
				
				var m:Array = motif[i];
				
				switch (m[0]){	
					case "M":
						var isHit:Boolean = s.hitTestPoint(m[1][0], m[1][1], true);
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
			*/
			
		}
		
	}

}