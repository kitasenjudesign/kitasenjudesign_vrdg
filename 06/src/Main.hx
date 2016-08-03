package ;

import js.Browser;


/**
 * ...
 * @author watanabe
 */

class Main 
{	
	//var _main:Main3d;
	var _mainD:MainDeDe;
	
	static function main() 
	{
		new Main();
	}
	
	public function new() {
		Browser.window.onload = initialize;
	}
	
	private function initialize(e):Void
	{
		//_main = new Main3d();
		//_main.init();
		_mainD = new MainDeDe();
		_mainD.init();
	}
	
	
	
}