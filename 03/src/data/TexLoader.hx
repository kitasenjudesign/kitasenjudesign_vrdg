package data;
import common.Path;
import three.ImageUtils;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class TexLoader
{

	public function new() 
	{
		
	}

	public static function getTexture(url:String):Texture {
		
		var t:Texture = ImageUtils.loadTexture( url );
		t.minFilter = Three.NearestFilter;
		t.magFilter = Three.NearestFilter;
		return t;
		
	}
	
}