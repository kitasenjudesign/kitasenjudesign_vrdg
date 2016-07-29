package ;

import js.Browser;


/**
 * ...
 * @author watanabe
 */

class Main 
{	
	
	
	static function main() 
	{
		new Main();
	}
	
	public function new() {
		Browser.window.onload = initialize;
	}
	
	private function initialize(e):Void
	{
		var main:Main3d = new Main3d();
		main.init();
		
	}
}