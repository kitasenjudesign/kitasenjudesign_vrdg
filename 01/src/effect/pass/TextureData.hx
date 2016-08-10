package effect.pass;
import three.Texture;

/**
 * ...
 * @author watanabe
 */
class TextureData
{
	public var name:String = "";
	public var texture:Texture;
	
	
	public function new(n:String,t:Texture) 
	{
		this.name = n;
		this.texture = t;
	}
	
}