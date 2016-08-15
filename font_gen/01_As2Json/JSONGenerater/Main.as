package  
{
	import flash.display.Shape;
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.FileReference;
	import flash.text.TextField;
	import flash.utils.getQualifiedClassName;
	import net.badimon.five3D.typography.AOTFProM;
	import net.badimon.five3D.typography.AOTFProM2;
	import net.badimon.five3D.typography.DiamanteEFMedium;
	import net.badimon.five3D.typography.HelveticaBold;
	import net.badimon.five3D.typography.HelveticaNeueMedium;
	import net.badimon.five3D.typography.NotoFace;
	import net.badimon.five3D.typography.NotoSansCJKJPBlackBlack;
	import net.badimon.five3D.typography.SimpleTestGraphics;
	import net.badimon.five3D.typography.Typography3D;
	import net.badimon.five3D.typography.TypoTestGraphics;
	import net.badimon.five3D.typography.TypoTestGraphics2;
	/**
	 * ...
	 * @author nab
	 */
	public class Main extends Sprite
	{
		
		private var _o:Object;
		private var _font:Typography3D;
		private var _keys:Array = [];
		private var _count:int = 0;
		private var _tf:TextField;
		private var shape:Sprite;
		
		public var btn:SimpleButton;
		
		public function Main() 
		{
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			_tf = new TextField();
			addChild(_tf);
			_tf.textColor = 0xff0000;
			addEventListener(Event.ADDED_TO_STAGE, _onAdd);
		}
		
		private function _onAdd(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, _onAdd);
			
			var font:Typography3D = new NotoFace();// new NotoSansCJKJPBlackBlack();// new AOTFProM2();// new HelveticaLight();
			
			_font = font;
		
			btn.addEventListener(MouseEvent.CLICK, _onSave);
			
			shape = new Sprite();
			addChild(shape);
				
			for (var k:String in font.motifs) {
				_keys.push(k);
			}
			addEventListener(Event.ENTER_FRAME, _onUpdate);
		}
		
		private function _onUpdate(e:Event):void 
		{
			
			TypoTestGraphics.drawNormal( shape, _font.motifs[_keys[_count]]);

			//TypoTestGraphics.drawNormal( shape, _font.motifs["倹"]);

			//var shape2:Sprite = new Sprite();
			//addChild(shape2).x = 100;
			//SimpleTestGraphics.drawNormal( shape2, _font.motifs["倹"]);

			
			_tf.text = "progress" + String( (_count+1) / _keys.length);
			
			//removeEventListener(Event.ENTER_FRAME, _onUpdate);
			
			_count++;
			if (_count >= _keys.length) {
				removeEventListener(Event.ENTER_FRAME, _onUpdate);
			}
			
		}
		
		
		private function _onSave(e:MouseEvent):void 
		{
			_setObject();
			var s:String = JSON.stringify( _o );
			var ss:FileReference = new FileReference();
			var name:String = getQualifiedClassName(_font);
			name = name.split("::")[1];
			ss.save(s, name + ".json");	
		}
		
		
		
		private function _setObject():void {
			
			var o:Object = { };
			for (var key:String in _font.motifs) {
				
				//trace("key " + key);
				if(key != " " || key != '"' || key != "\\"){

					//[['M',[45.4,68.65]],['L',[17.35,68.65]],['L',[31.65,32.1]]
					var m:Array = _font.motifs[key];
					var out:Array = [];
					var w:Number = _font.widths[key];

					out.push(w);//width
					for (var i:int = 0; i < m.length; i++) {
						
						var str:String = "";
						if (m[i][0] == "C") {
							str = m[i][0] + "," + m[i][1][0] + "," + m[i][1][1] 							
							+ "," + m[i][1][2] + "," + m[i][1][3];
						}else {
							str = m[i][0] + "," + m[i][1][0] + "," + m[i][1][1];
						}
						
						out.push(str);
					}
					
					o[key] = out;
					//trace(key, o["motifs"][key], w);
				}
			}
			
			o["height"] = _font.height;
			_o = o;	
		}
		
		
		
	}

}