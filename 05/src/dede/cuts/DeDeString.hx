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
	public static var texts:Array<Dynamic> = [
		{ text:"VRDG3", font:0, spaceX:50 },
		{ text:"NIGHT VOICE ", font:1, spaceX:50 },		
		{ text:"DEDEMOUSE", font:1, spaceX:20 },
		{ text:"DEDE", font:1, spaceX:50 },
		
		{ text:"KITASENJUDESIGN", font:1, spaceX:50 },
		{ text:"デデデデデデ", font:0, spaceX:10 },
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
			texts[ Math.floor( Math.random() * texts.length ) ]
		);
		
		return data;
		
	}
	
}