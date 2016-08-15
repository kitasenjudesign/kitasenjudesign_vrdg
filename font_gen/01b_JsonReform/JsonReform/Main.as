package  
{
	import fl.controls.TextArea;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.FileReference;
	import flash.text.TextField;
	import reform.FontDrawer;
	/**
	 * ...
	 * @author nabe
	 */
	public class Main extends MovieClip
	{
		
		private var _fr			:FileReference;
		private var _o			:Object;
		private var _fontDrawer	:FontDrawer;
		public var tf		:TextField;
		public var tf2		:TextField;
		public var btn		:MovieClip;
		public var btn2		:MovieClip;
		public var btn3		:MovieClip;
		public var btn4		:MovieClip;
		public var line_tf	:TextField;
		public var correctString:TextField;
		
		public function Main() 
		{
			_fontDrawer = new FontDrawer();
			_fontDrawer.y = 100;
			_fontDrawer.scaleX = 2;
			_fontDrawer.scaleY = 2;
			
			addChild(_fontDrawer);
			
			btn2.addEventListener(MouseEvent.MOUSE_DOWN, _onLoadJson);
		}
		
		private function _onLoadJson(e:MouseEvent):void 
		{
			_fr = new FileReference();
			_fr.addEventListener(Event.SELECT, _onSelectLocalFile);
			_fr.browse();
		}

		private function _onSelectLocalFile(e:Event):void
		{
			_fr.addEventListener(Event.COMPLETE,_onLoadComplete)
			_fr.load();
		}

		private function _onLoadComplete(e:Event):void
		{
			//trace(_fr.data);
			
			btn.buttonMode = true;
			btn.addEventListener(MouseEvent.CLICK, _showMoji);
			
			_o = JSON.parse(String( _fr.data ));
			/*
			for (var key:String in _o) {
				_o[key];	
			}
			*/
			
			addEventListener(Event.ENTER_FRAME, _onUpdate);
		}
		
		private function _onUpdate(e:Event):void 
		{
			line_tf.text = String( tf2.getLineIndexOfChar( tf2.caretIndex ) );
		}
		
		private function _showMoji(e:MouseEvent):void 
		{
			trace("_showMOji");
			_fontDrawer.draw( _o[ tf.text.substr(0, 1) ] );
			_setText( _o[ tf.text.substr(0, 1) ] );
			btn3.addEventListener(MouseEvent.CLICK, _saveJson);
			
			btn4.addEventListener(MouseEvent.CLICK, _redraw);
		}
		
		//
		private function _removeMojis():void {
			
			if (correctString.text == "") return;
			
			var s:String = correctString.text;
			for (var key:String in _o) {
				
				//存在していないものは削除する
				if( s.indexOf(key) < 0 && key!="height"){
					delete _o[key];
				}
				
			}
			
			
		}
		
		private function _redraw(e:MouseEvent):void 
		{
			trace("redraw " + _getAry().length);
			_fontDrawer.draw( _getAry() );
			_o[tf.text.substr(0, 1)] = _getAry();//tf2.text.split(",");
		}
		
		
		private function _saveJson(e:MouseEvent):void 
		{
			//jsonをsaveする・・・
			_o[tf.text.substr(0, 1)] = _getAry();//tf2.text.split(",");
			
			_removeMojis();
			
			var s:String = JSON.stringify(_o);
			var f:FileReference = new FileReference();
			
			f.save(s, _fr.name);
		}
		
		
		private function _setText(a:Array):void {
			//tfにいい感じで
			tf2.text = a.join('\n');
			//tf2.caretIndex
		}
		
		

		private function _getAry():Array {

			var a:Array = tf2.text.split("\r");//
			//trace(a);
			return a;
			
		}

	}

}