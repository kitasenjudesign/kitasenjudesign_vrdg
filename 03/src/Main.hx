package ;

import fbo.FboMain;
import js.Browser;
import js.Lib;
/**
 * ...
 * @author nabe
 */

class Main 
{
	
	static private var _fbo;
	
	
	static function main() 
	{
		Browser.window.onload = untyped _init;
	}
	
	static private function _init() 
	{
		_fbo = new FboMain();
		_fbo.init();
		//_main = new Main3d();
		//_main.init();
		
	}
	
}