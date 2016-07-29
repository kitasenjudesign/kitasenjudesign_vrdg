package planes.rtt;
import data.TextureData;

/**
 * ...
 * @author nabe
 */
class RTTTextures
{

	public static var MAX:Int = 20;
	private static var _textures:Array<RTTTexture>;
	private static var _counter:Int = 0;
	
	
	public function new() 
	{
	}
	
	/**
	 * 	init
	 */
	public static function init():Void {
		//仮で10個つくる
		_textures = [];
		//var list:Array<TextureData> = TextureData.textures;
		for (i in 0...MAX) {		var t:RTTTexture = new RTTTexture();	t.init();	_textures.push(t);	}
	}
	
	
	public static function getNext():RTTTexture {
		_counter++;
		return _textures[_counter%_textures.length];
	}
	
	public static function update():Void {
		//trace("Update " + _textures.length);
		for (i in 0..._textures.length) {	_textures[i].update();}
	}
	
}