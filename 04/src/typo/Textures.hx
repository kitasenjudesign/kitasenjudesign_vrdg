package typo;
import common.Path;
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
		
			ImageUtils.loadTexture(Path.assets + "grade/grade.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade1.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade2.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade3.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade4.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade5.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade6.png"),
			ImageUtils.loadTexture(Path.assets + "grade/grade7.png")
			
		];
	}
	
	public static function getTexture():Texture {
		//___count++;
		return _textures[Math.floor(Math.random()*_textures.length)];
		
	}
}