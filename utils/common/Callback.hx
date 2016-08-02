package common;

/**
 * ...
 * @author watanabe
 */
class Callback
{

	public function new() 
	{
		
	}

	
	public static function create( scope:Dynamic, func:Dynamic, args:Array<Dynamic> ):Dynamic{
		return function():Void{
			Reflect.callMethod(scope,func,args);
		}
	}
		
		
	
}