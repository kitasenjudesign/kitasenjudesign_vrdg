package dede.cuts;

/**
 * ...
 * @author watanabe
 */
class DeDeString
{

	public var text:String = "";
	public var font:Int = 0;
	public var spaceX:Float = 0;
	public var type:Int = -1;
	private static var _count:Int = 0;
	public static var texts:Array<Dynamic> = [
		{ text:"NIGHTVOICE", font:1, spaceX:50 },
		{ text:"VRDG3DMMVRTHATHRE", font:0, spaceX:50 },
		{ text:"DEDEMOUSE", font:1, spaceX:30 },
		{ text:"DEDE", font:1, spaceX:50 },
		{ text:"KITASENJUDESIGN", font:1, spaceX:50 },
		{ text:"デデデデデデ", font:0, spaceX:30 },
		{ text:"デデマウス", font:0, spaceX:50 }
	];
	
	public function new(o:Dynamic) 
	{
		text = o.text;
		font = o.font;
		spaceX = o.spaceX;//moji spacex
	}
	
	/**
	 * DeDeString
	 * @return
	 */
	public static function getData():DeDeString {
		
		var data:DeDeString = new DeDeString(
			texts[ _count % texts.length ]
		);
		_count++;
		
		return data;
		
	}
	
}