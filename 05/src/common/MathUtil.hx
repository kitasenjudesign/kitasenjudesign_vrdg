package common;

/**
 * ...
 * @author watanabe
 */
class MathUtil
{

	public function new() 
	{
		
	}
	
	public static function getOtherInt(n:Int,num:Int):Int {
		
		var nn:Int = -1;
		while (true) {
			
			nn = Math.floor( Math.random() * num);
			if (nn != n) {
				break;
			}
			
		}
		
		return nn;
	}
	
}