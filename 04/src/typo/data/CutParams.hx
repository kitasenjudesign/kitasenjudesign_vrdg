package typo.data;

/**
 * ...
 * @author watanabe
 */
class CutParams
{

	private static var _params:Array<CutData> = [];
	private static var _count:Int = -1;
	
	public function new() 
	{
		
	}

	public static function init():Void {
	
		_params = [
			new CutDataA(),
			new CutDataB(),
			new CutDataC(),
			new CutDataD()
		];
		
	}
	
	
	public static function getNextData():CutData {
		
		//cut data wo kaesu
		_count++;
		var d:CutData =  _params[_count % _params.length];
		return d;// _params[_count % _params.length];
		
	}
	
}