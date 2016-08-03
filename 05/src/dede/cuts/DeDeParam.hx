package dede.cuts;

/**
 * ...
 * @author watanabe
 */
class DeDeParam
{


	/*
		var txt:String 		= data.text;
		var font:Int 		= data.font;
		var spaceX:Float 	= data.spaceX;
		
		var isAllSame:Bool = Math.random() < 0.5 ? true : false;
		var isRandomLine:Bool = Math.random() < 0.2 ? true : false;
		var isRotate:Bool = Math.random() < 0.2 ? true : false;
		if ( isRandomLine ) {
			isRotate = Math.random()<0.7 ? true : false;
		}
		var isRandomStartSec:Bool = Math.random() < 0.5 ? true : false;
		var startSec:Float = Math.random();
		
		MyPointCloud.cloud.setRandom(isRandomLine);
		
		var speed:Float = 2 + 2 * Math.random();
		var space:Float = 3 + 7 * Math.random();// + 18 * Math.random();
	*/
		
	public var txt:String = "";
	public var startX:Float = 0;
	public var font:Int = 0;
	public var spaceX:Float = 0;
	//public var isAllSame:Bool = false;
	//public var isRandomLine:Bool = false;
	public var isRotate:Bool = false;
	public var startSec:Float = 0;
	public var speed:Float = 0;
	public var space:Float = 0;
	public var isRandomStartSec:Bool = false;
	public var speedX:Float = -2;
	
	public static inline var SAME_ALL:Int = 0;// "SAME_ALL";
	public static inline var SAME_LINE:Int = 1;// "SAME_LINE";
	public static inline var SAME_DIFF:Int = 2;// = "SAME_DIFF";
	
	public var sameType:Int = 0;// = "";
	
	public function new() 
	{
		
	}
	
	/**
	 * 
	 * @return
	 */
	public static function getParam():DeDeParam {
		
		var data:DeDeParam = new DeDeParam();
		var str:DeDeString = DeDeString.getData();
		
		data.txt 		= str.text;
		data.font 		= str.font;
		data.spaceX 	= str.spaceX;
		
		data.sameType = Math.floor(3 * Math.random());
		
		//isAllSame
		//lineSame
		//allDifferant
		//3pattern
		//data.isAllSame = Math.random() < 0.5 ? true : false;
		//data.isRandomLine = Math.random() < 0.2 ? true : false;
		data.isRotate = Math.random() < 0.2 ? true : false;
		//if ( data.isRandomLine ) {
		//	data.isRotate = Math.random()<0.7 ? true : false;
		//}
		data.isRandomStartSec = Math.random() < 0.5 ? true : false;
		data.startSec = Math.random();
		
		//MyPointCloud.cloud.setRandom(isRandomLine);
		
		data.speed = 2;// + 2 * Math.random();
		data.space = 3 + 7 * Math.random();// + 18 * Math.random();
	
		return data;
		
	}
	
	
	
	
	
}