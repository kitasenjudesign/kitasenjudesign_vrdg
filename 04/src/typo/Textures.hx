package typo;
import three.ImageUtils;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class Textures
{

	private static var _textures:Array<Texture>;
	private static var _count:Int = 0;
	
	public function new() 
	{
		
	}
	
	public static function init():Void {
		_textures = [
			ImageUtils.loadTexture("grade.png"),
			ImageUtils.loadTexture("grade1.png"),
			ImageUtils.loadTexture("grade2.png"),
			ImageUtils.loadTexture("grade3.png"),
			ImageUtils.loadTexture("grade4.png"),
			ImageUtils.loadTexture("grade5.png"),
			ImageUtils.loadTexture("grade6.png"),
			ImageUtils.loadTexture("grade7.png")
		];
	}
	
	public static function getTexture():Texture {
		//___count++;
		return _textures[Math.floor(Math.random()*_textures.length)];
		
	}
}