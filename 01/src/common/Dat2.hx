package common;
import js.Browser;
import js.html.CanvasElement;

/**
 * ...
 * @author watanabe
 */
class Dat2
{
	
	public static inline var UP:Int = 38;
	public static inline var DOWN:Int = 40;
	public static inline var LEFT:Int = 37;
	public static inline var RIGHT:Int = 39;
	
	public static inline var K1:Int = 49;
	public static inline var K2:Int = 50;
	public static inline var K3:Int = 51;
	public static inline var K4:Int = 52;
	public static inline var K5:Int = 53;
	public static inline var K6:Int = 54;
	public static inline var K7:Int = 55;
	public static inline var K8:Int = 56;
	public static inline var K9:Int = 57;
	public static inline var K0:Int = 58;
	
	public static inline var A:Int = 65;
	public static inline var B:Int = 66;
	public static inline var C:Int = 67;
	public static inline var D:Int = 68;
	public static inline var E:Int = 69;
	public static inline var F:Int = 70;
	public static inline var G:Int = 71;
	public static inline var H:Int = 72;
	public static inline var I:Int = 73;
	public static inline var J:Int = 74;
	public static inline var K:Int = 75;
	public static inline var L:Int = 76;
	public static inline var M:Int = 77;
	public static inline var N:Int = 78;	
	public static inline var O:Int = 79;
	public static inline var P:Int = 80;
	public static inline var Q:Int = 81;
	public static inline var R:Int = 82;
	public static inline var S:Int = 83;
	public static inline var T:Int = 84;
	public static inline var U:Int = 85;
	public static inline var V:Int = 86;
	public static inline var W:Int = 87;
	public static inline var X:Int = 88;
	public static inline var Y:Int = 89;
	public static inline var Z:Int = 90;
	

	
	public static inline var hoge:Int = 0;
	
	
	public static var gui:Dynamic;

	//public static var graph:Dynamic;
	private static var _showing:Bool = true;
	
	public function new() 
	{
		
	}
	
	public static function init():Void {
		
		gui = untyped __js__("new dat.GUI({ autoPlace: false })");
		gui.domElement.id = "ddgui";// "datgui"

		Browser.document.body.appendChild(gui.domElement);
		gui.domElement.style.position = "absolute";
		gui.domElement.style.right = "0px";
		gui.domElement.style.top = "0px";
		gui.domElement.style.opacity = 0.5;
		gui.domElement.style.zIndex = 999999;

		//StatsGUI.init();
			
		//Browser.document.onkeydown = _onDown;
		
		//gui.add(main.camera, "amp").step(0.01).listen();
		
		
		Browser.document.addEventListener("keydown" , _onKeyDown);
		hide();
		//e.keyCode
	}
	
	
	static private function _onKeyDown(e):Void {
	
		trace("keydown");
		switch(Std.parseInt(e.keyCode)) {
			case Dat.D :
				if ( gui.domElement.style.display == "block"){
					hide();
				}else{
					show();
				}
			//case Dat.F :
				//untyped Browser.document.body.webkitRequestFullscreen();

			case Dat.K1 :
				Browser.window.location.href = "../../01/bin/";				
			case Dat.K2 :
				Browser.window.location.href = "../../02/bin/";
			case Dat.K3 :
				Browser.window.location.href = "../../03/bin/";				
			case Dat.K4 :
				Browser.window.location.href = "../../04/bin/";
			case Dat.K5 :
				Browser.window.location.href = "../../05/bin/";				
			case Dat.K6 :
				Browser.window.location.href = "../../06/bin/";
				
		}
		
	}
	

	public static function show():Void{
		gui.domElement.style.display = "block";
	}
	public static function hide():Void{
		gui.domElement.style.display = "none";
	}
	
	
}